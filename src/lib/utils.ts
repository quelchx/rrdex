import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to get color based on type
export const getTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    Normal: "bg-stone-400 text-white",
    Fighting: "bg-red-700 text-white",
    Flying: "bg-sky-300 text-slate-800",
    Poison: "bg-purple-600 text-white",
    Ground: "bg-amber-600 text-white",
    Rock: "bg-yellow-700 text-white",
    Bug: "bg-lime-500 text-white",
    Ghost: "bg-indigo-800 text-white",
    Steel: "bg-slate-400 text-white",
    Fire: "bg-orange-500 text-white",
    Water: "bg-blue-500 text-white",
    Grass: "bg-green-500 text-white",
    Electric: "bg-yellow-400 text-slate-800",
    Psychic: "bg-pink-500 text-white",
    Ice: "bg-cyan-300 text-slate-800",
    Dragon: "bg-indigo-600 text-white",
    Dark: "bg-slate-700 text-white",
    Fairy: "bg-pink-300 text-slate-800",
  };
  return typeColors[type] || "bg-gray-500 text-white";
};

// Helper function to get color based on move category
export const getCategoryColor = (category: string) => {
  const categoryColors: Record<string, string> = {
    physical: "bg-red-500 text-white",
    special: "bg-blue-500 text-white",
    status: "bg-gray-500 text-white",
  };
  return categoryColors[category] || "bg-gray-500 text-white";
};

// Helper function to get color based on damage multiplier
export const getMultiplierColor = (multiplier: string) => {
  const multiplierColors: Record<string, string> = {
    "0x": "bg-gray-800 text-white",
    "0.25x": "bg-red-700 text-white",
    "0.5x": "bg-red-500 text-white",
    "1x": "bg-gray-500 text-white",
    "2x": "bg-green-500 text-white",
    "4x": "bg-green-700 text-white",
  };
  return multiplierColors[multiplier] || "bg-gray-500 text-white";
};

// Helper function to get stat color
export const getStatColor = (value: number) => {
  if (value < 50) return "bg-red-500";
  if (value < 80) return "bg-yellow-500";
  if (value < 100) return "bg-green-500";
  if (value < 125) return "bg-blue-500";
  if (value < 150) return "bg-indigo-500";
  return "bg-purple-500";
};
