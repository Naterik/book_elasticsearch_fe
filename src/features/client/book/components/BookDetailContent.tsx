import { useCurrentApp } from "@/app/providers/app.context";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { calculateDueDate } from "@/helper";
import { LoanService } from "@/lib/api";
import { AlertCircle, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

type Props = {
  borrowDuration: string;
  setBorrowDuration: (v: string) => void;
  dataDetailBook: IBook | null;
  user?: IUser | null;
  isAuthenticated?: boolean | null;
};

const BookDetailContent = ({
  borrowDuration,
  setBorrowDuration,
  dataDetailBook,
  user,
  isAuthenticated,
}: Props) => {
  const checkUser = !isAuthenticated;
  const checkCard = user?.cardNumber === null;
  const checkStatusBook = dataDetailBook?.quantity === 0 || checkUser;
  const navigate = useNavigate();
  const { setIsLoading, isLoading } = useCurrentApp();
  const fetchBookLoans = async () => {
    if (!dataDetailBook || !user) return;
    setIsLoading(true);
    try {
      const res = await LoanService.createLoan(
        user.id,
        dataDetailBook.id,
        borrowDuration
      );
      if (res.data) {
        toast.success("Book borrowed successfully!");
        navigate("/user/loan");
      } else {
        toast.error(res.message || "Failed to borrow book");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("An error occurred while borrowing the book");
      setIsLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/book">Books</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{dataDetailBook?.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card className="overflow-hidden border shadow-md">
            <div className="bg-muted aspect-[4/5] w-full">
              <img
                src={dataDetailBook?.image}
                alt={dataDetailBook?.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </Card>
        </div>
        <div className="space-y-6 md:col-span-1">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {dataDetailBook?.title}
            </h1>
            <p className="text-muted-foreground text-lg">
              by
              <span className="text-foreground px-2 font-semibold">
                {dataDetailBook?.authors?.name}
              </span>
            </p>
            {dataDetailBook?.genres && dataDetailBook.genres.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {dataDetailBook.genres.map((g, idx) => (
                  <Badge key={idx} variant="default">
                    {g.genres.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-muted-foreground text-sm font-semibold uppercase">
              Publisher
            </h3>
            <p className="text-base">{dataDetailBook?.publishers?.name}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-muted-foreground text-sm font-semibold uppercase">
              ISBN
            </h3>
            <p className="font-mono text-base">{dataDetailBook?.isbn}</p>
          </div>
          <div className="space-y-2">
            {dataDetailBook?.shortDesc && (
              <div>
                <h3 className="text-muted-foreground mb-2 text-sm font-semibold uppercase">
                  Summary
                </h3>
                <p className="text-foreground text-base leading-relaxed">
                  {dataDetailBook.shortDesc}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-1">
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle>Borrow This Book</CardTitle>
              <CardDescription>Choose your borrow duration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Duration</label>
                <Select
                  value={borrowDuration}
                  onValueChange={setBorrowDuration}
                  disabled={checkUser || checkStatusBook}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">7 Days</SelectItem>
                    <SelectItem value="14" disabled={checkCard}>
                      14 Days
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {!checkStatusBook && (
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-muted-foreground text-sm">
                    <span className="text-foreground font-semibold">
                      Due Date:
                    </span>
                    {calculateDueDate(+borrowDuration)}
                  </p>
                </div>
              )}

              {checkCard && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex gap-2">
                    <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                    <p className="text-sm text-amber-700">
                      <span className="font-semibold">Note:</span> 14-day borrow
                      requires an active library card.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="mb-2 flex items-start gap-2 font-semibold text-blue-700">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
                    Borrowing Terms
                  </p>
                  <ul className="ml-7 list-disc space-y-2 text-sm text-blue-700 marker:text-blue-500">
                    <li>Return books by due date to avoid late fees</li>
                    <li>Keep books in good condition</li>
                    <li>Renew once if no one has reserved it</li>
                    <li>Pay any applicable fines before borrowing again</li>
                  </ul>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              {checkUser ? (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate("/login")}
                >
                  Sign In to Borrow
                </Button>
              ) : (
                <Button
                  className="w-full"
                  size="lg"
                  onClick={fetchBookLoans}
                  disabled={isLoading || !dataDetailBook}
                >
                  {isLoading ? "Processing..." : "Borrow Now"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </div>

      <Separator className="my-8" />
    </>
  );
};

export default BookDetailContent;
