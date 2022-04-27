import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Accommodation } from "./Accommodation";
import { User } from "./User";

@Entity()
export class Reservation {

    @PrimaryKey()
    id!: number;

    /*@Property()
    startDate!: Date;

    @Property()
    endDate!: Date;*/

    @Property()
    startDate!: number;

    @Property()
    endDate!: number;

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Accommodation)
    accommodation!: Accommodation;
}