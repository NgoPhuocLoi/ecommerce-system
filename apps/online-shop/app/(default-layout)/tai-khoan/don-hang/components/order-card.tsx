import { formatCurrency } from "@repo/common/utils/currency-format";
import { OrderStatusChip } from "@repo/ui/components/ui/order-status-chip";
import { PaymentStatusChip } from "@repo/ui/components/ui/payment-status-chip";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { OrderRepsonse } from "../../../../../interfaces/order";
import PaymentButotn from "./payment-button";

interface IOrderCardProps {
  order: OrderRepsonse;
}

const OrderCard = ({ order }: IOrderCardProps) => {
  const shouldShowPaymentButton = useMemo(() => {
    return (
      order.payment.paymentStatusId !== 2 && order.payment.paymentMethodId === 2
    );
  }, [order.currentStatusId, order.payment.paymentMethodId]);

  return (
    <Link
      href={`/tai-khoan/don-hang/${order.orderId}`}
      className="bg-gray-200 rounded-md"
    >
      <div className="px-6 py-4 bg-black text-white rounded-lg rounded-bl-none rounded-br-none">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="font-bold"># {order.orderId}</h3>
            <p className="text-xs pt-1">
              {DateTime.fromISO(order.createdAt).toFormat("dd.LL.yyyy")}
            </p>
          </div>

          <div className="text-black flex gap-2">
            <OrderStatusChip statusId={order.currentStatusId} />

            {order.payment.paymentMethodId === 2 && (
              <PaymentStatusChip statusId={order.payment.paymentStatusId} />
            )}
          </div>
        </div>
      </div>

      {/* <OrderItem /> */}
      <div className="py-4 px-10 flex gap-4 border border-t-0 border-r-0 border-l-0 border-gray-300">
        <Image
          src={order.orderPreview.productImageUrl}
          alt="product"
          width={100}
          height={120}
          className="rounded-md"
        />

        <div className="flex flex-col justify-between gap-2 py-2 ">
          <p className="font-bold">{order.orderPreview.productName}</p>
          <p>{order.orderPreview.variantValues.map((v) => v.name).join("/")}</p>
          <p>x{order.orderPreview.quantity}</p>
          <p className="font-bold">
            {formatCurrency(order.orderPreview.price)}
          </p>
        </div>
      </div>

      <div className="px-10 py-2 flex justify-between items-center">
        {shouldShowPaymentButton && (
          <PaymentButotn orderId={order.orderId} amount={order.finalPrice} />
        )}
        <p className="ml-auto py-2">
          Tổng tiền ({order.totalItems} món):{" "}
          <span className="font-bold">{formatCurrency(order.finalPrice)}</span>
        </p>
      </div>
    </Link>
  );
};

export default OrderCard;
