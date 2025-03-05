// Pokemon related types
export type Pokemon = {
  ID: number;
  name: string;
  stats: number[];
  type: number[];
  abilities: number[][];
  eggGroup: number[];
  items: number[];
  levelupMoves: number[][];
  evolutions: number[][];
  tmMoves: number[];
  tutorMoves: number[];
  key: string;
  dexID: number;
  ancestor: number;
  eggMoves: number[];
};

export type PokemonColumns = {
  ID: number;
  name: string;
  type: { name: string; color: string }[];
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
    total: number;
  };
};

export type PokemonType = {
  ID: number;
  name: string;
  color: string;
  matchup: number[];
};

export type PokemonAbilities = {
  ID: number;
  names: string[];
  description: string;
};

// Moves related types
export type LearnedMoves = {
  ID: number;
  name: string;
  type: number;
  category: number;
  power: number;
  accuracy: number;
  pp: number;
  priority: number;
  target: number;
  effect: number;
  description: string;
};

export type TeachableMoves = {
  [key: string]: number;
};

// Items related types
export type PokemonItems = {
  ID: number;
  name: string;
  description: string;
};

// Main Pokedex type
export type RadicalRedPokedex = {
  species: { [key: string]: Pokemon };
  moves: { [key: string]: LearnedMoves };
  tmMoves: { [key: string]: TeachableMoves };
  tutorMoves: { [key: string]: TeachableMoves };
  types: { [key: string]: PokemonType };
  abilities: { [key: string]: PokemonAbilities };
  items: { [key: string]: PokemonItems };
};
