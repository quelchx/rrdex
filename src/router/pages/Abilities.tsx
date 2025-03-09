import { useMemo, useState } from "react";
import { useAbilities } from "@/hooks/useAbilities";

import { Badge } from "@/components/ui/badge";
import { FetchError } from "@/components/content/fetch-error";
import { LoadingBlocks } from "@/components/content/loading-blocks";
import { SearchBar } from "@/components/content/search-bar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    return <LoadingBlocks />;
  }

  if (isError || data === undefined) {
    return <FetchError message="Unable to fetch abilities" />;
  }

  return (
    <div className="container px-4 py-2 mx-auto">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col mb-8">
          <h1 className="mb-2 text-4xl font-bold page-heading">
            Pokémon Abilities
          </h1>
          <p className="text-muted-foreground">
            Browse through all Pokémon abilities in this ROM hack and discover
            their effects
          </p>
        </div>

        <div className="relative mb-6">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by name, ID, or description..."
          />
        </div>
        <p className="mb-4 text-sm text-muted-foreground">
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
                  <div className="flex items-start justify-between">
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
                      <p className="mb-1 text-xs text-muted-foreground">
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
  );
}
