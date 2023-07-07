import { Address } from "./address";

export type User = {
    id: number;
    name: string;
    birthDate: string;
    email: string;
    address: Address;
}