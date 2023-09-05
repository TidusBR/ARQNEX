import express from "express";
import { DBConn } from "../database.js";
import mime from 'mime-types';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from "node:fs/promises";

export const CollectionRouter = express.Router();

CollectionRouter.get("/upload-details", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const details = {};

    for (const detailName of ["projects", "softwares", "types", "styles"]) {
        const result = await DBConn.execute(`SELECT id, name FROM collection_details_${detailName}`);
        details[detailName] = result[0];
    }
    
    return res.json(JSON.stringify(details));
});

CollectionRouter.post("/upload", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const result = await DBConn.execute(`INSERT INTO collections(author_id, title, description, styles, project, type) VALUES (?, ?, ?, ?, ?, ?);`, [
        req.session.accountInfo.id,
        req.body.title,
        req.body.description,
        req.body.styles,
        req.body.project,
        req.body.type
    ]);

    const collectionID = result[0].insertId;

    for (const software of req.body.softwares) {
        await DBConn.execute(`INSERT INTO collections_softwares(collection_id, software_id) VALUES(?, ?);`, [collectionID, software]);
    }

    for (const file of req.body.files) {
        const path = `uploads/${req.session.accountInfo.id}/collections/${collectionID}`;
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

CollectionRouter.get("/list", async (req, res) => {
    const list = [];

    const result = await DBConn.execute(`SELECT * FROM collections`);

    for (const collection of result[0]) {
        collection.softwares = [];

        const softwares = await DBConn.execute(`SELECT software_id FROM collections_softwares WHERE collection_id = ?;`, [collection.id]);

        for (const software_id of softwares[0].map(s => s.software_id)) {
            const software_details = await DBConn.execute(`SELECT * FROM collection_details_softwares WHERE id = ?;`, [software_id]);
            collection.softwares.push(software_details[0][0]);
        }

        const files = await DBConn.execute(`SELECT file_path FROM collections_files WHERE collection_id = ?;`, [collection.id]);
        collection.files = files[0].map(f => f.file_path);

        list.push(collection);
    }

    return res.json(list);
});

CollectionRouter.get("/list/:author_id", async (req, res) => {
    const list = [];

    const result = await DBConn.execute(`SELECT * FROM collections WHERE author_id=?`, [req.params.author_id]);

    for (const collection of result[0]) {
        collection.softwares = [];

        const softwares = await DBConn.execute(`SELECT software_id FROM collections_softwares WHERE collection_id = ?;`, [collection.id]);

        for (const software_id of softwares[0].map(s => s.software_id)) {
            const software_details = await DBConn.execute(`SELECT * FROM collection_details_softwares WHERE id = ?;`, [software_id]);
            collection.softwares.push(software_details[0][0]);
        }

        const files = await DBConn.execute(`SELECT file_path FROM collections_files WHERE collection_id = ?;`, [collection.id]);
        collection.files = files[0].map(f => f.file_path);

        list.push(collection);
    }

    return res.json(list);
});