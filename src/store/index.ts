import { atom, useAtom } from "jotai";

export const searchAtom = atom<string>("");
export function useSearchStore() {
  const [search, setSearch] = useAtom(searchAtom);
  return { search, setSearch };
}
