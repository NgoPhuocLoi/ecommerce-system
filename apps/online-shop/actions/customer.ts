"use server";

import { CUSTOMER_API } from "@repo/common/constants/index";
import {
  extractMetadataFromResponse,
  tenantSpecificFetch,
} from "../utils/fetch";
import { cookies } from "next/headers";

export const customerRegister = async (registerData: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const res = await tenantSpecificFetch({
    url: CUSTOMER_API,
    method: "POST",
    body: registerData,
  });

  return await extractMetadataFromResponse(res);
};

export const customerLogin = async (loginData: {
  email: string;
  password: string;
}) => {
  const res = await tenantSpecificFetch({
    url: `${CUSTOMER_API}/login`,
    method: "POST",
    body: loginData,
  });

  const data = await res.json();

  if (data.statusCode !== 200) {
    return null;
  }

  cookies().set("token", data.metadata.tokens.accessToken, {
    httpOnly: true,
  });

  return data.metadata;
};

export const getCurrentCustomerProfile = async () => {
  const res = await tenantSpecificFetch({
    url: `${CUSTOMER_API}/profile`,
    method: "GET",
    needAuth: true,
  });

  console.log({ res });

  return await extractMetadataFromResponse(res);
};

export const customerLogout = async () => {
  cookies().delete("token");
};
