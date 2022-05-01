import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";

export const searchRouter = Router();

searchRouter
    .use((req, res, next) => {
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        next();
    })

    .get('/all', async (req, res) => {
        const accommodations = await req.accommodationRepository!.find({ confirmed: true, reserved: false });
        res.send(accommodations);
    })

    .get('/:page', async (req, res) => {
        const page = parseInt(req.params.page);
        const accommodations = await req.accommodationRepository!.find({ confirmed: true, reserved: false },
            { limit: 3, offset: 3 * (page - 1) });
        res.send(accommodations);
    })

    .get('/filter/:search/all', async (req, res) => {
        const search = req.params.search;
        const modifiedSearch = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
        const accommodations = await req.accommodationRepository!.find({ place: modifiedSearch, confirmed: true, reserved: false });
        res.send(accommodations);
    })

    .get('/filter/:search/:page', async (req, res) => {
        const page = parseInt(req.params.page);
        const search = req.params.search;
        const modifiedSearch = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase();
        const accommodations = await req.accommodationRepository!.find({ place: modifiedSearch, confirmed: true, reserved: false },
            { limit: 3, offset: 3 * (page - 1) });
        res.send(accommodations);

    })