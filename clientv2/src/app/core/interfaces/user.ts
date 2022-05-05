import { Accommodation } from "./accommodation";
import { Reservation } from "./reservation";

export interface User {
    id?: number;
    username: string;
    password?: string;
    name: string;
    e_mail: string;
    role: Role;
    accommodations: Accommodation[];
    reservations: Reservation[];
}

export enum Role {
    MEMBER = 'MEMBER',
    ADMIN = 'ADMIN',
}