import { Button } from "@repo/ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@repo/ui/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { cn } from "../../../lib/utils";
import { icons } from "@repo/common/icons/index";
import clsx from "clsx";
import { useAtom } from "jotai";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { productsAtom } from "@repo/common/atoms/product-atom";
import { useEditor } from "@craftjs/core";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@repo/common/utils/currency-format";

interface IProductProps {
  bgColor?: string;
  padding?: string;
  margin?: string;
  contentAlign?: "flex-start" | "center" | "flex-end";
  selectedProductId?: number | null;
}

interface PreviewProduct {
  id: number;
  name: string;
  price: number;
}

export const ProductSetting = () => {
  const { props, handlePropChange } = useSetting();
  const { bgColor, padding, margin } = props;
  const [openModal, setOpenModal] = React.useState(false);
  const [foundProducts] = useAtom(productsAtom);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    props.selectedProductId,
  );

  useEffect(() => {
    console.log({ foundProducts });
  }, []);

  // const handleSearchProductsByName = async (name: string) => {
  //   if (name) {
  //     const res = await getProducts({
  //       name,
  //     });
  //     const products = res.metadata;
  //     console.log(res.metadata);
  //     if (products.length > 0) {
  //       setOpenModal(true);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col gap-4">
      <Popover open={openModal} onOpenChange={setOpenModal}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openModal}
            className="w-full justify-between"
          >
            {selectedProductId
              ? foundProducts.find((p) => p.id === selectedProductId)?.name
              : "Select product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command defaultValue={props.selectedProductId}>
            <CommandInput placeholder="Search framework..." />
            <CommandList defaultValue={props.selectedProductId}>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup defaultValue={props.selectedProductId}>
                {foundProducts.map((foundProduct) => (
                  <CommandItem
                    key={foundProduct.id}
                    value={foundProduct.id.toString()}
                    onSelect={(currentValue) => {
                      setSelectedProductId(parseInt(currentValue));
                      handlePropChange("selectedProductId", currentValue);
                      setOpenModal(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProductId === foundProduct.id
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {foundProduct.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* <Popover open={openModal} onOpenChange={setOpenModal}>
        <PopoverAnchor>
          <SearchInput delay={200} onValueChange={handleSearchProductsByName} />
        </PopoverAnchor>
        <PopoverContent className="px-0">
          {foundProducts.map((foundProduct) => (
            <div
              key={foundProduct.id}
              className="flex cursor-pointer flex-col gap-1 px-4 py-2 hover:bg-gray-50"
            >
              <p className="text-sm font-bold text-gray-700">
                {foundProduct.name}
              </p>
              <p className="text-xs text-gray-600">{foundProduct.price} VND</p>
            </div>
          ))}
        </PopoverContent>
      </Popover> */}
      {/* <div onClick={findProducts}>Setting</div> */}
    </div>
  );
};

export const Product = ({
  bgColor,
  padding,
  margin,
  contentAlign,
  selectedProductId,
}: IProductProps) => {
  const [products] = useAtom(productsAtom);
  const selectedProduct = useMemo(
    () => products.find((p) => p.id === Number(selectedProductId)),
    [selectedProductId, products],
  );
  const { applyRef } = useApplyRef();
  const router = useRouter();

  const { enabled } = useEditor((state) => {
    return {
      enabled: state.options.enabled,
    };
  });

  const handleClickProduct = () => {
    if (enabled) {
      return;
    }

    if (!selectedProduct) {
      return router.push("/san-pham/test");
    }

    router.push(`/san-pham/${selectedProduct?.id}`);
  };

  return (
    <div
      onClick={handleClickProduct}
      ref={applyRef}
      className={clsx("flex w-full flex-col gap-2 ", {
        "cursor-pointer": !enabled,
      })}
    >
      <div
        className={clsx(
          "flex aspect-[2/3] w-full items-center justify-center rounded-lg overflow-hidden",
          {
            "bg-[#D9DCE9]": !selectedProduct,
          },
        )}
      >
        <Image
          src={selectedProduct?.images[0]?.url ?? icons.productPlaceholder}
          width={0}
          height={0}
          sizes="100vh"
          alt="product"
          className="object-cover h-full w-auto"
        />
      </div>

      <div className="text-gray-800 text-sm flex flex-col gap-1">
        <p>{selectedProduct?.name ?? "Tên sản phẩm sẽ hiển thị ở đây"}</p>
        <div className="flex gap-2 items-center">
          <p className="font-bold">
            {formatCurrency(selectedProduct?.price ?? 500)}
          </p>
          <p className="text-xs bg-black text-white flex justify-center items-center px-1 py-[2px] rounded-md font-bold">
            -10%
          </p>
          <p className="line-through text-gray-400">
            {formatCurrency(selectedProduct?.compare_at_price ?? 500)}
          </p>
        </div>
      </div>
    </div>
  );
};

Product.craft = {
  props: {
    bgColor: "#ffffff",
    contentAlign: "center",
    selectedProductId: null,
  },
  related: {
    setting: ProductSetting,
  },
  data: {
    name: "Product",
  },
};
