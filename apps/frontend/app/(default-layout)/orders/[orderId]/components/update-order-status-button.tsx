"use client";
import { updateOrderStatus } from "@repo/common/actions/shop-managenent";
import { OrderDetailForShop } from "@repo/common/interfaces/order";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@repo/ui/components/ui/alert-dialog";
import { Button } from "@repo/ui/components/ui/button";

interface IUpdateOrderStatusButtonProps {
  order: OrderDetailForShop;
}

const BUTTON_TITLE_MAPPING: {
  [key: number]: string;
} = {
  1: "Xác nhận đơn hàng",
  2: "Chuyển đơn hàng",
  3: "Hoàn thành đơn hàng",
};

const UpdateOrderStatusButton = ({ order }: IUpdateOrderStatusButtonProps) => {
  const handleUpdateOrderStatus = async () => {
    await updateOrderStatus(order.order_id, order.current_status_id);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-fit ml-auto" size={"sm"}>
          {BUTTON_TITLE_MAPPING[order.current_status_id]}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc {BUTTON_TITLE_MAPPING[order.current_status_id]} này
            không?
          </AlertDialogTitle>
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
