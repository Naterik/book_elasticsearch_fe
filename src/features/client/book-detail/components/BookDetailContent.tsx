import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { postCreateLoanAPI } from "@/lib/api";
import { toast } from "sonner";
import { calculateDueDate } from "@/helper";
import { useCurrentApp } from "@/app/providers/app.context";

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
      const res = await postCreateLoanAPI(
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
            <div className="aspect-[4/5] w-full bg-muted">
              <img
                src={dataDetailBook?.image}
                alt={dataDetailBook?.title}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </Card>
        </div>
        <div className="md:col-span-1 space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight">
              {dataDetailBook?.title}
            </h1>
            <p className="text-lg text-muted-foreground">
              by
              <span className="font-semibold text-foreground px-2">
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
            <h3 className="font-semibold text-sm text-muted-foreground uppercase">
              Publisher
            </h3>
            <p className="text-base">{dataDetailBook?.publishers?.name}</p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase">
              ISBN
            </h3>
            <p className="text-base font-mono">{dataDetailBook?.isbn}</p>
          </div>
          <div className="space-y-2">
            {dataDetailBook?.shortDesc && (
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                  Summary
                </h3>
                <p className="text-base leading-relaxed text-foreground">
                  {dataDetailBook.shortDesc}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="md:col-span-1">
          <Card className="border shadow-md ">
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
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Due Date:
                    </span>
                    {calculateDueDate(+borrowDuration)}
                  </p>
                </div>
              )}

              {checkCard && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
                  <div className="flex gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-700">
                      <span className="font-semibold">Note:</span> 14-day borrow
                      requires an active library card.
                    </p>
                  </div>
                </div>
              )}

              <div className="space-y-3 pt-2">
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
                  <p className="flex items-start gap-2 text-blue-700 font-semibold mb-2">
                    <CheckCircle className="h-5 w-5 mt-0.5 text-blue-600 flex-shrink-0" />
                    Borrowing Terms
                  </p>
                  <ul className="ml-7 space-y-2 text-blue-700 text-sm list-disc marker:text-blue-500">
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
