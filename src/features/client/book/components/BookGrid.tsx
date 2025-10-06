import BookCard from "./BookCard";

type Props = {
  items: IBook[] | undefined;
  view: "List" | "Kanban";
};

export default function BookGrid({ items, view }: Props) {
  const cls =
    view === "Kanban" ? "grid grid-cols-4 gap-10" : "grid grid-cols-1 gap-4"; // List: 1 cột (có thể tùy biến)

  return (
    <div className={cls}>
      {items?.map((it) => (
        <BookCard key={it.id} item={it} />
      ))}
    </div>
  );
}
