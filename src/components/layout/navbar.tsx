import { NavLink } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { useSelectedPokemonStore } from "@/store";
import { LinkMenu } from "./link-menu";

export function Navbar() {
  const { setPokemonDialog, resetCurrentPokemon } = useSelectedPokemonStore();

  function handleNavigateHome() {
    setPokemonDialog(false);
    resetCurrentPokemon();
  }

  return (
    <div className="border-b w-full flex justify-center sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <header className="w-full max-w-7xl ">
        <div className="flex h-14 items-center justify-between px-6 py-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-red-600"></div>
            <NavLink
              to="/"
              className="font-semibold hidden sm:inline-block"
              onClick={handleNavigateHome}
            >
              Radical Red Pokédex
            </NavLink>
          </div>
          <div className="flex items-center gap-3">
            <LinkMenu />
            <ModeToggle />
          </div>
        </div>
      </header>
    </div>
  );
}
