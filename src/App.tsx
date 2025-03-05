import { ModeToggle } from "@/components/views/mode-toggle";
import { ThemeProvider } from "@/components/views/theme-provider";
import { columns } from "./components/views/columns";
import { DataTable } from "./components/views/data-table";

// import { useEffect, useState } from "react";
// import { RadicalRedPokedex } from "./types";
// import { getPokedex } from "./lib/utils";

function App() {
  // const [pokedex, setPokedex] = useState<RadicalRedPokedex[]>([]);

  // useEffect(() => {
  //   getPokedex().then((data) => setPokedex(data));
  // }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen dark:text-white dark:bg-neutral-900 transition-colors duration-200">
        <div className="max-w-5xl text-center mx-auto pb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-black dark:to-gray-400 bg-clip-text text-transparent">
            Radical Red Dex
          </h1>
          <p>
            The non-official Pokedex for Radical Red, a Pokemon Fire Red ROM
            hack.
          </p>
          {/* {pokedex && (
            <pre>
              <code>{JSON.stringify(pokedex, null, 2)}</code>
            </pre>
          )} */}
          <DataTable columns={columns} data={[]} />
        </div>

        <footer className="flex items-center justify-center gap-2 fixed bottom-4 left-0 right-0 text-center text-sm text-gray-600 dark:text-gray-400">
          <a
            target="_blank"
            className="hover:text-gray-800 dark:hover:text-gray-200"
          >
            quelchx
          </a>
          •
          <a
            target="_blank"
            className="hover:text-gray-800 dark:hover:text-gray-200"
          >
            github
          </a>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
