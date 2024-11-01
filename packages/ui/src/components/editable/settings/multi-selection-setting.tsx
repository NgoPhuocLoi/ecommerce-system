import React from "react";
import BaseSetting, { IBaseSetting } from "./base-setting";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";

interface IMultiSelectionSettingProps extends IBaseSetting<string> {
  selections: { title: string; value: string }[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const MultiSelectionSetting = ({
  value,
  selections,
  onValueChange,
  placeholder,
  ...rest
}: IMultiSelectionSettingProps) => {
  return (
    <BaseSetting value={value} {...rest}>
      <Select onValueChange={onValueChange} defaultValue={value}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {selections.map((selection) => (
              <SelectItem value={selection.value}>{selection.title}</SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </BaseSetting>
  );
};

export default MultiSelectionSetting;
