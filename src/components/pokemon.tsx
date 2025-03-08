import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

import { useSelectedPokemonStore } from "@/store";
import {
  getTypeColor,
  getStatColor,
  getMultiplierColor,
  cn,
} from "@/lib/utils";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import { PokemonMove as MoveItem } from "@/components/pokemon-move";
import { PokemonMoveSet } from "@/components/pokemon-move-set";
import { UNKNOWN_SPRITE_URL } from "@/constants";

export function Pokemon() {
  const { selectedPokemon } = useSelectedPokemonStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [selectedPokemon]);

  if (!selectedPokemon) return null;

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-4xl mx-auto">
        <div className="px-6 pt-6 pb-2 sticky top-0 z-10">
          <h1 className="text-2xl flex items-center gap-2">
            <span>#{selectedPokemon.dexEntryNumber}</span>
            <span className="font-black">{selectedPokemon.name}</span>
            <div className="flex gap-1 ml-auto">
              {selectedPokemon.type.map((type) => (
                <Badge key={type} className={cn(getTypeColor(type), "p-2")}>
                  {type}
                </Badge>
              ))}
            </div>
          </h1>
        </div>

        <ScrollArea
          ref={scrollRef}
          type="always"
          className="h-[70vh] px-6 pb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            {/* Pokemon Image */}
            <Card className="col-span-1 overflow-hidden border-none shadow-none">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="bg-muted rounded-md p-4 w-full flex justify-center">
                  <img
                    loading="lazy"
                    src={selectedPokemon.sprite || UNKNOWN_SPRITE_URL}
                    alt={selectedPokemon.name}
                    width={120}
                    height={120}
                    className="pixelated"
                  />
                </div>
                <h3 className="font-semibold my-3">Abilities</h3>
                <div className="space-y-2">
                  {selectedPokemon.abilities.map((ability, index) => (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col p-2 bg-muted/50 rounded-md",
                        index === 2 &&
                          "text-pink-600 font-semibold bg-purple-500/10"
                      )}
                    >
                      <span className="font-semibold text-sm">
                        {ability.split("-")[0]}
                      </span>
                      <span className="text-muted-foreground text-xs">
                        {ability.split("-")[1]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card className="col-span-1 md:col-span-2 border-none shadow-none">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-3">Base Stats</h3>
                <div className="space-y-3">
                  {selectedPokemon.stats
                    .filter((stat) => stat.title !== "BST")
                    .map((stat) => (
                      <div key={stat.title} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{stat.title}</span>
                          <span>{stat.value}</span>
                        </div>
                        <div
                          className={`h-2 bg-gray-200 rounded-md overflow-hidden`}
                        >
                          <div
                            className={`h-full ${getStatColor(
                              Number.parseInt(stat.value)
                            )}`}
                            style={{
                              width: `${
                                (Number.parseInt(stat.value) / 255) * 100
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-semibold">
                      <span>BST</span>
                      <span>
                        {
                          selectedPokemon.stats.find((s) => s.title === "BST")
                            ?.value
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Type Effectiveness */}
          <Card className="my-2">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Type Effectiveness</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {selectedPokemon.coverage.map((item) => (
                  <div
                    key={item.type}
                    className={`p-2 rounded-md text-center ${getMultiplierColor(
                      item.multiplier
                    )}`}
                  >
                    <div className="text-xs">{item.type}</div>
                    <div className="font-bold">{item.multiplier}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Evolution */}
          <Card className="mb-6 border-none shadow-none">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-3">Evolution</h3>
              <div className="space-y-2">
                {selectedPokemon.evolution.map((evo, index) => (
                  <div key={index} className="p-2 bg-muted/50 rounded-md">
                    {evo}
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <ScrollArea
                  className="whitespace-nowrap rounded-md border"
                  scrollHideDelay={500}
                >
                  <div className="flex gap-2">
                    {selectedPokemon.familyTree.map((img, index) => (
                      <img
                        key={index}
                        src={img || UNKNOWN_SPRITE_URL}
                        alt={`Evolution stage ${index + 1}`}
                        width={64}
                        height={64}
                        className="pixelated"
                      />
                    ))}
                  </div>
                  <ScrollBar orientation="horizontal" />
                </ScrollArea>
              </div>
            </CardContent>
          </Card>

          {/* Moves */}
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="levelup">
                <TabsList className="grid grid-cols-4 mb-4 w-full">
                  <TabsTrigger value="levelup">Level Up</TabsTrigger>
                  <TabsTrigger value="tm">TM</TabsTrigger>
                  <TabsTrigger value="egg">Egg</TabsTrigger>
                  <TabsTrigger value="tutor">Tutor</TabsTrigger>
                </TabsList>

                <TabsContent value="levelup" className="space-y-2">
                  {selectedPokemon.levelUpMoves.map((move, index) => (
                    <MoveItem key={index} move={move} />
                  ))}
                </TabsContent>

                <TabsContent value="tm" className="space-y-2">
                  <PokemonMoveSet
                    moves={selectedPokemon.learnableTechnicalMachines}
                  />
                </TabsContent>

                <TabsContent value="egg" className="space-y-2">
                  <PokemonMoveSet moves={selectedPokemon.eggMoves} />
                </TabsContent>

                <TabsContent value="tutor" className="space-y-2">
                  <PokemonMoveSet moves={selectedPokemon.tutorMoves} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ScrollArea>
      </div>
    </div>
  );
}
