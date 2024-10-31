// import { UploadedContentPreview } from "../(default-layout)/products/_components/product-image-list";

import { Attribute, CategoryResponse } from "./category";
import { PreviewUploadedContent } from "./uploaded-content";

export interface Product {
  id: number;
  category_id: number;
  name: string;
  description: string;
  is_active: true;
  cost: number;
  price: number;
  compare_at_price: number;
  available_quantity: number;
  incoming_quantity: number;
  sold_number: number;
  custom_product_type_id: string | null;
  category: CategoryResponse;
  link?: string;
  images: PreviewUploadedContent[];
  attributes: Attribute[];
  variants: Variant[];
}

export interface VariantResponse {
  id: number;
  product_id: number;
  price: number;
  compare_at_price: number;
  available_quantity: number;
  incoming_quantity: number;
  sold_number: number;
  uploaded_thumbnail_id: any;
  variant_id: number;
  attribute_id: number;
  value_id: number;
}

export interface Variant {
  id: number | string;
  price: number;
  quantity: number;
  attributesInfo: {
    attributeId: number | string;
    valueId: number | string;
  }[];
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  compareAtPrice: number;
  cost: number;
  isActive: boolean;
  categoryId: number;
  availableQuantity: number;
  uploadedImageIds: number[];
  attributes: Attribute[];
  variants: Variant[];
}
