"use client";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { productsAtom } from "@repo/common/atoms/product-atom";
import { Page } from "@repo/common/interfaces/online-shop";
import { Product } from "@repo/common/interfaces/product";
import DefaultLayoutRenderer from "@repo/ui/components/builder/default-layout-renderer";
import { useHydrateAtoms } from "jotai/utils";
import { ReactNode } from "react";

interface ILayoutWrapperProps {
  defaultHeaderLayout: string;
  defaultFooterLayout: string;
  children: ReactNode;
  products: Product[];
  pages: Page[];
}

const LayoutWrapper = ({
  children,
  defaultFooterLayout,
  defaultHeaderLayout,
  products,
  pages,
}: ILayoutWrapperProps) => {
  useHydrateAtoms([[pagesAtom, pages]]);
  useHydrateAtoms([[productsAtom, products]]);
  return (
    <div>
      <DefaultLayoutRenderer defaultLayout={defaultHeaderLayout} />

      {children}

      <DefaultLayoutRenderer defaultLayout={defaultFooterLayout} />
    </div>
  );
};

export default LayoutWrapper;
