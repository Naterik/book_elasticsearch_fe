import { useEffect, useState } from "react";
import {
  getSummary,
  getChartForBookCopiesStatus,
  getChartForLoanTrends,
  getChartForRevenue,
  getChartForSearchTerms,
  getPendingReservations,
  getUserWithCard,
} from "@/features/admin/dashboard/services";
import type {
  IDashboardSummary,
  IBookCopiesStatusChartData,
  ILoanTrend,
  IRevenueChartData,
  ISearchTermsChartData,
  IPendingReservation,
  IUserWithCard,
} from "@/types/dashboard";
import { DashboardStats } from "@/features/admin/dashboard/components/DashboardStats";
import { BookCopiesDonutChart } from "@/features/admin/dashboard/components/BookCopiesDonutChart";
import { LoanTrendsChart } from "@/features/admin/dashboard/components/LoanTrendsChart";
import { RevenueBarChart } from "@/features/admin/dashboard/components/RevenueBarChart";
import { SearchTermsBarChart } from "@/features/admin/dashboard/components/SearchTermsBarChart";
import { PendingReservationsTable } from "@/features/admin/dashboard/components/PendingReservationsTable";
import { UserWithCardTable } from "@/features/admin/dashboard/components/UserWithCardTable";
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
  const [pendingReservations, setPendingReservations] = useState<
    IPendingReservation[]
  >([]);
  const [userWithCard, setUserWithCard] = useState<IUserWithCard[]>([]);

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
        pendingReservationsRes,
        userWithCardRes,
      ] = await Promise.all([
        getSummary(),
        getChartForBookCopiesStatus(),
        getChartForRevenue(),
        getChartForSearchTerms(),
        getChartForLoanTrends(timeframe),
        getPendingReservations(),
        getUserWithCard(timeframe),
      ]);
      if (summaryRes.data) {
        setSummary(summaryRes.data);
      }

      if (bookCopiesRes.data) setBookCopiesData(bookCopiesRes.data);
      if (revenueRes.data) setRevenueData(revenueRes.data);
      if (searchTermsRes.data) setSearchTermsData(searchTermsRes.data);
      if (loanTrendsRes.data) setLoanTrendsData(loanTrendsRes.data);
      if (pendingReservationsRes.data)
        setPendingReservations(pendingReservationsRes.data);
      if (userWithCardRes.data) setUserWithCard(userWithCardRes.data);
    } catch (error) {
      console.error("Failed to fetch dashboard data", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchLoanTrendsData = async (tf: string) => {
    try {
      const res = await getChartForLoanTrends(tf);
      if (res.data) {
        setLoanTrendsData(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch loan trends", error);
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="h-32 rounded-xl bg-muted/50 animate-pulse"
            />
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4 h-[300px] rounded-xl bg-muted/50 animate-pulse" />
          <div className="col-span-3 h-[300px] rounded-xl bg-muted/50 animate-pulse" />
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <PendingReservationsTable data={pendingReservations} />
        </div>
        <div className="col-span-3">
          <UserWithCardTable data={userWithCard} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
