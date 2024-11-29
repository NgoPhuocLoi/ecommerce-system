import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@repo/ui/components/ui/breadcrumb";
import { getProductById } from "../../../../actions/product";
import ProductDetail from "./components/product-detail";
import ProductImages from "./components/product-images";
import RecommendProducts from "./components/recommend-products";

const Page = async ({ params }: { params: { productId: string } }) => {
  const product = await getProductById(params.productId);

  if (!product) {
    return null;
  }

  return (
    <>
      <div className="pt-7 container h-full min-h-[calc(100vh-56px)]">
        <Breadcrumb className="pb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/trang-chu">Trang chủ</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{product?.name}</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-2 gap-8">
          <ProductImages images={product?.images ?? []} />
          <ProductDetail product={product} />
        </div>
      </div>

      <RecommendProducts />
    </>
  );
};

export default Page;
