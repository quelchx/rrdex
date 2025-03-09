import { Ability } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

async function getAbilities(): Promise<{ abilities: Ability[] }> {
  try {
    const response = await fetch("/data/abilities.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch abilities: ${error}`);
  }
}

export function useAbilities() {
  return useQuery({
    queryKey: ["abilities"],
    queryFn: getAbilities,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
