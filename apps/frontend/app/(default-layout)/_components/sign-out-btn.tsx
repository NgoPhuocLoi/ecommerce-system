"use client";
import { useClerk } from "@clerk/nextjs";
import { deleteCookie } from "cookies-next";
import React from "react";

const SignOutBtn = () => {
  const { signOut } = useClerk();

  const handleSignOut = () => {
    deleteCookie("selectedShopId");
    signOut({
      redirectUrl: "/",
    });
  };

  return (
    <div onClick={handleSignOut} className="text-red-500 hover:text-red-500">
      Đăng xuất
    </div>
  );
};

export default SignOutBtn;
