"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import TextField from "@repo/ui/components/ui/text-field";
import React, { useMemo } from "react";

interface IProductPricingProps {
  initialPricing?: {
    price: number;
    compareAtPrice: number;
    cost: number;
  };
}

const ProductPricing = ({ initialPricing }: IProductPricingProps) => {
  const [productPricing, setProductPricing] = React.useState<{
    price?: number;
    compareAtPrice?: number;
    cost?: number;
  }>(initialPricing ?? {});

  const profit = useMemo(() => {
    if (
      productPricing.price === undefined ||
      productPricing.cost === undefined
    ) {
      return "--";
    }
    return productPricing.price - productPricing.cost;
  }, [productPricing.price, productPricing.cost]);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Giá</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex w-full gap-4">
            <TextField
              name={"price"}
              label={"Giá"}
              id={"add-product-price"}
              type={"number"}
              placeholder={"0"}
              value={productPricing.price}
              onChange={(value) => {
                setProductPricing({ ...productPricing, price: Number(value) });
              }}
            />
            <TextField
              name={"compareAtPrice"}
              label={"Giá so sánh"}
              id={"add-product-compareAtPrice"}
              type={"number"}
              placeholder={"0"}
              value={productPricing.compareAtPrice}
              onChange={(value) => {
                setProductPricing({
                  ...productPricing,
                  compareAtPrice: Number(value),
                });
              }}
            />
            <TextField
              name={"cost"}
              label={"Giá vốn"}
              id={"add-product-cost"}
              type={"number"}
              placeholder={"0"}
              value={productPricing.cost}
              onChange={(value) => {
                setProductPricing({ ...productPricing, cost: Number(value) });
              }}
            />
            <TextField
              name={"profit"}
              label={"Lợi nhuận"}
              id={"add-product-profit"}
              type={"text"}
              defaultValue={"--"}
              value={profit}
              disabled={true}
              onChange={(value) => {
                console.log(value);
              }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductPricing;
