import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  SelectSeparator,
} from "@/components/ui/select";

import { FetchError } from "@/components/content/fetch-error";
import { LoadingBlocks } from "@/components/content/loading-blocks";

import { useMoves } from "@/hooks/useMoves";
import { POKEMON_TYPES } from "@/constants";
import { SearchBar } from "@/components/content/search-bar";
import { MoveCard } from "@/components/content/move-card";

export function MovesPage() {
  const { data, isLoading, isError } = useMoves();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMoves = useMemo(() => {
    if (!data) return [];
    if (searchQuery === "" && activeTab === "all") return data.moves;

    return data.moves.filter((move) => {
      const matchesSearch =
        move.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        move.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        move.ID.toString().includes(searchQuery) ||
        move.type.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeTab === "all") return matchesSearch;
      if (activeTab === "physical") return matchesSearch && move.split === 0;
      if (activeTab === "special") return matchesSearch && move.split === 1;
      if (activeTab === "status") return matchesSearch && move.split === 2;

      // Filter by type
      return matchesSearch && move.type.toLowerCase() === activeTab;
    });
  }, [data, searchQuery, activeTab]);

  if (isLoading) {
    return <LoadingBlocks />;
  }

  if (isError || data === undefined) {
    return (
      <FetchError message="Unable to fetch Pokémon moves. Please try again later." />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold">Pokémon Moves</h1>
            <p className="text-muted-foreground">
              Browse through all Pokémon moves and discover their effects in
              Radical Red.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 px-1">
          <div className="relative flex-grow">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              placeholder="Search by name, ID, type, or description..."
            />
          </div>
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="all">All Moves</SelectItem>
                <SelectItem value="physical">Physical</SelectItem>
                <SelectItem value="special">Special</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectGroup>
              <SelectSeparator />
              <SelectGroup>
                <SelectLabel>Types</SelectLabel>
                {POKEMON_TYPES.map((type, index) => (
                  <SelectItem key={index} value={type.name.toLowerCase()}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Showing {filteredMoves.length} of {data.moves.length} moves
        </p>

        <div className="h-[calc(100vh-280px)] overflow-y-auto pr-2 pb-4 custom-scrollbar">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMoves.map((move) => (
              <MoveCard key={move.ID} move={move} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
