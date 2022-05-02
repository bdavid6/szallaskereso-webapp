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

    //lefoglalt szállások lekérdezése
    .get('', async (req, res) => {
        const accommodations = await req.accommodationRepository!.find( { reservations: { user: { id: req.user!.id } } , confirmed: true })
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

    //egy szállás lefoglalása
    .post('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = new Reservation();
        const accommodation = await req.accommodationRepository!.findOne( { id: id } )

        if(accommodation!.user.id == req.user!.id) {
            
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

    //foglalás visszamondás
    .delete('/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const reservation = await req.reservationRepository!.nativeDelete({ user: req.user!.id, accommodation: id });
        if (reservation) {
            res.sendStatus(200);
        } else {
            res.sendStatus(409);
        }
    })

    //szállás bejelentése
    .post('/', async (req, res) => {
        const accommodation = new Accommodation();

        wrap(accommodation).assign(req.body, { em: req.orm.em });
        accommodation!.user = req.orm.em.getReference(User, req.user!.id);
        
        const place = req.body.place;
        const modifiedPlace = place.charAt(0).toUpperCase() + place.slice(1).toLowerCase();
        accommodation.place = modifiedPlace;

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