import { columns } from "./columns";
import { PokemonTable } from "./pokemon-table";

import { usePokedex } from "@/hooks";
import { shapeTableData } from "@/lib/utils";

export function Pokedex() {
  const { data, isLoading, isError, isFetching } = usePokedex();

  if (isLoading || isFetching) {
    return <p>Loading...</p>;
  }

  if (isError || data === undefined) {
    return <p>Error</p>;
  }

  return <PokemonTable columns={columns} data={shapeTableData(data)} />;
}
