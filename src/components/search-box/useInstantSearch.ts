import { useState, useRef, useEffect } from "react";
import { BookService } from "@/lib/api";
import type { IInstantSearchResponse } from "@/features/client/book/services";

const DEBOUNCE_MS = 250;

export const useInstantSearch = (initialQuery: string = "") => {
  const [query, setQuery] = useState(initialQuery);
  const [data, setData] = useState<IInstantSearchResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    if (!query.trim()) {
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await BookService.getInstantSearch(query.trim());
        if (res.data) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [query]);

  return { query, setQuery, data, loading };
};
