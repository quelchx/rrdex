import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
} & ComponentProps<"input">;

export function SearchBar(props: SearchBarProps) {
  return (
    <>
      <Search className="absolute w-4 h-4 left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        type="text"
        className={cn("pl-10", props.className)}
        value={props.searchQuery}
        onChange={(e) => props.setSearchQuery(e.target.value)}
        {...props}
      />
    </>
  );
}
