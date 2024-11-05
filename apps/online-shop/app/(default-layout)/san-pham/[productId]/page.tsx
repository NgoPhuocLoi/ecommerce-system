import { DEFAULT_IMAGE_URL } from "@repo/common/constants/image";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@repo/ui/components/ui/dropdown-menu";
import Image from "next/image";
import React from "react";
import { Minus, Plus, ShoppingBasket } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import RecommendProducts from "./components/recommend-products";

const Page = () => {
  return (
    <>
      <div className="pt-7 container h-full min-h-[calc(100vh-56px)]">
        <Breadcrumb className="pb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Product 1</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-2 gap-8">
          <div className="w-full h-full flex gap-4">
            <div className="flex flex-col gap-2">
              <div className="border border-black rounded-lg">
                <Image
                  alt="product images"
                  src={
                    "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.11.png"
                  }
                  className="w-12 rounded-lg"
                  sizes="100vw"
                  width={0}
                  height={0}
                />
              </div>

              <div>
                <Image
                  alt="product images"
                  src={
                    "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.11.png"
                  }
                  className="w-12 rounded-lg"
                  sizes="100vw"
                  width={0}
                  height={0}
                />
              </div>

              <div>
                <Image
                  alt="product images"
                  src={
                    "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.11.png"
                  }
                  className="w-12 rounded-lg"
                  sizes="100vw"
                  width={0}
                  height={0}
                />
              </div>
            </div>
            <div>
              <Image
                alt="product images"
                src={
                  "https://media3.coolmate.me/cdn-cgi/image/quality=80,format=auto/uploads/January2024/poloapl220.11.png"
                }
                className="w-full rounded-lg"
                sizes="100vw"
                width={0}
                height={0}
              />
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-4 text-gray-800">
            <h1 className="text-4xl font-bold">Áo Polo Nam Pique Cotton</h1>

            <div className="flex gap-2 items-baseline">
              <p className="text-2xl font-bold">269.000đ</p>
              <p className="line-through text-sm">300.000đ</p>
            </div>

            <div className=" flex flex-col gap-2 mt-4">
              <p className="text-sm">
                Màu sắc: <span className="font-bold">Nâu đậm</span>
              </p>

              <div className="flex gap-2 text-sm">
                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer bg-black text-white">
                  Value 1
                </div>

                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer">
                  Value 2
                </div>
                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer">
                  Value 3
                </div>
                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer">
                  Value 4
                </div>
              </div>
            </div>

            <div className=" flex flex-col gap-2">
              <p className="text-sm">
                Kích thước: <span className="font-bold">Nâu đậm</span>
              </p>

              <div className="flex gap-2 text-sm">
                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer bg-black text-white">
                  Value 1
                </div>

                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer">
                  Value 2
                </div>
                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer">
                  Value 3
                </div>
                <div className="px-4 py-2 rounded-full border w-fit cursor-pointer">
                  Value 4
                </div>
              </div>
            </div>

            <div className="mt-4 flex gap-4">
              <div className="flex">
                <div className="size-10 flex items-center justify-center rounded-tl-full rounded-bl-full border border-black border-x-0 cursor-pointer border-r-0">
                  <Minus size={16} />
                </div>
                <input
                  className="size-10 border border-black border-x-0 text-center"
                  // onChange={(e) => {
                  //   // ignore value except number
                  //   // e.target.value = e.target.value.replace(/[^0-9]/g, "");
                  // }}
                />
                <div className="size-10 flex items-center justify-center rounded-tr-full rounded-br-full border border-black border-x-0  cursor-pointer border-r-0">
                  <Plus size={16} />
                </div>
              </div>

              <Button className="flex gap-2 rounded-full px-8">
                {" "}
                <ShoppingBasket /> Thêm vào giỏ hàng
              </Button>
            </div>

            <div className="flex flex-col gap-1 mt-4">
              <h3 className="font-bold text-2xl">Mô tả sản phẩm</h3>
              <p className="mt-4">
                Quần gió mềm mại, co giãn bốn chiều nhờ sợi spandex, dễ dàng vận
                động khi mặc. Cản gió, cản bụi, giữ ấm tốt nhờ kiểu dệt thoi hai
                hệ sợi vuông góc với nhau. Hình in chữ trên đường can dọc quần
                nổi bật khỏe khoắn, phần gấu quần có chốt điều chỉnh.
              </p>
            </div>
          </div>
        </div>
      </div>

      <RecommendProducts />
    </>
  );
};

export default Page;
