"use server";

import { SHIPPING_API } from "@repo/common/constants/index";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";
import { ShippingResponse } from "../interfaces/shipping";

interface CalculateShippingFeeData {
  toDistrictId: number;
  toWardCode: string;
  weightInGram?: number;
}

export const calculateShippingFee = async ({
  toDistrictId,
  toWardCode,
  weightInGram,
}: CalculateShippingFeeData): Promise<any> => {
  weightInGram = weightInGram || 1000;
  const res = await tenantSpecificFetch({
    method: "POST",
    url: `${SHIPPING_API}/fee`,
    body: {
      toDistrictId,
      toWardCode,
      weightInGram,
    },
    needAuth: true,
  });
  // const jsonData = await res.json();
  // return jsonData;

  return await extractMetadataFromResponse(res, {});
};
