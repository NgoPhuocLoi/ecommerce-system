import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui/components/ui/accordion";
import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Square, SquareCheckBig } from "lucide-react";

export default function Dashboard() {
  return (
    <main className="container flex flex-col gap-4">
      <p className="font-bold">Các bước nên làm tiếp theo</p>

      <Card className="bg-gray-50 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">
            "Thiết lập cửa hàng của bạn ngay!"
          </CardTitle>
          <CardDescription>
            Bắt đầu bán hàng ngay hôm nay bằng cách tạo cửa hàng của bạn. Chúng
            tôi sẽ hướng dẫn bạn qua từng bước.
          </CardDescription>
          <Badge className="w-fit" variant="outline">
            1/4 đã hoàn thành
          </Badge>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full shadow-md">
            <AccordionItem value="item-1" className="bg-white px-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <SquareCheckBig size={16} />
                  <span>Thêm sản phẩm đầu tiên của bạn</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="pb-2">
                  Viết mô tả, thêm hình ảnh và đặt giá cho sản phẩm bạn muốn
                  bán.
                </p>
                <div className="flex gap-2">
                  <Button size={"sm"}>Thêm sản phẩm</Button>
                  <Button variant={"outline"} size={"sm"}>
                    Nhập sản phẩm từ file
                  </Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white px-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Square size={16} />
                  <span>Cấu hình cửa hàng trực tuyến của bạn</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="pb-2">
                  Chọn một chủ đề và thêm logo, màu sắc và hình ảnh để phản ánh
                  thương hiệu của bạn.
                </p>
                <div className="flex gap-2">
                  <Button size={"sm"}>Tùy chỉnh</Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white px-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Square size={16} />
                  <span>Cài đặt nhà cung cấp thanh toán</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="pb-2">
                  Chọn một nhà cung cấp thanh toán để bắt đầu chấp nhận thanh
                  toán.
                </p>
                <div className="flex gap-2">
                  <Button size={"sm"}>Cấu hình thanh toán</Button>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="bg-white px-2">
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  <Square size={16} />
                  <span>Thực hiện một đơn hàng thử</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6">
                <p className="pb-2">
                  Đảm bảo mọi thứ diễn ra suôn sẻ bằng cách đặt một đơn hàng thử
                  từ cửa hàng của bạn.
                </p>
                <div className="flex gap-2">
                  <Button size={"sm"}>Học cách thực hiện</Button>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </main>
  );
}
