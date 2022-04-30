import { Collection, Entity, Enum, ManyToMany, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Accommodation } from "./Accommodation";
import { Reservation } from "./Reservation";

@Entity()
export class User {

    @PrimaryKey()
    id!: number;

    @Property()
    username!: string;

    @Property({ hidden: true})
    password!: string;

    @Property()
    name!: string;

    @Property()
    e_mail!: string;

    @Enum()
    //role!: Role;
    role: Role = Role.MEMBER;

    @OneToMany(() => Accommodation, accommodation => accommodation.user)
    accommodations = new Collection<Accommodation>(this);

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations = new Collection<Reservation>(this);
}

export enum Role {
    MEMBER = 'MEMBER',
    ADMIN = 'ADMIN',
}