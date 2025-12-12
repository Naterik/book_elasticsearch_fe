import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { List, LayoutGrid } from "lucide-react";
import { memo } from "react";
import type { ViewCard } from "@/types";
import { useIsMobile } from "@/hooks/useMobile";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title (A–Z)" },
] as const;

type Props = {
  view: ViewCard;
  onChangeView: (v: ViewCard) => void;
  sortBy: string;
  onChangeSort: (v: string) => void;
  countFilter: number;
  total: number;
};

const BookToolbar = ({
  view,
  onChangeView,
  sortBy,
  onChangeSort,
  countFilter,
  total,
}: Props) => {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col gap-3 sm:gap-4 mb-6 p-3 sm:p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {countFilter > 0 && (
            <>
              <Badge variant="default" className="text-xs sm:text-sm">
                {total}
              </Badge>
              <span className="text-xs sm:text-sm text-muted-foreground">
                results found
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm">
          <span className="text-muted-foreground hidden sm:inline">
            Sort by
          </span>
          <Select value={sortBy} onValueChange={onChangeSort}>
            <SelectTrigger className="h-8 w-full sm:w-[150px] text-xs sm:text-sm">
              <SelectValue placeholder="Sort..." />
            </SelectTrigger>
            <SelectContent align={isMobile ? "center" : "end"}>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="text-xs sm:text-sm"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0">
        <span className="text-xs text-muted-foreground mr-auto ">View</span>
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v: ViewCard) => v && onChangeView(v)}
          className="border rounded-md"
        >
          <ToggleGroupItem
            value="List"
            aria-label="List view"
            className="px-2 py-1.5 sm:py-2 text-xs sm:text-base hover:bg-gray-100 data-[state=on]:bg-gray-800 data-[state=on]:text-white transition-colors"
          >
            <List className="h-4 w-4 sm:h-5 sm:w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Kanban"
            aria-label="Grid view"
            className="px-2 py-1.5 sm:py-2 text-xs sm:text-base hover:bg-gray-100 data-[state=on]:bg-gray-800 data-[state=on]:text-white transition-colors"
          >
            <LayoutGrid className="h-4 w-4 sm:h-5 sm:w-5" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
};

export default memo(BookToolbar);
