import { Product } from "../interfaces/product";
import { atom } from "jotai";

export const productsAtom = atom<Product[]>([]);
