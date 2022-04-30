import { wrap } from "@mikro-orm/core";
import { Router } from "express";
import { generateJwt } from "../auth/jwt-generator";
import { hashPassword } from "../auth/password-security";
import { User } from "../entities/User";

export const authRouter = Router();

authRouter
    .use((req, res, next) => {
        req.userRepository = req.orm.em.getRepository(User);
        next();
    })

    .post('/register', async (req, res) => {
        const { username, password }: AuthenticationDto = req.body;
        const name: string = req.body.name;
        const e_mail: string = req.body.e_mail;
        let user = await req.userRepository!.findOne({ username });
        if (user) {
            return res.sendStatus(409);
        }
        
        const hashedPassword = await hashPassword(password);

        user = new User();
        //wrap(user).assign({ username, password: hashedPassword });
        wrap(user).assign({ username, password: hashedPassword, name, e_mail });
        await req.userRepository!.persistAndFlush(user);
        
        return res.sendStatus(200);
        //res.send(user);
    })

    .post('/login', async (req, res) => {
        const { username, password }: AuthenticationDto = req.body;
        const user = await req.userRepository!.findOne({ username });
        if (!user) {
            return res.sendStatus(401);
        }

        const hashedPassword = await hashPassword(password);
        if (hashedPassword !== user.password) {
            return res.sendStatus(401);
        }

        return res.send({
            //...user,
            token: generateJwt(user),
        });
    });

interface AuthenticationDto {
    username: string;
    password: string;
}