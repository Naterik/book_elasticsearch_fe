import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, X, Clock, Book } from "lucide-react";
import {
  getSuggestAPI,
  postHistorySearchByUserId,
  getHistorySearchByUserId,
  deleteHistorySearchByUserId,
  deleteAllHistorySearchUser,
  postMergeRecentSearchAsGuest,
} from "@/lib/api";
import { toast } from "sonner";
import { useCurrentApp } from "@/app/providers/app.context";

type SearchBarProps = {
  initialQuery?: string;
  onSearch: (query: string) => void;
  onClear?: () => void;
};

const RECENT_KEY = "recent_searches_v1";
const MAX_RECENT = 5;
const DEBOUNCE_MS = 280;

function SearchBar({ initialQuery = "", onSearch, onClear }: SearchBarProps) {
  const { isAuthenticated, user } = useCurrentApp();
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<ISuggestResult>([]);
  const [recent, setRecent] = useState<IHistorySearch[]>([]);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const localRecent = localStorage.getItem(RECENT_KEY);
  useEffect(() => {
    loginUserHistorySearch();
  }, [isAuthenticated, user?.id]);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    const q = query.trim();
    if (q.length < 1) {
      setSearchResult([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await getSuggestAPI(q, 6);
        if (res.data) {
          setSearchResult(res.data);
        }
      } catch (error: any) {
        // toast.error("Failed to fetch search suggestions", error.message);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  const commitSearch = (text: string) => {
    const keyword = text.trim();
    if (isAuthenticated && user?.id) {
      saveToBackend(keyword);
    } else {
      saveToLocalStorage(keyword);
    }
    setQuery(keyword);
    setOpen(false);
    onSearch(keyword);
  };

  const saveToBackend = async (term: string) => {
    try {
      const res = await postHistorySearchByUserId(user!.id, term);
      if (res?.message) {
        toast.error(res.message);
      }
      const updatedRes = await getHistorySearchByUserId(user!.id);
      if (updatedRes?.data) {
        setRecent(updatedRes.data);
        // toast.success("Search saved");
      }
    } catch (error) {
      // toast.error("Failed to save search");
      const reverted = recent.filter((r) => r.term !== term);
      setRecent(reverted);
    }
  };

  const saveToLocalStorage = (term: string) => {
    const filtered = recent.filter(
      (r) => r.term.toLowerCase() !== term.toLowerCase()
    );
    const newEntry: IHistorySearch = { id: Date.now(), term };
    const next = [newEntry, ...filtered].slice(0, MAX_RECENT);
    setRecent(next);
    localStorage.setItem(
      RECENT_KEY,
      JSON.stringify(next.map((item) => item.term))
    );
  };

  const loginUserHistorySearch = async () => {
    try {
      if (isAuthenticated && user?.id) {
        if (localRecent) {
          try {
            const localTerms = JSON.parse(localRecent);
            const resMergeItem = await postMergeRecentSearchAsGuest(
              user.id,
              localTerms
            );
            localStorage.removeItem(RECENT_KEY);
            setRecent(resMergeItem.data);
          } catch (error) {
            toast.error("Failed to migrate search history");
            localStorage.removeItem(RECENT_KEY);
          }
        }
      } else {
        if (localRecent) {
          const parsed = JSON.parse(localRecent);
          setRecent(
            parsed.map((term: string, index: number) => ({ id: index, term }))
          );
        } else {
          setRecent([]);
        }
      }
    } catch (error) {
      toast.error("Failed to sync search history");
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    commitSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    setOpen(false);
    onSearch("");
    onClear?.();
  };

  const clearRecentSearches = async () => {
    try {
      if (isAuthenticated && user?.id) {
        const res = await deleteAllHistorySearchUser();
        if (res?.message) {
          toast.error(res.message);
        }
        setRecent([]);
      } else {
        setRecent([]);
        localStorage.removeItem(RECENT_KEY);
      }
    } catch (error: any) {
      toast.error("Failed to clear searches", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setOpen(true);
  };

  const handleRemove = async (
    e: React.MouseEvent<SVGSVGElement>,
    itemIndex: number
  ) => {
    e.stopPropagation();
    const updated = recent.filter((_, index) => index !== itemIndex);
    try {
      if (isAuthenticated && user?.id) {
        const searchId = recent[itemIndex]?.id;
        const res = await deleteHistorySearchByUserId(searchId);
        if (res?.message) {
          toast.error(res.message);
        }
        setRecent(updated);
      } else {
        setRecent(updated);
        localStorage.setItem(
          RECENT_KEY,
          JSON.stringify(updated.map((item) => item.term))
        );
      }
    } catch (error: any) {
      toast.error("Failed to remove search", error);
    }
  };

  const hasSuggestions = searchResult.length > 0;

  return (
    <div ref={wrapRef} className="w-full max-w-3xl mx-auto my-8 relative z-50">
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Search for books by title or author..."
            value={query}
            onChange={handleSearch}
            onFocus={() =>
              recent && recent.length > 0 ? setOpen(true) : setOpen(false)
            }
            onBlur={() => setOpen(false)}
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
          className="absolute left-0 top-full mt-1 w-full rounded-md border bg-white shadow-xl overflow-hidden max-h-96 overflow-y-auto"
          onMouseDown={(e) => e.preventDefault()}
        >
          {query.trim().length > 0 ? (
            <>
              {loading ? (
                <div className="px-4 py-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-blue-600"></div>
                  <p className="mt-2 text-sm text-gray-500">Searching...</p>
                </div>
              ) : hasSuggestions ? (
                <>
                  <div className="border-b border-gray-100">
                    <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-50/50 flex items-center gap-2 sticky top-0">
                      <Book className="h-4 w-4 text-blue-600" />
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Books
                      </span>
                      <span className="ml-auto text-xs text-gray-500">
                        {searchResult.length} results
                      </span>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {searchResult.map((items: ISuggest, idx: number) => {
                        return (
                          <div
                            key={`title-${idx}`}
                            className="px-4 py-3 cursor-pointer hover:bg-blue-50 transition-colors group flex items-start gap-3"
                            onClick={() => commitSearch(items.text)}
                          >
                            <SearchIcon className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-gray-800 font-medium line-clamp-2 flex-1">
                              {items.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-4 py-8 text-center">
                  <SearchIcon className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    No results found
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Try different keywords
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              {recent.length > 0 && (
                <>
                  <div className="px-4 py-3 bg-gray-50/80 flex justify-between border-b border-gray-100 sticky top-0">
                    <div className="flex items-start gap-2">
                      <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Recent Searches
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={clearRecentSearches}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {recent.map((searchRecent, index) => (
                      <div
                        key={searchRecent.id || index}
                        className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors flex items-center justify-between gap-5"
                        onClick={() => commitSearch(searchRecent.term)}
                      >
                        <Clock className="h-4 w-4 text-gray-500" />
                        <p className="text-sm text-gray-700 line-clamp-1 flex-1 text-left">
                          {searchRecent.term}
                        </p>
                        <X
                          onClick={(e) => handleRemove(e, index)}
                          className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;
