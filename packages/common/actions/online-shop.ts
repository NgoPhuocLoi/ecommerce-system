"use server";

import { BACKEND_BASE_URL } from "../constants";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "@repo/common/utils/fetch";
import { extractMetadataFromResponseClientSide } from "../utils/extract-metadata";

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

export const createPage = async ({
  name,
  layout = "",
  showInNavigation = true,
  link,
  position,
}: {
  name: string;
  layout: string;
  showInNavigation: boolean;
  link: string;
  position: number;
}) => {
  const res = await tenantSpecificFetch({
    url: `${BACKEND_BASE_URL}/online-shop/pages`,
    method: "POST",
    body: {
      name,
      layout,
      showInNavigation,
      link,
      position,
    },
  });

  console.log({ createPageInShop: res });
  const data = await extractMetadataFromResponseClientSide(res, {});
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
  console.log({ updatePage: res });
  const data = await res.json();
  return data;
};

export const updateDefaultLayout = async (updatedData: {
  defaultHeaderLayout?: string;
  defaultFooterLayout?: string;
}) => {
  const res = await tenantSpecificFetch({
    url: `${BACKEND_BASE_URL}/online-shop/default-layout`,
    method: "PUT",
    body: updatedData,
  });
  console.log({ layoutRes: res });
  const data = await res.json();
  return data;
};
