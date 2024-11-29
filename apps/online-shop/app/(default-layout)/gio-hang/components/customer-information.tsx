"use client";

import { Input } from "@repo/ui/components/ui/input";
import { LabelWrapper } from "@repo/ui/components/ui/label-wrapper";
import { useAtom } from "jotai";
import { currentCustomerAtom } from "../../../../atom/current-customer";
import { useEffect, useState } from "react";
import { District, Province, Ward } from "@repo/common/interfaces/address";
import TextSelection from "@repo/ui/components/ui/text-selection";
import {
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "@repo/common/actions/address";
import { Button } from "@repo/ui/components/ui/button";
import { DeliveryAddress } from "../../../../interfaces/address";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import clsx from "clsx";
import CreateAddressDialog from "./create-address-dialog";
import { orderAtom } from "../../../../atom/order";
import { calculateShippingFee } from "../../../../actions/shipping";

interface ICustomerInformationProps {
  provinces: Province[];
  deliveryAddresses: DeliveryAddress[];
}

const CustomerInformation = ({
  provinces,
  deliveryAddresses,
}: ICustomerInformationProps) => {
  const [currentCustomer] = useAtom(currentCustomerAtom);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [, setOrder] = useAtom(orderAtom);
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    const defaultAddress = deliveryAddresses.find((a) => a.isDefault);

    if (defaultAddress) {
      return {
        provinceId: defaultAddress.provinceId.toString(),
        districtId: defaultAddress.districtId.toString(),
        wardCode: defaultAddress.wardCode,
        detailAddress: defaultAddress.detailAddress,
        phone: defaultAddress.phone,
        provinceName: defaultAddress.provinceName,
        districtName: defaultAddress.districtName,
        wardName: defaultAddress.wardName,
      };
    }

    return {
      provinceId: "",
      districtId: "",
      wardCode: "",
      detailAddress: "",
      phone: "",
      provinceName: "",
      districtName: "",
      wardName: "",
    };
  });
  const [selectedAddress, setSelectedAddress] = useState<
    DeliveryAddress | undefined
  >(deliveryAddresses.find((a) => a.isDefault));

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
      setDeliveryAddress({
        provinceId: selectedAddress.provinceId.toString(),
        districtId: selectedAddress.districtId.toString(),
        wardCode: selectedAddress.wardCode,
        detailAddress: selectedAddress.detailAddress,
        phone: selectedAddress.phone,
        provinceName: selectedAddress.provinceName,
        districtName: selectedAddress.districtName,
        wardName: selectedAddress.wardName,
      });
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

  useEffect(() => {
    const fetchDistricts = async () => {
      const data = await getDistrictsByProvinceId(
        parseInt(deliveryAddress.provinceId),
      );
      setDistricts(data);
    };
    if (deliveryAddress.provinceId) fetchDistricts();
  }, [deliveryAddress.provinceId]);

  useEffect(() => {
    const fetchWards = async () => {
      const data = await getWardsByDistrictId(
        parseInt(deliveryAddress.districtId),
      );
      setWards(data);
    };
    if (deliveryAddress.districtId) fetchWards();
  }, [deliveryAddress.districtId]);
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
          <Dialog>
            <DialogTrigger className="text-blue-500">
              Chọn từ sổ địa chỉ
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Sổ địa chỉ</DialogTitle>
                <DialogDescription>
                  Bạn có thể chọn địa chỉ đã tạo hoặc tạo mới
                </DialogDescription>

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

                  <CreateAddressDialog provinces={provinces} />
                </div>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-col gap-4">
          <LabelWrapper label="Số điện thoại">
            <Input
              value={deliveryAddress.phone}
              onChange={(e) => {
                setDeliveryAddress((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }));
              }}
              placeholder="Số điện thoại"
            />
          </LabelWrapper>

          <LabelWrapper label="Địa chỉ">
            <div className="flex flex-col gap-2">
              <Input
                value={deliveryAddress.detailAddress}
                onChange={(e) => {
                  setDeliveryAddress((prev) => ({
                    ...prev,
                    detailAddress: e.target.value,
                  }));
                }}
                placeholder="Địa chỉ"
              />
              <div className="grid grid-cols-3 gap-4">
                <TextSelection
                  value={deliveryAddress.provinceId}
                  options={provinces}
                  onValueChange={(v) => {
                    setDeliveryAddress((prev) => ({
                      ...prev,
                      provinceId: v,
                      provinceName:
                        provinces.find((p) => p.ProvinceID === Number(v))
                          ?.ProvinceName || "",
                    }));
                  }}
                  displayField="ProvinceName"
                  valueField="ProvinceID"
                  placeholder="Tỉnh / thành phố"
                />
                <TextSelection
                  value={deliveryAddress.districtId}
                  options={districts}
                  onValueChange={(v) => {
                    setDeliveryAddress((prev) => ({
                      ...prev,
                      districtId: v,
                      districtName:
                        districts.find((d) => d.DistrictID === Number(v))
                          ?.DistrictName || "",
                    }));
                  }}
                  disabled={!districts || districts?.length === 0}
                  displayField="DistrictName"
                  valueField="DistrictID"
                  placeholder="Quận / huyện"
                />
                <TextSelection
                  value={deliveryAddress.wardCode}
                  options={wards}
                  onValueChange={(v) => {
                    setDeliveryAddress((prev) => ({
                      ...prev,
                      wardCode: v,
                      wardName:
                        wards.find((w) => w.WardCode === v)?.WardName || "",
                    }));
                  }}
                  disabled={!wards || wards?.length === 0}
                  displayField="WardName"
                  valueField="WardCode"
                  placeholder="Phường / xã"
                />
              </div>
            </div>
          </LabelWrapper>
        </div>
      </div>

      <Button
        onClick={() => {
          console.log({ deliveryAddress });
        }}
      >
        Check {deliveryAddresses.length}
      </Button>
    </>
  );
};

export default CustomerInformation;
