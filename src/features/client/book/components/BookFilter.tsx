import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/helper";
import { LANGUAGE_FLAGS } from "@/helper/icon";
import { useIsMobile } from "@/hooks/useMobile";
import { cn } from "@/lib/utils";
import { ITEMS_PER_SHOW } from "@/types";
import { Input } from "@/components/ui/input";
import {
  BookOpen,
  Calendar,
  ChevronDown,
  DollarSign,
  Filter,
  Globe,
  RotateCcw,
  Search,
} from "lucide-react";
import { memo, useState } from "react";

type Props = {
  genresAll: IGenre[];
  genresSelected: string[];
  onToggleGenre: (value: any, checked: boolean) => void;
  selectedLanguage: string | null;
  onChangeLanguage: (value: string | null) => void;
  languagesAll: IAggregations[] | undefined;

  priceRange: readonly [number, number];
  priceBounds: readonly [number, number];
  onPriceChange: (range: [number, number]) => void;

  yearRange: readonly [number, number];
  yearBounds: readonly [number, number];
  onYearChange: (range: [number, number]) => void;

  onReset: () => void;
  sticky?: boolean;
  isCompact?: boolean;
};

const BookFilter = ({
  genresAll,
  genresSelected,
  onToggleGenre,
  selectedLanguage,
  onChangeLanguage,
  languagesAll,
  priceRange,
  priceBounds,
  onPriceChange,
  yearRange,
  yearBounds,
  onYearChange,
  onReset,
  sticky = true,
  isCompact = false,
}: Props) => {
  const isMobile = useIsMobile();
  const [visibleGenresCount, setVisibleGenresCount] = useState(10);
  const [visibleLanguagesCount, setVisibleLanguagesCount] = useState(10);
  const [genreSearch, setGenreSearch] = useState("");

  const filteredGenres = genresAll.filter((g) =>
    g.name.toLowerCase().includes(genreSearch.toLowerCase())
  );

  const visibleGenres = filteredGenres.slice(0, visibleGenresCount);
  const hasMoreGenres = visibleGenresCount < filteredGenres.length;
  const isAllGenresShown = visibleGenresCount >= filteredGenres.length;

  const visibleLanguages = languagesAll?.slice(0, visibleLanguagesCount) ?? [];
  const hasMoreLanguages = visibleLanguagesCount < (languagesAll?.length ?? 0);
  const isAllLanguagesShown =
    visibleLanguagesCount >= (languagesAll?.length ?? 0);

  const handleShowMoreGenres = () => {
    setVisibleGenresCount((prev) => prev + ITEMS_PER_SHOW);
  };

  const handleShowLessGenres = () => {
    setVisibleGenresCount(ITEMS_PER_SHOW);
  };

  const handleShowMoreLanguages = () => {
    setVisibleLanguagesCount((prev) => prev + ITEMS_PER_SHOW);
  };

  const handleShowLessLanguages = () => {
    setVisibleLanguagesCount(ITEMS_PER_SHOW);
  };

  const hasActiveFilters =
    genresSelected.length > 0 ||
    selectedLanguage ||
    priceRange[0] !== priceBounds[0] ||
    priceRange[1] !== priceBounds[1] ||
    yearRange[0] !== yearBounds[0] ||
    yearRange[1] !== yearBounds[1];

  return (
    <Card
      className={`w-full border shadow-sm ${
        isCompact ? "border-0 shadow-none" : ""
      } ${sticky && !isMobile ? "lg:sticky lg:top-24" : ""}`}
    >
      <CardHeader className={`${isCompact ? "pb-2" : "pb-2 sm:pb-3"}`}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Filter
              className={`text-muted-foreground ${
                isCompact ? "h-3.5 w-3.5" : "h-4 w-4 sm:h-5 sm:w-5"
              }`}
            />
            <CardTitle
              className={isCompact ? "text-sm" : "text-base sm:text-lg"}
            >
              Filters
            </CardTitle>
          </div>
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="bg-blue-500 text-xs text-white dark:bg-blue-600"
            >
              {[genresSelected.length, selectedLanguage ? 1 : 0].reduce(
                (a, b) => a + b,
                0
              )}{" "}
              active
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent
        className={`${isCompact ? "space-y-2" : "space-y-3 sm:space-y-4"}`}
      >
        <section className={isCompact ? "space-y-1" : "space-y-2"}>
          <div className="flex items-center gap-2">
            <BookOpen
              className={`text-muted-foreground ${
                isCompact ? "h-3.5 w-3.5" : "h-4 w-4"
              }`}
            />
            <h3
              className={`text-muted-foreground font-semibold uppercase ${
                isCompact ? "text-xs" : "text-xs"
              }`}
            >
              Genres
            </h3>
          </div>
          <div className="relative mb-2">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <Input
              placeholder="Find genre..."
              value={genreSearch}
              onChange={(e) => {
                setGenreSearch(e.target.value);
                setVisibleGenresCount(ITEMS_PER_SHOW);
              }}
              className="h-8 pl-8 text-xs bg-muted/50 focus:bg-background transition-colors"
            />
          </div>

          <div className={`flex flex-wrap gap-2`}>
            {visibleGenres.map((g) => {
              const isSelected = genresSelected.includes(g.name);
              return (
                <Button
                  key={g.id}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "text-xs font-medium transition-all active:scale-95",
                    isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                      : "hover:bg-slate-100 hover:text-slate-900"
                  )}
                  onClick={() => onToggleGenre(g.name, !isSelected)}
                >
                  {g.name}
                </Button>
              );
            })}
            
            {filteredGenres.length === 0 && (
              <span className="text-xs text-muted-foreground italic w-full text-center py-2">
                No genres found
              </span>
            )}
          </div>

          {(hasMoreGenres || (!isAllGenresShown && filteredGenres.length > 0)) && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-auto p-0 text-xs font-medium text-blue-600 hover:text-blue-700"
              onClick={
                isAllGenresShown ? handleShowLessGenres : handleShowMoreGenres
              }
            >
              {isAllGenresShown ? "- Show Less" : `+ Show More (${filteredGenres.length - visibleGenresCount})`}
              <ChevronDown
                className={cn(
                  "ml-1 h-3.5 w-3.5 transition-transform",
                  isAllGenresShown ? "rotate-180" : ""
                )}
              />
            </Button>
          )}
        </section>

        <Separator />

        <section className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Globe className="text-muted-foreground h-3.5 w-3.5" />
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">
              Language
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedLanguage === null ? "default" : "outline"}
              size="sm"
              className={cn(
                "text-xs font-medium transition-all",
                selectedLanguage === null
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "hover:bg-slate-100"
              )}
              onClick={() => onChangeLanguage(null)}
            >
              All Languages
            </Button>

            {visibleLanguages.map((l) => {
              const isSelected = selectedLanguage === l.key;
              const flag = LANGUAGE_FLAGS[l.key.toUpperCase()] || "🌍";
              return (
                <Button
                  key={l.key}
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "flex items-center gap-1.5 text-xs font-medium transition-all",
                    isSelected
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "hover:bg-slate-100"
                  )}
                  onClick={() => onChangeLanguage(l.key)}
                >
                  <span className="text-sm">{flag}</span>
                  <span>{l.key}</span>
                  <span
                    className={cn(
                      "text-xs",
                      isSelected ? "text-blue-100" : "text-muted-foreground"
                    )}
                  >
                    ({l.doc_count})
                  </span>
                </Button>
              );
            })}
          </div>

          {(hasMoreLanguages || isAllLanguagesShown) && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 h-auto p-0 text-xs font-medium text-blue-600 hover:text-blue-700"
              onClick={
                isAllLanguagesShown
                  ? handleShowLessLanguages
                  : handleShowMoreLanguages
              }
            >
              {isAllLanguagesShown ? "- Show Less" : "+ Show More"}
              <ChevronDown
                className={cn(
                  "ml-1 h-3.5 w-3.5 transition-transform",
                  isAllLanguagesShown ? "rotate-180" : ""
                )}
              />
            </Button>
          )}
        </section>
        <section className="space-y-2">
          <div className="flex items-center gap-1.5">
            <DollarSign className="text-muted-foreground h-3.5 w-3.5" />
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">
              Price
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-medium text-slate-600">
                {formatCurrency(priceRange[0])}
              </span>
              <span className="text-muted-foreground text-xs">to</span>
              <span className="text-xs font-medium text-slate-600">
                {formatCurrency(priceRange[1])}
              </span>
            </div>
            <Slider
              min={priceBounds[0]}
              max={priceBounds[1]}
              step={10_000}
              value={priceRange as [number, number]}
              onValueChange={(v) =>
                onPriceChange([v[0] ?? priceBounds[0], v[1] ?? priceBounds[1]])
              }
              className="w-full"
            />
          </div>
        </section>
        <Separator />

        <section className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="text-muted-foreground h-4 w-4" />
            <h3 className="text-muted-foreground text-xs font-semibold uppercase">
              Publication Year
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-medium text-slate-600">
                {yearRange[0]}
              </span>
              <span className="text-muted-foreground text-xs">to</span>
              <span className="text-xs font-medium text-slate-600">
                {yearRange[1]}
              </span>
            </div>
            <Slider
              min={yearBounds[0]}
              max={yearBounds[1]}
              step={1}
              value={yearRange as [number, number]}
              onValueChange={(v) =>
                onYearChange([v[0] ?? yearBounds[0], v[1] ?? yearBounds[1]] as [
                  number,
                  number,
                ])
              }
              className="w-full"
            />
          </div>
        </section>

        <Separator />
        <div
          className={`grid grid-cols-2 gap-2 sm:gap-3 ${
            isCompact ? "pt-1" : "pt-2"
          }`}
        >
          <Button
            variant="outline"
            className={`${
              isCompact ? "h-7 text-xs" : "h-8 text-xs sm:h-9 sm:text-sm"
            }`}
            onClick={onReset}
            size="sm"
          >
            <RotateCcw
              className={`${
                isCompact ? "h-3 w-3" : "h-3 w-3 sm:h-4 sm:w-4"
              } mr-1`}
            />
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default memo(BookFilter);
