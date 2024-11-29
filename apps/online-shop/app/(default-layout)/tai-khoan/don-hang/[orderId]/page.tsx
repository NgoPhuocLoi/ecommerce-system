import { Badge } from "@repo/ui/components/ui/badge";
import React from "react";
import Image from "next/image";
import { formatCurrency } from "@repo/common/utils/currency-format";
import OrderItem from "./components/order-item";

const Page = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold">Thông tin đơn hàng #57890018628</h1>
        <Badge variant={"outline"}>Đã giao</Badge>
      </div>

      <table>
        <tbody>
          <tr>
            <td className="font-bold">Ngày đặt hàng:</td>
            <td>06:07 22.11.2024</td>
          </tr>

          <tr>
            <td className="font-bold">Tên người nhận:</td>
            <td>Lợi Ngô Phước</td>
          </tr>

          <tr>
            <td className="font-bold">Địa chỉ Email:</td>
            <td>phuocloi11223@gmail.com</td>
          </tr>

          <tr>
            <td className="font-bold">Số điện thoại:</td>
            <td>0796863758</td>
          </tr>

          <tr>
            <td className="font-bold">Phương thức thanh toán:</td>
            <td>COD</td>
          </tr>

          <tr>
            <td className="font-bold">Địa chỉ giao hàng:</td>
            <td>ABC, Phường 03, Quận 11, Hồ Chí Minh</td>
          </tr>
        </tbody>
      </table>

      <div>
        <div className="grid grid-cols-7 py-6 px-4 bg-black text-white font-bold text-center">
          <div className="col-span-3">Tên sản phẩm</div>
          <div>Số lượng</div>
          <div>Giá</div>
          <div>Biến thể</div>
          <div>Thành tiền</div>
        </div>

        <OrderItem />
        <OrderItem />
        <OrderItem />
      </div>

      <div className="text-sm">
        <div className="flex justify-between items-center py-6 border border-b-0 border-l-0 border-r-0 border-gray-200">
          <p>Tổng tiền:</p>
          <p className="font-bold">{formatCurrency(189000)}</p>
        </div>

        <div className="flex justify-between items-center py-6 border border-b-0 border-l-0 border-r-0 border-gray-200">
          <p>Số tiền giảm giá:</p>
          <p className="font-bold">{formatCurrency(189000)}</p>
        </div>

        <div className="flex justify-between items-center py-6 border border-b-0 border-l-0 border-r-0 border-gray-200">
          <p>Tổng khuyến mãi:</p>
          <p className="font-bold">{formatCurrency(189000)}</p>
        </div>

        <div className="flex justify-between items-center py-6 border border-b-0 border-l-0 border-r-0 border-gray-200">
          <p>Phí:</p>
          <p className="font-bold">{formatCurrency(189000)}</p>
        </div>

        <div className="flex justify-between items-center p-4 rounded-bl-xl rounded-br-xl bg-black text-white text-lg border border-b-0 border-l-0 border-r-0 border-gray-200">
          <p>Tổng thanh toán:</p>
          <p className="font-bold">{formatCurrency(189000)}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
