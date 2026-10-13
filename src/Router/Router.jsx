// OXO_SCULTOREO_ROTTA_AUTONOMA_20261013
import MuseiPatrimonio from '../Views/portfolio/musei';
import Archeologia from "../Views/portfolio/archeologia";
import ScultoreoStudio from "../Views/portfolio/ScultoreoStudio";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";


import Home from "../Views/Home";
import ChiSiamo from "../Views/ChiSiamo";
import Prodotti from "../Views/Prodotti";
import Contatti from "../Views/Contatti";


import KairosArchive from "../Views/portfolio/kairosarchive";

import Ai from "../Views/portfolio/ai";
import Game from "../Views/portfolio/game";


import Matte from "../Views/team/matteo";
import Gab from "../Views/team/gab";
import Luca from "../Views/team/luca";


/**
 * Compatibilita con i collegamenti gia presenti in Home e Prodotti.
 * /portfolio/archeologia#scultoreo non deve montare Archeologia:
 * porta alla rotta autonoma che importa direttamente ScultoreoStudio.
 * Non cambia i file dei contenuti ne le relative animazioni.
 */
function IngressoArcheologia() {
  const location = useLocation();
  let frammento = "";
  try {
    frammento = decodeURIComponent(location.hash.slice(1)).toLowerCase();
  } catch {
    // Un frammento malformato non deve bloccare Archeologia.
  }

  const scultoreo = /^scultore[oa](?:-|$)/.test(frammento) ||
    /^scultorio(?:-|$)/.test(frammento);

  if (scultoreo) {
    const ancora = frammento.replace(/^scultor(?:eo|ea|io)(?=-|$)/, "scultoreo");
    return (
      <Navigate
        to={{
          pathname: "/portfolio/scultoreo",
          search: location.search,
          hash: ancora === "scultoreo" ? "" : "#" + encodeURIComponent(ancora),
        }}
        state={location.state}
        replace
      />
    );
  }

  return <Archeologia />;
}

function PaginaScultoreo() {
  return <ScultoreoStudio embedded={false} fullWidth={false} />;
}

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
        element={<Navigate to="/portfolio/archeologia" replace />}
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
            to="/portfolio/archeologia"
            replace
          />
        }
      />


      <Route
        path="/WebDeveloper"
        element={
          <Navigate
            to="/portfolio/archeologia"
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

    <Route path="/portfolio/archeologia" element={<IngressoArcheologia />} />
<Route path="/portfolio/scultoreo" element={<PaginaScultoreo />} />
<Route path="/portfolio/musei" element={<MuseiPatrimonio />} />
<Route path="/portfolio/web" element={<Navigate to="/portfolio/archeologia" replace />} />
</Routes>
  );
}