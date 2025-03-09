import { useEffect, useState, lazy, Suspense } from "react";
import { toast } from "sonner";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Outlet } from "react-router";

const Toaster = lazy(() =>
  import("sonner").then((module) => ({
    default: module.Toaster,
  }))
);

export function Layout() {
  const [gaveWarning, setGaveWarning] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    if (!gaveWarning) {
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [gaveWarning]);

  useEffect(() => {
    if (windowWidth < 960 && !gaveWarning) {
      toast("Note", {
        description: "Website is better viewed on a larger screen",
        duration: 8000,
        action: {
          label: "Undo",
          onClick: () => null,
        },
      });
      setGaveWarning(true);
    }
  }, [windowWidth, gaveWarning]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Navbar />
      <main className="container flex-1 py-8 md:py-12">
        <div className="flex flex-col items-center justify-center w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      <Suspense fallback={null}>
        <Toaster visibleToasts={1} />
      </Suspense>
    </div>
  );
}
