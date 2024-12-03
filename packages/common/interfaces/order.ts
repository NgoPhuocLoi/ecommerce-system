export interface OrderForShop {
  order_id: number;
  total_price: number;
  total_discount: number;
  final_price: number;
  shipping_fee: number;
  buyer_id: number;
  delivery_address_id: number;
  current_status_id: number;
  used_coupon_id: any;
  created_at: string;
  updated_at: string;
  customer: {
    id: number;
    name: string;
    email: string;
  };
  payment: Payment;
  total_items: number;
  link?: string;
}

export interface OrderDetailForShop extends OrderForShop {
  delivery_address: DeliveryAddress;
  order_details: OrderDetail[];
}

export interface Payment {
  amount: number;
  order_id: number;
  created_at: string;
  payment_id: number;
  updated_at: string;
  payment_method_id: number;
  payment_status_id: number;
}

export interface DeliveryAddress {
  phone: string;
  ward_code: string;
  ward_name: string;
  is_default: boolean;
  is_deleted: boolean;
  customer_id: number;
  district_id: number;
  province_id: number;
  district_name: string;
  province_name: string;
  detail_address: string;
  delivery_address_id: number;
}

export interface OrderDetail {
  orderId: number;
  variantId: number;
  quantity: number;
  price: number;
  discount: number;
  productName: string;
  productImageUrl: string;
  variantValues: VariantValue[];
}

export interface VariantValue {
  name: string;
  id: number;
}
