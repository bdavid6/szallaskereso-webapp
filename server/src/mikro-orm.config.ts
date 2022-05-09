import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { env } from "process";
import { Accommodation } from "./entities/Accommodation";
import { Message } from "./entities/Message";
import { Reservation } from "./entities/Reservation";
import { User } from "./entities/User";

export default {
    entities: [ Accommodation, User, Reservation, Message ],
    dbName: env.NODE_ENV === 'test' ? 'database.test.sqlite' : 'database.sqlite',
    type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;