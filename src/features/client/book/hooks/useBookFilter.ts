import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { toast } from "sonner";
import { getAllGenreAPI, getAllLanguagesElasticAPI } from "@/services/api";
import { useCurrentApp } from "@/app/providers/app.context";
import { PRICE_BOUNDS, YEAR_BOUNDS } from "@/types/enums/book.enum";
import { useSearchParams } from "react-router";

export const useBookFilter = () => {
  const { setIsLoading } = useCurrentApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(() => {
    const genresParam = searchParams.get("genres");
    return genresParam ? genresParam.split(",") : [];
  });

  const [languages, setLanguages] = useState<ILanguages[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    () => {
      return searchParams.get("lang") || null;
    }
  );

  const [priceRange, setPriceRange] = useState<[number, number]>(() => {
    const min = searchParams.get("minPrice");
    const max = searchParams.get("maxPrice");
    return [
      min ? Number(min) : PRICE_BOUNDS[0],
      max ? Number(max) : PRICE_BOUNDS[1],
    ];
  });

  const [yearRange, setYearRange] = useState<[number, number]>(() => {
    const min = searchParams.get("minYear");
    const max = searchParams.get("maxYear");
    return [
      min ? Number(min) : YEAR_BOUNDS[0],
      max ? Number(max) : YEAR_BOUNDS[1],
    ];
  });

  const priceDebounceTimer = useRef<NodeJS.Timeout | null>(null);
  const yearDebounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Sync state to URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    let hasChanges = false;

    // Genres
    const currentGenres = params.get("genres");
    const newGenres = selectedGenres.join(",");
    if (selectedGenres.length > 0) {
      if (currentGenres !== newGenres) {
        params.set("genres", newGenres);
        hasChanges = true;
      }
    } else if (currentGenres) {
      params.delete("genres");
      hasChanges = true;
    }

    // Language
    const currentLang = params.get("lang");
    if (selectedLanguage) {
      if (currentLang !== selectedLanguage) {
        params.set("lang", selectedLanguage);
        hasChanges = true;
      }
    } else if (currentLang) {
      params.delete("lang");
      hasChanges = true;
    }

    // Price
    const currentMinPrice = params.get("minPrice");
    const currentMaxPrice = params.get("maxPrice");
    if (
      priceRange[0] !== PRICE_BOUNDS[0] ||
      priceRange[1] !== PRICE_BOUNDS[1]
    ) {
      if (
        currentMinPrice !== priceRange[0].toString() ||
        currentMaxPrice !== priceRange[1].toString()
      ) {
        params.set("minPrice", priceRange[0].toString());
        params.set("maxPrice", priceRange[1].toString());
        hasChanges = true;
      }
    } else if (currentMinPrice || currentMaxPrice) {
      params.delete("minPrice");
      params.delete("maxPrice");
      hasChanges = true;
    }

    // Year
    const currentMinYear = params.get("minYear");
    const currentMaxYear = params.get("maxYear");
    if (yearRange[0] !== YEAR_BOUNDS[0] || yearRange[1] !== YEAR_BOUNDS[1]) {
      if (
        currentMinYear !== yearRange[0].toString() ||
        currentMaxYear !== yearRange[1].toString()
      ) {
        params.set("minYear", yearRange[0].toString());
        params.set("maxYear", yearRange[1].toString());
        hasChanges = true;
      }
    } else if (currentMinYear || currentMaxYear) {
      params.delete("minYear");
      params.delete("maxYear");
      hasChanges = true;
    }

    if (hasChanges) {
      setSearchParams(params, { replace: true });
    }
  }, [
    selectedGenres,
    selectedLanguage,
    priceRange,
    yearRange,
    searchParams,
    setSearchParams,
  ]);

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
