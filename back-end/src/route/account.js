import express from "express";
import { compare, hash } from "bcrypt";

import { mkdir, unlink, writeFile } from "node:fs/promises";

import { DBConn, checkAccountExistance, createAccount, getAccountInfo } from "../database.js";
import { fetchCollectionInfos } from "./collection.js";

export const AccountRouter = express.Router();

AccountRouter.post("/upload-avatar", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const { file } = req.body;

    const path = `uploads/${req.session.user.id}`;
    const filePath = `${path}/avatar`;

    await mkdir(path, { recursive: true });
    await writeFile(filePath, Buffer.from(file), { encoding: 'utf-8' });

    res.sendStatus(200);
});

AccountRouter.post("/delete-avatar", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const path = `uploads/${req.session.user.id}`;
    const filePath = `${path}/avatar`;

    await unlink(filePath);

    res.sendStatus(200);
});

AccountRouter.post("/edit-info/profile", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const [[addr]] = await DBConn.execute('SELECT * FROM address WHERE account_id = ?', [req.session.user.id]);

    res.json({
        email: req.session.user.email,
        biography: req.session.user.biography,
        phoneNumber: req.session.user.phone,
        cep: addr.cep,
        houseNumber: addr.house_number,
        street: addr.street,
        neighborhood: addr.neighborhood,
        city: addr.city
    });
});

AccountRouter.post("/update/education", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const formations = req.body;

    if (!Array.isArray(formations))
        return res.sendStatus(406);

    for (const formation of formations.slice(0, 3)) {
        const [[check]] = await DBConn.execute('SELECT COUNT(*) FROM account_formation WHERE formation_id = ? AND account_id = ?', [formation.index, req.session.user.id]);
    
        if (check['COUNT(*)'] === 0) {
            await DBConn.execute(
                `INSERT INTO account_formation(
                    account_id,
                    formation_id,
                    education,
                    formation,
                    institution,
                    situation,
                    startYear,
                    endYear,
                    period,
                    semester
                ) VALUES(
                    ?, ?, ?,
                    ?, ?, ?,
                    ?, ?, ?,
                    ?
                )`,
                [
                    req.session.user.id,
                    formation.index,
                    formation.education,
                    formation.formation,
                    formation.institution,
                    formation.situation,
                    formation.startYear,
                    formation.endYear,
                    formation.period,
                    formation.semester
                ]
            );
        } else {
            await DBConn.execute(
                `UPDATE account_formation SET
                    education = ?,
                    formation = ?,
                    institution = ?,
                    situation = ?,
                    startYear = ?,
                    endYear = ?,
                    period = ?,
                    semester = ?
                WHERE formation_id = ? AND account_id = ?`,
                [
                    formation.education,
                    formation.formation,
                    formation.institution,
                    formation.situation,
                    formation.startYear,
                    formation.endYear,
                    formation.period,
                    formation.semester,
                    formation.index,
                    req.session.user.id,
                ]
            );
        }
    }

    req.session.user = await getAccountInfo({id: req.session.user.id});
    req.session.save();

    res.sendStatus(200);
});

AccountRouter.post("/update/courses", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const courses = req.body;

    if (!Array.isArray(courses))
        return res.sendStatus(406);

    for (const course of courses.slice(0, 2)) {
        const [[check]] = await DBConn.execute('SELECT COUNT(*) FROM account_courses WHERE course_id = ? AND account_id = ?', [course.index, req.session.user.id]);
    
        if (check['COUNT(*)'] === 0) {
            await DBConn.execute(
                `INSERT INTO account_courses(
                    account_id,
                    course_id,
                    course,
                    institution,
                    workLoad,
                    conclusionYear
                ) VALUES(
                    ?, ?, ?,
                    ?, ?, ?
                )`,
                [
                    req.session.user.id,
                    course.index,
                    course.course,
                    course.institution,
                    course.workLoad,
                    course.conclusionYear,
                ]
            );
        } else {
            await DBConn.execute(
                `UPDATE account_courses SET
                    course = ?,
                    institution = ?,
                    workLoad = ?,
                    conclusionYear = ?
                WHERE course_id = ? AND account_id = ?`,
                [
                    course.course,
                    course.institution,
                    course.workLoad,
                    course.conclusionYear,
                    course.index,
                    req.session.user.id,
                ]
            );
        }
    }

    req.session.user = await getAccountInfo({id: req.session.user.id});
    req.session.save();
    
    res.sendStatus(200);
});

