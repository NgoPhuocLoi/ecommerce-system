import { formatCurrency } from "@repo/common/utils/currency-format";
import Image from "next/image";

const OrderItem = () => {
  return (
    <div className="grid grid-cols-7 py-4 px-4 text-center bg-gray-200 text-sm border border-t-0 border-r-0 border-l-0 border-gray-300">
      <div className="col-span-3 flex items-center gap-2">
        <Image
          src="https://media3.coolmate.me/cdn-cgi/image/width=255,height=380,quality=80,format=auto/uploads/November2024/24CMCW.TN002_-_Be_2.JPG"
          alt="abcd"
          width={68}
          height={90}
          className="rounded-md border border-gray-500"
        />

        <p className="text-sm">Quần Jogger Pants Fleece</p>
      </div>
      <div className="flex flex-col justify-center">1</div>
      <div className="flex flex-col justify-center">
        {formatCurrency(189000)}
      </div>
      <div className="flex flex-col justify-center">Đỏ/XL</div>
      <div className="flex flex-col justify-center">
        {formatCurrency(189000)}
      </div>
    </div>
  );
};

export default OrderItem;
