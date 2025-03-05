import { useAtom } from "jotai";
import { currentSearchAtom } from "@/store";

export const useCurrentSearch = () => {
  const [currentSearch, setCurrentSearch] = useAtom(currentSearchAtom);

  return { currentSearch, setCurrentSearch };
};
