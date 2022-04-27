import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Label {

    @PrimaryKey()
    id!: number;

    @Property()
    text!: string;
}