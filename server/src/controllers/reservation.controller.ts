import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Reservation } from "../entities/Reservation";

export const reservationRouter = Router();

reservationRouter
    .use((req, res, next) => {
        req.reservationRepository = req.orm.em.getRepository(Reservation);
        next();
    })

    .get('/', async (req, res) => {
        const reservations = await req.reservationRepository!.findAll();
        res.send(reservations);
    })