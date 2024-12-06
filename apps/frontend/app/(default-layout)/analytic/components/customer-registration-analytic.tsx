"use client";

import { CustomerForShop } from "@repo/common/interfaces/customer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/ui/chart";
import { DateTime } from "luxon";
import { useMemo } from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
const NUMBER_OF_MONTHS = 6;

const chartConfig = {
  desktop: {
    label: "Khách hàng: ",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export const getEndMonth = (
  objList: {
    created_at: string;
  }[],
) => {
  if (objList.length == 0) {
    return DateTime.now().month;
  }
  let endMonth = DateTime.fromISO(
    objList[objList.length - 1]?.created_at ?? "",
  ).month;

  if (endMonth < DateTime.now().month) {
    endMonth = DateTime.now().month;
  }
  return endMonth;
};

export function CustomerRegistrationAnalytic({
  customers,
}: {
  customers: CustomerForShop[];
}) {
  const data = useMemo(() => {
    const endMonth = getEndMonth(customers);
    const monthToNumberOfOrdersMap = new Map<number, number>();
    customers.forEach((customer) => {
      const month = DateTime.fromISO(customer.created_at).month;
      const numberOfOrders = monthToNumberOfOrdersMap.get(month) ?? 0;
      monthToNumberOfOrdersMap.set(month, numberOfOrders + 1);
    });

    console.log({ monthToNumberOfOrdersMap });

    const result = [];

    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
      const month = (endMonth - i + 12) % 12 || 12;
      console.log({ month });
      const numberOfOrders = monthToNumberOfOrdersMap.get(month) ?? 0;
      result.unshift({
        month,
        desktop: numberOfOrders,
      });
    }
    console.log({ result });
    return result;
  }, [customers]);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Tăng trưởng khách hàng</CardTitle>
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
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  );
}
