import { Router } from "express";
import { Message } from "../entities/Message";

export const messageRouter = Router();

messageRouter
    .use((req, res, next) => {
        req.messageRepository = req.orm.em.getRepository(Message);
        next();
    })

    .get('', async (req, res) => {
        const messages = await req.messageRepository!.find({user: req.user!.id})
        res.send(messages);
    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const message = await req.messageRepository!.nativeDelete({ id: id});
        if (message) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    })