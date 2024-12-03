import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { cookies } from "next/headers";

export const authenticatedFetch = async (
  url: string,
  method: string,
  accessToken: string,
  body?: Record<string, unknown>,
  tag?: string,
) => {
  return fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    next: {
      tags: [tag ?? ""],
    },
  });
};

export const tenantSpecificFetch = async ({
  url,
  method,
  body,
  tag,
}: {
  url: string;
  method: string;
  body?: any;
  tag?: string;
}) => {
  const token = await (await auth()).getToken();
  const selectedShopId = cookies().get("selectedShopId");
  console.log({ token, selectedShopId });
  if (!token || !selectedShopId) {
    console.log("HEREEEE");
    return redirect("/sign-in");
  }

  const option: RequestInit = {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "x-shop-id": selectedShopId.value,
    },
    body: JSON.stringify(body),
  };

  if (tag) {
    option.next = {
      tags: [tag],
    };
  }

  return fetch(url, option);
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