AccountRouter.post("/update/experiences", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const experiences = req.body;

    if (!Array.isArray(experiences))
        return res.sendStatus(406);

    for (const experience of experiences.slice(0, 2)) {
        const [[check]] = await DBConn.execute('SELECT COUNT(*) FROM account_experiences WHERE experience_id = ? AND account_id = ?', [experience.index, req.session.user.id]);
    
        if (check['COUNT(*)'] === 0) {
            await DBConn.execute(
                `INSERT INTO account_experiences(
                    account_id,
                    experience_id,
                    role,
                    company,
                    companyPhone,
                    remuneration,
                    admissionDate,
                    departureDate
                ) VALUES(
                    ?, ?, ?,
                    ?, ?, ?,
                    ?, ?
                )`,
                [
                    req.session.user.id,
                    experience.index,
                    experience.role,
                    experience.company,
                    experience.companyPhone,
                    experience.remuneration,
                    experience.admissionDate,
                    experience.departureDate
                ]
            );
        } else {
            await DBConn.execute(
                `UPDATE account_experiences SET
                    role = ?,
                    company = ?,
                    companyPhone = ?,
                    remuneration = ?,
                    admissionDate = ?,
                    departureDate = ?
                WHERE experience_id = ? AND account_id = ?`,
                [
                    experience.role,
                    experience.company,
                    experience.companyPhone,
                    experience.remuneration,
                    experience.admissionDate,
                    experience.departureDate,
                    experience.index,
                    req.session.user.id,
                ]
            );
        }
    }

    req.session.user = await getAccountInfo({id: req.session.user.id});
    req.session.save();
    
    res.sendStatus(200);
});

AccountRouter.post("/update/interests", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const { styles, softwares } = req.body;

    await DBConn.execute('UPDATE account_styles SET style_id = ? WHERE account_id = ?', [styles, req.session.user.id]);
    
    for (const software of req.session.user.softwares) {
        await DBConn.execute('DELETE FROM account_softwares WHERE software_id = ? AND account_id = ?', [software.id, req.session.user.id]);
    }

    for (const id of softwares) {
        await DBConn.execute('INSERT INTO account_softwares(software_id, account_id) VALUES(?, ?)', [id, req.session.user.id]);
    }
    
    req.session.user = await getAccountInfo({id: req.session.user.id});
    req.session.save();

    res.sendStatus(200);
});

AccountRouter.post("/update/password", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    const { password, confirmPassword } = req.body;
    
    if (typeof password !== 'string' || password !== confirmPassword) {
        return res.sendStatus(406);
    }

    const hashedPassword = await hash(password, 12);
    await DBConn.execute('UPDATE accounts SET password = ? WHERE id = ?', [hashedPassword, req.session.user.id]);

    req.session.destroy();

    res.sendStatus(200);
});

AccountRouter.post("/update/profile", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401); // Unauthorized
    }

    if (typeof req.body.username === 'string') {
        const [[result]] = await DBConn.execute('SELECT COUNT(*) FROM accounts WHERE username = ? AND id != ?;', [req.body.username, req.session.user.id]);

        if (result['COUNT(*)'] === 1) {
            return res.json({
                ok: false,
                field: 'username',
                message: 'Este nome de usuário já está em uso.'
            });
        }

        await DBConn.execute('UPDATE accounts SET username = ? WHERE id = ?', [req.body.username, req.session.user.id]);
    }

    if (typeof req.body.email === 'string') {
        const [[result]] = await DBConn.execute('SELECT COUNT(*) FROM accounts WHERE email = ? AND id != ?;', [req.body.email, req.session.user.id]);

        if (result['COUNT(*)'] === 1) {
            return res.json({
                ok: false,
                field: 'email',
                message: 'Este email já está em uso.'
            });
        }

        await DBConn.execute('UPDATE accounts SET email = ? WHERE id = ?', [req.body.email, req.session.user.id]);
    }

    if (typeof req.body.name === 'string')
        await DBConn.execute('UPDATE accounts SET name = ? WHERE id = ?', [req.body.name, req.session.user.id]);
        
    if (typeof req.body.biography === 'string')
        await DBConn.execute('UPDATE accounts SET biography = ? WHERE id = ?', [req.body.biography, req.session.user.id]);

    if (typeof req.body.phoneNumber === 'string')
        await DBConn.execute('UPDATE accounts SET phone = ? WHERE id = ?', [req.body.phoneNumber, req.session.user.id]);

    req.session.user = await getAccountInfo({firebase_uid: req.session.user.firebase_uid, firebase_provider: req.session.user.firebase_provider});
    req.session.save();

    if (typeof req.body.cep === 'string')
        await DBConn.execute('UPDATE address SET cep = ? WHERE account_id = ?', [req.body.cep, req.session.user.id]);

    if (typeof req.body.houseNumber === 'string')
        await DBConn.execute('UPDATE address SET house_number = ? WHERE account_id = ?', [req.body.houseNumber, req.session.user.id]);

    if (typeof req.body.street === 'string')
        await DBConn.execute('UPDATE address SET street = ? WHERE account_id = ?', [req.body.street, req.session.user.id]);

    if (typeof req.body.neighborhood === 'string')
        await DBConn.execute('UPDATE address SET neighborhood = ? WHERE account_id = ?', [req.body.neighborhood, req.session.user.id]);

    if (typeof req.body.city === 'string')
        await DBConn.execute('UPDATE address SET city = ? WHERE account_id = ?', [req.body.city, req.session.user.id]);

    res.json({
        ok: true
    });
});

