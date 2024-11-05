"use client";
import { Editor } from "@craftjs/core";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { productsAtom } from "@repo/common/atoms/product-atom";
import { Page } from "@repo/common/interfaces/online-shop";
import { Product as IProduct } from "@repo/common/interfaces/product";
import { useHydrateAtoms } from "jotai/utils";
import * as editableComponents from "./editable";
import EditorBody from "./editor-body";

interface IOnlineShopViewProps {
  products: IProduct[];
  pages: Page[];
  onlineShop: {
    defaultHeaderLayout: string;
    defaultFooterLayout: string;
  };
}

const OnlineShopView = ({
  products,
  pages,
  onlineShop,
}: IOnlineShopViewProps) => {
  useHydrateAtoms([[pagesAtom, pages]]);
  useHydrateAtoms([[productsAtom, products]]);
  console.log({ pages });
  return (
    <div>
      <Editor
        enabled={false}
        resolver={{
          ...editableComponents,
        }}
      >
        <div className="h-full w-full flex-1 bg-white">
          <EditorBody
            fluidContent={true}
            isAdminBuilder={false}
            defaultFooterLayout={onlineShop.defaultFooterLayout}
            defaultHeaderLayout={onlineShop.defaultHeaderLayout}
          />
        </div>
      </Editor>
    </div>
  );
};

export default OnlineShopView;
