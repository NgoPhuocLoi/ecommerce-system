"use client";
import clsx from "clsx";
import { Home, LineChart, Palette, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ADMIN_LINKS = [
  {
    id: 1,
    title: "Trang chủ",
    icon: Home,
    link: "/dashboard",
  },
  {
    id: 2,
    title: "Chủ đề",
    icon: Palette,
    link: "/themes",
  },

  {
    id: 3,
    title: "Khách hàng",
    icon: Users,
    link: "/customers",
  },
  {
    id: 4,
    title: "Thống kê",
    icon: LineChart,
    link: "/analytics",
  },
];

const AdminSidebar = () => {
  const pathname = usePathname();
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
        {ADMIN_LINKS.map((link) => {
          const isActive =
            pathname === link.link ||
            (link.link !== "/admin" && pathname.startsWith(link.link));

          return (
            <Link
              key={link.id}
              href={link.link}
              className={clsx(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                {
                  "bg-black text-white": isActive,
                },
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
