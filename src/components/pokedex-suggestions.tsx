import { useEffect, useState } from "react";
import {
  usePokedexStore,
  useSearchFilterStore,
  useSearchStore,
  useSelectedPokemonStore,
} from "@/store";

import { SearchSuggestions } from "@/components/search-suggestions";

type PokedexSuggestionsProps = {
  suggestions: string[];
};

type SuggestionListProps = {
  suggestions: string[];
  onClickOutside: () => void;
  onSetShowSuggestions: (show: boolean) => void;
};

function NameSuggestions(props: SuggestionListProps) {
  const { pokedex } = usePokedexStore();
  const { suggestions, onClickOutside, onSetShowSuggestions } = props;
  const { search, setSearch } = useSearchStore();
  const { setSelectedPokemon } = useSelectedPokemonStore();

  function handleSuggestionSelect(suggestion: string) {
    setSearch(suggestion);
    onSetShowSuggestions(false);
    const selectedPokemon = pokedex.find((p) => p.name === suggestion);
    if (selectedPokemon) {
      setSelectedPokemon(selectedPokemon);
    }
  }

  return (
    <SearchSuggestions
      searchQuery={search}
      suggestions={suggestions}
      onSuggestionClick={handleSuggestionSelect}
      onClickOutside={onClickOutside}
    />
  );
}

export function PokedexSuggestions(props: PokedexSuggestionsProps) {
  const { search } = useSearchStore();
  const { searchFilter } = useSearchFilterStore();
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (search.length > 0) {
      setShowSuggestions(true);
    }
  }, [search]);

  return showSuggestions &&
    search.length > 0 &&
    props.suggestions.length > 0 ? (
    <div className="relative">
      {searchFilter === "Name" ? (
        <NameSuggestions
          suggestions={props.suggestions}
          onClickOutside={() => setShowSuggestions(false)}
          onSetShowSuggestions={setShowSuggestions}
        />
      ) : searchFilter === "Type" ? (
        <></>
      ) : null}
    </div>
  ) : null;
}
