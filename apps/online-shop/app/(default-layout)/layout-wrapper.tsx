"use client";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { productsAtom } from "@repo/common/atoms/product-atom";
import { Page } from "@repo/common/interfaces/online-shop";
import { Product } from "@repo/common/interfaces/product";
import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";
import DefaultLayoutRenderer from "../../components/default-layout-renderer";
import { cartCountAtom } from "../../atom/cart";

interface ILayoutWrapperProps {
  defaultHeaderLayout: string;
  defaultFooterLayout: string;
  children: ReactNode;
  products: Product[];
  pages: Page[];
  countCart: number;
}

const LayoutWrapper = ({
  children,
  defaultFooterLayout,
  defaultHeaderLayout,
  products,
  pages,
  countCart,
}: ILayoutWrapperProps) => {
  useHydrateAtoms([[pagesAtom, pages]]);
  useHydrateAtoms([[productsAtom, products]]);
  useHydrateAtoms([[cartCountAtom, countCart]]);
  return (
    <div>
      <DefaultLayoutRenderer defaultLayout={defaultHeaderLayout} />

      {children}

      <DefaultLayoutRenderer defaultLayout={defaultFooterLayout} />
    </div>
  );
};

export default LayoutWrapper;
