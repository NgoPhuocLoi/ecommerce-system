import { getCustomerForAdmin } from "@repo/common/actions/admin-mamagement";
import { Button } from "@repo/ui/components/ui/button";
import Link from "next/link";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { DateTime } from "luxon";
import clsx from "clsx";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";

const Page = async ({ params }: { params: { accountId: string } }) => {
  const customer = await getCustomerForAdmin(params.accountId);
  return (
    <main className="px-8 pt-6 ">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <Link href={"/customers"}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {customer.lastName} {customer.firstName}
          </h1>
        </div>
        <p className="text-sm text-gray-600 mt-2 ml-10">
          Tạo tài khoản lúc{" "}
          {DateTime.fromISO(customer.createdAt).toFormat("T - dd.LL.yyyy")}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 flex flex-col gap-4">
          <div className="p-4 rounded-lg border bg-white flex flex-col gap-4">
            <h4 className="font-bold text-lg">Cửa hàng đã tạo</h4>

            <div
              className={clsx("rounded-md overflow-hidden", {
                border: customer.shops.length > 0,
              })}
            >
              {customer.shops.length === 0 ? (
                <div className="text-center italic text-gray-600">
                  Chưa có cửa hàng nào
                </div>
              ) : (
                <Accordion type="multiple" className="w-full">
                  {customer.shops.map((shop) => (
                    <AccordionItem
                      className="px-4"
                      key={shop.id}
                      value={shop.id}
                    >
                      <AccordionTrigger>{shop.name}</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-1">
                          <p>
                            <span className="font-bold">Tên: </span> {shop.name}
                          </p>
                          <p>
                            <span className="font-bold">Link: </span>{" "}
                            <a
                              href={`http://${shop.domain}.my-ecommerce.live`}
                              target="__blank"
                              className="text-blue-500 italic"
                            >
                              {`http://${shop.domain}.my-ecommerce.live`}
                            </a>
                          </p>
                          <p>
                            <span className="font-bold">Email: </span>
                            {customer.email}
                          </p>
                          {/* <p>{delivery_address.phone}</p> */}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}
            </div>
          </div>

          {/* <div className="p-4 rounded-lg border bg-white flex flex-col gap-4">
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
          </div> */}
        </div>
        <div>
          <div className="p-4 rounded-lg border bg-white flex flex-col gap-4">
            <h4 className="font-bold text-lg">Khách hàng</h4>

            <div className="flex flex-col gap-2">
              <div className="text-sm flex flex-col">
                <p>
                  <span className="font-bold">ID: </span> {customer.id}
                </p>
                <p>
                  <span className="font-bold">Tên: </span> {customer.firstName}{" "}
                  {customer.lastName}
                </p>
                <p>
                  <span className="font-bold">Email: </span>
                  {customer.email}
                </p>
                {/* <p>{delivery_address.phone}</p> */}
              </div>
            </div>

            {/* <div className="flex flex-col gap-2">
              <h5 className="font-bold text-sm">Địa chỉ giao hàng</h5>

              <div className="text-sm flex flex-col">
                <p>{orderDetail.delivery_address.detail_address}</p>
                <p>{orderDetail.delivery_address.ward_name}</p>
                <p>{orderDetail.delivery_address.district_name}</p>
                <p>{orderDetail.delivery_address.province_name}</p>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
