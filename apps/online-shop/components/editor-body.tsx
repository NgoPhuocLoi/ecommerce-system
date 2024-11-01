"use client";

import { Element, Frame, useEditor } from "@craftjs/core";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { Layout } from "@repo/ui/components/editable/components/layout";
import { PlaceholderContainer } from "@repo/ui/components/editable/components/placeholder-container";
import clsx from "clsx";
import { useAtom } from "jotai";
import lz from "lz-string";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getPageLayout } from "../actions/online-shop";
import DefaultLayoutRenderer from "@repo/ui/components/builder/default-layout-renderer";

interface IShopHeaderProps {
  isAdminBuilder?: boolean;
  defaultHeaderLayout?: string;
  defaultFooterLayout?: string;
  fluidContent?: boolean;
}

export const RenderEditor = ({
  isAdminBuilder,
  loading,
  jsonLayout,
}: {
  isAdminBuilder?: boolean;
  loading: boolean;
  jsonLayout: string;
}) => {
  useEffect(() => {
    if (jsonLayout) {
      console.log({ jsonLayout });
      // actions.deserialize(jsonLayout);
    }
  }, [jsonLayout]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAdminBuilder) {
    return jsonLayout ? (
      <>
        <Frame data={jsonLayout}></Frame>
      </>
    ) : (
      <Frame>
        <Element id="div" is={PlaceholderContainer} canvas></Element>
      </Frame>
    );
  }

  return jsonLayout ? (
    <Frame data={jsonLayout}>
      <Element is="div" id="container" canvas></Element>
    </Frame>
  ) : (
    <Frame>
      <Element is="div" id="container" canvas>
        <Element is={Layout} canvas></Element>
      </Element>
    </Frame>
  );
};

export const DEFAULT_LAYOUT = "defaultLayout";

const EditorBody = ({
  isAdminBuilder,
  defaultHeaderLayout,
  defaultFooterLayout,
  fluidContent,
}: IShopHeaderProps) => {
  const [json, setJson] = useState("");
  const [loading, setLoading] = useState(false);
  const [pages] = useAtom(pagesAtom);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const pathname = usePathname();

  useEffect(() => {
    const fetchPageLayout = async () => {
      setLoading(true);
      const foundPage = pages.find((p) => p.link === pathname);
      if (!foundPage) {
        setJson("");
        setLoading(false);
        return;
      }

      let res;
      //   if (isAdminBuilder && selectedPage) {
      //   } else {
      res = await getPageLayout(foundPage!.id);
      //   }
      console.log({ res });
      if (!res.layout) {
        setJson(lz.decompressFromBase64(""));
        setLoading(false);
        return;
      }

      const decompressedLayout = lz.decompressFromBase64(res.layout);
      setJson(decompressedLayout);

      setLoading(false);
    };

    fetchPageLayout();
  }, [pathname]);

  return (
    <div
      className={clsx("page-container h-full flex-1 bg-white", {
        "max-w-[calc(100%-280px)]": enabled,
        "max-w-full": !enabled,
        "m-2 mt-[80px]": !fluidContent,
      })}
    >
      <DefaultLayoutRenderer defaultLayout={defaultHeaderLayout} />
      <RenderEditor
        isAdminBuilder={isAdminBuilder}
        loading={loading}
        jsonLayout={json}
      />
      <DefaultLayoutRenderer defaultLayout={defaultFooterLayout} />
    </div>
  );
};

export default EditorBody;
