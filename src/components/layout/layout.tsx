import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Outlet } from "react-router";

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
      toast("So your aware", {
        description: "Table is not optimized for mobile view",
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
    <div className="min-h-screen bg-background justify-center items-center flex flex-col">
      <Navbar />
      <main className="flex-1 container py-8 md:py-12">
        <div className="flex flex-col items-center justify-center w-full">
          <Outlet />
        </div>
      </main>
      <Footer />
      <Toaster visibleToasts={1} />
    </div>
  );
}
