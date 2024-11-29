import { Badge } from "@repo/ui/components/ui/badge";
import React from "react";
import OrderItem from "./order-item";
import { Button } from "@repo/ui/components/ui/button";
import { formatCurrency } from "@repo/common/utils/currency-format";

const OrderCard = () => {
  return (
    <div className="bg-gray-200 rounded-md">
      <div className="px-6 py-4 bg-black text-white rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold">#1</h3>
            <p className="text-xs pt-1">22.11.2024</p>
          </div>

          <div>
            <Badge variant={"secondary"}>Đã giao hàng</Badge>
          </div>
        </div>
      </div>

      <OrderItem />

      <div className="px-10 py-2 flex justify-between items-center">
        <Button className="rounded-full">Thanh toán</Button>
        <p>
          Tổng tiền (1 món):{" "}
          <span className="font-bold">{formatCurrency(189000)}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderCard;
