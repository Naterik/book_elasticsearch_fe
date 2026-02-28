import { BookCopiesDonutChart } from "@/features/admin/dashboard/components/BookCopiesDonutChart";
import { LoanTrendsChart } from "@/features/admin/dashboard/components/LoanTrendsChart";
import { RevenueBarChart } from "@/features/admin/dashboard/components/RevenueBarChart";
import { SearchTermsBarChart } from "@/features/admin/dashboard/components/SearchTermsBarChart";
import type {
  IBookCopiesStatusChartData,
  IDashboardSummary,
  ILoanTrend,
  IRevenueChartData,
  ISearchTermsChartData,
} from "@/types/entities/dashboard";
import { DashboardStats } from "@admin/dashboard/components/DashboardStats";
import DashboardService from "@admin/dashboard/services";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<IDashboardSummary | null>(null);
  const [bookCopiesData, setBookCopiesData] = useState<
    IBookCopiesStatusChartData[]
  >([]);
  const [loanTrendsData, setLoanTrendsData] = useState<ILoanTrend[]>([]);
  const [revenueData, setRevenueData] = useState<IRevenueChartData[]>([]);
  const [searchTermsData, setSearchTermsData] = useState<
    ISearchTermsChartData[]
  >([]);

  const [timeframe, setTimeframe] = useState("1m");

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    fetchLoanTrendsData(timeframe);
  }, [timeframe]);

  const fetchAllData = async () => {
    setIsLoading(true);
    try {
      const [
        summaryRes,
        bookCopiesRes,
        revenueRes,
        searchTermsRes,
        loanTrendsRes,
        // pendingReservationsRes,
        // userWithCardRes,
      ] = await Promise.all([
        DashboardService.getSummary(),
        DashboardService.getChartForBookCopiesStatus(),
        DashboardService.getChartForRevenue(),
        DashboardService.getChartForSearchTerms(),
        DashboardService.getChartForLoanTrends(timeframe),
        // DashboardService.getPendingReservations(),
        // DashboardService.getUserWithCard(timeframe),
      ]);
      if (summaryRes.data) {
        setSummary(summaryRes.data);
      }

      if (bookCopiesRes.data) setBookCopiesData(bookCopiesRes.data);
      if (revenueRes.data) setRevenueData(revenueRes.data);
      if (searchTermsRes.data) setSearchTermsData(searchTermsRes.data);
      if (loanTrendsRes.data) setLoanTrendsData(loanTrendsRes.data);
      // if (pendingReservationsRes.data)
      //   setPendingReservations(pendingReservationsRes.data);
      // if (userWithCardRes.data) setUserWithCard(userWithCardRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLoanTrendsData = async (tf: string) => {
    try {
      const res = await DashboardService.getChartForLoanTrends(tf);
      if (res.data) {
        setLoanTrendsData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch loan trends", error);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-muted/50 h-32 animate-pulse rounded-xl"
            />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="bg-muted/50 col-span-4 h-[300px] animate-pulse rounded-xl" />
          <div className="bg-muted/50 col-span-3 h-[300px] animate-pulse rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 md:pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      {summary && <DashboardStats data={summary} />}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <LoanTrendsChart
            data={loanTrendsData}
            timeframe={timeframe}
            onTimeframeChange={setTimeframe}
          />
        </div>
        <div className="col-span-3">
          <BookCopiesDonutChart data={bookCopiesData} />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <RevenueBarChart data={revenueData} />
        </div>
        <div className="col-span-3">
          <SearchTermsBarChart data={searchTermsData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
