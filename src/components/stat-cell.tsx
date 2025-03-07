import { Row } from "@tanstack/react-table";
import { Pokemon, Stat } from "@/constants/types";
import { ComponentProps } from "react";

type StatCellProps = {
  row: Row<Pokemon>;
  target: Stat["title"];
} & ComponentProps<"span">;

export function StatCell({ row, target, className }: StatCellProps) {
  const stat = row.original.stats.find((stat) => stat.title === target);
  return stat !== undefined ? (
    <span className={className}>{stat.value}</span>
  ) : (
    <span className="font-semibold text-gray-400">-</span>
  );
}
