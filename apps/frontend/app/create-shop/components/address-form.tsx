"use client";
import {
  getDistrictsByProvinceId,
  getWardsByDistrictId,
} from "@repo/common/actions/address";
import { District, Province, Ward } from "@repo/common/interfaces/address";
import TextField from "@repo/ui/components/ui/text-field";
import TextSelection from "@repo/ui/components/ui/text-selection";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";

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
  onSubmitCallback: () => void;
  onBack: () => void;
}

const addressFormSchema = z.object({
  province: z.string({
    required_error: "Vui lòng chọn tỉnh / thành phố",
  }),
  district: z.string({
    required_error: "Vui lòng chọn quận / huyện",
  }),
  ward: z.string({
    required_error: "Vui lòng chọn khu vực / phường",
  }),
  detailAddress: z.string({
    required_error: "Vui lòng nhập địa chỉ cụ thể",
  }),
  phone: z
    .string({
      required_error: "Vui lòng nhập số điện thoại",
    })
    .regex(
      /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
      "Số điện thoại không hợp lệ",
    ),
});

const AddressForm = ({
  provinces,
  addressInformation,
  setAddressInformation,
  onSubmitCallback,
  onBack,
}: IAddressFormProps) => {
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);

  const form = useForm<z.infer<typeof addressFormSchema>>({
    resolver: zodResolver(addressFormSchema),
  });

  function onSubmit(data: z.infer<typeof addressFormSchema>) {
    console.log(data);
    setAddressInformation((prev) => ({
      ...prev,
      detailAddress: data.detailAddress,
      phone: data.phone,
    }));
    onSubmitCallback();
  }

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
    <div className="h-full">
      <Form {...form}>
        <form
          className="flex flex-col gap-6 h-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <TextSelection
                  label="Chọn tỉnh / thành phố"
                  options={provinces}
                  onValueChange={(v) => {
                    field.onChange(v);
                    setAddressInformation((prev) => ({
                      ...prev,
                      provinceId: v,
                      provinceName:
                        provinces.find((p) => p.ProvinceID === Number(v))
                          ?.ProvinceName || "",
                    }));
                  }}
                  displayField="ProvinceName"
                  valueField="ProvinceID"
                  defaultValue={addressInformation.provinceId}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 w-full gap-4">
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <TextSelection
                    label="Chọn quận / huyện"
                    options={districts}
                    onValueChange={(v) => {
                      field.onChange(v);
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ward"
              render={({ field }) => (
                <FormItem>
                  <TextSelection
                    label="Chọn khu vực / phường"
                    options={wards}
                    onValueChange={(v) => {
                      field.onChange(v);
                      setAddressInformation((prev) => ({
                        ...prev,
                        wardCode: v,
                        wardName:
                          wards.find((w) => w.WardCode === v)?.WardName || "",
                      }));
                    }}
                    disabled={!wards || wards?.length === 0}
                    displayField="WardName"
                    valueField="WardCode"
                    defaultValue={addressInformation.wardCode}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="detailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ cụ thể</FormLabel>
                <FormControl>
                  <Input placeholder="Địa chỉ cụ thể" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số điện thoại</FormLabel>
                <FormControl>
                  <Input placeholder="Số điện thoại" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="ml-auto mt-auto flex gap-4 ">
            <Button onClick={onBack} variant={"outline"} type="button">
              Quay lại
            </Button>
            <Button>Tiếp</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddressForm;
