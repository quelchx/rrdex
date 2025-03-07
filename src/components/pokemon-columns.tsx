import { ColumnDef } from "@tanstack/react-table";
import { Pokemon } from "@/constants/types";
import { UNKNOWN_SPRITE_URL } from "@/constants";

export const columns: ColumnDef<Pokemon>[] = [
  {
    accessorKey: "idx",
    header: () => <span>#</span>,
    cell: ({ row }) => <span>{row.original.idx + 1}</span>,
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
