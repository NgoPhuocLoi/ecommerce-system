"use server";
import { CUSTOMER_API } from "@repo/common/constants/index";
import { ICartItem } from "../interfaces/cart";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";

export const addToCart = async ({
  variantId,
  quantity,
  pricePerItem,
}: ICartItem) => {
  const res = await tenantSpecificFetch({
    url: `${CUSTOMER_API}/cart`,
    method: "POST",
    body: {
      variantId,
      quantity,
      pricePerItem,
    },
    needAuth: true,
  });

  return await extractMetadataFromResponse(res);
};

export const retrieveCart = async () => {
  const res = await tenantSpecificFetch({
    url: `${CUSTOMER_API}/cart`,
    method: "GET",
    needAuth: true,
    skipCache: true,
  });

  return await extractMetadataFromResponse(res);
};

export const removeFromCart = async (itemId: number) => {
  const res = await tenantSpecificFetch({
    url: `${CUSTOMER_API}/cart/${itemId}`,
    method: "DELETE",
    needAuth: true,
  });

  return await extractMetadataFromResponse(res);
};

export const clearCart = async () => {
  const res = await tenantSpecificFetch({
    url: `${CUSTOMER_API}/cart`,
    method: "DELETE",
    needAuth: true,
  });

  return await extractMetadataFromResponse(res);
};

export const countCartItems = async () => {
  const res = await tenantSpecificFetch({
    url: `${CUSTOMER_API}/cart/count`,
    method: "GET",
    needAuth: true,
    skipCache: true,
  });

  return await extractMetadataFromResponse(res);
};
