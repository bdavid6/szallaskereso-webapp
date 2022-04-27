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
    type!: string;

    @Enum()
    //reserved!: Reserved;
    reserved: Reserved = Reserved.FALSE;

    @Property()
    confirmed: boolean = false;

    @Property()
    createdAt = new Date();

    @Property({ onUpdate: () => new Date() })
    updatedAt = new Date();

    @ManyToMany(() => Tag, 'accommodations', { owner: true})
    tags = new Collection<Tag>(this);

    @ManyToOne(() => User)
    user!: User;

    @OneToMany(() => Reservation, reservation => reservation.accommodation)
    reservations = new Collection<Reservation>(this);
}

export enum Reserved {
    TRUE = 'TRUE',
    FALSE = 'FALSE',
}