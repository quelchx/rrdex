import { MoveTutorDetails } from "@/constants/types";
import { useQuery } from "@tanstack/react-query";

async function getMoveTutors(): Promise<MoveTutorDetails[]> {
  try {
    const response = await fetch("/data/move-tutors.json");
    return await response.json();
  } catch (error) {
    throw new Error(`Failed to fetch move tutors. Error: ${error}`);
  }
}

export function useMoveTutors() {
  return useQuery({
    queryKey: ["move-tutors"],
    queryFn: getMoveTutors,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
}
