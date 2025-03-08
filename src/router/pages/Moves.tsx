import { useState, useMemo } from "react";
import { Search, Zap, Target, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { getTypeColor } from "@/lib/utils";
import { POKEMON_TYPES } from "@/constants";

const splitNames = ["Physical", "Special", "Status"];
const typeNames: string[] = POKEMON_TYPES.map((type) => type.name);

const targetNames = [
  { name: "Selected Pokémon", value: 0 },
  { name: "Specific Move", value: 1 },
  { name: "Ally", value: 2 },
  { name: "User's Field", value: 3 },
  { name: "User or Ally", value: 4 },
  { name: "Opponents Field", value: 5 },
  { name: "User", value: 6 },
  { name: "Random Opponent", value: 7 },
  { name: "All Opponents", value: 8 },
  { name: "All Other Pokémon", value: 9 },
  { name: "All Pokémon", value: 10 },
  { name: "Effect", value: 16 },
  { name: "Destructive", value: 32 },
  { name: "Entry Hazard", value: 64 },
];

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
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, ID, type, or description..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                {typeNames.map((type, index) => (
                  <SelectItem key={index} value={type.toLowerCase()}>
                    {type}
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
              <Card
                key={move.ID}
                className="border-2 transition-all duration-200 hover:shadow-md"
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold">
                      {move.name}
                    </CardTitle>
                    <Badge variant="outline" className="text-xs">
                      #{move.ID}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Badge className={`${getTypeColor(move.type)}`}>
                      {move.type}
                    </Badge>
                    <Badge variant="outline">{splitNames[move.split]}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {move.description}
                  </p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {move.power > 0 && (
                      <div className="col-span-1">
                        <div className="flex items-center gap-1 text-sm mb-1">
                          <Zap className="h-4 w-4" />
                          <span>Power</span>
                        </div>
                        <div
                          className={`h-2 bg-gray-200 rounded-md overflow-hidden`}
                        >
                          <div
                            className={`h-full bg-blue-500 dark:bg-blue-400`}
                            style={{
                              width: `${(move.power / 150) * 100}%`,
                            }}
                          />
                        </div>
                        <div className="text-right text-xs mt-1">
                          {move.power}
                        </div>
                      </div>
                    )}

                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm mb-1">
                        <Target className="h-4 w-4" />
                        <span>Accuracy</span>
                      </div>

                      <div
                        className={`h-2 bg-gray-200 rounded-md overflow-hidden`}
                      >
                        <div
                          className={`h-full dark:bg-green-400 bg-green-500`}
                          style={{
                            width: `${(move.power / 100) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-right text-xs mt-1">
                        {move.accuracy}%
                      </div>
                    </div>

                    <div className="col-span-1">
                      <div className="flex items-center gap-1 text-sm mb-1">
                        <Clock className="h-4 w-4" />
                        <span>PP</span>
                      </div>
                      <div
                        className={`h-2 bg-gray-200 rounded-md overflow-hidden`}
                      >
                        <div
                          className={`h-full dark:bg-orange-400 bg-orange-500`}
                          style={{
                            width: `${(move.pp / 40) * 100}%`,
                          }}
                        />
                      </div>
                      <div className="text-right text-xs mt-1">{move.pp}</div>
                    </div>
                  </div>

                  <div className="col-span-1">
                    <div className="text-sm">
                      <span className="font-medium">Target:</span>
                      <span className="text-xs ml-1">
                        {targetNames.find(
                          (target) => target.value === move.target
                        )?.name || "Unknown"}
                      </span>
                    </div>
                    {move.priority !== 0 && (
                      <div className="text-sm">
                        <span className="font-medium">Priority:</span>
                        <span
                          className={`text-xs ml-1 ${
                            move.priority > 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {move.priority > 0 ? "+" : ""}
                          {move.priority}
                        </span>
                      </div>
                    )}
                    {move.secondaryEffectChance > 0 && (
                      <div className="text-sm">
                        <span className="font-medium">Effect Chance:</span>
                        <span className="text-xs ml-1">
                          {move.secondaryEffectChance}%
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
