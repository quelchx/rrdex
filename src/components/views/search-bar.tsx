import { Input } from "../ui/input";
import { useCurrentSearch } from "@/hooks";

export function SearchBar() {
  const { currentSearch, setCurrentSearch } = useCurrentSearch();

  return (
    <Input
      type="text"
      placeholder="Search for a Pokemon..."
      value={currentSearch}
      onChange={(e) => setCurrentSearch(e.target.value)}
    />
  );
}
