import { Router } from "express";
import { passport } from "../auth/passport";
import { accommodationRouter } from "./accommodation.controller";
import { authRouter } from "./auth.controller";
import { reservationRouter } from "./reservation.controller";
import { searchRouter } from "./search.controller";
import { tagRouter } from "./tag.controller";
import { userRouter } from "./user.controller";

export const routes = Router();
routes
    .use('/auth', authRouter)
    .use('/search', searchRouter)
    .use('/users', passport.authenticate("jwt", { session: false }), userRouter)
    .use('/accommodations',passport.authenticate("jwt", { session: false }), accommodationRouter)
    .use('/tags', passport.authenticate("jwt", { session: false }), tagRouter)
    .use('/reservations', passport.authenticate("jwt", { session: false }), reservationRouter)