import { Bar, BarChart, XAxis, YAxis } from "recharts";

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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { ISearchTermsChartData } from "@/types/entities/dashboard";

interface SearchTermsBarChartProps {
  data: ISearchTermsChartData[];
}

const chartConfig = {
  value: {
    label: "Searches",
    color: "#2563eb", // blue-600
  },
} satisfies ChartConfig;

export function SearchTermsBarChart({ data }: SearchTermsBarChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Search Terms</CardTitle>
        <CardDescription>Most frequently searched keywords</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 20,
            }}
            barSize={32}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              width={100}
            />
            <XAxis dataKey="value" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-value)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
