import { getTopLevelCategories } from "@repo/common/actions/categories";
import { Category, CategoryResponse } from "@repo/common/interfaces/category";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import CategoryList from "./category-list";

interface IProductCategoryProps {
  initialCategory?: CategoryResponse;
}

const ProductCategory = async ({ initialCategory }: IProductCategoryProps) => {
  const topLevelCategories: Category[] = await getTopLevelCategories();
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Danh mục sản phẩm</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <CategoryList
              topLevelCategories={topLevelCategories}
              initialCategory={initialCategory}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCategory;
