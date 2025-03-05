import { RadicalRedPokedex } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPokedex() {
  try {
    const response = await fetch("/data.json");
    return response.json() as Promise<RadicalRedPokedex[]>;
  } catch (error) {
    throw new Error(`Failed to fetch pokedex: ${error}`);
  }
}
