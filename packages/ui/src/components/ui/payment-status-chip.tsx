import clsx from "clsx";
import React from "react";

const PAYMENT_STATUS_ID_MAPPING: {
  [key: number]: {
    label: string;
    color: string;
  };
} = {
  1: {
    label: "Chờ thanh toán",
    color: "#f39c12",
  },
  2: {
    label: "Đã thanh toán",
    color: "#2ecc71",
  },
  3: {
    label: "Thanh toán thất bại",
    color: "#e74c3c",
  },
};

interface IPaymentStatusChipProps {
  statusId: number;
}

export const PaymentStatusChip = ({ statusId }: IPaymentStatusChipProps) => {
  return (
    <div
      className={clsx(`border px-2 py-1 text-sm rounded-md text-white`)}
      style={{
        backgroundColor: PAYMENT_STATUS_ID_MAPPING[statusId]?.color,
        // opacity: 0.8,
      }}
    >
      {PAYMENT_STATUS_ID_MAPPING[statusId]?.label}
    </div>
  );
};
