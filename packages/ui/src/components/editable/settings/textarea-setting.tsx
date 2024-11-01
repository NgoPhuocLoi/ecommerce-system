import { Textarea } from "../../ui/textarea";
import BaseSetting, { IBaseSetting } from "./base-setting";

interface ITextAreaSetting extends IBaseSetting<string> {
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TextAreaSetting = ({
  onChange,
  value,
  placeholder,
  ...rest
}: ITextAreaSetting) => {
  return (
    <BaseSetting value={value} {...rest}>
      <Textarea
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        placeholder={placeholder}
      />
    </BaseSetting>
  );
};
