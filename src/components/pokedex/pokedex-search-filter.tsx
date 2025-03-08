import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FILTER_TYPES } from "@/constants";
import { SearchFilter } from "@/constants/types";
import { useSearchFilterStore } from "@/store";

export function PokedexSearchFilter() {
  const { searchFilter, setSearchFilter } = useSearchFilterStore();
  return (
    <Select
      value={searchFilter}
      onValueChange={(value: SearchFilter) => setSearchFilter(value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select Filter" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Search Filters</SelectLabel>
          {FILTER_TYPES.map((filter) => (
            <SelectItem
              key={filter}
              value={filter}
              onClick={() => setSearchFilter(filter)}
            >
              {filter}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
