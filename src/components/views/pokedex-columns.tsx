import { ColumnDef } from "@tanstack/react-table";
import { PokemonColumns } from "@/types";
import { SortColumnButton } from "./sort-column-button";

export const pokedexColumns: ColumnDef<PokemonColumns>[] = [
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
    cell: (info) => {
      return (info.getValue() as { name: string; color: string }[]).map(
        (type) => (
          <span
            key={type.name}
            style={{ backgroundColor: type.color }}
            className="px-2 py-1 text-white rounded mr-1"
          >
            {type.name}
          </span>
        )
      );
    },
  },
  {
    accessorKey: "abilities",
    header: ({ column }) => {
      return <SortColumnButton column={column}>Abilities</SortColumnButton>;
    },
    cell: (info) => {
      return (info.getValue() as string[]).map(
        (ability: string, index: number) => (
          <span
            key={ability}
            className="flex flex-col items-center"
            // if there is a 3rd ability make it purple
            style={{
              color: index === 2 ? "rgb(255 107 188)" : "inherit",
            }}
          >
            {ability}
          </span>
        )
      );
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
