export interface ICartItem {
  variantId: number;
  quantity: number;
  pricePerItem: number;
}

export interface CartResponse {
  id: number;
  variantId: number;
  customerId: number;
  quantity: number;
  pricePerItem: number;
  productId: number;
  attributeValues: string[];
  productName: string;
  images: {
    url: string;
  }[];
}
