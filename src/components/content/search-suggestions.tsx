import { useEffect, useRef } from "react";
import { Search } from "lucide-react";

type SearchSuggestionsProps = {
  suggestions: string[];
  searchQuery: string;
  onSuggestionClick: (suggestion: string) => void;
  onClickOutside: () => void;
};

export function SearchSuggestions(props: SearchSuggestionsProps) {
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const { suggestions, searchQuery, onSuggestionClick, onClickOutside } = props;

  function highlightMatch(suggestion: string) {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const lowerCaseSuggestion = suggestion.toLowerCase();
    const index = lowerCaseSuggestion.indexOf(lowerCaseQuery);

    if (index === -1) return suggestion;

    const before = suggestion.slice(0, index);
    const match = suggestion.slice(index, index + searchQuery.length);
    const after = suggestion.slice(index + searchQuery.length);

    return (
      <>
        <span>{before}</span>
        <span className="font-bold">{match}</span>
        <span>{after}</span>
      </>
    );
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClickOutside]);

  return (
    <div
      ref={suggestionsRef}
      className="absolute top-12 z-10 w-full mt-1 dark:bg-neutral-900 dark:text-white bg-white text-black rounded-lg shadow-lg border overflow-hidden"
    >
      <div className="max-h-36 z-10 overflow-auto scrollbar">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer dark:hover:bg-neutral-800 dark:text-white"
            onClick={() => onSuggestionClick(suggestion)}
          >
            <Search className="h-4 w-4 text-muted-foreground mr-3" />
            <span className="text-sm">{highlightMatch(suggestion)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
