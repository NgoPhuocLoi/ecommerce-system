export const PAYMENT_METHODS = [
  {
    id: 1,
    name: "Thanh toán khi nhận hàng",
    description: "Thanh toán khi nhận hàng",
  },
  {
    id: 2,
    name: "Thanh toán qua VNPay",
    description: "Thanh toán qua VNPay",
  },
];

export const PAYMENT_METHOD_ID_MAPPING: {
  [key: number]: string;
} = {
  1: "Thanh toán khi nhận hàng (COD)",
  2: "Thanh toán qua VNPay",
};
