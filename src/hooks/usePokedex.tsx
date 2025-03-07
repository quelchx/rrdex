import { Pokemon } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

async function fetchPokedex(): Promise<Pokemon[]> {
  try {
    const response = await fetch("/rrdex.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch pokedex. Error: ${error}`);
  }
}

export function usePokedex() {
  return useQuery({
    queryKey: ["pokedex"],
    queryFn: fetchPokedex,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
