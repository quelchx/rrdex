import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { usePokedex } from "./hooks/usePokedex";
import { DataTable } from "./components/pokemon-table";
import { columns } from "./components/pokemon-columns";

export default function App() {
  const { data, isLoading, isError } = usePokedex();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // You can implement the actual search functionality here
    console.log("Searching for:", query);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError || data === undefined) {
    return (
      <div className="flex items-center justify-center w-full h-screen">
        <p>Failed to load data</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-screen-xl px-4 py-8 mx-auto">
      <div className="flex flex-col items-center justify-center w-full">
        {/* make it red to dark/white gradient */}
        <h1 className="mb-4 text-4xl font-bold text-transparent bg-gradient-to-r from-red-500 to-red-700 bg-clip-text">
          Radical Red Pokedex
        </h1>

        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-xl gap-2 mb-8"
        >
          <div className="relative flex-grow">
            <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>

        {/* Placeholder for the future table */}
        <div className="flex items-center justify-center w-full p-8 border border-dashed rounded-lg border-muted-foreground">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </div>
  );
}
