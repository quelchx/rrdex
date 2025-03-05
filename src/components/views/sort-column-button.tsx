import { Column } from "@tanstack/react-table";
import { ArrowUp } from "lucide-react";

import { Button } from "../ui/button";

type SortColumnButtonProps<T> = {
  column: Column<T>;
  children: React.ReactNode;
};

export function SortColumnButton<T>({
  column,
  children,
}: SortColumnButtonProps<T>) {
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
