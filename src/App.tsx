"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function App() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // You can implement the actual search functionality here
    console.log("Searching for:", query);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-6">Search Data</h1>

        <form
          onSubmit={handleSearch}
          className="flex w-full max-w-xl gap-2 mb-8"
        >
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
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
        <div className="w-full border border-dashed border-muted-foreground rounded-lg p-8 flex items-center justify-center">
          <p className="text-muted-foreground">
            Your data table will appear here
          </p>
        </div>
      </div>
    </div>
  );
}
