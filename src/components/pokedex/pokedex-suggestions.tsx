import {
  usePokedexStore,
  useSearchStore,
  useSelectedPokemonStore,
} from "@/store";
import { SearchSuggestions } from "../search-suggestions";
import { useEffect, useState } from "react";

type PokedexSuggestionsProps = {
  suggestions: string[];
};

export function PokedexSuggestions(props: PokedexSuggestionsProps) {
  // const { searchFilter } = useSearchFilterStore();
  const { pokedex } = usePokedexStore();
  const { setSelectedPokemon } = useSelectedPokemonStore();
  const { search, setSearch } = useSearchStore();
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

  return showSuggestions &&
    search.length > 0 &&
    props.suggestions.length > 0 ? (
    <div className="relative">
      <SearchSuggestions
        searchQuery={search}
        suggestions={props.suggestions}
        onSuggestionClick={handleSuggestionSelect}
        onClickOutside={() => setShowSuggestions(false)}
      />
    </div>
  ) : null;
}
