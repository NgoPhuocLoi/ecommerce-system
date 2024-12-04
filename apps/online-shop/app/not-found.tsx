import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center flex-col font-bold pt-6">
      <h2 className="text-4xl text-center mb-4">Không tìm thấy cửa hàng</h2>
      <p className="text-lg text-gray-500">
        Cửa hàng bạn tìm có thể không tồn tại trong hệ thống!
      </p>
      <Image
        src="https://www.elegantthemes.com/images/404-large.png"
        alt="404"
        width={600}
        height={600}
        className="mt-6"
      />
    </div>
  );
}
