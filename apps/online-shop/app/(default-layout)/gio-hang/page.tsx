import { getProvinces } from "@repo/common/actions/address";

import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";
import RequireLoginWrapper from "../../../components/required-login-wrapper";
import CartList from "./components/cart-list";
import CartPayment from "./components/cart-payment";
import CartPrice from "./components/cart-price";
import CustomerInformation from "./components/customer-information";

const Page = async () => {
  const provinces = await getProvinces();
  return (
    <RequireLoginWrapper>
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

              <CartList />

              {/* <CartPrice /> */}
            </div>
          </div>
        </div>
      </div>
    </RequireLoginWrapper>
  );
};

export default Page;
