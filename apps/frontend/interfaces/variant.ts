export interface VariantOption {
  id: string;
  name: string;
  isOpen: boolean;
  isRecommend?: boolean;
  values: {
    id: string;
    name: string;
    selected?: boolean;
  }[];
}
