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

import {createServer} from "https";
import { readFile } from "fs/promises";
import { PeopleRouter } from "./route/people.js";
import { NotificationsRouter } from "./route/notifications.js";
import { OfficeRouter } from "./route/office.js";

const app = express();

app.set("trust proxy", 1);
/*
const sessionStore = new (MySQLStore(session))(config.sessionStore, DBConn);

config.session = Object.assign(config.session, config.sessionProduction);
config.session.store = sessionStore;
*/

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
    req.session.user ??= {};

    return next();
})

app.use(cookieParser());
app.use(express.json({limit: "100mb"}));
app.use(bodyParser.json(config.bodyParser));
app.use(express.urlencoded({ extended: true, limit: "100mb" }));

// Routes
app.all("*", async (req, _, next) => {
    if (req.session.loggedIn && req.session.user?.premium_level > 0) {
        if (Date.now() - req.session.user?.premium_time > 0) {
            await DBConn.execute(`UPDATE accounts SET premium_level = 0, premium_time = 0 WHERE id = ?;`, [
                req.session.user.id
            ]);

            req.session.user.premium_level = 0;
            req.session.user.premium_time = 0;
            req.session.save();
        }
    }

    return next();
});

app.use("/people", PeopleRouter);
app.use("/account", AccountRouter);
app.use("/session", SessionRouter);
app.use("/collection", CollectionRouter);
app.use("/uploads", UploadsRouter);
app.use("/paypal", PaypalRouter);
app.use("/notifications", NotificationsRouter);
app.use("/office", OfficeRouter);

/*
createServer(
    {
        key: await readFile("server.key"),
        cert: await readFile("server.cert"),
    },
    app
)*/
app.listen(Number(process.env.PORT ?? config.devPort), () => {
    console.log(`App running on port ${process.env.PORT ?? config.devPort}`);
});