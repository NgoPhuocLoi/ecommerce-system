import { Input } from "./input";
import { Label } from "./label";
import clsx from "clsx";
import React from "react";

interface ITextFieldProps {
  type: "text" | "email" | "password" | "number";
  value: string | number | undefined;
  onChange: (value: string) => void;
  label: string;
  id: string;
  placeholder?: string;
  error?: string;
  name?: string;
  defaultValue?: string | number;
  disabled?: boolean;
}

const TextField = ({
  type,
  value,
  onChange,
  id,
  label,
  placeholder,
  error,
  name,
  defaultValue,
  disabled,
}: ITextFieldProps) => {
  return (
    <div className="w-full">
      <div className="grid gap-1">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          value={value}
          name={name}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          placeholder={placeholder}
          type={type}
          autoCapitalize="none"
          autoComplete={type}
          autoCorrect="off"
          className={clsx({
            "border-red-500": error,
          })}
          disabled={disabled}
        />
      </div>
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
};

export default TextField;
