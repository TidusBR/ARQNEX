import express from "express";
import { compare, hash } from "bcrypt";

import { checkAccountExistance, createAccount, getAccountInfo } from "../database.js";

export const AccountRouter = express.Router();

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

AccountRouter.post("/signup", async (req, res) => {
    const { name, profileName, password, email, cpf } = req.body;

    if (await checkAccountExistance({name, profileName, email, cpf})) {
        return res.json({
            ok: false,
            message: 'An account already exists with this information.'
        });
    }

    if (await createAccount({name, profileName, password: await hash(password, 12), email, cpf})) {
        return res.json({
            ok: true,
            message: 'Account created successfully'
        });
    }

    res.json({
        ok: false,
        message: 'Could not process request, please try again.'
    });
});

AccountRouter.post("/signin", async (req, res) => {
    const { name, password } = req.body;

    if (!await checkAccountExistance({name})) {
        return res.json({
            ok: false,
            message: `There are no accounts registered with this name.`
        });
    }

    const info = await getAccountInfo({name});

    if (info === null) {
        return res.json({
            ok: false,
            message: "Unable to get account info, try again."
        });
    }

    if (!await compare(password, info.password))

    req.session.accountInfo = info;
    req.session.save();

    res.json({
        ok: true,
        message: 'Logged in successfully'
    });
});