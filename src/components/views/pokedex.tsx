import { useMemo } from "react";
import { PokedexTable } from "./pokedex-table";
import { pokedexColumns } from "./pokedex-columns";

import { structurePokemonData } from "@/lib/utils";
import { useCurrentSearch, useCurrentFilter, usePokedex } from "@/hooks";

export function Pokedex() {
  const { filter } = useCurrentFilter();
  const { currentSearch } = useCurrentSearch();
  const { data, isLoading, isError, isFetching } = usePokedex();

  const filteredPokemon = useMemo(() => {
    if (data === undefined) {
      return [];
    }

    const structured = structurePokemonData(data);

    if (!currentSearch) {
      return structured;
    }

    return structured.filter((pokemon) => {
      switch (filter) {
        case "Type": {
          const types = pokemon.type.map((type) => type.name);
          return types.some((type) =>
            type.toLowerCase().includes(currentSearch.toLowerCase())
          );
        }

        case "Ability":
          return pokemon.abilities.some((ability) =>
            ability.toLowerCase().includes(currentSearch.toLowerCase())
          );

        case "Move":
          return pokemon.moves.some((move) =>
            move.toLowerCase().includes(currentSearch.toLowerCase())
          );
        default:
          return pokemon.name
            .toLowerCase()
            .includes(currentSearch.toLowerCase());
      }
    });
  }, [data, currentSearch, filter]);

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError || filteredPokemon === undefined) {
    return <p>Error</p>;
  }

  return <PokedexTable columns={pokedexColumns} data={filteredPokemon} />;
}
