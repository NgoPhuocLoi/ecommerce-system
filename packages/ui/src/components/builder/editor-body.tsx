"use client";

import { Frame, Element, useEditor } from "@craftjs/core";
import { useEffect, useState } from "react";
import { PlaceholderContainer } from "../editable/components/placeholder-container";
import { useAtom } from "jotai";
import { selectedPageAtom } from "@repo/common/atoms/page-atom";
import { useSearchParams } from "next/navigation";
import { getPageLayout } from "@repo/common/actions/online-shop";
import { getPageDetailInTheme } from "@repo/common/actions/themes";
import lz from "lz-string";
import clsx from "clsx";
import DefaultLayoutRenderer from "./default-layout-renderer";
import Toolbox from "./toolbox";
import SettingPanel from "./setting-panel";

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
      <Element is={PlaceholderContainer} id="container" canvas>
        {/* <ShopHeader />
        <Element is={Layout} canvas></Element>
        <ShopFooter /> */}
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
  const [selectedPage] = useAtom(selectedPageAtom);
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPageLayout = async () => {
      setLoading(true);

      if (!selectedPage) {
        setJson("");
        setLoading(false);
        return;
      }

      let res;
      if (isAdminBuilder && selectedPage) {
        res = await getPageDetailInTheme(
          searchParams.get("themeId") ?? "",
          selectedPage.id.toString(),
        );
      } else {
        res = await getPageLayout(selectedPage!.id);
      }
      console.log({ res });
      if (!res?.layout) {
        setJson(lz.decompressFromBase64(""));
        setLoading(false);
        return;
      }

      const decompressedLayout = lz.decompressFromBase64(res.layout);
      setJson(decompressedLayout);

      setLoading(false);
    };

    fetchPageLayout();
  }, [selectedPage]);

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

      {enabled && (
        <>
          <Toolbox />
          <SettingPanel />
        </>
      )}
    </div>
  );
};

export default EditorBody;
