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

    @ManyToOne(() => User)
    user!: User;

    @ManyToOne(() => Accommodation)
    accommodation!: Accommodation;
}