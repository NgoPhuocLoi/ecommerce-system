import { Category } from "@repo/common/interfaces/category";
import { atom } from "jotai";

export const selectedCategoryAtom = atom<Category>();
