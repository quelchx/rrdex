import { Pokedex } from "@/components/views/pokedex";
import { ModeToggle } from "@/components/views/mode-toggle";
import { ThemeProvider } from "./components/providers/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="mx-auto max-w-7xl flex flex-col items-center justify-center min-h-screen">
        <div className="text-center container py-4 px-3">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-black dark:to-gray-400 bg-clip-text text-transparent">
            Radical Red Dex
          </h1>
          <p>
            The non-official Pokedex for Radical Red, a Pokemon Fire Red ROM
            hack.
          </p>

          <Pokedex />
        </div>

        <div className="fixed top-4 right-4">
          <ModeToggle />
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
