import { DeliveryAddress } from "./address";

export interface ICreateOrder {
  totalPrice: number;
  totalDiscount: number;
  shippingFee: number;
  finalPrice: number;
  deliveryAddressId: number;
  paymentMethodId: number;
}

export interface OrderRepsonse {
  orderId: number;
  totalPrice: number;
  totalDiscount: number;
  finalPrice: number;
  shippingFee: number;
  buyerId: number;
  deliveryAddressId: number;
  currentStatusId: number;
  currentStatus: string;
  usedCouponId: any;
  createdAt: string;
  updatedAt: string;
  totalItems: number;
  orderPreview: OrderPreview;
  payment: Payment;
}

export interface AddressInOrder extends DeliveryAddress {
  customerName: string;
  email: string;
}

export interface Payment {
  paymentId: number;
  amount: number;
  paymentStatusId: number;
  paymentMethodId: number;
  orderId: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetail extends OrderRepsonse {
  deliveryAddress: AddressInOrder;
  orderDetails: OrderPreview[];
}

export interface OrderPreview {
  orderId: number;
  variantId: number;
  quantity: number;
  price: number;
  discount: number;
  productName: string;
  productImageUrl: string;
  variantValues: {
    name: string;
    value: number;
  }[];
}
