import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { InputSetting } from "../settings";
import ColorSetting from "../settings/color-setting";
import TabInputSetting from "../settings/tab-input-setting";
import { useMemo } from "react";
import { getPaddingLikeValue } from "@repo/common/utils/component-setting";

interface IDividerProps {
  height?: number;
  bgColor?: string;
  margin?: string;
}

export const DividerSetting = () => {
  const { props, handlePropChange } = useSetting();
  const paddingValues = useMemo(
    () => getPaddingLikeValue(props.margin),
    [props.margin],
  );
  return (
    <div className="flex flex-col gap-4">
      <InputSetting
        id="shop-common-devider-height"
        title="Height"
        value={props.height}
        onChange={(value) => {
          handlePropChange("height", value);
        }}
        description={"Change the height of spacer"}
      />

      <ColorSetting
        value={props.bgColor}
        onChange={(value) => handlePropChange("bgColor", value)}
        id={"shop-common-divider-bgColor"}
        title={"Màu"}
        description={"Đổi màu"}
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

          handlePropChange("margin", padding);
        }}
        id={"shop-common-margin-padding"}
        title={"Margin"}
        value={paddingValues}
        description={"Change the padding of divider"}
      />
    </div>
  );
};

export const Divider = ({ height, bgColor, margin }: IDividerProps) => {
  const { applyRef } = useApplyRef();
  return (
    <div
      ref={applyRef}
      className="w-full"
      style={{
        height: `${height}px`,
        backgroundColor: bgColor,
        margin: margin,
      }}
    ></div>
  );
};

Divider.craft = {
  props: {
    height: 2,
    bgColor: "#000",
    margin: "8px 0px 8px 0px",
  },
  related: {
    setting: DividerSetting,
  },
  data: {
    name: "Divider",
  },
};
