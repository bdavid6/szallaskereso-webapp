import { Router } from "express";
import { passport } from "../auth/passport";
import { accommodationRouter } from "./accommodation.controller";
import { authRouter } from "./auth.controller";
import { messageRouter } from "./message.controller";
import { reservationRouter } from "./reservation.controller";
import { searchRouter } from "./search.controller";
import { userRouter } from "./user.controller";

export const routes = Router();
routes
    .use('/auth', authRouter)
    .use('/search', searchRouter)
    .use('/users', passport.authenticate("jwt", { session: false }), userRouter)
    .use('/accommodations',passport.authenticate("jwt", { session: false }), accommodationRouter)
    .use('/reservations', passport.authenticate("jwt", { session: false }), reservationRouter)
    .use('/messages', passport.authenticate("jwt", { session: false }), messageRouter)