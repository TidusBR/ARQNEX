import express from 'express';
import { DBConn, checkAccountExistance, getAccountInfo } from '../database.js';
import { acceptOfficeInviteNotification, createOfficeInviteNotification, rejectOfficeInviteNotification } from './notifications.js';

import { mkdir, writeFile, unlink } from "node:fs/promises";
import { fetchCollectionInfos } from './collection.js';

export const OfficeRouter = express.Router();

OfficeRouter.post("/update/avatar", async (req, res) => {
    if (!req.session.loggedIn || req.session.user?.premium_level === 0 || req.session.user?.office === undefined) {
        return res.sendStatus(401); // Unauthorized
    }

    const { file } = req.body;

    const path = `uploads/${req.session.user.id}`;
    const filePath = `${path}/office`;

    await mkdir(path, { recursive: true });
    await writeFile(filePath, Buffer.from(file), { encoding: 'utf-8' });

    await DBConn.execute(`UPDATE offices SET photo = ? WHERE id = ? AND owner_id = ?`, [filePath, req.session.user.office.id, req.session.user.id]);

    req.session.user.office.photo = filePath;
    req.session.save();

    res.sendStatus(200);
});

OfficeRouter.post("/remove/avatar", async (req, res) => {
    if (!req.session.loggedIn || req.session.user?.premium_level === 0 || req.session.user?.office === undefined) {
        return res.sendStatus(401); // Unauthorized
    }

    const path = `uploads/${req.session.user.id}`;
    const filePath = `${path}/office`;

    await unlink(filePath);

    res.sendStatus(200);
});


OfficeRouter.post("/update", async (req, res) => {
    if (!req.session.loggedIn || req.session.user?.premium_level === 0) {
        return res.sendStatus(401);
    }

    if (req.session.user.office) {
        await DBConn.execute(`UPDATE offices SET name = ?, cnpj = ? WHERE id = ? AND owner_id = ?`, [req.body.name, req.body.cnpj, req.session.user.office.id, req.session.user.id]);
        await DBConn.execute(`
        UPDATE offices_address SET
            cep = ?,
            house_number = ?,
            street = ?,
            neighborhood = ?,
            city = ?
        WHERE office_id = ?`, [req.body.cep, req.body.houseNumber, req.body.street, req.body.neighborhood, req.body.city, req.session.user.office.id]);
    } else {
        const [office] = await DBConn.execute(`INSERT INTO offices(owner_id, name, cnpj, photo) VALUES(?, ?, ?, ?)`, [req.session.user.id, req.body.name, req.body.cnpj, '']);

        await DBConn.execute(
            `INSERT INTO offices_address(office_id, cep, house_number, street, neighborhood, city) VALUES(?, ?, ?, ?, ?, ?)`,
            [office.insertId, req.body.cep, req.body.houseNumber, req.body.street, req.body.neighborhood, req.body.city]
        );

        await DBConn.execute(
            `INSERT INTO offices_members(office_id, account_id) VALUES(?, ?)`,
            [office.insertId, req.session.user.id]
        );
    }

    req.session.user = await getAccountInfo({id: req.session.user.id});
    req.session.save();

    res.json({
        ok: true
    });
});

OfficeRouter.post("/invite", async (req, res) => {
    if (!req.session.loggedIn || req.session.user?.premium_level === 0 || req.session.user?.office === undefined) {
        return res.sendStatus(401);
    }

    if (!await checkAccountExistance({id: req.body.personId})) {
        return res.sendStatus(406);
    }

    await createOfficeInviteNotification({
        personId: req.body.personId,
        senderId: req.session.user.id,
        officeId: req.session.user.office.id
    });

    res.sendStatus(200);
});

OfficeRouter.post("/invite/reject", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401);
    }

    await rejectOfficeInviteNotification({
        personId: req.session.user.id,
        notificationId: req.body.notificationId
    });

    res.sendStatus(200);
});

