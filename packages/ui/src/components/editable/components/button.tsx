"use client";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { Button as ShadcnButton } from "../../ui/button";
import { InputSetting } from "../settings";
import TabSelectionSetting from "../settings/tab-selection-setting";

interface IButtonProps {
  content?: string;
  size?: "sm" | "default" | "lg";
}

export const ButtonSetting = () => {
  const { props, handlePropChange } = useSetting();
  const { size, content } = props;

  return (
    <div className="flex flex-col gap-4">
      <InputSetting
        id="shop-common-button-content"
        title="Nội dung"
        value={content}
        onChange={(value) => {
          handlePropChange("content", value);
        }}
        description="Nội dung của text"
      />
      <TabSelectionSetting
        id="shop-common-text"
        title="Kích thước"
        description="Kích thước của button"
        value={size}
        selections={[
          { title: "Nhỏ", value: "sm" },
          { title: "Vừa", value: "default" },
          { title: "Lớn", value: "lg" },
        ]}
        onValueChange={(value) => {
          console.log({ value });
          handlePropChange("size", value);
        }}
      />
    </div>
  );
};

export const Button = ({ content, size }: IButtonProps) => {
  const { applyRef } = useApplyRef();
  return (
    <div ref={applyRef} className={`w-fit`}>
      <ShadcnButton size={size}>{content}</ShadcnButton>
    </div>
  );
};

Button.craft = {
  props: {
    size: "default",
    content: "Button",
  },
  related: {
    setting: ButtonSetting,
  },
};
