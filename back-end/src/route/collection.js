import express from "express";
import { DBConn, checkCollectionExistance } from "../database.js";
import mime from 'mime-types';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from "node:fs/promises";
import { Temporal } from '@js-temporal/polyfill';
import { createLikeNotification } from "./notifications.js";

export const CollectionRouter = express.Router();

CollectionRouter.get("/upload-details", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const details = {};

    const result = await DBConn.execute(`SELECT id, name, iconPath FROM collection_details_softwares`);
    details.softwares = result[0];

    for (const detailName of ["projects", "types", "styles"]) {
        const result = await DBConn.execute(`SELECT id, name FROM collection_details_${detailName}`);
        details[detailName] = result[0];
    }
    
    return res.json(JSON.stringify(details));
});

CollectionRouter.post("/upload", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    if (req.session.user.premium_level === 0 && req.body.files.length > 1) {
        return res.json({
            ok: false,
            message: "Você precisa ser PRO para fazer upload de mais de 1 arquivo."
        });
    }

    const result = await DBConn.execute(`INSERT INTO collections(author_id, title, description, styles, project, type, upload_time, upload_timestamp, views) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0);`, [
        req.session.user.id,
        req.body.title,
        req.body.description,
        req.body.styles,
        req.body.project,
        req.body.type,
        Temporal.Now.zonedDateTimeISO().toString(),
        Temporal.Now.instant().epochMilliseconds
    ]);

    const collectionID = result[0].insertId;

    for (const software of req.body.softwares) {
        await DBConn.execute(`INSERT INTO collections_softwares(collection_id, software_id) VALUES(?, ?);`, [collectionID, software]);
    }

    for (const file of req.body.files) {
        const path = `uploads/${req.session.user.id}/collections/${collectionID}`;
        const filePath = `${path}/${randomUUID()}.${mime.extension(file.type)}`;

        await mkdir(path, { recursive: true });
        await writeFile(filePath, Buffer.from(file.buffer), { encoding: 'utf-8' });

        await DBConn.execute(`INSERT INTO collections_files(collection_id, file_path) VALUES(?, ?);`, [collectionID, filePath]);
    }

    return res.json({
        ok: true,
        collectionID
    });
});

export async function fetchCollectionInfos(req, collection) {
    collection.softwares = [];

    const softwares = await DBConn.execute(`SELECT software_id FROM collections_softwares WHERE collection_id = ?;`, [collection.id]);

    for (const software_id of softwares[0].map(s => s.software_id)) {
        const software_details = await DBConn.execute(`SELECT * FROM collection_details_softwares WHERE id = ?;`, [software_id]);
        collection.softwares.push(software_details[0][0]);
    }

    const files = await DBConn.execute(`SELECT file_path FROM collections_files WHERE collection_id = ?;`, [collection.id]);
    collection.files = files[0].map(f => f.file_path);

    if (req.session.loggedIn) {
        const like = await DBConn.execute(`SELECT COUNT(*) FROM collections_likes WHERE collection_id = ? AND account_id = ?;`, [collection.id, req.session.user?.id]);     
        collection.isLiked = like[0][0]['COUNT(*)'] === 1;
    } else {
        collection.isLiked = false;
    }

    const likes = await DBConn.execute(`SELECT COUNT(*) FROM collections_likes WHERE collection_id = ?;`, [collection.id]);
    collection.likes = likes[0][0]['COUNT(*)'];
}

CollectionRouter.get("/list", async (req, res) => {
    // 16 é o tamanho máximo de cada página

    const list = [];

    const result = await DBConn.execute(`SELECT * FROM collections LIMIT 16 OFFSET ?`, [((req.query.page ?? 0) - 1) * 16]);

    for (const collection of result[0]) {
        await fetchCollectionInfos(req, collection);
        list.push(collection);
    }

    return res.json(list);
});

async function getCollectionsByFilters(filter) {
    const collectionLimitPerPage = 16;

    let whereFilter = filter.style === 0 ? `styles = 1` : `styles >= 2 AND styles <= 3`;
    const argList = [];

    if (filter.search.length > 0) {
        whereFilter += ` AND (title LIKE ? OR description LIKE ?)`;
        argList.push(`%${filter.search}%`, `%${filter.search}%`);
    }

    argList.push(((filter.page ?? 0) - 1) * collectionLimitPerPage);

    if (filter.relevance === 0) {
        const [collections] = await DBConn.execute(`SELECT * FROM collections WHERE ${whereFilter} ORDER BY views DESC LIMIT 16 OFFSET ?`, argList);
        return collections;
    } else if (filter.relevance === 1) {
        const [collections] = await DBConn.execute(`
        SELECT c.id, c.author_id, c.title, c.description, c.styles, c.project, c.type, c.upload_time, c.views, COUNT(cl.account_id) as like_count
        FROM collections c
        LEFT JOIN collections_likes cl ON c.id = cl.collection_id
        WHERE ${whereFilter}
        GROUP BY c.id
        ORDER BY like_count DESC LIMIT 16 OFFSET ?;`, argList);
        return collections;
    } else if (filter.relevance === 2) {
        const [collections] = await DBConn.execute(`SELECT * FROM collections WHERE ${whereFilter} ORDER BY upload_timestamp DESC LIMIT 16 OFFSET ?`, argList);
        return collections;
    }

    return [];
}

CollectionRouter.post("/newlist", async (req, res) => {
    const filter = req.body;

    const result = {
        collections: [],
    }

    for (const collection of await getCollectionsByFilters(filter)) {
        await fetchCollectionInfos(req, collection);
        result.collections.push(collection);
    }

    result.hasNextPage = (await getCollectionsByFilters({...filter, page: filter.page + 1})).length > 0;

    return res.json(result);
});

CollectionRouter.get("/:id/view", async (req, res) => {
    if (!await checkCollectionExistance(req.params.id)) {
        return res.sendStatus(401);
    }

    const result = await DBConn.execute(`SELECT views FROM collections WHERE id = ?;`, [req.params.id]);

    if (result.length === 0) {
        return res.sendStatus(404);
    }

    await DBConn.execute(`UPDATE collections SET views = ? WHERE id = ?;`, [result[0][0].views + 1, req.params.id]);

    return res.json({
        views: result[0][0].views + 1
    });
});

CollectionRouter.get("/:id/like", async (req, res) => {
    if (!req.session.loggedIn || !await checkCollectionExistance(req.params.id)) {
        return res.sendStatus(401);
    }

    const like = await DBConn.execute(`SELECT COUNT(*) FROM collections_likes WHERE collection_id = ? AND account_id = ?;`, [req.params.id, req.session.user?.id]);     
    const isLiked = like[0][0]['COUNT(*)'] === 1;

    if (isLiked) {
        await DBConn.execute(`DELETE FROM collections_likes WHERE collection_id = ? AND account_id = ?;`, [req.params.id, req.session.user?.id]);
    } else {
        await DBConn.execute(`INSERT INTO collections_likes(collection_id, account_id) VALUES(?, ?);`, [req.params.id, req.session.user?.id]);
        await createLikeNotification({
            collectionId: req.params.id,
            senderId: req.session.user?.id
        });
    }

    const likes = await DBConn.execute(`SELECT COUNT(*) FROM collections_likes WHERE collection_id = ?;`, [req.params.id]);

    return res.json({
        isLiked: !isLiked,
        likes: likes[0][0]['COUNT(*)']
    });
});