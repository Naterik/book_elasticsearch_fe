import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";
import type { IBackendRes, IModelPaginate } from "@/types/api/response.types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface InfiniteSelectProps<T> {
  value?: string;
  onChange: (value: string) => void;
  fetchFn: (
    page: number,
    search: string
  ) => Promise<IBackendRes<IModelPaginate<T>>>;
  queryKey: string;
  label: string;
  getItemValue: (item: T) => string;
  getItemLabel: (item: T) => string;
  modal?: boolean;
  initialLabel?: string;
}

export function InfiniteSelect<T>({
  value,
  onChange,
  fetchFn,
  queryKey,
  label,
  getItemValue,
  getItemLabel,
  modal = false,
  initialLabel,
}: InfiniteSelectProps<T>) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(
    null
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: [queryKey, debouncedSearch],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await fetchFn(pageParam, debouncedSearch);
        return res.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (lastPage.pagination.currentPage < lastPage.pagination.totalPages) {
          return lastPage.pagination.currentPage + 1;
        }
        return undefined;
      },
    });

  const flattenData = data?.pages.flatMap((page) => page.result) || [];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Logic for infinite scroll intersection observer
  useEffect(() => {
    if (!open || !containerNode) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, root: containerNode }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [
    open,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    containerNode,
    data,
  ]);

  const selectedItem = flattenData.find((item) => getItemValue(item) === value);

  // If we have a value but it's not in the list (e.g. initial load),
  // we might want to display something.
  // However, `selectedItem` might be undefined if the page containing it isn't loaded.
  // This is a common issue with infinite select.
  // For now, we assume standard usage or that we accept just showing the value if not found,
  // OR we can pass an `initialData` prop if needed.
  // But usually for "Edit", we might need to fetch the specific item separately if not in list.
  // For simplicity here, we display the label if found, or just "Select..." if not.
  // To improve, we can allow passing a `selectedLabel` prop from parent.

  return (
    <Popover open={open} onOpenChange={setOpen} modal={modal}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <span className="truncate text-left">
            {selectedItem
              ? getItemLabel(selectedItem)
              : initialLabel
                ? initialLabel
                : "Select " + label}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="max-w-[--radix-popover-trigger-width] p-0"
        align="start"
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={`Search ${label}...`}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList
            ref={setContainerNode}
            className="max-h-[200px] overflow-y-auto"
          >
            {isLoading && (
              <div className="flex items-center justify-center py-6">
                <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
              </div>
            )}

            {!isLoading && flattenData.length === 0 && (
              <CommandEmpty>No {label} found.</CommandEmpty>
            )}

            <CommandGroup>
              {flattenData.map((item) => (
                <CommandItem
                  key={getItemValue(item)}
                  value={getItemLabel(item)} // search is handled by server, but cmdk require value to not filter out everything if strict
                  onSelect={() => {
                    onChange(getItemValue(item));
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4 shrink-0",
                      value === getItemValue(item) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <span className="truncate">{getItemLabel(item)}</span>
                </CommandItem>
              ))}
            </CommandGroup>

            {hasNextPage && (
              <div
                ref={loadMoreRef}
                className="flex items-center justify-center p-2"
              >
                {isFetchingNextPage ? (
                  <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
                ) : (
                  <span className="block h-1 w-full"></span>
                )}
              </div>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
