import { STAT_TYPES } from ".";

export type Theme = "dark" | "light" | "system";
export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type Stat = {
  title: (typeof STAT_TYPES)[number];
  value: string;
};

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
  stats: Stat[];
  evolution: string[];
  coverage: { type: string; multiplier: string }[];
  levelUpMoves: LevelUpMoves[];
  learnableTechnicalMachines: Move[];
  eggMoves: Move[];
  tutorMoves: Move[];
  familyTree: string[];
  sprite: string;
};
