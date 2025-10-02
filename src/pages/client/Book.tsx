import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import BookToolbar from "@/features/client/book/components/BookToolbar";
import BookGrid from "@/features/client/book/components/BookGrid";
import BookPagination from "@/features/client/book/components/BookPagination";
import BookFilter from "@/features/client/book/components/BookFilter";

// demo data
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

const GENRES = ["A", "B", "C"];
const LANGS = ["EN", "VI", "JP"];
const PRICE_BOUNDS: [number, number] = [120_000, 15_000_000];
const YEAR_BOUNDS: [number, number] = [1999, 2025];

export default function BookPage() {
  // search box (đúng vị trí như ảnh)
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  // filters
  const [genres, setGenres] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_BOUNDS[0],
    1_500_000,
  ]);
  const [yearRange, setYearRange] = useState<[number, number]>([
    2005,
    YEAR_BOUNDS[1],
  ]);

  const [view, setView] = useState<"List" | "Kanban">("Kanban");
  const [sortBy, setSortBy] = useState<string>("most_relevant");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 15;

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
    setCurrentPage(1);
  };

  const toggleGenre = (value: string, checked: boolean) => {
    setGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
    setCurrentPage(1);
  };
  const toggleLanguage = (value: string, checked: boolean) => {
    setLanguages((prev) =>
      checked ? [...prev, value] : prev.filter((l) => l !== value)
    );
    setCurrentPage(1);
  };

  const filtered = useMemo(() => {
    let items = [...MOCK];
    if (search) {
      const q = search.toLowerCase();
      items = items.filter(
        (it) =>
          it.title.toLowerCase().includes(q) ||
          it.authors.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, genres, languages, priceRange, yearRange]);

  // sort
  const sorted = useMemo(() => {
    const items = [...filtered];
    if (sortBy === "title")
      items.sort((a, b) => a.title.localeCompare(b.title));
    if (sortBy === "newest") items.sort((a, b) => Number(b.id) - Number(a.id));
    if (sortBy === "oldest") items.sort((a, b) => Number(a.id) - Number(b.id));
    return items;
  }, [filtered, sortBy]);

  // paging
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, currentPage]);

  const resetFilters = () => {
    setGenres([]);
    setLanguages([]);
    setPriceRange([PRICE_BOUNDS[0], 1_500_000]);
    setYearRange([2005, YEAR_BOUNDS[1]]);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto">
      {/* SEARCH (giữa như ảnh) */}
      <form
        onSubmit={handleSubmitSearch}
        className="flex items-center justify-center gap-2 my-8"
      >
        <Input
          placeholder="input search text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-[520px]"
        />
        <Button size="lg" type="submit">
          Search
        </Button>
        {searchInput && (
          <Button
            type="button"
            variant="ghost"
            onClick={() => setSearchInput("")}
          >
            Clear
          </Button>
        )}
      </form>

      <div className="flex gap-8">
        <BookFilter
          genresAll={GENRES}
          genresSelected={genres}
          onToggleGenre={toggleGenre}
          languagesAll={LANGS}
          languagesSelected={languages}
          onToggleLanguage={toggleLanguage}
          priceRange={priceRange}
          priceBounds={PRICE_BOUNDS}
          onPriceChange={setPriceRange}
          yearRange={yearRange}
          yearBounds={YEAR_BOUNDS}
          onYearChange={setYearRange}
          onApply={() => setCurrentPage(1)}
          onReset={resetFilters}
          sticky
        />

        <div className="flex-1 min-w-0">
          <BookToolbar
            view={view}
            onChangeView={setView}
            sortBy={sortBy}
            onChangeSort={setSortBy}
            total={total}
          />
          <BookGrid items={pageItems} view={view} />
          <BookPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
