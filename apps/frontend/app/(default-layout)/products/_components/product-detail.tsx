import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Label } from "@repo/ui/components/ui/label";
import ServerTextField from "@repo/ui/components/ui/server-text-field";
import { Textarea } from "@repo/ui/components/ui/textarea";

interface IProductDetailsProps {
  name?: string;
  description?: string;
}

const ProductDetails = ({ name, description }: IProductDetailsProps) => {
  return (
    <div>
      <Card x-chunk="dashboard-07-chunk-0">
        <CardHeader>
          <CardTitle>Thêm sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <ServerTextField
                name={"name"}
                label="Tên sản phẩm"
                id={"add-product-name"}
                type={"text"}
                placeholder="Nhập tên sản phẩm"
                defaultValue={name ?? ""}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Mô tả sản phẩm</Label>
              <Textarea
                id="description"
                name="description"
                className="min-h-32"
                placeholder="Nhập mô tả sản phẩm"
                defaultValue={description ?? ""}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetails;
