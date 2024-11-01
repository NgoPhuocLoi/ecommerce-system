import { UploadCloud } from "lucide-react";
import BaseSetting, { IBaseSetting } from "./base-setting";

interface IFileUploadSettingProps extends IBaseSetting<string> {
  onFileChange: (url: string) => void;
}

const FileUploadSetting = ({
  onFileChange,
  ...rest
}: IFileUploadSettingProps) => {
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    const url = URL.createObjectURL(file);
    console.log({ url });
    onFileChange(url);
  };

  return (
    <BaseSetting {...rest}>
      <label
        htmlFor="uploadFile1"
        className="bg-white w-full text-gray-500 font-semibold text-base rounded max-w-md h-32 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
      >
        <UploadCloud size={40} />
        Upload file
        <input
          onChange={handleFileChange}
          type="file"
          id="uploadFile1"
          className="hidden"
        />
      </label>
    </BaseSetting>
  );
};

export default FileUploadSetting;
