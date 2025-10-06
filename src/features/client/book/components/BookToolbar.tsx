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

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title (A–Z)" },
] as const;

type Props = {
  view: "List" | "Kanban";
  onChangeView: (v: "List" | "Kanban") => void;
  sortBy: string;
  onChangeSort: (v: string) => void;
  total: number;
};

export default function BookToolbar({
  view,
  onChangeView,
  sortBy,
  onChangeSort,
  total,
}: Props) {
  return (
    <div className="grid grid-cols-2 items-center mb-4">
      <div className="flex items-center gap-4">
        <ToggleGroup
          type="single"
          value={view}
          onValueChange={(v) => v && onChangeView(v as "List" | "Kanban")}
          className="border rounded-md"
        >
          <ToggleGroupItem
            value="List"
            aria-label="List view"
            className="px-2 hover:bg-gray-400 data-[state=on]:bg-gray-800 data-[state=on]:text-white"
          >
            <List className="h-5 w-5" />
          </ToggleGroupItem>
          <ToggleGroupItem
            value="Kanban"
            aria-label="Kanban view"
            className="px-2 hover:bg-gray-400 data-[state=on]:bg-gray-800 data-[state=on]:text-white"
          >
            <LayoutGrid className="h-5 w-5" />
          </ToggleGroupItem>
        </ToggleGroup>

        <div className="flex items-center gap-2">
          <Badge className="rounded-md px-2 py-1 text-base">{total}</Badge>
          <span className="text-sm text-muted-foreground">results found</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <span className="text-sm text-muted-foreground">Sort by</span>
        <Select value={sortBy} onValueChange={onChangeSort}>
          <SelectTrigger className="h-8 w-[160px]">
            <SelectValue placeholder="Most relevant" />
          </SelectTrigger>
          <SelectContent align="end">
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
