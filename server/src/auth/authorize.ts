import { RequestHandler } from "express";
import { Role } from "../entities/User";

export function authorize(role: Role): RequestHandler {
    return (req, res, next) => {
        if (req.user?.role === role) {
            return next();
        }
        return res.sendStatus(403);
    }
}