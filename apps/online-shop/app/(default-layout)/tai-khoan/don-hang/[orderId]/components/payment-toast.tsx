"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useEffect } from "react";
import { toast } from "sonner";

interface IPaymentToastProps {
  code: string;
}

const PaymentToast = ({ code }: IPaymentToastProps) => {
  useEffect(() => {
    console.log({ code });
    function fireToast() {
      setTimeout(() => {
        const isSuccessful = code === "00";
        if (isSuccessful) {
          toast.success("Thanh toán thành công");
        } else {
          toast.error("Thanh toán thất bại");
        }
      }, 0);
    }

    if (code) {
      fireToast();
    }
  }, [code]);
  return <></>;
};

export default PaymentToast;
