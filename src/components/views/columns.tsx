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
    id: "HP",
    header: ({ column }) => {
      return <SortColumnButton column={column}>HP</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.attack",
    id: "Attack",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Attack</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.defense",
    id: "Defense",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Defense</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.specialAttack",
    id: "Special Attack",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Sp. Attack</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.specialDefense",
    id: "Special Defense",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Sp. Defense</SortColumnButton>;
    },
  },

  {
    accessorKey: "stats.speed",
    id: "Speed",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Speed</SortColumnButton>;
    },
  },
  {
    accessorKey: "stats.total",
    id: "Total",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Total</SortColumnButton>;
    },
  },
];
