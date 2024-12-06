"use server";

import { SHOP_API } from "../constants";
import {
  authenticatedFetch,
  extractMetadataFromResponse,
} from "@repo/common/utils/fetch";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getCustomerForAdmin } from "./admin-mamagement";

export const getShops = async (accessToken: string) => {
  try {
    const res = await authenticatedFetch(
      SHOP_API,
      "GET",
      accessToken,
      undefined,
      "get_shops",
    );
    return await extractMetadataFromResponse(res, []);
  } catch (error) {
    console.log("[Shop action]: Error when getting shops");
  }
};

export const getShopByDomain = async (domain: string) => {
  try {
    const res = await fetch(`${SHOP_API}/domain/${domain}`);
    return await extractMetadataFromResponse(res);
  } catch (error) {
    console.log("[Shop action]: Error when getting shop by domain");
  }
};

export const createShop = async (data: {
  name: string;
  domain: string;
  themeId: string;
  mainCategoryIdToSell: string;
  hasUsedPlatformBefore: boolean;
  provinceId: string;
  districtId: string;
  wardCode: string;
  detailAddress: string;
  phone: string;
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
      provinceId: Number(data.provinceId),
      districtId: Number(data.districtId),
      wardCode: data.wardCode,
      mainCategoryIdToSell: Number(data.mainCategoryIdToSell),
    });
    if (res.ok) {
      const data = await res.json();
      return data;
    }

    console.log({ error: (await res.json())?.errors });
    return null;
  } catch (error) {
    console.log("[Shop action]: Error when creating shop");
  } finally {
    revalidatePath("/");
  }
};

export const getCurrentShop = async () => {
  try {
    const selectedShopId = cookies().get("selectedShopId")?.value ?? "";
    const res = await getCustomerForAdmin(selectedShopId);
    return res;
  } catch (error) {
    console.log("[Shop action]: Error when getting current shop");
  }
};
