"use client";
import {
  getPreviewUploadedImages,
  saveUploadedImagesInfo,
} from "app/actions/uploaded-content";
import { PreviewUploadedContent } from "app/interfaces/uploaded-content";
import { Button } from "@repo/ui/components/ui/button";
import { Checkbox } from "@repo/ui/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import { Skeleton } from "@repo/ui/components/ui/skeleton";
import clsx from "clsx";
import { Upload } from "lucide-react";
import { CldUploadWidget, CloudinaryUploadWidgetInfo } from "next-cloudinary";
import Image from "next/image";
import prettyBytes from "pretty-bytes";
import { useEffect, useRef, useState } from "react";

interface IUploadButtonProps {
  folder: string;
  onSuccess: (result: PreviewUploadedContent) => void;
  onSelectExisting: (selectedImages: PreviewUploadedContent[]) => void;
  selectedImages?: PreviewUploadedContent[];
  isSquare?: boolean;
  mode?: "single" | "multiple";
}

const ImageSkeleton = () => {
  return (
    <div className="p-1">
      <Skeleton className="h-[100px] w-[100px]" />
      <div className="mt-2 flex flex-col gap-1">
        <Skeleton className="h-2 w-[50px]" />
        <Skeleton className="h-2 w-[30px]" />
      </div>
    </div>
  );
};

const UploadButton = ({
  folder,
  onSuccess,
  onSelectExisting,
  selectedImages,
  isSquare = true,
  mode = "multiple",
}: IUploadButtonProps) => {
  const [fetchingExistingImages, setFetchingExistingImages] = useState(false);
  const [existingImages, setExistingImages] = useState<
    PreviewUploadedContent[]
  >([]);
  const selectedExistingImages = useRef<Set<string>>(new Set());
  const [openExistingImagesModal, setOpenExistingImagesModal] = useState(false);

  useEffect(() => {
    selectedExistingImages.current = new Set(
      selectedImages?.map((image) => image.uploaded_public_id),
    );
  }, [selectedImages]);

  const handleLoadUploadedImages = async () => {
    setFetchingExistingImages(true);
    const res = await getPreviewUploadedImages();
    setExistingImages(res.metadata);
    setFetchingExistingImages(false);
  };

  return (
    <CldUploadWidget
      options={{
        sources: ["local", "url"],
        folder,
      }}
      uploadPreset="buhtvapd"
      onSuccess={async (result, { widget }) => {
        const info = result.info as CloudinaryUploadWidgetInfo;

        const res = await saveUploadedImagesInfo({
          uploadedPublicId: info.public_id,
          url: info.url,
          format: info.format,
          size: info.bytes,
        });
        onSuccess(res.metadata);
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          open();
        }
        return (
          <div
            className={clsx(
              "flex w-full flex-col items-center justify-center gap-1 rounded-md border border-dashed",
              {
                "aspect-square": isSquare,
                "h-full": !isSquare,
              },
            )}
          >
            <button
              type="button"
              onClick={handleOnClick}
              className="flex flex-col items-center gap-1 rounded-lg px-4 py-2 hover:bg-gray-100"
            >
              <Upload className="text-muted-foreground h-4 w-4" />
              <span className="text-xs text-gray-400">Tải lên</span>
            </button>
            <div className="text-xs text-black">or</div>
            <Dialog
              open={openExistingImagesModal}
              onOpenChange={setOpenExistingImagesModal}
            >
              <DialogTrigger onClick={handleLoadUploadedImages}>
                <div className="cursor-pointer text-xs text-gray-400 hover:text-gray-500 hover:underline">
                  Chọn ảnh đã đăng
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Chọn ảnh đã đăng</DialogTitle>
                  <DialogDescription>
                    Chọn ảnh đã đăng để sử dụng
                  </DialogDescription>
                </DialogHeader>

                <div className="grid grid-cols-4 gap-4">
                  {existingImages.map((existingImage) => (
                    <div
                      onClick={() => {
                        if (mode === "single") {
                          onSelectExisting([existingImage]);
                          setOpenExistingImagesModal(false);
                        }
                      }}
                      className="rounded-md p-2 hover:bg-gray-100"
                    >
                      <div
                        key={existingImage.uploaded_public_id}
                        className="relative cursor-pointer"
                      >
                        {mode === "multiple" && (
                          <Checkbox
                            defaultChecked={selectedExistingImages.current.has(
                              existingImage.uploaded_public_id,
                            )}
                            name="heelo"
                            className="absolute left-2 top-2"
                            id={existingImage.uploaded_public_id}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                selectedExistingImages.current.add(
                                  existingImage.uploaded_public_id,
                                );
                              } else {
                                selectedExistingImages.current.delete(
                                  existingImage.uploaded_public_id,
                                );
                              }
                            }}
                          />
                        )}
                        <div className="cursor-pointer rounded-md border p-1">
                          <Image
                            alt="Product image"
                            className="aspect-square rounded-md object-contain"
                            height="100"
                            src={existingImage.url}
                            width="100"
                          />
                        </div>
                      </div>

                      <div className="mt-2 flex flex-col gap-1 text-center text-xs">
                        <p className="text-gray-400">
                          {prettyBytes(existingImage.size)}
                        </p>
                        <p className="uppercase">{existingImage.format}</p>
                      </div>
                    </div>
                  ))}

                  {fetchingExistingImages && <ImageSkeleton />}
                </div>

                {mode === "multiple" && (
                  <DialogFooter className="flex gap-1">
                    <DialogClose asChild>
                      <Button size={"sm"} variant={"outline"}>
                        Hủy
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() => {
                          const selectedImages = existingImages.filter(
                            (image) => {
                              return selectedExistingImages.current.has(
                                image.uploaded_public_id,
                              );
                            },
                          );
                          onSelectExisting(selectedImages);
                        }}
                        size={"sm"}
                      >
                        Chọn
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                )}
              </DialogContent>
            </Dialog>
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadButton;
