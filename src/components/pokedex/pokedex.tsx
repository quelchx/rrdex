import { usePokedex } from "@/hooks/usePokedex";
import { PokedexTable } from "./pokedex-table";
import { pokemonColumns } from "./pokedex-columns";
import { memo, useMemo } from "react";
import { LoadingSpinner } from "../loading-spinner";
import { useSearchFilterStore, useSearchStore } from "@/store";
import { PokedexSuggestions } from "./pokedex-suggestions";

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
