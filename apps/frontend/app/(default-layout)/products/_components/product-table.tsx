import React from "react";
import { columns } from "./columns";
import { DataTable } from "@repo/ui/components/ui/data-table/index";
import { Product } from "@repo/common/interfaces/product";
import { getProducts } from "@repo/common/actions/product";

const ProductTable = async () => {
  const products: Product[] = await getProducts();

  return (
    <div>
      <DataTable
        columns={columns}
        data={products.map((product) => ({
          ...product,
          link: `/products/${product.id}`,
        }))}
      />
    </div>
  );
};

export default ProductTable;
