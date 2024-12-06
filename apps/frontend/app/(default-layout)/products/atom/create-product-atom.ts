import { atom } from "jotai";

export const createProductAtom = atom({
  totalQuantity: 0,
  shouldDisaleTotalQuantity: false,
  productPrice: 0,
});
