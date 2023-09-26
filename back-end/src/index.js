import express from "express";
import session from "express-session";
import MySQLStore from "express-mysql-session"

import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { config } from "./config.js";
import { DBConn } from "./database.js";
import { AccountRouter } from "./route/account.js";
import { SessionRouter } from "./route/session.js";
import { CollectionRouter } from "./route/collection.js";
import { UploadsRouter } from "./route/uploads.js";
import { PaypalRouter } from "./route/paypal.js";

const app = express();

app.set("trust proxy", 1);

if (config.isProduction) {
    const mysqlStore = new MySQLStore(session);
    const sessionStore = mysqlStore(config.sessionStore, DBConn)

    config.session = Object.assign(config.session, config.sessionProduction);
    config.session.store = sessionStore;
}

// Configuration
app.use(cors(config.cors));
app.use(session(config.session));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, authorization'
    );
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,PUT,OPTIONS');
    res.header('Access-Control-Allow-Origin', config.cors.origin);

    req.session.loggedIn ??= false;
    req.session.accountInfo ??= {};

    return next();
})

app.use(cookieParser());
app.use(express.json({limit: "100mb"}));
app.use(bodyParser.json(config.bodyParser));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Routes
app.all("*", async (req, _, next) => {
    if (req.session.loggedIn && req.session.accountInfo?.premium_level > 0) {
        if (Date.now() - req.session.accountInfo?.premium_time > 0) {
            await DBConn.execute(`UPDATE accounts SET premium_level = 0, premium_time = 0 WHERE id = ?;`, [
                req.session.accountInfo.id
            ]);

            req.session.accountInfo.premium_level = 0;
            req.session.accountInfo.premium_time = 0;
            req.session.save();
        }
    }

    return next();
});

app.use("/account", AccountRouter);
app.use("/session", SessionRouter);
app.use("/collection", CollectionRouter);
app.use("/uploads", UploadsRouter);
app.use("/paypal", PaypalRouter);

// Run
app.listen(Number(process.env.PORT ?? config.devPort), () => {
    console.log(`App running on port ${process.env.PORT ?? config.devPort}`);
});