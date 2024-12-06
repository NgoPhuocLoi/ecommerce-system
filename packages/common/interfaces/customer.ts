export interface Customer {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerForShop {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  totalSpent: number;
  orderCount: number;
}

export interface CustomerForAdmin {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  shops: ShopForAdmin[];
}
export interface ShopForAdmin {
  id: string;
  name: string;
  domain: string;
  accountId: string;
  hasUsedPlatformBefore: boolean;
  mainCategoryIdToSell: number;
  hasConfirmedEmail: boolean;
  themeId: number;
  provinceName: string;
  provinceId: number;
  districtName: string;
  districtId: number;
  wardName: string;
  wardCode: string;
  phone: string;
  detailAddress: string;
  createdAt: string;
  updatedAt: string;
}
