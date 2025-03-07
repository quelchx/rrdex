export type Move = {
  name: string;
  type: string;
  category: string;
  power: string;
  acurracy: string;
  desc: string;
};

export type LevelUpMoves = {
  level: string;
} & Move;

export type Pokemon = {
  idx: number;
  name: string;
  dexEntryNumber: string;
  type: string[];
  abilities: string[];
  stats: { title: string; value: string }[];
  evolution: string[];
  coverage: { type: string; multiplier: string }[];
  levelUpMoves: LevelUpMoves[];
  learnableTechnicalMachines: Move[];
  eggMoves: Move[];
  tutorMoves: Move[];
  familyTree: string[];
  sprite: string;
};
