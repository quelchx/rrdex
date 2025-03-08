import { ColumnDef, Row } from "@tanstack/react-table";

import { cn, getTypeColor } from "@/lib/utils";
import type { Pokemon, Stat } from "@/constants/types";
import { UNKNOWN_SPRITE_URL } from "@/constants";

import { PokedexColumnHeader } from "@/components/pokedex/pokedex-column-header";
import { StatCell } from "@/components/pokedex/pokedex-stat";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "../ui/badge";

function sortStats(stat: Stat["title"], a: Row<Pokemon>, b: Row<Pokemon>) {
  const aValue = a.original.stats.find((s) => s.title === stat)?.value ?? "";
  const bValue = b.original.stats.find((s) => s.title === stat)?.value ?? "";
  return parseInt(aValue) - parseInt(bValue);
}

export const pokemonColumns: ColumnDef<Pokemon>[] = [
  {
    id: "ID",
    accessorKey: "idx",
    header: ({ column }) => {
      return (
        <PokedexColumnHeader
          column={column}
          title="No."
          className="flex items-center justify-center ml-3"
        />
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center justify-center mr-1.5">
        <span>{row.original.dexEntryNumber}</span>
      </div>
    ),
  },
  {
    accessorKey: "sprite",
    header: () => <span>Sprite</span>,
    cell: ({ row }) => (
      <img
        alt={row.original.name}
        src={row.original.sprite ?? UNKNOWN_SPRITE_URL}
        className={cn(
          "lg:w-10 lg:h-10 w-12 h-12 relative top-0.5",
          row.original.sprite === UNKNOWN_SPRITE_URL && "top-1.5",
          row.original.sprite ?? "filter grayscale opacity-50"
        )}
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-start items-start gap-0.5">
          {row.original.type.map((type) => {
            return (
              <Badge key={type} className={`${getTypeColor(type)}`}>
                {type}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "abilities",
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="Abilities" />;
    },
    sortingFn: (a, b) => {
      const aAbility = a.original.abilities[0] ?? null;
      const bAbility = b.original.abilities[0] ?? null;

      return aAbility === null || bAbility === null
        ? 0
        : aAbility.localeCompare(bAbility);
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-1.5">
        {row.original.abilities.map((ability) => (
          <TooltipProvider key={ability}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span
                  className={cn(
                    `text-xs font-semibold ${
                      row.original.abilities.indexOf(ability) === 2
                        ? "text-purple-500"
                        : ""
                    }`
                  )}
                >
                  {ability.split("-")[0]}
                </span>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                {ability.split("-").slice(1).join(" ")}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    ),
  },
  {
    accessorKey: "stats",
    id: "HP",
    sortingFn: (a, b) => sortStats("HP", a, b),
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="HP" />;
    },
    cell: ({ row }) => {
      return <StatCell row={row} target="HP" />;
    },
  },
  {
    accessorKey: "stats",
    id: "Atk",
    sortingFn: (a, b) => sortStats("Atk", a, b),
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="Atk" />;
    },
    cell: ({ row }) => {
      return <StatCell row={row} target="Atk" />;
    },
  },
  {
    accessorKey: "stats",
    id: "Def",
    sortingFn: (a, b) => sortStats("Def", a, b),
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="Def" />;
    },
    cell: ({ row }) => {
      return <StatCell row={row} target="Def" />;
    },
  },
  {
    accessorKey: "stats",
    id: "SpA",
    sortingFn: (a, b) => sortStats("SpA", a, b),
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="SpA" />;
    },
    cell: ({ row }) => {
      return <StatCell row={row} target="SpA" />;
    },
  },
  {
    accessorKey: "stats",
    id: "SpD",
    sortingFn: (a, b) => sortStats("SpD", a, b),
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="SpD" />;
    },
    cell: ({ row }) => {
      return <StatCell row={row} target="SpD" />;
    },
  },
  {
    accessorKey: "stats",
    id: "Spe",
    sortingFn: (a, b) => sortStats("Spe", a, b),
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="Spe" />;
    },
    cell: ({ row }) => {
      return <StatCell row={row} target="Spe" />;
    },
  },
  {
    accessorKey: "stats",
    id: "BST",
    sortingFn: (a, b) => sortStats("BST", a, b),
    header: ({ column }) => {
      return <PokedexColumnHeader column={column} title="BST" />;
    },
    cell: ({ row }) => {
      return (
        <StatCell row={row} target="BST" className="font-semibold relative" />
      );
    },
  },
];
