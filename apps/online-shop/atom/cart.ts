import { Variant } from "@repo/common/interfaces/product";
import { atomWithStorage } from "jotai/utils";

export interface CartItem {
  productId: string;
  variant: Variant;
  quantity: number;
  pricePerItem: number;
  attributeValues?: string[];
  thumbnailUrl?: string;
}

export const cartAtom = atomWithStorage<CartItem[]>("cart", []);
