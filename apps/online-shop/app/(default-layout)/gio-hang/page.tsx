import { getProvinces } from "@repo/common/actions/address";

import { getDeliveryAddresses } from "../../../actions/delivery-address";
import RequireLoginWrapper from "../../../components/required-login-wrapper";
import CartWrapper from "./components/cart-wrapper";

const Page = async () => {
  const [provinces, addresses] = await Promise.all([
    getProvinces(),
    getDeliveryAddresses(),
  ]);

  return (
    <RequireLoginWrapper>
      <div className="container pb-[60px]">
        <CartWrapper provinces={provinces} deliveryAddresses={addresses} />
      </div>
    </RequireLoginWrapper>
  );
};

export default Page;
