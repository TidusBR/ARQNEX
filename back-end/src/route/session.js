import express from 'express'

export const SessionRouter = express.Router();

SessionRouter.post("/", async function(req, res) {
    res.json({loggedIn: req.session.loggedIn, account: {
        id: req.session.accountInfo?.id,
        name: req.session.accountInfo?.name,
        profileName: req.session.accountInfo?.profileName
    }});
});