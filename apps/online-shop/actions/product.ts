"use server";

import { PRODUCTS_API } from "@repo/common/constants/index";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";

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
