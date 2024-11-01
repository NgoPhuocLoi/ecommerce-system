import React, { ReactNode, useState } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import { Label } from "../../ui/label";
import { CircleHelp } from "lucide-react";

export interface IBaseSetting<T> {
  id: string;
  title: string;
  value: T;
  description: string;
}

interface IBaseSettingProps extends IBaseSetting<any> {
  children: ReactNode;
  displayValueOnTop?: boolean;
  onChangeValue?: (value: any) => void;
  postfixText?: string;
}

const BaseSetting = ({
  id,
  title,
  description,
  value,
  displayValueOnTop = false,
  children,
  onChangeValue,
  postfixText,
}: IBaseSettingProps) => {
  const [displayedValue, setDisplayedValue] = useState(value);
  return (
    <HoverCard openDelay={200}>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            <Label htmlFor={id}>{title}</Label>
            <HoverCardTrigger asChild>
              <CircleHelp className="mt-auto" size={14} />
            </HoverCardTrigger>
          </div>
          {displayValueOnTop && (
            <div className="flex gap-1">
              <input
                value={displayedValue}
                onBlur={(e) => {
                  if (onChangeValue) {
                    onChangeValue(e.target.value);
                  }
                }}
                onChange={(e) => {
                  setDisplayedValue(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Delete" || e.key === "Backspace") {
                    setDisplayedValue("");
                  }
                }}
                className="text-muted-foreground w-12 rounded-md border px-2 py-0.5 text-right text-sm"
              />
              <span className="text-sm text-gray-600">{postfixText}</span>
            </div>
            //   {value}
            // </span>
          )}
        </div>
        {children}
      </div>
      <HoverCardContent
        align="start"
        className="relative z-10 w-[260px] text-sm"
        side="top"
      >
        {description}
      </HoverCardContent>
    </HoverCard>
  );
};

export default BaseSetting;
