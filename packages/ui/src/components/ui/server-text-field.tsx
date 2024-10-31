import React from "react";
import { Label } from "./label";
import { Input } from "./input";
import clsx from "clsx";

interface IServerTextFieldProps {
  name: string;
  label: string;
  error?: string;
  id: string;
  placeholder?: string;
  type: string;
  defaultValue?: string | number;
  disabled?: boolean;
}

const ServerTextField = ({
  name,
  label,
  error,
  id,
  placeholder,
  type,
  defaultValue,
  disabled,
}: IServerTextFieldProps) => {
  return (
    <div>
      <div className="grid gap-3">
        <Label htmlFor={id}>{label}</Label>
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          type={type}
          autoCapitalize="none"
          autoComplete={type}
          autoCorrect="off"
          className={clsx({
            "border-red-500": error,
          })}
          defaultValue={defaultValue}
          disabled={disabled}
        />
      </div>
      <span className="text-xs text-red-500">{error}</span>
    </div>
  );
};

export default ServerTextField;
