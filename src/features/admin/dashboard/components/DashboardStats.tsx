import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helper";
import { cn } from "@/lib/utils";
import type {
  IDashboardSummary,
  IDashboardMetric,
} from "@/types/entities/dashboard";
import {
  AlertCircle,
  BadgeDollarSign,
  BookOpen,

  CreditCard,
  TrendingDown,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

interface DashboardStatsProps {
  data: IDashboardSummary;
}

interface StatConfig {
  label: string;
  data: IDashboardMetric;
  icon: LucideIcon;
  cardBg: string;
  iconBg: string;
  iconColor: string;
  formatter?: (value: number) => string;
  unitIcon?: LucideIcon;
}

export function DashboardStats({ data }: DashboardStatsProps) {
  const stats: StatConfig[] = [
    {
      label: "Total Revenue",
      data: data.monthlyRevenue,
      icon: BadgeDollarSign,
      cardBg: "bg-emerald-200/50 hover:bg-emerald-300/50",
      iconBg: "bg-emerald-500 shadow-emerald-200",
      iconColor: "text-white",
      formatter: formatCurrency,
    },
    {
      label: "Library Card",
      data: data.userWithCard,
      icon: CreditCard,
      cardBg: "bg-blue-200/50 hover:bg-blue-300/50",
      iconBg: "bg-blue-500 shadow-blue-200",
      iconColor: "text-white",
      unitIcon: Users,
    },
    {
      label: "Overdue Loans",
      data: data.overdueLoans,
      icon: AlertCircle,
      cardBg: "bg-red-200/50 hover:bg-red-300/50",
      iconBg: "bg-red-500 shadow-red-200",
      iconColor: "text-white",
      unitIcon: BookOpen,
    },

  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => {
        const data = stat.data || { value: 0, change: 0, trend: "neutral" };
        const isPositive = data.trend === "up";
        const TrendIcon = isPositive ? TrendingUp : TrendingDown;
        const trendColor = isPositive ? "text-emerald-600" : "text-red-600";

        return (
          <Card
            key={index}
            className={cn(
              "border-none shadow-sm transition-all duration-200",
              stat.cardBg
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
                <div className={cn("p-2.5 rounded-xl shadow-md", stat.iconBg)}>
                  <stat.icon className={cn("h-5 w-5", stat.iconColor)} />
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div className="flex items-baseline gap-1.5">
                  <h2 className="text-2xl font-bold tracking-tight text-foreground">
                    {stat.formatter ? stat.formatter(data.value) : data.value}
                  </h2>
                  {stat.unitIcon && (
                    <stat.unitIcon className="h-4 w-4 text-muted-foreground/50 mb-1.5" />
                  )}
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <span
                    className={cn(
                      "flex items-center text-xs font-bold",
                      trendColor
                    )}
                  >
                    <TrendIcon className="h-3.5 w-3.5 mr-1" />
                    {Math.abs(data.change)}%
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    from last month
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
