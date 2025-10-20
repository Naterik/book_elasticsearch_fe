"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Sample data for demonstration
const loanTrendData = [
  { month: "Jan", loans: 240, returns: 220 },
  { month: "Feb", loans: 290, returns: 280 },
  { month: "Mar", loans: 350, returns: 310 },
  { month: "Apr", loans: 420, returns: 390 },
  { month: "May", loans: 480, returns: 450 },
  { month: "Jun", loans: 520, returns: 490 },
];

const genreDistributionData = [
  { name: "Fiction", value: 1240, fill: "#3b82f6" },
  { name: "Science", value: 890, fill: "#10b981" },
  { name: "History", value: 650, fill: "#f59e0b" },
  { name: "Biography", value: 580, fill: "#8b5cf6" },
  { name: "Other", value: 480, fill: "#6366f1" },
];

const monthlyActivityData = [
  { date: "Mon", users: 42, fines: 12, reservations: 8 },
  { date: "Tue", users: 58, fines: 15, reservations: 12 },
  { date: "Wed", users: 65, fines: 18, reservations: 10 },
  { date: "Thu", users: 72, fines: 22, reservations: 15 },
  { date: "Fri", users: 89, fines: 28, reservations: 20 },
  { date: "Sat", users: 95, fines: 32, reservations: 25 },
  { date: "Sun", users: 48, fines: 10, reservations: 8 },
];

const chartConfig = {
  loans: {
    label: "Loans",
    color: "#3b82f6",
  },
  returns: {
    label: "Returns",
    color: "#10b981",
  },
  users: {
    label: "New Users",
    color: "#3b82f6",
  },
  fines: {
    label: "Fines Issued",
    color: "#ef4444",
  },
  reservations: {
    label: "Reservations",
    color: "#8b5cf6",
  },
} satisfies ChartConfig;

export default function AdminDashboardCharts() {
  return (
    <div className="space-y-6">
      {/* Charts Section Title */}
      <div className="px-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Analytics & Reports
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Detailed insights into library operations
        </p>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Loan Trend Chart */}
        <Card className="col-span-1 lg:col-span-1">
          <CardHeader>
            <CardTitle>Loan Activity Trend</CardTitle>
            <CardDescription>
              Last 6 months of loan and return activity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <LineChart data={loanTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Line
                  type="monotone"
                  dataKey="loans"
                  stroke="var(--color-loans)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-loans)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="returns"
                  stroke="var(--color-returns)"
                  strokeWidth={2}
                  dot={{ fill: "var(--color-returns)", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Genre Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Books by Genre</CardTitle>
            <CardDescription>
              Distribution of library collection
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <PieChart>
                <Pie
                  data={genreDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {genreDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Weekly Activity */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Activity Summary</CardTitle>
            <CardDescription>
              User registrations, fines, and reservations this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80 w-full">
              <BarChart data={monthlyActivityData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="users"
                  fill="var(--color-users)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="fines"
                  fill="var(--color-fines)"
                  radius={[8, 8, 0, 0]}
                />
                <Bar
                  dataKey="reservations"
                  fill="var(--color-reservations)"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
