import { ColumnDef } from "@tanstack/react-table";

import { PokemonColumns } from "@/types";
import { SortColumnButton } from "./sort-column-button";

export const columns: ColumnDef<PokemonColumns>[] = [
  {
    accessorKey: "ID",
    header: ({ column }) => {
      return <SortColumnButton column={column}>ID</SortColumnButton>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Name</SortColumnButton>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "abilities",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Abilities</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.hp",
    header: ({ column }) => {
      return <SortColumnButton column={column}>HP</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.attack",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Attack</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.defense",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Defense</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.specialAttack",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Sp. Attack</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.specialDefense",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Sp. Defense</SortColumnButton>;
    },
  },

  {
    accessorKey: "stats.speed",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Speed</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.total",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Total</SortColumnButton>;
    },
  },
];
