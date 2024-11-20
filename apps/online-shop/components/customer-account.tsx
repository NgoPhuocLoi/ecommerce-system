"use client";
import { Customer } from "@repo/common/interfaces/customer";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@repo/ui/components/ui/avatar";
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
import React from "react";
import { useAtom } from "jotai";
import { currentCustomerAtom } from "../atom/current-customer";
import { deleteCookie } from "cookies-next";
import { customerLogout } from "../actions/customer";

interface ICustomerAccountProps {
  currentCustomer: Customer;
}

const CustomerAccount = ({ currentCustomer }: ICustomerAccountProps) => {
  const [, setCurrentCustomer] = useAtom(currentCustomerAtom);

  const handleLogout = async () => {
    await customerLogout();
    setCurrentCustomer(null);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage src={""} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          Xin chào, {currentCustomer?.lastName} {currentCustomer.firstName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="h-full w-full">
          <Link href="/profile" className="h-full w-full">
            Hồ sơ
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem>Cài đặt</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerAccount;
