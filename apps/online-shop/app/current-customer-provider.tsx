"use client";
import { Customer } from "@repo/common/interfaces/customer";
import { ReactNode } from "react";
import { useHydrateAtoms } from "jotai/utils";
import { currentCustomerAtom } from "../atom/current-customer";

const CurrentCustomerProvider = ({
  children,
  currentCustomer,
}: {
  children: ReactNode;
  currentCustomer: Customer;
}) => {
  useHydrateAtoms([[currentCustomerAtom, currentCustomer]]);
  return <>{children}</>;
};

export default CurrentCustomerProvider;
