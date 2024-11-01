import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Input } from "@repo/ui/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Link } from "lucide-react";

const Page = () => {
  return (
    <div className="flex h-[calc(100vh-68px)] w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email của bạn để đăng nhập vào tài khoản
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mật khẩu</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Đăng nhập
            </Button>
            <Button variant="outline" className="w-full">
              Đăng nhập với Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link href="#" className="underline">
              Đăng ký ngay
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
