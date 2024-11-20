"use client";
import { Label } from "@repo/ui/components/ui/label";
import { Separator } from "@repo/ui/components/ui/separator";
import React, { useMemo } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../../../../atom/cart";
import { formatCurrency } from "@repo/common/utils/currency-format";

const CartPrice = () => {
  const [cart] = useAtom(cartAtom);
  const totalPrices = useMemo(
    () =>
      cart.reduce((acc, item) => {
        return acc + item.pricePerItem * item.quantity;
      }, 0),
    [cart],
  );
  const shippingPrice = useMemo(() => 30000, []);
  const discountPrice = useMemo(() => 30000, []);
  const finalPrice = useMemo(
    () => totalPrices + shippingPrice - discountPrice,
    [totalPrices, shippingPrice, discountPrice],
  );
  return (
    <div className="flex flex-col gap-3 mt-6">
      <div className="flex justify-between">
        <Label className="">Tạm tính</Label>
        <h2 className=" text-right">{formatCurrency(totalPrices)}</h2>
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
        <h2 className=" text-right font-bold">{formatCurrency(finalPrice)}</h2>
      </div>
    </div>
  );
};

export default CartPrice;
