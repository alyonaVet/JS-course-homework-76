import express from "express";
import fileDb from "../fileDb";
import {MessageType} from "../types";

const messagesRouter = express.Router();

messagesRouter.get("/", async (req, res) => {
    const allMessages = await fileDb.getMessages();
    const queryDate = req.query.datetime as string;

    if (queryDate !== undefined) {
        const date = new Date(queryDate);

        if (isNaN(date.getDate())) {
            return res.status(400).send({error: 'Invalid date'});
        }

        return res.send(allMessages.filter((message) => new Date(message.datetime) > date));
    }

    return res.send(allMessages.slice(-30));
});

messagesRouter.post("/", async (req, res) => {
    if (!req.body.author || !req.body.message) {
        return res.status(400).send({error: "Author and message must be present in the request"});
    }

    const message: MessageType = {
        author: req.body.author,
        message: req.body.message,
    };

    const savedMessage = await fileDb.addMessage(message);

    return res.send(savedMessage);
});

export default messagesRouter;