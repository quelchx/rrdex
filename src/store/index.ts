import { atom } from "jotai";
import { filters } from "@/constants";

export const filterAtom = atom<(typeof filters)[number]>(filters[0]);
export const currentSearchAtom = atom<string>("");
