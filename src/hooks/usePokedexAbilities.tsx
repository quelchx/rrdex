import { Ability } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

async function fetchAbilities(): Promise<Ability[]> {
  try {
    const response = await fetch("/data/abilities.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch pokedex. Error: ${error}`);
  }
}

export function usePokedexAbilities() {
  return useQuery({
    queryKey: ["abilities"],
    queryFn: fetchAbilities,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
