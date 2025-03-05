import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { filters } from "@/constants";
import { useCurrentFilter } from "@/hooks";
import { ChevronsUpDown } from "lucide-react";

export function FiltersMenu() {
  const { filter, setFilter } = useCurrentFilter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="justify-between">
          <span>{filter}</span>
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
