export interface Attribute {
  id: number | string;
  name: string;
  isOpen?: boolean;
  isRecommend?: boolean;
  recommend_attribute_id?: number;
  values: {
    id: number | string;
    name: string;
    selected?: boolean;
    recommend_value_id?: number;
  }[];
}

export interface Category {
  id: number;
  name: string;
  parentId: number | null;
  hasChild: boolean;
  recommendAttributes: Attribute[];
}

export interface CategoryResponse {
  id: number;
  name: string;
  parent_id: number;
  created_at: string;
  updated_at: string;
}
