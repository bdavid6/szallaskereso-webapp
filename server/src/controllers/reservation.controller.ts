import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";
import { Reservation } from "../entities/Reservation";

export const reservationRouter = Router();

reservationRouter
    .use((req, res, next) => {
        req.reservationRepository = req.orm.em.getRepository(Reservation);
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        next();
    })

    //user lefoglalt szállásainak lekérdezése
    .get('', async (req, res) => {
        const accommodations = await req.accommodationRepository!.find( { reservations: { user: { id: req.user!.id } } , confirmed: true })
        res.send(accommodations);
    })

    .get('/accommodation/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservations = await req.reservationRepository!.find({ accommodation: id });
        res.send(reservations);
    })

    //foglalás visszamondás, reservation id alapján
    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = await req.reservationRepository!.nativeDelete({ id: id});
        if (reservation) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    })