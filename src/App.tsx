import { Pokedex } from "@/components/pokedex";

export default function App() {
  return (
    <div className="w-full max-w-screen-xl px-4 py-8 mx-auto">
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
          <Pokedex />
        </div>
      </div>
    </div>
  );
}
