import { getProvinces } from "@repo/common/actions/address";

import { Separator } from "@repo/ui/components/ui/separator";
import CartList from "./components/cart-list";
import CustomerInformation from "./components/customer-information";
import CartPrice from "./components/cart-price";
import { Button } from "@repo/ui/components/ui/button";
import CartPayment from "./components/cart-payment";

const Page = async () => {
  const provinces = await getProvinces();
  return (
    <div className="container pb-[60px]">
      <div className="grid grid-cols-7 gap-8 mt-8">
        <div className=" col-span-4 flex flex-col gap-8">
          <CustomerInformation provinces={provinces} />

          <Separator className="my-2" />

          <CartPayment />
        </div>
        <div className="col-span-3">
          <div className="flex flex-col gap-3 mt-6">
            <h1 className="text-2xl font-bold">Giỏ hàng</h1>

            <div className="grid grid-cols-6 text-gray-500 text-xs">
              <div className="col-span-4">XÓA TẤT CẢ</div>
              <div>SỐ LƯỢNG</div>
              <div className="text-right">GIÁ</div>
            </div>

            <Separator />

            <CartList />

            <CartPrice />

            <Button className="mt-6">Thanh toán</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
