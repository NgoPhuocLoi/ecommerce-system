"use server";

import { ONLINE_SHOP_API } from "@repo/common/constants/index";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";

export const getPages = async () => {
  const res = await tenantSpecificFetch({
    url: `${ONLINE_SHOP_API}/pages`,
    method: "GET",
  });

  return await extractMetadataFromResponse(res, []);
};

export const getOnlineShop = async () => {
  const res = await tenantSpecificFetch({
    url: `${ONLINE_SHOP_API}`,
    method: "GET",
  });
  return await extractMetadataFromResponse(res, []);
};

export const getPageLayout = async (pageId: number) => {
  const res = await tenantSpecificFetch({
    url: `${ONLINE_SHOP_API}/pages/${pageId}/layout`,
    method: "GET",
  });
  return await extractMetadataFromResponse(res);
};
