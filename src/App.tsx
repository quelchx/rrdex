import { Pokedex } from "@/components/pokedex";
import { ModeToggle } from "./components/mode-toggle";
import { PokemonInfo } from "./components/pokemon-info";
import { useSelectedPokemonStore } from "./store";
import { StepBack } from "lucide-react";
import { Button } from "./components/ui/button";

export default function App() {
  const { selectedPokemon, isDialogOpen, setPokemonDialog } =
    useSelectedPokemonStore();

  return (
    <div className="w-full max-w-screen-xl px-4 py-8 mx-auto">
      <header className="absolute top-2 right-2 z-10 p-4">
        <ModeToggle />
      </header>
      <div className="flex flex-col items-center justify-center w-full">
        {/* make it red to dark/white gradient */}
        <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">
          Radical Red Pokédex
        </h1>
        <p className="mb-4 max-w-2xl text-lg text-center text-muted-foreground">
          The Pokédex for Radical Red, a fan-made ROM hack of FireRed and
          LeafGreen, offers a unique and challenging experience with new
          features and mechanics, perfect for nuzlocke challenges.
        </p>

        {/* Placeholder for the future table */}
        <div className="w-full max-w-5xl mx-auto">
          {isDialogOpen && selectedPokemon ? (
            <>
              <PokemonInfo />
              <div className="absolute bottom-12 right-12">
                <Button
                  className="flex items-center"
                  onClick={() => setPokemonDialog(false)}
                >
                  <StepBack />
                  <span className="ml-2">Back</span>
                </Button>
              </div>
            </>
          ) : (
            <Pokedex />
          )}
        </div>
      </div>
      <footer className="fixed bottom-4 left-0 right-0 text-center text-muted-foreground">
        <div className="flex items-center justify-center space-x-2">
          <a
            className="font-black"
            target="_blank"
            href="https://github.com/quelchx/rrdex"
          >
            github
          </a>
          <span className="dark:text-pink-700 text-blue-600">•</span>
          <a
            className="font-black"
            target="_blank"
            href="https://github.com/quelchx"
          >
            quelchx
          </a>
        </div>
      </footer>
    </div>
  );
}
