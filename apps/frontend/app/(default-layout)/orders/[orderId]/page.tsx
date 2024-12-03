import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import React from "react";
import { ChevronLeft, Divide } from "lucide-react";
import { getOrderForShop } from "@repo/common/actions/shop-managenent";
import { OrderStatusChip } from "@repo/ui/components/ui/order-status-chip";
import { PaymentStatusChip } from "@repo/ui/components/ui/payment-status-chip";
import { DateTime } from "luxon";
import Image from "next/image";
import { formatCurrency } from "@repo/common/utils/currency-format";
import { PAYMENT_METHOD_ID_MAPPING } from "@repo/common/constants/payment";
import UpdateOrderStatusButton from "./components/update-order-status-button";
import { ORDER_STATUS_ID_MAPPING } from "@repo/common/constants/orderStatus";

const Page = async ({ params }: { params: { orderId: string } }) => {
  const orderDetail = await getOrderForShop(Number(params.orderId));
  return (
    <main className="grid  flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div>
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <Link href={"/orders"}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            #{orderDetail.order_id}
          </h1>
          <OrderStatusChip statusId={orderDetail.current_status_id} />
        </div>
        <p className="text-sm text-gray-600 mt-2 ml-10">
          Đặt vào lúc{" "}
          {DateTime.fromISO(orderDetail.created_at).toFormat("T - dd.LL.yyyy")}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="p-4 rounded-lg border bg-white flex flex-col gap-4">
            <h4 className="font-bold text-lg">Chi tiết đơn hàng</h4>

            <div className="rounded-md overflow-hidden border">
              {orderDetail.order_details.map((orderDetail) => (
                <div className="p-3 border border-t-0 border-l-0 border-r-0 flex gap-4">
                  <div className="w-14 h-14 border  rounded-md relative">
                    <Image
                      src={orderDetail.productImageUrl}
                      fill
                      alt="Product image"
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-bold mt-1">
                      {orderDetail.productName}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {orderDetail.variantValues.map((v) => v.name).join("/")}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-10 items-center">
                    <p className="text-sm mt-1">
                      {orderDetail.quantity} x{" "}
                      {formatCurrency(orderDetail.price)}
                    </p>
                    <p className="text-sm mt-1 font-bold">
                      {formatCurrency(orderDetail.price * orderDetail.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {![
              ORDER_STATUS_ID_MAPPING.DELIVERED,
              ORDER_STATUS_ID_MAPPING.CANCELED,
            ].includes(orderDetail.current_status_id) && (
              <UpdateOrderStatusButton order={orderDetail} />
            )}
          </div>

          <div className="p-4 rounded-lg border bg-white flex flex-col gap-4">
            <h4 className="font-bold text-lg flex">
              Thông tin thanh toán{" "}
              {orderDetail.payment.payment_method_id === 2 && (
                <div className="ml-2">
                  <PaymentStatusChip
                    statusId={orderDetail.payment.payment_status_id}
                  />
                </div>
              )}
            </h4>

            <div className="rounded-md overflow-hidden border text-sm">
              <div className="p-3 flex border border-t-0 border-l-0 border-r-0">
                <p className="w-[200px] pr-2">Ngày đặt hàng</p>
                <p className=" text-gray-600">
                  {DateTime.fromISO(orderDetail.created_at).toFormat(
                    "T - dd.LL.yyyy",
                  )}
                </p>
              </div>

              <div className="p-3 flex flex-col gap-2 border border-t-0 border-l-0 border-r-0">
                <div className="flex">
                  <p className="w-[200px] pr-2">Hình thức thanh toán</p>
                  <p className=" text-gray-600">
                    {
                      PAYMENT_METHOD_ID_MAPPING[
                        orderDetail.payment.payment_method_id
                      ]
                    }
                  </p>
                </div>
                <div className="flex">
                  <p className="w-[200px] pr-2">Tổng tiền hàng</p>
                  <p className=" text-gray-600">
                    {orderDetail.order_details.reduce(
                      (acc, cur) => acc + cur.quantity,
                      0,
                    )}{" "}
                    sản phẩm
                  </p>
                  <p className="ml-auto">
                    {formatCurrency(orderDetail.total_price)}
                  </p>
                </div>

                <div className="flex">
                  <p className="w-[200px] pr-2">Phí vận chuyển</p>
                  <p className=" text-gray-600 ">Tiêu chuẩn</p>
                  <p className="ml-auto">
                    {formatCurrency(orderDetail.shipping_fee)}
                  </p>
                </div>

                <div className="flex">
                  <p className="w-[200px] pr-2">Giảm giá</p>
                  <p className="ml-auto">
                    {formatCurrency(orderDetail.total_discount)}
                  </p>
                </div>
              </div>

              <div className="p-3 flex ">
                <p className="w-[200px] pr-2 font-bold">Tổng cộng</p>
                <p className=" font-bold ml-auto">
                  {formatCurrency(orderDetail.final_price)}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="p-4 rounded-lg border bg-white flex flex-col gap-4">
            <h4 className="font-bold text-lg">Khách hàng</h4>

            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-sm">Thông tin tiên hệ</h5>

              <div className="text-sm flex flex-col">
                <p>{orderDetail.customer.name}</p>
                <p>{orderDetail.customer.email}</p>
                <p>{orderDetail.delivery_address.phone}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h5 className="font-bold text-sm">Địa chỉ giao hàng</h5>

              <div className="text-sm flex flex-col">
                <p>{orderDetail.delivery_address.detail_address}</p>
                <p>{orderDetail.delivery_address.ward_name}</p>
                <p>{orderDetail.delivery_address.district_name}</p>
                <p>{orderDetail.delivery_address.province_name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
