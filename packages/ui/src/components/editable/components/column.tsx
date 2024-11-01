import { useEditor } from "@craftjs/core";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { getPaddingLikeValue } from "@repo/common/utils/component-setting";
import clsx from "clsx";
import { ReactNode, useMemo } from "react";
import ColorSetting from "../settings/color-setting";
import TabInputSetting from "../settings/tab-input-setting";
import TabSelectionSetting from "../settings/tab-selection-setting";

interface IColumnProps {
  bgColor?: string;
  padding?: string;
  margin?: string;
  children?: ReactNode;
  contentAlign?: "flex-start" | "center" | "flex-end";
  flexDirection?: "row" | "column";
}

export const ColumnSetting = () => {
  const { props, handlePropChange } = useSetting();
  const { bgColor, padding, margin } = props;
  const paddingValues = useMemo(() => getPaddingLikeValue(padding), [padding]);
  const marginValues = useMemo(() => getPaddingLikeValue(margin), [margin]);
  return (
    <div className="flex flex-col gap-4">
      <TabSelectionSetting
        id="shop-common-layout"
        title="Content align"
        description="Config the content align for layout"
        value={props.contentAlign}
        selections={[
          { title: "Start", value: "flex-start" },
          { title: "Center", value: "center" },
          { title: "End", value: "flex-end" },
        ]}
        onValueChange={(value) => {
          handlePropChange("contentAlign", value);
        }}
      />

      <TabSelectionSetting
        id="shop-common-column-flex-direction"
        title="Directioon"
        description="Config the direction of content inside"
        value={props.flexDirection}
        selections={[
          { title: "Row", value: "row" },
          { title: "Column", value: "column" },
        ]}
        onValueChange={(value) => {
          handlePropChange("flexDirection", value);
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

export const Column = ({
  bgColor,
  padding,
  margin,
  children,
  contentAlign,
  flexDirection,
}: IColumnProps) => {
  const { applyRef } = useApplyRef();
  const { enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));

  return (
    <div
      ref={applyRef}
      style={{
        backgroundColor: bgColor,
        justifyContent: contentAlign,
        padding,
        flexDirection,
      }}
      className={clsx(
        "d flex h-full w-full items-center justify-center text-sm text-gray-600",
        {
          // "hover:outline hover:outline-green-400": enabled,
          "border border-dashed": !children,
        },
      )}
    >
      {children ?? "Drop component here"}
    </div>
  );
};

Column.craft = {
  props: {
    bgColor: "transparent",
    margin: "0px 0px 0px 0px",
    padding: "8px 8px 8px 8px",
    contentAlign: "center",
    flexDirection: "column",
  },
  related: {
    setting: ColumnSetting,
  },
  data: {
    name: "Column",
  },
};
