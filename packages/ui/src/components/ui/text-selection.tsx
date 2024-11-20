import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Label } from "./label";

interface ITextSelectionProps {
  defaultValue?: string;
  onValueChange: (value: string) => void;
  options: Record<string, any>[];
  displayField: string;
  valueField: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
}

const TextSelection = ({
  defaultValue,
  onValueChange,
  options,
  displayField,
  valueField,
  label,
  placeholder,
  disabled,
}: ITextSelectionProps) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && <Label>{label}</Label>}
      <Select
        disabled={disabled}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger className="extractMetadataFromResponseClientSide">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options?.map((option, index) => (
              <SelectItem key={index} value={option[valueField].toString()}>
                {option[displayField]}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TextSelection;
