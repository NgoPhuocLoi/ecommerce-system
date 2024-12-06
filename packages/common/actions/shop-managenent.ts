"use server";

import { SHOP_MANAGEMENT_API } from "../constants";
import { OrderDetailForShop, OrderForShop } from "../interfaces/order";
import { CustomerForShop } from "../interfaces/customer";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";
import { revalidateTag } from "next/cache";

export const getCustomersForShop = async (): Promise<CustomerForShop[]> => {
  const res = await tenantSpecificFetch({
    url: `${SHOP_MANAGEMENT_API}/customers`,
    method: "GET",
    noStoreCache: true,
  });

  return extractMetadataFromResponse(res, []);
};

export const getOrdersForShop = async (): Promise<OrderForShop[]> => {
  const res = await tenantSpecificFetch({
    url: `${SHOP_MANAGEMENT_API}/orders`,
    method: "GET",
    noStoreCache: true,
  });

  return extractMetadataFromResponse(res, []);
};

export const getOrderForShop = async (
  orderId: number,
): Promise<OrderDetailForShop> => {
  const res = await tenantSpecificFetch({
    url: `${SHOP_MANAGEMENT_API}/orders/${orderId}`,
    method: "GET",
    tag: "getOrderForShop",
  });

  return extractMetadataFromResponse(res, {});
};

export const updateOrderStatus = async (
  orderId: number,
  currentStatusId: number,
): Promise<OrderDetailForShop> => {
  const res = await tenantSpecificFetch({
    url: `${SHOP_MANAGEMENT_API}/orders/${orderId}/status`,
    method: "PUT",
    body: {
      fromStatusId: currentStatusId,
      toStatusId: currentStatusId + 1,
    },
  });
  revalidateTag("getOrderForShop");
  return extractMetadataFromResponse(res, {});
};
