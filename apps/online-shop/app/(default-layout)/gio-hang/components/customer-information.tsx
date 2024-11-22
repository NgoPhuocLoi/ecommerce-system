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

interface ICustomerInformationProps {
  provinces: Province[];
}

const CustomerInformation = ({ provinces }: ICustomerInformationProps) => {
  const [currentCustomer] = useAtom(currentCustomerAtom);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState({
    provinceId: "",
    districtId: "",
    wardCode: "",
    detailAddress: "",
    phone: "",
    provinceName: "",
    districtName: "",
    wardName: "",
  });

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
          Hello, {currentCustomer?.lastName} {currentCustomer?.firstName}
        </h1>
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="text-2xl font-bold">Thông tin đặt hàng</h1>

        <div className="flex flex-col gap-4">
          <LabelWrapper label="Số điện thoại">
            <Input
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
    </>
  );
};

export default CustomerInformation;
