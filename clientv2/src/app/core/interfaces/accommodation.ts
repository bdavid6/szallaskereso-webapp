import { Reservation } from "./reservation";
import { User } from "./user";

export interface Accommodation {
    id: number;
    name: string;
    place: string;
    phone_number: number;
    description: string;
    information: string;
    services: string[];
    //res_start_date: string;
    res_end_date: string;
    adult_price: number;
    child_price: number;
    active: boolean;
    confirmed: boolean;
    user: User; //id
    reservations: Reservation[];
}
