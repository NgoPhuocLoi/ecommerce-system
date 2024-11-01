"use server";

import { CATEGORIES_API } from "../constants";
import { extractMetadataFromResponse } from "@repo/common/utils/fetch";

export const getTopLevelCategories = async () => {
  const res = await fetch(`${CATEGORIES_API}?topLevel=true`, {
    cache: "no-cache",
  });
  return await extractMetadataFromResponse(res, []);
};

export const getSubCategories = async (parentId: number) => {
  const res = await fetch(`${CATEGORIES_API}?parentId=${parentId}`);
  return await res.json();
};
