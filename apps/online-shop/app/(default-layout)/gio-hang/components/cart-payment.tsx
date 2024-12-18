"use client";
import {
  PAYMENT_METHOD_ID_MAPPING,
  PAYMENT_METHODS,
} from "@repo/common/constants/payment";
import payment01Png from "@repo/common/images/payment-01.png";
import payment02Png from "@repo/common/images/payment-02.png";
import { Circle, CircleDot } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { useAtom } from "jotai";
import { orderAtom } from "../../../../atom/order";

const imageMapping: {
  [key: number]: string;
} = {
  1: payment01Png.src,
  2: payment02Png.src,
};

interface ICartPaymentProps {
  selectedPaymentId: number;
  setSelectedPaymentId: (id: number) => void;
}

const CartPayment = ({
  selectedPaymentId,
  setSelectedPaymentId,
}: ICartPaymentProps) => {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Hình thức thanh toán</h1>

      <div className="flex flex-col gap-4">
        {PAYMENT_METHODS.map((payment) => (
          <div
            onClick={() => setSelectedPaymentId(payment.id)}
            key={payment.id}
            className={clsx(
              "px-4 py-2 border rounded-lg flex gap-4 items-center cursor-pointer",
              {
                "bg-gray-100 border-black": selectedPaymentId === payment.id,
              },
            )}
          >
            {selectedPaymentId === payment.id ? (
              <CircleDot size={20} />
            ) : (
              <Circle size={20} />
            )}
            <Image
              src={imageMapping[payment.id] ?? ""}
              width={44}
              height={44}
              alt="Payment logo"
            />
            <h2 className="font-bold">
              {PAYMENT_METHOD_ID_MAPPING[payment.id]}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartPayment;
