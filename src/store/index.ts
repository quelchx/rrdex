import { createContext } from "react";
import { atom, useAtom } from "jotai";
import { ThemeProviderState } from "@/constants/types";

export const searchAtom = atom<string>("");
export function useSearchStore() {
  const [search, setSearch] = useAtom(searchAtom);
  return { search, setSearch };
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);
