import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { IBookCopiesStatusChartData } from "@/types/dashboard";
import { TrendingUp } from "lucide-react";

interface BookCopiesDonutChartProps {
  data: IBookCopiesStatusChartData[];
}

const chartConfig = {
  count: {
    label: "Count",
  },
  AVAILABLE: {
    label: "Available",
    color: "hsl(var(--chart-1))",
  },
  BORROWED: {
    label: "Borrowed",
    color: "hsl(var(--chart-2))",
  },
  LOST: {
    label: "Lost",
    color: "hsl(var(--chart-3))",
  },
  DAMAGED: {
    label: "Damaged",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig;

const COLORS_MAP: Record<string, string> = {
  AVAILABLE: "#22c55e", // green-500
  ON_LOAN: "#eab308", // yellow-500
  LOST: "#ef4444", // red-500
  ON_HOLD: "#3b82f6", // blue-500
};

export function BookCopiesDonutChart({ data }: BookCopiesDonutChartProps) {
  const chartData = React.useMemo(() => {
    return data.map((item) => ({
      status: item.status,
      count: item._count.status,
      fill: COLORS_MAP[item.status] || "#94a3b8", // Default to slate-400 if unknown
    }));
  }, [data]);

  const totalCopies = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Book Copies Status</CardTitle>
        <CardDescription>Distribution of book copies by status</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalCopies.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground text-xs"
                        >
                          Total Copies
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Inventory overview <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total book copies distribution
        </div>
      </CardFooter>
    </Card>
  );
}
