import Image from "next/image";
import { formatCurrency } from "@repo/common/utils/currency-format";

const OrderItem = () => {
  return (
    <div className="py-4 px-10 flex gap-4 border border-t-0 border-r-0 border-l-0 border-gray-300">
      <Image
        src="https://media3.coolmate.me/cdn-cgi/image/width=160,height=181,quality=80/uploads/November2024/24CMAW.TT015_-_Do_1.jpg"
        alt="product"
        width={100}
        height={120}
      />

      <div className="flex flex-col justify-between gap-2 py-2 ">
        <p className="font-bold">Áo Singlet Chạy Bộ Graphic Dot</p>
        <p>Đỏ/XL</p>
        <p>x1</p>
        <p className="font-bold">{formatCurrency(189000)}</p>
      </div>
    </div>
  );
};

export default OrderItem;
