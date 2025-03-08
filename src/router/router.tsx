import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout/layout.tsx";

import { HomePage } from "./pages/Home.tsx";
import { lazy, Suspense } from "react";
import { LoadingSpinner } from "@/components/content/loading-spinner.tsx";

const AboutPage = lazy(() =>
  import("./pages/About.tsx").then((module) => ({ default: module.AboutPage }))
);

const AbilitiesPage = lazy(() =>
  import("./pages/Abilities.tsx").then((module) => ({
    default: module.AbilitiesPage,
  }))
);

const MovesPage = lazy(() =>
  import("./pages/Moves.tsx").then((module) => ({ default: module.MovesPage }))
);

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="abilities"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <AbilitiesPage />
              </Suspense>
            }
          />
          <Route
            path="moves"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MovesPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
