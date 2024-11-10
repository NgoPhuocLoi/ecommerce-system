import React from "react";
import { redirect } from "next/navigation";
import { getOnlineShop, getPages } from "@repo/common/actions/online-shop";
import { getProducts } from "@repo/common/actions/product";
import PageBuilder from "@repo/ui/components/builder/page-builder";

const Page = async ({ searchParams }: { searchParams: { pageId: string } }) => {
  const [pagesRes, productsRes, onlineShop] = await Promise.all([
    getPages(),
    getProducts(),
    getOnlineShop(),
  ]);
  // if (pagesRes.statusCode !== 200 || productsRes.statusCode !== 200) {
  //   return redirect("/sign-in");
  // }
  console.log({ productsRes });
  if (!searchParams.pageId) {
    return redirect(`/shop-builder?pageId=${pagesRes[0]?.id}`);
  }

  return (
    <div>
      <PageBuilder
        pages={pagesRes}
        products={productsRes}
        defaultHeaderLayout={onlineShop[0].defaultHeaderLayout}
        defaultFooterLayout={onlineShop[0].defaultFooterLayout}
        shouldDisplayLayoutEditor={searchParams.pageId === "defaultLayout"}
      />
    </div>
  );
};

export default Page;
