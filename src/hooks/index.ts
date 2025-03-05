import { useAtom } from "jotai";
import { useQuery } from "@tanstack/react-query";

import { getPokedex } from "@/lib/utils";
import { currentSearchAtom, filterAtom } from "@/store";

export function usePokedex() {
  const { data, isLoading, isError, isFetching } = useQuery({
    queryKey: ["pokedex"],
    queryFn: getPokedex,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading, isError, isFetching };
}

export const useCurrentSearch = () => {
  const [currentSearch, setCurrentSearch] = useAtom(currentSearchAtom);

  return {
    currentSearch,
    setCurrentSearch,
  };
};

export const useFilters = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  return { filter, setFilter };
};
