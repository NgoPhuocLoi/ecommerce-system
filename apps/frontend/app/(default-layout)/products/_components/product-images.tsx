import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";

import { PreviewUploadedContent } from "app/interfaces/uploaded-content";
import { cookies } from "next/headers";
import ProductImageList from "./product-image-list";

interface IProductImagesProps {
  initialImages?: PreviewUploadedContent[];
}

const ProductImages = async ({ initialImages }: IProductImagesProps) => {
  const selectedShopId = cookies().get("selectedShopId");
  if (!selectedShopId) return null;
  return (
    <div>
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle>Hình ảnh sản phẩm</CardTitle>
          <CardDescription>
            Lipsum dolor sit amet, consectetur adipiscing elit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductImageList
            initialImages={initialImages}
            shopId={selectedShopId.value}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductImages;
