import {
  getCustomersForShop,
  getOrdersForShop,
} from "@repo/common/actions/shop-managenent";
import { CustomerForShop } from "@repo/common/interfaces/customer";
import { OrderForShop } from "@repo/common/interfaces/order";
import { formatCurrency } from "@repo/common/utils/currency-format";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Package } from "lucide-react";
import { AnalyticOverview } from "./components/analytic-overview";
import { CustomerRegistrationAnalytic } from "./components/customer-registration-analytic";
import { OrderAnalytic } from "./components/order-analytic";
import { RecentSales } from "./components/recent-sales";
import { DateTime } from "luxon";

export const NUMBER_OF_MONTHS = 6;

const Page = async () => {
  const orders: OrderForShop[] = await getOrdersForShop();
  orders.sort(
    (a, b) =>
      DateTime.fromISO(a.created_at).month -
      DateTime.fromISO(b.created_at).month,
  );
  const customers: CustomerForShop[] = await getCustomersForShop();
  customers.sort(
    (a, b) =>
      DateTime.fromISO(a.created_at).month -
      DateTime.fromISO(b.created_at).month,
  );
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="w-fit flex gap-2 flex-col">
        {/* <Label className="w-fit flex-shrink-0">Thời gian thống kê</Label> */}
        {/* <Select defaultValue="0">
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">1 tuần gần đây</SelectItem>
            <SelectItem value="1">1 tháng gần đây</SelectItem>
            <SelectItem value="2">6 tháng gần đây</SelectItem>
            <SelectItem value="3">1 năm gần đây</SelectItem>
          </SelectContent>
        </Select> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng doanh thu
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(
                orders.reduce((acc, order) => acc + order.final_price, 0),
              )}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Số khách hàng</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng sản phẩm đã bán
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.reduce((acc, order) => acc + order.total_items, 0)}
            </div>
            {/* <p className="text-xs text-muted-foreground">
              +19% from last month
            </p> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng đơn hàng đã nhận{" "}
            </CardTitle>
            <Package size={16} className="text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p> */}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <Card className="col-span-5">
          <CardHeader>
            <CardTitle>Tổng quan doanh thu</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <AnalyticOverview orders={orders} />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Khách hàng mua gần đây</CardTitle>
            {/* <CardDescription>You made 265 sales this month.</CardDescription> */}
          </CardHeader>
          <CardContent>
            <RecentSales customers={customers} />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <OrderAnalytic orders={orders} />
        <CustomerRegistrationAnalytic customers={customers} />
      </div>
    </div>
  );
};

export default Page;
