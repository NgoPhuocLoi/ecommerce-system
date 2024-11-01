"use server";

import { BACKEND_BASE_URL } from "../constants";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "@repo/common/utils/fetch";

export const getPages = async () => {
  const res = await tenantSpecificFetch({
    url: `${BACKEND_BASE_URL}/online-shop/pages`,
    method: "GET",
  });
  return await extractMetadataFromResponse(res, []);
};

export const getOnlineShop = async () => {
  const res = await tenantSpecificFetch({
    url: `${BACKEND_BASE_URL}/online-shop`,
    method: "GET",
  });
  return await extractMetadataFromResponse(res, []);
};

export const getPageLayout = async (pageId: number) => {
  const res = await tenantSpecificFetch({
    url: `${BACKEND_BASE_URL}/online-shop/pages/${pageId}/layout`,
    method: "GET",
  });
  return await extractMetadataFromResponse(res, {});
};

export const createPage = async (name: string) => {
  const res = await tenantSpecificFetch({
    url: `${BACKEND_BASE_URL}/online-shop/pages`,
    method: "POST",
    body: { name },
  });
  const data = await res.json();
  return data;
};

export const updatePage = async (
  pageId: number,
  updatedData: { layout?: string; name?: string },
) => {
  const res = await tenantSpecificFetch({
    url: `${BACKEND_BASE_URL}/online-shop/pages/${pageId}`,
    method: "PUT",
    body: updatedData,
  });
  const data = await res.json();
  return data;
};
