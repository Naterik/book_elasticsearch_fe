import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/helper";

type Props = {
  item: IBook | null;
};

const BookDetailInfo = ({ item }: Props) => {
  return (
    <div className="w-full">
      <Tabs defaultValue="details" className="w-full co">
        <TabsList className="grid w-full grid-cols-3 ">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="stats">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Book Information</CardTitle>
              <CardDescription>
                Complete details about this book
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      Title
                    </h3>
                    <p className="text-base text-foreground">{item?.title}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      ISBN
                    </h3>
                    <p className="text-base font-mono">{item?.isbn}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      Author
                    </h3>
                    <p className="text-base">{item?.authors?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      Publisher
                    </h3>
                    <p className="text-base">{item?.publishers?.name}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      Language
                    </h3>
                    <p className="text-base">{item?.language}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      Pages
                    </h3>
                    <p className="text-base">{item?.pages} pages</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      Publication Date
                    </h3>
                    <p className="text-base">
                      {item?.publishDate ? formatDate(item.publishDate) : "N/A"}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-1">
                      Price
                    </h3>
                    <p className="text-base font-semibold">
                      {formatCurrency(item?.price || 0)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">About This Book</CardTitle>
              <CardDescription>Description </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {item?.detailDesc && (
                  <div>
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                      Full Description
                    </h3>
                    <p className="text-base leading-relaxed text-foreground whitespace-pre-wrap">
                      {item.detailDesc}
                    </p>
                  </div>
                )}

                {!item?.detailDesc && !item?.shortDesc && (
                  <p className="text-muted-foreground italic">
                    No description available for this book.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Statistics</CardTitle>
              <CardDescription>
                Availability and borrowing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border p-4 bg-slate-50">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Total Copies
                  </h3>
                  <p className="text-3xl font-bold">{item?.quantity || 0}</p>
                </div>

                <div className="rounded-lg border p-4 bg-slate-50">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Currently Borrowed
                  </h3>
                  <p className="text-3xl font-bold">{item?.borrowed || 0}</p>
                </div>

                <div className="rounded-lg border p-4 bg-slate-50">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Available Copies
                  </h3>
                  <p className="text-3xl font-bold text-green-600">
                    {(item?.quantity || 0) - (item?.borrowed || 0)}
                  </p>
                </div>

                <div className="rounded-lg border p-4 bg-slate-50">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase mb-2">
                    Availability
                  </h3>
                  <p className="text-lg font-semibold">
                    {(item?.quantity || 0) - (item?.borrowed || 0) > 0
                      ? "Available for Borrowing"
                      : "Currently Out of Stock"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BookDetailInfo;
