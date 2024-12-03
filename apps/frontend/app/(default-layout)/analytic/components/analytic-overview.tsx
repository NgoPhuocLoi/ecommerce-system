"use client";

import { formatCurrency } from "@repo/common/utils/currency-format";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@repo/ui/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { month: "T6", desktop: 1869873, label: formatCurrency(1869873) },
  { month: "T7", desktop: 1861231, label: formatCurrency(1861231) },
  { month: "T8", desktop: 200000, label: formatCurrency(200000) },
  { month: "T9", desktop: 1300000, label: formatCurrency(1300000) },
  { month: "T10", desktop: 650000, label: formatCurrency(650000) },
  { month: "T11", desktop: 1000000, label: formatCurrency(1000000) },
  // { month: "January", desktop: 186, label: formatCurrency(186) },
  // { month: "February", desktop: 305, label: formatCurrency(186) },
  // { month: "March", desktop: 237, label: formatCurrency(186) },
  // { month: "April", desktop: 73, label: formatCurrency(186) },
  // { month: "May", desktop: 209, label: formatCurrency(186) },
  // { month: "June", desktop: 214, label: formatCurrency(186) },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#000",
  },
} satisfies ChartConfig;

export function AnalyticOverview() {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={chartData}
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
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
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
