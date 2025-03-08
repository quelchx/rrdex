import { Pokemon } from "@/constants/types";
import { atom, useAtom, useSetAtom } from "jotai";

const searchAtom = atom<string>("");

const pokemonDialogAtom = atom<boolean>(false);
const currentPokemonAtom = atom<Pokemon | null>(null);
const selectedPokemonStoreAtom = atom(
  (get) => get(currentPokemonAtom),
  (_, set, update: Pokemon) => {
    set(currentPokemonAtom, update);
    set(pokemonDialogAtom, true);
  }
);

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

export function useSearchStore() {
  const [search, setSearch] = useAtom(searchAtom);
  return { search, setSearch };
}
