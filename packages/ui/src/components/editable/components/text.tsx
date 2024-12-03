"use client";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { useMemo } from "react";
import { InputSetting } from "../settings";
import ColorSetting from "../settings/color-setting";
import InlineInputSetting from "../settings/inline-input-setting";
import TabInputSetting from "../settings/tab-input-setting";
import TabSelectionSetting from "../settings/tab-selection-setting";
import { getPaddingLikeValue } from "@repo/common/utils/component-setting";

interface ITextProps {
  bgColor?: string;
  padding?: string;
  margin?: string;
  content?: string;
  textAlign?: "left" | "center" | "right";
  borderRadius?: string;
  textColor?: string;
  fontWeight?: "300" | "400" | "700";
  fontSize?: number;
}

export const TextSetting = () => {
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
    borderRadius,
  } = props;
  const paddingValues = useMemo(() => getPaddingLikeValue(padding), [padding]);
  const marginValues = useMemo(() => getPaddingLikeValue(margin), [margin]);
  const borderRadiusValues = useMemo(
    () => getPaddingLikeValue(borderRadius),
    [borderRadius],
  );
  return (
    <div className="flex flex-col gap-4">
      <InputSetting
        id="shop-common-text-content"
        title="Nội dung"
        value={content}
        onChange={(value) => {
          handlePropChange("content", value);
        }}
        description="Nội dung của text"
      />
      <TabSelectionSetting
        id="shop-common-text"
        title="Căn chỉnh văn bản"
        description="Căn chỉnh văn bản"
        value={textAlign}
        selections={[
          { title: "Trái", value: "left" },
          { title: "Giữa", value: "center" },
          { title: "Phải", value: "right" },
        ]}
        onValueChange={(value) => {
          console.log({ value });
          handlePropChange("textAlign", value);
        }}
      />

      <TabSelectionSetting
        id="shop-common-text-font-weight"
        title="Độ đậm"
        description="Độ đậm của văn bản"
        value={fontWeight}
        selections={[
          { title: "Nhạt", value: "300" },
          { title: "Vừa", value: "400" },
          { title: "Đậm", value: "700" },
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
        id={"shop-common-text-font-size"}
        title={"Cỡ chữ"}
        description={"Cỡ chữ của văn bản"}
        postfixText="px"
      />

      <TabInputSetting
        values={[
          { title: "Trên", value: "top" },
          { title: "Phải", value: "right" },
          { title: "Dưới", value: "bottom" },
          { title: "Trái", value: "left" },
          { title: "Tất cả", value: "all" },
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
          { title: "Trên", value: "top" },
          { title: "Phải", value: "right" },
          { title: "Dưới", value: "bottom" },
          { title: "Trái", value: "left" },
          { title: "Tất cả", value: "all" },
        ]}
        onValueChange={(value) => {
          let margin = "";

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

      <TabInputSetting
        values={[
          { title: "Trên", value: "top" },
          { title: "Phải", value: "right" },
          { title: "Dưới", value: "bottom" },
          { title: "Trái", value: "left" },
          { title: "Tất cả", value: "all" },
        ]}
        onValueChange={(value) => {
          let borderRadius = "";

          if (value.isAllChanged === "true") {
            borderRadius = `${value.all}px ${value.all}px ${value.all}px ${value.all}px`;
          } else {
            borderRadius = Object.values(value)
              .slice(0, 4)
              .map((v) => (v === "auto" ? "auto" : `${v}px`))
              .join(" ");
          }

          handlePropChange("borderRadius", borderRadius);
        }}
        id={"shop-common-layout-borderRadius"}
        title={"Border radius"}
        value={borderRadiusValues}
        description={"Change the borderRadius of layout"}
      />

      <ColorSetting
        value={bgColor}
        onChange={(value) => handlePropChange("bgColor", value)}
        id={"shop-common-layout-bgColor"}
        title={"Màu nền"}
        description={"Thay đổi màu nền"}
      />

      <ColorSetting
        value={textColor}
        onChange={(value) => handlePropChange("textColor", value)}
        id={"shop-common-layout-textColor"}
        title={"Màu chữ"}
        description={"Thay đổi màu chữ"}
      />
    </div>
  );
};

export const Text = ({
  bgColor = "#aaa",
  padding,
  margin,
  content,
  textAlign,
  textColor,
  fontWeight,
  fontSize,
  borderRadius,
}: ITextProps) => {
  const { applyRef } = useApplyRef();
  return (
    <div
      ref={applyRef}
      className={`w-fit`}
      style={{
        backgroundColor: bgColor,
        padding,
        margin,
        textAlign,
        color: textColor,
        borderRadius,
      }}
    >
      <p
        style={{
          fontWeight: fontWeight,
          fontSize: fontSize + "px",
        }}
      >
        {content}
      </p>
    </div>
  );
};

Text.craft = {
  props: {
    bgColor: "transparent",
    gap: 8,
    cols: 2,
    margin: "0px 0px 0px 0px",
    borderRadius: "0px 0px 0px 0px",
    padding: "8px 8px 8px 8px",
    content: "You can edit this text",
    textAlign: "center",
    textColor: "#000",
    fontWeight: "400",
    fontSize: 16,
  },
  related: {
    setting: TextSetting,
  },
};
