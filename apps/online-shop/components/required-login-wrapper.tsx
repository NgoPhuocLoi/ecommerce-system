"use client";
import { useAtom } from "jotai";
import { currentCustomerAtom } from "../atom/current-customer";
import { ReactNode } from "react";
import CustomerAuthDialog from "./customer-auth-dialog";
import { useRouter } from "next/navigation";

const RequireLoginWrapper = ({ children }: { children: ReactNode }) => {
  const [currentCustomer] = useAtom(currentCustomerAtom);
  const router = useRouter();

  if (!currentCustomer) {
    return (
      <>
        <div
          className="fixed z-10 top-[68px] left-0 right-0 bottom-0 w-full h-full"
          style={{
            background: "#343a4199",
            backdropFilter: "blur(15px)",
            WebkitBackdropFilter: "blur(15px)",
            height: "100%",
          }}
        >
          <CustomerAuthDialog
            initialOpen={true}
            onClose={() => {
              router.push("/trang-chu");
            }}
          />
        </div>
        {/* {children} */}
      </>
    );
  }
  return <div>{children}</div>;
};

export default RequireLoginWrapper;
