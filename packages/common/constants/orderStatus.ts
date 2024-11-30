export const AWAITING_CONFIRM = "Chờ xác nhận";
export const AWAITING_FULFILLMENT = "Đang xử lý";
export const DELIVERING = "Đang giao";
export const DELIVERED = "Đã giao";
export const CANCELED = "Đã hủy";
export const RETURNED = "Đổi trả";

export const ORDER_STATUSES = [
  AWAITING_CONFIRM,
  AWAITING_FULFILLMENT,
  DELIVERING,
  DELIVERED,
  CANCELED,
  RETURNED,
];

export const ORDER_STATUS_ID_MAPPING = {
  ALL: 0,
  AWAITING_CONFIRM: 1,
  AWAITING_FULFILLMENT: 2,
  DELIVERING: 3,
  DELIVERED: 4,
  CANCELED: 5,
  RETURNED: 6,
};
