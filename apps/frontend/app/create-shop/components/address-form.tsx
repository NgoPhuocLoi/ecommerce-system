"use client";
import {
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "@repo/common/actions/address";
import { District, Province, Ward } from "@repo/common/interfaces/address";
import { Button } from "@repo/ui/components/ui/button";
import TextField from "@repo/ui/components/ui/text-field";
import TextSelection from "@repo/ui/components/ui/text-selection";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IAddressFormProps {
  provinces: Province[];
  addressInformation: {
    provinceId: string;
    districtId: string;
    wardCode: string;
    detailAddress: string;
    phone: string;
    provinceName: string;
    districtName: string;
    wardName: string;
  };
  setAddressInformation: Dispatch<
    SetStateAction<{
      provinceId: string;
      districtId: string;
      wardCode: string;
      detailAddress: string;
      phone: string;
      provinceName: string;
      districtName: string;
      wardName: string;
    }>
  >;
}

const AddressForm = ({
  provinces,
  addressInformation,
  setAddressInformation,
}: IAddressFormProps) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const onSelectedAddressChange = (addressType: string, value: string) => {
    setAddressInformation({
      ...addressInformation,
      [addressType]: value,
    });
  };

  useEffect(() => {
    const fetchDistricts = async () => {
      const data = await getDistrictsByProvinceId(
        parseInt(addressInformation.provinceId),
      );
      setDistricts(data);
    };
    fetchDistricts();
  }, [addressInformation.provinceId]);

  useEffect(() => {
    const fetchWards = async () => {
      const data = await getWardsByDistrictId(
        parseInt(addressInformation.districtId),
      );
      setWards(data);
    };
    fetchWards();
  }, [addressInformation.districtId]);

  return (
    <div className="flex flex-col gap-6">
      <TextSelection
        label="Chọn tỉnh / thành phố"
        options={provinces}
        onValueChange={(v) => {
          setAddressInformation((prev) => ({
            ...prev,
            provinceId: v,
            provinceName:
              provinces.find((p) => p.ProvinceID === Number(v))?.ProvinceName ||
              "",
          }));
        }}
        displayField="ProvinceName"
        valueField="ProvinceID"
        defaultValue={addressInformation.provinceId}
      />

      <div className="flex w-full gap-4">
        <TextSelection
          label="Chọn quận / huyện"
          options={districts}
          onValueChange={(v) => {
            setAddressInformation((prev) => ({
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
          defaultValue={addressInformation.districtId}
        />
        <TextSelection
          label="Chọn khu vực / phường"
          options={wards}
          onValueChange={(v) => {
            setAddressInformation((prev) => ({
              ...prev,
              wardCode: v,
              wardName: wards.find((w) => w.WardCode === v)?.WardName || "",
            }));
          }}
          disabled={!wards || wards?.length === 0}
          displayField="WardName"
          valueField="WardCode"
          defaultValue={addressInformation.wardCode}
        />
      </div>

      <TextField
        label="Địa chỉ cụ thể"
        type={"text"}
        value={addressInformation.detailAddress}
        onChange={(v) => {
          onSelectedAddressChange("detailAddress", v);
        }}
        id={""}
      />

      <TextField
        label="Số điện thoại"
        type={"text"}
        value={addressInformation.phone}
        onChange={(v) => {
          onSelectedAddressChange("phone", v);
        }}
        id={""}
      />
    </div>
  );
};

export default AddressForm;
