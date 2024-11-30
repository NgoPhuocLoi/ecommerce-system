"use server";

import { CUSTOMER_API } from "@repo/common/constants/index";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";

export const createPaymentUrl = async (paymentData: {
  orderId: number;
  amount: number;
}): Promise<{ redirectUrl: string }> => {
  const res = await tenantSpecificFetch({
    method: "POST",
    url: `${CUSTOMER_API}/payments/create-payment-url`,
    body: paymentData,
    needAuth: true,
  });

  return await extractMetadataFromResponse(res);
};
