"use client";
import { Editor } from "@craftjs/core";
import { useAtom } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import EditorBody from "./editor-body";
import { Page } from "@repo/common/interfaces/online-shop";
import { Product } from "@repo/common/interfaces/product";
import { pagesAtom, selectedPageAtom } from "@repo/common/atoms/page-atom";
import { productsAtom } from "@repo/common/atoms/product-atom";
import * as editableComponents from "../editable/components";

interface IPageViewProps {
  pages: Page[];
  products: Product[];
  isAdminBuilder?: boolean;
  defaultHeaderLayout?: string;
  defaultFooterLayout?: string;
  shouldDisplayLayoutEditor?: boolean;
}

const PageView = ({
  pages,
  products,
  defaultFooterLayout,
  defaultHeaderLayout,
}: IPageViewProps) => {
  useHydrateAtoms([[pagesAtom, pages]]);
  useHydrateAtoms([[productsAtom, products]]);
  // const [json, setJson] = useState("");
  // const [loading, setLoading] = useState(false);
  const [selectedPage, setSelectedPage] = useAtom(selectedPageAtom);
  const searchParams = useSearchParams();

  useEffect(() => {
    //   setLoading(true);
    console.log({ selectedPage });
    if (!selectedPage) {
      setSelectedPage(pages[0] ?? null);
      return;
    }
    const page = pages.find(
      (p) => p.id.toString() === searchParams.get("pageId"),
    );
    console.log({ page });
    if (page) {
      setSelectedPage(page);
    }
    // const compressed = localStorage.getItem("layout");
    // const decompressed = lz.decompressFromBase64(compressed ?? "");
    // setJson(decompressed);
    // console.log({ json });
    //   setLoading(false);
  }, [searchParams.get("pageId")]);
  return (
    <div>
      <Editor enabled={false} resolver={{ ...editableComponents }}>
        <div className="h-full w-full flex-1 bg-white">
          {/* {json && (
            <Frame data={json}>
              <Element is="div" id="container" canvas></Element>
            </Frame>
          )} */}
          <EditorBody
            fluidContent={true}
            isAdminBuilder={false}
            defaultFooterLayout={defaultFooterLayout}
            defaultHeaderLayout={defaultHeaderLayout}
          />
        </div>
      </Editor>
    </div>
  );
};

export default PageView;
