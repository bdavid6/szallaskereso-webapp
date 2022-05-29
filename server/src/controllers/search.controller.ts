import { Router } from "express";
import { Accommodation } from "../entities/Accommodation";

export const searchRouter = Router();

searchRouter
    .use((req, res, next) => {
        req.accommodationRepository = req.orm.em.getRepository(Accommodation);
        next();
    })

    .get('', async (req, res) => {
        let accommodations;

        if (req.query.filter && req.query.date) {
            const date1 = String(req.query.date);
            const date2 = new Date(date1);
            const filter = String(req.query.filter);
            const modifiedFilter = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();
            accommodations = await req.accommodationRepository!.find({ place: modifiedFilter, confirmed: true, active: true, res_end_date: {$gte: date2} });

        } else if (req.query.filter) {
            const filter = String(req.query.filter);
            const modifiedFilter = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();
            accommodations = await req.accommodationRepository!.find({ place: modifiedFilter, confirmed: true, active: true });

        } else if (req.query.date) {
            const date1 = String(req.query.date);
            const date2 = new Date(date1);
            accommodations = await req.accommodationRepository!.find({ confirmed: true, active: true, res_end_date: {$gte: date2} });

        } else {
            accommodations = await req.accommodationRepository!.find({ confirmed: true, active: true });
        }
        res.send(accommodations);
    })