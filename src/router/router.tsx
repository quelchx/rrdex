import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import { Layout } from "@/components/layout/layout.tsx";
import { LoadingSpinner } from "@/components/content/loading-spinner.tsx";

// import { HomePage } from "./pages/Home.tsx";

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

const TMLocationsPage = lazy(() =>
  import("./pages/TMLocations.tsx").then((module) => ({
    default: module.TMLocationsPage,
  }))
);

const MoveTutorsPage = lazy(() =>
  import("./pages/MoveTutors.tsx").then((module) => ({
    default: module.MoveTutorsPage,
  }))
);

const HomePage = lazy(() =>
  import("./pages/Home.tsx").then((module) => ({ default: module.HomePage }))
);

const OverWorldItemsPage = lazy(() =>
  import("./pages/OverWorldItems.tsx").then((module) => ({
    default: module.OverWorldItemsPage,
  }))
);

const MegaStones = lazy(() =>
  import("./pages/MegaStones.tsx").then((module) => ({
    default: module.MegaStones,
  }))
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
          <Route
            path="tm-locations"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <TMLocationsPage />
              </Suspense>
            }
          />
          <Route
            path="move-tutors"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MoveTutorsPage />
              </Suspense>
            }
          />
          <Route
            path="overworld-items"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <OverWorldItemsPage />
              </Suspense>
            }
          />
          <Route
            path="mega-stones"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <MegaStones />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
