import { Page } from "./online-shop";

export interface Theme {
  id: number;
  name: string;
  description: string;
  recommendedForCategoryId: number;
  defaultPages: Page[];
  defaultHeaderLayout: string;
  defaultFooterLayout: string;
}
