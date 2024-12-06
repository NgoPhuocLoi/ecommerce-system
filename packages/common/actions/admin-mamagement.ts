"use server";

import { ADMIN_MANAGEMENT_API } from "../constants";
import { CustomerForAdmin } from "../interfaces/customer";
import { extractMetadataFromResponse } from "../utils/fetch";

export const getCustomersForAdmin = async (): Promise<CustomerForAdmin[]> => {
  const res = await fetch(`${ADMIN_MANAGEMENT_API}/accounts`);

  return extractMetadataFromResponse(res, []);
};

export const getCustomerForAdmin = async (
  id: string,
): Promise<CustomerForAdmin> => {
  const res = await fetch(`${ADMIN_MANAGEMENT_API}/accounts/${id}`);

  return extractMetadataFromResponse(res, {});
};
