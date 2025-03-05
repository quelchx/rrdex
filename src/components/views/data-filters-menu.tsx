import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { filters } from "@/constants";
import { useFilters } from "@/hooks/useFilters";
import { ChevronsUpDown } from "lucide-react";

export function DataFiltersMenu() {
  const { filter, setFilter } = useFilters();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          Filter by {filter}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={filter}
          onValueChange={(value) =>
            setFilter(value as (typeof filters)[number])
          }
        >
          {filters.map((group) => (
            <DropdownMenuRadioItem key={group} value={group}>
              {group}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
