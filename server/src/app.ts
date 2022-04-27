import express from "express";
import bodyParser from "body-parser"
import { routes } from "./controllers"
import { mikroorm } from "./mikroorm";
import mikroOrmConfig from "./mikro-orm.config";
import { passport } from "./auth/passport";

const app = express();

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(mikroorm(mikroOrmConfig));

app.use(routes);

export { app };