import clsx from "clsx";
import React from "react";

const ORDER_STATUS_ID_MAPPING: {
  [key: number]: {
    label: string;
    color: string;
  };
} = {
  1: {
    label: "Đang chờ xác nhận",
    color: "#ccc",
  },
  2: {
    label: "Đang xử lý",
    color: "#3498db",
  },
  3: {
    label: "Đang giao hàng",
    color: "#f39c12",
  },
  4: {
    label: "Đã giao hàng",
    color: "#2ecc71",
  },
  5: {
    label: "Đã hủy",
    color: "#e74c3c",
  },
};

interface IOrderStatusChipProps {
  statusId: number;
}

export const OrderStatusChip = ({ statusId }: IOrderStatusChipProps) => {
  return (
    <div
      className={clsx(`border px-2 py-1 text-sm rounded-md w-fit`, {
        "text-white": statusId !== 1,
      })}
      style={{
        backgroundColor: ORDER_STATUS_ID_MAPPING[statusId]?.color,
        // opacity: 0.8,
      }}
    >
      {ORDER_STATUS_ID_MAPPING[statusId]?.label}
    </div>
  );
};