OfficeRouter.post("/invite/accept", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401);
    }

    if (req.session.user.isOfficeMember) {
        await rejectOfficeInviteNotification({
            personId: req.session.user.id,
            notificationId: req.body.notificationId,
        });
    } else {
        const officeId = await acceptOfficeInviteNotification({
            personId: req.session.user.id,
            notificationId: req.body.notificationId,
        });

        await DBConn.execute(
            `INSERT INTO offices_members(office_id, account_id) VALUES(?, ?)`,
            [officeId, req.session.user.id]
        );

        req.session.user = await getAccountInfo({id: req.session.user.id});
        req.session.save();
    }

    res.sendStatus(200);
});

OfficeRouter.post("/remove/member", async (req, res) => {
    if (!req.session.loggedIn || req.session.user?.premium_level === 0 || req.session.user?.office === undefined || req.session.user.office.owner_id !== req.session.user.id) {
        return res.sendStatus(401);
    }

    await DBConn.execute(
        `DELETE FROM offices_members WHERE office_id = ? AND account_id = ?;`,
        [req.session.user.office.id, req.body.memberId]
    );

    res.sendStatus(200);
});

OfficeRouter.get("/info", async (req, res) => {
    if (!req.session.loggedIn || req.session.user?.premium_level === 0) {
        return res.sendStatus(401);
    }

    const data = {
        name: '',
        cnpj: '',
        photo: '',
        address: {
            cep: '',
            house_number: '',
            street: '',
            neighborhood: '',
            city: '',
        }
    };

    if (req.session.user.office) {
        data.name = req.session.user.office.name;
        data.cnpj = req.session.user.office.cnpj;
        data.photo = req.session.user.office.photo;

        const [[officeAddress]] = await DBConn.execute(`SELECT cep, house_number, street, neighborhood, city FROM offices_address WHERE office_id = ?;`, [req.session.user.office.id]);
        data.address = officeAddress;
    }

    res.json(data);
});

OfficeRouter.get("/members", async (req, res) => {
    if (!req.session.loggedIn || req.session.user?.premium_level === 0 || req.session.user?.office === undefined) {
        return res.sendStatus(401);
    }

    const [officeMembers] = await DBConn.execute(`SELECT account_id FROM offices_members WHERE office_id = ?;`, [req.session.user.office.id]);
    
    for (const member of officeMembers) {
        member.id = member.account_id;
        delete member.account_id;

        const [[memberData]] = await DBConn.execute(`SELECT name, premium_level FROM accounts WHERE id = ?;`, [member.id]);
        member.name = memberData.name;
        member.isPremium = memberData.premium_level > 0;
        member.isOwner = req.session.user.office.owner_id === member.id;

        const [[address]] = await DBConn.execute(`SELECT * FROM address WHERE account_id=?`, [member.id]);
        member.address = address;
    }

    res.json(officeMembers);
});

OfficeRouter.get("/list", async (req, res) => {
    const [offices] = await DBConn.execute(`SELECT id, name, photo FROM offices ORDER BY RAND();`);

    for (const office of offices) {
        const [[officeAddress]] = await DBConn.execute(`SELECT cep, house_number, street, neighborhood, city FROM offices_address WHERE office_id = ?;`, [office.id]);
        office.address = officeAddress;

        const collections = await getMembersCollections(req, office.id);

        office.collections = collections;
    }

    res.json(offices);
});

export async function getMembersCollections(req, officeId) {
    const collectionsMember = [];

    const [officeMembers] = await DBConn.execute(`SELECT account_id FROM offices_members WHERE office_id = ? ORDER BY RAND() LIMIT 3;`, [officeId]);

    for (const member of officeMembers) {
        const [collections] = await DBConn.execute(`SELECT * FROM collections WHERE author_id = ? ORDER BY RAND() LIMIT 1;`, [member.account_id]);

        for (const collection of collections) {
            await fetchCollectionInfos(req, collection)
            collectionsMember.push(collection);
        }
    }

    return collectionsMember;
}