"use server";

import { CUSTOMER_API } from "@repo/common/constants/index";
import { ICreateOrder, OrderDetail, OrderRepsonse } from "../interfaces/order";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";
import { revalidateTag } from "next/cache";

export const createOrder = async (order: ICreateOrder) => {
  const res = await tenantSpecificFetch({
    method: "POST",
    url: `${CUSTOMER_API}/orders`,
    body: { ...order },
    needAuth: true,
  });
  revalidateTag("orders");
  return await extractMetadataFromResponse(res, {});
};

export const getOrders = async (): Promise<OrderRepsonse[]> => {
  const res = await tenantSpecificFetch({
    method: "GET",
    url: `${CUSTOMER_API}/orders`,
    needAuth: true,
    tag: "orders",
  });

  return await extractMetadataFromResponse(res, []);
};

export const getOrderDetail = async (orderId: number): Promise<OrderDetail> => {
  const res = await tenantSpecificFetch({
    method: "GET",
    url: `${CUSTOMER_API}/orders/${orderId}`,
    needAuth: true,
    tag: "order_detail",
  });

  return await extractMetadataFromResponse(res, {});
};
