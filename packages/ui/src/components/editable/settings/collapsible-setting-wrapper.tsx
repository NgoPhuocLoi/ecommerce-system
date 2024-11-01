import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../ui/collapsible";
import { Separator } from "../../ui/separator";
import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import { ReactNode, useState } from "react";

interface ICollapsibleSettingWrapperProps {
  children: ReactNode;
  label: string;
  openByDefault?: true;
  topRight?: ReactNode;
}

const CollapsibleSettingWrapper = ({
  children,
  label,
  openByDefault,
  topRight,
}: ICollapsibleSettingWrapperProps) => {
  const [open, setOpen] = useState(!!openByDefault);
  return (
    <div className="flex flex-col gap-4">
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex w-full items-center gap-1 text-sm font-bold uppercase text-gray-700">
          <ChevronDown
            size={17}
            className={clsx("duration-100", {
              "-rotate-90": !open,
            })}
          />
          <span>{label}</span>

          {topRight}
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">{children}</CollapsibleContent>
      </Collapsible>

      <Separator className="bg-gray-400" />
    </div>
  );
};

export default CollapsibleSettingWrapper;
