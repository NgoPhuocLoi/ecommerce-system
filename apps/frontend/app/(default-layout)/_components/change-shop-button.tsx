"use client";

import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const ChangeShopButton = () => {
  const router = useRouter();
  const handleChangeShop = () => {
    deleteCookie("selectedShopId");
    router.push("/");
  };

  return <div onClick={handleChangeShop}>Đổi cửa hàng</div>;
};

export default ChangeShopButton;
