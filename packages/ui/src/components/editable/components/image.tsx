import ImageUploadSetting from "../settings/image-upload-setting";
import TabInputSetting from "../settings/tab-input-setting";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import { getPaddingLikeValue } from "@repo/common/utils/component-setting";
import NextImage from "next/image";
import { useMemo } from "react";
import { DEFAULT_IMAGE_URL } from "@repo/common/constants/image";

interface IImageProps {
  padding?: string;
  margin?: string;
  imageUrl?: string;
}

export const ImageSetting = () => {
  const { props, handlePropChange } = useSetting();
  const { padding, margin, imageUrl } = props;
  const paddingValues = useMemo(() => getPaddingLikeValue(padding), [padding]);
  const marginValues = useMemo(() => getPaddingLikeValue(margin), [margin]);

  return (
    <div className="flex flex-col gap-4">
      <ImageUploadSetting
        onFileChange={(url) => {
          handlePropChange("imageUrl", url);
        }}
        id={"shop-common-image-url"}
        title={"Image"}
        value={imageUrl}
        description={"Upload or select existing images"}
      />
      <TabInputSetting
        values={[
          { title: "Top", value: "top" },
          { title: "Right", value: "right" },
          { title: "Bottom", value: "bottom" },
          { title: "Left", value: "left" },
          { title: "All", value: "all" },
        ]}
        onValueChange={(value) => {
          let padding = "";

          if (value.isAllChanged === "true") {
            padding = `${value.all}px ${value.all}px ${value.all}px ${value.all}px`;
          } else {
            padding = Object.values(value)
              .slice(0, 4)
              .map((v) => (v ? `${v}px` : ""))
              .join(" ");
          }

          handlePropChange("padding", padding);
        }}
        id={"shop-common-layout-padding"}
        title={"Padding"}
        value={paddingValues}
        description={"Change the padding of layout"}
      />

      <TabInputSetting
        values={[
          { title: "Top", value: "top" },
          { title: "Right", value: "right" },
          { title: "Bottom", value: "bottom" },
          { title: "Left", value: "left" },
          { title: "All", value: "all" },
        ]}
        onValueChange={(value) => {
          let margin = "";

          if (value.isAllChanged === "true") {
            margin = `${value.all}px ${value.all}px ${value.all}px ${value.all}px`;
          } else {
            margin = Object.values(value)
              .slice(0, 4)
              .map((v) => (v ? `${v}px` : ""))
              .join(" ");
          }

          handlePropChange("margin", margin);
        }}
        id={"shop-common-layout-margin"}
        title={"Margin"}
        value={marginValues}
        description={"Change the margin of layout"}
      />
    </div>
  );
};

export const Image = ({ padding, margin, imageUrl }: IImageProps) => {
  const { applyRef } = useApplyRef();
  return (
    <div
      ref={applyRef}
      style={{
        margin,
        padding,
      }}
      className="relative h-full w-full"
    >
      <NextImage
        alt="test"
        src={imageUrl ?? ""}
        width="0"
        height="0"
        sizes="100vw"
        className="h-auto w-full"
      />
    </div>
  );
};

Image.craft = {
  props: {
    imageUrl: DEFAULT_IMAGE_URL,
    margin: "0px 0px 0px 0px",
    padding: "8px 8px 8px 8px",
  },
  related: {
    setting: ImageSetting,
  },
  data: {
    name: "Image",
  },
};
