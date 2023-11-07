import express from "express";
import { access, constants } from "node:fs/promises";
import { config } from "../config.js";

export const UploadsRouter = express.Router();

UploadsRouter.get("/:author_id/collections/:collection_id/:filename", (req, res) => {
    return res.sendFile(`${process.cwd()}/uploads/${req.params.author_id}/collections/${req.params.collection_id}/${req.params.filename}`);
});

UploadsRouter.get("/:author_id/avatar", async (req, res) => {
    const filePath = `${process.cwd()}/uploads/${req.params.author_id}/avatar`;

    try {
        await access(filePath, constants.F_OK);
        res.sendFile(filePath);
    } catch {
        res.redirect(`${config.cors.origin}/default-profile.png`);
    }
});

UploadsRouter.get("/:author_id/office", async (req, res) => {
    const filePath = `${process.cwd()}/uploads/${req.params.author_id}/office`;

    try {
        await access(filePath, constants.F_OK);
        res.sendFile(filePath);
    } catch {
        res.redirect(`${config.cors.origin}/default-office.png`);
    }
});