import { filterAtom } from "@/store";
import { useAtom } from "jotai";

export const useFilters = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  return { filter, setFilter };
};
