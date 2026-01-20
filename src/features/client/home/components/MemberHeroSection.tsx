import SearchBar from "@/components/Search";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ILoan } from "@/types/entities/loan";
import type { IUser } from "@/types/entities/user";

type Props = {
  user: IUser;
  loans: ILoan[];
  onSearch: (query: string) => void;
};

const MemberHeroSection = ({ user, loans, onSearch }: Props) => {
  const navigate = useNavigate();
  const activeLoans = loans.filter((l) => l.status === "ON_LOAN").length;
  const overdueLoans = loans.filter(
    (l) => l.status === "ON_LOAN" && new Date(l.dueDate) < new Date()
  ).length;

  return (
    <section className="bg-slate-50 py-12 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-4 w-full md:w-auto">
            <h1 className="text-3xl font-bold text-slate-900">
              Welcome back,{" "}
              <span className="text-blue-600">
                {user.fullName || user.username}
              </span>
              !
            </h1>
            <p className="text-slate-600 text-lg">
              Continue your reading journey. You have {activeLoans} active loans.
            </p>
            <div className="pt-4 max-w-2xl w-full">
              <SearchBar onSearch={onSearch} />
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <Card
              className="p-6 flex flex-col items-center justify-center min-w-[160px] hover:shadow-lg transition-all cursor-pointer border-blue-100 bg-white group"
              onClick={() => navigate("/user/loan")}
            >
              <div className="p-3 bg-blue-50 rounded-full mb-3 group-hover:bg-blue-100 transition-colors">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-3xl font-bold text-slate-800">
                {activeLoans}
              </span>
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">
                Active Loans
              </span>
            </Card>

            <Card
              className={`p-6 flex flex-col items-center justify-center min-w-[160px] hover:shadow-lg transition-all cursor-pointer group ${
                overdueLoans > 0
                  ? "border-red-100 bg-red-50/30"
                  : "border-slate-100 bg-white"
              }`}
              onClick={() => navigate("/user/loan")}
            >
              <div
                className={`p-3 rounded-full mb-3 transition-colors ${
                  overdueLoans > 0
                    ? "bg-red-100 group-hover:bg-red-200"
                    : "bg-slate-100 group-hover:bg-slate-200"
                }`}
              >
                {overdueLoans > 0 ? (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                ) : (
                  <Clock className="h-6 w-6 text-slate-500" />
                )}
              </div>
              <span
                className={`text-3xl font-bold ${
                  overdueLoans > 0 ? "text-red-700" : "text-slate-800"
                }`}
              >
                {overdueLoans}
              </span>
              <span
                className={`text-xs font-bold uppercase tracking-wider mt-1 ${
                  overdueLoans > 0 ? "text-red-600" : "text-slate-500"
                }`}
              >
                Overdue
              </span>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemberHeroSection;
