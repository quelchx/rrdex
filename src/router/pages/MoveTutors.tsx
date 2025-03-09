import { useMemo, useState } from "react";
import { FetchError } from "@/components/content/fetch-error";
import { LoadingBlocks } from "@/components/content/loading-blocks";
import { useMoveTutors } from "@/hooks/useMoveTutors";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SearchBar } from "@/components/content/search-bar";
import { CircleHelp } from "lucide-react";

export function MoveTutorsPage() {
  const { data, isLoading, isError } = useMoveTutors();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showPostGame, setShowPostGame] = useState(true);

  const locations = useMemo(() => {
    if (!data) return [];
    return [...new Set(data.map((tutor) => tutor.location))];
  }, [data]);

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((tutor) => {
      if (!showPostGame && tutor.isPostGame) return false;
      if (filterType !== "all" && tutor.location !== filterType) return false;
      const searchLower = searchTerm.toLowerCase();

      return (
        searchTerm === "" ||
        tutor.location.toLowerCase().includes(searchLower) ||
        tutor.person.toLowerCase().includes(searchLower) ||
        tutor.cost.toLowerCase().includes(searchLower) ||
        tutor.moves.some((move) =>
          move.name.toLowerCase().includes(searchLower)
        )
      );
    });
  }, [data, filterType, searchTerm, showPostGame]);

  if (isLoading) return <LoadingBlocks />;
  if (isError || data === undefined) return <FetchError />;

  return (
    <div className="container px-4 py-2 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-start justify-between pb-2 lg:flex-row lg:pb-0 lg:items-center">
          <h1 className="text-4xl font-bold page-heading">Move Tutors</h1>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge variant={"default"}>
                    {/* question mark circle */}
                    <CircleHelp />
                    Non Restricted
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Moves are available regardless of game mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant={"secondary"}
                    className={"bg-red-500/20 text-red-500 hover:bg-red-500/30"}
                  >
                    <CircleHelp />
                    Restricted
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Moves are restricted if playing hardcore mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <p className="text-muted-foreground">
          Browse through all move tutors in this ROM hack and discover their
          locations and moves.
        </p>

        <div className="flex flex-col gap-4 my-4 mb-6 md:flex-row">
          <div className="relative flex-1">
            <SearchBar
              searchQuery={searchTerm}
              setSearchQuery={setSearchTerm}
              placeholder="Search for a move tutor"
            />
          </div>

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Filter by location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((location) => (
                <SelectItem key={location} value={location}>
                  {location}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center space-x-2">
            <Switch
              id="post-game"
              checked={showPostGame}
              onCheckedChange={setShowPostGame}
            />
            <Label htmlFor="post-game">Show Post-Game</Label>
          </div>
        </div>

        {filteredData.length === 0 ? (
          <div className="py-10 text-center">
            <p className="text-muted-foreground">
              No move tutors found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((tutor, index) => (
              <Card
                key={index}
                className={tutor.isPostGame ? "border-amber-500/50" : ""}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg font-medium">
                      {tutor.person}
                    </CardTitle>
                    {tutor.isPostGame && (
                      <Badge
                        variant="outline"
                        className="bg-amber-500/10 text-amber-500 border-amber-500/20"
                      >
                        Post-Game
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {tutor.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-sm">
                    <span className="font-medium">Cost:</span>{" "}
                    <span>{tutor.cost}</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Moves:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {tutor.moves.map((move, idx) => (
                        <Badge
                          key={idx}
                          variant={move.restricted ? "secondary" : "default"}
                          className={
                            move.restricted
                              ? "bg-red-500/20 text-red-500 hover:bg-red-500/30"
                              : ""
                          }
                        >
                          {move.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
