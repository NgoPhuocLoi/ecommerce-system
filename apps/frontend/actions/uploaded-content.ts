"use server";
import { UPLOADED_CONTENT_API } from "../constants";
import { tenantSpecificFetch } from "../utils/fetch";

export const getUploadedImages = async () => {
  const res = await tenantSpecificFetch({
    url: UPLOADED_CONTENT_API,
    method: "GET",
  });

  if (!res) {
    return null;
  }

  return await res.json();
};

export const getPreviewUploadedImages = async () => {
  const res = await tenantSpecificFetch({
    url: `${UPLOADED_CONTENT_API}/preview`,
    method: "GET",
  });

  if (!res) {
    return null;
  }

  return await res.json();
};

export const saveUploadedImagesInfo = async (uploadedImage: {
  uploadedPublicId: string;
  url: string;
  format: string;
  size: number;
}) => {
  const res = await tenantSpecificFetch({
    url: UPLOADED_CONTENT_API,
    method: "POST",
    body: uploadedImage,
  });
  const data = await res.json();
  return data;
};
