import { memo, useMemo, Suspense, lazy } from "react";
import { usePokedex } from "@/hooks/usePokedex";
import { useSearchFilterStore, useSearchStore } from "@/store";

import { PokedexTable } from "@/components/content/pokedex-table";
import { pokemonColumns } from "@/components/content/pokedex-columns";

import { FetchError } from "./fetch-error";
import { LoadingBlocks } from "./loading-blocks";

// lazy load pokedex suggestions
const LazyPokedexSuggestions = lazy(() =>
  import("./pokedex-suggestions").then((module) => ({
    default: module.PokedexSuggestions,
  }))
);

export const Pokedex = memo(() => {
  const { search } = useSearchStore();
  const { searchFilter } = useSearchFilterStore();
  const { data, isLoading, isError } = usePokedex();

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
        case "Level Up Moves":
          return pokemon.levelUpMoves.some((move) =>
            move.name.toLowerCase().includes(search.toLowerCase())
          );
        case "TMS":
          return pokemon.learnableTechnicalMachines.some((move) =>
            move.name.toLowerCase().includes(search.toLowerCase())
          );
        case "Egg Moves":
          return pokemon.eggMoves.some((move) =>
            move.name.toLowerCase().includes(search.toLowerCase())
          );
        case "Tutor Moves":
          return pokemon.tutorMoves.some((move) =>
            move.name.toLowerCase().includes(search.toLowerCase())
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

  if (isLoading) return <LoadingBlocks />;
  if (isError) {
    <FetchError message="Unable to fetch Pokémon data. Please try again later." />;
  }

  return (
    <>
      <Suspense>
        <LazyPokedexSuggestions
          suggestions={filteredPokemon.map((pokemon) => pokemon.name)}
        />
      </Suspense>
      <PokedexTable columns={pokemonColumns} data={filteredPokemon} />
    </>
  );
});

Pokedex.displayName = "Pokedex";
