import express from "express";
import session from "express-session";
import MySQLStore from "express-mysql-session"

import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import { config } from "./config.js";
import { DBConn } from "./database.js";
import { AccountRouter } from "./route/account.js";

const app = express();

if (config.isProduction) {
    const mysqlStore = new MySQLStore(session);
    const sessionStore = mysqlStore(config.sessionStore, DBConn)

    config.session = Object.assign(config.session, config.sessionProduction);
    config.session.store = sessionStore;

    app.set("trust proxy", 1);
}

// Configuration
app.use(cookieParser());
app.use(express.json());
app.use(cors(config.cors));
app.use(session(config.session));
app.use(bodyParser.json(config.bodyParser));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/account", AccountRouter);

// Run
app.listen(Number(process.env.PORT ?? config.devPort), () => {
    console.log(`App running on port ${process.env.PORT ?? config.devPort}`);
});