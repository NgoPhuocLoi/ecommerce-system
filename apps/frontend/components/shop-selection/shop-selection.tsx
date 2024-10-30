// import { getShops } from "@/app/services/shop";
import ShopList from "./shop-list";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Button } from "@repo/ui/components/ui/button";
import { Separator } from "@repo/ui/components/ui/separator";

export interface Shop {
  id: string;
  name: string;
}

const ShopSelection = async () => {
  const token = await (await auth()).getToken();
  console.log({ tokennnn: token });
  if (!token) {
    return null;
  }
  //   const shops: Shop[] = (await getShops(token)).metadata || [];
  const shops: any[] = [];
  return (
    <div className="flex h-screen w-screen items-center justify-center py-20">
      <Card className="h-full w-[476px]">
        <div className="flex items-center justify-between">
          <CardHeader>
            <CardTitle>Chào mừng bạn, Loi</CardTitle>
            <CardDescription>
              Chọn cửa hàng bạn muốn quản lý hoặc tạo cửa hàng mới.
            </CardDescription>
          </CardHeader>

          <Button className="mr-6" asChild>
            <Link href="/shop/question">Tạo cửa hàng mới</Link>
          </Button>
        </div>
        <Separator />
        <CardContent>
          {/* <ScrollArea> */}
          <ShopList shops={shops} />

          {/* </ScrollArea> */}
        </CardContent>
      </Card>
    </div>
  );
};

export default ShopSelection;
