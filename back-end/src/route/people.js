import express from "express";

import { DBConn } from "../database.js";
import { fetchCollectionInfos } from "./collection.js";

export const PeopleRouter = express.Router();

async function getPeopleByFilter(filter) {
    const collectionLimitPerPage = 16;

    const argList = [];

    let whereFilter = '';
    
    if (filter.search.length > 0) {
        whereFilter += `WHERE (name LIKE ? OR username LIKE ?)`;
        argList.push(`%${filter.search}%`, `%${filter.search}%`);
    }

    argList.push(((filter.page ?? 0) - 1) * collectionLimitPerPage);

    if (filter.relevance === 0) {
        const [people] = await DBConn.execute(`
        SELECT acc.id, acc.name, acc.username, acc.premium_level, COUNT(foll.follow_id) as follow_count
        FROM accounts acc
        LEFT JOIN following foll ON acc.id = foll.follow_id
        ${whereFilter}
        GROUP BY acc.id
        ORDER BY follow_count DESC LIMIT 16 OFFSET ?;`, argList);

        return people;

    } else if (filter.relevance === 1) {
        const [people] = await DBConn.execute(`SELECT id, name, username, premium_level FROM accounts ${whereFilter} ORDER BY register_date DESC LIMIT 16 OFFSET ?`, argList);
        return people;
    }

    return [];
}

PeopleRouter.post("/list", async (req, res) => {
    const filter = req.body;

    const people = await getPeopleByFilter(filter);

    for (const person of people) {
        person.collections = [];

        const [[collectionCount]] = await DBConn.execute(`SELECT COUNT(*) FROM collections WHERE author_id=?`, [person.id]);
        person.collectionCount = collectionCount['COUNT(*)'];

        const [collections] = await DBConn.execute(`SELECT * FROM collections WHERE author_id=? AND ${filter.style === 0 ? 'styles = 1' : 'styles >= 2 AND styles <= 3'} ORDER BY RAND() LIMIT 3;`, [person.id]);

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