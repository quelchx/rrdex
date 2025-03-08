import { useQuery } from "@tanstack/react-query";

// Keeping this type here because its only accessed in this file
type PokemonMove = {
  ID: number;
  name: string;
  power: number;
  type: string;
  accuracy: number;
  pp: number;
  secondaryEffectChance: number;
  target: number;
  priority: number;
  split: number;
  description: string;
};

async function getMoves(): Promise<{ moves: PokemonMove[] }> {
  try {
    const response = await fetch("/data/moves.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching moves: ${error}`);
  }
}

export function useMoves() {
  return useQuery({
    queryKey: ["moves"],
    queryFn: getMoves,
  });
}
