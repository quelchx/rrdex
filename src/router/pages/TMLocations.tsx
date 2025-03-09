import { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useTMLocations } from "@/hooks/useTMLocations";
import { LoadingBlocks } from "@/components/content/loading-blocks";
import { FetchError } from "@/components/content/fetch-error";
import { SearchBar } from "@/components/content/search-bar";

export function TMLocationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data, isLoading, isError } = useTMLocations();

  const filteredTMs = useMemo(() => {
    if (!data) return [];
    return data.filter(
      (tm) =>
        tm.no.includes(searchQuery) ||
        tm.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  if (isLoading) return <LoadingBlocks />;
  if (isError || data === undefined) return <FetchError />;

  return (
    <div className="container mx-auto py-2 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-bold page-heading">
              Pokemon TMs & HMs
            </h1>
            <p className="text-muted-foreground">
              Browse through all Pokémon TMs & HMs in this ROM hack and discover
              their locations.
            </p>
          </div>
        </div>

        <div className="relative mx-auto mb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by TM number or name..."
          />
        </div>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredTMs.map((tm) => (
              <Card
                key={tm.no}
                className="border-2 hover:border-primary transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                      TM{tm.no}
                    </span>
                    <h3 className="font-bold text-lg">{tm.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{tm.info}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTMs.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No TMs found matching "{searchQuery}"
            </div>
          )}
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Showing {filteredTMs.length} of {data.length} TMs
        </div>
      </div>
    </div>
  );
}
