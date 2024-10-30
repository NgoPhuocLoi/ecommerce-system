"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { links } from "@ui/constants/sidebar-links";
import clsx from "clsx";
// import { Home } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// import {
//   ChartArea,
//   Database,
//   FileChartColumnIncreasing,
//   Home,
//   Images,
//   LayoutPanelTop,
//   Package2,
//   TicketPercent,
//   Users,
// } from "lucide-react";

// export const links = [
//   {
//     id: 1,
//     title: "Dashboard",
//     path: "/dashboard",
//     iconComponent: Home,
//   },
//   {
//     id: 2,
//     title: "Orders",
//     path: "/orders",
//     iconComponent: Package2,
//   },
//   {
//     id: 4,
//     title: "Products",
//     path: "/products",
//     iconComponent: Database,
//   },
//   {
//     id: 5,
//     title: "Customers",
//     path: "/customers",
//     iconComponent: Users,
//   },
//   {
//     id: 10,
//     title: "Uploaded Content",
//     path: "/uploaded-content",
//     iconComponent: Images,
//   },
//   {
//     id: 6,
//     title: "Analytic",
//     path: "/analytic",
//     iconComponent: ChartArea,
//   },
//   {
//     id: 7,
//     title: "Marketing",
//     path: "/marketing",
//     iconComponent: Home,
//   },
//   {
//     id: 8,
//     title: "Discounts",
//     path: "/discounts",
//     iconComponent: Home,
//   },
//   {
//     id: 9,
//     title: "Editor",
//     path: "/shop-builder",
//     iconComponent: Home,
//   },
// ];

export const Sidebar = () => {
  const pathname = usePathname();
  //   return <p>Test</p>;
  return (
    <>
      {links.map((link) => {
        const isActive = pathname.startsWith(link.path);

        return (
          <Tooltip key={link.id}>
            <TooltipTrigger asChild>
              <Link
                href={link.path}
                className={clsx(
                  "flex h-9 w-9 items-center justify-center rounded-lg text-gray-600 transition-colors hover:text-black md:h-8 md:w-8",
                  {
                    "bg-black": isActive,
                  },
                )}
              >
                <link.iconComponent
                  color={isActive ? "white" : "black"}
                  className="h-5 w-5"
                />
                <span className="sr-only">{link.title}</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">{link.title}</TooltipContent>
          </Tooltip>
        );
      })}
    </>
  );
};
