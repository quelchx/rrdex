import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getPokedex() {
  const response = await fetch("/data.json");
  const data = await response.json();
  return data;
}
