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
