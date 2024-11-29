import { getProvinces } from "@repo/common/actions/address";

import { Separator } from "@repo/ui/components/ui/separator";
import { getDeliveryAddresses } from "../../../actions/delivery-address";
import RequireLoginWrapper from "../../../components/required-login-wrapper";
import CartList from "./components/cart-list";
import CartPayment from "./components/cart-payment";
import CustomerInformation from "./components/customer-information";

const Page = async () => {
  const [provinces, addresses] = await Promise.all([
    getProvinces(),
    getDeliveryAddresses(),
  ]);

  return (
    <RequireLoginWrapper>
      <div className="container pb-[60px]">
        <div className="grid grid-cols-7 gap-8 mt-8">
          <div className=" col-span-4 flex flex-col gap-8">
            <CustomerInformation
              provinces={provinces}
              deliveryAddresses={addresses}
            />

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
