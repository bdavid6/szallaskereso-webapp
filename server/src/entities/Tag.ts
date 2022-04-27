import { Collection, Entity, ManyToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Accommodation } from "./Accommodation";

@Entity()
export class Tag {

    @PrimaryKey()
    id!: number;

    @Property()
    text!: string;

    @ManyToMany(() => Accommodation, 'tags')
    accommodations = new Collection<Accommodation>(this);
}