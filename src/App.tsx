import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen dark:text-white dark:bg-neutral-900 transition-colors duration-200">
        <div className="max-w-2xl text-center px-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-black dark:to-gray-400 bg-clip-text text-transparent">
            Radical Red Dex
          </h1>
          <p>
            The non-official Pokedex for Radical Red, a Pokemon Fire Red ROM
            hack.
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Input type="text" placeholder="Search for a Pokemon..." />
            <Button variant="outline">Search</Button>
          </div>
        </div>
        <footer className="flex items-center justify-center gap-2 fixed bottom-4 left-0 right-0 text-center text-sm text-gray-600 dark:text-gray-400">
          <a
            href="https://t3.chat"
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
            Github
          </a>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
