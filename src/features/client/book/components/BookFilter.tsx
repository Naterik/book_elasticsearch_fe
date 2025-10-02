import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Funnel } from "lucide-react";

type Props = {
  genresAll: string[];
  genresSelected: string[];
  onToggleGenre: (value: string, checked: boolean) => void;

  languagesAll: string[];
  languagesSelected: string[];
  onToggleLanguage: (value: string, checked: boolean) => void;

  priceRange: [number, number];
  priceBounds: [number, number];
  onPriceChange: (range: [number, number]) => void;

  yearRange: [number, number];
  yearBounds: [number, number];
  onYearChange: (range: [number, number]) => void;

  onApply: () => void;
  onReset: () => void;
  sticky?: boolean; // tùy chọn: dính bên trái khi scroll
};

export default function BookFilter({
  genresAll,
  genresSelected,
  onToggleGenre,
  languagesAll,
  languagesSelected,
  onToggleLanguage,
  priceRange,
  priceBounds,
  onPriceChange,
  yearRange,
  yearBounds,
  onYearChange,
  onApply,
  onReset,
  sticky = true,
}: Props) {
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

  return (
    <Card
      className={`w-full max-w-[320px] shrink-0 ${
        sticky ? "sticky top-24" : ""
      }`}
    >
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Funnel />
          Filter by
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Genres */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Genres</h3>
          <div className="space-y-2">
            {genresAll.map((g) => {
              const checked = genresSelected.includes(g);
              return (
                <label
                  key={g}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(c) => onToggleGenre(g, Boolean(c))}
                    id={`genre-${g}`}
                  />
                  <Label htmlFor={`genre-${g}`}>{g}</Label>
                </label>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* Languages */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Languages</h3>
          <div className="space-y-2">
            {languagesAll.map((l) => {
              const checked = languagesSelected.includes(l);
              return (
                <label
                  key={l}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <Checkbox
                    checked={checked}
                    onCheckedChange={(c) => onToggleLanguage(l, Boolean(c))}
                    id={`lang-${l}`}
                  />
                  <Label htmlFor={`lang-${l}`}>{l}</Label>
                </label>
              );
            })}
          </div>
        </section>

        <Separator />

        {/* Price */}
        <section>
          <h3 className="text-xl font-semibold mb-3">Price</h3>
          <div className="space-y-4">
            <Slider
              min={priceBounds[0]}
              max={priceBounds[1]}
              step={10_000}
              value={priceRange}
              onValueChange={(v) =>
                onPriceChange([
                  v[0] ?? priceBounds[0],
                  v[1] ?? priceBounds[1],
                ] as [number, number])
              }
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="price-min" className="whitespace-nowrap">
                  Min
                </Label>
                <input
                  id="price-min"
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => updatePriceMin(Number(e.target.value))}
                  className="w-[120px] border rounded px-2 py-1"
                />
              </div>
              <span className="text-muted-foreground">—</span>
              <div className="flex items-center gap-2">
                <Label htmlFor="price-max" className="whitespace-nowrap">
                  Max
                </Label>
                <input
                  id="price-max"
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => updatePriceMax(Number(e.target.value))}
                  className="w-[120px] border rounded px-2 py-1"
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
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Label htmlFor="year-min" className="whitespace-nowrap">
                  From
                </Label>
                <input
                  id="year-min"
                  type="number"
                  value={yearRange[0]}
                  onChange={(e) => updateYearMin(Number(e.target.value))}
                  className="w-[100px] border rounded px-2 py-1"
                />
              </div>
              <span className="text-muted-foreground">—</span>
              <div className="flex items-center gap-2">
                <Label htmlFor="year-max" className="whitespace-nowrap">
                  To
                </Label>
                <input
                  id="year-max"
                  type="number"
                  value={yearRange[1]}
                  onChange={(e) => updateYearMax(Number(e.target.value))}
                  className="w-[100px] border rounded px-2 py-1"
                />
              </div>
            </div>
          </div>
        </section>

        <Separator />

        <div className="flex gap-2">
          <Button className="flex-1" onClick={onApply}>
            Apply
          </Button>
          <Button variant="outline" className="flex-1" onClick={onReset}>
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
