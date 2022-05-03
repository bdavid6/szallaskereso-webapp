import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Tag } from "../entities/Tag";
import { Role } from "../entities/User";

export const tagRouter = Router();

tagRouter
    .use((req, res, next) => {
        req.tagRepository = req.orm.em.getRepository(Tag);
        next();
    })

    .get('/', async (req, res) => {
        const tags = await req.tagRepository!.findAll();
        res.send(tags);
    })

    .post('/', async (req, res) => {
        const tag = new Tag();
        wrap(tag).assign(req.body, { em: req.orm.em });
        await req.tagRepository!.persistAndFlush(tag);
        res.send(tag);
    })