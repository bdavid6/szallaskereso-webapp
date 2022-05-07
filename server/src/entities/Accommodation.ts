import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";
import { User } from "./User";

@Entity()
export class Accommodation {

    @PrimaryKey()
    id!: number;

    @Property()
    name!: string;

    @Property()
    place!: string;

    @Property()
    phone_number!: number;

    @Property()
    description!: string;

    @Property()
    information!: string;

    @Property()
    services!: string[];

    /*@Property()
    res_start_date!: string;*/

    @Property()
    res_end_date!: string;

    @Property()
    adult_price!: number;

    @Property()
    child_price!: number;

    @Property()
    active: boolean = true;

    @Property()
    confirmed: boolean = false;

    @ManyToOne(() => User)
    user!: User;

    @OneToMany(() => Reservation, reservation => reservation.accommodation)
    reservations = new Collection<Reservation>(this);
}