import { Collection, Entity, Enum, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Reservation } from "./Reservation";
import { Tag } from "./Tag";
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
    description!: string;

    @Property()
    technical_description!: string;

    @Property()
    adult_price!: number;

    @Property()
    child_price!: number;

    @Property()
    reserved: boolean = false;

    @Property()
    confirmed: boolean = false;

    @ManyToMany(() => Tag, 'accommodations', { owner: true})
    tags = new Collection<Tag>(this);

    @ManyToOne(() => User)
    user!: User;

    @OneToMany(() => Reservation, reservation => reservation.accommodation)
    reservations = new Collection<Reservation>(this);
}