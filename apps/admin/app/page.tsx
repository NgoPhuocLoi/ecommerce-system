import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const current = await currentUser();
  if (!current) {
    return redirect("/sign-in");
  }

  return redirect("/themes");
}
