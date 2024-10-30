import { currentUser } from "@clerk/nextjs/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ShopSelection from "../components/shop-selection/shop-selection";

export default async function Home() {
  const current = await currentUser();
  const selectedShopId = cookies().get("selectedShopId");
  if (!current) {
    if (selectedShopId) {
      cookies().delete("selectedShopId");
    }
    return redirect("/sign-in");
  }

  if (selectedShopId) {
    return redirect(`/dashboard`);
  }

  return (
    <>
      <ShopSelection />
    </>
  );
}
