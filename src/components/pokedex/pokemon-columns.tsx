import { ColumnDef } from "@tanstack/react-table";

import type { Pokemon } from "@/constants/types";
import { UNKNOWN_SPRITE_URL } from "@/constants";
import { DataTableColumnHeader } from "./data-column-header";

export const pokemonColumns: ColumnDef<Pokemon>[] = [
  {
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
        className="w-12 h-12 mx-auto aspect-square antialiased"
      />
    ),
  },
  {
    accessorKey: "name",
    header: () => <span>Name</span>,
    cell: ({ row }) => <span>{row.original.name}</span>,
  },
];
