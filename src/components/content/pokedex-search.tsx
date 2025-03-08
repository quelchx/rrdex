import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { useSearchStore } from "@/store";

export function PokedexSearch() {
  const { search, setSearch } = useSearchStore();
  return (
    <div className="relative flex-grow">
      <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search Pokédex..."
        className="pl-10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
