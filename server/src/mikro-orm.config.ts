import { Configuration, IDatabaseDriver, Options } from "@mikro-orm/core";
import { env } from "process";
import { Accommodation } from "./entities/Accommodation";
import { Reservation } from "./entities/Reservation";
import { Tag } from "./entities/Tag";
import { User } from "./entities/User";

export default {
    entities: [ Accommodation, Tag, User, Reservation ],
    dbName: env.NODE_ENV === 'test' ? 'database.test.sqlite' : 'database.sqlite',
    type: "sqlite",
} as Options<IDatabaseDriver> | Configuration<IDatabaseDriver>;