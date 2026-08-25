import {
  Routes,
  Route,
} from "react-router-dom";

import Home from "../Views/Home";
import ChiSiamo from "../Views/ChiSiamo";
import Prodotti from "../Views/Prodotti";
import Contatti from "../Views/Contatti";

import KairosArchive from "../Views/portfolio/kairosarchive";
import Software from "../Views/portfolio/Software";
import Ai from "../Views/portfolio/ai"
import Game from "../Views/portfolio/game"
import Matte from "../Views/team/matteo"
import Gab from "../Views/team/gab"
import Luca from "../Views/team/luca"

export default function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/chisiamo"
        element={<ChiSiamo />}
      />

      <Route
        path="/prodotti"
        element={<Prodotti />}
      />

      <Route
        path="/contatti"
        element={<Contatti />}
      />

      <Route
        path="/portfolio/kairosarchive"
        element={<KairosArchive />}
      />

      <Route
        path="/portfolio/software"
        element={<Software />}
      />
      <Route
        path="/portfolio/ai"
        element={<Ai />}
      />
          <Route
        path="/portfolio/game"
        element={<Game />}
      />
          <Route
        path="/team/matteo"
        element={<Matte />}
      />
          <Route
        path="/team/gab"
        element={<Gab />}
      />
          <Route
        path="/team/luca"
        element={<Luca />}
      />
    </Routes>
  );
}