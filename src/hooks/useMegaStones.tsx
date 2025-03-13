import { useQuery } from "@tanstack/react-query";
type MegaStone = {
  name: string;
  description: string;
};

async function fetcher(): Promise<MegaStone[]> {
  try {
    const response = await fetch("/data/mega-stones.json");
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch megastones data: " + error);
  }
}

export const useMegastones = () => {
  return useQuery({
    queryKey: ["megastones"],
    queryFn: fetcher,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
