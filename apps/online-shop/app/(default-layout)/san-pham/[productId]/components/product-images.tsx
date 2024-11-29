"use client";

import { Product } from "@repo/common/interfaces/product";
import { PreviewUploadedContent } from "@repo/common/interfaces/uploaded-content";
import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface IProductImagesProps {
  images: PreviewUploadedContent[];
}

const ProductImages = ({ images }: IProductImagesProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="w-full h-full flex gap-4">
      <div className="flex flex-col gap-2">
        {images.map((image, index) => (
          <div
            key={image.id}
            onClick={() => {
              setSelectedImageIndex(index);
            }}
            className={clsx("border rounded-lg cursor-pointer", {
              "border-black": selectedImageIndex === index,
            })}
          >
            <Image
              alt="product images"
              src={image.url}
              className="w-12 rounded-lg"
              sizes="100vw"
              width={0}
              height={0}
            />
          </div>
        ))}
      </div>
      <div className="w-full">
        <Image
          alt="product images"
          src={images[selectedImageIndex]?.url ?? ""}
          className="w-full rounded-lg"
          sizes="100vw"
          width={0}
          height={0}
        />
      </div>
    </div>
  );
};

export default ProductImages;
