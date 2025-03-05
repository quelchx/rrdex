import { PokemonColumns } from "@/types";
import { Button } from "../ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";

export function SortColumnButton({
  column,
  children,
}: {
  column: Column<PokemonColumns>;
  children: React.ReactNode;
}) {
  return (
    <Button
      variant="ghost"
      size={"sm"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      {column.getIsSorted() && (
        <ArrowUp
          size={16}
          className={
            column.getIsSorted() === "asc" ? "transform rotate-180" : ""
          }
        />
      )}
    </Button>
  );
}
