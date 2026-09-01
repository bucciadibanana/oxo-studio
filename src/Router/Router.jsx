import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


import Home from "../Views/Home";
import ChiSiamo from "../Views/ChiSiamo";
import Prodotti from "../Views/Prodotti";
import Contatti from "../Views/Contatti";


import KairosArchive from "../Views/portfolio/kairosarchive";
import Software from "../Views/portfolio/Software";
import Ai from "../Views/portfolio/ai";
import Game from "../Views/portfolio/game";


import Matte from "../Views/team/matteo";
import Gab from "../Views/team/gab";
import Luca from "../Views/team/luca";


export default function Router() {
  return (
    <Routes>

      {/* =========================
          MAIN
      ========================= */}

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


      {/* =========================
          PRODUCTS
      ========================= */}

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


      {/* =========================
          TEAM
      ========================= */}

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


      {/* =========================
          OLD URL REDIRECTS
      ========================= */}

      <Route
        path="/ChiSiamo"
        element={
          <Navigate
            to="/chisiamo"
            replace
          />
        }
      />


      <Route
        path="/Prodotti"
        element={
          <Navigate
            to="/prodotti"
            replace
          />
        }
      />


      <Route
        path="/Contatti"
        element={
          <Navigate
            to="/contatti"
            replace
          />
        }
      />


      <Route
        path="/Portfolio"
        element={
          <Navigate
            to="/prodotti"
            replace
          />
        }
      />


      <Route
        path="/AppDeveloper"
        element={
          <Navigate
            to="/portfolio/software"
            replace
          />
        }
      />


      <Route
        path="/WebDeveloper"
        element={
          <Navigate
            to="/portfolio/software"
            replace
          />
        }
      />


      <Route
        path="/WebDesign"
        element={
          <Navigate
            to="/prodotti"
            replace
          />
        }
      />


      <Route
        path="/LogoDesign"
        element={
          <Navigate
            to="/prodotti"
            replace
          />
        }
      />


      <Route
        path="/SezioneUiPortfolio"
        element={
          <Navigate
            to="/prodotti"
            replace
          />
        }
      />


      {/* =========================
          404
      ========================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>
  );
}