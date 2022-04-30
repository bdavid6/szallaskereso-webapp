import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";

export const searchRouter = Router();

searchRouter
    .use((req, res, next) => {
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        next();
    })

    .get('/:search', async (req, res) => {
        let accommodations: Accommodation[];
        const search = req.params.search;
        const modifiedSearch = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
        accommodations = await req.accommodationRepository!.find({ place: modifiedSearch, confirmed: true, reserved: false });
        res.send(accommodations);
    })

    .get('/', async (req, res) => {
        let accommodations: Accommodation[];
        accommodations = await req.accommodationRepository!.find({ confirmed: true, reserved: false });
        res.send(accommodations);
    })