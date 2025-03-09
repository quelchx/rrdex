import { Suspense, lazy } from "react";
// import { Pokemon } from "@/components/content/pokemon";
import { Pokedex } from "@/components/content/pokedex";
import { useSelectedPokemonStore } from "@/store";
import { LoadingSpinner } from "@/components/content/loading-spinner";

// lazy load Pokemon component
const LazyPokemon = lazy(() =>
  import("@/components/content/pokemon").then((module) => ({
    default: module.Pokemon,
  }))
);

export function HomePage() {
  const { selectedPokemon, isDialogOpen } = useSelectedPokemonStore();

  return (
    <>
      {!isDialogOpen && (
        <div className="mb-8 text-center space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            <span className="text-transparent bg-gradient-to-r from-red-500 via-red-600 to-red-700 bg-clip-text">
              Radical Red Pokédex
            </span>
          </h1>
          <p className="max-w-[42rem] mx-auto text-muted-foreground text-sm sm:text-base md:text-lg">
            The Pokédex for Radical Red, a fan-made ROM hack of FireRed and
            LeafGreen, offers a unique and challenging experience with new
            features and mechanics, perfect for nuzlocke challenges.
          </p>
        </div>
      )}

      <div className="w-full max-w-5xl p-4 mx-auto border rounded-lg bg-card shadow-sm">
        {isDialogOpen && selectedPokemon ? (
          <div className="space-y-4">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyPokemon />
            </Suspense>
          </div>
        ) : (
          <Pokedex />
        )}
      </div>
    </>
  );
}
