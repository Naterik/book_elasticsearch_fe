import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { IRevenueChartData } from "@/types/dashboard";

interface RevenueBarChartProps {
  data: IRevenueChartData[];
}

const chartConfig = {
  MEMBERSHIP_FEE: {
    label: "Membership Fee",
    color: "#2563eb", // blue-600
  },
  FINE_PAYMENT: {
    label: "Fine Payment",
    color: "#60a5fa", // blue-400
  },
} satisfies ChartConfig;

export function RevenueBarChart({ data }: RevenueBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Overview</CardTitle>
        <CardDescription>
          Monthly revenue from memberships and fines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 7)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="MEMBERSHIP_FEE"
              fill="var(--color-MEMBERSHIP_FEE)"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="FINE_PAYMENT"
              fill="var(--color-FINE_PAYMENT)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
