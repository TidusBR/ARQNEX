import express from 'express'

export const SessionRouter = express.Router();

SessionRouter.post("/", async function(req, res) {
    res.json({loggedIn: req.session.loggedIn, account: {
        id: req.session.user?.id,
        name: req.session.user?.name,
        username: req.session.user?.username,
        isPremium: req.session.user?.premium_level > 0,
        softwares: req.session.user?.softwares,
        styles: req.session.user?.styles,
        formations: req.session.user?.formations,
        courses: req.session.user?.courses,
        experiences: req.session.user?.experiences,
        hasOffice: req.session.user?.office !== undefined
    }});
});