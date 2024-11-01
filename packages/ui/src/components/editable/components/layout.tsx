"use client";
import ColorSetting from "../settings/color-setting";
import TabInputSetting from "../settings/tab-input-setting";
import TabSelectionSetting from "../settings/tab-selection-setting";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { getPaddingLikeValue } from "@repo/common/utils/component-setting";
import { Element } from "@craftjs/core";
import React, { useMemo } from "react";
import { Column } from "./column";

interface ILayoutProps {
  children?: React.ReactNode;
  bgColor?: string;
  flexDirection?: "row" | "column";
  padding?: string;
  margin?: string;
  gap?: number;
  cols?: number;
}

export const LayoutSetting = () => {
  const { props, handlePropChange } = useSetting();
  const { bgColor, gap, cols, padding, margin } = props;
  const paddingValues = useMemo(() => getPaddingLikeValue(padding), [padding]);
  const marginValues = useMemo(() => getPaddingLikeValue(margin), [margin]);

  return (
    <div className="flex flex-col gap-4">
      <TabSelectionSetting
        id="shop-common-layout"
        title="Columns"
        description="Config the number of columns for layout"
        value={cols.toString()}
        selections={[
          { title: "1", value: "1" },
          { title: "2", value: "2" },
          { title: "3", value: "3" },
          { title: "4", value: "4" },
          { title: "5", value: "5" },
          { title: "6", value: "6" },
        ]}
        onValueChange={(value) => {
          console.log({ value });
          handlePropChange("cols", value);
        }}
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

          if (value.isAllChanged === "true") {
            margin = `${value.all}px ${value.all}px ${value.all}px ${value.all}px`;
          } else {
            margin = Object.values(value)
              .slice(0, 4)
              .map((v) => (v ? `${v}px` : ""))
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
        description={"Change the background color of layout"}
      />
    </div>
  );
};

export const Layout = ({
  children,
  bgColor = "#aaa",
  flexDirection = "row",
  padding,
  margin,
  gap = 8,
  cols = 2,
}: ILayoutProps) => {
  const { applyRef } = useApplyRef();
  return (
    <div
      ref={applyRef}
      className={`col-sp grid h-full min-h-20 w-full grid-cols-2 rounded-md`}
      style={{
        backgroundColor: bgColor,
        gap: `${gap}px`,
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        padding,
        margin,
      }}
    >
      {Array.from({ length: cols }).map((_, i) => (
        <Element key={i} id={i.toString()} is={Column} canvas />
      ))}
      {/* <Element id={"1"} is={Column} canvas />
      <Element id={"2"} is={Column} canvas />
      <Element id={"3"} is={Column} canvas />
      <Element id={"4"} is={Column} canvas /> */}
    </div>
  );
};

Layout.craft = {
  props: {
    bgColor: "#ffffff",
    gap: 8,
    cols: 2,
    margin: "0px 0px 0px 0px",
    padding: "8px 8px 8px 8px",
  },
  related: {
    setting: LayoutSetting,
  },
  data: {
    name: "Layout",
  },
  rules: {
    canDrop: (target: any) => {
      return target.data.name !== "Column";
    },
  },
};
