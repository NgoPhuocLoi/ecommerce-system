import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import ServerTextField from "@repo/ui/components/ui/server-text-field";

interface IProductStockProps {
  initialQuantity?: number;
}

const ProductStock = ({ initialQuantity }: IProductStockProps) => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Số lượng</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-2 w-fit">
            <ServerTextField
              name={"availableQuantity"}
              label={"Số lượng"}
              id={"add-product-availableQuantity"}
              type={"number"}
              defaultValue={initialQuantity ?? 0}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductStock;
