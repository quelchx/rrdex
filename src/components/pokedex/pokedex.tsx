import { usePokedex } from "@/hooks/usePokedex";
import { PokedexTable } from "./pokedex-table";
import { pokemonColumns } from "./pokedex-columns";
import { memo, useMemo } from "react";
import { LoadingSpinner } from "../theme/loading-spinner";
import { useSearchStore } from "@/store";

export const Pokedex = memo(() => {
  const { search } = useSearchStore();
  const { data, isLoading, isError } = usePokedex();

  const columns = useMemo(() => pokemonColumns, []);
  const filteredPokemon = useMemo(() => {
    if (data === undefined) return [];
    if (search === "") return data;

    return data.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (isLoading) {
    return (
      <LoadingSpinner className="flex items-center justify-center w-full h-24" />
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-24">
        <p>Failed to load data</p>
      </div>
    );
  }

  return <PokedexTable columns={columns} data={filteredPokemon} />;
});

Pokedex.displayName = "Pokedex";
