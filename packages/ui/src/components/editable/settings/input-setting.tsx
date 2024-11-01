import React from "react";
import BaseSetting, { IBaseSetting } from "./base-setting";
import { Input } from "../../ui/input";

interface IInputSetting extends IBaseSetting<string> {
  onChange: (value: string) => void;
  placeholder?: string;
}

export const InputSetting = ({
  onChange,
  value,
  placeholder,
  ...rest
}: IInputSetting) => {
  return (
    <BaseSetting value={value} {...rest}>
      <Input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
    </BaseSetting>
  );
};
