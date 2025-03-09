import { Pokemon } from "@/constants/types";
import { usePokedexStore } from "@/store";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

async function fetchPokedex(): Promise<Pokemon[]> {
  try {
    const response = await fetch("/data/pokedex.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch pokedex. Error: ${error}`);
  }
}

export function usePokedex() {
  const { pokedex, setPokedex } = usePokedexStore();
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["pokedex"],
    queryFn: fetchPokedex,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data !== undefined) {
      setPokedex(data);
    }
  }, [data, setPokedex]);

  return { data: pokedex, isLoading, isError, isFetching };
}
