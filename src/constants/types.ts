import { STAT_TYPES, FILTER_TYPES } from ".";

export type Theme = "dark" | "light" | "system";
export type SearchFilter = (typeof FILTER_TYPES)[number];

export type Ability = {
  ID: string;
  name: string;
  description: string;
};

export type Stat = {
  title: (typeof STAT_TYPES)[number];
  value: string;
};

export type Move = {
  level?: string;
  name: string;
  type: string;
  category: string;
  power: string;
  acurracy: string;
  desc: string;
};

export type Pokemon = {
  idx: number;
  name: string;
  dexEntryNumber: string;
  type: string[];
  abilities: string[];
  stats: Stat[];
  evolution: string[];
  coverage: { type: string; multiplier: string }[];
  levelUpMoves: Move[];
  learnableTechnicalMachines: Move[];
  eggMoves: Move[];
  tutorMoves: Move[];
  familyTree: string[];
  alternateForms: string[];
  sprite: string;
};
