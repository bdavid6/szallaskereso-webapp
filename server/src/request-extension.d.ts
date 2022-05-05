import { EntityManager, EntityRepository, MikroORM } from "@mikro-orm/core";
import { Accommodation } from "./entities/Accommodation";
import { Reservation } from "./entities/Reservation";
import { User as ApplicationUser } from "./entities/User";

declare global {
    namespace Express {
        interface User extends ApplicationUser {}

        export interface Request {
            orm: MikroORM;
            accommodationRepository?: EntityRepository<Accommodation>;
            userRepository?: EntityRepository<User>;
            reservationRepository?: EntityRepository<Reservation>;
            entityManager?: EntityManager;
        }
    }
}