import { getProductById } from "@repo/common/actions/product";
import { Product } from "@repo/common/interfaces/product";
import ProductForm from "../_components/product-form";
import { redirect } from "next/navigation";

interface IProductDetailPage {
  params: {
    productId: string;
  };
}

const Page = async ({ params }: IProductDetailPage) => {
  const product: Product = (await getProductById(params.productId)).metadata;
  if (!product) {
    return redirect("/auth/login");
  }

  return (
    <div>
      <ProductForm title="Edit product" product={product} badgeLabel={"Test"} />
    </div>
  );
};

export default Page;
