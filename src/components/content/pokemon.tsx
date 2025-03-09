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

import { PokemonMove } from "@/components/content/pokemon-move";
import { UNKNOWN_SPRITE_URL } from "@/constants";
import { PokemonMoveSet } from "./pokemon-move-set";
import { Button } from "../ui/button";
import { CircleX } from "lucide-react";

export function Pokemon() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { selectedPokemon } = useSelectedPokemonStore();
  const { setPokemonDialog, resetCurrentPokemon } = useSelectedPokemonStore();

  function handleReset() {
    setPokemonDialog(false);
    resetCurrentPokemon();
  }

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0);
  }, [selectedPokemon]);

  if (!selectedPokemon) return null;

  return (
    <div className="container p-4 mx-auto">
      <div className="max-w-4xl mx-auto">
        <div className="sticky top-0 z-10 px-6 pt-6 pb-2">
          <h1 className="flex items-center gap-2 text-2xl">
            <Button variant={"ghost"} onClick={handleReset}>
              <CircleX />
            </Button>
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

        <ScrollArea ref={scrollRef} type="always" className="h-[65vh] px-6">
          <Tabs defaultValue="overview">
            <TabsList className="w-full rounded-[2px]">
              <TabsTrigger value="overview" className="rounded-[2px]">
                Overview
              </TabsTrigger>
              <TabsTrigger value="spread" className="rounded-[2px]">
                Type Effectiveness
              </TabsTrigger>
              <TabsTrigger value="evo" className="rounded-[2px]">
                Evolution
              </TabsTrigger>
              <TabsTrigger value="moves" className="rounded-[2px]">
                Moves
              </TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-1 gap-8 mb-2 md:grid-cols-3">
                {/* Pokemon Image */}
                <Card className="col-span-1 overflow-hidden border-none shadow-none">
                  <CardContent className="flex flex-col items-center p-0">
                    <div className="flex justify-center w-full p-4 rounded-md bg-muted">
                      <img
                        loading="lazy"
                        src={selectedPokemon.sprite || UNKNOWN_SPRITE_URL}
                        alt={selectedPokemon.name}
                        width={120}
                        height={120}
                        className="pixelated"
                      />
                    </div>
                    <h3 className="my-3 font-semibold">Abilities</h3>
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
                          <span className="text-sm font-semibold">
                            {ability.split("-")[0]}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {ability.split("-")[1]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Stats */}
                <Card className="col-span-1 border-none shadow-none md:col-span-2">
                  <CardContent className="p-0">
                    <h3 className="mb-3 font-semibold">Base Stats</h3>
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
                              selectedPokemon.stats.find(
                                (s) => s.title === "BST"
                              )?.value
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="spread">
              <Card className="border-none">
                <CardContent className="p-0">
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
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
            </TabsContent>
            <TabsContent value="evo">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {selectedPokemon.evolution.map((evo, index) => (
                      <div key={index} className="p-2 rounded-md bg-muted/50">
                        {evo}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <ScrollArea
                      className="border rounded-md whitespace-nowrap"
                      scrollHideDelay={500}
                    >
                      <div className="flex gap-2">
                        {selectedPokemon.familyTree.map((img, index) => (
                          <img
                            key={index}
                            src={img || UNKNOWN_SPRITE_URL}
                            alt={`Evolution stage ${index + 1}`}
                            width={90}
                            height={90}
                            className="pixelated"
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="moves" className="">
              <Card className="pt-0 border-none shadow-none">
                <CardContent className="p-0">
                  <Tabs defaultValue="levelup">
                    <TabsList className="grid w-full grid-cols-4 mb-4 rounded-[2px]">
                      <TabsTrigger value="levelup" className="rounded-[2px]">
                        Level Up
                      </TabsTrigger>
                      <TabsTrigger value="tm" className="rounded-[2px]">
                        TM
                      </TabsTrigger>
                      <TabsTrigger className="rounded-[2px]" value="egg">
                        Egg
                      </TabsTrigger>
                      <TabsTrigger className="rounded-[2px]" value="tutor">
                        Tutor
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="levelup" className="space-y-2">
                      {selectedPokemon.levelUpMoves.map((move, index) => (
                        <PokemonMove key={index} move={move} />
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
            </TabsContent>
          </Tabs>
        </ScrollArea>
      </div>
    </div>
  );
}
