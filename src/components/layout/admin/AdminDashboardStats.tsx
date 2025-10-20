"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Book,
  BookOpen,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/helper";

interface AdminDashboardStatsProps {
  stats: IDashboardStats;
  isLoading?: boolean;
}

const StatCard = ({
  icon: Icon,
  title,
  description,
  value,
  change,
  format = "number",
  bgGradient,
  textColor,
  iconColor,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  value: number | string;
  change: number;
  format?: "number" | "currency";
  bgGradient: string;
  textColor: string;
  iconColor: string;
}) => {
  const isPositive = change >= 0;
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card
      className={`${bgGradient} border-0 shadow-md hover:shadow-lg transition-shadow`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-lg ${bgGradient} bg-opacity-20`}>
              <Icon className={`h-6 w-6 ${iconColor}`} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                {title}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div>
          <div className={`text-3xl md:text-4xl font-bold ${textColor}`}>
            {format === "currency" ? formatCurrency(Number(value)) : value}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`flex items-center gap-1 ${
              isPositive
                ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                : "bg-red-50 text-red-700 border-red-200 hover:bg-red-100"
            }`}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            <span className="text-xs font-semibold">
              {isPositive ? "+" : ""}
              {change}%
            </span>
          </Badge>
          <span className="text-xs text-muted-foreground">vs. last month</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default function AdminDashboardStats({
  stats,
  isLoading = false,
}: AdminDashboardStatsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <div className="h-10 bg-slate-200 rounded animate-pulse" />
            </CardHeader>
            <CardContent>
              <div className="h-12 bg-slate-200 rounded animate-pulse mb-3" />
              <div className="h-6 bg-slate-200 rounded animate-pulse w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="px-0.5">
        <h2 className="text-2xl font-bold tracking-tight">
          Dashboard Overview
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Key metrics and performance indicators
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Books */}
        <StatCard
          icon={Book}
          title="Total Books"
          description="Library inventory"
          value={stats.totalBooks}
          change={stats.totalBooksChange}
          bgGradient="bg-gradient-to-br from-blue-50 to-blue-100"
          textColor="text-blue-700"
          iconColor="text-blue-600"
        />

        {/* Active Loans */}
        <StatCard
          icon={BookOpen}
          title="Active Loans"
          description="Books in circulation"
          value={stats.activeLoans}
          change={stats.activeLoansChange}
          bgGradient="bg-gradient-to-br from-emerald-50 to-emerald-100"
          textColor="text-emerald-700"
          iconColor="text-emerald-600"
        />

        {/* Total Users */}
        <StatCard
          icon={Users}
          title="Total Users"
          description="Registered members"
          value={stats.totalUsers}
          change={stats.totalUsersChange}
          bgGradient="bg-gradient-to-br from-purple-50 to-purple-100"
          textColor="text-purple-700"
          iconColor="text-purple-600"
        />

        {/* Successful Payments */}
        <StatCard
          icon={DollarSign}
          title="Successful Payments"
          description="Total collected amount"
          value={stats.totalSuccessfulPayments}
          change={stats.totalSuccessfulPaymentsChange}
          format="currency"
          bgGradient="bg-gradient-to-br from-amber-50 to-amber-100"
          textColor="text-amber-700"
          iconColor="text-amber-600"
        />
      </div>
    </div>
  );
}
