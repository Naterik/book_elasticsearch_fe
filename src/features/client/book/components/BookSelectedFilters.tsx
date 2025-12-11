import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { memo } from "react";

type Props = {
  selectedGenres: string[];
  selectedLanguage: string | null;
  onRemoveGenre: (genre: string) => void;
  onRemoveLanguage: () => void;
  onClearAll: () => void;
};

const BookSelectedFilters = ({
  selectedGenres,
  selectedLanguage,
  onRemoveGenre,
  onRemoveLanguage,
  onClearAll,
}: Props) => {
  const hasFilters = selectedGenres.length > 0 || selectedLanguage;

  if (!hasFilters) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          Selected filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-xs font-medium text-blue-600 hover:text-blue-700 p-0 h-auto"
          onClick={onClearAll}
        >
          Clear all
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedGenres.map((genre) => (
          <Badge
            key={genre}
            variant="outline"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border-gray-300 hover:bg-gray-50"
          >
            <span className="text-xs font-medium">{genre}</span>
            <button
              onClick={() => onRemoveGenre(genre)}
              className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}

        {selectedLanguage && (
          <Badge
            variant="outline"
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border-gray-300 hover:bg-gray-50"
          >
            <span className="text-xs font-medium">{selectedLanguage}</span>
            <button
              onClick={onRemoveLanguage}
              className="ml-1 hover:bg-gray-200 rounded-full p-0.5"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default memo(BookSelectedFilters);
