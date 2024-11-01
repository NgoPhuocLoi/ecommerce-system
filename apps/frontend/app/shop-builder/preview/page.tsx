import React from "react";
import { getOnlineShop, getPages } from "@repo/common/actions/online-shop";
import { getProducts } from "@repo/common/actions/product";
import PageView from "@repo/ui/components/builder/page-view";

const Page = async () => {
  const [pagesRes, productsRes, onlineShop] = await Promise.all([
    getPages(),
    getProducts(),
    getOnlineShop(),
  ]);

  return (
    <div>
      <PageView
        pages={pagesRes.metadata}
        products={productsRes.metadata}
        defaultHeaderLayout={onlineShop[0].defaultHeaderLayout}
        defaultFooterLayout={onlineShop[0].defaultFooterLayout}
      />
    </div>
  );
};

export default Page;
