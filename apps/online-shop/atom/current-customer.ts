import { atom } from "jotai";
import { Customer } from "@repo/common/interfaces/customer";

export const currentCustomerAtom = atom<Customer | null>(null);
