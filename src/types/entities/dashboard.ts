export interface IDashboardMetric {
  value: number;
  change: number;
  trend: "up" | "down";
}

export interface IDashboardSummary {
  monthlyRevenue: IDashboardMetric;
  userWithCard: IDashboardMetric;
  overdueLoans: IDashboardMetric;

}

export interface IBookCopiesStatusChartData {
  status: string;
  _count: {
    status: number;
  };
}

export interface ILoanTrendsAndUserGrowthChartData {
  date: string;
  loan: number;
  user: number;
}

export interface ILoanTrend {
  id: number;
  loanDate: string;
  dueDate: string;
  returnDate: string | null;
  renewalCount: number;
  status: string;
  bookcopyId: number;
  userId: number;
}

export interface IRevenueChartData {
  name: string;
  MEMBERSHIP_FEE: number;
  FINE_PAYMENT: number;
}

export interface ISearchTermsChartData {
  name: string;
  value: number;
}



export interface IUserWithCard {
  id: number;
  fullName: string | null;
  username: string;
  email: string;
  avatar: string | null;
  status: string;
  createdAt: string;
}
