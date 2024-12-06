"use client";

import { OrderForShop } from "@repo/common/interfaces/order";
import { formatCurrency } from "@repo/common/utils/currency-format";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@repo/ui/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { NUMBER_OF_MONTHS } from "../page";

const chartData = [
  { month: "T6", desktop: 3 },
  { month: "T7", desktop: 5 },
  { month: "T8", desktop: 11 },
  { month: "T9", desktop: 4 },
  { month: "T10", desktop: 0 },
  { month: "T11", desktop: 5 },
];

const chartConfig = {
  desktop: {
    label: "Số đơn hàng: ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function OrderAnalytic({ orders }: { orders: OrderForShop[] }) {
  const data = useMemo(() => {
    const endMonth =
      orders.length == 0
        ? DateTime.now().month
        : DateTime.fromISO(orders[orders.length - 1]?.created_at ?? "").month;
    const monthToNumberOfOrdersMap = new Map<number, number>();
    orders.forEach((order) => {
      const month = DateTime.fromISO(order.created_at).month;
      const numberOfOrders = monthToNumberOfOrdersMap.get(month) ?? 0;
      monthToNumberOfOrdersMap.set(month, numberOfOrders + 1);
    });

    const result = [];

    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
      const month = (endMonth - i + 12) % 12;
      console.log({ month });
      const numberOfOrders = monthToNumberOfOrdersMap.get(month) ?? 0;
      result.unshift({
        month,
        desktop: numberOfOrders,
      });
    }
    return result;
  }, [orders]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tăng trưởng đơn hàng</CardTitle>
        {/* <CardDescription>T6 - T11 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => "T" + value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="linear"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Hiển thị tăng trưởng đơn hàng từ tháng 6 đến tháng 11 năm 2024
        </div>
      </CardFooter> */}
    </Card>
  );
}
