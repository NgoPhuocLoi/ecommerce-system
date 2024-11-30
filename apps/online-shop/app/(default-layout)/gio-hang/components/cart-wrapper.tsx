"use client";

import { Province } from "@repo/common/interfaces/address";
import CustomerInformation from "./customer-information";
import { DeliveryAddress } from "../../../../interfaces/address";
import { Separator } from "@repo/ui/components/ui/separator";
import CartPayment from "./cart-payment";
import CartList from "./cart-list";
import { useState } from "react";

// props interface
interface ICartPaymentProps {
  provinces: Province[];
  deliveryAddresses: DeliveryAddress[];
}

const CartWrapper = ({ provinces, deliveryAddresses }: ICartPaymentProps) => {
  const [selectedAddress, setSelectedAddress] = useState<
    DeliveryAddress | undefined
  >(deliveryAddresses.find((a) => a.isDefault));

  const [selectedPaymentId, setSelectedPaymentId] = useState<number>(1);

  return (
    <div className="grid grid-cols-7 gap-8 mt-8">
      <div className=" col-span-4 flex flex-col gap-8">
        <CustomerInformation
          provinces={provinces}
          deliveryAddresses={deliveryAddresses}
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />

        <Separator className="my-2" />

        <CartPayment
          selectedPaymentId={selectedPaymentId}
          setSelectedPaymentId={setSelectedPaymentId}
        />
      </div>
      <div className="col-span-3">
        <div className="flex flex-col gap-3 mt-6">
          <h1 className="text-2xl font-bold">Giỏ hàng</h1>

          <CartList
            selectedAddressId={selectedAddress?.deliveryAddressId}
            selectedPaymentId={selectedPaymentId}
          />

          {/* <CartPrice /> */}
        </div>
      </div>
    </div>
  );
};

export default CartWrapper;
