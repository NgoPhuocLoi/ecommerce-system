import React, { ReactNode } from "react";
import Navigation from "./components/navigation";
import RequireLoginWrapper from "../../../components/required-login-wrapper";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <RequireLoginWrapper>
      <div className=" bg-gray-300 py-10 min-h-[calc(100vh-68px)]">
        <div className="container grid grid-cols-3 gap-10">
          <Navigation />
          <div className="col-span-2 bg-white w-full p-10 rounded-lg ">
            {children}
          </div>
        </div>
      </div>
    </RequireLoginWrapper>
  );
};

export default Layout;
