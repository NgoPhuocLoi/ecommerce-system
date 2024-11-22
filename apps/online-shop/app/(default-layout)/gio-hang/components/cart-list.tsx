"use client";
import { formatCurrency } from "@repo/common/utils/currency-format";
import { Button } from "@repo/ui/components/ui/button";
import { Label } from "@repo/ui/components/ui/label";
import { Separator } from "@repo/ui/components/ui/separator";
import { useEffect, useMemo, useState } from "react";
import {
  addToCart,
  clearCart,
  removeFromCart,
  retrieveCart,
} from "../../../../actions/cart";
import { CartResponse } from "../../../../interfaces/cart";
import CartItem from "./cart-item";
import { useAtom } from "jotai";
import { cartCountAtom } from "../../../../atom/cart";

const SkeletonLoading = () => {
  return [1, 2, 3].map((_, index) => (
    <div key={_} className="grid grid-cols-6 gap-4 pt-2">
      <div className="col-span-4 flex gap-4">
        <div className="flex flex-shrink-0 gap-4 w-[120px] rounded-lg overflow-hidden">
          <div className="animate-pulse bg-gray-300 w-full h-[120px]"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col">
            <div className="animate-pulse bg-gray-300 h-4 w-1/2"></div>
            <div className="animate-pulse bg-gray-300 h-4 w-1/4"></div>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-center items-end">
        <div className="animate-pulse bg-gray-300 h-4 w-1/4"></div>
      </div>
    </div>
  ));
};

const CartList = () => {
  const [cartItems, setCartItems] = useState<CartResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setCountCart] = useAtom(cartCountAtom);
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item.pricePerItem * item.quantity;
    }, 0);
  }, [cartItems]);
  const discountPrice = 0;
  const shippingPrice = 0;

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      const items = await retrieveCart();
      setCartItems(items);
      setLoading(false);
    };
    fetchCart();
  }, []);

  const onCartItemChange = async (
    cartItem: CartResponse,
    quantityToChange: number,
  ) => {
    const newQuantity = cartItem.quantity + quantityToChange;
    if (newQuantity < 1) {
      setCartItems((prev) => prev.filter((item) => item.id !== cartItem.id));
    } else {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === cartItem.id ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
    setLoading(true);
    await addToCart({
      variantId: cartItem.variantId,
      quantity: quantityToChange,
      pricePerItem: cartItem.pricePerItem,
    });
    setCountCart((prev) => prev + quantityToChange);
    setLoading(false);
  };

  const onDeleteItem = async (cartItem: CartResponse) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItem.id));
    setLoading(true);
    await removeFromCart(cartItem.id);
    setCountCart((prev) => prev - cartItem.quantity);
    setLoading(false);
  };

  const onClearCart = async () => {
    setCartItems([]);
    setLoading(true);
    await clearCart();
    setCountCart(0);
    setLoading(false);
  };

  return (
    <>
      <div className="grid grid-cols-6 text-gray-500 text-xs">
        <div
          className="col-span-4 hover:text-gray-800 cursor-pointer"
          onClick={onClearCart}
        >
          XÓA TẤT CẢ
        </div>
        <div>SỐ LƯỢNG</div>
        <div className="text-right">GIÁ</div>
      </div>

      <Separator />
      {loading ? (
        <SkeletonLoading />
      ) : cartItems.length > 0 ? (
        cartItems.map((item) => (
          <CartItem
            onCartItemChange={onCartItemChange}
            onDeleteItem={onDeleteItem}
            key={item.id}
            cartItem={item}
          />
        ))
      ) : (
        <div className="text-sm text-gray-500 italic">
          <p>Không có sản phẩm nào trong giỏ hàng</p>
          <p>Giỏ hàng của bạn hiện đang trống. Hãy mua sắm ngay nhé!</p>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-6">
        <div className="flex justify-between">
          <Label className="">Tạm tính</Label>
          <h2 className=" text-right">{formatCurrency(totalPrice)}</h2>
        </div>

        <div className="flex justify-between">
          <Label className="">Giảm giá</Label>
          <h2 className=" text-right">{formatCurrency(discountPrice)}</h2>
        </div>

        <div className="flex justify-between">
          <Label className="">Phí vận chuyển</Label>
          <h2 className=" text-right">{formatCurrency(shippingPrice)}</h2>
        </div>

        <Separator />

        <div className="flex justify-between">
          <Label className="text-lg font-bold">Tổng cộng</Label>
          <h2 className=" text-right font-bold">
            {formatCurrency(totalPrice + shippingPrice - discountPrice)}
          </h2>
        </div>
      </div>

      {cartItems.length > 0 && <Button className="mt-6">Thanh toán</Button>}
    </>
  );
};

export default CartList;
