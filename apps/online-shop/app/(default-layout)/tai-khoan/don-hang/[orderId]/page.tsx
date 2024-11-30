import { Badge } from "@repo/ui/components/ui/badge";
import React from "react";
import Image from "next/image";
import { formatCurrency } from "@repo/common/utils/currency-format";
import OrderItem from "./components/order-item";
import { getOrderDetail } from "../../../../../actions/order";
import { DateTime } from "luxon";
import { OrderStatusChip } from "@repo/ui/components/ui/order-status-chip";
import { PaymentStatusChip } from "@repo/ui/components/ui/payment-status-chip";
import {
  PAYMENT_METHOD_ID_MAPPING,
  PAYMENT_METHODS,
} from "@repo/common/constants/payment";
import { PAYMENT_STATUS_ID_MAPPING } from "@repo/common/constants/paymentStatus";
import { Button } from "@repo/ui/components/ui/button";
import PaymentToast from "./components/payment-toast";
import PaymentButotn from "../components/payment-button";

const Page = async ({
  params,
  searchParams,
}: {
  params: { orderId: string };
  searchParams: { code: string };
}) => {
  const orderDetail = await getOrderDetail(parseInt(params.orderId));
  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">
            Thông tin đơn hàng #{orderDetail.orderId}
          </h1>
          <OrderStatusChip statusId={orderDetail.currentStatusId} />
          {orderDetail.payment.paymentMethodId === 2 && (
            <PaymentStatusChip statusId={orderDetail.payment.paymentStatusId} />
          )}
        </div>

        <table>
          <tbody>
            <tr>
              <td className="font-bold">Ngày đặt hàng:</td>
              <td>
                {DateTime.fromISO(orderDetail.createdAt).toFormat(
                  "T dd.LL.yyyy",
                )}
              </td>
            </tr>

            <tr>
              <td className="font-bold">Tên người nhận:</td>
              <td>{orderDetail.deliveryAddress.customerName}</td>
            </tr>

            <tr>
              <td className="font-bold">Địa chỉ Email:</td>
              <td>{orderDetail.deliveryAddress.email}</td>
            </tr>

            <tr>
              <td className="font-bold">Số điện thoại:</td>
              <td>{orderDetail.deliveryAddress.phone}</td>
            </tr>

            <tr>
              <td className="font-bold">Phương thức thanh toán:</td>
              <td>
                {PAYMENT_METHOD_ID_MAPPING[orderDetail.payment.paymentMethodId]}
              </td>
            </tr>

            <tr>
              <td className="font-bold">Địa chỉ giao hàng:</td>
              <td>
                {orderDetail.deliveryAddress.detailAddress},{" "}
                {orderDetail.deliveryAddress.wardName},{" "}
                {orderDetail.deliveryAddress.districtName},{" "}
                {orderDetail.deliveryAddress.provinceName}
              </td>
            </tr>
          </tbody>
        </table>

        <div>
          {orderDetail.payment.paymentMethodId === 2 &&
            orderDetail.payment.paymentStatusId !==
              PAYMENT_STATUS_ID_MAPPING.SUCCESS && (
              <PaymentButotn
                orderId={orderDetail.orderId}
                amount={orderDetail.finalPrice}
              />
            )}
        </div>

        <div>
          <div className="grid grid-cols-7 py-6 px-4 bg-black text-white font-bold text-center">
            <div className="col-span-3">Tên sản phẩm</div>
            <div>Số lượng</div>
            <div>Giá</div>
            <div>Biến thể</div>
            <div>Thành tiền</div>
          </div>

          {orderDetail.orderDetails.map((orderPreview, key) => (
            <OrderItem key={key} orderPreview={orderPreview} />
          ))}
        </div>

        <div className="text-sm">
          <div className="flex justify-between items-center py-6 border border-b-0 border-l-0 border-r-0 border-gray-200">
            <p>Tổng tiền:</p>
            <p className="font-bold">
              {formatCurrency(orderDetail.totalPrice)}
            </p>
          </div>

          <div className="flex justify-between items-center py-6 border border-b-0 border-l-0 border-r-0 border-gray-200">
            <p>Số tiền giảm giá:</p>
            <p className="font-bold">
              {formatCurrency(orderDetail.totalDiscount)}
            </p>
          </div>

          <div className="flex justify-between items-center py-6 border border-b-0 border-l-0 border-r-0 border-gray-200">
            <p>Phí vận chuyển:</p>
            <p className="font-bold">
              {formatCurrency(orderDetail.shippingFee)}
            </p>
          </div>

          <div className="flex justify-between items-center p-4 rounded-bl-xl rounded-br-xl bg-black text-white text-lg border border-b-0 border-l-0 border-r-0 border-gray-200">
            <p>Tổng thanh toán:</p>
            <p className="font-bold">
              {formatCurrency(orderDetail.finalPrice)}
            </p>
          </div>
        </div>
      </div>

      <PaymentToast code={searchParams.code} />
    </>
  );
};

export default Page;
