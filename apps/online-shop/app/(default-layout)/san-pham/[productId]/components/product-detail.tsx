"use client";
import { Product } from "@repo/common/interfaces/product";
import { formatCurrency } from "@repo/common/utils/currency-format";
import { Button } from "@repo/ui/components/ui/button";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

interface IProductDetailProps {
  product: Product;
}

const ProductDetail = ({ product }: IProductDetailProps) => {
  const [selectedValueIds, setSelectedValueIds] = useState<string[]>(
    product.attributes?.map((attribute) =>
      attribute.values[0]!.id.toString(),
    ) ?? [],
  );
  return (
    <div className="w-full h-full flex flex-col gap-4 text-gray-800">
      <h1 className="text-4xl font-bold">{product?.name}</h1>

      <div className="flex gap-2 items-baseline">
        <p className="text-2xl font-bold">
          {formatCurrency(product?.price ?? 0)}
        </p>
        <p className="line-through text-sm">
          {formatCurrency(product?.compare_at_price ?? 0)}
        </p>
      </div>

      {product.attributes?.map((atrtibute, index) => (
        <div key={atrtibute.id} className=" flex flex-col gap-2 mt-4">
          <p className="text-sm">
            {atrtibute.name}:{" "}
            <span className="font-bold">
              {
                atrtibute.values.find(
                  (v) => v.id.toString() === selectedValueIds[index],
                )?.name
              }
            </span>
          </p>

          <div className="flex gap-2 text-sm">
            {atrtibute.values.map((value) => (
              <div
                key={value.id}
                onClick={() => {
                  const newValues = [...selectedValueIds];
                  newValues[index] = value.id.toString();
                  setSelectedValueIds(newValues);
                }}
                className={clsx(
                  "px-4 py-2 rounded-full border w-fit cursor-pointer ",
                  {
                    "bg-black text-white":
                      selectedValueIds[index] === value.id.toString(),
                  },
                )}
              >
                {value.name}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 flex gap-4">
        <div className="flex">
          <div className="size-10 flex items-center justify-center rounded-tl-full rounded-bl-full border border-black border-x-0 cursor-pointer border-r-0">
            <Minus size={16} />
          </div>
          <input
            className="size-10 border border-black border-x-0 text-center"
            // onChange={(e) => {
            //   // ignore value except number
            //   // e.target.value = e.target.value.replace(/[^0-9]/g, "");
            // }}
          />
          <div className="size-10 flex items-center justify-center rounded-tr-full rounded-br-full border border-black border-x-0  cursor-pointer border-r-0">
            <Plus size={16} />
          </div>
        </div>

        <Button className="flex gap-2 rounded-full px-8">
          {" "}
          <ShoppingBasket /> Thêm vào giỏ hàng
        </Button>
      </div>

      <div className="flex flex-col gap-1 mt-4">
        <h3 className="font-bold text-2xl">Mô tả sản phẩm</h3>
        <p className="mt-4">{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
