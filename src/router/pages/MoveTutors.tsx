import { useMemo, useState } from "react";
import { FetchError } from "@/components/content/fetch-error";
import { LoadingBlocks } from "@/components/content/loading-blocks";
import { useMoveTutors } from "@/hooks/useMoveTutors";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Search } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold page-heading">Move Tutors</h1>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge className="rounded-none" variant={"default"}>
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
                  className={
                    "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30 rounded-none"
                  }
                >
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

      <div className="flex flex-col md:flex-row gap-4 my-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by location, person, move..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            No move tutors found matching your search.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredData.map((tutor, index) => (
            <Card
              key={index}
              className={tutor.isPostGame ? "border-amber-500/50" : ""}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
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
                  <div className="mt-1 flex flex-wrap gap-1">
                    {tutor.moves.map((move, idx) => (
                      <Badge
                        key={idx}
                        variant={move.restricted ? "secondary" : "default"}
                        className={
                          move.restricted
                            ? "bg-purple-500/20 text-purple-500 hover:bg-purple-500/30"
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
  );
}
