import { Attribute } from "app/interfaces/category";
import { VariantResponse } from "app/interfaces/product";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import ProductVariantList from "./product-variant-list";

interface IProductVariantsProps {
  initialVariants?: VariantResponse[];
  initialAttributes?: Attribute[];
}

const ProductVariants = ({
  initialVariants,
  initialAttributes,
}: IProductVariantsProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Biến thể sản phẩm</CardTitle>
          <CardDescription>
            Bạn có thể thêm tối đa được 3 thuộc tính cho sản phẩm. Ví dụ: màu
            sắc, kích thước, v.v.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProductVariantList initialAttributes={initialAttributes} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductVariants;
