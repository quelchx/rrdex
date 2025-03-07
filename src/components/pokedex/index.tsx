import { usePokedex } from "@/hooks/usePokedex";
import { DataTable } from "./pokemon-table";
import { pokemonColumns } from "./pokemon-columns";
import { useMemo } from "react";

export function Pokedex() {
  const { data, isLoading, isError } = usePokedex();

  const columns = useMemo(() => pokemonColumns, []);
  const filteredPokemon = useMemo(() => {
    if (data === undefined) {
      return [];
    }

    return data;
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Failed to load data</p>
      </div>
    );
  }

  return <DataTable columns={columns} data={filteredPokemon} />;
}
