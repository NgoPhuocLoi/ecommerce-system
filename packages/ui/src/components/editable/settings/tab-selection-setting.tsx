import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs";
import BaseSetting, { IBaseSetting } from "./base-setting";

interface ITabSelectionSettingProps extends IBaseSetting<string> {
  selections: { title: string; value: string }[];
  onValueChange: (value: string) => void;
}

const TabSelectionSetting = ({
  selections,
  onValueChange,
  value,
  ...rest
}: ITabSelectionSettingProps) => {
  return (
    <BaseSetting value={value} {...rest}>
      <Tabs
        defaultValue={value}
        onValueChange={onValueChange}
        className="w-full"
      >
        <TabsList className="w-full">
          {selections.map((selection) => (
            <TabsTrigger
              key={selection.value}
              className="w-full"
              value={selection.value}
            >
              {selection.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </BaseSetting>
  );
};

export default TabSelectionSetting;
