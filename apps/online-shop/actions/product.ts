"use server";

import { PRODUCTS_API } from "@repo/common/constants/index";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";
import { Product } from "@repo/common/interfaces/product";

export const getProducts = async (filter?: { name: string }) => {
  let url = PRODUCTS_API;
  if (filter?.name) {
    url += `?name=${filter.name}`;
  }
  const res = await tenantSpecificFetch({
    url: url,
    method: "GET",
  });

  if (!res) {
    return null;
  }

  return await extractMetadataFromResponse(res, []);
};

export const getProductById = async (
  id: string,
): Promise<Product | undefined> => {
  const res = await tenantSpecificFetch({
    url: `${PRODUCTS_API}/${id}`,
    method: "GET",
  });

  return await extractMetadataFromResponse(res);
};
