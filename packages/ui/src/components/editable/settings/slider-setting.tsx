import { Slider } from "../../ui/slider";
import BaseSetting, { IBaseSetting } from "./base-setting";

interface ISliderSettingProps extends IBaseSetting<number> {
  onValueChange: (values: number[]) => void;
  range: [number, number];
  step: number;
}

export const SliderSetting = ({
  id,
  value,
  onValueChange,
  range,
  step,
  ...baseSettingProps
}: ISliderSettingProps) => {
  return (
    <BaseSetting
      value={value}
      id={id}
      displayValueOnTop={true}
      onChangeValue={(value) => onValueChange([value])}
      {...baseSettingProps}
    >
      <Slider
        id={id}
        min={range[0]}
        max={range[1]}
        step={step}
        defaultValue={[value]}
        onValueChange={onValueChange}
        className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
      />
    </BaseSetting>
  );
};
