import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";
import { Message } from "../entities/Message";
import { Reservation } from "../entities/Reservation";
import { User } from "../entities/User";

export const reservationRouter = Router();

reservationRouter
    .use((req, res, next) => {
        req.reservationRepository = req.orm.em.getRepository(Reservation);
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        req.messageRepository = req.orm.em.getRepository(Message);
        next();
    })

    //user lefoglalt szállásainak lekérdezése
    .get('', async (req, res) => {
        const reservations = await req.reservationRepository!.find({ user: req.user!.id }, { populate: ['accommodation'] })
        res.send(reservations);
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
        const reservationFind = await req.reservationRepository!.findOne({ id: id }, { populate: ['accommodation'] });
        const deleting_user = reservationFind!.user.id;
        const accommodation_name = reservationFind!.accommodation.name;

        const reservation = await req.reservationRepository!.nativeDelete({ id: id });
        if (reservation) {

            if (deleting_user == req.user!.id) {
                const message = new Message();
                message.createdAt = new Date().toISOString().slice(0, 10);
                message.text1 = 'Ön visszamondta az egyik foglalását';
                message.text2 = ''
                message.user = req.user!.id;
                await req.messageRepository!.persistAndFlush(message);
            } else {
                const message = new Message();
                message.createdAt = new Date().toISOString().slice(0, 10);
                message.text1 = 'Törölve lett egyik foglalása a vendéglátó által  >>   szállás:  ' + accommodation_name + ' .';
                message.text2 = 'Panasz esetén kérjük vegye fel velünk a kapcsolatot!'
                message.user = deleting_user;
                await req.messageRepository!.persistAndFlush(message);
            }

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

                const message = new Message();
                message.createdAt = new Date().toISOString().slice(0, 10);
                message.text1 = 'Ön sikeres foglalást hajtott végre  >>  szállás:  ' + reservation.accommodation.name + ' .';
                message.text2 = 'Jó utazást kívánunk!'
                message.user = req.user!.id;
                await req.messageRepository!.persistAndFlush(message);

                await req.reservationRepository!.persistAndFlush(reservation);
                res.sendStatus(200);
            }
        }
    })