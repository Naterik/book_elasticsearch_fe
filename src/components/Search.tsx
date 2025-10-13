import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X, Clock, TrendingUp } from "lucide-react";
import { getSuggestAPI } from "@/services/api";

type SearchBarProps = {
  initialQuery?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
};

const RECENT_KEY = "recent_searches_v1";
const MAX_RECENT = 5;
const DEBOUNCE_MS = 280;
const MIN_CHARS = 2;

function SearchBar({ initialQuery = "", onSearch, onClear }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [authors, setAuthors] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => setQuery(initialQuery), [initialQuery]);

  useEffect(() => {
    const raw = localStorage.getItem(RECENT_KEY);
    setRecent(raw ? JSON.parse(raw) : []);
  }, []);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const q = query.trim();
    if (q.length < MIN_CHARS) {
      setTitles([]);
      setAuthors([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await getSuggestAPI(q, 6);
        const data = res?.data?.data || { titles: [], authors: [] };

        setTitles((data.titles || []).map((x: any) => x.text));
        setAuthors((data.authors || []).map((x: any) => x.text));
      } catch (error) {
        console.error("Suggest API error:", error);
        setTitles([]);
        setAuthors([]);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const commitSearch = (text: string) => {
    const keyword = text.trim();
    if (!keyword) return;
    const next = [
      keyword,
      ...recent.filter((r) => r.toLowerCase() !== keyword.toLowerCase()),
    ].slice(0, MAX_RECENT);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
    setRecent(next);

    setOpen(false);
    onSearch(keyword);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commitSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    setTitles([]);
    setAuthors([]);
    setOpen(false);
    onClear?.();
  };

  const clearRecentSearches = () => {
    setRecent([]);
    localStorage.removeItem(RECENT_KEY);
  };

  return (
    <div ref={wrapRef} className="w-full max-w-3xl mx-auto my-8 relative z-50">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for books by title or author..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            className="w-full pl-10 pr-4 h-12"
          />
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
        </div>

        <Button type="submit" size="lg" className="px-6">
          Search
        </Button>

        {query && (
          <Button
            type="button"
            variant="ghost"
            size="lg"
            onClick={handleClear}
            className="px-3"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </form>
      {open && (
        <div
          className="absolute left-0 top-full mt-1 w-full rounded-md border bg-white shadow-xl overflow-hidden"
          onMouseDown={(e) => e.preventDefault()}
        >
          {query.trim().length >= MIN_CHARS ? (
            <>
              {loading ? (
                <div className="px-4 py-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
                  <p className="mt-2 text-sm text-gray-500">Searching...</p>
                </div>
              ) : (
                <>
                  {!!titles.length && (
                    <div className="border-b border-gray-100">
                      <div className="px-3 py-2 bg-gray-50/80 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-600" />
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Book Titles
                        </span>
                      </div>
                      <div className="p-1">
                        {titles.map((t, i) => (
                          <div
                            key={`t-${i}`}
                            className="px-3 py-2.5 cursor-pointer hover:bg-blue-50 rounded transition-colors"
                            onClick={() => commitSearch(t)}
                          >
                            <p className="text-sm text-gray-800 font-medium line-clamp-1">
                              {t}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!!authors.length && (
                    <div>
                      <div className="px-3 py-2 bg-gray-50/80 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                          Authors
                        </span>
                      </div>
                      <div className="p-1">
                        {authors.map((a, i) => (
                          <div
                            key={`a-${i}`}
                            className="px-3 py-2.5 cursor-pointer hover:bg-green-50 rounded transition-colors"
                            onClick={() => commitSearch(a)}
                          >
                            <p className="text-sm text-gray-800 font-medium line-clamp-1">
                              {a}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {!titles.length && !authors.length && (
                    <div className="px-4 py-8 text-center">
                      <SearchIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 font-medium">
                        No suggestions found
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Try different keywords
                      </p>
                    </div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              <div className="px-3 py-2 bg-gray-50/80 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                    Recent Searches
                  </span>
                </div>
                {recent.length > 0 && (
                  <button
                    type="button"
                    onClick={clearRecentSearches}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {recent.length > 0 ? (
                <div className="p-1 max-h-64 overflow-y-auto">
                  {recent.map((r, i) => (
                    <div
                      key={`r-${i}`}
                      className="px-3 py-2.5 cursor-pointer hover:bg-gray-50 rounded transition-colors group"
                      onClick={() => commitSearch(r)}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-700 line-clamp-1">
                          {r}
                        </p>
                        <SearchIcon className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-2" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center">
                  <Clock className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    No recent searches
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Type at least {MIN_CHARS} characters to get suggestions
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
