import {
  Routes,
  Route,
} from "react-router-dom";

import Home from     "../Views/Home";
import ChiSiamo from "../Views/ChiSiamo";
import Prodotti from "../Views/Prodotti";
import Contatti from "../Views/Contatti";

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
    </Routes>
  );
}