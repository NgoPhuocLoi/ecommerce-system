"use client";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { ChevronRight } from "lucide-react";
import { Shop } from "./shop-selection";

interface IShopItemProps {
  shop: Shop;
  email?: string;
}

const ShopItem = ({ shop, email }: IShopItemProps) => {
  const router = useRouter();

  const handleSelectShop = async () => {
    setCookie("selectedShopId", shop.id);
    router.push("/dashboard");
  };

  return (
    <div
      key={shop.id}
      onClick={handleSelectShop}
      className="group flex cursor-pointer items-center gap-2 rounded-md p-3 duration-75 hover:bg-gray-100"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-green-400 text-xs">
        {shop.name[0]}
      </div>

      <div className="duration-100 group-hover:translate-x-1">
        <p className="text-sm font-bold">{shop.name}</p>
        <p className="text-xs">{email}</p>
      </div>

      <div className="ml-auto hidden group-hover:block">
        <ChevronRight />
      </div>
    </div>
  );
};

export default ShopItem;
