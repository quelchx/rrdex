import { Button } from "@/components/ui/button";
import { Database, Laptop } from "lucide-react";
import { NavLink } from "react-router";

export function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-4xl font-bold">Radical Red Rom Hack Pokedex</h1>
      <p className="mb-4">
        Welcome to the documentation for the Radical Red Rom Hack Pokedex. This
        project was built with passion to improve the existing Pokedex available
        at{" "}
        <a
          href="https://dex.radicalred.net/"
          className="text-primary underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          dex.radicalred.net
        </a>{" "}
        and add extra search functionality.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Features</h2>
      <ul className="mb-4 list-inside list-disc space-y-1">
        <li>Comprehensive Pokémon database for Radical Red Rom Hack</li>
        <li>Advanced search functionality by name, move, ability, and type</li>
        <li>Clean and minimal design with dark mode support</li>
        <li>Responsive layout for desktop and mobile devices</li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Getting Started</h2>
      <p className="mb-4">
        To get started with our Pokedex, please navigate through the sections
        using the sections dropdown menu. Here are some key features to explore:
      </p>
      <ul className="mb-4 list-inside list-disc space-y-1">
        <li>
          <strong>Search Pokémon</strong>: Find Pokémon by name, move, ability,
          or type
        </li>
        <li>
          <strong>View Details</strong>: Get comprehensive information about
          each Pokémon
        </li>
        <li>
          <strong>Filter Moves</strong>: Filter moves by type, category, and
        </li>
        <li>
          <strong>Filter Abilities</strong>: Filter abilities by generation and
          category
        </li>
        <li>
          <strong>(Coming Soon) Compare Stats</strong>: Compare different
          Pokémon side by side
        </li>
      </ul>

      <div className="my-8 rounded-lg border bg-muted/50 p-4">
        <h3 className="mb-2 font-medium">Note on Performance</h3>
        <p>
          A lot of data is being loaded in, so some load times may vary. This
          will improve over time as we implement different optimization
          techniques.
        </p>
      </div>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Data Sources</h2>
      <p className="mb-4">
        All data was collected through web scraping and by modifying existing
        data sets. The quality and accuracy of the data will continue to improve
        over time as I refine the collection methods and sources.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Development Status</h2>
      <p className="mb-4">
        This project was built over a few days and is still under active
        development. I will do my best to improve and add new features rapidly.
        The API will be improving over time, and new features will be added
        based on user feedback and requests.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Community Resources</h2>
      <p className="mb-4">
        These community-maintained resources provide valuable information for
        Radical Red players:
      </p>
      <ul className="mb-4 space-y-3">
        <li className="flex items-start gap-2">
          <div className="mt-0.5 rounded-md bg-primary/10 p-1">
            <Database className="size-4 text-primary" />
          </div>
          <div>
            <a
              href="https://docs.google.com/spreadsheets/d/15mUFUcN8250hRL7iUOJPX0s1rMcgVuJPuHANioL4o2o/edit?gid=45654363#gid=45654363"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Pokémon Locations & Raid Dens v4.1
            </a>
            <p className="text-sm text-muted-foreground">
              Comprehensive guide to finding Pokémon in the wild and in raid
              dens
            </p>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <div className="mt-0.5 rounded-md bg-primary/10 p-1">
            <Database className="size-4 text-primary" />
          </div>
          <div>
            <a
              href="https://docs.google.com/spreadsheets/d/16vBrWJDrsw5QsZyiJjD8ACH7079ZCkQ5BaPtioJOPTk/edit?gid=1493231050#gid=1493231050"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Item, TM, and Move Tutor Locations v4.1
            </a>
            <p className="text-sm text-muted-foreground">
              Find all items, TMs, and move tutors throughout the game
            </p>
          </div>
        </li>
        <li className="flex items-start gap-2">
          <div className="mt-0.5 rounded-md bg-primary/10 p-1">
            <Laptop className="size-4 text-primary" />
          </div>
          <div>
            <a
              href="https://www.reddit.com/r/pokemonradicalred/"
              className="font-medium text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Reddit Radical Red Community
            </a>
            <p className="text-sm text-muted-foreground">
              Join discussions, get tips, and share your experiences with other
              players
            </p>
          </div>
        </li>
      </ul>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Contributing</h2>
      <p className="mb-4">
        I welcome contributions to the Pokedex. If you find any errors or have
        suggestions for improvement, please reach out or submit a pull request
        on our GitHub repository. This was built for the community so any help
        is appreciated.
      </p>

      <h2 className="mb-4 mt-8 text-2xl font-semibold">Contact</h2>
      <p className="mb-4">
        If you have any questions or feature requests, please don&apos;t
        hesitate to message us. This project was built mainly for educational
        purposes, and we&apos;re always looking to improve it.
      </p>

      <div className="mt-12 rounded-lg border bg-primary/5 p-6 text-center">
        <h3 className="mb-2 text-xl font-medium">Ready to explore?</h3>
        <p className="mb-4">
          Start searching for your favorite Pokémon from the Radical Red Rom
          Hack.
        </p>
        <Button asChild>
          <NavLink to="/">Open Pokedex</NavLink>
        </Button>
      </div>
    </main>
  );
}
