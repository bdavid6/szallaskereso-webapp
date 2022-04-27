import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Role, User } from "../entities/User";

export const userRouter = Router();

userRouter
    .use((req, res, next) => {
        req.userRepository = req.orm.em.getRepository(User);
        next();
    })

    .get('/', async (req, res) => {
        const users = await req.userRepository!.findAll({ populate: ['reservations'] });
        res.send(users);
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await req.userRepository!.findOne({ id });
        res.send(user);
    })