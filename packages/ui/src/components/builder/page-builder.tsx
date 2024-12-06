"use client";

import * as editableComponents from "../editable/components";
import { Editor } from "@craftjs/core";
import { useHydrateAtoms } from "jotai/utils";
import RenderNode from "./render-node";
import LayoutBuilder from "./layout-builder";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { productsAtom } from "@repo/common/atoms/product-atom";
import EditorBody from "./editor-body";
import EditorHeader from "./editor-header";
import { Page } from "@repo/common/interfaces/online-shop";
import { Product } from "@repo/common/interfaces/product";

interface IShopHeaderProps {
  pages: Page[];
  products: Product[];
  returnLink?: string;
  isAdminBuilder?: boolean;
  defaultHeaderLayout?: string;
  defaultFooterLayout?: string;
  shouldDisplayLayoutEditor?: boolean;
  isShopBuilder?: boolean;
  domain?: string;
}

const PageBuilder = ({
  pages,
  products,
  returnLink,
  isAdminBuilder,
  defaultHeaderLayout,
  defaultFooterLayout,
  shouldDisplayLayoutEditor,
  isShopBuilder,
  domain,
}: IShopHeaderProps) => {
  useHydrateAtoms([[pagesAtom, pages]]);
  useHydrateAtoms([[productsAtom, products]]);
  return (
    <div className="flex w-full flex-col">
      {shouldDisplayLayoutEditor ? (
        <>
          <LayoutBuilder
            defaultFooterLayout={defaultFooterLayout}
            defaultHeaderLayout={defaultHeaderLayout}
            isAdminBuilder={isAdminBuilder}
          />
        </>
      ) : (
        <Editor onRender={RenderNode} resolver={{ ...editableComponents }}>
          <EditorHeader
            returnLink={returnLink}
            isAdminBuilder={isAdminBuilder}
            domain={domain}
          />
          <EditorBody
            defaultHeaderLayout={defaultHeaderLayout}
            defaultFooterLayout={defaultFooterLayout}
            isAdminBuilder={isAdminBuilder}
          />
        </Editor>
      )}
    </div>
  );
};

export default PageBuilder;
