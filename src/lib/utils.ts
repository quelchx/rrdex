import {
  LearnedMoves,
  Pokemon,
  PokemonAbilities,
  PokemonColumns,
  PokemonType,
  RadicalRedPokedex,
} from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getPokemonTypes(
  pokemon: Pokemon,
  types: { [key: string]: PokemonType }
) {
  return pokemon.type.map((type) => {
    return {
      name: types[type].name,
      color: types[type].color,
    };
  });
}

function getPokemonAbilities(
  pokemon: Pokemon,
  abilities: { [key: string]: PokemonAbilities }
): string[] {
  return pokemon.abilities
    .flatMap((ability) =>
      ability[0] === 0 ? [] : abilities[ability[0]].names[0]
    )
    .filter(Boolean);
}

export function getPokemonMoves(
  pokemon: Pokemon,
  moves: { [key: string]: LearnedMoves }
): string[] {
  return pokemon.levelupMoves
    .flatMap((move) => (move[0] === 0 ? [] : moves[move[0]].name))
    .filter(Boolean);
}

export function structurePokemonData(
  data: RadicalRedPokedex
): PokemonColumns[] {
  return Object.values(data.species).map((pokemon) => ({
    ID: pokemon.ID,
    name: pokemon.name,
    type: getPokemonTypes(pokemon, data.types),
    abilities: getPokemonAbilities(pokemon, data.abilities).reverse(),
    moves: getPokemonMoves(pokemon, data.moves),
    stats: {
      hp: pokemon.stats[0],
      attack: pokemon.stats[1],
      defense: pokemon.stats[2],
      specialAttack: pokemon.stats[3],
      specialDefense: pokemon.stats[5],
      speed: pokemon.stats[4],
      total: pokemon.stats.reduce((acc, stat) => acc + stat, 0),
    },
  }));
}

export async function getPokedex() {
  try {
    const response = await fetch("/data.json");
    return response.json() as Promise<RadicalRedPokedex>;
  } catch (error) {
    throw new Error(`Failed to fetch pokedex: ${error}`);
  }
}
