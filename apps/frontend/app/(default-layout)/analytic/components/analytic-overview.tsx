"use client";

import { OrderForShop } from "@repo/common/interfaces/order";
import { formatCurrency } from "@repo/common/utils/currency-format";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/ui/chart";
import { DateTime } from "luxon";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { NUMBER_OF_MONTHS } from "../page";

const chartConfig = {
  income: {
    label: "Doanh thu: ",
    color: "#000",
  },
} satisfies ChartConfig;

export function AnalyticOverview({ orders }: { orders: OrderForShop[] }) {
  const data = useMemo(() => {
    const lastMonthNumber =
      orders.length == 0
        ? DateTime.now().month
        : DateTime.fromISO(orders[orders.length - 1]?.created_at ?? "").month;
    const monthToIncomeMap = new Map<number, number>();
    orders.forEach((order) => {
      const month = DateTime.fromISO(order.created_at).month;
      const income = monthToIncomeMap.get(month) ?? 0;
      monthToIncomeMap.set(month, income + order.final_price);
    });

    const result = [];

    for (let i = 0; i < NUMBER_OF_MONTHS; i++) {
      const month = (lastMonthNumber - i + 12) % 12;
      const income = monthToIncomeMap.get(month) ?? 0;
      result.unshift({
        month,
        income,
        label: formatCurrency(income),
      });
    }

    return result;
  }, [orders]);
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={data}
        margin={{
          top: 20,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => "Tháng " + value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="income" fill="var(--color-desktop)" radius={8}>
          <LabelList
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
            dataKey={"label"}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
