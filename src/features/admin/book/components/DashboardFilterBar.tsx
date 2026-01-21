import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Check, PlusCircle, X } from "lucide-react";
import type { AdminBookSearchParams } from "@/types/entities/book";

interface DashboardFilterBarProps {
  filters: AdminBookSearchParams;
  onFilterChange: (key: keyof AdminBookSearchParams, value: any) => void;
  onReset: () => void;
  languages?: { label: string; value: string; count?: number }[];
  genres?: { label: string; value: string }[];
}

export const DashboardFilterBar = ({
  filters,
  onFilterChange,
  onReset,
  languages = [],
  genres = [],
}: DashboardFilterBarProps) => {
  const selectedGenreIds = filters.genreIds
    ? filters.genreIds.split(",").filter(Boolean)
    : [];

  // --- Handlers ---
  const handleGenreSelect = (value: string) => {
    const currentIds = [...selectedGenreIds];
    if (currentIds.includes(value)) {
      const newIds = currentIds.filter((id) => id !== value);
      onFilterChange("genreIds", newIds.length > 0 ? newIds.join(",") : undefined);
    } else {
      currentIds.push(value);
      onFilterChange("genreIds", currentIds.join(","));
    }
  };

  const handleStatusSelect = (status: string) => {
    // Single select toggle equivalent behavior
    if (filters.stock === status) {
       onFilterChange("stock", undefined);
    } else {
       onFilterChange("stock", status);
    }
  };

  const handleLanguageSelect = (lang: string) => {
      if (filters.language === lang) {
         onFilterChange("language", undefined);
      } else {
         onFilterChange("language", lang);
      }
  };

  const isFiltered = !!filters.q || !!filters.stock || !!filters.genreIds || !!filters.language;

  // --- Reusable Faceted Filter UI Pattern (Inlined for simplicity) ---
  const FacetedFilter = ({
      title,
      selectedValues,
      options,
      onSelect,
      onClear
  }: {
      title: string;
      selectedValues: Set<string>;
      options: { label: string; value: string; count?: number; icon?: React.ComponentType<{ className?: string }> }[];
      onSelect: (val: string) => void;
      onClear: () => void;
  }) => {
      return (
          <Popover>
              <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-8 border-dashed">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      {title}
                      {selectedValues.size > 0 && (
                          <>
                              <Separator orientation="vertical" className="mx-2 h-4" />
                              <Badge
                                  variant="secondary"
                                  className="rounded-sm px-1 font-normal lg:hidden"
                              >
                                  {selectedValues.size}
                              </Badge>
                              <div className="hidden space-x-1 lg:flex">
                                  {selectedValues.size > 2 ? (
                                    <>
                                     {options
                                         .filter((option) => selectedValues.has(option.value))
                                         .slice(0, 2)
                                         .map((option) => (
                                             <Badge
                                                 variant="secondary"
                                                 key={option.value}
                                                 className="rounded-sm px-1 font-normal"
                                             >
                                                 {option.label}
                                             </Badge>
                                         ))}
                                      <Badge
                                          variant="secondary"
                                          className="rounded-sm px-1 font-normal"
                                      >
                                          +{selectedValues.size - 2} more
                                      </Badge>
                                    </>
                                  ) : (
                                      options
                                          .filter((option) => selectedValues.has(option.value))
                                          .map((option) => (
                                              <Badge
                                                  variant="secondary"
                                                  key={option.value}
                                                  className="rounded-sm px-1 font-normal"
                                              >
                                                  {option.label}
                                              </Badge>
                                          ))
                                  )}
                              </div>
                          </>
                      )}
                  </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                  <Command>
                      <CommandInput placeholder={title} />
                      <CommandList>
                          <CommandEmpty>No results found.</CommandEmpty>
                          <CommandGroup>
                              {options.map((option) => {
                                  const isSelected = selectedValues.has(option.value);
                                  return (
                                      <CommandItem
                                          key={option.value}
                                          onSelect={() => onSelect(option.value)}
                                      >
                                          <div
                                              className={cn(
                                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                  isSelected
                                                      ? "bg-primary text-primary-foreground"
                                                      : "opacity-50 [&_svg]:invisible"
                                              )}
                                          >
                                              <Check className={cn("h-4 w-4")} />
                                          </div>
                                          {option.icon && (
                                              <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                                          )}
                                          <span>{option.label}</span>
                                          {option.count !== undefined && (
                                              <span className="ml-auto flex h-4 w-4 items-center justify-center font-mono text-xs">
                                                  {option.count}
                                              </span>
                                          )}
                                      </CommandItem>
                                  );
                              })}
                          </CommandGroup>
                          {selectedValues.size > 0 && (
                              <>
                                  <CommandSeparator />
                                  <CommandGroup>
                                      <CommandItem
                                          onSelect={onClear}
                                          className="justify-center text-center"
                                      >
                                          Clear filters
                                      </CommandItem>
                                  </CommandGroup>
                              </>
                          )}
                      </CommandList>
                  </Command>
              </PopoverContent>
          </Popover>
      );
  };


  return (
    <div className="flex flex-1 items-center space-x-2 flex-wrap gap-y-2">
      {/* Search */}
      <Input
        placeholder="Filter books..."
        value={filters.q || ""}
        onChange={(e) => onFilterChange("q", e.target.value)}
        className="h-8 w-[150px] lg:w-[250px]"
      />

      {/* Stock Filter */}
      <FacetedFilter
        title="Status"
        selectedValues={new Set(filters.stock ? [filters.stock] : [])}
        options={[
            { label: "Available", value: "available" },
            { label: "Out of Stock", value: "out_of_stock" }
        ]}
        onSelect={handleStatusSelect}
        onClear={() => onFilterChange("stock", undefined)}
      />

      {/* Language Filter */}
      <FacetedFilter
          title="Language"
          selectedValues={new Set(filters.language ? [filters.language] : [])}
          options={languages.map(l => ({ label: l.label, value: l.value, count: l.count }))}
          onSelect={handleLanguageSelect}
          onClear={() => onFilterChange("language", undefined)}
      />

      {/* Genres Filter */}
       <FacetedFilter
          title="Genre"
          selectedValues={new Set(selectedGenreIds)}
          options={genres.map(g => ({ label: g.label, value: g.value }))}
          onSelect={handleGenreSelect}
          onClear={() => onFilterChange("genreIds", undefined)}
      />

      {/* Reset Button */}
      {isFiltered && (
        <Button
          variant="ghost"
          onClick={onReset}
          className="h-8 px-2 lg:px-3"
        >
          Reset
          <X className="ml-2 h-4 w-4" />
        </Button>
      )}
    </div>
  );
};
