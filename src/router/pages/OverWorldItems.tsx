import { FetchError } from "@/components/content/fetch-error";
import { LoadingBlocks } from "@/components/content/loading-blocks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOverWorldItems } from "@/hooks/useOverWorldItems";

import { Search, ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";

export function OverWorldItemsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [areaFilter, setAreaFilter] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "ascending" | "descending";
  } | null>(null);

  const { data, isLoading, isError } = useOverWorldItems();

  const flattenedData = useMemo(() => {
    if (!data) return [];
    return data.flatMap((areaData) =>
      areaData.items.map((item) => ({
        area: areaData.area,
        ...item,
      }))
    );
  }, [data]);

  const uniqueAreas = useMemo(() => {
    if (!data || data.length === 0) return [];
    return Array.from(new Set(data.map((item) => item.area)));
  }, [data]);

  const filteredAndSortedData = useMemo(() => {
    let result = flattenedData;

    if (areaFilter !== "all") {
      result = result.filter((item) => item.area === areaFilter);
    }

    if (searchQuery) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.location.toLowerCase().includes(lowerCaseQuery) ||
          item.area.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Apply sorting
    if (sortConfig) {
      result = [...result].sort((a, b) => {
        if (
          a[sortConfig.key as keyof typeof a] <
          b[sortConfig.key as keyof typeof b]
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof typeof a] >
          b[sortConfig.key as keyof typeof b]
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [flattenedData, searchQuery, areaFilter, sortConfig]);

  const requestSort = (key: string) => {
    let direction: "ascending" | "descending" = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getSortDirectionIndicator = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓";
  };

  if (isLoading) return <LoadingBlocks />;
  if (isError) return <FetchError />;

  return (
    data !== undefined && (
      <div className="container px-4 py-2 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold page-heading">
                Overworld Items
              </h1>
              <p className="text-muted-foreground">
                Browse through all overworld items in this ROM hack and discover
                their locations in Radical Red.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative w-full sm:max-w-xs">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search items or locations..."
                  className="w-full pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={areaFilter} onValueChange={setAreaFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Filter by area" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Areas</SelectItem>
                  {uniqueAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="max-h-[60vh] shadow-sm overflow-auto">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => requestSort("area")}
                          className="flex items-center gap-1"
                        >
                          <span>Area</span>
                          {getSortDirectionIndicator("area") ?? (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => requestSort("name")}
                          className="flex items-center gap-1"
                        >
                          <span>Item</span>
                          {getSortDirectionIndicator("name") ?? (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </Button>
                      </TableHead>
                      <TableHead>
                        <Button
                          variant="ghost"
                          onClick={() => requestSort("location")}
                          className="flex items-center gap-1"
                        >
                          <span>Location</span>
                          {getSortDirectionIndicator("location") ?? (
                            <ArrowUpDown className="w-4 h-4" />
                          )}
                        </Button>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedData.length > 0 ? (
                      filteredAndSortedData.map((item, index) => (
                        <TableRow key={`${item.area}-${item.name}-${index}`}>
                          <TableCell>{item.area}</TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.location}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="h-24 text-center">
                          No items found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Showing {filteredAndSortedData.length} of {flattenedData.length}{" "}
              items
            </div>
          </div>
        </div>
      </div>
    )
  );
}
