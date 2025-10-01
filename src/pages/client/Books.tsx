import { useMemo, useState } from "react";
// shadcn/ui
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination";
// icons
import { List, LayoutGrid } from "lucide-react";

type Item = {
  id: string;
  kind: "BOOK" | "ARTICLE" | "STANDARD";
  image: string;
  title: string;
  authors: string;
  meta1?: string; // "1855 - Edition 5 - Vol. 2"
  meta2?: string; // "Etincidunt ut etincidunt sit sit."
  publisher: string;
};
const MOCK: Item[] = Array.from({ length: 15 }).map((_, i) => ({
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

const BookPage = () => {
  const [view, setView] = useState<"List" | "Kanban">("List");
  const [sortBy, setSortBy] = useState("most_relevant");
  const [perPage, setPerPage] = useState(15);
  const [page, setPage] = useState(1);

  const total = MOCK.length; // thay bằng total từ API
  const totalPages = Math.max(1, Math.ceil(total / perPage));

  // demo paginate cục bộ
  const pageItems = useMemo(() => {
    const start = (page - 1) * perPage;
    return MOCK.slice(start, start + perPage);
  }, [page, perPage]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goTo = (p: number) => setPage(Math.min(Math.max(1, p), totalPages));

  return (
    <div className="space-y-6">
      {/* Top bar giống ảnh: 3 cột */}
      <div className="grid grid-cols-2 items-center">
        {/* LEFT: view + found + per-page */}
        <div className="flex items-center gap-4">
          <ToggleGroup
            type="single"
            value={view}
            onValueChange={(v) => v && setView(v as "List" | "Kanban")}
            className="border rounded-md px-1"
          >
            <ToggleGroupItem
              value="List"
              aria-label="List"
              className="px-2 py-2"
            >
              <List className="h-5 w-5" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="Kanban"
              aria-label="Kanban"
              className="px-2 py-2"
            >
              <LayoutGrid className="h-5 w-5" />
            </ToggleGroupItem>
          </ToggleGroup>

          <div className="flex items-center gap-2">
            <Badge className="rounded-md px-2 py-1 text-base">{total}</Badge>
            <span className="text-sm text-muted-foreground">results found</span>
          </div>
        </div>

        {/* RIGHT: sort by */}
        <div className="flex items-center justify-end ">
          <span className="text-sm text-muted-foreground">Sort by</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-8 w-[160px]">
              <SelectValue placeholder="Most relevant" />
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="most_relevant">Most relevant</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="title">Title (A–Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* GRID 5 cột như ảnh */}
      <div className="grid grid-cols-4 gap-10">
        {pageItems.map((b) => (
          <Card
            key={b.id}
            className="w-[240px] border-0 shadow-none hover:shadow-md transition p-10"
          >
            <div className="aspect-[3/4] overflow-hidden rounded">
              <img
                src={b.image}
                alt={b.title}
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>

            <CardHeader className="px-0">
              <CardTitle className="text-xl leading-snug truncate">
                {b.title}
              </CardTitle>
              <CardDescription className="truncate">
                {b.authors}
              </CardDescription>
            </CardHeader>

            <CardContent className="px-0 space-y-1">
              {b.meta1 && (
                <p className="text-sm text-muted-foreground">{b.meta1}</p>
              )}
              {b.meta2 && (
                <p className="text-sm text-muted-foreground">{b.meta2}</p>
              )}
              <p className="text-sm text-muted-foreground mt-1">
                {b.publisher}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  goPrev();
                }}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const p = idx + 1;
              return (
                <PaginationItem key={p}>
                  <PaginationLink
                    isActive={p === page}
                    onClick={(e) => {
                      e.preventDefault();
                      goTo(p);
                    }}
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  goNext();
                }}
                aria-disabled={page === totalPages}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default BookPage;
