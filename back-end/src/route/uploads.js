import express from "express";

export const UploadsRouter = express.Router();

UploadsRouter.get("/:author_id/collections/:collection_id/:filename", (req, res) => {
    return res.sendFile(`${process.cwd()}/uploads/${req.params.author_id}/collections/${req.params.collection_id}/${req.params.filename}`);
});