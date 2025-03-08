import { useEffect, useState } from "react";
import {
  usePokedexStore,
  useSearchStore,
  useSelectedPokemonStore,
} from "@/store";

import { SearchSuggestions } from "@/components/content/search-suggestions";

type PokedexSuggestionsProps = { suggestions: string[] };

export function PokedexSuggestions(props: PokedexSuggestionsProps) {
  const { suggestions } = props;
  const { pokedex } = usePokedexStore();
  const { search, setSearch } = useSearchStore();
  const { setSelectedPokemon } = useSelectedPokemonStore();
  const [showSuggestions, setShowSuggestions] = useState(false);

  function handleSuggestionSelect(suggestion: string) {
    setSearch(suggestion);
    setShowSuggestions(false);

    const selectedPokemon = pokedex.find((p) => p.name === suggestion);

    if (selectedPokemon) {
      setSelectedPokemon(selectedPokemon);
    }
  }

  useEffect(() => {
    if (search.length > 0) {
      setShowSuggestions(true);
    }
  }, [search]);

  return showSuggestions && search.length > 0 && suggestions.length > 0 ? (
    <div className="relative">
      <SearchSuggestions
        searchQuery={search}
        suggestions={suggestions}
        onSuggestionClick={handleSuggestionSelect}
        onClickOutside={() => setShowSuggestions(false)}
      />
    </div>
  ) : null;
}
