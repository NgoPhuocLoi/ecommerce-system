"use client";
import { PreviewUploadedContent } from "app/interfaces/uploaded-content";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadButton from "./upload-btn";

interface IProductImageListProps {
  shopId: string;
  initialImages?: PreviewUploadedContent[];
}

const ProductImageList = ({
  shopId,
  initialImages,
}: IProductImageListProps) => {
  const [uploadedImages, setUploadedImages] = useState<
    PreviewUploadedContent[]
  >([]);

  useEffect(() => {
    if (initialImages) {
      setUploadedImages(initialImages);
    }
  }, [initialImages]);

  return (
    <>
      <div className="grid grid-cols-3 gap-2">
        {uploadedImages.map((previewContent) => (
          <button key={previewContent.uploaded_public_id}>
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-contain"
              height="84"
              src={previewContent.url}
              width="84"
            />
          </button>
        ))}
        <UploadButton
          selectedImages={uploadedImages}
          onSelectExisting={(selectedImages) => {
            setUploadedImages(selectedImages);
          }}
          onSuccess={(result) => {
            setUploadedImages((prev) => [...prev, result]);
          }}
          folder={shopId.replace(/-/g, "_") ?? ""}
        />
      </div>

      <input
        type="text"
        name="productImages"
        className="hidden"
        value={JSON.stringify(uploadedImages.map((image) => Number(image.id)))}
        onChange={() => {}}
      />
    </>
  );
};

export default ProductImageList;
