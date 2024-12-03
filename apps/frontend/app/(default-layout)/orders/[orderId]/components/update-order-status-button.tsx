"use client";
import { updateOrderStatus } from "@repo/common/actions/shop-managenent";
import { OrderDetailForShop } from "@repo/common/interfaces/order";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { Button } from "@repo/ui/components/ui/button";
import React from "react";

interface IUpdateOrderStatusButtonProps {
  order: OrderDetailForShop;
}

const UpdateOrderStatusButton = ({ order }: IUpdateOrderStatusButtonProps) => {
  const handleUpdateOrderStatus = async () => {
    await updateOrderStatus(order.order_id, order.current_status_id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-fit ml-auto" size={"sm"}>
          Xác nhận đơn hàng
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc xác nhận đơn hàng này không?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sau khi xác nhận, đơn hàng sẽ được chuyển sang trạng thái "Đã xác
            nhận"
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Không</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdateOrderStatus}>
            Xác nhận
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default UpdateOrderStatusButton;