AccountRouter.get("/profile/:username", async (req, res) => {
    if (req.params.username === undefined || req.params.username.length === 0) {
        return res.sendStatus(401);
    }
    
    if (!await checkAccountExistance({username: req.params.username})) {
        return res.sendStatus(404);
    }

    const [[result]] = await DBConn.execute(`SELECT id, name, premium_level, biography FROM accounts WHERE username=?`, [req.params.username]);

    result.collections = [];

    const [collections] = await DBConn.execute(`SELECT * FROM collections WHERE author_id=?`, [result.id]);

    for (const collection of collections) {
        await fetchCollectionInfos(req, collection);
        result.collections.push(collection);
    }

    const [[addr]] = await DBConn.execute(`SELECT * FROM address WHERE account_id=?`, [result.id]);

    result.address = {
        cep: addr.cep,
        houseNumber: addr.house_number,
        street: addr.street,
        neighborhood: addr.neighborhood,
        city: addr.city
    };

    result.softwares = [];

    const [softwares] = await DBConn.execute(`SELECT software_id FROM account_softwares WHERE account_id = ?`, [result.id]);
    
    for (const softwareId of softwares.map(s => s.software_id)) {
        const [[software]] = await DBConn.execute(`SELECT id, name, iconPath FROM collection_details_softwares WHERE id = ?`, [softwareId]);
        result.softwares.push(software);
    }

    return res.json(result);
});

AccountRouter.get("/:id/name", async (req, res) => {
    const exists = await checkAccountExistance(
        {
            id: req.params.id
        }
    );

    if (exists) {
        const result = await DBConn.execute(`SELECT name FROM accounts WHERE id=?`, [req.params.id]);

        return res.json({
            ok: true,
            name: result[0][0].name
        });
    }

    return res.json({
        ok: false,
        name: null
    })
});

AccountRouter.post("/validate/:field", async (req, res) => {
    if (!['name', 'email', 'profileName', 'cpf'].includes(req.params.field) || !Object.keys(req.body).includes(req.params.field)) {
        return res.status(401).send('Invalid field');
    }

    const exists = await checkAccountExistance(
        {
            [req.params.field]: req.body[req.params.field]
        }
    );

    res.json({
        exists
    });
});

AccountRouter.post("/signin/firebase", async (req, res) => {
    if (req.body.name === undefined || req.body.email === undefined || req.body.uid === undefined || req.body.providerId === undefined) {
        return res.json({
            ok: false,
            message: "Solicitação inválida"
        })
    }
    
    const {name, email, uid, providerId} = req.body;

    // Verificar se a conta existe, caso contrário cria a conta
    if (!(await checkAccountExistance({firebase_uid: uid, firebase_provider: providerId}))) {
        const username = name.split(" ")[0] + "-" + String(Math.floor(Math.random() * 9999));

        if (!(await createAccount({name, email, firebase_uid: uid, firebase_provider: providerId, username, password: '', cpf: '', premium_level: 0, premium_time: 0, biography: '', phone: ''}))) {
            return res.json({
                ok: false,
                message: 'Não foi possível criar sua conta, tente novamente.'
            });
        }
    }

    const info = await getAccountInfo({firebase_uid: uid, firebase_provider: providerId});

    if (info === null) {
        return res.json({
            ok: false,
            message: 'Conta não encontrada'
        })
    }
    
    req.session.loggedIn = true;
    req.session.user = info;

    req.session.save();

    return res.json({
        ok: true,
        message: 'Logado com sucesso'
    });
});
AccountRouter.post("/signup", async (req, res) => {
    const { name, username, password, email, cpf } = req.body;

    if (await checkAccountExistance({username})) {
        return res.json({
            ok: false,
            message: 'Já existe um usuário com este nome.'
        });
    } else if (await checkAccountExistance({email})) {
        return res.json({
            ok: false,
            message: 'Já existe um usuário com este email.'
        });
    } else if (await checkAccountExistance({cpf})) {
        return res.json({
            ok: false,
            message: 'Já existe um usuário com este CPF.'
        });
    }

    const hashedPassword = await hash(password, 12);

    if (await createAccount({name, username, password: hashedPassword, email, cpf, premium_level: 0, premium_time: 0, biography: '', phone: '', firebase_uid: '', firebase_provider: ''})) {
        const info = await getAccountInfo({name, username, password: hashedPassword, email, cpf});

        req.session.loggedIn = true;
        req.session.user = info;

        req.session.save();

        return res.json({
            ok: true,
            message: 'Conta criada com sucesso'
        });
    }

    res.json({
        ok: false,
        message: 'Não foi possível processar solicitação, tente novamente depois.'
    });
});

AccountRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body;

    const field = username.includes("@") ? 'email' : 'username';

    if (!await checkAccountExistance({[field]: username})) {
        return res.json({
            ok: false,
            message: `Usuário ou email inválido.`
        });
    }

    const info = await getAccountInfo({[field]: username});

    if (info === null) {
        return res.json({
            ok: false,
            message: "Conta não encontrada."
        });
    }

    if (!await compare(password, info.password)) {
        return res.json({
            ok: false,
            message: "Senha inválida"
        });
    }

    req.session.loggedIn = true;
    req.session.user = info;
    req.session.save();

    res.json({
        ok: true,
        message: 'Logado com sucesso'
    });
});

AccountRouter.get("/logout", async (req, res) => {
    req.session.destroy();
    res.json({ok: true});
});