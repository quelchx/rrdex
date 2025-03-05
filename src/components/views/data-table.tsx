import { useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  VisibilityState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";

import { DataPagination } from "./data-pagination";
import { DataFiltersMenu } from "./data-filters-menu";
import { ColumnFilters } from "./column-filters";
import { useCurrentSearch } from "@/hooks/useCurrentSearch";
import { useFilters } from "@/hooks/useFilters";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const { filter } = useFilters();
  const { currentSearch, setCurrentSearch } = useCurrentSearch();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: { sorting, columnFilters, columnVisibility },
  });

  function handleSearchEvent(event: React.ChangeEvent<HTMLInputElement>) {
    table.getColumn(filter.toLowerCase())?.setFilterValue(event.target.value);
    setCurrentSearch(event.target.value);
  }

  return (
    <>
      <div className="w-full justify-between space-x-2 flex items-center py-4">
        <Input
          placeholder={`Search by ${filter}`}
          value={
            (table
              .getColumn(filter.toLowerCase())
              ?.getFilterValue() as string) ?? ""
          }
          onChange={handleSearchEvent}
          className="max-w-sm"
        />
        <div className="flex space-x-0.5">
          <DataFiltersMenu />
          {currentSearch && <ColumnFilters table={table} />}
        </div>
      </div>
      {currentSearch ? (
        <div className="max-h-[calc(100vh-16rem)] overflow-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell className="h-12" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : null}
      {currentSearch && <DataPagination table={table} />}
    </>
  );
}
