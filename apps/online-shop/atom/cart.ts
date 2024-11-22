import { Variant } from "@repo/common/interfaces/product";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export interface CartItem {
  productId: string;
  variant: Variant;
  quantity: number;
  pricePerItem: number;
  attributeValues?: string[];
  thumbnailUrl?: string;
}

export const cartCountAtom = atom<number>(0);
