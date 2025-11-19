import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { getAllGenreAPI, getAllLanguagesElasticAPI } from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";
import { PRICE_BOUNDS, YEAR_BOUNDS } from "@/types/enums/book.enum";

export const useBookFilter = () => {
  const { setIsLoading } = useCurrentApp();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const [languages, setLanguages] = useState<ILanguages[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_BOUNDS[0],
    PRICE_BOUNDS[1],
  ]);

  const [yearRange, setYearRange] = useState<[number, number]>([
    YEAR_BOUNDS[0],
    YEAR_BOUNDS[1],
  ]);

  const priceDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const yearDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (priceDebounceTimer.current) clearTimeout(priceDebounceTimer.current);
      if (yearDebounceTimer.current) clearTimeout(yearDebounceTimer.current);
    };
  }, []);

  useEffect(() => {
    const loadFilterData = async () => {
      try {
        setIsLoading(true);
        const [allGenres, allLanguages] = await Promise.all([
          getAllGenreAPI(),
          getAllLanguagesElasticAPI(),
        ]);
        if (allGenres.data && allLanguages.data) {
          setGenres(allGenres.data);
          setLanguages(allLanguages.data);
        } else {
          toast.error("Failed to fetch filter data");
        }
      } catch (err) {
        toast.error("Error loading filter data");
      } finally {
        setIsLoading(false);
      }
    };

    loadFilterData();
  }, [setIsLoading]);

  const isFilterPriceApplied = useMemo(() => {
    return (
      priceRange[0] !== PRICE_BOUNDS[0] || priceRange[1] !== PRICE_BOUNDS[1]
    );
  }, [priceRange]);

  const isFilterYearApplied = useMemo(() => {
    return yearRange[0] !== YEAR_BOUNDS[0] || yearRange[1] !== YEAR_BOUNDS[1];
  }, [yearRange]);

  const countFilter = useMemo(() => {
    let count = 0;
    if (selectedGenres.length > 0) count += selectedGenres.length;
    if (selectedLanguage) count += 1;
    if (isFilterPriceApplied) count += 1;
    if (isFilterYearApplied) count += 1;
    return count;
  }, [
    selectedGenres,
    selectedLanguage,
    isFilterPriceApplied,
    isFilterYearApplied,
  ]);

  const toggleGenre = useCallback((value: string, checked: boolean) => {
    setSelectedGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  }, []);

  const handlePriceChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleYearChange = (range: [number, number]) => {
    setYearRange(range);
  };

  const handleLanguageChange = (lang: string | null) => {
    setSelectedLanguage(lang);
  };

  const removeGenreFromSelected = (genre: string) => {
    setSelectedGenres((prev) => prev.filter((g) => g !== genre));
  };

  const removeLanguageFromSelected = () => {
    setSelectedLanguage(null);
  };

  const resetFilters = useCallback(() => {
    setSelectedGenres([]);
    setSelectedLanguage(null);
    setPriceRange([PRICE_BOUNDS[0], PRICE_BOUNDS[1]]);
    setYearRange([YEAR_BOUNDS[0], YEAR_BOUNDS[1]]);
  }, []);

  return {
    genres,
    selectedGenres,
    languages,
    selectedLanguage,
    priceRange,
    yearRange,

    isFilterOpen,
    setIsFilterOpen,
    countFilter,

    toggleGenre,
    handlePriceChange,
    handleYearChange,
    handleLanguageChange,
    removeGenreFromSelected,
    removeLanguageFromSelected,
    resetFilters,

    PRICE_BOUNDS,
    YEAR_BOUNDS,
    isFilterPriceApplied,
    isFilterYearApplied,
  };
};
