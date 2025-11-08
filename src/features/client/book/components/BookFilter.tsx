import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Filter,
  RotateCcw,
  DollarSign,
  Calendar,
  BookOpen,
  Globe,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/helper";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  genresAll: IGenre[];
  genresSelected: string[];
  onToggleGenre: (value: any, checked: boolean) => void;
  selectedLanguage: string | null;
  onChangeLanguage: (value: string | null) => void;
  languagesAll: ILanguages[] | undefined;

  priceRange: [number, number];
  priceBounds: [number, number];
  onPriceChange: (range: [number, number]) => void;

  yearRange: [number, number];
  yearBounds: [number, number];
  onYearChange: (range: [number, number]) => void;

  onApply: () => void;
  onReset: () => void;
  sticky?: boolean;
  isCompact?: boolean;
};

export default function BookFilter({
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
  onApply,
  onReset,
  sticky = true,
  isCompact = false,
}: Props) {
  const isMobile = useIsMobile();

  const updatePriceMin = (v: number) =>
    onPriceChange([
      Math.min(Math.max(v, priceBounds[0]), priceRange[1]),
      priceRange[1],
    ]);

  const updatePriceMax = (v: number) =>
    onPriceChange([
      priceRange[0],
      Math.max(Math.min(v, priceBounds[1]), priceRange[0]),
    ]);

  const updateYearMin = (v: number) =>
    onYearChange([
      Math.min(Math.max(v, yearBounds[0]), yearRange[1]),
      yearRange[1],
    ]);

  const updateYearMax = (v: number) =>
    onYearChange([
      yearRange[0],
      Math.max(Math.min(v, yearBounds[1]), yearRange[0]),
    ]);

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
            <Badge variant="secondary" className="text-xs">
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
        {/* Genres Section */}
        <section className={isCompact ? "space-y-1" : "space-y-2"}>
          <div className="flex items-center gap-2">
            <BookOpen
              className={`text-muted-foreground ${
                isCompact ? "h-3.5 w-3.5" : "h-4 w-4"
              }`}
            />
            <h3
              className={`font-semibold uppercase text-muted-foreground ${
                isCompact ? "text-xs" : "text-xs"
              }`}
            >
              Genres
            </h3>
          </div>
          <div
            className={`grid grid-cols-2 ${isCompact ? "gap-1.5" : "gap-2"}`}
          >
            {genresAll.map((g) => {
              const checked = genresSelected.includes(g.name);
              const id = `genre-${g.id}`;
              return (
                <label
                  key={g.id}
                  className={`flex items-center gap-2 cursor-pointer rounded-md hover:bg-slate-100 transition-colors ${
                    isCompact ? "p-1" : "p-1.5"
                  }`}
                  htmlFor={id}
                >
                  <Checkbox
                    id={id}
                    checked={checked}
                    className="h-4 w-4"
                    onCheckedChange={(c) => onToggleGenre(g.name, Boolean(c))}
                  />
                  <Label
                    htmlFor={id}
                    className={`cursor-pointer font-medium leading-none ${
                      isCompact ? "text-xs" : "text-xs"
                    }`}
                  >
                    {g.name}
                  </Label>
                </label>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* Genres and Languages in 2-Column Layout */}
        <div className="grid grid-cols-1 gap-4">
          {/* Languages Section */}
          <section className="space-y-2">
            <div className="flex items-center gap-1.5">
              <Globe className="h-3.5 w-3.5 text-muted-foreground" />
              <h3 className="font-semibold text-xs uppercase text-muted-foreground">
                Language
              </h3>
            </div>
            <RadioGroup
              className="grid grid-cols-2 gap-1.5"
              value={selectedLanguage ?? ""}
              onValueChange={(v) => onChangeLanguage(v || null)}
            >
              <label
                className="group flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-100 transition-colors cursor-pointer col-span-2"
                htmlFor="lang-all"
              >
                <RadioGroupItem
                  id="lang-all"
                  value=""
                  className="h-3.5 w-3.5"
                />
                <Label
                  htmlFor="lang-all"
                  className="text-xs font-medium cursor-pointer leading-none"
                >
                  All
                </Label>
              </label>

              {languagesAll?.map((l) => {
                const id = `lang-${l.key}`;
                return (
                  <label
                    key={id}
                    htmlFor={id}
                    className="group flex items-center gap-1.5 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem id={id} value={l.key} className="h-3 w-3" />
                    <div className="flex-1 min-w-0">
                      <Label
                        htmlFor={id}
                        className="text-xs font-medium cursor-pointer leading-none truncate"
                      >
                        {l.key}
                      </Label>
                      <span className="text-xs text-muted-foreground">
                        ({l.doc_count})
                      </span>
                    </div>
                  </label>
                );
              })}
            </RadioGroup>
          </section>

          <Separator />
        </div>
        <section className="space-y-2">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-3.5 w-3.5 text-muted-foreground" />
            <h3 className="font-semibold text-xs uppercase text-muted-foreground">
              Price
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-medium text-slate-600">
                {formatCurrency(priceRange[0])}
              </span>
              <span className="text-xs text-muted-foreground">to</span>
              <span className="text-xs font-medium text-slate-600">
                {formatCurrency(priceRange[1])}
              </span>
            </div>
            <Slider
              min={priceBounds[0]}
              max={priceBounds[1]}
              step={10_000}
              value={priceRange}
              onValueChange={(v) =>
                onPriceChange([v[0] ?? priceBounds[0], v[1] ?? priceBounds[1]])
              }
              className="w-full"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => updatePriceMin(Number(e.target.value))}
                className="flex-1 h-7 px-1.5 py-0.5 text-xs border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                min={priceBounds[0]}
                max={priceRange[1]}
              />
              <span className="text-xs text-muted-foreground">—</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => updatePriceMax(Number(e.target.value))}
                className="flex-1 h-7 px-1.5 py-0.5 text-xs border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                min={priceRange[0]}
                max={priceBounds[1]}
              />
            </div>
          </div>
        </section>
        <Separator />

        {/* Publication Year Section */}
        <section className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-semibold text-xs uppercase text-muted-foreground">
              Publication Year
            </h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs font-medium text-slate-600">
                {yearRange[0]}
              </span>
              <span className="text-xs text-muted-foreground">to</span>
              <span className="text-xs font-medium text-slate-600">
                {yearRange[1]}
              </span>
            </div>
            <Slider
              min={yearBounds[0]}
              max={yearBounds[1]}
              step={1}
              value={yearRange}
              onValueChange={(v) =>
                onYearChange([v[0] ?? yearBounds[0], v[1] ?? yearBounds[1]] as [
                  number,
                  number
                ])
              }
              className="w-full"
            />
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={yearRange[0]}
                onChange={(e) => updateYearMin(Number(e.target.value))}
                className="flex-1 h-7 px-1.5 py-0.5 text-xs border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                min={yearBounds[0]}
                max={yearRange[1]}
              />
              <span className="text-xs text-muted-foreground">—</span>
              <input
                type="number"
                value={yearRange[1]}
                onChange={(e) => updateYearMax(Number(e.target.value))}
                className="flex-1 h-7 px-1.5 py-0.5 text-xs border rounded bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
                min={yearRange[0]}
                max={yearBounds[1]}
              />
            </div>
          </div>
        </section>

        <Separator />

        {/* Action Buttons */}
        <div
          className={`grid grid-cols-2 gap-2 sm:gap-3 ${
            isCompact ? "pt-1" : "pt-2"
          }`}
        >
          <Button
            onClick={onApply}
            className={`bg-blue-600 hover:bg-blue-700 font-medium ${
              isCompact ? "h-7 text-xs" : "h-8 sm:h-9 text-xs sm:text-sm"
            }`}
            size="sm"
          >
            Apply
          </Button>
          <Button
            variant="outline"
            className={`${
              isCompact ? "h-7 text-xs" : "h-8 sm:h-9 text-xs sm:text-sm"
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
}
