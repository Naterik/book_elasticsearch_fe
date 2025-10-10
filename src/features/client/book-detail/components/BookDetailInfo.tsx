import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  item: IBook | null;
};

const BookDetailInfo = ({ item }: Props) => {
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
              Details
            </h2>
            <table className="border-separate border-spacing-5">
              <tbody>
                <tr>
                  <td className="pr-20 font-semibold">Title</td>
                  <td className=" ">{item?.title}</td>
                </tr>
                <tr>
                  <td className=" font-semibold">ISBN</td>
                  <td className=" ">{item?.isbn}</td>
                </tr>
                <tr>
                  <td className=" font-semibold">Author</td>
                  <td className=" ">{item?.authors.name}</td>
                </tr>
                <tr>
                  <td className=" font-semibold">Languages</td>
                  <td className=" ">{item?.language}</td>
                </tr>
                <tr>
                  <td className="font-semibold ">Page</td>
                  <td className=" ">{item?.pages}</td>
                </tr>
                <tr>
                  <td className=" font-semibold">Publisher</td>
                  <td className=" ">{item?.publishers.name}</td>
                </tr>
              </tbody>
            </table>
          </TabsContent>
          <TabsContent value="content" className="w-full">
            <h2 className="scroll-m-100 border-b pb-2 text-xl font-semibold tracking-tight first:mt-2">
              Content
            </h2>
            <p className="text-muted-foreground text-lg p-5">
              {item?.detailDesc}
            </p>
          </TabsContent>
          <TabsContent value="related" className="w-full">
            <h2 className="scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight first:mt-2">
              Related
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 ">
              {/* {item?.map((i) => {
                return <BookCard item={i} />;
              })} */}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BookDetailInfo;
