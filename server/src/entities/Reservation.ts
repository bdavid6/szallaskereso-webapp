import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Accommodation } from "./Accommodation";
import { User } from "./User";

@Entity()
export class Reservation {

    @PrimaryKey()
    id!: number;

    @Property()
    start_date!: string;

    @Property()
    end_date!: string;

    /*@Property()
    nights!: number;

    @Property()
    rooms!: number;*/

    @Property()
    adults!: number;

    @Property()
    children!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Accommodation)
    accommodation!: Accommodation;
}