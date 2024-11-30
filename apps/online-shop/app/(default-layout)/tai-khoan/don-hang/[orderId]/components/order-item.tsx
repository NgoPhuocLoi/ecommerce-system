import { formatCurrency } from "@repo/common/utils/currency-format";
import Image from "next/image";
import { OrderPreview } from "../../../../../../interfaces/order";

interface IOrderItemProps {
  orderPreview: OrderPreview;
}

const OrderItem = ({ orderPreview }: IOrderItemProps) => {
  return (
    <div className="grid grid-cols-7 py-4 px-4 text-center bg-gray-200 text-sm border border-t-0 border-r-0 border-l-0 border-gray-300">
      <div className="col-span-3 flex items-center gap-2">
        <Image
          src={orderPreview.productImageUrl}
          alt="abcd"
          width={68}
          height={90}
          className="rounded-md border border-gray-500"
        />

        <p className="text-sm">{orderPreview.productName}</p>
      </div>
      <div className="flex flex-col justify-center">
        {orderPreview.quantity}
      </div>
      <div className="flex flex-col justify-center">
        {formatCurrency(orderPreview.price)}
      </div>
      <div className="flex flex-col justify-center">
        {orderPreview.variantValues.map((v) => v.name).join("/")}
      </div>
      <div className="flex flex-col justify-center">
        {formatCurrency(orderPreview.price * orderPreview.quantity)}
      </div>
    </div>
  );
};

export default OrderItem;
