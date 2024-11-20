"use client";
import { useAtom } from "jotai";
import { cartAtom } from "../../../../atom/cart";
import CartItem from "./cart-item";
const CartList = () => {
  const [cart] = useAtom(cartAtom);
  return cart.map((item) => <CartItem key={item.variant.id} cartItem={item} />);
};

export default CartList;
