"use server";

import { BACKEND_BASE_URL } from "../constants";
import {
  authenticatedFetch,
  extractMetadataFromResponse,
} from "@repo/common/utils/fetch";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getThemes = async () => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes`;
    const res = await authenticatedFetch(url, "GET", token);
    return await extractMetadataFromResponse(res, []);
  } catch (error) {
    console.log("[Themes action]: Error when getting themes");
    return [];
  }
};

export const getTheme = async (themeId: string) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}`;
    const res = await authenticatedFetch(url, "GET", token);

    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(`[Themes action]: Error when getting theme with id ${themeId}`);
    return null;
  }
};

export const createTheme = async ({
  name,
  description,
  recommendedForCategoryId,
}: {
  name: string;
  description: string;
  recommendedForCategoryId?: number;
}) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes`;
    const res = await authenticatedFetch(url, "POST", token, {
      name,
      description,
      recommendedForCategoryId,
    });

    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(`[Themes action]: Error when creating theme`);
    return null;
  } finally {
    revalidatePath("/vi/admin/themes");
  }
};

export const updateTheme = async (
  themeId: string,
  updatedData: {
    name?: string;
    description?: string;
    recommendedForCategoryId?: number;
    defaultHeaderLayout?: string;
    defaultFooterLayout?: string;
  },
) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}`;
    const res = await authenticatedFetch(url, "PUT", token, updatedData);

    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(
      `[Themes action]: Error when updating theme with id ${themeId}`,
    );
    return null;
  } finally {
    revalidatePath("/vi/admin/themes");
  }
};

export const deleteTheme = async (themeId: string) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}`;
    const res = await authenticatedFetch(url, "DELETE", token);

    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(
      `[Themes action]: Error when deleting theme with id ${themeId}`,
    );
    return null;
  } finally {
    revalidatePath("/vi/admin/themes");
  }
};

export const createPageInTheme = async (
  themeId: string,
  pageData: {
    name: string;
    link: string;
    showInNavigation: boolean;
  },
) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}/pages`;
    const res = await authenticatedFetch(url, "POST", token, pageData);

    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(
      `[Themes action]: Error when creating page in theme with id ${themeId}`,
    );
    return null;
  } finally {
    revalidatePath(`/vi/admin/themes/${themeId}`);
  }
};

export const updatePageInTheme = async (
  themeId: string,
  pageId: string,
  updatedData: {
    name?: string;
    link?: string;
    showInNavigation?: boolean;
    layout?: string;
  },
) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}/pages/${pageId}`;
    const res = await authenticatedFetch(url, "PUT", token, updatedData);
    console.log({ res });
    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(
      `[Themes action]: Error when updating page in theme with id ${themeId}`,
    );
    return null;
  } finally {
    revalidatePath(`/vi/admin/themes/${themeId}`);
  }
};

export const getPageDetailInTheme = async (themeId: string, pageId: string) => {
  console.log({ themeId, pageId });
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}/pages/${pageId}`;
    const res = await authenticatedFetch(url, "GET", token);

    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(
      `[Themes action]: Error when getting page detail in theme with id ${themeId}`,
    );
    return null;
  }
};

export const updatePagesPositionInTheme = async (
  themeId: string,
  pageIdsInOrder: Array<number>,
) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}/update-pages-position`;
    const res = await authenticatedFetch(url, "PUT", token, { pageIdsInOrder });

    return await extractMetadataFromResponse(res, []);
  } catch (error) {
    console.log(
      `[Themes action]: Error when updating pages position in theme with id ${themeId}`,
    );
    return null;
  } finally {
    // revalidatePath(`/vi/admin/themes/${themeId}`);
  }
};

export const deletePageInTheme = async (themeId: string, pageId: string) => {
  try {
    const token = await (await auth())?.getToken();
    if (!token) {
      return redirect("/sign-in");
    }
    const url = `${BACKEND_BASE_URL}/themes/${themeId}/pages/${pageId}`;
    const res = await authenticatedFetch(url, "DELETE", token);

    return await extractMetadataFromResponse(res, {});
  } catch (error) {
    console.log(
      `[Themes action]: Error when deleting page in theme with id ${themeId}`,
    );
    return null;
  } finally {
    revalidatePath(`/vi/admin/themes/${themeId}`);
  }
};
