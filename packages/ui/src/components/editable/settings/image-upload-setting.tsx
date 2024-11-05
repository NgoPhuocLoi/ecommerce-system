import { UploadCloud } from "lucide-react";
import React from "react";
import BaseSetting, { IBaseSetting } from "./base-setting";
import UploadButton from "../../upload-btn";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { DEFAULT_IMAGE_URL } from "@repo/common/constants/image";

interface IImageUploadSettingProps extends IBaseSetting<string> {
  onFileChange: (url: string) => void;
}

const ImageUploadSetting = ({
  onFileChange,
  value,
  ...rest
}: IImageUploadSettingProps) => {
  const selectedShopId = getCookie("selectedShopId");

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    const url = URL.createObjectURL(file);
    console.log({ url });
    onFileChange(url);
  };

  return (
    <BaseSetting value={value} {...rest}>
      <div className="group relative w-full hover:bg-gray-700">
        <Image
          alt="test"
          src={value !== "" ? value : DEFAULT_IMAGE_URL}
          width="0"
          height="0"
          sizes="100vw"
          className="h-auto w-full"
        />

        <div className="absolute left-0 top-0 hidden h-full w-full bg-gray-800/80 group-hover:block">
          <UploadButton
            mode="single"
            isSquare={false}
            onSelectExisting={(selectedImages) => {
              if (selectedImages[0]) {
                onFileChange(selectedImages[0].url);
              }
            }}
            onSuccess={(result) => {
              onFileChange(result.url);
            }}
            folder={selectedShopId?.replace(/-/g, "_") ?? ""}
          />
        </div>
      </div>
    </BaseSetting>
  );
};

export default ImageUploadSetting;
