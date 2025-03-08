import { Pokemon, SearchFilter } from "@/constants/types";
import { atom, useAtom, useSetAtom } from "jotai";

const pokedexAtom = atom<Pokemon[]>([]);
const searchAtom = atom<string>("");
const pokemonDialogAtom = atom<boolean>(false);
const currentPokemonAtom = atom<Pokemon | null>(null);
const currentSearchFilterAtom = atom<SearchFilter>("Name");

const selectedPokemonStoreAtom = atom(
  (get) => get(currentPokemonAtom),
  (_, set, update: Pokemon) => {
    set(currentPokemonAtom, update);
    set(pokemonDialogAtom, true);
  }
);

export function usePokedexStore() {
  const [pokedex, setPokedex] = useAtom(pokedexAtom);
  return { pokedex, setPokedex };
}

export function useSearchStore() {
  const [search, setSearch] = useAtom(searchAtom);
  return { search, setSearch };
}

export function useSearchFilterStore() {
  const [searchFilter, setSearchFilter] = useAtom(currentSearchFilterAtom);
  return { searchFilter, setSearchFilter };
}

export function useSelectedPokemonStore() {
  const resetPokemon = useSetAtom(currentPokemonAtom);
  const [isDialogOpen, setPokemonDialog] = useAtom(pokemonDialogAtom);
  const [selectedPokemon, setSelectedPokemon] = useAtom(
    selectedPokemonStoreAtom
  );

  return {
    selectedPokemon,
    isDialogOpen,
    setSelectedPokemon,
    setPokemonDialog,
    resetCurrentPokemon: () => {
      resetPokemon(null);
      setPokemonDialog(false);
    },
  };
}
