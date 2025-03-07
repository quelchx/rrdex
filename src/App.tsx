import { Pokedex } from "./components/pokedex/pokedex";
import { ModeToggle } from "./components/theme/mode-toggle";
import { Pokemon } from "./components/pokemon/pokemon";
import { useSelectedPokemonStore } from "./store";
import AnimatedBackButton from "./components/animated-back-button";
import { Github } from "lucide-react";

export default function App() {
  const { selectedPokemon, isDialogOpen } = useSelectedPokemonStore();

  return (
    <div className="min-h-screen bg-background justify-center items-center flex flex-col">
      {/* Header */}
      <div className="border-b w-full flex justify-center sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <header className="w-full max-w-7xl ">
          <div className="flex h-14 items-center justify-between px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-red-600"></div>
              <span className="font-semibold hidden sm:inline-block">
                Radical Red Pokédex
              </span>
            </div>
            <ModeToggle />
          </div>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-1 container py-8 md:py-12">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="space-y-4 text-center mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text text-transparent">
                Radical Red Pokédex
              </span>
            </h1>
            <p className="max-w-[42rem] mx-auto text-muted-foreground text-sm sm:text-base md:text-lg">
              The Pokédex for Radical Red, a fan-made ROM hack of FireRed and
              LeafGreen, offers a unique and challenging experience with new
              features and mechanics, perfect for nuzlocke challenges.
            </p>
          </div>

          <div className="w-full max-w-5xl mx-auto rounded-lg border bg-card p-4 shadow-sm">
            {isDialogOpen && selectedPokemon ? (
              <div className="space-y-4">
                <Pokemon />
                <AnimatedBackButton />
              </div>
            ) : (
              <Pokedex />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0 w-full flex justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built with passion for Pokémon fans
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/quelchx/rrdex"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80"
            >
              <Github className="h-4 w-4" />
              <span>Repository</span>
            </a>
            <a
              href="https://github.com/quelchx"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium transition-colors hover:text-foreground/80"
            >
              quelchx
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
