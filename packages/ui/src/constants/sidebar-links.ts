import {
  ChartArea,
  Database,
  FileChartColumnIncreasing,
  Home,
  Images,
  LayoutPanelTop,
  Package2,
  TicketPercent,
  Users,
} from "lucide-react";

export const links = [
  {
    id: 1,
    title: "Dashboard",
    path: "/dashboard",
    iconComponent: Home,
  },
  {
    id: 2,
    title: "Orders",
    path: "/orders",
    iconComponent: Package2,
  },
  {
    id: 4,
    title: "Products",
    path: "/products",
    iconComponent: Database,
  },
  {
    id: 5,
    title: "Customers",
    path: "/customers",
    iconComponent: Users,
  },
  {
    id: 10,
    title: "Uploaded Content",
    path: "/uploaded-content",
    iconComponent: Images,
  },
  {
    id: 6,
    title: "Analytic",
    path: "/analytic",
    iconComponent: ChartArea,
  },
  {
    id: 7,
    title: "Marketing",
    path: "/marketing",
    iconComponent: FileChartColumnIncreasing,
  },
  {
    id: 8,
    title: "Discounts",
    path: "/discounts",
    iconComponent: TicketPercent,
  },
  {
    id: 9,
    title: "Editor",
    path: "/shop-builder",
    iconComponent: LayoutPanelTop,
  },
];
