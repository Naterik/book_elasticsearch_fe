import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  genresAll: any[];
  genresSelected: string[];
  onToggleGenre: (value: string, checked: boolean) => void;
};

const ITEMS_PER_PAGE = 8;

export default function BookGenreFilter({
  genresAll,
  genresSelected,
  onToggleGenre,
}: Props) {
  const [visibleGenresCount, setVisibleGenresCount] = useState(ITEMS_PER_PAGE);

  const visibleGenres = genresAll.slice(0, visibleGenresCount);
  const hasMoreGenres = visibleGenresCount < genresAll.length;
  const isAllGenresShown = visibleGenresCount >= genresAll.length;

  const handleShowMoreGenres = () => {
    setVisibleGenresCount((prev) => prev + ITEMS_PER_PAGE);
  };

  const handleShowLessGenres = () => {
    setVisibleGenresCount(ITEMS_PER_PAGE);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4">
      <div className="flex flex-wrap gap-2 items-center">
        {visibleGenres.map((g) => {
          const isSelected = genresSelected.includes(g.name);
          return (
            <Button
              key={g.id}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              className={cn(
                "text-xs font-medium transition-all whitespace-nowrap",
                isSelected
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "hover:bg-slate-100"
              )}
              onClick={() => onToggleGenre(g.name, !isSelected)}
            >
              {g.name}
            </Button>
          );
        })}

        {(hasMoreGenres || isAllGenresShown) && (
          <Button
            variant="ghost"
            size="sm"
            className="text-xs font-medium text-blue-600 hover:text-blue-700 p-0 h-auto"
            onClick={
              isAllGenresShown ? handleShowLessGenres : handleShowMoreGenres
            }
          >
            {isAllGenresShown ? "- Show Less" : "+ Show More"}
            <ChevronDown
              className={cn(
                "h-3.5 w-3.5 ml-1 transition-transform",
                isAllGenresShown ? "rotate-180" : ""
              )}
            />
          </Button>
        )}
      </div>
    </div>
  );
}
