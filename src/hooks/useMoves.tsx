import { MoveDetails } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

async function getMoves(): Promise<{ moves: MoveDetails[] }> {
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
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
