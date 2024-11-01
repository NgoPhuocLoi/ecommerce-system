"use client";
import { InputSetting, SliderSetting } from "../settings";
import ColorSetting from "../settings/color-setting";
import InlineInputSetting from "../settings/inline-input-setting";
import TabInputSetting from "../settings/tab-input-setting";
import TabSelectionSetting from "../settings/tab-selection-setting";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import React, { useMemo } from "react";
import { useEditor } from "@craftjs/core";
import { useAtom } from "jotai";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RouterLink from "next/link";
import { pagesAtom } from "@repo/common/atoms/page-atom";
import { getPaddingLikeValue } from "@repo/common/utils/component-setting";

interface ILinkProps {
  bgColor?: string;
  padding?: string;
  margin?: string;
  content?: string;
  textAlign?: "left" | "center" | "right";
  textColor?: string;
  fontWeight?: "300" | "400" | "700";
  fontSize?: number;
  url?: string;
  children?: React.ReactNode;
  isIcon?: boolean;
}

export const LinkSetting = () => {
  const { props, handlePropChange } = useSetting();
  const {
    bgColor,
    padding,
    margin,
    textAlign,
    content,
    textColor,
    fontWeight,
    fontSize,
    url,
  } = props;
  const paddingValues = useMemo(() => getPaddingLikeValue(padding), [padding]);
  const marginValues = useMemo(() => getPaddingLikeValue(margin), [margin]);
  return (
    <div className="flex flex-col gap-4">
      <InputSetting
        id="shop-common-link-content"
        title="Label"
        value={content}
        onChange={(value) => {
          handlePropChange("content", value);
        }}
        description="Change the label of link"
      />
      <InputSetting
        id="shop-common-link-url"
        title="URL"
        value={url}
        onChange={(value) => {
          handlePropChange("url", value);
        }}
        description="Change the URL of link"
      />
      <TabSelectionSetting
        id="shop-common-link"
        title="Alignment"
        description="Config the alignment of the text"
        value={textAlign}
        selections={[
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ]}
        onValueChange={(value) => {
          console.log({ value });
          handlePropChange("textAlign", value);
        }}
      />

      <TabSelectionSetting
        id="shop-common-link-font-weight"
        title="Font weight"
        description="Config the font weight of the text"
        value={fontWeight}
        selections={[
          { title: "Light", value: "300" },
          { title: "Medium", value: "400" },
          { title: "Bold", value: "700" },
        ]}
        onValueChange={(value) => {
          console.log({ value });
          handlePropChange("fontWeight", value);
        }}
      />

      <InlineInputSetting
        onValueChange={(value) => {
          console.log("RUN HERE");
          handlePropChange("fontSize", value);
        }}
        value={fontSize}
        id={"shop-common-link-font-size"}
        title={"Font size"}
        description={"Change the font size of text"}
        postfixText="px"
      />

      <TabInputSetting
        values={[
          { title: "Top", value: "top" },
          { title: "Right", value: "right" },
          { title: "Bottom", value: "bottom" },
          { title: "Left", value: "left" },
          { title: "All", value: "all" },
        ]}
        onValueChange={(value) => {
          let padding = "";

          if (value.isAllChanged === "true") {
            padding = `${value.all}px ${value.all}px ${value.all}px ${value.all}px`;
          } else {
            padding = Object.values(value)
              .slice(0, 4)
              .map((v) => (v ? `${v}px` : ""))
              .join(" ");
          }

          handlePropChange("padding", padding);
        }}
        id={"shop-common-layout-padding"}
        title={"Padding"}
        value={paddingValues}
        description={"Change the padding of layout"}
      />

      <TabInputSetting
        values={[
          { title: "Top", value: "top" },
          { title: "Right", value: "right" },
          { title: "Bottom", value: "bottom" },
          { title: "Left", value: "left" },
          { title: "All", value: "all" },
        ]}
        onValueChange={(value) => {
          let margin = "";
          console.log({ value });
          if (value.isAllChanged === "true") {
            margin = `${value.all}px ${value.all}px ${value.all}px ${value.all}px`;
          } else {
            margin = Object.values(value)
              .slice(0, 4)
              .map((v) => (v === "auto" ? "auto" : `${v}px`))
              .join(" ");
          }

          handlePropChange("margin", margin);
        }}
        id={"shop-common-layout-margin"}
        title={"Margin"}
        value={marginValues}
        description={"Change the margin of layout"}
      />

      <ColorSetting
        value={bgColor}
        onChange={(value) => handlePropChange("bgColor", value)}
        id={"shop-common-layout-bgColor"}
        title={"Background color"}
        description={"Change the background color of text"}
      />

      <ColorSetting
        value={textColor}
        onChange={(value) => handlePropChange("textColor", value)}
        id={"shop-common-layout-textColor"}
        title={"Text color"}
        description={"Change the text color"}
      />
    </div>
  );
};

export const Link = ({
  bgColor = "#aaa",
  padding,
  margin,
  content,
  textAlign,
  textColor,
  fontWeight,
  fontSize,
  url,
  children,
  isIcon,
}: ILinkProps) => {
  const { enabled } = useEditor((state) => {
    return {
      enabled: state.options.enabled,
    };
  });
  const { applyRef } = useApplyRef();
  const [pages] = useAtom(pagesAtom);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  return (
    <RouterLink
      onClick={(e) => {
        if (enabled) {
          e.preventDefault();
          return;
        }

        if (isIcon) {
          e.preventDefault();
          const pageToNavigate = pages.find((page) => page.link === url);
          console.log(pageToNavigate);
          if (pageToNavigate) {
            const params = new URLSearchParams();
            const themeId = searchParams.get("themeId");
            if (themeId) {
              params.append("themeId", themeId);
            }
            params.append("pageId", pageToNavigate.id.toString());
            const urlToNavigate = `${pathname}?${params.toString()}`;
            router.replace(urlToNavigate);
          }
        }
      }}
      href={url ?? ""}
      ref={applyRef}
      className={`w-fit`}
      style={{
        backgroundColor: bgColor,
        padding,
        margin,
        textAlign,
        color: textColor,
      }}
    >
      {children ? (
        children
      ) : (
        <p
          style={{
            fontWeight: fontWeight,
            fontSize: fontSize + "px",
          }}
        >
          {content}
        </p>
      )}
    </RouterLink>
  );
};

Link.craft = {
  props: {
    bgColor: "transparent",
    gap: 8,
    cols: 2,
    margin: "0px 0px 0px 0px",
    padding: "8px 8px 8px 8px",
    content: "Link",
    textAlign: "center",
    textColor: "blue",
    fontWeight: "400",
    fontSize: 16,
    url: "",
  },
  related: {
    setting: LinkSetting,
  },
};
