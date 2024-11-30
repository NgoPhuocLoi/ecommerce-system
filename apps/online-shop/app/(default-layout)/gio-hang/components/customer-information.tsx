"use client";

import { Province } from "@repo/common/interfaces/address";
import clsx from "clsx";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { calculateShippingFee } from "../../../../actions/shipping";
import { currentCustomerAtom } from "../../../../atom/current-customer";
import { orderAtom } from "../../../../atom/order";
import { DeliveryAddress } from "../../../../interfaces/address";
import CreateAddressDialog from "./create-address-dialog";

interface ICustomerInformationProps {
  provinces: Province[];
  deliveryAddresses: DeliveryAddress[];
  selectedAddress?: DeliveryAddress;
  setSelectedAddress: (address: DeliveryAddress) => void;
}

const CustomerInformation = ({
  provinces,
  deliveryAddresses,
  selectedAddress,
  setSelectedAddress,
}: ICustomerInformationProps) => {
  const [currentCustomer] = useAtom(currentCustomerAtom);
  const [, setOrder] = useAtom(orderAtom);

  useEffect(() => {
    const fetchShippingFee = async ({
      toDistrictId,
      toWardCode,
    }: {
      toDistrictId: number;
      toWardCode: string;
    }) => {
      const shippingFee = await calculateShippingFee({
        toDistrictId,
        toWardCode,
      });

      setOrder((prev: any) => ({
        ...prev,
        shippingFee: shippingFee.total ?? 50000,
      }));
    };
    if (selectedAddress) {
      setOrder((prev: any) => ({
        ...prev,
        deliveryAddressId: selectedAddress.deliveryAddressId,
      }));
      fetchShippingFee({
        toDistrictId: selectedAddress.districtId,
        toWardCode: selectedAddress.wardCode,
      });
    }
  }, [selectedAddress]);
  return (
    <>
      <div className="p-4 rounded-lg bg-gray-100">
        <h1 className="text-3xl font-bold">
          Xin chào, {currentCustomer?.lastName} {currentCustomer?.firstName}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Thông tin đặt hàng</h1>
          <CreateAddressDialog provinces={provinces} />
        </div>

        <div className="flex flex-col gap-2 pt-4">
          {deliveryAddresses.map((address) => (
            <div
              onClick={() => {
                setSelectedAddress(address);
              }}
              className={clsx(
                "px-6 py-4 text-sm rounded-lg border cursor-pointer hover:bg-gray-200 duration-100",
                {
                  "bg-gray-200":
                    selectedAddress?.deliveryAddressId ===
                    address.deliveryAddressId,
                },
              )}
              key={address.deliveryAddressId}
            >
              <div>
                {address.provinceName} - {address.districtName} -{" "}
                {address.wardName}
              </div>
              <div>{address.detailAddress}</div>
              <div className="flex justify-between items-center">
                <span>{address.phone}</span>
                {address.isDefault && (
                  <span className="font-bold">Mặc định</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CustomerInformation;
