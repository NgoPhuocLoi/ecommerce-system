import { auth, currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { AvatarImage } from "@repo/ui/components/ui/avatar";
import { Button } from "@repo/ui/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@repo/ui/components/ui/dropdown-menu";
import Link from "next/link";
import ChangeShopButton from "./change-shop-button";
import SignOutBtn from "./sign-out-btn";

const AccountMenu = async () => {
  const user = await currentUser();
  const { getToken } = await auth();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Xin chào, {user?.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-full w-full">
          <Link href="/profile" className="h-full w-full">
            Hồ sơ
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="h-full w-full">
          <ChangeShopButton />
        </DropdownMenuItem>
        <DropdownMenuItem>Cài đặt</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutBtn />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AccountMenu;
