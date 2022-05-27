import { Reference, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";
import { Message } from "../entities/Message";
import { Reservation } from "../entities/Reservation";
import { Role, User } from "../entities/User";

export const accommodationRouter = Router();

accommodationRouter
    .use((req, res, next) => {
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        req.reservationRepository = req.orm.em.getRepository(Reservation);
        req.messageRepository = req.orm.em.getRepository(Message);
        next();
    })

    /*.get('', async (req, res) => {
        const accommodations = await req.accommodationRepository!.findAll();
        res.send(accommodations);
    })*/

    //egy szállás lekérdezése
    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id, confirmed: true });
        if (accommodation) {
            res.send(accommodation);
        } else {
            res.sendStatus(404);
        }
    })

    //user által kiadott szállások lekérdezése
    .get('/all/:role', async (req, res) => {
        const role = String(req.params.role);

        if (role == "MEMBER") {
            const accommodations = await req.accommodationRepository!.find({ user: req.user!.id, confirmed: true }, { populate: ['reservations'] })
            res.send(accommodations);
        } else {
            const accommodations = await req.accommodationRepository!.find({ confirmed: false }, { populate: ['user'] });
            res.send(accommodations);
        }
    })

    /*.get('/confirm/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id }, { populate: ['tags'] });
        accommodation!.confirmed = true;
        await req.accommodationRepository!.flush();

        //res.sendStatus(200);
        res.send(accommodation);
    })*/

    /*.get('/reserve/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id }, { populate: ['tags', 'user'] });
        accommodation!.reserved = true;
        accommodation!.user = req.orm.em.getReference(User, req.user!.id);
        await req.accommodationRepository!.flush();
        
        //res.sendStatus(200);
        res.send(accommodation);
    })*/

    //szállás bejelentése
    .post('/', async (req, res) => {
        const accommodation = new Accommodation();

        //wrap(accommodation).assign(req.body, { em: req.orm.em });
        accommodation.name = req.body.name;
        accommodation.phone_number = req.body.phone_number;
        accommodation.description = req.body.description;
        accommodation.information = req.body.information;
        accommodation.services = req.body.services;
        accommodation.adult_price = req.body.adult_price;
        accommodation.child_price = req.body.child_price;
        accommodation!.user = req.orm.em.getReference(User, req.user!.id);

        const place = req.body.place;
        const modifiedPlace = place.charAt(0).toUpperCase() + place.slice(1).toLowerCase();
        accommodation.place = modifiedPlace;

        if (req.body.res_end_date) {
            accommodation.res_end_date = new Date(req.body.res_end_date);
        } else {
            //maximum: explicit dátum
            accommodation.res_end_date = new Date('2025-01-01');
        }

        await req.accommodationRepository!.persistAndFlush(accommodation);
        res.sendStatus(200);
    })

    //szállás aktiválása, inaktiválása
    .put('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id: id });
        if (!accommodation) {
            res.sendStatus(409);

        } else {
            if (accommodation.active) {
                accommodation.active = false;

            } else {
                accommodation.active = true;
            }
            await req.accommodationRepository!.persistAndFlush(accommodation!);
            res.sendStatus(200);
        }
    })

    /*.post('/', async (req, res) => {
        const accommodation = new Accommodation();
        wrap(accommodation).assign(req.body, { em: req.orm.em });
        // console.log(accommodation.id)
        await req.accommodationRepository!.persistAndFlush(accommodation);
        const id = accommodation.id;
        const populatedSubject = req.accommodationRepository!.findOne({id: id});
        res.send(accommodation);
    })*/

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);

        const accommodation = await req.accommodationRepository!.findOne({ id: id });
        const userid = accommodation!.user.id;
        const name = accommodation!.name;

        const deleteaccommodation = await req.accommodationRepository!.nativeDelete({ id: id });
        if (deleteaccommodation) {

            const message = new Message();
            message.createdAt = new Date().toISOString().slice(0, 10);
            message.text1 = 'A szálláshirdetését nem fogadták el  >>  szállás:  ' + name + ' .';
            message.text2 = 'Panasz esetén vegye fel a kapcsolatot velünk!'
            message.user = userid;
            await req.messageRepository!.persistAndFlush(message);

            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    })

    //szállás elfogadása(confirmálása)
    .put('/confirm/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id: id });
        if (!accommodation) {
            res.sendStatus(409);

        } else {
            if (!accommodation.confirmed) {
                accommodation.confirmed = true;

                const message = new Message();
                message.createdAt = new Date().toISOString().slice(0, 10);
                message.text1 = 'A szálláshirdetése elfogadásra került  >>  szállás:  ' + accommodation!.name + ' .';
                message.text2 = 'Gratulálunk, mostmár fogadhat vendégeket!'
                message.user = accommodation!.user.id;
                await req.messageRepository!.persistAndFlush(message);
            }
            await req.accommodationRepository!.persistAndFlush(accommodation!);
            res.sendStatus(200);
        }
    })