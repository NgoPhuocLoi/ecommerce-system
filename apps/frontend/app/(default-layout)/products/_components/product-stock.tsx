"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import ServerTextField from "@repo/ui/components/ui/server-text-field";
import TextField from "@repo/ui/components/ui/text-field";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { createProductAtom } from "../atom/create-product-atom";

interface IProductStockProps {
  initialQuantity?: number;
}

const ProductStock = ({ initialQuantity }: IProductStockProps) => {
  const [createProductData, setCreateProductData] = useAtom(createProductAtom);

  useEffect(() => {
    console.log({ initialQuantity });
    setCreateProductData((prev) => ({
      ...prev,
      totalQuantity: initialQuantity ?? 0,
    }));
  }, [initialQuantity]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Số lượng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 w-fit">
            <TextField
              name={"availableQuantity"}
              label={"Số lượng"}
              id={"add-product-availableQuantity"}
              type={"number"}
              value={createProductData.totalQuantity}
              onChange={(value) => {
                setCreateProductData((prev) => ({
                  ...prev,
                  totalQuantity: parseInt(value),
                }));
              }}
              onKeyDown={(e) => {
                console.log({ createProductData });
                if (createProductData.shouldDisaleTotalQuantity) {
                  e.preventDefault();
                }
              }}
              // disabled={createProductData.shouldDisaleTotalQuantity}
            />
            {/* <ServerTextField
              name={"availableQuantity"}
              label={"Số lượng"}
              id={"add-product-availableQuantity"}
              type={"number"}
              defaultValue={initialQuantity ?? 0}
            /> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStock;
