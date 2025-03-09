import { useQuery } from "@tanstack/react-query";

type OverWorldItem = {
  area: string;
  items: { name: string; location: string }[];
};

async function fetcher(): Promise<OverWorldItem[]> {
  try {
    const response = await fetch("/data/overworld-items.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Error fetching data: ${error}`);
  }
}

export function useOverWorldItems() {
  return useQuery({
    queryKey: ["overworld-items"],
    queryFn: fetcher,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
