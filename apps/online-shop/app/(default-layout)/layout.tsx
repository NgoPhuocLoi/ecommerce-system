import React, { ReactNode } from "react";
import LayoutWrapper from "./layout-wrapper";
import { getProducts } from "../../actions/product";
import { getOnlineShop, getPages } from "../../actions/online-shop";

const Layout = async ({ children }: { children: ReactNode }) => {
  const [products, pages, onlineShop] = await Promise.all([
    getProducts(),
    getPages(),
    getOnlineShop(),
  ]);

  return (
    <div>
      <LayoutWrapper
        defaultFooterLayout={onlineShop[0].defaultFooterLayout}
        defaultHeaderLayout={onlineShop[0].defaultHeaderLayout}
        products={products}
        pages={pages}
      >
        {children}
      </LayoutWrapper>
    </div>
  );
};

export default Layout;
