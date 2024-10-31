"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@repo/ui/components/ui/collapsible";
import { Input } from "@repo/ui/components/ui/input";
import { Separator } from "@repo/ui/components/ui/separator";
import {
  getNonEmptyNameOptionsList,
  getNumberOfVairants,
} from "app/utils/variant-option";
import { useEffect, useRef, useState } from "react";
import { VariantOption } from "./product-variant-list";

interface IProductVariantsTableProps {
  variantOptions: VariantOption[];
}

const ProductVariantsTable = ({
  variantOptions,
}: IProductVariantsTableProps) => {
  const [variants, setVariants] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("CHANGE");
    let variants: any[] = [];
    // for(let i = 0; i < variantOptions.length; i++) {
    //   const values = getNonEmptyNameOptionsList(variantOptions[i].values, variantOptions[i].isRecommend);

    // }
    if (variantOptions.length == 0) {
      return;
    }
    const firstOption = variantOptions[0];
    const secondOption = variantOptions[1];
    const thirdOption = variantOptions[2];
    for (let a of getNonEmptyNameOptionsList(
      firstOption!.values,
      firstOption!.isRecommend,
    )) {
      if (!secondOption) {
        variants.push({
          id: `${a.id}`,
          price: 0,
          quantity: 0,
          attributesInfo: [
            {
              attributeId: firstOption!.id,
              valueId: a.id,
            },
          ],
        });
      } else {
        for (let b of getNonEmptyNameOptionsList(
          secondOption.values,
          secondOption.isRecommend,
        )) {
          console.log("RUN HERE");
          if (!thirdOption) {
            variants.push({
              id: `${a.id}/${b.id}`,
              price: 100,
              quantity: 0,
              attributesInfo: [
                {
                  attributeId: firstOption!.id,
                  valueId: a.id,
                },
                {
                  attributeId: secondOption.id,
                  valueId: b.id,
                },
              ],
            });
          } else {
            for (let c of getNonEmptyNameOptionsList(
              thirdOption.values,
              thirdOption.isRecommend,
            )) {
              variants.push({
                id: `${a.id}/${b.id}/${c.id}`,
                price: 0,
                quantity: 0,
                attributesInfo: [
                  {
                    attributeId: firstOption!.id,
                    valueId: a.id,
                  },
                  {
                    attributeId: secondOption.id,
                    valueId: b.id,
                  },
                  {
                    attributeId: thirdOption.id,
                    valueId: c.id,
                  },
                ],
              });
            }
          }
        }
      }
    }
    setVariants(variants);
  }, [variantOptions]);

  const onChangeCustomValue = (
    id: string,
    key: string,
    value: any,
    outerId?: string,
  ) => {
    const newVariants = variants.map((variant) => {
      const v = Number(value) ?? 0;
      if (variant.id === id) {
        return {
          ...variant,
          [key]: v,
        };
      }
      return variant;
    });
    // const [min, max] = getMinAndMaxValueFromValues(newVariants);
    // const input = containerRef.current?.querySelector(
    //   "input",
    // ) as HTMLInputElement;
    // console.log({ input });
    // if (input) {
    //   input.setAttribute("value", `${min} - ${max}`);
    // }
    setVariants(newVariants);
  };

  const onOuterCustomValueChange = (id: string, key: string, value: any) => {
    const v = Number(value) ?? 0;
    setVariants((prev) => {
      return prev.map((variant) => {
        if (variant.id.includes(id)) {
          return {
            ...variant,
            [key]: v,
          };
        }
        return variant;
      });
    });
  };

  const getMinAndMaxValueFromValues = (values: any[], field: string) => {
    let min = values[0] ? values[0][field] : 0;
    let max = 0;
    values.forEach((value) => {
      if (Number(value[field]) < Number(min)) {
        min = value[field];
      }
      if (Number(value[field]) > Number(max)) {
        max = value[field];
      }
    });
    return [min, max];
  };

  const test = (id: string, field: string) => {
    const foundVariant = variants.find((v) => v.id === id);
    if (foundVariant) {
      return foundVariant[field];
    }
    const [min, max] = getMinAndMaxValueFromValues(
      variants.filter((v) => v.id.includes(id)),
      field,
    );
    if (min === max) {
      return min as string;
    }
    return `${min} - ${max}`;
  };

  return (
    <div ref={containerRef}>
      <div className="grid grid-cols-6 gap-4 rounded-sm border bg-gray-100 p-2 text-sm text-gray-800">
        <div className="col-span-3">Variant</div>
        <div className="col-span-2">Price</div>
        <div>Quantity</div>
      </div>
      <Separator />

      <input
        name="variants"
        className="hidden"
        value={JSON.stringify(variants)}
      />

      {variantOptions.length > 0 &&
        getNonEmptyNameOptionsList(
          variantOptions[0]!.values,
          variantOptions[0]!.isRecommend,
        ).map((outerValue, outerIndex) => (
          <Collapsible key={outerValue.id}>
            <div className="grid grid-cols-6 items-center gap-4 rounded-sm border border-t-0 p-2 hover:bg-gray-50">
              <CollapsibleTrigger asChild>
                <div className="col-span-3 flex cursor-pointer items-center gap-3">
                  <div className="h-16 w-16 rounded-md border border-dashed"></div>

                  <div>
                    <p className="text-sm">{outerValue.name}</p>
                    {variantOptions.length > 1 && (
                      <p className="text-[13px] text-gray-400">
                        {getNumberOfVairants(variantOptions)} variants
                      </p>
                    )}
                  </div>
                </div>
              </CollapsibleTrigger>
              <div className="col-span-2">
                <Input
                  id={`price-${outerValue.id}`}
                  value={test(outerValue.id, "price")}
                  onChange={(e) => {
                    onOuterCustomValueChange(
                      `${outerValue.id}`,
                      "price",
                      e.target.value,
                    );
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" || e.key === "Delete") {
                      onOuterCustomValueChange(`${outerValue.id}`, "price", 0);
                    }
                    if (
                      ![
                        "0",
                        "1",
                        "2",
                        "3",
                        "4",
                        "5",
                        "6",
                        "7",
                        "8",
                        "9",
                      ].includes(e.key)
                    ) {
                      e.preventDefault();
                      console.log("INVALID KEY");
                      return;
                    }
                  }}
                />
              </div>
              <div>
                <Input
                  id={`quantity-${outerValue.id}`}
                  value={variants
                    .filter((v) => v.id.includes(outerValue.id))
                    .reduce((acc, curr) => acc + curr.quantity, 0)}
                  disabled
                />
              </div>
            </div>
            <CollapsibleContent>
              {variantOptions.length > 1 &&
                getNonEmptyNameOptionsList(
                  variantOptions[1]!.values,
                  variantOptions[1]!.isRecommend,
                )
                  .map((value, index) => {
                    let innerValues: any[] = [];

                    if (variantOptions[2]) {
                      innerValues = getNonEmptyNameOptionsList(
                        variantOptions[2].values,
                        variantOptions[2].isRecommend,
                      );
                    }

                    if (innerValues.length > 0) {
                      return innerValues.map((innerValue, innerIndex) => (
                        <div
                          key={value.id + innerValue.id}
                          className="grid cursor-pointer grid-cols-6 items-center gap-4 rounded-sm border border-t-0 p-2 hover:bg-gray-50"
                        >
                          <div className="col-span-3 flex items-center gap-3 pl-10">
                            <div className="h-10 w-10 rounded-md border border-dashed"></div>

                            <p className="text-sm">
                              {value.name} / {innerValue.name}
                            </p>
                          </div>
                          <div className="col-span-2">
                            <Input
                              type="number"
                              value={
                                variants.find(
                                  (v) =>
                                    v.id ===
                                    `${outerValue.id}/${value.id}/${innerValue.id}`,
                                )?.price
                              }
                              onChange={(e) => {
                                onChangeCustomValue(
                                  `${outerValue.id}/${value.id}/${innerValue.id}`,
                                  "price",
                                  e.target.value,
                                );
                              }}
                            />
                          </div>
                          <div>
                            <Input
                              type="number"
                              value={
                                variants.find(
                                  (v) =>
                                    v.id ===
                                    `${outerValue.id}/${value.id}/${innerValue.id}`,
                                )?.quantity
                              }
                              onChange={(e) => {
                                onChangeCustomValue(
                                  `${outerValue.id}/${value.id}/${innerValue.id}`,
                                  "quantity",
                                  e.target.value,
                                );
                              }}
                            />
                          </div>
                        </div>
                      ));
                    }
                    return (
                      <div
                        key={value.id}
                        className="grid cursor-pointer grid-cols-6 items-center gap-4 rounded-sm border border-t-0 p-2 hover:bg-gray-50"
                      >
                        <div className="col-span-3 flex items-center gap-3 pl-10">
                          <div className="h-10 w-10 rounded-md border border-dashed"></div>

                          <p className="text-sm">{value.name} </p>
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={
                              variants.find(
                                (v) => v.id === `${outerValue.id}/${value.id}`,
                              )?.price
                            }
                            onChange={(e) => {
                              onChangeCustomValue(
                                `${outerValue.id}/${value.id}`,
                                "price",
                                e.target.value,
                                outerValue.id,
                              );
                            }}
                          />
                        </div>
                        <div>
                          <Input
                            type="number"
                            value={
                              variants.find(
                                (v) => v.id === `${outerValue.id}/${value.id}`,
                              )?.quantity
                            }
                            onChange={(e) => {
                              onChangeCustomValue(
                                `${outerValue.id}/${value.id}`,
                                "quantity",
                                e.target.value,
                                outerValue.id,
                              );
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                  .flat()}
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  );
};

export default ProductVariantsTable;
