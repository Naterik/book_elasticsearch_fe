import BookPage from "./Books";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

type Genre = "A" | "B" | "C"; // ví dụ
type Language = "EN" | "VI" | "JP"; // ví dụ

const ALL_GENRES: Genre[] = ["A", "B", "C"];
const ALL_LANGUAGES: Language[] = ["EN", "VI", "JP"];

export default function Filter() {
  const [search, setSearch] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [languages, setLanguages] = useState<Language[]>([]);
  const PRICE_MIN = 120_000;
  const PRICE_MAX = 14_000_000;
  const [priceRange, setPriceRange] = useState<[number, number]>([
    PRICE_MIN,
    1_500_000,
  ]);
  const YEAR_MIN = 1999;
  const YEAR_MAX = 2025;
  const [yearRange, setYearRange] = useState<[number, number]>([2005, 2025]);
  const toggleGenre = (value: Genre, checked: boolean) => {
    setGenres((prev) =>
      checked ? [...prev, value] : prev.filter((g) => g !== value)
    );
  };

  const toggleLanguage = (value: Language, checked: boolean) => {
    setLanguages((prev) =>
      checked ? [...prev, value] : prev.filter((l) => l !== value)
    );
  };

  const handleSearch = () => {
    console.log("search", search, { genres, languages, priceRange, yearRange });
  };

  const updatePriceMin = (v: number) =>
    setPriceRange(([_, max]) => [Math.min(Math.max(v, PRICE_MIN), max), max]);
  const updatePriceMax = (v: number) =>
    setPriceRange(([min, _]) => [min, Math.max(Math.min(v, PRICE_MAX), min)]);

  const updateYearMin = (v: number) =>
    setYearRange(([_, max]) => [Math.min(Math.max(v, YEAR_MIN), max), max]);
  const updateYearMax = (v: number) =>
    setYearRange(([min, _]) => [min, Math.max(Math.min(v, YEAR_MAX), min)]);

  return (
    <div className="container mx-auto">
      {/* Search */}
      <div className="flex items-center justify-center gap-2 my-5">
        <Input
          placeholder="input search text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[400px]"
        />
        <Button size="lg" onClick={handleSearch}>
          Search
        </Button>
        {search && (
          <Button variant="ghost" onClick={() => setSearch("")}>
            Clear
          </Button>
        )}
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filter */}
        <Card className="w-full max-w-[320px] shrink-0">
          <CardHeader>
            <CardTitle>Filter by</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h3 className="text-xl font-semibold mb-3">Genres</h3>
              <div className="space-y-2">
                {ALL_GENRES.map((g) => {
                  const checked = genres.includes(g);
                  return (
                    <label
                      key={g}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(c) => toggleGenre(g, Boolean(c))}
                        id={`genre-${g}`}
                      />
                      <Label htmlFor={`genre-${g}`}>{g}</Label>
                    </label>
                  );
                })}
              </div>
            </section>

            <Separator />
            <section>
              <h3 className="text-xl font-semibold mb-3">Languages</h3>
              <div className="space-y-2">
                {ALL_LANGUAGES.map((l) => {
                  const checked = languages.includes(l);
                  return (
                    <label
                      key={l}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(c) => toggleLanguage(l, Boolean(c))}
                        id={`lang-${l}`}
                      />
                      <Label htmlFor={`lang-${l}`}>{l}</Label>
                    </label>
                  );
                })}
              </div>
            </section>

            <Separator />
            <section>
              <h3 className="text-xl font-semibold mb-3">Price</h3>

              <div className="space-y-4">
                <Slider
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={10_000}
                  value={priceRange}
                  onValueChange={(v) =>
                    setPriceRange([v[0] ?? PRICE_MIN, v[1] ?? PRICE_MAX] as [
                      number,
                      number
                    ])
                  }
                />

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="price-min" className="whitespace-nowrap">
                      Min
                    </Label>
                    <Input
                      id="price-min"
                      type="number"
                      value={priceRange[0]}
                      onChange={(e) => updatePriceMin(Number(e.target.value))}
                      className="w-[120px]"
                    />
                  </div>
                  <span className="text-muted-foreground">—</span>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="price-max" className="whitespace-nowrap">
                      Max
                    </Label>
                    <Input
                      id="price-max"
                      type="number"
                      value={priceRange[1]}
                      onChange={(e) => updatePriceMax(Number(e.target.value))}
                      className="w-[120px]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            {/* Publish year */}
            <section>
              <h3 className="text-xl font-semibold mb-3">Publish</h3>

              <div className="space-y-4">
                <Slider
                  min={YEAR_MIN}
                  max={YEAR_MAX}
                  step={1}
                  value={yearRange}
                  onValueChange={(v) =>
                    setYearRange([v[0] ?? YEAR_MIN, v[1] ?? YEAR_MAX] as [
                      number,
                      number
                    ])
                  }
                />

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="year-min" className="whitespace-nowrap">
                      From
                    </Label>
                    <Input
                      id="year-min"
                      type="number"
                      value={yearRange[0]}
                      onChange={(e) => updateYearMin(Number(e.target.value))}
                      className="w-[100px]"
                    />
                  </div>
                  <span className="text-muted-foreground">—</span>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="year-max" className="whitespace-nowrap">
                      To
                    </Label>
                    <Input
                      id="year-max"
                      type="number"
                      value={yearRange[1]}
                      onChange={(e) => updateYearMax(Number(e.target.value))}
                      className="w-[100px]"
                    />
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <div className="flex gap-2">
              <Button className="flex-1" onClick={handleSearch}>
                Apply
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setSearch("");
                  setGenres([]);
                  setLanguages([]);
                  setPriceRange([PRICE_MIN, 1_500_000]);
                  setYearRange([2005, YEAR_MAX]);
                }}
              >
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content area */}
        <div className="flex-1 min-w-0">
          <BookPage />
        </div>
      </div>
    </div>
  );
}
