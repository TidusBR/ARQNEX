import express from 'express';
import { captureOrder, createOrder } from '../paypal-api.js';
import { DBConn } from '../database.js';

export const PaypalRouter = express.Router();

PaypalRouter.post("/create-order", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401);
    }

    try {
        const { jsonResponse, httpStatusCode } = await createOrder(req.body);
        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

PaypalRouter.post("/capture-order", async (req, res) => {
    if (!req.session.loggedIn) {
        return res.sendStatus(401);
    }

    try {
        const { orderID } = req.body;
        const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
        
        if (jsonResponse?.status === 'COMPLETED') {
            // tempo atual em millis + (1 mês em millis) //  Date.now() + (730 * 60 * 60 * 1000);
            const premiumTime =  Date.now() + 60000;

            await DBConn.execute(`UPDATE accounts SET premium_level = 1, premium_time = ? WHERE id = ?;`, [
                premiumTime,
                req.session.user.id
            ]);

            req.session.user.premium_level = 1;
            req.session.user.premium_time = premiumTime;
            req.session.save();
        }

        res.status(httpStatusCode).json(jsonResponse);
    } catch (error) {
        console.error("Failed to capture order:", error);
        res.status(500).json({ error: "Failed to capture order." });
    }
});