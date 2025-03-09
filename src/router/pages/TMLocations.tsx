import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useTMLocations } from "@/hooks/useTMLocations";
import { LoadingBlocks } from "@/components/content/loading-blocks";
import { FetchError } from "@/components/content/fetch-error";

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
  if (isError) return <FetchError />;

  return data ? (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Radical Red TM Finder
      </h1>

      {/* Search bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search by TM number or name..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* TM Grid */}
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
  ) : null;
}
