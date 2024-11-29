"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";

const LINKS = [
  {
    id: 1,
    name: "Thông tin tài khoản",
    path: "/tai-khoan/thong-tin",
  },
  {
    id: 2,
    name: "Đơn hàng",
    path: "/tai-khoan/don-hang",
  },
];

const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col gap-4 ">
      {LINKS.map((link) => {
        const isActive = pathname === link.path;
        return (
          <Link
            href={link.path}
            key={link.id}
            className={clsx(
              "p-4 w-full flex justify-between rounded-md cursor-pointer hover:bg-black hover:text-white duration-100",
              {
                "bg-black text-white": isActive,
                "bg-white text-black": !isActive,
              },
            )}
          >
            <span>{link.name}</span>
            <span>{"->"}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default Navigation;
