import { Badge } from "@repo/ui/components/ui/badge";
import React from "react";
import Image from "next/image";
import { formatCurrency } from "@repo/common/utils/currency-format";
import { Button } from "@repo/ui/components/ui/button";
import OrderItem from "./components/order-item";
import OrderCard from "./components/order-card";

const Page = () => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Lịch sử đơn hàng</h1>

      <p className="text-gray-600">Đơn hàng của bạn: 4 đơn hàng</p>

      <div className="flex flex-col gap-8">
        <OrderCard />
        <OrderCard />
        <OrderCard />
      </div>
    </div>
  );
};

export default Page;
