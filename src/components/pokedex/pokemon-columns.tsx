import { ColumnDef } from "@tanstack/react-table";

import type { Pokemon } from "@/constants/types";
import { DataTableColumnHeader } from "@/components/pokedex/data-column-header";
import { UNKNOWN_SPRITE_URL, POKEMON_TYPES } from "@/constants";
import { cn } from "@/lib/utils";

export const pokemonColumns: ColumnDef<Pokemon>[] = [
  {
    id: "ID",
    accessorKey: "idx",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="No."
          className="text-center"
        />
      );
    },
    cell: ({ row }) => (
      <span className="text-center">{row.original.idx + 1}</span>
    ),
  },
  {
    accessorKey: "sprite",
    header: () => <span>Sprite</span>,
    cell: ({ row }) => (
      <img
        alt={row.original.name}
        src={row.original.sprite ?? UNKNOWN_SPRITE_URL}
        className="w-12 h-12"
      />
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Type" />;
    },
    cell: ({ row }) => {
      return (
        <div className="flex flex-col justify-start items-start gap-0.5">
          {row.original.type.map((type) => {
            const typeData = POKEMON_TYPES.find(
              (t) => t.name.toLowerCase() === type.toLowerCase()
            );
            return (
              <span
                key={type}
                className={`px-2 py-1 text-xs font-semibold text-white rounded-md`}
                style={{ backgroundColor: typeData?.color }}
              >
                {type}
              </span>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "abilities",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Abilities" />;
    },
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        {row.original.abilities.map((ability) => (
          <span
            key={ability}
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
        ))}
      </div>
    ),
  },
];
