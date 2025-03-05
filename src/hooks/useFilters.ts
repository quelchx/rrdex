import { useAtom } from "jotai";
import { filterAtom } from "@/store";

export const useFilters = () => {
  const [filter, setFilter] = useAtom(filterAtom);
  return { filter, setFilter };
};
