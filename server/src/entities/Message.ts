import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Message {

    @PrimaryKey()
    id!: number;

    @Property()
    text1!: string;

    @Property()
    text2!: string;

    @Property()
    createdAt!: string;

    @Property()
    user!: number; //user_id
}