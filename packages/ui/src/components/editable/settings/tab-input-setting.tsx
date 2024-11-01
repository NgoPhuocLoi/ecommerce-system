import { Toggle } from "../../ui/toggle";
import BaseSetting, { IBaseSetting } from "./base-setting";

interface ITabInputSettingProps
  extends IBaseSetting<{
    [key: string]: string;
  }> {
  values: { title: string; value: string }[];
  onValueChange: (value: { [key: string]: string }) => void;
}

const TabInputSetting = ({
  values,
  onValueChange,
  value,
  ...rest
}: ITabInputSettingProps) => {
  console.log({ values, value });
  return (
    <BaseSetting value={value} {...rest}>
      <div
        className="grid rounded-md"
        style={{
          gridTemplateColumns: `repeat(${values.length}, minmax(0, 1fr))`,
        }}
      >
        {values.map((v, index) => (
          <div key={index} className="flex flex-col justify-end gap-1">
            {v.title !== "All" && (
              <Toggle
                pressed={value[v.value] === "auto"}
                onPressedChange={(pressed) => {
                  onValueChange({
                    ...value,
                    [v.value]: pressed ? "auto" : "0",
                    isAllChanged: "false",
                    all: "0",
                  });
                }}
                className="mx-1 h-fit py-1"
              >
                <span className="text-xs leading-none">Auto</span>
              </Toggle>
            )}
            <input
              value={Number(value[v.value])}
              disabled={value[v.value] === "auto"}
              className="h-8 border text-center"
              type="number"
              onChange={(e) => {
                onValueChange({
                  ...value,
                  [v.value]: e.target.value,
                  isAllChanged: v.title === "All" ? "true" : "false",
                });
              }}
              onKeyDown={(e) => {
                if (e.key === "Delete" || e.key === "Backspace") {
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <span className="text-center text-xs text-gray-400">{v.title}</span>
          </div>
        ))}
      </div>
    </BaseSetting>
  );
};

export default TabInputSetting;
