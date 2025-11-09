import { useEffect, useState } from "react";
import AdminDashboardStats from "@/components/layout/admin/AdminDashboardStats";
import AdminDashboardCharts from "@/components/layout/admin/AdminDashboardCharts";
import { TableSkeletonLoader } from "@/components/layout/admin/table-skeleton-loader";
import {
  getDashboardStatsAPI,
  getAllBooksAPI,
  getAllLoanAPI,
  getAllUsersAPI,
  getSuccessfulPaymentsAPI,
} from "@/services/admin";

const Dashboard = () => {
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Try to fetch from dedicated dashboard API first
      try {
        const dashboardRes = await getDashboardStatsAPI();
        if (dashboardRes.data) {
          setStats(dashboardRes.data as IDashboardStats);
          return;
        }
      } catch (err) {
        console.log(
          "Dashboard stats API not available, fetching from individual endpoints"
        );
      }

      // Fallback: Fetch from individual endpoints
      const [booksRes, loansRes, usersRes, paymentsRes] = await Promise.all([
        getAllBooksAPI(),
        getAllLoanAPI(),
        getAllUsersAPI(),
        getSuccessfulPaymentsAPI(),
      ]);

      // Calculate stats from API responses
      const totalBooks = (booksRes.data as IBook[] | undefined)?.length || 0;
      const activeLoans =
        (loansRes.data as ILoan[] | undefined)?.filter(
          (loan) => loan.status === "ACTIVE"
        )?.length || 0;
      const totalUsers =
        (usersRes.data as IAdminUser[] | undefined)?.length || 0;
      const totalSuccessfulPayments =
        (paymentsRes.data as { totalAmount: number; count: number } | undefined)
          ?.totalAmount || 0;

      // Calculate percentage changes (simplified - using 0% as previous values)
      const calculatedStats: IDashboardStats = {
        totalBooks,
        totalBooksChange: 0,
        activeLoans,
        activeLoansChange: 0,
        totalSuccessfulPayments,
        totalSuccessfulPaymentsChange: 0,
        totalUsers,
        totalUsersChange: 0,
      };

      setStats(calculatedStats);
    } catch (err) {
      console.error("Failed to fetch dashboard stats:", err);
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
      // Set mock data on error
      setStats({
        totalBooks: 0,
        totalBooksChange: 0,
        activeLoans: 0,
        activeLoansChange: 0,
        totalSuccessfulPayments: 0,
        totalSuccessfulPaymentsChange: 0,
        totalUsers: 0,
        totalUsersChange: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (error && !stats) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-red-600">
            Error Loading Dashboard
          </h2>
          <p className="text-muted-foreground">{error}</p>
          <button
            onClick={fetchDashboardStats}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {isLoading ? (
        <>
          <TableSkeletonLoader type="stats" cards={4} />
          <TableSkeletonLoader type="charts" />
        </>
      ) : stats ? (
        <>
          <AdminDashboardStats stats={stats} isLoading={isLoading} />
          <AdminDashboardCharts />
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
