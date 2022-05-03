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

        if (req.query.page) {
            const page = (+req.query.page);

            if (req.query.filter) {
                const filter = String(req.query.filter);
                const modifiedFilter = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();

                accommodations = await req.accommodationRepository!.find({ place: modifiedFilter, confirmed: true, active: true },
                    { limit: 3, offset: 3 * (page - 1) });

            } else {
                accommodations = await req.accommodationRepository!.find({ confirmed: true, active: true, },
                    { limit: 3, offset: 3 * (page - 1) });
            }

        } else {

            if (req.query.filter) {
                const filter = String(req.query.filter);
                const modifiedFilter = filter.charAt(0).toUpperCase() + filter.slice(1).toLowerCase();
                accommodations = await req.accommodationRepository!.find({ place: modifiedFilter, confirmed: true, active: true });

            } else {
                accommodations = await req.accommodationRepository!.find({ confirmed: true, active: true });
            }
        }
        res.send(accommodations);
    })