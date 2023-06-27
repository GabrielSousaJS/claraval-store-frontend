import { Category } from "./category";

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imgUrl: string;
    categories: Category[];
}