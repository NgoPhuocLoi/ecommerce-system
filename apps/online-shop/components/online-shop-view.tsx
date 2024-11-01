"use client";
import { Editor } from "@craftjs/core";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { productsAtom } from "@repo/common/atoms/product-atom";
import { Page } from "@repo/common/interfaces/online-shop";
import { Product as IProduct } from "@repo/common/interfaces/product";
import { useHydrateAtoms } from "jotai/utils";
import { PlaceholderContainer } from "@repo/ui/components/editable/components/placeholder-container";
import { Carousel } from "@repo/ui/components/editable/components/carousel";
import { Image } from "@repo/ui/components/editable/components/image";
import { Text } from "@repo/ui/components/editable/components/text";
import { Layout } from "@repo/ui/components/editable/components/layout";
import { Product } from "@repo/ui/components/editable/components/product";
import { Column } from "@repo/ui/components/editable/components/column";
import { Spacer } from "@repo/ui/components/editable/components/spacer";
import { HeroBanner } from "@repo/ui/components/editable/components/hero-banner";
import EditorBody from "./editor-body";
import { Link } from "./editable/link";
import { Navbar } from "./editable/navbar";

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
          PlaceholderContainer,
          Carousel,
          Image,
          Text,
          Layout,
          Link,
          Navbar,
          Product,
          Column,
          Spacer,
          HeroBanner,
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
