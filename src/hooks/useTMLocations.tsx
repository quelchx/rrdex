import { useQuery } from "@tanstack/react-query";

type TMLocation = {
  no: string;
  name: string;
  info: string;
};

async function fetcher(): Promise<TMLocation[]> {
  try {
    const response = await fetch("/data/tm-list.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch TMs: ${error}`);
  }
}

export function useTMLocations() {
  return useQuery({ queryKey: ["tm-locations"], queryFn: fetcher });
}
