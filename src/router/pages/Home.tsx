import { Pokemon } from "@/components/content/pokemon";
import { Pokedex } from "@/components/content/pokedex";
import { useSelectedPokemonStore } from "@/store";

export function Home() {
  const { selectedPokemon, isDialogOpen } = useSelectedPokemonStore();

  return (
    <>
      {!isDialogOpen && (
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
      )}

      <div className="w-full max-w-5xl mx-auto rounded-lg border bg-card p-4 shadow-sm">
        {isDialogOpen && selectedPokemon ? (
          <div className="space-y-4">
            <Pokemon />
          </div>
        ) : (
          <Pokedex />
        )}
      </div>
    </>
  );
}
