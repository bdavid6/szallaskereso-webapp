import jsonwebtoken from "jsonwebtoken";
import { User } from "../entities/User";
import { secret } from "./secret";

export function generateJwt(user: User) {
    const payload = {
        sub: user.id,
        role: user.role,
        username: user.username,
        //name: user.name,
        //e_mail: user.e_mail,
    };

    const token = jsonwebtoken.sign(payload, secret);

    return token;
}