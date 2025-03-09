import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t py-6 md:py-0 w-full flex justify-center bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-14 md:flex-row">
        <p className="text-sm leading-loose text-center text-muted-foreground md:text-left">
          Built with passion for Radical Red fans
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/quelchx/rrdex"
            target="_blank"
            rel="noreferrer"
            className="flex items-center text-sm font-medium gap-1 transition-colors hover:text-foreground/80"
          >
            <Github className="w-4 h-4" />
            <span>Repository</span>
          </a>
          <a
            href="https://github.com/quelchx"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium transition-colors hover:text-foreground/80"
          >
            quelchx
          </a>
        </div>
      </div>
    </footer>
  );
}
