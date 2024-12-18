import "@repo/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import JotaiProviders from "./jotai-provider";
import { cookies } from "next/headers";
import { getCurrentCustomerProfile } from "../actions/customer";
import CurrentCustomerProvider from "./current-customer-provider";
import { Toaster } from "@repo/ui/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cửa hàng",
  description: "Generated by create turbo",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentCustomer = await getCurrentCustomerProfile();
  return (
    <html lang="en">
      <body className={inter.className}>
        <JotaiProviders>
          <CurrentCustomerProvider currentCustomer={currentCustomer}>
            {children}
          </CurrentCustomerProvider>
          <Toaster richColors position="bottom-right" />
        </JotaiProviders>
      </body>
    </html>
  );
}
