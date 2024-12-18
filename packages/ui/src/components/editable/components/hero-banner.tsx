import { InputSetting } from "../settings";
import ColorSetting from "../settings/color-setting";
import MultiSelectionSetting from "../settings/multi-selection-setting";
import TabSelectionSetting from "../settings/tab-selection-setting";
import { TextAreaSetting } from "../settings/textarea-setting";
import { Button } from "../../ui/button";
import { useApplyRef } from "@repo/common/hooks/useApplyRef";
import { useSetting } from "@repo/common/hooks/useSetting";
import ImageUploadSetting from "../settings/image-upload-setting";
import { DEFAULT_IMAGE_URL } from "@repo/common/constants/image";

interface IHeroBannerProps {
  contentAlign?: "left" | "center" | "right";
  size?: "300" | "500" | "650";
  link?: string;
  bgImageUrl?: string;
  bgType?: "color" | "image";
  bgColor?: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
}

export const HeroBannerSetting = () => {
  const { props, handlePropChange } = useSetting();

  console.log({ url: props.bgImageUrl });
  return (
    <div className="flex flex-col gap-4">
      <InputSetting
        title="Title"
        value={props.title}
        onChange={(value) => handlePropChange("title", value)}
        id={"shop-common-hero-banner-title"}
        description={"Change the title of the hero banner"}
      />
      <TextAreaSetting
        title="Description"
        value={props.description}
        onChange={(value) => handlePropChange("description", value)}
        id={"shop-common-hero-banner-description"}
        description={"Change the description of the hero banner"}
      />
      <InputSetting
        title="Button label"
        value={props.buttonLabel}
        onChange={(value) => handlePropChange("buttonLabel", value)}
        id={"shop-common-hero-banner-button-label"}
        description={"Config the label of button"}
      />

      <MultiSelectionSetting
        id="shop-common-hero-banner-bg-size"
        title="Size"
        description="Config the size for hero banner"
        value={props.size}
        selections={[
          { title: "Small", value: "300" },
          { title: "Medium", value: "500" },
          { title: "Large", value: "650" },
        ]}
        placeholder="Select size"
        onValueChange={(value) => {
          handlePropChange("size", value);
        }}
      />

      <InputSetting
        title="Banner link"
        value={props.link}
        onChange={(value) => handlePropChange("link", value)}
        id={"shop-common-hero-banner-link"}
        description={"Config the link whe you click on the banner"}
        placeholder="https://example.com"
      />

      <TabSelectionSetting
        id="shop-common-hero-banner-content-aligment"
        title="Content alignment"
        description="Config the content alignment for hero banner"
        value={props.contentAlign}
        selections={[
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
          { title: "Right", value: "right" },
        ]}
        onValueChange={(value) => {
          handlePropChange("contentAlign", value);
        }}
      />

      <MultiSelectionSetting
        id="shop-common-hero-banner-bg-type"
        title="Background type"
        description="Config the background type for hero banner"
        value={props.bgType}
        selections={[
          { title: "Color", value: "color" },
          { title: "Image", value: "image" },
        ]}
        placeholder="Select background type"
        onValueChange={(value) => {
          handlePropChange("bgType", value);
        }}
      />

      {props.bgType === "color" ? (
        <ColorSetting
          title="Background color"
          value={props.bgColor}
          onChange={(value) => handlePropChange("bgColor", value)}
          id={"shop-common-hero-banner-bg-color"}
          description={"Change the background color of hero banner"}
        />
      ) : (
        <ImageUploadSetting
          onFileChange={(url) => {
            handlePropChange("bgImageUrl", url);
          }}
          id={"shop-common-hero-banner-image-url"}
          title={"Image"}
          value={props.bgImageUrl ?? DEFAULT_IMAGE_URL}
          description={"Upload or select existing images"}
        />
      )}
    </div>
  );
};

const getFlexAlignment = (contentAlign: string) => {
  switch (contentAlign) {
    case "left":
      return "flex-start";
    case "center":
      return "center";
    case "right":
      return "flex-end";
    default:
      return "flex-start";
  }
};

export const HeroBanner = ({
  contentAlign = "right",
  size,
  link,
  bgType,
  bgColor,
  title,
  description,
  buttonLabel,
  bgImageUrl = DEFAULT_IMAGE_URL,
}: IHeroBannerProps) => {
  const { applyRef } = useApplyRef();
  console.log({ bgImageUrl });
  return (
    <div
      ref={applyRef}
      style={{
        backgroundImage:
          bgType === "image"
            ? `url(${bgImageUrl !== "" ? bgImageUrl : DEFAULT_IMAGE_URL})`
            : undefined,
        height: `${Number(size)}px`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        // backgroundOrigin:
        backgroundColor: bgType === "color" ? bgColor : undefined,
        // justifyContent: getFlexAlignment(contentAlign),
      }}
      className="flex w-full px-10 py-8"
    >
      <div
        style={{
          textAlign: contentAlign,
          justifyContent: "center",
          alignItems: getFlexAlignment(contentAlign),
        }}
        className="flex h-full w-1/2 flex-col justify-center gap-3"
      >
        <h3 className="item-s text-4xl font-bold text-gray-800">{title}</h3>
        <p className="text-lg text-gray-700">{description}</p>
        <Button className="w-fit">{buttonLabel}</Button>
      </div>
    </div>
  );
};

HeroBanner.craft = {
  props: {
    contentAlign: "center",
    size: "300",
    link: "",
    bgImageUrl: DEFAULT_IMAGE_URL,
    bgType: "color",
    bgColor: "#eeeeee",
    title: "Hero Banner Title",
    description:
      "Add a description for this hero banner. This is a great place to highlight a promotion.",
    buttonLabel: "Shop now",
  },
  related: {
    setting: HeroBannerSetting,
  },
  data: {
    name: "HeroBanner",
  },
};
