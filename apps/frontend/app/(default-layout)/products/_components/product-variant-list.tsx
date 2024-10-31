"use client";
import { Attribute } from "app/interfaces/category";
import { VariantResponse } from "app/interfaces/product";
import { selectedCategoryAtom } from "app/atoms/category-atom";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@repo/ui/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { Separator } from "@repo/ui/components/ui/separator";
import { useAtom } from "jotai";
import { PlusCircle, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import ProductVariantsTable from "./product-variants-table";

export interface VariantOption {
  id: string;
  name: string;
  isOpen: boolean;
  isRecommend?: boolean;
  values: {
    id: string;
    name: string;
    selected?: boolean;
  }[];
}

interface IProductVariantListProps {
  initialVariants?: VariantResponse[];
  initialAttributes?: Attribute[];
}

const ProductVariantList = ({
  initialVariants,
  initialAttributes,
}: IProductVariantListProps) => {
  const [variantOptions, setVariantOptions] = useState<VariantOption[]>([]);
  const [variantCustomValues, setVariantCustomValues] = useState({
    mappingId: "id1-index/id2-index/id3-index",
    price: 0,
    quantity: 0,
    uploadedThumbnail: {
      publicId: "",
      url: "",
    },
  });
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [selectedCategory] = useAtom(selectedCategoryAtom);

  useEffect(() => {
    if (initialAttributes) {
      setVariantOptions(
        initialAttributes.map((attr) => ({
          id: attr.id.toString(),
          name: attr.name,
          isOpen: false,
          isRecommend: !!attr.recommend_attribute_id,
          values: attr.values.map((value) => ({
            id: value.id.toString(),
            name: value.name,
            selected: !!attr.recommend_attribute_id,
          })),
        })),
      );
    }

    if (initialVariants) {
    }
  }, [initialAttributes]);

  const handleAddOption = (option?: VariantOption) => {
    const emptyOption = {
      id: v4(),
      name: "",
      isOpen: true,
      values: [
        {
          id: v4(),
          name: "",
        },
      ],
    };
    const optionToAdd = option ?? emptyOption;
    setVariantOptions([...variantOptions, optionToAdd]);
  };

  const onOptionChange = (
    optionId: string,
    field: "name" | "isOpen",
    value: string | boolean,
  ) => {
    setVariantOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.id === optionId) {
          return { ...option, [field]: value };
        }
        return option;
      });
    });
  };

  const onOptionValueChange = (
    optionId: string,
    valueId: string,
    name: string,
  ) => {
    const currentVariantOption = variantOptions.find(
      (option) => option.id === optionId,
    );
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (currentVariantOption?.values.at(-1)?.id === valueId) {
      timer.current = setTimeout(() => {
        setVariantOptions((prevOptions) => {
          return prevOptions.map((option) => {
            if (option.id === optionId) {
              return {
                ...option,
                values: [...option.values, { id: v4(), name: "" }],
              };
            }
            return option;
          });
        });
      }, 500);
    }

    setVariantOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.id === optionId) {
          return {
            ...option,
            values: option.values.map((value) => {
              if (value.id === valueId) {
                return { ...value, name };
              }
              return value;
            }),
          };
        }
        return option;
      });
    });
  };

  const handleDoneEditingOption = (option: VariantOption) => {
    {
      console.log("DONE", option.values);
      if (option.name.trim() === "" || option.values[0]?.name?.trim() === "") {
        return;
      }
      console.log("SHOULD RUN");
      setVariantOptions((prev) => {
        return prev.map((op) => {
          if (op.id === option.id) {
            return {
              ...option,
              isOpen: false,
              values: option.values.filter((value) => value.name.trim() !== ""),
            };
          }
          return op;
        });
      });
    }
  };

  const handleDeleteValueOfOption = (optionId: string, valueId: string) => {
    setVariantOptions((prevOptions) => {
      return prevOptions.map((option) => {
        if (option.id === optionId) {
          return {
            ...option,
            values: option.values.filter((value) => value.id !== valueId),
          };
        }
        return option;
      });
    });
  };

  const hanldeOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    option: VariantOption,
    value: { name: string; id: string },
  ) => {
    if (e.key === "Enter") {
      console.log({ ENTER: option, value });
      e.preventDefault();
      e.stopPropagation();
      console.log(option, option.values.at(-1)?.name.trim());
      if (timer.current) {
        clearTimeout(timer.current);
      }
      if (
        option.values.at(-1)?.name.trim() !== "" &&
        option.values.indexOf(value) === option.values.length - 1
      ) {
        setVariantOptions((prevOptions) => {
          return prevOptions.map((op) => {
            if (option.id === op.id) {
              return {
                ...option,
                values: [...option.values, { id: v4(), name: "" }],
              };
            }
            return op;
          });
        });
      }
      setTimeout(() => {
        const nextInput = (e.target as HTMLInputElement).parentElement
          ?.nextElementSibling?.firstElementChild as HTMLInputElement;
        nextInput?.focus();
      });
    }
  };

  const onClickRecommendAttribute = (
    attribute: Attribute,
    isSelected: boolean,
  ) => {
    if (isSelected) {
      setVariantOptions((prevOptions) => {
        return prevOptions.filter((op) => op.id !== attribute.id.toString());
      });
      return;
    }

    handleAddOption({
      id: attribute.id.toString(),
      name: attribute.name,
      isOpen: true,
      isRecommend: true,
      values: attribute.values.map((value) => ({
        id: value.id.toString(),
        name: value.name,
        selected: false,
      })),
    });
  };

  const test = () => {
    console.log(variantOptions);
  };

  return (
    <>
      <input
        name="attributes"
        className="hidden"
        value={JSON.stringify(variantOptions)}
      />
      <div className="flex flex-col gap-2">
        {/* {selectedCategory && <div>{JSON.stringify(selectedCategory)}</div>} */}
        {variantOptions.length > 0 && (
          <>
            {variantOptions.map((option) => {
              if (option.isRecommend) {
                return (
                  <div
                    key={option.id}
                    className="flex flex-col gap-3 rounded-md border px-10 py-6"
                  >
                    <div className="text-sm font-semibold">{option.name}</div>

                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          size={"sm"}
                          className="w-fit cursor-pointer hover:bg-gray-100"
                          variant="outline"
                        >
                          <PlusCircle size={12} className="mr-1" />
                          Add values
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        <Input placeholder="Search" />
                        <ScrollArea className="mt-4 h-[300px]">
                          <div className="flex flex-col gap-2">
                            {option.values.map((value) => (
                              <div
                                key={value.id}
                                className="flex cursor-pointer items-center space-x-2 rounded-md border bg-gray-50 px-4 py-3"
                              >
                                <Checkbox
                                  onCheckedChange={(checked) => {
                                    setVariantOptions((prevOptions) => {
                                      return prevOptions.map((op) => {
                                        if (op.id === option.id) {
                                          return {
                                            ...op,
                                            values: op.values.map((v) => {
                                              if (v.id === value.id) {
                                                return {
                                                  ...v,
                                                  selected: !!checked,
                                                };
                                              }
                                              return v;
                                            }),
                                          };
                                        }
                                        return op;
                                      });
                                    });
                                  }}
                                  checked={value.selected}
                                  id={value.id}
                                />
                                <label
                                  htmlFor={value.id}
                                  className="text-sm font-medium leading-none"
                                >
                                  {value.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </PopoverContent>
                    </Popover>

                    <div className="flex gap-2">
                      {option.values
                        .filter((value) => value.selected)
                        .map((value) => (
                          <Badge key={value.id}>{value.name}</Badge>
                        ))}
                    </div>
                  </div>
                );
              }

              if (!option.isOpen) {
                return (
                  <div
                    key={option.id}
                    onClick={() => {
                      onOptionChange(option.id, "isOpen", true);
                    }}
                    className="flex cursor-pointer flex-col gap-2 rounded-md border px-10 py-6 hover:bg-gray-100"
                  >
                    <div className="text-sm font-semibold">{option.name}</div>
                    <div className="flex gap-2">
                      {option.values.map((value) => (
                        <Badge key={value.id}>{value.name}</Badge>
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div
                  key={option.id}
                  className="flex flex-col gap-4 rounded-md border px-10 py-6"
                >
                  <div className="grid w-full items-center gap-2">
                    <Label htmlFor={option.id}>Option name</Label>
                    <Input
                      type="text"
                      id={option.id}
                      placeholder="Title"
                      className="w-full"
                      value={option.name}
                      onChange={(e) => {
                        console.log("HERE");
                        onOptionChange(option.id, "name", e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                        }
                      }}
                    />
                  </div>
                  <div className="grid w-full items-center gap-2">
                    <Label>Option values</Label>
                    <div className="flex flex-col gap-2">
                      {option.values.map((value) => (
                        <div key={value.id} className="flex gap-2">
                          <Input
                            type="text"
                            id={value.id}
                            value={value.name}
                            placeholder="Add value"
                            className="w-full"
                            onChange={(e) => {
                              onOptionValueChange(
                                option.id,
                                value.id,
                                e.target.value,
                              );
                            }}
                            onKeyDown={(e) => {
                              hanldeOnEnter(e, option, value);
                            }}
                          />
                          {option.values.length > 1 &&
                            value.name.trim().length > 0 && (
                              <Button
                                onClick={() => {
                                  handleDeleteValueOfOption(
                                    option.id,
                                    value.id,
                                  );
                                }}
                                type="button"
                                size="icon"
                                variant="outline"
                                className="border-red-500 text-red-500 hover:text-red-500"
                              >
                                <Trash size={14} />
                              </Button>
                            )}
                        </div>
                      ))}
                    </div>
                    {/* <Input
                    type="text"
                    id={"new-option-value"}
                    placeholder="Add another value"
                    className="w-full"
                    onChange={handleNewOptionValueChange}
                  /> */}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      className="border-red-500 text-red-500 hover:text-red-500"
                    >
                      Delete
                    </Button>
                    <Button
                      onClick={() => {
                        handleDoneEditingOption(option);
                      }}
                      type="button"
                      size="sm"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              );
            })}
          </>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {variantOptions.length < 3 && (
          <Button
            onClick={() => handleAddOption()}
            size="sm"
            type="button"
            variant="outline"
            className="w-fit"
          >
            <PlusCircle size={14} className="mr-2" />
            Add options like color or size
          </Button>
        )}
        {!!selectedCategory?.recommendAttributes.length && (
          <div className="flex flex-col gap-3 rounded-md bg-gray-50 p-4">
            <p className="text-sm font-bold text-gray-800">
              Recommend attributes
            </p>

            <div className="flex flex-wrap gap-2 gap-y-3">
              {selectedCategory?.recommendAttributes.map((attr) => {
                const isSelected = !!variantOptions.find(
                  (op) => op.id === attr.id.toString(),
                );

                return (
                  <Badge
                    onClick={() => onClickRecommendAttribute(attr, isSelected)}
                    variant={isSelected ? "default" : "outline"}
                    className="cursor-pointer"
                    key={attr.id}
                  >
                    {!isSelected && <>+</>} {attr.name} {isSelected ? "✓" : ""}
                  </Badge>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Separator className="my-6" />

      <ProductVariantsTable variantOptions={variantOptions} />
    </>
  );
};

export default ProductVariantList;
