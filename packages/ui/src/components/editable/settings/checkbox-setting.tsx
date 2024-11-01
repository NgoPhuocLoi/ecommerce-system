import { Checkbox } from "@ui/components/ui/checkbox";
import { IBaseSetting } from "./base-setting";

interface ICheckboxSettingProps extends IBaseSetting<boolean> {
  onCheckedChange: () => void;
}

const CheckboxSetting = ({
  id,
  title,
  value,
  description,
  onCheckedChange,
}: ICheckboxSettingProps) => {
  return (
    <div className="items-top flex space-x-2">
      <Checkbox checked={value} onCheckedChange={onCheckedChange} id={id} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {title}
        </label>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default CheckboxSetting;
