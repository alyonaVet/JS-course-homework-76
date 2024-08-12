import express from "express";
import fileDb from "../fileDb";
import {MessageType} from "../types";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    const messages = await fileDb.getMessages();
    return res.send(messages);
});

messagesRouter.post("/", async (req, res) => {
    const message: MessageType = {
        author: req.body.author,
        message: req.body.message,
    };

    const savedMessage = await fileDb.addMessage(message);


    return res.send(savedMessage);
});

export default messagesRouter;