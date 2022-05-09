import { Reference, wrap } from "@mikro-orm/core";
import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";
import { Reservation } from "../entities/Reservation";
import { Role, User } from "../entities/User";

export const accommodationRouter = Router();

accommodationRouter
    .use((req, res, next) => {
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        req.reservationRepository = req.orm.em.getRepository(Reservation);
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
    .get('', async (req, res) => {
        const accommodations = await req.accommodationRepository!.find({ user: req.user!.id, confirmed: true }, { populate: ['reservations'] })
        res.send(accommodations);
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

        wrap(accommodation).assign(req.body, { em: req.orm.em });
        accommodation!.user = req.orm.em.getReference(User, req.user!.id);

        const place = req.body.place;
        const modifiedPlace = place.charAt(0).toUpperCase() + place.slice(1).toLowerCase();
        accommodation.place = modifiedPlace;

        accommodation.confirmed = true;
        accommodation.res_end_date = new Date(req.body.res_end_date);
        console.log(accommodation.res_end_date)

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