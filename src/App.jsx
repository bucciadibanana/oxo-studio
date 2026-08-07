import { useRef, useState } from "react";
import { useLocation } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

import Router from "./Router/Router";
import Header from "./components/Header";
import SplashScreen from "./components/SpashScreen";
import ScrollTriggerHandler from "./components/ScrollTriggerHandler";

gsap.registerPlugin(
  ScrollTrigger,
  ScrollToPlugin,
  useGSAP
);

function App() {
  const [showSplash, setShowSplash] =
    useState(true);

  const location = useLocation();
  const pageRef = useRef(null);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  /*
   * Transizione globale della pagina.
   *
   * IMPORTANTE:
   * non animiamo y, scale o transform sul contenitore
   * che contiene elementi pinned con ScrollTrigger.
   *
   * Usiamo soltanto opacity/autoAlpha.
   */
  useGSAP(
    () => {
      if (
        showSplash ||
        !pageRef.current
      ) {
        return;
      }

      gsap.fromTo(
        pageRef.current,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
          duration: 0.65,
          ease: "power2.out",

          /*
           * Rimuove opacity e visibility inline
           * al termine dell'animazione.
           */
          clearProps: "opacity,visibility",
        }
      );
    },
    {
      scope: pageRef,

      /*
       * location.key cambia a ogni navigazione,
       * anche quando si torna sulla stessa rotta.
       */
      dependencies: [
        location.key,
        showSplash,
      ],

      /*
       * Ripulisce automaticamente la vecchia
       * animazione prima di crearne una nuova.
       */
      revertOnUpdate: true,
    }
  );

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={handleSplashFinish}
      />
    );
  }

  return (
    <>
      <Header />

      {/*
        La key forza React a smontare la pagina precedente
        e montare realmente quella nuova.

        Di conseguenza i useLayoutEffect delle pagine
        ChiSiamo e Prodotti ripartono da zero.
      */}
      <div
        key={location.key}
        ref={pageRef}
        className="page-content"
      >
        <Router />
      </div>

      {/*
        Deve stare DOPO Router.

        In questo modo i componenti della nuova pagina
        creano prima le proprie animazioni e il gestore
        globale esegue poi refresh e aggiornamento.
      */}
      <ScrollTriggerHandler />
    </>
  );
}

export default App;