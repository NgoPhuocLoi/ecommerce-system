import React from "react";
import BaseSetting, { IBaseSetting } from "./base-setting";

interface IInlineInputSetting extends IBaseSetting<number> {
  onValueChange: (value: number) => void;
  value: number;
  postfixText?: string;
}

const InlineInputSetting = ({
  postfixText,
  ...baseSettingProps
}: IInlineInputSetting) => {
  return (
    <BaseSetting
      postfixText={postfixText}
      onChangeValue={baseSettingProps.onValueChange}
      displayValueOnTop={true}
      {...baseSettingProps}
    >
      <></>
    </BaseSetting>
  );
};

export default InlineInputSetting;
