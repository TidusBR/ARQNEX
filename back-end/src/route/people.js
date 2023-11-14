import express from "express";

import { DBConn } from "../database.js";
import { fetchCollectionInfos } from "./collection.js";

export const PeopleRouter = express.Router();

PeopleRouter.get("/list", async (req, res) => {    
    const [people] = await DBConn.execute(`SELECT id, name, username, premium_level FROM accounts ORDER BY RAND() LIMIT 5;`);
    
    for (const person of people) {
        person.collections = [];

        const [[collectionCount]] = await DBConn.execute(`SELECT COUNT(*) FROM collections WHERE author_id=?`, [person.id]);
        person.collectionCount = collectionCount['COUNT(*)'];

        const [collections] = await DBConn.execute(`SELECT * FROM collections WHERE author_id=? ORDER BY RAND() LIMIT 3;`, [person.id]);

        for (const collection of collections) {
            await fetchCollectionInfos(req, collection);
            person.collections.push(collection);
        }

        const [[addr]] = await DBConn.execute(`SELECT * FROM address WHERE account_id=?`, [person.id]);

        person.address = {
            city: addr.city
        };

        const [[formation]] = await DBConn.execute(`SELECT * FROM account_formation WHERE account_id=? AND formation_id=0`, [person.id]);

        person.semester = formation?.semester;
        person.isPremium = person.premium_level > 0;
        delete person.premium_level;

        const [[office]] = await DBConn.execute('SELECT COUNT(*) FROM offices_members WHERE account_id = ?;', [person.id]);
        person.isOfficeMember = office['COUNT(*)'] > 0;

        person.isAlreadyInvited = false;

        if (!req.session.loggedIn)
            continue;

        if (req.session.user?.office != undefined) {
            const [[invite]] = await DBConn.execute('SELECT COUNT(*) FROM notifications WHERE account_id = ? AND sender_id = ? AND action_id = 1;', [person.id, req.session.user.id]); 
            person.isAlreadyInvited = invite['COUNT(*)'] > 0;
        }

        const [[following]] = await DBConn.execute('SELECT COUNT(*) FROM following WHERE account_id = ? AND follow_id = ?', [req.session.user.id, person.id]);
        person.isAlreadyFollowing = following['COUNT(*)'] > 0;
    }

    res.json(people);
});