import { Card, CardTitle } from "@/components/ui/card";
import BookCard from "./BookCard";
import BookListCard from "./BookListCard";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  items: IBook[] | undefined;
  view: "List" | "Kanban";
};

export default function BookGrid({ items, view }: Props) {
  const isMobile = useIsMobile();

  const getGridClass = (): string => {
    if (view === "List") {
      return "space-y-3 sm:space-y-4";
    }
    if (isMobile) {
      return "grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-3";
    }
    return "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6";
  };

  if (items?.length === 0) {
    return (
      <Card className="border-0 shadow-none hover:shadow-2xl transition-shadow p-6 sm:p-8 text-center">
        <CardTitle className="text-lg sm:text-xl text-gray-600">
          No search results found
        </CardTitle>
      </Card>
    );
  }

  return (
    <div className={getGridClass()}>
      {view === "List"
        ? items?.map((it) => <BookListCard key={it.id} item={it} />)
        : items?.map((it) => <BookCard key={it.id} item={it} />)}
    </div>
  );
}
