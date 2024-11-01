import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { InputSetting } from "../settings";

interface ISpaceProps {
  height?: number;
}

export const SpacerSetting = () => {
  const { props, handlePropChange } = useSetting();

  return (
    <div className="flex flex-col gap-4">
      <InputSetting
        id="shop-common-spacer-height"
        title="Height"
        value={props.height}
        onChange={(value) => {
          handlePropChange("height", value);
        }}
        description={"Change the height of spacer"}
      />
    </div>
  );
};

export const Spacer = ({ height }: ISpaceProps) => {
  const { applyRef } = useApplyRef();
  return (
    <div
      ref={applyRef}
      className="w-full"
      style={{
        height: `${height}px`,
      }}
    ></div>
  );
};

Spacer.craft = {
  props: {
    height: 32,
  },
  related: {
    setting: SpacerSetting,
  },
  data: {
    name: "Spacer",
  },
};
