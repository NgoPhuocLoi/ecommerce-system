export const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_URL ||
  "https://my-ecommerce.live/__backend/api";
export const SHOP_API = `${BACKEND_BASE_URL}/shops`;
export const AUTH_API = `${BACKEND_BASE_URL}/auth`;
export const PRODUCTS_API = `${BACKEND_BASE_URL}/products`;
export const CATEGORIES_API = `${BACKEND_BASE_URL}/categories`;
export const UPLOADED_CONTENT_API = `${BACKEND_BASE_URL}/uploaded-images`;
export const ONLINE_SHOP_API = `${BACKEND_BASE_URL}/online-shop`;
export const ADDRESS_API = `${BACKEND_BASE_URL}/addresses`;
export const CUSTOMER_API = `${BACKEND_BASE_URL}/customers`;
export const SHIPPING_API = `${BACKEND_BASE_URL}/shipping`;
export const SHOP_MANAGEMENT_API = `${BACKEND_BASE_URL}/shop-management`;

export const DEFAULT_LAYOUT = "defaultLayout";
