import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAbilities } from "@/hooks/useAbilities";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

export function AbilitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useAbilities();

  const filteredAbilities = useMemo(() => {
    if (!data) return [];
    return data.abilities.filter(
      (ability) =>
        ability.names.some((name) =>
          name.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        ability.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ability.ID.toString().includes(searchQuery)
    );
  }, [data, searchQuery]);

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
      <div className="container mx-auto py-2 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2">Pokémon Abilities</h1>
            <p className="text-muted-foreground">
              Browse through all Pokémon abilities in this ROM hack and discover
              their effects
            </p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <Input
              type="text"
              placeholder="Search by name, ID, or description..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {/* change */}
            Showing {filteredAbilities.length} of {data.abilities.length}{" "}
            abilities
          </p>

          <div className="h-[calc(100vh-250px)] overflow-y-auto pr-2 pb-4 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredAbilities.map((ability) => (
                <Card
                  key={ability.ID}
                  className={`border-2 transition-all duration-200 hover:shadow-md`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg font-bold">
                        {ability.names[0]}
                      </CardTitle>
                      <Badge variant="outline" className="text-xs">
                        #{ability.ID}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {ability.description}
                    </p>
                    {ability.names.length > 1 && (
                      <div className="mt-2">
                        <p className="text-xs text-muted-foreground mb-1">
                          Also known as:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {ability.names.slice(1).map((name, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
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
