import express from "express";
import { compare, hash } from "bcrypt";

import { DBConn, checkAccountExistance, createAccount, getAccountInfo } from "../database.js";

export const AccountRouter = express.Router();

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
        if (!(await createAccount({name, email, firebase_uid: uid, firebase_provider: providerId}))) {
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
    req.session.accountInfo = info;

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

    if (await createAccount({name, username, password: hashedPassword, email, cpf})) {
        const info = await getAccountInfo({name, username, password: hashedPassword, email, cpf});

        req.session.loggedIn = true;
        req.session.accountInfo = info;

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

    if (!await checkAccountExistance({username})) {
        return res.json({
            ok: false,
            message: `Usuário inválido.`
        });
    }

    const info = await getAccountInfo({username});

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
    req.session.accountInfo = info;
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