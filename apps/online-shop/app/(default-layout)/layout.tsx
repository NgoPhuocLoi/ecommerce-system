import React, { ReactNode } from "react";
import LayoutWrapper from "./layout-wrapper";
import { getProducts } from "../../actions/product";
import { getOnlineShop, getPages } from "../../actions/online-shop";
import { countCartItems } from "../../actions/cart";
import { Toaster } from "@repo/ui/components/ui/sonner";
import { notFound } from "next/navigation";

const Layout = async ({ children }: { children: ReactNode }) => {
  const [products, pages, onlineShop, countCart] = await Promise.all([
    getProducts(),
    getPages(),
    getOnlineShop(),
    countCartItems(),
  ]);
  if (!onlineShop[0]) {
    notFound();
  }
  return (
    <div>
      <LayoutWrapper
        defaultFooterLayout={onlineShop[0].defaultFooterLayout}
        defaultHeaderLayout={onlineShop[0].defaultHeaderLayout}
        products={products}
        pages={pages}
        countCart={countCart}
      >
        {children}
      </LayoutWrapper>
    </div>
  );
};

export default Layout;
