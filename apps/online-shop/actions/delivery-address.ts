"use server";

import { CUSTOMER_API } from "@repo/common/constants/index";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";
import { revalidateTag } from "next/cache";

export interface CreateDeliveryAddressData {
  provinceId: string;
  districtId: string;
  wardCode: string;
  provinceName: string;
  districtName: string;
  wardName: string;
  detailAddress: string;
  phone: string;
  isDefault: boolean;
}

export const createDeliveryAddress = async (
  data: CreateDeliveryAddressData,
) => {
  const res = await tenantSpecificFetch({
    method: "POST",
    url: `${CUSTOMER_API}/address`,
    body: {
      ...data,
    },
    needAuth: true,
  });

  revalidateTag("delivery-address");
  return await extractMetadataFromResponse(res);
};

export const getDeliveryAddresses = async () => {
  const res = await tenantSpecificFetch({
    method: "GET",
    url: `${CUSTOMER_API}/address`,
    needAuth: true,
    tag: "delivery-address",
  });

  return await extractMetadataFromResponse(res);
};
