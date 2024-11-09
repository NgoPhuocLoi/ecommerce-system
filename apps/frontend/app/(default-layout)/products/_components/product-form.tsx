import { Badge } from "@repo/ui/components/ui/badge";
import { Button } from "@repo/ui/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ProductCategory from "./product-category";
import ProductDetails from "./product-detail";
import ProductImages from "./product-images";
import ProductPricing from "./product-pricing";
import ProductStatus from "./product-status";
import ProductStock from "./product-stock";
import { VariantOption } from "./product-variant-list";
import ProductVariants from "./product-variants";
import { createProduct } from "@repo/common/actions/product";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Product } from "@repo/common/interfaces/product";
import Link from "next/link";

interface IProductFormProps {
  title: string;
  badgeLabel?: string;
  product?: Product;
}

const ProductForm = ({ badgeLabel, title, product }: IProductFormProps) => {
  const handleCreateNewProduct = async (formData: FormData) => {
    "use server";
    console.log(formData);
    const attributes = JSON.parse(formData.get("attributes") as string) ?? [];
    const attributesToSubmit = attributes.map((attr: VariantOption) => {
      const filterPredicate = (
        v: { name: string; selected?: boolean },
        isRecommend?: boolean,
      ) => {
        return isRecommend ? v.selected : v.name !== "";
      };
      return {
        ...attr,
        values: attr.values.filter((v) => filterPredicate(v, attr.isRecommend)),
      };
    });

    const imageIds = JSON.parse(formData.get("productImages") as string) ?? [];
    const variants = JSON.parse(formData.get("variants") as string) ?? [];

    const dataToSubmit = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: Number(formData.get("price")),
      compareAtPrice: Number(formData.get("compareAtPrice")),
      cost: Number(formData.get("cost")),
      isActive: formData.get("isActive") === "true",
      categoryId: Number(formData.get("categoryId")),
      availableQuantity: Number(formData.get("availableQuantity")),
      uploadedImageIds: imageIds,
      attributes: attributesToSubmit,
      variants,
    };

    console.log(dataToSubmit);
    console.log(attributesToSubmit[0].values);
    console.log(variants[0].attributesInfo);

    // console.log({ images });
    const res = await createProduct(dataToSubmit);
    console.log(res);
    revalidatePath("/products");
    redirect("/products/");
  };

  const handleEditProduct = async (formData: FormData) => {
    "use server";
    console.log("EDIT PRODUCT");
    console.log({ formData });
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="mx-auto grid flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Button asChild variant="outline" size="icon" className="h-7 w-7">
            <Link href={"/products"}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Link>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product?.name ?? title}
          </h1>
          {badgeLabel && (
            <Badge variant="outline" className="ml-auto sm:ml-0">
              {badgeLabel}
            </Badge>
          )}
        </div>
        <form action={product ? handleEditProduct : handleCreateNewProduct}>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <ProductDetails
                name={product?.name}
                description={product?.description}
              />
              <ProductCategory initialCategory={product?.category} />
              <ProductPricing
                initialPricing={{
                  price: product?.price ?? 0,
                  compareAtPrice: product?.compare_at_price ?? 0,
                  cost: product?.cost ?? 0,
                }}
              />
              <ProductVariants initialAttributes={product?.attributes} />
            </div>
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <ProductStatus initialStatus={product?.is_active} />
              <ProductStock initialQuantity={product?.available_quantity} />
              <ProductImages initialImages={product?.images} />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Save</Button>
          </div>
        </form>
        <div className="flex items-center justify-center gap-2 md:hidden">
          <Button variant="outline" size="sm">
            Discard
          </Button>
          <Button size="sm">Save Product</Button>
        </div>
      </div>
    </main>
  );
};

export default ProductForm;
