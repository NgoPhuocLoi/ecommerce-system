export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
  "http://host.docker.internal:8888/api";
export const SHOP_API = `${BACKEND_BASE_URL}/shops`;
export const AUTH_API = `${BACKEND_BASE_URL}/auth`;
export const PRODUCTS_API = `${BACKEND_BASE_URL}/products`;
export const CATEGORIES_API = `${BACKEND_BASE_URL}/categories`;
export const UPLOADED_CONTENT_API = `${BACKEND_BASE_URL}/uploaded-images`;

export const DEFAULT_LAYOUT = "defaultLayout";
