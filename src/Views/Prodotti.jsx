import { useLayoutEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";
import "../styles/avant-legato.css";

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
const CLOSED_CLIP = "inset(13% 17% 13% 17%)";
const SHUTTERS = Array.from({ length: 7 }, (_, index) => index);

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

  const cursorGlowRef = useRef(null);
  const cursorDotRef = useRef(null);

  /*
   * RESET DELLO SCROLL
   */
  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    const root = document.documentElement;
    const previous = root.style.scrollBehavior;

    root.style.scrollBehavior = "auto";

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);

    let frame2 = 0;

    const frame1 = requestAnimationFrame(() => {
      window.scrollTo(0, 0);

      frame2 = requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh(true);
        root.style.scrollBehavior = previous;
      });
    });

    const timer1 = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 350);

    const timer2 = setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 1000);

    return () => {
      cancelAnimationFrame(frame1);
      if (frame2) cancelAnimationFrame(frame2);

      clearTimeout(timer1);
      clearTimeout(timer2);

      root.style.scrollBehavior = previous;
    };
  }, [location.key]);

  /*
   * ANIMAZIONI PRINCIPALI
   */
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
      /*
       * =========================
       * HERO
       * =========================
       */

      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-products-letter]")
      );

      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-products-meta]")
      );

      const heroTitle = hero.querySelector("[data-products-hero-title]");
      const heroGhost = hero.querySelector("[data-products-hero-ghost]");
      const heroRing = hero.querySelector("[data-products-hero-ring]");
      const heroBeam = hero.querySelector("[data-products-hero-beam]");
      const heroCoords = gsap.utils.toArray(
        hero.querySelectorAll("[data-products-coordinate]")
      );

      gsap.fromTo(
        heroLetters,
        {
          yPercent: 145,
          rotateX: -90,
          rotateZ: -3,
          opacity: 0,
          transformOrigin: "50% 100%",
        },
        {
          yPercent: 0,
          rotateX: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.45,
          stagger: 0.035,
          ease: "expo.out",
          delay: 0.1,
        }
      );

      gsap.fromTo(
        heroMeta,
        {
          y: 35,
          opacity: 0,
          filter: "blur(8px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.62,
        }
      );

      if (heroGhost) {
        gsap.fromTo(
          heroGhost,
          {
            xPercent: 18,
            scaleX: 1.12,
            opacity: 0,
          },
          {
            xPercent: 0,
            scaleX: 1,
            opacity: 1,
            duration: 1.6,
            ease: "expo.out",
            delay: 0.3,
          }
        );

        gsap.to(heroGhost, {
          xPercent: -12,
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (heroTitle) {
        gsap.to(heroTitle, {
          yPercent: 25,
          scale: 0.89,
          opacity: 0.3,
          filter: "blur(3px)",
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
          rotate: 155,
          scale: 1.25,
          xPercent: -18,
          yPercent: 13,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.25,
          },
        });
      }

      if (heroBeam) {
        gsap.fromTo(
          heroBeam,
          {
            scaleX: 0,
            transformOrigin: "left center",
            opacity: 0,
          },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.1,
            delay: 0.45,
            ease: "expo.out",
          }
        );

        gsap.to(heroBeam, {
          xPercent: 35,
          rotate: 4,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.fromTo(
        heroCoords,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 0.5,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          delay: 0.8,
        }
      );

      heroCoords.forEach((coord, index) => {
        gsap.to(coord, {
          x: index % 2 === 0 ? 45 : -45,
          y: index % 2 === 0 ? -25 : 25,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      });

      /*
       * =========================
       * CURSOR + MAGNETIC + TILT
       * =========================
       */

      mm.add(
        "(pointer: fine) and (prefers-reduced-motion: no-preference)",
        () => {
          const glow = cursorGlowRef.current;
          const dot = cursorDotRef.current;

          const magnetic = gsap.utils.toArray(
            page.querySelectorAll("[data-magnetic]")
          );

          const tiltCards = gsap.utils.toArray(
            page.querySelectorAll("[data-tilt]")
          );

          const cleanup = [];

          if (glow && dot) {
            const gx = gsap.quickTo(glow, "x", {
              duration: 0.65,
              ease: "power3.out",
            });

            const gy = gsap.quickTo(glow, "y", {
              duration: 0.65,
              ease: "power3.out",
            });

            const dx = gsap.quickTo(dot, "x", {
              duration: 0.1,
              ease: "power2.out",
            });

            const dy = gsap.quickTo(dot, "y", {
              duration: 0.1,
              ease: "power2.out",
            });

            const onPointerMove = (event) => {
              gx(event.clientX);
              gy(event.clientY);

              dx(event.clientX);
              dy(event.clientY);
            };

            window.addEventListener("pointermove", onPointerMove, {
              passive: true,
            });

            cleanup.push(() =>
              window.removeEventListener("pointermove", onPointerMove)
            );
          }

          magnetic.forEach((element) => {
            const move = (event) => {
              const rect = element.getBoundingClientRect();

              const x =
                event.clientX - rect.left - rect.width / 2;

              const y =
                event.clientY - rect.top - rect.height / 2;

              gsap.to(element, {
                x: x * 0.14,
                y: y * 0.18,
                duration: 0.4,
                ease: "power3.out",
                overwrite: true,
              });
            };

            const leave = () => {
              gsap.to(element, {
                x: 0,
                y: 0,
                duration: 0.8,
                ease: "elastic.out(1, .4)",
                overwrite: true,
              });
            };

            element.addEventListener("pointermove", move);
            element.addEventListener("pointerleave", leave);

            cleanup.push(() => {
              element.removeEventListener("pointermove", move);
              element.removeEventListener("pointerleave", leave);
            });
          });

          tiltCards.forEach((card) => {
            const inner =
              card.querySelector("[data-capability-inner]") || card;

            const move = (event) => {
              const rect = card.getBoundingClientRect();

              const px =
                (event.clientX - rect.left) / rect.width - 0.5;

              const py =
                (event.clientY - rect.top) / rect.height - 0.5;

              gsap.to(inner, {
                rotateY: px * 7,
                rotateX: py * -5,
                x: px * 10,
                y: py * 8,
                scale: 1.015,
                transformPerspective: 1400,
                transformOrigin: "center center",
                duration: 0.42,
                ease: "power3.out",
                overwrite: true,
              });
            };

            const leave = () => {
              gsap.to(inner, {
                rotateY: 0,
                rotateX: 0,
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power3.out",
                overwrite: true,
              });
            };

            card.addEventListener("pointermove", move);
            card.addEventListener("pointerleave", leave);

            cleanup.push(() => {
              card.removeEventListener("pointermove", move);
              card.removeEventListener("pointerleave", leave);
            });
          });

          return () => {
            cleanup.forEach((fn) => fn());
          };
        }
      );

      /*
       * =========================
       * PRODUCT SHOWCASE
       * =========================
       */

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },

        (mediaContext) => {
          const { desktop, reduceMotion } =
            mediaContext.conditions;

          const panels = gsap.utils.toArray(
            showcase.querySelectorAll("[data-product-panel]")
          );

          const contents = panels
            .map((panel) =>
              panel.querySelector("[data-product-content]")
            )
            .filter(Boolean);

          const specs = panels
            .map((panel) =>
              panel.querySelector("[data-product-specs]")
            )
            .filter(Boolean);

          const frames = panels
            .map((panel) =>
              panel.querySelector("[data-product-frame]")
            )
            .filter(Boolean);

          const ghosts = panels
            .map((panel) =>
              panel.querySelector("[data-product-ghost]")
            )
            .filter(Boolean);

          const railItems = gsap.utils.toArray(
            showcase.querySelectorAll("[data-product-rail-item]")
          );

          const progress = showcase.querySelector(
            "[data-product-progress]"
          );

          const counter = showcase.querySelector(
            "[data-product-counter]"
          );

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

              const line = item.querySelector(
                "[data-product-rail-line]"
              );

              const label = item.querySelector(
                "[data-product-rail-label]"
              );

              const accent =
                PRODUCTS[itemIndex]?.accent || "#ffffff";

              gsap.to(item, {
                opacity: active ? 1 : 0.24,
                x: active ? 0 : 7,
                duration: 0.3,
                overwrite: true,
              });

              if (line) {
                gsap.to(line, {
                  scaleX: active ? 1 : 0.2,
                  backgroundColor: active
                    ? accent
                    : "rgba(255,255,255,.25)",
                  duration: 0.3,
                });
              }

              if (label) {
                gsap.to(label, {
                  color: active
                    ? accent
                    : "rgba(255,255,255,.45)",
                  duration: 0.3,
                });
              }
            });

            if (counter) {
              counter.textContent = String(index + 1).padStart(
                2,
                "0"
              );
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

              const result = video.play();

              if (
                result &&
                typeof result.catch === "function"
              ) {
                result.catch(() => {});
              }
            });
          };

          if (reduceMotion) {
            gsap.set(showcase, {
              height: "auto",
              overflow: "visible",
            });

            gsap.set(panels, {
              position: "relative",
              autoAlpha: 1,
              minHeight: "100svh",
            });

            gsap.set(contents, {
              autoAlpha: 1,
              y: 0,
            });

            gsap.set(specs, {
              autoAlpha: 1,
              x: 0,
            });

            gsap.set(frames, {
              scale: 1,
              clipPath: FULL_CLIP,
            });

            return () => pauseAll();
          }

          gsap.set(panels, {
            autoAlpha: 0,
          });

          gsap.set(contents, {
            autoAlpha: 0,
            y: desktop ? 90 : 46,
          });

          gsap.set(specs, {
            autoAlpha: 0,
            x: desktop ? 80 : 32,
          });

          gsap.set(frames, {
            scale: 0.86,
            clipPath: CLOSED_CLIP,
            transformPerspective: 1500,
          });

          gsap.set(ghosts, {
            xPercent: 10,
            opacity: 0,
          });

          gsap.set(productVideos, {
            scale: 1.18,
          });

          panels.forEach((panel, index) => {
            gsap.set(panel, {
              zIndex: index + 1,
            });
          });

          const firstShutters =
            panels[0].querySelectorAll(
              "[data-product-shutter]"
            );

          gsap.set(panels[0], {
            autoAlpha: 1,
          });

          gsap.set(contents[0], {
            autoAlpha: 1,
            y: 0,
          });

          gsap.set(specs[0], {
            autoAlpha: 1,
            x: 0,
          });

          gsap.set(frames[0], {
            scale: 1,
            clipPath: FULL_CLIP,
            rotateY: 0,
          });

          gsap.set(ghosts[0], {
            opacity: 1,
            xPercent: 0,
          });

          gsap.set(firstShutters, {
            scaleY: 0,
          });

          if (productVideos[0]) {
            gsap.set(productVideos[0], {
              scale: 1,
            });
          }

          gsap.set(progress, {
            scaleX: 0,
            transformOrigin: "left center",
          });

          setRail(0);

          timeline = gsap.timeline({
            defaults: {
              ease: "none",
            },

            scrollTrigger: {
              trigger: showcase,
              start: "top top",

              end: () => {
                const distance =
                  window.innerHeight *
                  panels.length *
                  (desktop ? 1.35 : 1.05);

                return `+=${Math.max(
                  distance,
                  desktop ? 4400 : 3200
                )}`;
              },

              pin: true,
              scrub: desktop ? 1 : 0.7,
              anticipatePin: 1,
              invalidateOnRefresh: true,

              onEnter: () => playVideo(0),

              onEnterBack: () =>
                playVideo(activePanel),

              onLeave: pauseAll,
              onLeaveBack: pauseAll,

              onUpdate: (self) => {
                if (progress) {
                  gsap.set(progress, {
                    scaleX: self.progress,
                  });
                }

                if (!timeline) return;

                let nextPanel = 0;

                const time = timeline.time();

                for (
                  let index = 1;
                  index < panels.length;
                  index += 1
                ) {
                  const labelTime =
                    timeline.labels[`product-${index}`];

                  if (
                    typeof labelTime === "number" &&
                    time >= labelTime
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
              scale: 1.055,
              duration: 0.9,
            });
          }

          panels.forEach((panel, index) => {
            if (index === 0) return;

            const previous = panels[index - 1];

            const currentFrame =
              panel.querySelector(
                "[data-product-frame]"
              );

            const previousFrame =
              previous.querySelector(
                "[data-product-frame]"
              );

            const currentContent =
              panel.querySelector(
                "[data-product-content]"
              );

            const previousContent =
              previous.querySelector(
                "[data-product-content]"
              );

            const currentSpecs =
              panel.querySelector(
                "[data-product-specs]"
              );

            const previousSpecs =
              previous.querySelector(
                "[data-product-specs]"
              );

            const currentGhost =
              panel.querySelector(
                "[data-product-ghost]"
              );

            const previousGhost =
              previous.querySelector(
                "[data-product-ghost]"
              );

            const currentVideo =
              panel.querySelector("video");

            const previousVideo =
              previous.querySelector("video");

            const shutters = gsap.utils.toArray(
              panel.querySelectorAll(
                "[data-product-shutter]"
              )
            );

            const title =
              panel.querySelector(
                "[data-product-title]"
              );

            const specRows =
              gsap.utils.toArray(
                panel.querySelectorAll(
                  "[data-product-spec-row]"
                )
              );

            const chromatic =
              panel.querySelector(
                "[data-product-chromatic]"
              );

            const direction =
              index % 2 === 0 ? -1 : 1;

            const label = `product-${index}`;

            timeline.addLabel(
              label,
              `+=${desktop ? 0.3 : 0.16}`
            );

            timeline.set(
              panel,
              {
                autoAlpha: 1,
              },
              label
            );

            timeline.set(
              shutters,
              {
                scaleY: 1,
              },
              label
            );

            if (chromatic) {
              timeline.fromTo(
                chromatic,
                {
                  opacity: 0,
                },
                {
                  opacity: 0.42,
                  duration: 0.07,
                  repeat: 3,
                  yoyo: true,
                },
                label
              );
            }

            if (currentFrame) {
              timeline.fromTo(
                currentFrame,
                {
                  scale: desktop ? 0.74 : 0.9,
                  xPercent:
                    direction *
                    (desktop ? 14 : 4),
                  rotateY:
                    direction *
                    (desktop ? 8 : 0),
                  clipPath: CLOSED_CLIP,
                },
                {
                  scale: 1,
                  xPercent: 0,
                  rotateY: 0,
                  clipPath: FULL_CLIP,
                  duration: 1.15,
                  ease: "power3.inOut",
                },
                label
              );
            }

            if (currentVideo) {
              timeline.fromTo(
                currentVideo,
                {
                  scale:
                    desktop ? 1.23 : 1.14,
                },
                {
                  scale: 1,
                  duration: 1.15,
                  ease: "power3.out",
                },
                label
              );
            }

            timeline.to(
              shutters,
              {
                scaleY: 0,
                duration: 0.75,

                stagger: {
                  each: 0.045,
                  from:
                    direction > 0
                      ? "start"
                      : "end",
                },

                ease: "power4.inOut",
              },
              label
            );

            if (previousFrame) {
              timeline.to(
                previousFrame,
                {
                  scale:
                    desktop ? 0.72 : 0.88,

                  xPercent:
                    direction * -13,

                  rotateY:
                    direction * -7,

                  clipPath: CLOSED_CLIP,

                  duration: 0.95,

                  ease: "power3.inOut",
                },
                label
              );
            }

            if (previousVideo) {
              timeline.to(
                previousVideo,
                {
                  scale: 1.15,

                  filter:
                    "brightness(.25) saturate(.65) blur(2px)",

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
                  y: -65,
                  filter: "blur(10px)",
                  duration: 0.4,
                },
                label
              );
            }

            if (previousSpecs) {
              timeline.to(
                previousSpecs,
                {
                  autoAlpha: 0,
                  x:
                    direction * -50,

                  duration: 0.35,
                },
                label
              );
            }

            if (previousGhost) {
              timeline.to(
                previousGhost,
                {
                  xPercent:
                    direction * -10,

                  opacity: 0,

                  duration: 0.5,
                },
                label
              );
            }

            if (currentContent) {
              timeline.fromTo(
                currentContent,
                {
                  autoAlpha: 0,
                  y: 95,
                  filter: "blur(12px)",
                },
                {
                  autoAlpha: 1,
                  y: 0,
                  filter: "blur(0px)",
                  duration: 0.75,
                  ease: "power3.out",
                },
                `${label}+=.3`
              );
            }

            if (title) {
              timeline.fromTo(
                title,
                {
                  scaleX: 1.1,
                  letterSpacing: "0em",
                  filter: "blur(8px)",
                },
                {
                  scaleX: 1,
                  letterSpacing: "-0.06em",
                  filter: "blur(0px)",
                  duration: 0.75,
                  ease: "expo.out",
                },
                `${label}+=.3`
              );
            }

            if (currentSpecs) {
              timeline.fromTo(
                currentSpecs,
                {
                  autoAlpha: 0,
                  x:
                    direction * 80,
                },
                {
                  autoAlpha: 1,
                  x: 0,

                  duration: 0.7,

                  ease: "power3.out",
                },
                `${label}+=.38`
              );
            }

            if (specRows.length) {
              timeline.fromTo(
                specRows,
                {
                  y: 25,
                  opacity: 0,
                  clipPath:
                    "inset(0 0 100% 0)",
                },
                {
                  y: 0,
                  opacity: 1,
                  clipPath:
                    "inset(0 0 0% 0)",

                  stagger: 0.07,

                  duration: 0.5,

                  ease: "power3.out",
                },
                `${label}+=.45`
              );
            }

            if (currentGhost) {
              timeline.fromTo(
                currentGhost,
                {
                  xPercent:
                    direction * 12,

                  opacity: 0,
                },
                {
                  xPercent: 0,
                  opacity: 1,

                  duration: 0.85,

                  ease: "power3.out",
                },
                `${label}+=.18`
              );
            }

            timeline.set(
              previous,
              {
                autoAlpha: 0,
              },
              `${label}+=1.04`
            );

            timeline.to(
              {},
              {
                duration:
                  desktop ? 0.45 : 0.26,
              }
            );
          });

          return () => {
            pauseAll();

            timeline?.scrollTrigger?.kill();
            timeline?.kill();
          };
        }
      );

      /*
       * =========================
       * CAPABILITIES HORIZONTAL
       * =========================
       */

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion:
            "(prefers-reduced-motion: reduce)",
        },

        (mediaContext) => {
          const { desktop, reduceMotion } =
            mediaContext.conditions;

          const track =
            capabilities.querySelector(
              "[data-capabilities-track]"
            );

          if (!track) return undefined;

          const cards =
            gsap.utils.toArray(
              track.querySelectorAll(
                "[data-capability-card]"
              )
            );

          if (!desktop || reduceMotion) {
            cards.forEach((card, index) => {
              const inner =
                card.querySelector(
                  "[data-capability-inner]"
                );

              if (!inner) return;

              gsap.fromTo(
                inner,
                {
                  y: 60,
                  opacity: 0,

                  rotateZ:
                    index % 2 === 0
                      ? -1.4
                      : 1.4,
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
                    toggleActions:
                      "play none none reverse",
                  },
                }
              );
            });

            return undefined;
          }

          const getDistance = () =>
            Math.max(
              0,
              track.scrollWidth -
                window.innerWidth
            );

          const horizontalTween =
            gsap.to(track, {
              x: () => -getDistance(),

              ease: "none",

              scrollTrigger: {
                trigger: capabilities,

                start: "top top",

                end: () =>
                  `+=${
                    getDistance() +
                    window.innerHeight * 1.05
                  }`,

                pin: true,
                scrub: 1,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

          cards.forEach((card, index) => {
            const inner =
              card.querySelector(
                "[data-capability-inner]"
              );

            const ghost =
              card.querySelector(
                ".oxo-capability-ghost"
              );

            const detail =
              card.querySelector(
                "[data-capability-detail]"
              );

            if (inner) {
              gsap.fromTo(
                inner,
                {
                  rotateZ:
                    index % 2 === 0
                      ? -2.5
                      : 2.5,

                  scale: 0.91,
                },
                {
                  rotateZ: 0,
                  scale: 1,

                  ease: "none",

                  scrollTrigger: {
                    trigger: card,

                    containerAnimation:
                      horizontalTween,

                    start: "left 90%",
                    end: "center center",

                    scrub: true,
                  },
                }
              );
            }

            if (ghost) {
              gsap.fromTo(
                ghost,
                {
                  xPercent: 18,
                  rotate:
                    index % 2 === 0
                      ? -5
                      : 5,
                },
                {
                  xPercent: -15,

                  rotate:
                    index % 2 === 0
                      ? 6
                      : -6,

                  ease: "none",

                  scrollTrigger: {
                    trigger: card,

                    containerAnimation:
                      horizontalTween,

                    start: "left right",
                    end: "right left",

                    scrub: true,
                  },
                }
              );
            }

            if (detail) {
              gsap.fromTo(
                detail,
                {
                  y: 45,
                  opacity: 0,
                  filter: "blur(8px)",
                },
                {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",

                  ease: "none",

                  scrollTrigger: {
                    trigger: card,

                    containerAnimation:
                      horizontalTween,

                    start: "left 78%",
                    end: "center 55%",

                    scrub: true,
                  },
                }
              );
            }
          });

          return () => {
            horizontalTween.scrollTrigger?.kill();
            horizontalTween.kill();
          };
        }
      );

      /*
       * =========================
       * STATIC TEXT REVEALS
       * =========================
       */

      const staticRevealNodes = gsap.utils.toArray(
        page.querySelectorAll("[data-static-reveal]")
      );

      staticRevealNodes.forEach((node, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          node,
          {
            y: 34,
            x: direction * 12,
            opacity: 0,
            filter: "blur(8px)",
            clipPath: "inset(0 0 38% 0)",
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            filter: "blur(0px)",
            clipPath: "inset(0 0 0% 0)",
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: node,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const staticSlideNodes = gsap.utils.toArray(
        page.querySelectorAll("[data-static-slide]")
      );

      staticSlideNodes.forEach((node, index) => {
        gsap.fromTo(
          node,
          {
            xPercent: index % 2 === 0 ? -8 : 8,
            opacity: 0,
          },
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.72,
            ease: "expo.out",
            scrollTrigger: {
              trigger: node,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /*
       * =========================
       * PRINCIPLES
       * =========================
       */

      const principleWords =
        gsap.utils.toArray(
          principles.querySelectorAll(
            "[data-principles-word] > span"
          )
        );

      gsap.fromTo(
        principleWords,
        {
          yPercent: 125,
          rotateX: -65,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,

          duration: 0.95,

          stagger: 0.045,

          ease: "power4.out",

          scrollTrigger: {
            trigger: principles,
            start: "top 68%",
            toggleActions:
              "play none none reverse",
          },
        }
      );

      const principleCards =
        gsap.utils.toArray(
          principles.querySelectorAll(
            "[data-principle-card]"
          )
        );

      principleCards.forEach(
        (card, index) => {
          const line =
            card.querySelector(
              "[data-principle-line]"
            );

          const content =
            card.querySelector(
              "[data-principle-content]"
            );

          gsap.fromTo(
            card,
            {
              clipPath:
                index % 2 === 0
                  ? "inset(0 100% 0 0)"
                  : "inset(0 0 0 100%)",
            },
            {
              clipPath: FULL_CLIP,

              duration: 1.1,

              ease: "power4.inOut",

              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                toggleActions:
                  "play none none reverse",
              },
            }
          );

          if (line) {
            gsap.fromTo(
              line,
              {
                scaleX: 0,
              },
              {
                scaleX: 1,

                duration: 0.8,

                ease: "expo.out",

                scrollTrigger: {
                  trigger: card,
                  start: "top 79%",
                  toggleActions:
                    "play none none reverse",
                },
              }
            );
          }

          if (content) {
            gsap.fromTo(
              content,
              {
                y: 55,
                opacity: 0,
                filter: "blur(7px)",
              },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",

                duration: 0.9,

                delay: 0.1,

                ease: "power3.out",

                scrollTrigger: {
                  trigger: card,
                  start: "top 78%",
                  toggleActions:
                    "play none none reverse",
                },
              }
            );
          }
        }
      );

      /*
       * =========================
       * FINAL
       * =========================
       */

      const finalLetters =
        gsap.utils.toArray(
          finalSection.querySelectorAll(
            "[data-final-letter]"
          )
        );

      const finalBeam =
        finalSection.querySelector(
          "[data-final-beam]"
        );

      const finalOrb =
        finalSection.querySelector(
          "[data-final-orb]"
        );

      const finalMeta =
        gsap.utils.toArray(
          finalSection.querySelectorAll(
            "[data-final-meta]"
          )
        );

      gsap.fromTo(
        finalLetters,
        {
          yPercent: 135,
          rotateX: -85,
          rotateZ: -2,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          rotateZ: 0,
          opacity: 1,

          duration: 1.2,

          stagger: 0.03,

          ease: "expo.out",

          scrollTrigger: {
            trigger: finalSection,
            start: "top 68%",
            toggleActions:
              "play none none reverse",
          },
        }
      );

      if (finalBeam) {
        gsap.fromTo(
          finalBeam,
          {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
          },
          {
            scaleX: 1,
            opacity: 1,

            duration: 1.2,

            ease: "expo.out",

            scrollTrigger: {
              trigger: finalSection,
              start: "top 74%",
              toggleActions:
                "play none none reverse",
            },
          }
        );

        gsap.to(finalBeam, {
          xPercent: 30,
          rotate: 5,

          ease: "none",

          scrollTrigger: {
            trigger: finalSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (finalOrb) {
        gsap.to(finalOrb, {
          xPercent: -20,
          yPercent: -16,
          rotate: 85,
          scale: 1.2,

          ease: "none",

          scrollTrigger: {
            trigger: finalSection,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      gsap.fromTo(
        finalMeta,
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,

          stagger: 0.1,

          duration: 0.8,

          scrollTrigger: {
            trigger: finalSection,
            start: "top 75%",
          },
        }
      );
    }, page);

    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    };

    const timer = setTimeout(
      refresh,
      250
    );

    window.addEventListener(
      "load",
      refresh
    );

    return () => {
      clearTimeout(timer);

      window.removeEventListener(
        "load",
        refresh
      );

      productVideos.forEach(
        (video) => video.pause()
      );

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
        className="oxo-products-avant relative overflow-x-hidden bg-[#030303] text-white"
      >
        {/* CURSOR AWARD */}

        <div
          ref={cursorGlowRef}
          aria-hidden="true"
          className="oxo-cursor-glow"
        />

        <div
          ref={cursorDotRef}
          aria-hidden="true"
          className="oxo-cursor-dot"
        />

        <style>{`
          /* AVANT LEGATO SAFE:
             solo famiglia tipografica, nessuna trasformazione globale */
          .oxo-products-avant,
          .oxo-products-avant * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .avant-legato-font {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif !important;

            font-style: normal;
            font-weight: 400;
            font-stretch: normal;
            display: revert;
            transform: none;
            text-transform: inherit;
          }

          h1.avant-legato-font,
          h2.avant-legato-font,
          h3.avant-legato-font {
            font-stretch: expanded;
            transform: scaleX(.96);
            transform-origin: left center;
          }

          @keyframes oxoProductsScan {
            0% {
              transform: translate3d(-15vw,0,0);
              opacity: 0;
            }

            12% {
              opacity: .9;
            }

            70% {
              opacity: .45;
            }

            100% {
              transform: translate3d(115vw,0,0);
              opacity: 0;
            }
          }

          @keyframes oxoProductsOrbit {
            0%,100% {
              transform: rotate(0deg) scale(1);
            }

            50% {
              transform: rotate(10deg) scale(1.045);
            }
          }

          @keyframes oxoProductsBlink {
            0%, 84%, 100% {
              opacity: .14;
            }

            86%, 91% {
              opacity: 1;
            }
          }

          .oxo-products-grid {
            background-image:
              linear-gradient(
                rgba(255,255,255,.035) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,.035) 1px,
                transparent 1px
              );

            background-size: 68px 68px;

            mask-image:
              linear-gradient(
                to bottom,
                transparent,
                black 12%,
                black 88%,
                transparent
              );
          }

          .oxo-products-noise::after {
            content: "";

            position: absolute;
            inset: 0;

            z-index: 80;

            pointer-events: none;

            opacity: .05;

            background-image:
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");

            mix-blend-mode: soft-light;
          }

          /*
           * CUSTOM CURSOR
           */

          .oxo-cursor-glow {
            position: fixed;

            left: 0;
            top: 0;

            width: 38rem;
            height: 38rem;

            transform:
              translate3d(-50%,-50%,0);

            border-radius: 999px;

            pointer-events: none;

            z-index: 90;

            opacity: .36;

            background:
              radial-gradient(
                circle,
                rgba(53,216,255,.14) 0%,
                rgba(139,92,246,.08) 28%,
                rgba(255,79,216,.04) 48%,
                transparent 69%
              );

            filter: blur(22px);

            mix-blend-mode: screen;

            will-change: transform;
          }

          .oxo-cursor-dot {
            position: fixed;

            left: 0;
            top: 0;

            width: 7px;
            height: 7px;

            transform:
              translate3d(-50%,-50%,0);

            border-radius: 999px;

            pointer-events: none;

            z-index: 100;

            background:
              rgba(255,255,255,.95);

            box-shadow:
              0 0 16px rgba(53,216,255,.9),
              0 0 34px rgba(139,92,246,.5);

            mix-blend-mode: screen;
          }

          /*
           * HERO SCAN
           */

          .oxo-hero-beam {
            height: 1px;

            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.9),
                white,
                rgba(255,79,216,.75),
                transparent
              );

            box-shadow:
              0 0 25px rgba(53,216,255,.5),
              0 0 55px rgba(139,92,246,.25);
          }

          /*
           * PRODUCT FRAME
           */

          .oxo-product-frame {
            transform-style: preserve-3d;
          }

          .oxo-product-frame::before {
            content: "";

            position: absolute;
            inset: 0;

            z-index: 31;

            pointer-events: none;

            opacity: .23;

            background:
              linear-gradient(
                110deg,
                transparent 15%,
                rgba(255,255,255,.14) 32%,
                transparent 49%
              );

            transform:
              translate3d(-125%,0,0);

            transition:
              transform 1.2s
              cubic-bezier(.16,1,.3,1);

            mix-blend-mode: screen;
          }

          [data-product-panel]:hover
          .oxo-product-frame::before {
            transform:
              translate3d(125%,0,0);
          }

          .oxo-product-chromatic {
            position: absolute;

            inset: 0;

            z-index: 29;

            pointer-events: none;

            opacity: 0;

            background:
              linear-gradient(
                90deg,
                rgba(53,216,255,.09),
                transparent 32%,
                transparent 68%,
                rgba(255,79,216,.07)
              );

            mix-blend-mode: screen;
          }

          .oxo-product-shutter {
            box-shadow:
              inset -1px 0
              rgba(255,255,255,.06);

            will-change: transform;
          }

          /*
           * CAPABILITIES
           */

          .oxo-capability-card {
            perspective: 1400px;
          }

          [data-capability-inner] {
            transform-style: preserve-3d;
            will-change: transform;
          }

          .oxo-capability-card::after {
            content: "";

            position: absolute;

            inset: 7%;

            border:
              1px solid
              rgba(255,255,255,.06);

            pointer-events: none;

            opacity: 0;

            transform:
              scale(.96);

            transition:
              opacity .5s ease,
              transform .6s
              cubic-bezier(.16,1,.3,1);
          }

          .oxo-capability-card:hover::after {
            opacity: 1;

            transform:
              scale(1);
          }

          .oxo-capability-card:hover
          .oxo-capability-arrow {
            transform:
              translate3d(.8rem,-.8rem,0)
              rotate(8deg);
          }

          .oxo-capability-card:hover
          .oxo-capability-ghost {
            opacity: .13;
          }

          /*
           * PRINCIPLES
           */

          .oxo-principle-card::before {
            content: "";

            position: absolute;

            inset: 0;

            pointer-events: none;

            opacity: 0;

            background:
              radial-gradient(
                circle at 15% 50%,
                rgba(255,255,255,.07),
                transparent 34%
              );

            transform:
              translateX(-8%);

            transition:
              opacity .5s ease,
              transform .75s
              cubic-bezier(.16,1,.3,1);
          }

          .oxo-principle-card:hover::before {
            opacity: 1;

            transform:
              translateX(0);
          }

          .oxo-principle-title {
            transition:
              transform .55s
              cubic-bezier(.16,1,.3,1),
              letter-spacing .55s
              cubic-bezier(.16,1,.3,1);
          }

          .oxo-principle-card:hover
          .oxo-principle-title {
            transform:
              translateX(1.2vw);

            letter-spacing:
              -.035em;
          }

          /*
           * LINKS
           */

          .oxo-products-link::after {
            content: "";

            position: absolute;

            left: 0;
            bottom: 0;

            width: 100%;
            height: 1px;

            background:
              currentColor;

            transform:
              scaleX(0);

            transform-origin:
              right center;

            transition:
              transform .45s
              cubic-bezier(.16,1,.3,1);
          }

          .oxo-products-link:hover::after {
            transform:
              scaleX(1);

            transform-origin:
              left center;
          }

          @media
          (pointer: coarse),
          (prefers-reduced-motion: reduce) {

            .oxo-cursor-glow,
            .oxo-cursor-dot {
              display: none;
            }
          }
        `}</style>

        {/* ================= HERO ================= */}

        <section
          ref={heroRef}
          className="oxo-products-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0" />

          {/* vertical slices */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 grid grid-cols-6"
          >
            {SHUTTERS.slice(0, 6).map(
              (index) => (
                <div
                  key={index}
                  className="border-r border-white/[0.035]"
                />
              )
            )}
          </div>

          {/* ring */}

          <div
            data-products-hero-ring
            aria-hidden="true"
            className="pointer-events-none absolute -right-[13vw] top-[4vh] h-[58vw] w-[58vw] rounded-full border border-cyan-300/15"
            style={{
              animation:
                "oxoProductsOrbit 12s ease-in-out infinite",
            }}
          >
            <div className="absolute inset-[13%] rounded-full border border-violet-400/15" />

            <div className="absolute inset-[29%] rounded-full border border-fuchsia-400/15" />

            <div className="absolute left-1/2 top-[-1px] h-2 w-2 -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(53,216,255,.9)]" />
          </div>

          {/* moving vertical scan */}

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-[18%] z-[2] h-[64%] w-[1px] bg-gradient-to-b from-transparent via-cyan-300 to-transparent shadow-[0_0_28px_rgba(53,216,255,.65)]"
            style={{
              animation:
                "oxoProductsScan 7s linear infinite",
            }}
          />

          {/* cinematic horizontal scan */}

          <div
            data-products-hero-beam
            aria-hidden="true"
            className="oxo-hero-beam pointer-events-none absolute left-[4vw] right-[4vw] top-[32%] z-[5]"
          />

          {/* coords */}

          <span
            data-products-coordinate
            className="avant-legato-font pointer-events-none absolute left-[4vw] top-[15vh] z-[4] text-[9px] tracking-[0.3em] text-white/35"
          >
            X / 046.118
          </span>

          <span
            data-products-coordinate
            className="avant-legato-font pointer-events-none absolute bottom-[16vh] right-[4vw] z-[4] text-[9px] tracking-[0.3em] text-white/35"
          >
            Y / 009.823
          </span>

          {/* ghost */}

          <p
            data-products-hero-ghost
            aria-hidden="true"
            className="avant-legato-font pointer-events-none absolute -left-[2vw] top-[18vh] whitespace-nowrap text-[14vw] uppercase leading-none tracking-[-0.075em] text-white/[0.025]"
          >
            DIGITAL OBJECTS
          </p>

          {/* top */}

          <div className="relative z-10 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:text-[11px]">
            <p data-products-meta data-static-slide>
              OXO STUDIO® / PRODUCT LAB
            </p>

         
          </div>

          {/* title */}

          <div
            data-products-hero-title
            className="relative z-10 my-auto py-14"
          >
            <p
              data-products-meta
              className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.36em] text-cyan-300 md:text-xs"
            >
              Digital systems with a point of view
            </p>

            <h1 className="avant-legato-font ombra2 overflow-hidden text-[13vw] uppercase leading-[0.7] tracking-[-0.075em] md:text-[14vw] lg:text-[8.8vw]">
              <SplitLetters text="PRODOTTI" />
            </h1>
          </div>

          {/* bottom */}

          <div className="relative z-10 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p
              data-products-meta
              className="avant-legato-font max-w-[920px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.35rem]"
            >
              Software, intelligenza artificiale e
              mondi interattivi progettati per
              trasformare problemi reali in esperienze
              precise, potenti e riconoscibili.
            </p>

            <p
              data-products-meta
              className="avant-legato-font shrink-0 text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
            >
              Enter the product lab ↓
            </p>
          </div>
        </section>

        {/* ================= PRODUCTS ================= */}

        <section
          ref={showcaseRef}
          className="relative h-[100svh] min-h-[650px] w-full overflow-hidden bg-black"
        >
          {PRODUCTS.map(
            (product, productIndex) => (
              <article
                key={product.id}
                data-product-panel
                className="oxo-products-noise absolute inset-0 overflow-hidden"
                style={{
                  opacity:
                    productIndex === 0 ? 1 : 0,

                  visibility:
                    productIndex === 0
                      ? "visible"
                      : "hidden",

                  zIndex:
                    productIndex + 1,
                }}
              >
                {/* media */}

                <div
                  data-product-frame
                  className="oxo-product-frame absolute inset-0 overflow-hidden"
                  style={{
                    clipPath:
                      productIndex === 0
                        ? FULL_CLIP
                        : CLOSED_CLIP,

                    background:
                      product.fallback,

                    willChange:
                      "clip-path, transform",
                  }}
                >
                  <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-65" />

                  <video
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{
                      objectPosition:
                        product.objectPosition,
                    }}
                    src={product.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    autoPlay={
                      productIndex === 0
                    }
                    onLoadedMetadata={() =>
                      ScrollTrigger.refresh()
                    }
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";

                      ScrollTrigger.refresh();
                    }}
                  />

                  <div className="pointer-events-none absolute inset-0 bg-black/24" />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/70" />

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/82 via-black/10 to-black/34" />

                  <div
                    data-product-chromatic
                    className="oxo-product-chromatic"
                  />

                  <div className="pointer-events-none absolute inset-[14px] z-10 border border-white/28 md:inset-[26px] lg:inset-[2.2vw]" />

                  {/* shutters */}

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-40 grid grid-cols-7"
                  >
                    {SHUTTERS.map(
                      (shutterIndex) => (
                        <div
                          key={shutterIndex}
                          data-product-shutter
                          className="oxo-product-shutter h-full bg-[#020202]"
                          style={{
                            transform:
                              productIndex === 0
                                ? "scaleY(0)"
                                : "scaleY(1)",

                            transformOrigin:
                              shutterIndex % 2 === 0
                                ? "top center"
                                : "bottom center",
                          }}
                        />
                      )
                    )}
                  </div>
                </div>

                {/* ghost statement */}

                <p
                  data-product-ghost
                  aria-hidden="true"
                  className="avant-legato-font pointer-events-none absolute left-[2vw] top-[12vh] z-[3] whitespace-nowrap text-[13vw] uppercase leading-none tracking-[-0.07em] text-white/[0.045]"
                  style={{
                    opacity:
                      productIndex === 0 ? 1 : 0,
                  }}
                >
                  {product.statement}
                </p>

                {/* top left */}

                <div data-static-slide className="avant-legato-font absolute left-7 top-7 z-50 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] md:left-12 md:top-12 md:text-xs lg:left-[4.4vw] lg:top-[4.4vw]">
                  <span>{product.id}</span>

                  <span
                    className="h-px w-10 md:w-16"
                    style={{
                      backgroundColor:
                        product.accent,
                    }}
                  />

                  <span className="text-gray-300">
                    {product.category}
                  </span>
                </div>

                {/* meta */}

                <p data-static-slide className="avant-legato-font absolute right-7 top-7 z-50 max-w-[48vw] text-right text-[9px] uppercase tracking-[0.23em] text-gray-300 md:right-12 md:top-12 md:text-[11px] lg:right-[4.4vw] lg:top-[4.4vw]">
                  {product.meta}
                </p>

                {/* main content */}

                <div
                  data-product-content
                  className="absolute bottom-12 left-7 z-50 max-w-[900px] pr-7 md:bottom-16 md:left-12 md:pr-12 lg:bottom-[7vh] lg:left-[5vw]"
                  style={{
                    opacity:
                      productIndex === 0 ? 1 : 0,

                    visibility:
                      productIndex === 0
                        ? "visible"
                        : "hidden",
                  }}
                >
                  <p
                    className="avant-legato-font mb-3 text-[10px] uppercase tracking-[0.34em] md:text-xs"
                    style={{
                      color:
                        product.accent,
                    }}
                  >
                    Selected digital product
                  </p>

                  <h2
                    data-product-title
                    className="avant-legato-font ombra2 max-w-[1200px] text-[clamp(2.6rem,6.4vw,6.6rem)] uppercase leading-[0.76] tracking-[-0.06em]"
                  >
                    {product.title}
                  </h2>

                  <p className="avant-legato-font mt-6 max-w-[710px] text-lg leading-snug text-gray-200 md:text-2xl lg:text-3xl">
                    {product.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2 md:mt-9">
                    {product.tags.map(
                      (tag) => (
                        <span
                          key={tag}
                          className="avant-legato-font border px-3 py-2 text-[9px] uppercase tracking-[0.24em] text-gray-200 md:text-[10px]"
                          style={{
                            borderColor:
                              `${product.accent}66`,

                            backgroundColor:
                              product.accentSoft,
                          }}
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  <Link
                    to={product.link}
                    data-magnetic
                    className="oxo-products-link avant-legato-font relative mt-8 inline-flex items-center gap-5 pb-2 text-xs uppercase tracking-[0.28em] md:mt-10 md:text-sm"
                    style={{
                      color:
                        product.accent,
                    }}
                  >
                    <span>
                      Esplora il prodotto
                    </span>

                    <span className="text-lg">
                      ↗
                    </span>
                  </Link>
                </div>

                {/* specs */}

                <div
                  data-product-specs
                  className="absolute bottom-12 right-7 z-50 hidden w-[300px] border-t border-white/25 md:bottom-16 md:right-12 lg:block lg:bottom-[7vh] lg:right-[5vw] lg:w-[340px]"
                  style={{
                    opacity:
                      productIndex === 0 ? 1 : 0,

                    visibility:
                      productIndex === 0
                        ? "visible"
                        : "hidden",
                  }}
                >
                  {product.specs.map(
                    ([label, value]) => (
                      <div
                        key={label}
                        data-product-spec-row
                        className="grid grid-cols-[76px_1fr] gap-5 border-b border-white/18 py-4"
                      >
                        <span className="avant-legato-font text-[9px] uppercase tracking-[0.26em] text-gray-500">
                          {label}
                        </span>

                        <span className="avant-legato-font text-right text-[10px] uppercase tracking-[0.22em] text-gray-200">
                          {value}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </article>
            )
          )}

          {/* rail */}

          <aside className="pointer-events-none absolute right-7 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-5 md:flex lg:right-[3vw]">
            {PRODUCTS.map(
              (product, index) => (
                <div
                  key={product.id}
                  data-product-rail-item
                  className="flex items-center justify-end gap-3 opacity-30"
                >
                  <span
                    data-product-rail-label
                    className="avant-legato-font text-[9px] uppercase tracking-[0.24em] text-white/50"
                  >
                    {product.id}
                  </span>

                  <span
                    data-product-rail-line
                    className="h-px w-10 origin-right bg-white/30"
                    style={{
                      transform:
                        index === 0
                          ? "scaleX(1)"
                          : "scaleX(.2)",
                    }}
                  />
                </div>
              )
            )}
          </aside>

          {/* counter */}

          <div className="pointer-events-none absolute bottom-8 right-8 z-[70] flex items-end gap-2 md:bottom-12 md:right-12 lg:bottom-[4.5vh] lg:right-[3vw]">
            <span
              data-product-counter
              className="avant-legato-font text-5xl leading-none tracking-[-0.06em] md:text-7xl"
            >
              01
            </span>

            <span className="avant-legato-font mb-1 text-[10px] uppercase tracking-[0.26em] text-gray-500 md:mb-2">
              /{" "}
              {String(
                PRODUCTS.length
              ).padStart(2, "0")}
            </span>
          </div>

          {/* progress */}

          <div className="pointer-events-none absolute bottom-0 left-0 z-[80] h-px w-full bg-white/20">
            <div
              data-product-progress
              className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
            />
          </div>
        </section>

        {/* ================= CAPABILITIES ================= */}

        <section
          ref={capabilitiesRef}
          className="oxo-products-noise relative min-h-[100svh] overflow-hidden border-y border-white/15 bg-[#050505]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-60" />

          <div
            data-capabilities-track
            className="relative z-10 flex min-h-[100svh] w-full flex-col items-stretch lg:w-max lg:flex-row"
          >
            {/* intro */}

            <header className="flex min-h-[100svh] w-full shrink-0 flex-col justify-between px-6 py-8 md:px-10 md:py-10 lg:w-[72vw] lg:px-[5vw] lg:py-[5vh]">
              <div className="flex items-start justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 md:text-[11px]">
                <span data-static-slide>
                  THE PRODUCT ENGINE
                </span>

                <span data-static-slide>
                  04 CAPABILITIES
                </span>
              </div>

              <div>
                <p data-static-reveal className="avant-legato-font mb-5 text-[10px] uppercase tracking-[0.35em] text-cyan-300 md:text-xs">
                  Dietro ogni prodotto
                </p>

                <h2 data-static-reveal className="avant-legato-font ombra2 text-[14vw] uppercase leading-[0.72] tracking-[-0.07em] md:text-[10.8vw] lg:text-[5.8vw]">
                  COME
                  <br />
                  PRENDE
                  <br />
                  FORMA
                </h2>
              </div>

              <p data-static-reveal className="avant-legato-font max-w-[690px] border-t border-white/20 pt-6 text-xl leading-snug text-gray-300 md:text-3xl">
                Quattro competenze che non
                lavorano in sequenza: si
                contaminano dall’inizio alla
                fine del progetto.
              </p>
            </header>

            {/* cards */}

            {CAPABILITIES.map(
              (capability) => (
                <article
                  key={capability.id}
                  data-capability-card
                  data-tilt
                  className="oxo-capability-card relative flex min-h-[100svh] w-full shrink-0 items-center border-t border-white/15 px-5 py-8 md:px-10 lg:w-[56vw] lg:border-l lg:border-t-0 lg:px-[3vw]"
                >
                  <div
                    data-capability-inner
                    className="relative h-[82svh] w-full overflow-hidden border border-white/20 p-6 md:p-9 lg:p-[2.5vw]"
                    style={{
                      background:
                        capability.background,
                    }}
                  >
                    <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-65" />

                    <p
                      aria-hidden="true"
                      className="oxo-capability-ghost avant-legato-font pointer-events-none absolute -right-[1vw] -top-[4vw] text-[23vw] leading-none tracking-[-0.09em] text-white/[0.055]"
                    >
                      {capability.id}
                    </p>

                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-center justify-between border-b border-white/20 pb-5">
                        <div className="flex items-center gap-3">
                          <span className="avant-legato-font text-[10px] tracking-[0.28em]">
                            {
                              capability.id
                            }
                          </span>

                          <span
                            className="h-px w-12"
                            style={{
                              backgroundColor:
                                capability.accent,
                            }}
                          />
                        </div>

                        <span className="oxo-capability-arrow avant-legato-font text-2xl transition-transform duration-500 ease-out md:text-4xl">
                          ↗
                        </span>
                      </div>

                      <div data-capability-detail>
                        <p
                          data-static-reveal className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.32em] md:text-xs"
                          style={{
                            color:
                              capability.accent,
                          }}
                        >
                          {
                            capability.eyebrow
                          }
                        </p>

                        <h3 data-static-reveal className="avant-legato-font ombra2 text-[8.8vw] uppercase leading-[0.76] tracking-[-0.065em] md:text-[6.4vw] lg:text-[4.6vw]">
                          {
                            capability.title
                          }
                        </h3>

                        <p data-static-reveal className="avant-legato-font mt-6 max-w-[660px] text-lg leading-snug text-gray-200 md:text-2xl">
                          {
                            capability.copy
                          }
                        </p>

                        <div data-static-reveal className="mt-8 flex flex-wrap gap-2">
                          {capability.tags.map(
                            (tag) => (
                              <span
                                key={tag}
                                className="avant-legato-font border border-white/20 px-3 py-2 text-[9px] uppercase tracking-[0.23em] text-gray-300"
                              >
                                {tag}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              )
            )}

            {/* ending panel */}

            <div className="flex min-h-[72svh] w-full shrink-0 items-center justify-center border-t border-white/15 px-6 py-20 md:px-10 lg:min-h-[100svh] lg:w-[58vw] lg:border-l lg:border-t-0 lg:px-[6vw] lg:py-0">
              <div className="max-w-[620px]">
                <p data-static-reveal className="avant-legato-font mb-5 text-[10px] uppercase tracking-[0.34em] text-fuchsia-400 md:text-xs">
                  One studio / one system
                </p>

                <p data-static-reveal className="avant-legato-font text-[clamp(2.2rem,4.5vw,4.7rem)] leading-[0.96] tracking-[-0.04em]">
                  La qualità nasce quando
                  strategia, design e codice
                  smettono di passarsi il
                  lavoro e iniziano a pensare
                  insieme.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PRINCIPLES ================= */}

        <section
          ref={principlesRef}
          className="relative overflow-hidden bg-[#030303] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-55" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-[8vw]">
            <div>
              <p data-static-reveal className="avant-legato-font mb-5 text-[10px] uppercase tracking-[0.35em] text-violet-400 md:text-xs">
                Product principles
              </p>

              <h2 className="avant-legato-font ombra2 text-[13vw] uppercase leading-[0.74] tracking-[-0.07em] md:text-[8.8vw] lg:sticky lg:top-[11vh] lg:text-[5.8vw]">
                <SplitWords text="NON SOLO BELLO. NECESSARIO." />
              </h2>
            </div>

            <div className="border-t border-white/20">
              {PRINCIPLES.map(
                (principle) => (
                  <article
                    key={principle.id}
                    data-principle-card
                    className="oxo-principle-card relative min-h-[270px] overflow-hidden border-b border-white/20 py-9 md:min-h-[330px] md:py-12"
                    style={{
                      background:
                        `linear-gradient(90deg, ${principle.accent}0d, transparent 48%)`,

                      clipPath:
                        FULL_CLIP,
                    }}
                  >
                    <span
                      data-principle-line
                      className="absolute left-0 top-0 h-px w-full origin-left"
                      style={{
                        backgroundColor:
                          principle.accent,
                      }}
                    />

                    <div
                      data-principle-content
                      className="grid grid-cols-[50px_1fr] gap-4 md:grid-cols-[78px_1fr] md:gap-8"
                    >
                      <span className="avant-legato-font pt-2 text-[9px] tracking-[0.24em] text-gray-500 md:text-[10px]">
                        {principle.id}
                      </span>

                      <div>
                        <h3 className="oxo-principle-title avant-legato-font text-[7.2vw] uppercase leading-[0.86] tracking-[-0.045em] md:text-[4.3vw] lg:text-[3.45vw]">
                          {
                            principle.title
                          }
                        </h3>

                        <p className="avant-legato-font mt-5 max-w-[660px] text-[15px] leading-[1.45] text-gray-400 md:text-lg lg:text-xl">
                          {
                            principle.copy
                          }
                        </p>
                      </div>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        {/* ================= FINAL ================= */}

        <section
          ref={finalRef}
          className="oxo-products-noise relative flex min-h-[94svh] items-end overflow-hidden border-t border-white/15 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="oxo-products-grid pointer-events-none absolute inset-0 opacity-65" />

          <div
            data-final-orb
            aria-hidden="true"
            className="pointer-events-none absolute -right-[10vw] bottom-[-8vw] h-[50vw] w-[50vw] rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.20), rgba(139,92,246,.13) 38%, rgba(255,79,216,.08) 56%, transparent 74%)",
            }}
          />

          <div
            data-final-beam
            aria-hidden="true"
            className="pointer-events-none absolute left-[-10%] top-[36%] h-px w-[120%] -rotate-[7deg] bg-gradient-to-r from-transparent via-cyan-300/65 to-fuchsia-400/20"
            style={{
              animation:
                "oxoProductsBlink 4.2s linear infinite",
            }}
          />

          <div className="relative z-10 w-full">
            <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 md:text-[11px]">
              <span data-final-meta>
                START A DIGITAL PRODUCT
              </span>

              <span data-final-meta>
                OXO STUDIO / PRODUCT LAB
              </span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[13.5vw] uppercase leading-[0.71] tracking-[-0.075em] md:text-[11.5vw] lg:text-[8.8vw]">
              <SplitLetters
                text="COSTRUIAMOLO"
                attribute="data-final-letter"
              />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p data-static-reveal className="avant-legato-font max-w-[820px] text-xl leading-snug text-gray-300 md:text-3xl">
                Hai un software da rendere
                reale, un processo da
                automatizzare o un’esperienza
                interattiva ancora senza forma?
              </p>

              <Link
                to="/contatti"
                data-magnetic
                data-static-reveal className="oxo-products-link avant-legato-font relative inline-flex w-fit items-center gap-5 pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
              >
                <span>
                  Parliamo del progetto
                </span>

                <span className="text-xl">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}