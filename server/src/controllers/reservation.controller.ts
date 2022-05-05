import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";
import { Reservation } from "../entities/Reservation";
import { User } from "../entities/User";

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

    //user által kiadott szállás id-ra érkezett foglalások
    .get('/accommodation/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservations = await req.reservationRepository!.find({ accommodation: id });
        res.send(reservations);
    })

    //foglalás törlés, reservation id alapján
    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = await req.reservationRepository!.nativeDelete({ id: id});
        if (reservation) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    })

    //egy szállás lefoglalása accomomodation id beküldésével, a usert kiolvassa
    .post('/accommodation/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = new Reservation();
        const accommodation = await req.accommodationRepository!.findOne({ id: id })

        if (accommodation!.user.id == req.user!.id) {

            res.sendStatus(405);
        } else {

            if (await req.reservationRepository!.findOne(
                { $and: [{ user: req.user!.id }, { accommodation: id }] }
            )) {
                res.sendStatus(409);
            } else {
                wrap(reservation).assign(req.body, { em: req.orm.em });
                reservation!.user = req.orm.em.getReference(User, req.user!.id);
                reservation!.accommodation = req.orm.em.getReference(Accommodation, id);

                await req.reservationRepository!.persistAndFlush(reservation);
                res.sendStatus(200);
            }
        }
    })

    //foglalás visszamondás, accommodation id alapján, a usert kiolvassa
    .delete('/accommodation/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = await req.reservationRepository!.nativeDelete({ user: req.user!.id, accommodation: id });
        if (reservation) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    })