import { notFound } from "next/navigation";
import { getOnlineShop, getPages } from "../../actions/online-shop";
import { getProducts } from "../../actions/product";
import OnlineShopView from "../../components/online-shop-view";

export default async function Home() {
  const [products, pages, onlineShop] = await Promise.all([
    getProducts(),
    getPages(),
    getOnlineShop(),
  ]);

  if (!onlineShop[0]) {
    notFound();
  }
  return (
    <OnlineShopView
      products={products}
      pages={pages}
      onlineShop={onlineShop[0]}
    />
  );
}
