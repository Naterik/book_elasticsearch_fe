import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookCard from "../../book/components/BookCard";
const MOCK: Item[] = Array.from({ length: 4 }).map((_, i) => ({
  id: String(i + 1),
  kind: (["BOOK", "ARTICLE", "STANDARD"] as const)[i % 3],
  image:
    i % 3 === 1
      ? "https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400"
      : i % 3 === 2
      ? "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=400"
      : "https://images.unsplash.com/photo-1465101162946-4377e57745c3?q=80&w=400",
  title:
    i % 2
      ? "Aliquam eius etincidunt quia quisquam..."
      : "Ipsum dolorem adipisci etincidunt quaerat dolor.",
  authors: i % 2 ? "Glover, Bruno" : "Doe, Jane; CERN",
  meta1: i % 2 ? "1966 - Edition 7" : "1855 - Edition 5 - Vol. 2",
  meta2: i % 3 === 0 ? "Etincidunt ut etincidunt sit sit." : undefined,
  publisher: i % 2 ? "Springer" : "CERN",
}));
const BookDetailInfo = () => {
  return (
    <div>
      <div>
        <Tabs defaultValue="detail" className="w-full">
          <TabsList className="space-x-4">
            <TabsTrigger value="detail" className="tabs-trigger">
              Details
            </TabsTrigger>
            <TabsTrigger value="content" className="tabs-trigger">
              Content
            </TabsTrigger>
            <TabsTrigger value="related" className="tabs-trigger">
              Related
            </TabsTrigger>
          </TabsList>
          <TabsContent value="detail">
            <h2 className=" scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-2">
              Detail
            </h2>
            <table className="border-separate border-spacing-5">
              <tbody>
                <tr>
                  <td className="pr-20 font-semibold">Title</td>
                  <td className=" ">abc</td>
                </tr>
                <tr>
                  <td className=" font-semibold">ISBN</td>
                  <td className=" ">123</td>
                </tr>
                <tr>
                  <td className=" font-semibold">Author</td>
                  <td className=" ">123</td>
                </tr>
                <tr>
                  <td className=" font-semibold">Languages</td>
                  <td className=" ">123</td>
                </tr>
                <tr>
                  <td className="font-semibold ">Page</td>
                  <td className=" ">123</td>
                </tr>
                <tr>
                  <td className=" font-semibold">Publisher</td>
                  <td className=" ">123</td>
                </tr>
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="content" className="w-full">
            <h2 className="scroll-m-100 border-b pb-2 text-xl font-semibold tracking-tight first:mt-2">
              Content
            </h2>
            <p className="text-muted-foreground text-md p-5">
              The king, seeing how much happier his were realized the error of
              asdfasdfasdfasdfasdfasdfasdfasdfasdfasdf his ways and repealed the
              joke tax.
            </p>
          </TabsContent>
          <TabsContent value="related" className="w-full">
            <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-2">
              Related
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 ">
              {MOCK.map((item) => {
                return <BookCard item={item} />;
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookDetailInfo;
