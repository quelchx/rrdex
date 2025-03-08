import { memo, useMemo } from "react";
import { usePokedex } from "@/hooks/usePokedex";
import { useSearchFilterStore, useSearchStore } from "@/store";

import { PokedexTable } from "@/components/content/pokedex-table";
import { pokemonColumns } from "@/components/content/pokedex-columns";
import { LoadingSpinner } from "@/components/content/loading-spinner";
import { PokedexSuggestions } from "@/components/content/pokedex-suggestions";

export const Pokedex = memo(() => {
  const { search } = useSearchStore();
  const { searchFilter } = useSearchFilterStore();
  const { data, isLoading, isError } = usePokedex();

  // TODO: Implement search functionality with filters beyonds whats done here
  const filteredPokemon = useMemo(() => {
    if (data === undefined) return [];
    if (search === "") return data;

    return data.filter((pokemon) => {
      switch (searchFilter) {
        case "Name":
          return pokemon.name.toLowerCase().includes(search.toLowerCase());
        case "Type":
          return pokemon.type.some((type) =>
            type.toLowerCase().includes(search.toLowerCase())
          );
        case "Ability":
          return pokemon.abilities.some((ability) =>
            ability.toLowerCase().includes(search.toLowerCase())
          );
        default:
          return data;
      }
    });
  }, [data, search, searchFilter]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-24">
        <p>Failed to load data</p>
      </div>
    );
  }

  return (
    <>
      <PokedexSuggestions
        suggestions={filteredPokemon.map((pokemon) => pokemon.name)}
      />
      <PokedexTable columns={pokemonColumns} data={filteredPokemon} />
    </>
  );
});

Pokedex.displayName = "Pokedex";
