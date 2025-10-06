import { Card, CardTitle } from "@/components/ui/card";
import BookCard from "./BookCard";

type Props = {
  error: boolean;
  items: IBook[] | undefined;
  view: "List" | "Kanban";
};

export default function BookGrid({ items, view, error }: Props) {
  const cls =
    view === "Kanban" ? "grid grid-cols-4 gap-10" : "grid grid-cols-1 gap-4"; // List: 1 cột (có thể tùy biến)
  if (error)
    return (
      <Card className=" border-0 shadow-none hover:shadow-2xl transition p-4 text-center">
        <CardTitle className="text-xl">No search results found </CardTitle>
      </Card>
    );
  return (
    <div className={cls}>
      {items?.map((it) => (
        <BookCard key={it.id} item={it} />
      ))}
    </div>
  );
}
