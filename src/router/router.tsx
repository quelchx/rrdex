import { BrowserRouter, Routes, Route } from "react-router";
import { Layout } from "@/components/layout/layout.tsx";
import { Home } from "./pages/Home.tsx";
import { About } from "./pages/About.tsx";

export function Root() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
