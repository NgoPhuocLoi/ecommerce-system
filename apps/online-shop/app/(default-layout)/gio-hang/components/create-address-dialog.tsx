import {
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "@repo/common/actions/address";
import { District, Province, Ward } from "@repo/common/interfaces/address";
import { Button } from "@repo/ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Input } from "@repo/ui/components/ui/input";
import { LabelWrapper } from "@repo/ui/components/ui/label-wrapper";
import TextSelection from "@repo/ui/components/ui/text-selection";
import React, { useEffect, useState } from "react";
import { createDeliveryAddress } from "../../../../actions/delivery-address";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import { Label } from "@repo/ui/components/ui/label";

interface ICreateAddressDialogProps {
  provinces: Province[];
}

const CreateAddressDialog = ({ provinces }: ICreateAddressDialogProps) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState(() => {
    return {
      provinceId: "",
      districtId: "",
      wardCode: "",
      detailAddress: "",
      phone: "",
      provinceName: "",
      districtName: "",
      wardName: "",
      isDefault: false,
    };
  });
  const [open, setOpen] = useState(false);

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

  const handleCreateAddress = async () => {
    const newAddress = await createDeliveryAddress(deliveryAddress);
    if (newAddress) {
      setOpen(false);
    }
    // console.log({ deliveryAddress });
  };

  return (
    <div className="pt-4">
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogTrigger asChild>
          <Button className="w-full">Thêm địa chỉ mới</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm địa chỉ mới</DialogTitle>

            <div className="flex flex-col gap-4 pt-4">
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
                  <div className="grid grid-cols-1 gap-4">
                    <TextSelection
                      defaultValue={deliveryAddress.provinceId}
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
                      defaultValue={deliveryAddress.districtId}
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
                      defaultValue={deliveryAddress.wardCode}
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

              <div className="flex items-center gap-2">
                <Checkbox
                  defaultChecked={deliveryAddress.isDefault}
                  onCheckedChange={(value) => {
                    setDeliveryAddress((prev) => ({
                      ...prev,
                      isDefault: value as boolean,
                    }));
                    console.log(value);
                  }}
                  id="default-address-check"
                />
                <Label
                  htmlFor="default-address-check"
                  className="cursor-pointer"
                >
                  Đặt làm mặc định
                </Label>
              </div>

              <Button onClick={handleCreateAddress} className="w-full">
                Thêm
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateAddressDialog;
