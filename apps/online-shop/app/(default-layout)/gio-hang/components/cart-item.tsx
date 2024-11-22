"use client";
import { formatCurrency } from "@repo/common/utils/currency-format";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import { Minus, Plus, Trash } from "lucide-react";
import Image from "next/image";
import { CartResponse } from "../../../../interfaces/cart";

const FALLBACK_URL =
  "https://media3.coolmate.me/cdn-cgi/image/width=320,height=362,quality=80/uploads/May2024/qddpden7.jpg";

interface ICartItemProps {
  cartItem: CartResponse;
  onCartItemChange: (cartItem: CartResponse, quantity: number) => void;
  onDeleteItem: (cartItem: CartResponse) => void;
}

const CartItem = ({
  cartItem,
  onCartItemChange,
  onDeleteItem,
}: ICartItemProps) => {
  const handleRemoveCartItem = () => {
    onDeleteItem(cartItem);
  };

  const handleChangeNumberOfItem = (value: number) => {
    onCartItemChange(cartItem, value);
  };

  return (
    <div>
      <div className="grid grid-cols-6 gap-4 pt-2">
        <div className="col-span-4 flex gap-4">
          <div className="flex flex-shrink-0 gap-4 w-[120px] rounded-lg overflow-hidden">
            <Image
              src={cartItem.images[0]?.url ?? ""}
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-cover"
              alt="Product image"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-col">
              <h1 className="">{cartItem.productName}</h1>
              <p className="text-gray-500 text-sm">
                {cartItem.attributeValues?.join(" / ")}
              </p>
            </div>
            <Button
              onClick={handleRemoveCartItem}
              variant={"destructive"}
              size={"icon"}
              className="mt-auto"
            >
              <Trash size={16} />
            </Button>
          </div>
        </div>
        <div>
          <div className="flex mt-10">
            <div
              onClick={() => {
                handleChangeNumberOfItem(-1);
              }}
              className="size-10 flex items-center justify-center rounded-tl-full rounded-bl-full border border-black border-x-0 cursor-pointer border-r-0"
            >
              <Minus size={16} />
            </div>
            <input
              value={cartItem.quantity}
              className="size-10 border border-black border-x-0 text-center"
              // onChange={(e) => {
              //   // ignore value except number
              //   // e.target.value = e.target.value.replace(/[^0-9]/g, "");
              // }}
            />
            <div
              onClick={() => {
                handleChangeNumberOfItem(1);
              }}
              className="size-10 flex items-center justify-center rounded-tr-full rounded-br-full border border-black border-x-0  cursor-pointer border-r-0"
            >
              <Plus size={16} />
            </div>
          </div>
        </div>
        <div className="text-right font-bold text-sm mt-10">
          {formatCurrency(cartItem.pricePerItem * cartItem.quantity)}
        </div>
      </div>

      <Separator className="mt-8" />
    </div>
  );
};

export default CartItem;
