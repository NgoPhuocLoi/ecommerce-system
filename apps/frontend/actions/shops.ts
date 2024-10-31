"use server";

import { SHOP_API } from "../constants";
import {
  authenticatedFetch,
  extractMetadataFromResponse,
} from "../utils/fetch";
import { auth } from "@clerk/nextjs/server";

export const getShops = async (accessToken: string) => {
  try {
    const res = await authenticatedFetch(SHOP_API, "GET", accessToken);
    return await extractMetadataFromResponse(res, []);
  } catch (error) {
    console.log("[Shop action]: Error when getting shops");
  }
};

export const createShop = async (data: {
  name: string;
  domain: string;
  themeId: string;
}) => {
  const token = await (await auth())?.getToken();
  if (!token) {
    return null;
  }
  try {
    const res = await authenticatedFetch(SHOP_API, "POST", token, {
      ...data,
      hasUsedPlatformBefore: true,
      hasConfirmedEmail: true,
      themeId: Number(data.themeId),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }
    return null;
  } catch (error) {
    console.log("[Shop action]: Error when creating shop");
  }
};
