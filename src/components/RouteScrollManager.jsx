import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Montare UNA SOLA VOLTA dentro BrowserRouter e fuori da Routes.
 * Gestisce il ritorno in cima e ricalcola ScrollTrigger dopo ogni cambio rotta.
 * Non elimina mai globalmente i trigger delle singole pagine.
 */
export default function RouteScrollManager() {
  const location = useLocation();

  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const html = document.documentElement;
    const body = document.body;

    const previousHtmlScrollBehavior = html.style.scrollBehavior;
    const previousBodyScrollBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const scrollToRouteStart = () => {
      if (location.hash) {
        const id = decodeURIComponent(location.hash.slice(1));
        const target = document.getElementById(id);

        if (target) {
          target.scrollIntoView({ block: "start", behavior: "auto" });
          return;
        }
      }

      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      html.scrollTop = 0;
      body.scrollTop = 0;
    };

    // Un solo reset immediato: non continua a riportare l'utente in cima.
    scrollToRouteStart();

    let secondFrame = 0;

    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.clearScrollMemory("manual");
        ScrollTrigger.sort();
        ScrollTrigger.refresh(true);
        ScrollTrigger.update();

        html.style.scrollBehavior = previousHtmlScrollBehavior;
        body.style.scrollBehavior = previousBodyScrollBehavior;
      });
    });

    // Ricalcola dopo il primo assestamento di font, immagini e video,
    // ma NON modifica nuovamente la posizione di scroll.
    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
      ScrollTrigger.update();
    }, 350);

    let cancelled = false;

    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) {
            ScrollTrigger.refresh(true);
          }
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);

      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }

      window.clearTimeout(refreshTimer);

      html.style.scrollBehavior = previousHtmlScrollBehavior;
      body.style.scrollBehavior = previousBodyScrollBehavior;
    };
  }, [location.pathname, location.search, location.hash, location.key]);

  return null;
}