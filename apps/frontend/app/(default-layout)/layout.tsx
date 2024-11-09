import {
  Home,
  LineChart,
  Package,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import React from "react";

import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/ui/tooltip";
import Image from "next/image";
import AccountMenu from "./_components/account-menu";
import Link from "next/link";
import { Sidebar } from "@repo/ui/components/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import logoPng from "@repo/common/images/logo.png";
import {
  SidebarProvider,
  SidebarTrigger,
} from "@repo/ui/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";

export default function DefautlLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const selectedShopId = cookies().get("selectedShopId");

  if (!selectedShopId) {
    return redirect("/");
  }

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <div className="bg-muted/40 flex min-h-screen w-full flex-col">
          <div className="flex flex-col sm:gap-4 sm:py-4">
            <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <div className="p-0">
                <SidebarTrigger />
              </div>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="bg-background w-full rounded-lg pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
              <AccountMenu />
            </header>

            {children}
          </div>
        </div>
      </SidebarProvider>
    </>
  );
}
