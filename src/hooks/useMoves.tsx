import { MoveDetails } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

async function fetcher(): Promise<{ moves: MoveDetails[] }> {
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
    queryFn: fetcher,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
