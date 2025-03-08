import { useMoves } from "@/hooks/useMoves";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Zap, Target, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
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
import { POKEMON_TYPES } from "@/constants";

// const typeNames: string[] = POKEMON_TYPES.map((type) => type.name);

export function MovesPage() {
  const { data, isLoading, isError } = useMoves();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredMoves = useMemo(() => {
    if (!data) return [];

    return data.moves;
  }, [data]);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-pulse">
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className="h-40 bg-muted rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (isError) return <p>Error</p>;

  return (
    data && (
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold">Pokémon Moves</h1>
              <p className="text-muted-foreground">
                Browse through all Pokémon moves and discover their effects
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
            <div className="w-full sm:w-64">
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
                      <SelectItem
                        key={`${index}-${type.name}-${type.color}`}
                        value={type.name.toLowerCase()}
                      >
                        {type.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            Showing {filteredMoves.length} of {data.moves.length} moves
          </p>

          <div className="h-[calc(100vh-280px)] overflow-y-auto pr-2 pb-4 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredMoves.map((move) => (
                <Card
                  key={move.name}
                  className="border-2 transition-all duration-200 hover:shadow-md"
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">
                        {move.name}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        {/* #{move.ID} */}
                      </Badge>
                    </div>
                    <div className="flex gap-2 mt-1">
                      {/* <Badge className={`${typeColors[typeNames[move.type]]}`}>
                        {typeNames[move.type]}
                      </Badge> */}

                      {/* <Badge variant="outline">{splitNames[move.split]}</Badge> */}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{move.desc}</p>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                      {Number.parseInt(move.power) > 0 && (
                        <div className="col-span-1">
                          <div className="flex items-center gap-1 text-sm mb-1">
                            <Zap className="h-4 w-4" />
                            <span>Power</span>
                          </div>
                          <Progress
                            value={Number.parseInt(move.power)}
                            max={150}
                            className="h-2"
                          />
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
                        <Progress
                          value={Number.parseInt(move.accuracy)}
                          max={100}
                          className="h-2"
                        />
                        <div className="text-right text-xs mt-1">
                          {move.accuracy}%
                        </div>
                      </div>

                      <div className="col-span-1">
                        <div className="flex items-center gap-1 text-sm mb-1">
                          <Clock className="h-4 w-4" />
                          <span>PP</span>
                        </div>
                        {/* <Progress value={move.pp} max={40} className="h-2" /> */}
                        {/* <div className="text-right text-xs mt-1">{move.pp}</div> */}
                      </div>

                      <div className="col-span-1">
                        <div className="text-sm">
                          <span className="font-medium">Target:</span>
                          <span className="text-xs ml-1">
                            {/* {targetNames[move.target]} */}
                          </span>
                        </div>
                        {/* {move.priority !== 0 && (
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
                        )} */}
                        {/* {move.secondaryEffectChance > 0 && (
                          <div className="text-sm">
                            <span className="font-medium">Effect Chance:</span>
                            <span className="text-xs ml-1">
                              {move.secondaryEffectChance}%
                            </span>
                          </div>
                        )} */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
