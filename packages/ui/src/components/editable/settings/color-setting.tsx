import BaseSetting, { IBaseSetting } from "./base-setting";

interface IColorSettingProps extends IBaseSetting<string> {
  onChange: (color: string) => void;
}

const ColorSetting = ({ value, onChange, ...rest }: IColorSettingProps) => {
  return (
    <BaseSetting value={value} {...rest}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
        />
        <p className="text-sm">{value}</p>
      </div>
    </BaseSetting>
  );
};

export default ColorSetting;
