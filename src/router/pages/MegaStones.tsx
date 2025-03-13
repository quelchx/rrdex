import { FetchError } from "@/components/content/fetch-error";
import { LoadingBlocks } from "@/components/content/loading-blocks";
import { SearchBar } from "@/components/content/search-bar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useMegastones } from "@/hooks/useMegaStones";
import { useMemo, useState } from "react";
export function MegaStones() {
  const { data, isLoading, isError } = useMegastones();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMegastones = useMemo(() => {
    if (!data) return [];
    return data.filter((item) => {
      return item.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm]);

  if (isLoading) return <LoadingBlocks />;
  if (isError) return <FetchError />;

  return (
    data !== undefined && (
      <div className="container px-4 py-2 mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold page-heading">
                Megastone Search
              </h1>
              <p className="text-muted-foreground">
                Browse through all Megastones in this ROM hack.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 px-1 mb-6 sm:flex-row">
            <div className="relative flex-grow">
              <SearchBar
                placeholder="Search for a mega stone..."
                searchQuery={searchTerm}
                setSearchQuery={setSearchTerm}
              />
            </div>
          </div>

          {/* Display count of results */}
          <p className="px-2 mb-6 text-muted-foreground">
            Found {filteredMegastones.length} mega{" "}
            {filteredMegastones.length === 1 ? "stone" : "stones"}
          </p>

          {/* Grid of cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMegastones.map((stone) => (
              <Card key={stone.name} className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{stone.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {stone.description}
                  </p>
                </CardContent>
              </Card>
            ))}
            {filteredMegastones.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">
                  No mega stones found matching your search
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}
