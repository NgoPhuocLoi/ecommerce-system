"use client";
import { useEffect } from "react";
import { Shop } from "./shop-selection";
import { deleteCookie, getCookie } from "cookies-next";
import ShopItem from "./shop-item";
import { useUser } from "@clerk/nextjs";

interface IShopListProps {
  shops: Shop[];
}

const ShopList = ({ shops }: IShopListProps) => {
  const user = useUser();
  useEffect(() => {
    const oldSelectedShopId = getCookie("selectedShopId");
    if (oldSelectedShopId) {
      console.log("REMOVE OLD SELECTED SHOP ID");
      deleteCookie("selectedShopId");
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-1 overflow-auto py-3">
      {shops?.map((shop) => (
        <ShopItem
          key={shop.id}
          shop={shop}
          email={user.user?.primaryEmailAddress?.emailAddress}
        />
      ))}
    </div>
  );
};

export default ShopList;
