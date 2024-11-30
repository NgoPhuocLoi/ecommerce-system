"use client";

import { Button } from "@repo/ui/components/ui/button";
import { createPaymentUrl } from "../../../../../actions/payment";
import { MouseEventHandler } from "react";

interface IPaymentButtonProps {
  orderId: number;
  amount: number;
}

const PaymentButotn = ({ orderId, amount }: IPaymentButtonProps) => {
  const handlePayment: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const paymentInfo = await createPaymentUrl({
      orderId,
      amount,
    });

    window.location.href = paymentInfo.redirectUrl;
  };
  return (
    <Button onClick={handlePayment} className="rounded-full">
      Thanh toán
    </Button>
  );
};

export default PaymentButotn;
