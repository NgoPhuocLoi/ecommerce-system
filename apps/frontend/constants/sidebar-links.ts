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
    title: "Trang chủ",
    path: "/dashboard",
    iconComponent: Home,
  },
  {
    id: 2,
    title: "Đơn hàng",
    path: "/orders",
    iconComponent: Package2,
  },
  {
    id: 4,
    title: "Sản phẩm",
    path: "/products",
    iconComponent: Database,
  },
  {
    id: 5,
    title: "Khách hàng",
    path: "/customers",
    iconComponent: Users,
  },
  {
    id: 10,
    title: "Nội dung đã tải lên",
    path: "/uploaded-content",
    iconComponent: Images,
  },
  {
    id: 6,
    title: "Báo cáo",
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
    title: "Khuyến mãi",
    path: "/discounts",
    iconComponent: TicketPercent,
  },
  {
    id: 9,
    title: "Online shop",
    path: "/shop-builder",
    iconComponent: LayoutPanelTop,
  },
];
