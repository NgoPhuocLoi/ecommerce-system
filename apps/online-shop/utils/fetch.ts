import { SHOP_API } from "@repo/common/constants/index";
import { cookies } from "next/headers";

export const getShopIdFromShopDomain = async (domain: string) => {
  const res = await fetch(`${SHOP_API}/domain/${domain}`);
  const data = await res.json();
  console.log({ data });
  return data.metadata?.id;
};

export const tenantSpecificFetch = async ({
  url,
  method,
  body,
  needAuth,
}: {
  url: string;
  method: string;
  body?: Record<string, string>;
  needAuth?: boolean;
}) => {
  const shopHost = cookies().get("shop");
  const shopDomain = shopHost?.value.split(".")[0];
  const shopId = await getShopIdFromShopDomain(shopDomain ?? "");
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    "x-shop-id": shopId,
  };
  if (needAuth) {
    const token = cookies().get("token")?.value;
    console.log({ tokenInheader: token });
    headers["Authorization"] = `Bearer ${token}`;
  }

  console.log({ headers });
  return fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  });
};

export const extractMetadataFromResponse = async (
  res: Response,
  fallback?: object,
) => {
  if (!res.ok) {
    return fallback ?? null;
  }

  const data = await res.json();
  if (data.statusCode !== 200 && data.statusCode !== 201) {
    return fallback ?? null;
  }

  return data.metadata;
};
