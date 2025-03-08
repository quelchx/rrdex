import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout/layout.tsx";

import { HomePage } from "./pages/Home.tsx";
import { AboutPage } from "./pages/About.tsx";
import { AbilitiesPage } from "./pages/Abilities.tsx";
import { MovesPage } from "./pages/Moves.tsx";

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="abilities" element={<AbilitiesPage />} />
          <Route path="moves" element={<MovesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
