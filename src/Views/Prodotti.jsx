import { useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";


gsap.registerPlugin(ScrollTrigger);

const PRODUCTS = [
  {
    id: "01",
    category: "SOFTWARE / AI",
    title: "KAIROSARCHIVE",
    statement: "KNOWLEDGE, ORGANIZED.",
    description:
      "Un sistema intelligente per metadatazione, catalogazione, ricerca e organizzazione documentale. Trasforma informazioni frammentate in un patrimonio interrogabile e operativo.",
    meta: "ARCHIVE INTELLIGENCE / AUTOMATION",
    video: "/videos/products/kairosarchive.mp4",
    link: "/portfolio/kairosarchive",
    accent: "#35d8ff",
    accentSoft: "rgba(53,216,255,.18)",
    objectPosition: "center center",
    fallback:
      "radial-gradient(circle at 72% 28%, rgba(53,216,255,.34), transparent 32%), radial-gradient(circle at 18% 78%, rgba(80,70,255,.22), transparent 38%), linear-gradient(135deg, #02121b 0%, #050711 54%, #010101 100%)",
    specs: [
      ["FIELD", "CULTURAL DATA"],
      ["CORE", "AI / SEARCH"],
      ["OUTPUT", "STRUCTURED KNOWLEDGE"],
    ],
    tags: ["MARC 21", "SBN", "Z39.50", "AUTOMATION"],
  },
  {
    id: "02",
    category: "DIGITAL PRODUCT",
    title: "CUSTOM SOFTWARE",
    statement: "COMPLEXITY, MADE USABLE.",
    description:
      "Applicazioni web e sistemi gestionali costruiti intorno ai processi reali del cliente: architetture solide, interfacce chiare e strumenti pronti a evolvere.",
    meta: "PRODUCT / UX / ENGINEERING",
    video: "/videos/products/custom-software.mp4",
    link: "/portfolio",
    accent: "#8b5cf6",
    accentSoft: "rgba(139,92,246,.18)",
    objectPosition: "center center",
    fallback:
      "radial-gradient(circle at 24% 40%, rgba(139,92,246,.37), transparent 36%), radial-gradient(circle at 82% 75%, rgba(255,79,216,.16), transparent 36%), linear-gradient(135deg, #13051f 0%, #080810 55%, #010101 100%)",
    specs: [
      ["FIELD", "BUSINESS SYSTEMS"],
      ["CORE", "CLOUD / API"],
      ["OUTPUT", "SCALABLE SOFTWARE"],
    ],
    tags: ["WEB APP", "DASHBOARD", "DATABASE", "CLOUD"],
  },
  {
    id: "03",
    category: "INTELLIGENZA ARTIFICIALE",
    title: "AI SYSTEMS",
    statement: "AUTOMATION WITH A PURPOSE.",
    description:
      "Motori di classificazione, ricerca semantica e automazioni progettati per ridurre il lavoro ripetitivo e rendere i dati realmente utilizzabili.",
    meta: "DATA / AUTOMATION / KNOWLEDGE",
    video: "/videos/products/artificial-intelligence.mp4",
    link: "/portfolio",
    accent: "#20f0c7",
    accentSoft: "rgba(32,240,199,.16)",
    objectPosition: "center center",
    fallback:
      "radial-gradient(circle at 76% 54%, rgba(32,240,199,.31), transparent 35%), radial-gradient(circle at 12% 22%, rgba(41,121,255,.26), transparent 38%), linear-gradient(135deg, #001515 0%, #020711 54%, #010101 100%)",
    specs: [
      ["FIELD", "INTELLIGENT FLOWS"],
      ["CORE", "ML / LLM / DATA"],
      ["OUTPUT", "AUTOMATED DECISIONS"],
    ],
    tags: ["CLASSIFICATION", "OCR", "SEARCH", "AGENTS"],
  },
  {
    id: "04",
    category: "VIDEOGAME / REAL TIME",
    title: "INTERACTIVE WORLDS",
    statement: "CODE YOU CAN FEEL.",
    description:
      "Videogame, prototipi e ambienti interattivi in cui gameplay, immagine, movimento e suono vengono progettati come un solo organismo.",
    meta: "GAMEPLAY / MOTION / EXPERIENCE",
    video: "/videos/products/interactive-worlds.mp4",
    link: "/portfolio",
    accent: "#ff4fd8",
    accentSoft: "rgba(255,79,216,.17)",
    objectPosition: "center center",
    fallback:
      "radial-gradient(circle at 30% 34%, rgba(255,79,216,.33), transparent 36%), radial-gradient(circle at 80% 76%, rgba(87,74,255,.25), transparent 38%), linear-gradient(135deg, #1a0418 0%, #08040f 56%, #010101 100%)",
    specs: [
      ["FIELD", "INTERACTIVE MEDIA"],
      ["CORE", "REAL TIME / 3D"],
      ["OUTPUT", "LIVING EXPERIENCES"],
    ],
    tags: ["GAMEPLAY", "3D", "MOTION", "PROTOTYPING"],
  },
];

const CAPABILITIES = [
  {
    id: "01",
    title: "PRODUCT DESIGN",
    eyebrow: "FROM IDEA TO INTERFACE",
    copy:
      "Strategia, struttura, UX e direzione visiva diventano un unico sistema leggibile, coerente e riconoscibile.",
    accent: "#35d8ff",
    tags: ["RESEARCH", "UX", "UI", "DESIGN SYSTEM"],
    background:
      "radial-gradient(circle at 78% 22%, rgba(53,216,255,.26), transparent 34%), linear-gradient(145deg, #07141c, #050507 58%, #010101)",
  },
  {
    id: "02",
    title: "ENGINEERING",
    eyebrow: "BUILT TO WORK",
    copy:
      "Frontend, backend, API e database vengono progettati per essere veloci oggi e sostenibili quando il prodotto cresce.",
    accent: "#8b5cf6",
    tags: ["REACT", "PYTHON", "API", "CLOUD"],
    background:
      "radial-gradient(circle at 24% 30%, rgba(139,92,246,.29), transparent 34%), linear-gradient(145deg, #16071f, #07070b 58%, #010101)",
  },
  {
    id: "03",
    title: "AI INTEGRATION",
    eyebrow: "INTELLIGENCE INSIDE",
    copy:
      "L’intelligenza artificiale entra nei flussi dove produce un vantaggio misurabile, non come decorazione da presentazione.",
    accent: "#20f0c7",
    tags: ["ML", "LLM", "RAG", "AUTOMATION"],
    background:
      "radial-gradient(circle at 74% 68%, rgba(32,240,199,.25), transparent 35%), linear-gradient(145deg, #031714, #05070a 58%, #010101)",
  },
  {
    id: "04",
    title: "REAL-TIME",
    eyebrow: "SYSTEMS IN MOTION",
    copy:
      "Prototipi, videogame e mondi interattivi costruiti per rispondere, sorprendere e restare impressi.",
    accent: "#ff4fd8",
    tags: ["UNITY", "3D", "MOTION", "SOUND"],
    background:
      "radial-gradient(circle at 28% 30%, rgba(255,79,216,.27), transparent 35%), linear-gradient(145deg, #190617, #08060c 58%, #010101)",
  },
];

const PRINCIPLES = [
  {
    id: "01",
    title: "UTILE PRIMA DI TUTTO",
    copy:
      "Ogni effetto, interazione e funzione deve migliorare l’esperienza oppure non serve.",
    accent: "#35d8ff",
  },
  {
    id: "02",
    title: "PENSATO COME SISTEMA",
    copy:
      "Non costruiamo schermate isolate: progettiamo relazioni, regole e componenti capaci di durare.",
    accent: "#8b5cf6",
  },
  {
    id: "03",
    title: "PRONTO A EVOLVERE",
    copy:
      "Il prodotto non termina al lancio. Misura, apprende e cresce insieme alle persone che lo utilizzano.",
    accent: "#20f0c7",
  },
];

const FULL_CLIP = "inset(0% 0% 0% 0%)";
const CLOSED_CLIP = "inset(12% 18% 12% 18%)";
const SHUTTERS = Array.from({ length: 6 }, (_, index) => index);

function SplitLetters({ text, attribute = "data-products-letter" }) {
  return text.split("").map((char, index) => (
    <span
      key={`${char}-${index}`}
      {...{ [attribute]: "" }}
      className="inline-block whitespace-pre"
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

function SplitWords({ text }) {
  return text.split(" ").map((word, index) => (
    <span
      key={`${word}-${index}`}
      data-principles-word
      className="inline-block overflow-hidden align-top"
    >
      <span className="inline-block">{word}&nbsp;</span>
    </span>
  ));
}

export default function Prodotti() {
  const location = useLocation();

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const showcaseRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const principlesRef = useRef(null);
  const finalRef = useRef(null);

  /*
   * React Router mantiene spesso la posizione precedente della pagina.
   * Prima di ricreare gli ScrollTrigger riportiamo quindi la viewport in alto,
   * cancelliamo la memoria interna di ScrollTrigger e ricalcoliamo tutte le misure.
   * location.key cambia a ogni navigazione, anche tornando sulla stessa rotta.
   */
  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    let secondFrame = 0;

    const firstFrame = window.requestAnimationFrame(() => {
      window.scrollTo(0, 0);

      secondFrame = window.requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh(true);
        root.style.scrollBehavior = previousScrollBehavior;
      });
    });

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    }, 350);

    const finalRefreshTimer = window.setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000);

    return () => {
      window.cancelAnimationFrame(firstFrame);
      if (secondFrame) window.cancelAnimationFrame(secondFrame);
      window.clearTimeout(refreshTimer);
      window.clearTimeout(finalRefreshTimer);
      root.style.scrollBehavior = previousScrollBehavior;
    };
  }, [location.key]);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const showcase = showcaseRef.current;
    const capabilities = capabilitiesRef.current;
    const principles = principlesRef.current;
    const finalSection = finalRef.current;

    if (
      !page ||
      !hero ||
      !showcase ||
      !capabilities ||
      !principles ||
      !finalSection
    ) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    let productVideos = [];

    const ctx = gsap.context(() => {
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-products-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-products-meta]")
      );
      const heroTitle = hero.querySelector("[data-products-hero-title]");
      const heroGhost = hero.querySelector("[data-products-hero-ghost]");
      const heroRing = hero.querySelector("[data-products-hero-ring]");

      gsap.fromTo(
        heroLetters,
        {
          yPercent: 135,
          rotateX: -86,
          rotateZ: -2,
          opacity: 0,
          transformOrigin: "50% 100%",
        },
        {
          yPercent: 0,
          rotateX: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.032,
          ease: "power4.out",
          delay: 0.1,
        }
      );

      gsap.fromTo(
        heroMeta,
        { y: 34, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.62,
        }
      );

      if (heroGhost) {
        gsap.fromTo(
          heroGhost,
          { xPercent: 14, opacity: 0 },
          {
            xPercent: 0,
            opacity: 1,
            duration: 1.4,
            ease: "power3.out",
            delay: 0.35,
          }
        );
      }

      if (heroTitle) {
        gsap.to(heroTitle, {
          yPercent: 22,
          scale: 0.91,
          opacity: 0.34,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (heroRing) {
        gsap.to(heroRing, {
          rotate: 125,
          scale: 1.22,
          xPercent: -18,
          yPercent: 12,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions;
          const panels = gsap.utils.toArray(
            showcase.querySelectorAll("[data-product-panel]")
          );
          const contents = panels
            .map((panel) => panel.querySelector("[data-product-content]"))
            .filter(Boolean);
          const specs = panels
            .map((panel) => panel.querySelector("[data-product-specs]"))
            .filter(Boolean);
          const frames = panels
            .map((panel) => panel.querySelector("[data-product-frame]"))
            .filter(Boolean);
          const ghosts = panels
            .map((panel) => panel.querySelector("[data-product-ghost]"))
            .filter(Boolean);
          const railItems = gsap.utils.toArray(
            showcase.querySelectorAll("[data-product-rail-item]")
          );
          const progress = showcase.querySelector("[data-product-progress]");
          const counter = showcase.querySelector("[data-product-counter]");

          productVideos = panels
            .map((panel) => panel.querySelector("video"))
            .filter(Boolean);

          if (!panels.length) return undefined;

          let timeline;
          let activePanel = 0;
          let activeVideo = -1;

          const setRail = (index) => {
            railItems.forEach((item, itemIndex) => {
              const active = itemIndex === index;
              const line = item.querySelector("[data-product-rail-line]");
              const label = item.querySelector("[data-product-rail-label]");
              const accent = PRODUCTS[itemIndex]?.accent || "#ffffff";

              gsap.to(item, {
                opacity: active ? 1 : 0.28,
                duration: 0.28,
                overwrite: true,
              });

              if (line) {
                gsap.to(line, {
                  scaleX: active ? 1 : 0.24,
                  backgroundColor: active
                    ? accent
                    : "rgba(255,255,255,.28)",
                  duration: 0.3,
                  overwrite: true,
                });
              }

              if (label) {
                gsap.to(label, {
                  color: active ? accent : "rgba(255,255,255,.5)",
                  duration: 0.3,
                  overwrite: true,
                });
              }
            });

            if (counter) {
              counter.textContent = String(index + 1).padStart(2, "0");
            }
          };

          const pauseAll = () => {
            productVideos.forEach((video) => video.pause());
            activeVideo = -1;
          };

          const playVideo = (index) => {
            if (activeVideo === index) return;
            activeVideo = index;

            productVideos.forEach((video, videoIndex) => {
              if (videoIndex !== index) {
                video.pause();
                return;
              }

              const request = video.play();
              if (request && typeof request.catch === "function") {
                request.catch(() => {});
              }
            });
          };

          if (reduceMotion) {
            gsap.set(showcase, { height: "auto", overflow: "visible" });
            gsap.set(panels, {
              position: "relative",
              autoAlpha: 1,
              minHeight: "100svh",
            });
            gsap.set(contents, { autoAlpha: 1, x: 0, y: 0 });
            gsap.set(specs, { autoAlpha: 1, x: 0 });
            gsap.set(frames, { scale: 1, clipPath: FULL_CLIP });
            gsap.set(
              showcase.querySelectorAll("[data-product-shutter]"),
              { scaleY: 0 }
            );
            gsap.set(progress, { scaleX: 1, transformOrigin: "left center" });
            return () => pauseAll();
          }

          gsap.set(panels, { autoAlpha: 0 });
          gsap.set(contents, {
            autoAlpha: 0,
            y: desktop ? 88 : 46,
          });
          gsap.set(specs, {
            autoAlpha: 0,
            x: desktop ? 75 : 32,
          });
          gsap.set(frames, {
            scale: 0.88,
            clipPath: CLOSED_CLIP,
            transformPerspective: 1400,
            transformOrigin: "50% 50%",
          });
          gsap.set(ghosts, { xPercent: 8, opacity: 0 });
          gsap.set(productVideos, {
            scale: 1.16,
            filter: "brightness(1)",
            transformOrigin: "50% 50%",
          });
          gsap.set(showcase.querySelectorAll("[data-product-shutter]"), {
            scaleY: 1,
          });

          panels.forEach((panel, index) => {
            gsap.set(panel, { zIndex: index + 1 });
          });

          const firstShutters = panels[0].querySelectorAll(
            "[data-product-shutter]"
          );

          gsap.set(panels[0], { autoAlpha: 1 });
          gsap.set(contents[0], { autoAlpha: 1, x: 0, y: 0 });
          gsap.set(specs[0], { autoAlpha: 1, x: 0 });
          gsap.set(frames[0], {
            scale: 1,
            clipPath: FULL_CLIP,
            rotateY: 0,
          });
          gsap.set(ghosts[0], { xPercent: 0, opacity: 1 });
          gsap.set(firstShutters, { scaleY: 0 });
          if (productVideos[0]) gsap.set(productVideos[0], { scale: 1 });
          if (progress) {
            gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          }
          setRail(0);

          timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: showcase,
              start: "top top",
              end: () => {
                const distance =
                  window.innerHeight * panels.length * (desktop ? 1.28 : 1.02);
                return `+=${Math.max(distance, desktop ? 4200 : 3100)}`;
              },
              pin: true,
              scrub: desktop ? 1 : 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => playVideo(0),
              onEnterBack: () => playVideo(activePanel),
              onLeave: pauseAll,
              onLeaveBack: pauseAll,
              onUpdate: (self) => {
                if (progress) gsap.set(progress, { scaleX: self.progress });
                if (!timeline) return;

                let nextPanel = 0;
                const currentTime = timeline.time();

                for (let index = 1; index < panels.length; index += 1) {
                  const labelTime = timeline.labels[`product-${index}`];
                  if (
                    typeof labelTime === "number" &&
                    currentTime >= labelTime
                  ) {
                    nextPanel = index;
                  }
                }

                if (nextPanel !== activePanel) {
                  activePanel = nextPanel;
                  setRail(activePanel);
                  playVideo(activePanel);
                }
              },
            },
          });

          if (productVideos[0]) {
            timeline.to(productVideos[0], {
              scale: desktop ? 1.045 : 1.03,
              duration: 0.9,
            });
          }

          panels.forEach((panel, index) => {
            if (index === 0) return;

            const previous = panels[index - 1];
            const currentFrame = panel.querySelector("[data-product-frame]");
            const previousFrame = previous.querySelector("[data-product-frame]");
            const currentContent = panel.querySelector("[data-product-content]");
            const previousContent = previous.querySelector(
              "[data-product-content]"
            );
            const currentSpecs = panel.querySelector("[data-product-specs]");
            const previousSpecs = previous.querySelector("[data-product-specs]");
            const currentGhost = panel.querySelector("[data-product-ghost]");
            const previousGhost = previous.querySelector("[data-product-ghost]");
            const currentVideo = panel.querySelector("video");
            const previousVideo = previous.querySelector("video");
            const shutters = gsap.utils.toArray(
              panel.querySelectorAll("[data-product-shutter]")
            );
            const direction = index % 2 === 0 ? -1 : 1;
            const label = `product-${index}`;

            timeline.addLabel(label, `+=${desktop ? 0.28 : 0.16}`);
            timeline.set(panel, { autoAlpha: 1 }, label);
            timeline.set(shutters, { scaleY: 1 }, label);

            if (currentFrame) {
              timeline.fromTo(
                currentFrame,
                {
                  scale: desktop ? 0.78 : 0.9,
                  xPercent: direction * (desktop ? 12 : 4),
                  rotateY: direction * (desktop ? 7 : 0),
                  clipPath: CLOSED_CLIP,
                },
                {
                  scale: 1,
                  xPercent: 0,
                  rotateY: 0,
                  clipPath: FULL_CLIP,
                  duration: 1.08,
                  ease: "power3.inOut",
                },
                label
              );
            }

            if (currentVideo) {
              timeline.fromTo(
                currentVideo,
                { scale: desktop ? 1.2 : 1.13 },
                { scale: 1, duration: 1.1, ease: "power3.out" },
                label
              );
            }

            timeline.to(
              shutters,
              {
                scaleY: 0,
                duration: 0.72,
                stagger: {
                  each: 0.055,
                  from: direction > 0 ? "start" : "end",
                },
                ease: "power4.inOut",
              },
              label
            );

            if (previousFrame) {
              timeline.to(
                previousFrame,
                {
                  scale: desktop ? 0.74 : 0.88,
                  xPercent: direction * -12,
                  rotateY: direction * -6,
                  clipPath: CLOSED_CLIP,
                  duration: 0.92,
                  ease: "power3.inOut",
                },
                label
              );
            }

            if (previousVideo) {
              timeline.to(
                previousVideo,
                {
                  scale: desktop ? 1.12 : 1.07,
                  filter: "brightness(.3) saturate(.7)",
                  duration: 0.9,
                },
                label
              );
            }

            if (previousContent) {
              timeline.to(
                previousContent,
                {
                  autoAlpha: 0,
                  y: desktop ? -58 : -30,
                  filter: "blur(8px)",
                  duration: 0.4,
                  ease: "power2.out",
                },
                label
              );
            }

            if (previousSpecs) {
              timeline.to(
                previousSpecs,
                {
                  autoAlpha: 0,
                  x: direction * -45,
                  duration: 0.34,
                },
                label
              );
            }

            if (previousGhost) {
              timeline.to(
                previousGhost,
                {
                  xPercent: direction * -8,
                  opacity: 0,
                  duration: 0.45,
                },
                label
              );
            }

            if (currentContent) {
              timeline.fromTo(
                currentContent,
                {
                  autoAlpha: 0,
                  y: desktop ? 84 : 42,
                  filter: "blur(10px)",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.72,
                  ease: "power3.out",
                },
                `${label}+=.3`
              );
            }

            if (currentSpecs) {
              timeline.fromTo(
                currentSpecs,
                {
                  autoAlpha: 0,
                  x: direction * (desktop ? 76 : 32),
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  duration: 0.68,
                  ease: "power3.out",
                },
                `${label}+=.36`
              );
            }

            if (currentGhost) {
              timeline.fromTo(
                currentGhost,
                { xPercent: direction * 10, opacity: 0 },
                {
                  xPercent: 0,
                  opacity: 1,
                  duration: 0.8,
                  ease: "power3.out",
                },
                `${label}+=.2`
              );
            }

            timeline.set(previous, { autoAlpha: 0 }, `${label}+=1.01`);
            timeline.to({}, { duration: desktop ? 0.42 : 0.26 });
          });

          return () => {
            pauseAll();
            if (timeline?.scrollTrigger) timeline.scrollTrigger.kill();
            timeline?.kill();
          };
        }
      );

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions;
          const track = capabilities.querySelector(
            "[data-capabilities-track]"
          );

          if (!track) return undefined;

          const cards = gsap.utils.toArray(
            track.querySelectorAll("[data-capability-card]")
          );

          /*
           * Su mobile la sezione resta verticale e completamente accessibile.
           * Con movimento ridotto evitiamo pin e scorrimento orizzontale.
           */
          if (!desktop || reduceMotion) {
            cards.forEach((card, index) => {
              const inner = card.querySelector("[data-capability-inner]");
              if (!inner) return;

              gsap.fromTo(
                inner,
                {
                  y: 58,
                  opacity: 0,
                  rotateZ: index % 2 === 0 ? -1.2 : 1.2,
                },
                {
                  y: 0,
                  opacity: 1,
                  rotateZ: 0,
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 82%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            });

            return undefined;
          }

          const getDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth);

          const horizontalTween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: capabilities,
              start: "top top",
              end: () => `+=${getDistance() + window.innerHeight * 0.9}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          cards.forEach((card, index) => {
            const inner = card.querySelector("[data-capability-inner]");
            if (!inner) return;

            gsap.fromTo(
              inner,
              {
                rotateZ: index % 2 === 0 ? -2.2 : 2.2,
                scale: 0.94,
              },
              {
                rotateZ: 0,
                scale: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: horizontalTween,
                  start: "left 88%",
                  end: "center center",
                  scrub: true,
                },
              }
            );
          });

          return () => {
            horizontalTween.scrollTrigger?.kill();
            horizontalTween.kill();
          };
        }
      );

      const principleWords = gsap.utils.toArray(
        principles.querySelectorAll("[data-principles-word] > span")
      );

      gsap.fromTo(
        principleWords,
        { yPercent: 115, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.035,
          ease: "power4.out",
          scrollTrigger: {
            trigger: principles,
            start: "top 66%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const principleCards = gsap.utils.toArray(
        principles.querySelectorAll("[data-principle-card]")
      );

      principleCards.forEach((card, index) => {
        const line = card.querySelector("[data-principle-line]");
        const content = card.querySelector("[data-principle-content]");

        gsap.fromTo(
          card,
          {
            clipPath:
              index % 2 === 0
                ? "inset(0% 100% 0% 0%)"
                : "inset(0% 0% 0% 100%)",
          },
          {
            clipPath: FULL_CLIP,
            duration: 1,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 77%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (content) {
          gsap.fromTo(
            content,
            { y: 48, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              delay: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 77%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      const finalLetters = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-final-letter]")
      );

      gsap.fromTo(
        finalLetters,
        { yPercent: 125, rotateX: -82, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.15,
          stagger: 0.03,
          ease: "power4.out",
          scrollTrigger: {
            trigger: finalSection,
            start: "top 67%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, page);

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 180);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      productVideos.forEach((video) => video.pause());
      mm.revert();
      ctx.revert();
    };
  }, [location.key]);

  return (
    <>
      <SeoMetaTags />

      <main
        key={location.key}
        ref={pageRef}
        className="relative overflow-x-hidden bg-[#030303] text-white"
      >
        <style>{`
          @keyframes oxoProductsScan {
            0% { transform: translate3d(-12vw, 0, 0); opacity: 0; }
            12% { opacity: .9; }
            74% { opacity: .5; }
            100% { transform: translate3d(112vw, 0, 0); opacity: 0; }
          }

          @keyframes oxoProductsOrbit {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(8deg) scale(1.04); }
          }

          @keyframes oxoProductsBlink {
            0%, 86%, 100% { opacity: .16; }
            88%, 93% { opacity: .95; }
          }

          @keyframes oxoProductsMarquee {
            from { transform: translate3d(0, 0, 0); }
            to { transform: translate3d(-50%, 0, 0); }
          }

          .oxo-products-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
            background-size: 68px 68px;
            mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
          }

          .oxo-products-noise::after {
            content: "";
            position: absolute;
            inset: 0;
            z-index: 80;
            pointer-events: none;
            opacity: .052;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode: soft-light;
          }

          .oxo-product-shutter {
            box-shadow: inset -1px 0 rgba(255,255,255,.065);
            will-change: transform;
          }

          .oxo-capability-card:hover .oxo-capability-arrow {
            transform: translate3d(.7rem, -.7rem, 0);
          }

          .oxo-capability-card:hover .oxo-capability-ghost {
            opacity: .11;
            transform: translate3d(-1.4vw, 0, 0);
          }

          .oxo-principle-card:hover .oxo-principle-title {
            transform: translateX(1vw);
          }

          .oxo-products-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 1px;
            background: currentColor;
            transform: scaleX(0);
            transform-origin: right center;
            transition: transform .45s cubic-bezier(.16,1,.3,1);
          }

          .oxo-products-link:hover::after {
            transform: scaleX(1);
            transform-origin: left center;
          }
        `}</style>

        <section
          ref={heroRef}
          className="oxo-products-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0" />

          <div
            data-products-hero-ring
            aria-hidden="true"
            className="pointer-events-none absolute -right-[13vw] top-[4vh] h-[58vw] w-[58vw] rounded-full border border-cyan-300/15"
            style={{ animation: "oxoProductsOrbit 12s ease-in-out infinite" }}
          >
            <div className="absolute inset-[13%] rounded-full border border-violet-400/15" />
            <div className="absolute inset-[29%] rounded-full border border-fuchsia-400/15" />
            <div className="absolute left-1/2 top-[-1px] h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(53,216,255,.9)]" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[18%] z-[2] h-[64%] w-[1px] bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_28px_rgba(53,216,255,.65)]"
            style={{ animation: "oxoProductsScan 7s linear infinite" }}
          />

          <p
            data-products-hero-ghost
            aria-hidden="true"
            className="antonio2 pointer-events-none absolute -left-[2vw] top-[18vh] whitespace-nowrap text-[25vw] uppercase leading-none tracking-[-0.075em] text-white/[0.025]"
          >
            DIGITAL OBJECTS
          </p>

          <div className="relative z-10 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:text-[11px]">
            <p data-products-meta>OXO STUDIO® / PRODUCT LAB</p>
            <p data-products-meta className="text-right">
              SOFTWARE / AI / GAME
              <br />
              LA SPEZIA / ITALY
            </p>
          </div>

          <div
            data-products-hero-title
            className="relative z-10 my-auto py-14"
          >
            <p
              data-products-meta
              className="antonio2 mb-4 text-[10px] uppercase tracking-[0.36em] text-cyan-300 md:text-xs"
            >
              Digital systems with a point of view
            </p>

            <h1 className="antonio2 ombra2 overflow-hidden text-[22vw] uppercase leading-[0.7] tracking-[-0.075em] md:text-[19vw] lg:text-[16vw]">
              <SplitLetters text="PRODOTTI" />
            </h1>
          </div>

          <div className="relative z-10 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p
              data-products-meta
              className="antonio max-w-[920px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.35rem]"
            >
              Software, intelligenza artificiale e mondi interattivi progettati
              per trasformare problemi reali in esperienze precise, potenti e
              riconoscibili.
            </p>

            <p
              data-products-meta
              className="antonio2 shrink-0 text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
            >
              Enter the product lab ↓
            </p>
          </div>
        </section>

        <section
          ref={showcaseRef}
          className="relative h-[100svh] min-h-[650px] w-full overflow-hidden bg-black"
        >
          {PRODUCTS.map((product, productIndex) => (
            <article
              key={product.id}
              data-product-panel
              className="oxo-products-noise absolute inset-0 overflow-hidden"
              style={{
                opacity: productIndex === 0 ? 1 : 0,
                visibility: productIndex === 0 ? "visible" : "hidden",
                zIndex: productIndex + 1,
                willChange: "opacity, transform",
              }}
            >
              <div
                data-product-frame
                className="absolute inset-0 overflow-hidden"
                style={{
                  clipPath: productIndex === 0 ? FULL_CLIP : CLOSED_CLIP,
                  background: product.fallback,
                  willChange: "clip-path, transform",
                }}
              >
                <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-65" />

                <video
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: product.objectPosition }}
                  src={product.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  autoPlay={productIndex === 0}
                  onLoadedMetadata={() => ScrollTrigger.refresh()}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    ScrollTrigger.refresh();
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-black/24" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/70" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/82 via-black/10 to-black/34" />

                <div className="pointer-events-none absolute inset-[14px] z-10 border border-white/28 md:inset-[26px] lg:inset-[2.2vw]" />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-40 grid grid-cols-6"
                >
                  {SHUTTERS.map((shutterIndex) => (
                    <div
                      key={shutterIndex}
                      data-product-shutter
                      className="oxo-product-shutter h-full bg-[#020202]"
                      style={{
                        transform:
                          productIndex === 0 ? "scaleY(0)" : "scaleY(1)",
                        transformOrigin:
                          shutterIndex % 2 === 0 ? "top center" : "bottom center",
                      }}
                    />
                  ))}
                </div>
              </div>

              <p
                data-product-ghost
                aria-hidden="true"
                className="antonio2 pointer-events-none absolute left-[2vw] top-[12vh] z-[3] whitespace-nowrap text-[19vw] uppercase leading-none tracking-[-0.07em] text-white/[0.045]"
                style={{
                  opacity: productIndex === 0 ? 1 : 0,
                }}
              >
                {product.statement}
              </p>

              <div className="antonio2 absolute left-7 top-7 z-50 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] md:left-12 md:top-12 md:text-xs lg:left-[4.4vw] lg:top-[4.4vw]">
                <span>{product.id}</span>
                <span
                  className="h-px w-10 md:w-16"
                  style={{ backgroundColor: product.accent }}
                />
                <span className="text-gray-300">{product.category}</span>
              </div>

              <p className="antonio absolute right-7 top-7 z-50 max-w-[48vw] text-right text-[9px] uppercase tracking-[0.23em] text-gray-300 md:right-12 md:top-12 md:text-[11px] lg:right-[4.4vw] lg:top-[4.4vw]">
                {product.meta}
              </p>

              <div
                data-product-content
                className="absolute bottom-12 left-7 z-50 max-w-[900px] pr-7 md:bottom-16 md:left-12 md:pr-12 lg:bottom-[7vh] lg:left-[5vw]"
                style={{
                  opacity: productIndex === 0 ? 1 : 0,
                  visibility: productIndex === 0 ? "visible" : "hidden",
                }}
              >
                <p
                  className="antonio2 mb-3 text-[10px] uppercase tracking-[0.34em] md:text-xs"
                  style={{ color: product.accent }}
                >
                  Selected digital product
                </p>

                <h2 className="antonio2 ombra2 max-w-[1200px] text-[clamp(3.1rem,9.2vw,9.4rem)] uppercase leading-[0.76] tracking-[-0.06em]">
                  {product.title}
                </h2>

                <p className="antonio mt-6 max-w-[710px] text-lg leading-snug text-gray-200 md:text-2xl lg:text-3xl">
                  {product.description}
                </p>

                <div className="mt-7 flex flex-wrap gap-2 md:mt-9">
                  {product.tags.map((tag) => (
                    <span
                      key={tag}
                      className="antonio2 border px-3 py-2 text-[9px] uppercase tracking-[0.24em] text-gray-200 md:text-[10px]"
                      style={{
                        borderColor: `${product.accent}66`,
                        backgroundColor: product.accentSoft,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  to={product.link}
                  className="oxo-products-link antonio2 relative mt-8 inline-flex items-center gap-5 pb-2 text-xs uppercase tracking-[0.28em] md:mt-10 md:text-sm"
                  style={{ color: product.accent }}
                >
                  <span>Esplora il prodotto</span>
                  <span className="text-lg">↗</span>
                </Link>
              </div>

              <div
                data-product-specs
                className="absolute bottom-12 right-7 z-50 hidden w-[300px] border-t border-white/25 md:bottom-16 md:right-12 lg:block lg:bottom-[7vh] lg:right-[5vw] lg:w-[340px]"
                style={{
                  opacity: productIndex === 0 ? 1 : 0,
                  visibility: productIndex === 0 ? "visible" : "hidden",
                }}
              >
                {product.specs.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[76px_1fr] gap-5 border-b border-white/18 py-4"
                  >
                    <span className="antonio2 text-[9px] uppercase tracking-[0.26em] text-gray-500">
                      {label}
                    </span>
                    <span className="antonio2 text-right text-[10px] uppercase tracking-[0.22em] text-gray-200">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}

          <aside className="pointer-events-none absolute right-7 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-5 md:flex lg:right-[3vw]">
            {PRODUCTS.map((product, index) => (
              <div
                key={product.id}
                data-product-rail-item
                className="flex items-center justify-end gap-3 opacity-30"
              >
                <span
                  data-product-rail-label
                  className="antonio2 text-[9px] uppercase tracking-[0.24em] text-white/50"
                >
                  {product.id}
                </span>
                <span
                  data-product-rail-line
                  className="h-px w-10 origin-right bg-white/30"
                  style={{
                    transform: index === 0 ? "scaleX(1)" : "scaleX(.24)",
                  }}
                />
              </div>
            ))}
          </aside>

          <div className="pointer-events-none absolute bottom-8 right-8 z-[70] flex items-end gap-2 md:bottom-12 md:right-12 lg:bottom-[4.5vh] lg:right-[3vw]">
            <span
              data-product-counter
              className="antonio2 text-5xl leading-none tracking-[-0.06em] md:text-7xl"
            >
              01
            </span>
            <span className="antonio2 mb-1 text-[10px] uppercase tracking-[0.26em] text-gray-500 md:mb-2">
              / {String(PRODUCTS.length).padStart(2, "0")}
            </span>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 z-[80] h-px w-full bg-white/20">
            <div
              data-product-progress
              className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
            />
          </div>
        </section>

        <section
          ref={capabilitiesRef}
          className="oxo-products-noise relative min-h-[100svh] overflow-hidden border-y border-white/15 bg-[#050505]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-60" />

          <div
            data-capabilities-track
            className="relative z-10 flex min-h-[100svh] w-full flex-col items-stretch lg:w-max lg:flex-row"
          >
            <header className="flex min-h-[100svh] w-full shrink-0 flex-col justify-between px-6 py-8 md:px-10 md:py-10 lg:w-[72vw] lg:px-[5vw] lg:py-[5vh]">
              <div className="flex items-start justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 md:text-[11px]">
                <span>THE PRODUCT ENGINE</span>
                <span>04 CAPABILITIES</span>
              </div>

              <div>
                <p className="antonio2 mb-5 text-[10px] uppercase tracking-[0.35em] text-cyan-300 md:text-xs">
                  Dietro ogni prodotto
                </p>
                <h2 className="antonio2 ombra2 text-[20vw] uppercase leading-[0.72] tracking-[-0.07em] md:text-[15vw] lg:text-[10vw]">
                  COME
                  <br />
                  PRENDE
                  <br />
                  FORMA
                </h2>
              </div>

              <p className="antonio max-w-[690px] border-t border-white/20 pt-6 text-xl leading-snug text-gray-300 md:text-3xl">
                Quattro competenze che non lavorano in sequenza: si contaminano
                dall’inizio alla fine del progetto.
              </p>
            </header>

            {CAPABILITIES.map((capability) => (
              <article
                key={capability.id}
                data-capability-card
                className="oxo-capability-card flex min-h-[100svh] w-full shrink-0 items-center border-t border-white/15 px-5 py-8 md:px-10 lg:w-[56vw] lg:border-l lg:border-t-0 lg:px-[3vw]"
              >
                <div
                  data-capability-inner
                  className="relative h-[82svh] w-full overflow-hidden border border-white/20 p-6 md:p-9 lg:p-[2.5vw]"
                  style={{ background: capability.background }}
                >
                  <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-65" />

                  <p
                    aria-hidden="true"
                    className="oxo-capability-ghost antonio2 pointer-events-none absolute -right-[1vw] -top-[4vw] text-[28vw] leading-none tracking-[-0.09em] text-white/[0.055] transition-[transform,opacity] duration-700 ease-out"
                  >
                    {capability.id}
                  </p>

                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between border-b border-white/20 pb-5">
                      <div className="flex items-center gap-3">
                        <span className="antonio2 text-[10px] tracking-[0.28em]">
                          {capability.id}
                        </span>
                        <span
                          className="h-px w-12"
                          style={{ backgroundColor: capability.accent }}
                        />
                      </div>
                      <span className="oxo-capability-arrow antonio2 text-2xl transition-transform duration-500 ease-out md:text-4xl">
                        ↗
                      </span>
                    </div>

                    <div>
                      <p
                        className="antonio2 mb-4 text-[10px] uppercase tracking-[0.32em] md:text-xs"
                        style={{ color: capability.accent }}
                      >
                        {capability.eyebrow}
                      </p>

                      <h3 className="antonio2 ombra2 text-[14vw] uppercase leading-[0.76] tracking-[-0.065em] md:text-[9vw] lg:text-[6.4vw]">
                        {capability.title}
                      </h3>

                      <p className="antonio mt-6 max-w-[660px] text-lg leading-snug text-gray-200 md:text-2xl">
                        {capability.copy}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-2">
                        {capability.tags.map((tag) => (
                          <span
                            key={tag}
                            className="antonio2 border border-white/20 px-3 py-2 text-[9px] uppercase tracking-[0.23em] text-gray-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="flex min-h-[72svh] w-full shrink-0 items-center justify-center border-t border-white/15 px-6 py-20 md:px-10 lg:min-h-[100svh] lg:w-[58vw] lg:border-l lg:border-t-0 lg:px-[6vw] lg:py-0">
              <div className="max-w-[620px]">
                <p className="antonio2 mb-5 text-[10px] uppercase tracking-[0.34em] text-fuchsia-400 md:text-xs">
                  One studio / one system
                </p>
                <p className="antonio text-[clamp(2.4rem,5.2vw,5.4rem)] leading-[0.96] tracking-[-0.04em]">
                  La qualità nasce quando strategia, design e codice smettono di
                  passarsi il lavoro e iniziano a pensare insieme.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={principlesRef}
          className="relative overflow-hidden bg-[#030303] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-55" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-[8vw]">
            <div>
              <p className="antonio2 mb-5 text-[10px] uppercase tracking-[0.35em] text-violet-400 md:text-xs">
                Product principles
              </p>

              <h2 className="antonio2 ombra2 text-[18vw] uppercase leading-[0.74] tracking-[-0.07em] md:text-[12vw] lg:sticky lg:top-[11vh] lg:text-[8vw]">
                <SplitWords text="NON SOLO BELLO. NECESSARIO." />
              </h2>
            </div>

            <div className="border-t border-white/20">
              {PRINCIPLES.map((principle) => (
                <article
                  key={principle.id}
                  data-principle-card
                  className="oxo-principle-card relative min-h-[270px] overflow-hidden border-b border-white/20 py-9 md:min-h-[330px] md:py-12"
                  style={{
                    background: `linear-gradient(90deg, ${principle.accent}0d, transparent 48%)`,
                    clipPath: FULL_CLIP,
                  }}
                >
                  <span
                    data-principle-line
                    className="absolute left-0 top-0 h-px w-full origin-left"
                    style={{ backgroundColor: principle.accent }}
                  />

                  <div
                    data-principle-content
                    className="grid grid-cols-[50px_1fr] gap-4 md:grid-cols-[78px_1fr] md:gap-8"
                  >
                    <span className="antonio2 pt-2 text-[10px] tracking-[0.28em] text-gray-500 md:text-xs">
                      {principle.id}
                    </span>

                    <div>
                      <h3 className="oxo-principle-title antonio2 text-[12vw] uppercase leading-[0.8] tracking-[-0.06em] transition-transform duration-500 ease-out md:text-[7vw] lg:text-[5.6vw]">
                        {principle.title}
                      </h3>

                      <p className="antonio mt-5 max-w-[690px] text-lg leading-snug text-gray-400 md:text-2xl">
                        {principle.copy}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={finalRef}
          className="oxo-products-noise relative flex min-h-[94svh] items-end overflow-hidden border-t border-white/15 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-65" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[10vw] bottom-[-8vw] h-[50vw] w-[50vw] rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.20), rgba(139,92,246,.13) 38%, rgba(255,79,216,.08) 56%, transparent 74%)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10%] top-[36%] h-px w-[120%] -rotate-[7deg] bg-gradient-to-r from-transparent via-cyan-300/65 to-fuchsia-400/20"
            style={{ animation: "oxoProductsBlink 4.2s linear infinite" }}
          />

          <div className="relative z-10 w-full">
            <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 md:text-[11px]">
              <span>START A DIGITAL PRODUCT</span>
              <span>OXO STUDIO / PRODUCT LAB</span>
            </div>

            <h2 className="antonio2 ombra2 overflow-hidden text-[19.5vw] uppercase leading-[0.71] tracking-[-0.075em] md:text-[16.5vw] lg:text-[14vw]">
              <SplitLetters
                text="COSTRUIAMOLO"
                attribute="data-final-letter"
              />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="antonio max-w-[820px] text-xl leading-snug text-gray-300 md:text-3xl">
                Hai un software da rendere reale, un processo da automatizzare o
                un’esperienza interattiva ancora senza forma?
              </p>

              <Link
                to="/contatti"
                className="oxo-products-link antonio2 relative inline-flex w-fit items-center gap-5 pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
              >
                <span>Parliamo del progetto</span>
                <span className="text-xl">↗</span>
              </Link>
            </div>
          </div>
        </section>

  
      </main>
    </>
  );
}