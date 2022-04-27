import { Reference, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Accommodation, Reserved } from "../entities/Accommodation";
import { Reservation } from "../entities/Reservation";
import { Role, User } from "../entities/User";

export const accommodationRouter = Router();

accommodationRouter
    .use((req, res, next) => {
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        req.reservationRepository = req.orm.em.getRepository(Reservation);
        next();
    })

    /*.get('/', async (req, res) => {
        const accommodations = await req.accommodationRepository!.findAll({ populate: ['tags'] });
        res.send(accommodations);
    })*/

    .get('/', async (req, res) => {
        let accommodations: Accommodation[];

        if (req.user!.role === Role.ADMIN) {
            accommodations = await req.accommodationRepository!.find({ confirmed: false });
        } else {
            accommodations = await req.accommodationRepository!.findAll({ populate: ['tags', 'reservations'] });
        }
        res.send(accommodations);
    })

    .get('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id }, { populate: ['tags'] });
        res.send(accommodation);
    })

    .get('/confirm/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id }, { populate: ['tags'] });
        accommodation!.confirmed = true;
        await req.accommodationRepository!.flush();

        //res.sendStatus(200);
        res.send(accommodation);
    })

    /*.get('/reserve/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const accommodation = await req.accommodationRepository!.findOne({ id }, { populate: ['tags', 'user'] });
        accommodation!.reserved = Reserved.TRUE;
        accommodation!.user = req.orm.em.getReference(User, req.user!.id);
        await req.accommodationRepository!.flush();
        
        //res.sendStatus(200);
        res.send(accommodation);
    })*/

    //LEFOGLALÁS
    .post('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = new Reservation();

        wrap(reservation).assign(req.body, { em: req.orm.em });
        reservation!.user = req.orm.em.getReference(User, req.user!.id);
        reservation!.accommodation = req.orm.em.getReference(Accommodation, id);

        await req.reservationRepository!.persistAndFlush(reservation);
        res.send(reservation);

    })

    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = await req.reservationRepository!.nativeDelete({ user: req.user!.id, accommodation: id });
        if (reservation){
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    })

    .post('/', async (req, res) => {
        const accommodation = new Accommodation();

        wrap(accommodation).assign(req.body, { em: req.orm.em });
        accommodation!.user = req.orm.em.getReference(User, req.user!.id);


        await req.accommodationRepository!.persistAndFlush(accommodation);
        res.send(accommodation);
    })

/*.post('/', async (req, res) => {
    const accommodation = new Accommodation();
    wrap(accommodation).assign(req.body, { em: req.orm.em });
    // console.log(accommodation.id)
    await req.accommodationRepository!.persistAndFlush(accommodation);
    const id = accommodation.id;
    const populatedSubject = req.accommodationRepository!.findOne({id: id});
    res.send(accommodation);
})

.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const building = await req.buildingRepository!.nativeDelete({ id });
    if (building){
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
})*/