import type { IInstantSearchResponse } from "@/features/client/book/services";
import { HighlightText } from "@/utils/text-highlight";
import { Search } from "lucide-react";

interface SearchDropdownProps {
  data: IInstantSearchResponse | null;
  loading: boolean;
  onSelect: (suggestion: { id: number | string; text: string } | string) => void;
  onBookSelect: (id: number | string) => void;
  hideBooks?: boolean;
  hideSuggestions?: boolean;
}

export const SearchDropdown = ({
  data,
  loading,
  onSelect,
  onBookSelect,
  hideBooks = false,
  hideSuggestions = false,
}: SearchDropdownProps) => {
  if (loading) {
    return (
      <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-md border border-slate-200 mt-2 z-50 p-6 text-center">
        <div className="inline-block animate-spin rounded-full h-5 w-5 border-2 border-slate-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!data) return null;
  const hasSuggestions = data.suggestions?.titles?.length > 0;
  const hasBooks = data.books?.length > 0;

  if (!hasSuggestions && !hasBooks) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl rounded-xl border border-slate-100 mt-2 z-50 overflow-hidden ring-1 ring-black/5 animate-in fade-in slide-in-from-top-1 duration-200">
      <div className="max-h-[80vh] overflow-y-auto text-left">
        {/* Suggestions Section */}
        {!hideSuggestions && hasSuggestions && (
          <div className="bg-slate-50/50 border-b border-slate-100 py-1">
            {data.suggestions.titles.map((suggestion, idx) => (
              <div
                key={idx}
                onClick={() => onSelect(suggestion)}
                className="px-4 py-3 hover:bg-blue-50/80 cursor-pointer flex items-center gap-3 group transition-colors"
                title={typeof suggestion === "string" ? suggestion : suggestion.text}
              >
                <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700 transition-colors">
                  <HighlightText
                    text={
                      typeof suggestion === "string" ? suggestion : suggestion.text
                    }
                  />
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Books Section */}
        {!hideBooks && hasBooks && (
          <div className="bg-white">
             {hasSuggestions && <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider bg-white">Books</div>}
            <div className="divide-y divide-slate-50">
              {data.books.map((book) => {
                // Determine what to show
                // Highlight priority: Title -> ShortDesc -> DetailDesc
                const titleHighlight = book.highlight?.title?.[0];
                const descHighlight =
                  book.highlight?.shortDesc?.[0] || book.highlight?.detailDesc?.[0];

                return (
                  <div
                    key={book.id}
                    onClick={() => onBookSelect(book.id)}
                    className="p-3 pl-4 hover:bg-slate-50 cursor-pointer flex gap-4 transition-all group border-l-2 border-transparent hover:border-blue-500"
                  >
                    {/* Thumbnail */}
                    {/* <div className="shrink-0 w-12 h-16 bg-slate-100 rounded-md overflow-hidden border border-slate-200 shadow-sm relative group-hover:shadow-md transition-shadow">
                      <img
                        src={book.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div> */}

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-center py-0.5">
                      {/* Title */}
                      <div className="text-sm font-semibold text-slate-800 line-clamp-1 group-hover:text-blue-700 transition-colors">
                        {titleHighlight ? (
                          <HighlightText text={titleHighlight} />
                        ) : (
                          book.title
                        )}
                      </div>

                      {/* Snippet (Context!) */}
                      {descHighlight && (
                        <div className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          &ldquo;
                          <HighlightText
                            text={descHighlight}
                            highlightClass="font-bold text-slate-700 bg-yellow-100/80 px-0.5 rounded"
                          />
                          &rdquo;
                        </div>
                      )}
                      {!descHighlight && book.shortDesc && (
                        <div className="text-xs text-slate-500 mt-1 line-clamp-1">
                          {book.shortDesc}
                        </div>
                      )}
                      {!descHighlight && !book.shortDesc && (
                        <div className="text-xs text-slate-400 mt-1">
                          {book.authors?.name || "Unknown Author"}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
