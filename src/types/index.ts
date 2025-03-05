type PokemonType = {
  ID: number;
  name: string;
  color: string;
  matchup: number[];
};

type Pokemon = {
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

type Moves = {
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

export type RadicalRedPokedex = {
  species: { [key: string]: Pokemon };
  types: { [key: string]: PokemonType };
  moves: { [key: string]: Moves };
};

export type PokemonColumns = {
  ID: number;
  sprite: string;
  name: string;
  type: string[];
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
