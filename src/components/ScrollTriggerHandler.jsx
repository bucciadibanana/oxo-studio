import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTriggerHandler() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const html =
      document.documentElement;

    const body =
      document.body;

    const previousHtmlScrollBehavior =
      html.style.scrollBehavior;

    const previousBodyScrollBehavior =
      body.style.scrollBehavior;

    let cancelled = false;
    let secondFrame = 0;

    /*
     * Disattiviamo temporaneamente lo smooth scroll.
     * Il reset deve essere immediato e non animato.
     */
    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    /*
     * Il browser non deve ripristinare la posizione
     * della vecchia pagina durante la navigazione SPA.
     */
    if (
      "scrollRestoration" in window.history
    ) {
      window.history.scrollRestoration =
        "manual";
    }

    const resetScrollPosition = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto",
      });

      html.scrollTop = 0;
      body.scrollTop = 0;
    };

    const refreshScrollTriggers = () => {
      if (cancelled) {
        return;
      }

      /*
       * Cancella soltanto la memoria della precedente
       * posizione di scroll.

       * NON elimina le animazioni esistenti.
       */
      ScrollTrigger.clearScrollMemory(
        "manual"
      );

      /*
       * Riordina i trigger, ricalcola start/end/pin
       * e sincronizza lo stato con lo scroll attuale.
       */
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
      ScrollTrigger.update();
    };

    /*
     * Reset eseguito una sola volta
     * durante il cambio rotta.
     */
    resetScrollPosition();

    /*
     * Due frame consentono a React di:
     *
     * 1. smontare la vecchia pagina;
     * 2. montare la nuova pagina;
     * 3. eseguire i useLayoutEffect dei componenti;
     * 4. creare timeline e ScrollTrigger;
     * 5. completare il primo layout.
     */
    const firstFrame =
      window.requestAnimationFrame(() => {
        secondFrame =
          window.requestAnimationFrame(() => {
            if (cancelled) {
              return;
            }

            refreshScrollTriggers();

            html.style.scrollBehavior =
              previousHtmlScrollBehavior;

            body.style.scrollBehavior =
              previousBodyScrollBehavior;
          });
      });

    /*
     * Secondo refresh dopo il caricamento iniziale
     * di CSS, immagini e video.
     *
     * Non viene effettuato un altro scrollToTop,
     * quindi non interrompe l'utente mentre scorre.
     */
    const firstRefreshTimer =
      window.setTimeout(() => {
        refreshScrollTriggers();
      }, 250);

    /*
     * Ultimo controllo quando il layout
     * dovrebbe essersi stabilizzato.
     */
    const finalRefreshTimer =
      window.setTimeout(() => {
        refreshScrollTriggers();
      }, 800);

    /*
     * I font personalizzati possono modificare
     * dimensioni e posizione dei testi.
     */
    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          refreshScrollTriggers();
        })
        .catch(() => {
          /*
           * Nessuna operazione necessaria.
           */
        });
    }

    return () => {
      cancelled = true;

      window.cancelAnimationFrame(
        firstFrame
      );

      if (secondFrame) {
        window.cancelAnimationFrame(
          secondFrame
        );
      }

      window.clearTimeout(
        firstRefreshTimer
      );

      window.clearTimeout(
        finalRefreshTimer
      );

      html.style.scrollBehavior =
        previousHtmlScrollBehavior;

      body.style.scrollBehavior =
        previousBodyScrollBehavior;
    };
  }, [location.key]);

  return null;
}