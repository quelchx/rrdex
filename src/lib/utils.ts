import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTypeColor = (type: string) => {
  const typeColors: Record<string, string> = {
    Normal: "bg-[#A8A77A] text-white",
    Fighting: "bg-[#C22E28] text-white",
    Flying: "bg-[#8571BE] text-white",
    Poison: "bg-[#A33EA1] text-white",
    Ground: "bg-[#B1954F] text-white",
    Rock: "bg-[#B6A136] text-white",
    Bug: "bg-[#808F13] text-white",
    Ghost: "bg-[#735797] text-white",
    Steel: "bg-[#8C8C9E] text-white",
    Fire: "bg-[#EE8130] text-white",
    Water: "bg-[#6390F0] text-white",
    Grass: "bg-[#62A13D] text-white",
    Electric: "bg-[#CF9A09] text-white",
    Psychic: "bg-[#F95587] text-white",
    Ice: "bg-[#65A19E] text-white",
    Dragon: "bg-[#6F35FC] text-white",
    Dark: "bg-[#705746] text-white",
    Fairy: "bg-[#D685AD] text-white",
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
