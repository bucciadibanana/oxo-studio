import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

gsap.registerPlugin(ScrollTrigger);

const AI_PHASES = [
  {
    id: "01",
    title: "INPUT",
    kicker: "RAW SIGNAL",
    copy: "Testo, documenti, immagini e dati entrano nel sistema senza perdere contesto.",
    accent: "#35d8ff",
  },
  {
    id: "02",
    title: "CONTEXT",
    kicker: "STRUCTURE",
    copy: "Il dato viene organizzato, indicizzato e collegato alle informazioni realmente utili.",
    accent: "#8b5cf6",
  },
  {
    id: "03",
    title: "REASON",
    kicker: "INTELLIGENCE",
    copy: "Modelli, regole e retrieval lavorano insieme per produrre una risposta verificabile.",
    accent: "#20f0c7",
  },
  {
    id: "04",
    title: "OUTPUT",
    kicker: "ACTION",
    copy: "Il risultato diventa ricerca, classificazione, automazione o decisione assistita.",
    accent: "#ff4fd8",
  },
];

const USE_CASES = [
  {
    id: "01",
    title: "RICERCA SEMANTICA",
    copy: "Trovare concetti, relazioni e informazioni anche quando le parole esatte non coincidono.",
    accent: "#35d8ff",
  },
  {
    id: "02",
    title: "CLASSIFICAZIONE",
    copy: "Ordinare grandi volumi di contenuti con criteri coerenti e controllabili.",
    accent: "#8b5cf6",
  },
  {
    id: "03",
    title: "OCR + VISION",
    copy: "Leggere documenti, immagini e materiali digitalizzati trasformandoli in dati utilizzabili.",
    accent: "#20f0c7",
  },
  {
    id: "04",
    title: "AGENTI",
    copy: "Sistemi capaci di eseguire sequenze operative con regole, strumenti e limiti definiti.",
    accent: "#ff4fd8",
  },
  {
    id: "05",
    title: "RAG",
    copy: "Risposte fondate sui dati dell’organizzazione invece che su conoscenza generica.",
    accent: "#35d8ff",
  },
  {
    id: "06",
    title: "AUTOMAZIONE",
    copy: "Ridurre attività ripetitive mantenendo log, revisione e responsabilità umana.",
    accent: "#8b5cf6",
  },
];

const STACK = [
  ["LLM / VISION", "#ffffff"],
  ["RAG / VECTOR", "#35d8ff"],
  ["POSTGRESQL", "#8b5cf6"],
  ["PYTHON", "#20f0c7"],
  ["API / AGENTS", "#ff4fd8"],
  ["GUARDRAILS", "#35d8ff"],
];

function SplitLetters({ text, attribute = "data-ai-letter" }) {
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

export default function ArtificialIntelligence() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const processRef = useRef(null);
  const demoRef = useRef(null);
  const casesRef = useRef(null);
  const techRef = useRef(null);
  const finalRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const process = processRef.current;
    const demo = demoRef.current;
    const cases = casesRef.current;
    const tech = techRef.current;
    const finalSection = finalRef.current;

    if (!page || !hero || !process || !demo || !cases || !tech || !finalSection) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    let pointerMoveHandler = null;
    let pointerLeaveHandler = null;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      /*
       * ============================================================
       * HERO — DEEP NEURAL FLOW
       * Dense blue data stream -> central neural mesh -> amber output field
       * ============================================================
       */
      const heroNodes = gsap.utils.toArray(
        hero.querySelectorAll("[data-ai-node]")
      );
      const heroStreams = gsap.utils.toArray(
        hero.querySelectorAll("[data-ai-stream]")
      );
      const networkPaths = gsap.utils.toArray(
        hero.querySelectorAll("[data-ai-network-path]")
      );
      const networkPulses = gsap.utils.toArray(
        hero.querySelectorAll("[data-ai-network-pulse]")
      );
      const heroWord = hero.querySelector("[data-ai-hero-word]");
      const heroSub = hero.querySelector("[data-ai-hero-sub]");
      const heroProgress = hero.querySelector("[data-ai-progress]");
      const neuralField = hero.querySelector("[data-ai-neural-field]");
      const neuralCore = hero.querySelector("[data-ai-neural-core]");
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-ai-meta]")
      );

      if (reduce) {
        gsap.set(page.querySelectorAll("[data-ai-reveal]"), {
          clearProps: "all",
          opacity: 1,
        });
        return;
      }

      /*
       * FIRST FRAME IS ALREADY ALIVE.
       * Nothing starts empty.
       */
      heroNodes.forEach((node, index) => {
        const side = index % 3 === 0 ? 1 : -1;
        gsap.set(node, {
          opacity: 0.32 + (index % 5) * 0.08,
          scale: 0.68 + (index % 6) * 0.09,
          x: side * (index % 7) * 2,
          y: (index % 5 - 2) * 2,
        });
      });

      gsap.set(heroStreams, {
        opacity: (index) => 0.12 + (index % 5) * 0.035,
        xPercent: (index) => -(index % 6) * 2,
      });

      gsap.set(networkPaths, {
        strokeDasharray: 1200,
        strokeDashoffset: (index) => 760 + index * 18,
        opacity: (index) => 0.13 + (index % 4) * 0.045,
      });

      gsap.set(networkPulses, {
        opacity: (index) => 0.36 + (index % 4) * 0.12,
        scale: (index) => 0.72 + (index % 3) * 0.12,
        transformOrigin: "center center",
      });

      gsap.set(heroWord, {
        autoAlpha: 0.82,
        scale: 0.94,
        filter: "blur(0px)",
      });

      gsap.set(heroSub, {
        autoAlpha: 0.58,
        y: 0,
      });

      gsap.set(heroProgress, {
        scaleX: 0.12,
        transformOrigin: "left center",
      });

      if (neuralField) {
        gsap.set(neuralField, {
          scale: 0.94,
          xPercent: -2,
          opacity: 1,
        });
      }

      if (neuralCore) {
        gsap.set(neuralCore, {
          scale: 0.82,
          rotate: -3,
          opacity: 0.72,
        });
      }

      gsap.fromTo(
        heroMeta,
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          delay: 0.08,
          ease: "power3.out",
        }
      );

      /*
       * Idle breathing before / during scroll.
       */
      heroStreams.forEach((stream, index) => {
        gsap.to(stream, {
          xPercent: 14 + (index % 5) * 4,
          duration: 5.5 + (index % 4) * 0.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      networkPulses.forEach((pulse, index) => {
        gsap.to(pulse, {
          scale: 1.4 + (index % 3) * 0.22,
          opacity: 0.94,
          duration: 1.15 + (index % 5) * 0.18,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      const heroTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.9,
          invalidateOnRefresh: true,
          fastScrollEnd: false,
        },
      });

      /*
       * Phase 1: blue data stream gets pulled into the neural core.
       */
      heroTl
        .to(
          heroStreams,
          {
            xPercent: 28,
            opacity: 0.4,
            stagger: 0.008,
            duration: 0.42,
            ease: "power2.inOut",
          },
          0
        )
        .to(
          heroProgress,
          {
            scaleX: 0.48,
            duration: 0.34,
            ease: "power2.out",
          },
          0.03
        );

      networkPaths.forEach((path, index) => {
        heroTl.to(
          path,
          {
            strokeDashoffset: 0,
            opacity: index % 5 === 0 ? 0.52 : 0.26,
            duration: 0.55,
            ease: "power2.out",
          },
          0.08 + (index % 9) * 0.012
        );
      });

      heroNodes.forEach((node, index) => {
        const isAmber = index % 5 === 0 || index % 7 === 0;
        heroTl.to(
          node,
          {
            x: (index % 7 - 3) * 8,
            y: (index % 6 - 2.5) * 8,
            scale: isAmber ? 1.55 : 1.06,
            opacity: isAmber ? 1 : 0.62,
            duration: 0.44,
            ease: "power3.inOut",
          },
          0.12 + (index % 7) * 0.012
        );
      });

      /*
       * Phase 2: core expands; blue/amber network becomes readable.
       */
      heroTl
        .to(
          neuralCore,
          {
            scale: 1.06,
            rotate: 0,
            opacity: 1,
            duration: 0.42,
            ease: "power3.inOut",
          },
          0.34
        )
        .to(
          neuralField,
          {
            scale: 1,
            xPercent: 0,
            duration: 0.42,
            ease: "power3.inOut",
          },
          0.34
        )
        .to(
          heroWord,
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.4,
            ease: "power4.out",
          },
          0.4
        )
        .to(
          heroSub,
          {
            autoAlpha: 1,
            duration: 0.26,
            ease: "power3.out",
          },
          0.48
        )
        .to(
          heroProgress,
          {
            scaleX: 0.78,
            duration: 0.32,
            ease: "power2.out",
          },
          0.46
        );

      /*
       * Phase 3: information flows through to amber/output side.
       */
      networkPulses.forEach((pulse, index) => {
        heroTl.to(
          pulse,
          {
            x: 12 + (index % 6) * 8,
            y: (index % 4 - 1.5) * 5,
            opacity: 1,
            scale: 1.2,
            duration: 0.32,
            ease: "power2.inOut",
          },
          0.58 + index * 0.006
        );
      });

      heroTl
        .to(
          heroStreams,
          {
            xPercent: 55,
            opacity: 0.14,
            stagger: 0.004,
            duration: 0.42,
            ease: "power3.inOut",
          },
          0.7
        )
        .to(
          neuralField,
          {
            scale: 1.16,
            xPercent: 4,
            opacity: 0.32,
            filter: "blur(2px)",
            duration: 0.42,
            ease: "power3.inOut",
          },
          0.78
        )
        .to(
          heroWord,
          {
            scale: 1.08,
            opacity: 0.16,
            filter: "blur(2px)",
            duration: 0.38,
            ease: "power2.inOut",
          },
          0.82
        )
        .to(
          heroProgress,
          {
            scaleX: 1,
            duration: 0.3,
            ease: "power2.out",
          },
          0.78
        );

      /*
       * Pointer interaction: warp the neural field like a living network.
       */
      if (!window.matchMedia("(pointer: coarse)").matches) {
        pointerMoveHandler = (event) => {
          const rect = hero.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;

          if (neuralField) {
            gsap.to(neuralField, {
              x: nx * 24,
              y: ny * 18,
              rotateY: nx * 4,
              rotateX: ny * -3,
              transformPerspective: 1500,
              duration: 0.55,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          if (neuralCore) {
            gsap.to(neuralCore, {
              x: nx * -18,
              y: ny * -12,
              rotate: nx * 2,
              duration: 0.42,
              ease: "power3.out",
              overwrite: "auto",
            });
          }

          heroNodes.forEach((node, index) => {
            const depth = 6 + (index % 7) * 2.2;
            gsap.to(node, {
              x: nx * depth,
              y: ny * depth * 0.72,
              scale: 0.86 + Math.abs(nx) * 0.7 + (index % 4) * 0.08,
              duration: 0.32,
              ease: "power3.out",
              overwrite: "auto",
            });
          });

          networkPaths.forEach((path, index) => {
            gsap.to(path, {
              x: nx * (index % 2 === 0 ? 9 : -9),
              y: ny * (index % 3 === 0 ? 7 : -7),
              opacity: 0.18 + Math.abs(nx) * 0.24,
              duration: 0.42,
              ease: "power3.out",
              overwrite: "auto",
            });
          });
        };

        pointerLeaveHandler = () => {
          gsap.to([neuralField, neuralCore], {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            rotate: 0,
            duration: 0.7,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(heroNodes, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(networkPaths, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        hero.addEventListener("pointermove", pointerMoveHandler, {
          passive: true,
        });
        hero.addEventListener("pointerleave", pointerLeaveHandler);
      }

      /*
       * ============================================================
       * PROCESS — NEURAL DECISION CHAMBER
       * Four incoming signals collapse into one decision.
       * ============================================================
       */
      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        ({ conditions }) => {
          const { desktop, tablet, mobile } = conditions;

          const decisionCore = process.querySelector("[data-ai-decision-core]");
          const decisionWord = process.querySelector("[data-ai-decision-word]");
          const decisionSub = process.querySelector("[data-ai-decision-sub]");
          const decisionProgress = process.querySelector("[data-ai-decision-progress]");
          const decisionSignals = gsap.utils.toArray(
            process.querySelectorAll("[data-ai-decision-signal]")
          );
          const decisionPaths = gsap.utils.toArray(
            process.querySelectorAll("[data-ai-decision-path]")
          );
          const decisionDots = gsap.utils.toArray(
            process.querySelectorAll("[data-ai-decision-dot]")
          );
          const decisionStats = gsap.utils.toArray(
            process.querySelectorAll("[data-ai-decision-stat]")
          );

          gsap.set(decisionCore, {
            scale: 0.62,
            rotate: -8,
            opacity: 0.42,
          });

          gsap.set(decisionWord, {
            autoAlpha: 0,
            scale: 0.74,
            filter: "blur(14px)",
          });

          gsap.set(decisionSub, {
            autoAlpha: 0,
            y: 18,
          });

          gsap.set(decisionProgress, {
            scaleX: 0.04,
            transformOrigin: "left center",
          });

          decisionSignals.forEach((signal, index) => {
            const side = index % 2 === 0 ? -1 : 1;
            gsap.set(signal, {
              xPercent: side * (18 + index * 6),
              yPercent: (index - 1.5) * 10,
              opacity: 0.36,
            });
          });

          gsap.set(decisionPaths, {
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
            opacity: 0.12,
          });

          gsap.set(decisionDots, {
            scale: 0.5,
            opacity: 0.22,
            transformOrigin: "center center",
          });

          gsap.set(decisionStats, {
            y: 18,
            opacity: 0,
          });

          const decisionTl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: process,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (desktop ? 2.45 : tablet ? 2.2 : 1.9)}`,
              pin: true,
              scrub: desktop ? 0.8 : 0.62,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (decisionProgress) {
                  gsap.set(decisionProgress, { scaleX: self.progress });
                }
              },
            },
          });

          decisionSignals.forEach((signal, index) => {
            decisionTl.to(
              signal,
              {
                xPercent: 0,
                yPercent: 0,
                opacity: 0.92,
                duration: 0.38,
                ease: "power3.inOut",
              },
              0.04 + index * 0.035
            );
          });

          decisionPaths.forEach((path, index) => {
            decisionTl.to(
              path,
              {
                strokeDashoffset: 0,
                opacity: index % 3 === 0 ? 0.48 : 0.24,
                duration: 0.42,
                ease: "power2.out",
              },
              0.08 + (index % 6) * 0.018
            );
          });

          decisionDots.forEach((dot, index) => {
            decisionTl.to(
              dot,
              {
                scale: index % 4 === 0 ? 1.45 : 0.95,
                opacity: index % 4 === 0 ? 1 : 0.56,
                duration: 0.26,
                ease: "power2.out",
              },
              0.18 + index * 0.012
            );
          });

          decisionTl
            .to(
              decisionCore,
              {
                scale: 1,
                rotate: 0,
                opacity: 1,
                duration: 0.42,
                ease: "power4.inOut",
              },
              0.25
            )
            .to(
              decisionStats,
              {
                y: 0,
                opacity: 1,
                stagger: 0.04,
                duration: 0.28,
                ease: "power3.out",
              },
              0.34
            )
            .to(
              decisionSignals,
              {
                scaleX: 0.42,
                opacity: 0.12,
                duration: 0.38,
                ease: "power3.inOut",
              },
              0.56
            )
            .to(
              decisionPaths,
              {
                opacity: 0.08,
                strokeDashoffset: -160,
                duration: 0.34,
              },
              0.58
            )
            .to(
              decisionCore,
              {
                scale: 1.34,
                borderRadius: "50%",
                rotate: 45,
                duration: 0.42,
                ease: "power4.inOut",
              },
              0.6
            )
            .to(
              decisionWord,
              {
                autoAlpha: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.42,
                ease: "power4.out",
              },
              0.68
            )
            .to(
              decisionSub,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.24,
                ease: "power3.out",
              },
              0.74
            )
            .to(
              decisionCore,
              {
                scale: 2.1,
                opacity: 0.08,
                duration: 0.34,
                ease: "power3.inOut",
              },
              0.84
            )
            .to(
              decisionDots,
              {
                x: (index) => (index % 2 === 0 ? -1 : 1) * (20 + (index % 5) * 9),
                y: (index) => (index % 3 - 1) * 18,
                opacity: 0.08,
                duration: 0.34,
              },
              0.84
            );

          /*
           * DEMO — AI console boots in layers, not 3D
           */
          const demoFrame = demo.querySelector("[data-ai-demo-frame]");
          const demoPanels = gsap.utils.toArray(
            demo.querySelectorAll("[data-ai-demo-panel]")
          );
          const demoRows = gsap.utils.toArray(
            demo.querySelectorAll("[data-ai-demo-row]")
          );

          if (demoFrame) {
            const demoTl = gsap.timeline({
              scrollTrigger: {
                trigger: demo,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            });

            demoTl.fromTo(
              demoFrame,
              {
                clipPath: "inset(10% 14% 10% 14%)",
                scaleX: 0.9,
                opacity: 0,
                filter: "brightness(.65) contrast(1.2)",
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scaleX: 1,
                opacity: 1,
                filter: "brightness(1) contrast(1)",
                duration: 1,
                ease: "power4.inOut",
              }
            );

            demoTl.fromTo(
              demoPanels,
              {
                y: 32,
                opacity: 0,
                filter: "blur(8px)",
              },
              {
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                stagger: 0.08,
                duration: 0.55,
                ease: "power3.out",
              },
              0.28
            );

            demoTl.fromTo(
              demoRows,
              { x: -18, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                stagger: 0.045,
                duration: 0.34,
                ease: "power2.out",
              },
              0.38
            );
          }

          /*
           * USE CASES
           */
          const caseCards = gsap.utils.toArray(
            cases.querySelectorAll("[data-ai-case]")
          );

          caseCards.forEach((card, index) => {
            const direction = index % 2 === 0 ? -1 : 1;

            gsap.fromTo(
              card,
              {
                x: direction * (desktop ? 70 : 35),
                y: desktop ? 38 : 24,
                opacity: 0,
                clipPath:
                  direction < 0
                    ? "inset(0 100% 0 0)"
                    : "inset(0 0 0 100%)",
              },
              {
                x: 0,
                y: 0,
                opacity: 1,
                clipPath: "inset(0 0% 0 0)",
                duration: 0.9,
                ease: "power4.inOut",
                scrollTrigger: {
                  trigger: card,
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          /*
           * TECH STACK
           */
          const stackRows = gsap.utils.toArray(
            tech.querySelectorAll("[data-ai-stack-row]")
          );

          stackRows.forEach((row, index) => {
            gsap.fromTo(
              row,
              {
                xPercent: index % 2 === 0 ? -8 : 8,
                opacity: 0,
              },
              {
                xPercent: 0,
                opacity: 1,
                duration: 0.7,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 86%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          return () => {};
        }
      );

      /*
       * FINAL
       */
      const finalLetters = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-ai-final-letter]")
      );
      const finalMeta = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-ai-final-meta]")
      );

      gsap.fromTo(
        finalLetters,
        {
          yPercent: 125,
          rotateX: -78,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.022,
          ease: "power4.out",
          scrollTrigger: {
            trigger: finalSection,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        finalMeta,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: finalSection,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, page);

    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    };

    const timer = window.setTimeout(refresh, 220);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);

      if (pointerMoveHandler) {
        hero.removeEventListener("pointermove", pointerMoveHandler);
      }

      if (pointerLeaveHandler) {
        hero.removeEventListener("pointerleave", pointerLeaveHandler);
      }

      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <SeoMetaTags />

      <main
        ref={pageRef}
        className="ai-page relative overflow-x-hidden bg-[#020203] text-white"
      >
        <style>{`
          .ai-page,
          .ai-page * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .ai-page {
            --ai-cyan:#35d8ff;
            --ai-violet:#8b5cf6;
            --ai-green:#20f0c7;
            --ai-pink:#ff4fd8;
          }

          .ai-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
            background-size:58px 58px;
            mask-image:linear-gradient(to bottom,transparent,black 8%,black 92%,transparent);
          }

          .ai-noise::after {
            content:"";
            position:absolute;
            inset:0;
            pointer-events:none;
            opacity:.045;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.94' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode:soft-light;
          }


          /* =========================================================
             HERO / DEEP LEARNING NEURAL FLOW
             ========================================================= */

          .ai-neural-field {
            position:absolute;
            inset:7% 2% 6%;
            z-index:10;
            pointer-events:none;
            perspective:1500px;
            transform-style:preserve-3d;
            will-change:transform,opacity,filter;
          }

          .ai-neural-haze {
            position:absolute;
            inset:0;
            pointer-events:none;
            background:
              radial-gradient(circle at 28% 50%, rgba(0,139,255,.17), transparent 34%),
              radial-gradient(circle at 72% 52%, rgba(255,151,40,.11), transparent 28%),
              radial-gradient(circle at 50% 50%, rgba(53,216,255,.06), transparent 20%);
            filter:blur(34px);
            mix-blend-mode:screen;
          }

          .ai-data-streams {
            position:absolute;
            left:-8%;
            top:5%;
            width:64%;
            height:90%;
            overflow:hidden;
            opacity:.86;
            -webkit-mask-image:linear-gradient(90deg,transparent 0%,black 12%,black 76%,transparent 100%);
            mask-image:linear-gradient(90deg,transparent 0%,black 12%,black 76%,transparent 100%);
          }

          .ai-data-stream {
            position:absolute;
            left:-6%;
            width:118%;
            height:1px;
            transform-origin:left center;
            background:
              repeating-linear-gradient(
                90deg,
                transparent 0 4px,
                rgba(53,216,255,.8) 5px 7px,
                transparent 8px 13px
              );
            box-shadow:
              0 0 8px rgba(53,216,255,.14),
              0 0 18px rgba(53,216,255,.05);
            filter:blur(.1px);
            will-change:transform,opacity;
          }

          .ai-data-stream:nth-child(3n+1){
            background:
              repeating-linear-gradient(
                90deg,
                transparent 0 5px,
                rgba(30,141,255,.65) 6px 8px,
                transparent 9px 16px
              );
          }

          .ai-neural-network {
            position:absolute;
            inset:5% 5% 5% 24%;
            z-index:14;
            pointer-events:none;
            overflow:visible;
          }

          .ai-neural-network svg {
            width:100%;
            height:100%;
            overflow:visible;
          }

          .ai-network-path {
            fill:none;
            stroke-width:1;
            vector-effect:non-scaling-stroke;
            will-change:transform,opacity,stroke-dashoffset;
          }

          .ai-network-path--c {
            stroke:rgba(53,216,255,.48);
            filter:
              drop-shadow(0 0 7px rgba(53,216,255,.18))
              drop-shadow(0 0 18px rgba(53,216,255,.06));
          }

          .ai-network-path--b {
            stroke:rgba(22,106,255,.34);
            filter:drop-shadow(0 0 9px rgba(22,106,255,.12));
          }

          .ai-network-path--a {
            stroke:rgba(255,159,45,.48);
            filter:
              drop-shadow(0 0 9px rgba(255,159,45,.22))
              drop-shadow(0 0 20px rgba(255,159,45,.07));
          }

          .ai-network-pulse {
            will-change:transform,opacity;
            filter:drop-shadow(0 0 7px currentColor);
          }

          .ai-neural-core {
            position:absolute;
            left:50%;
            top:50%;
            width:min(58vw,940px);
            height:min(78vh,760px);
            transform:translate(-46%,-50%);
            z-index:18;
            pointer-events:none;
            will-change:transform,opacity;
          }

          .ai-core-node {
            position:absolute;
            width:14px;
            height:14px;
            margin:-7px 0 0 -7px;
            border-radius:999px;
            border:1px solid rgba(255,255,255,.56);
            background:#03101a;
            box-shadow:
              0 0 0 4px rgba(53,216,255,.06),
              0 0 16px rgba(53,216,255,.45),
              0 0 36px rgba(53,216,255,.12);
          }

          .ai-core-node::after {
            content:"";
            position:absolute;
            left:50%;
            top:50%;
            width:4px;
            height:4px;
            border-radius:999px;
            transform:translate(-50%,-50%);
            background:#dff8ff;
            box-shadow:0 0 10px #35d8ff;
          }

          .ai-core-node--amber {
            border-color:rgba(255,188,83,.72);
            background:#170b02;
            box-shadow:
              0 0 0 5px rgba(255,159,45,.05),
              0 0 18px rgba(255,159,45,.58),
              0 0 44px rgba(255,159,45,.17);
          }

          .ai-core-node--amber::after {
            background:#fff2d6;
            box-shadow:0 0 12px #ff9f2d;
          }

          .ai-microdot {
            position:absolute;
            width:2px;
            height:2px;
            border-radius:999px;
            background:rgba(53,216,255,.72);
            box-shadow:0 0 7px rgba(53,216,255,.28);
          }

          .ai-microdot--amber {
            background:rgba(255,159,45,.76);
            box-shadow:0 0 8px rgba(255,159,45,.32);
          }

          .ai-hero-word {
            position:absolute;
            left:4.5vw;
            bottom:12vh;
            z-index:40;
            width:min(76vw,1180px);
            pointer-events:none;
            text-align:left;
          }

          .ai-hero-word h1 {
            font-size:clamp(3.8rem,9.8vw,10.4rem);
            line-height:.68;
            letter-spacing:-.075em;
            text-transform:uppercase;
            text-shadow:
              0 0 20px rgba(53,216,255,.05),
              0 0 60px rgba(0,0,0,.9);
          }

          .ai-hero-word p {
            margin-top:1.3rem;
            font-size:8px;
            letter-spacing:.42em;
            text-transform:uppercase;
            color:rgba(255,255,255,.38);
          }

          .ai-latent-frame {
            position:absolute;
            inset:5vh 3vw;
            pointer-events:none;
            z-index:34;
            border:1px solid rgba(255,255,255,.045);
          }

          .ai-latent-frame::before,
          .ai-latent-frame::after {
            content:"";
            position:absolute;
            height:1px;
            width:28%;
          }

          .ai-latent-frame::before {
            left:-1px;
            top:-1px;
            background:linear-gradient(90deg,#35d8ff,transparent);
          }

          .ai-latent-frame::after {
            right:-1px;
            bottom:-1px;
            background:linear-gradient(270deg,#ff9f2d,transparent);
          }

          .ai-progress {
            height:1px;
            background:
              linear-gradient(
                90deg,
                #35d8ff 0%,
                #35d8ff 50%,
                #ff9f2d 82%,
                #ffbd63 100%
              );
          }

          @media (max-width:767px) {
            .ai-neural-field {
              inset:8% 0 9%;
            }

            .ai-data-streams {
              width:78%;
              opacity:.62;
            }

            .ai-neural-network {
              inset:10% -4% 10% 8%;
            }

            .ai-neural-core {
              width:94vw;
              height:68vh;
              transform:translate(-50%,-50%);
            }

            .ai-hero-word {
              left:6vw;
              bottom:14vh;
              width:88vw;
            }

            .ai-hero-word h1 {
              font-size:15.5vw;
            }

            .ai-core-node {
              width:10px;
              height:10px;
              margin:-5px 0 0 -5px;
            }
          }

          /* =========================================================
             SECTION 02 / NEURAL DECISION CHAMBER
             ========================================================= */

          .ai-decision-stage {
            position:absolute;
            inset:8% 5% 9%;
            pointer-events:none;
          }

          .ai-decision-core {
            position:absolute;
            left:50%;
            top:49%;
            width:min(34vw,520px);
            aspect-ratio:1;
            transform:translate(-50%,-50%);
            border:1px solid rgba(255,255,255,.16);
            background:
              radial-gradient(circle at 35% 32%,rgba(53,216,255,.12),transparent 26%),
              radial-gradient(circle at 70% 68%,rgba(139,92,246,.11),transparent 30%),
              rgba(255,255,255,.012);
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,.02),
              0 0 80px rgba(53,216,255,.04);
            will-change:transform,opacity,border-radius;
          }

          .ai-decision-core::before,
          .ai-decision-core::after {
            content:"";
            position:absolute;
            background:rgba(255,255,255,.09);
          }

          .ai-decision-core::before {
            left:50%;
            top:-20%;
            bottom:-20%;
            width:1px;
          }

          .ai-decision-core::after {
            top:50%;
            left:-20%;
            right:-20%;
            height:1px;
          }

          .ai-decision-signal {
            position:absolute;
            width:min(27vw,390px);
            min-height:110px;
            border:1px solid rgba(255,255,255,.10);
            background:
              linear-gradient(135deg,rgba(255,255,255,.025),transparent 55%),
              rgba(2,2,3,.5);
            padding:18px;
            backdrop-filter:blur(6px);
            will-change:transform,opacity;
          }

          .ai-decision-signal::after {
            content:"";
            position:absolute;
            left:0;
            bottom:-1px;
            width:34%;
            height:1px;
            background:var(--decision-accent);
            box-shadow:0 0 14px color-mix(in srgb,var(--decision-accent) 35%,transparent);
          }

          .ai-decision-network {
            position:absolute;
            inset:4%;
          }

          .ai-decision-network svg {
            width:100%;
            height:100%;
            overflow:visible;
          }

          .ai-decision-path {
            fill:none;
            stroke-width:1;
            vector-effect:non-scaling-stroke;
            will-change:stroke-dashoffset,opacity;
          }

          .ai-decision-dot {
            transform-box:fill-box;
            transform-origin:center;
            will-change:transform,opacity;
          }

          .ai-decision-result {
            position:absolute;
            left:50%;
            top:49%;
            z-index:20;
            width:min(78vw,1180px);
            transform:translate(-50%,-50%);
            text-align:center;
            pointer-events:none;
          }

          .ai-decision-result h2 {
            font-size:clamp(4.5rem,12.2vw,13rem);
            line-height:.66;
            letter-spacing:-.09em;
            text-transform:uppercase;
          }

          .ai-decision-stat {
            border-left:1px solid rgba(255,255,255,.12);
            padding-left:12px;
          }

          @media (max-width:767px) {
            .ai-decision-stage {
              inset:9% 2% 10%;
            }

            .ai-decision-core {
              width:62vw;
            }

            .ai-decision-signal {
              width:42vw;
              min-height:90px;
              padding:12px;
            }

            .ai-decision-result {
              width:92vw;
            }

            .ai-decision-result h2 {
              font-size:16.5vw;
            }
          }

          .ai-console {
            background:#08090b;
            border:1px solid rgba(255,255,255,.12);
            box-shadow:0 36px 120px rgba(0,0,0,.5);
          }

          .ai-console * {
            font-family:"SFMono-Regular","Menlo","Monaco","Consolas",monospace !important;
          }

          .ai-case {
            transition:
              border-color .35s ease,
              transform .5s cubic-bezier(.16,1,.3,1),
              background-color .35s ease;
          }

          .ai-case:hover {
            transform:translateY(-6px);
            border-color:rgba(255,255,255,.28);
            background-color:rgba(255,255,255,.028);
          }

          .ai-case:hover .ai-case-title {
            transform:translateX(10px);
          }

          .ai-case-title {
            transition:transform .5s cubic-bezier(.16,1,.3,1);
          }

          .ai-stack-row {
            position:relative;
            overflow:hidden;
          }

          .ai-stack-row::before {
            content:"";
            position:absolute;
            left:0;
            top:0;
            bottom:0;
            width:1px;
            background:var(--stack-accent);
            opacity:.7;
          }

          @media (max-width:767px) {
            .ai-grid { background-size:42px 42px; }

            .ai-neural-mirror {
              width:82vw;
              height:82vw;
            }

            .ai-neural-network {
              inset:12% 2%;
              opacity:.82;
            }

            .ai-mirror-slice {
              font-size:13vw;
            }

            .ai-glyph {
              font-size:5px;
            }

            .ai-hero-word h1 {
              font-size:16vw;
            }

            .ai-process-core {
              width:72vw;
              height:72vw;
            }

            .ai-line {
              width:42vw;
            }
          }
        `}</style>

        {/* =====================================================
            HERO / DEEP LEARNING NEURAL FLOW
        ====================================================== */}
        <section
          ref={heroRef}
          className="ai-noise relative isolate flex h-[100svh] min-h-[680px] items-center overflow-hidden bg-[#010205]"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_26%_50%,rgba(0,111,255,.10),transparent_32%),radial-gradient(circle_at_76%_52%,rgba(255,144,36,.08),transparent_28%)]" />
          <div className="ai-latent-frame" aria-hidden="true" />

          <div className="pointer-events-none absolute inset-x-[4vw] top-[7vh] z-50 flex items-start justify-between">
            <p
              data-ai-meta
              className="avant-legato-font text-[8px] uppercase leading-[1.8] tracking-[.34em] text-white/32 md:text-[10px]"
            >
              OXO / AI LAB
              <br />
              DEEP NEURAL FLOW / 001
            </p>

            <p
              data-ai-meta
              className="avant-legato-font text-right text-[8px] uppercase leading-[1.8] tracking-[.34em] text-white/32 md:text-[10px]"
            >
              BLUE / INPUT SIGNAL
              <br />
              AMBER / OUTPUT ACTIVATION
            </p>
          </div>

          <div
            data-ai-neural-field
            className="ai-neural-field"
            aria-hidden="true"
          >
            <div className="ai-neural-haze" />

            <div className="ai-data-streams">
              {Array.from({ length: 86 }).map((_, index) => (
                <span
                  key={`stream-${index}`}
                  data-ai-stream
                  className="ai-data-stream"
                  style={{
                    top: `${3 + (index * 1.09) % 94}%`,
                    transform: `rotate(${-8 + (index % 17) * 0.86}deg) scaleX(${0.58 + (index % 8) * 0.075})`,
                  }}
                />
              ))}
            </div>

            <div className="ai-neural-network">
              <svg viewBox="0 0 1000 700" preserveAspectRatio="none">
                <path data-ai-network-path className="ai-network-path ai-network-path--c" d="M70 140 C 190 180, 210 220, 310 240 S 470 220, 560 280 S 760 330, 900 250" />
                <path data-ai-network-path className="ai-network-path ai-network-path--c" d="M40 210 C 180 200, 260 270, 348 312 S 540 340, 660 300 S 810 220, 930 300" />
                <path data-ai-network-path className="ai-network-path ai-network-path--b" d="M90 360 C 210 320, 290 360, 390 402 S 560 470, 650 430 S 785 340, 940 390" />
                <path data-ai-network-path className="ai-network-path ai-network-path--c" d="M70 500 C 220 450, 330 480, 430 530 S 600 570, 710 520 S 830 430, 960 500" />
                <path data-ai-network-path className="ai-network-path ai-network-path--b" d="M210 80 C 260 190, 350 220, 420 300 S 520 410, 630 450 S 760 520, 820 640" />
                <path data-ai-network-path className="ai-network-path ai-network-path--c" d="M360 65 C 390 170, 480 210, 515 310 S 540 470, 620 560 S 760 600, 900 620" />
                <path data-ai-network-path className="ai-network-path ai-network-path--a" d="M510 80 C 560 190, 610 210, 660 300 S 720 440, 800 470 S 885 480, 955 430" />
                <path data-ai-network-path className="ai-network-path ai-network-path--a" d="M610 120 C 690 180, 730 240, 760 330 S 790 430, 860 510 S 930 560, 975 610" />
                <path data-ai-network-path className="ai-network-path ai-network-path--c" d="M180 590 C 290 520, 400 510, 500 500 S 670 490, 760 540 S 860 620, 940 640" />
                <path data-ai-network-path className="ai-network-path ai-network-path--b" d="M150 120 C 260 110, 335 150, 420 190 S 580 220, 720 180 S 860 120, 950 150" />
                <path data-ai-network-path className="ai-network-path ai-network-path--a" d="M430 610 C 520 560, 590 520, 650 460 S 720 330, 790 280 S 870 220, 950 210" />
                <path data-ai-network-path className="ai-network-path ai-network-path--c" d="M260 650 C 350 560, 430 470, 480 380 S 520 190, 610 120" />

                {[
                  ["112","142","#35d8ff"],["204","196","#35d8ff"],
                  ["290","246","#35d8ff"],["368","312","#35d8ff"],
                  ["438","224","#35d8ff"],["496","380","#35d8ff"],
                  ["548","292","#35d8ff"],["604","448","#35d8ff"],
                  ["654","332","#ff9f2d"],["708","454","#ff9f2d"],
                  ["764","286","#ff9f2d"],["814","388","#ff9f2d"],
                  ["872","246","#ff9f2d"],["914","482","#ff9f2d"],
                ].map(([cx,cy,fill], index) => (
                  <circle
                    key={`pulse-${index}`}
                    data-ai-network-pulse
                    className="ai-network-pulse"
                    cx={cx}
                    cy={cy}
                    r={index % 4 === 0 ? "5.5" : "3.4"}
                    fill={fill}
                    style={{ color: fill }}
                  />
                ))}
              </svg>
            </div>

            <div
              data-ai-neural-core
              className="ai-neural-core"
            >
              {[
                ["18%","30%",false],["24%","50%",false],["30%","68%",false],
                ["38%","38%",false],["42%","58%",false],["49%","27%",false],
                ["52%","48%",false],["56%","72%",false],["62%","34%",true],
                ["66%","57%",true],["72%","25%",true],["74%","46%",true],
                ["78%","68%",true],["84%","37%",true],["88%","55%",true],
              ].map(([left,top,amber], index) => (
                <span
                  key={`core-${index}`}
                  data-ai-node
                  className={`ai-core-node ${amber ? "ai-core-node--amber" : ""}`}
                  style={{ left, top }}
                />
              ))}

              {Array.from({ length: 120 }).map((_, index) => {
                const amber = index % 6 === 0 || index % 11 === 0;
                const left = 7 + ((index * 37) % 88);
                const top = 6 + ((index * 53) % 88);
                return (
                  <span
                    key={`micro-${index}`}
                    className={`ai-microdot ${amber ? "ai-microdot--amber" : ""}`}
                    style={{
                      left: `${left}%`,
                      top: `${top}%`,
                      opacity: 0.18 + (index % 7) * 0.1,
                    }}
                  />
                );
              })}
            </div>
          </div>

          <div data-ai-hero-word className="ai-hero-word">
            <h1 className="avant-legato-font ombra2">
              ARTIFICIAL
              <br />
              INTELLIGENCE
            </h1>
            <p data-ai-hero-sub className="avant-legato-font">
              DEEP LEARNING / DATA FLOW / CONTROLLED INTELLIGENCE
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-[4vw] bottom-[5.5vh] z-50">
            <div className="mb-4 flex items-center justify-between text-[7px] uppercase tracking-[.32em] text-white/26 md:text-[9px]">
              <span>INPUT SIGNAL / BLUE</span>
              <span>SCROLL / ACTIVATE NETWORK ↓</span>
              <span>OUTPUT / AMBER</span>
            </div>
            <div className="h-px bg-white/10">
              <div data-ai-progress className="ai-progress h-full w-full origin-left" />
            </div>
          </div>
        </section>

        {/* =====================================================
            02 / NEURAL DECISION CHAMBER
        ====================================================== */}
        <section
          ref={processRef}
          className="ai-noise relative isolate z-[2] h-[100svh] min-h-[680px] overflow-hidden bg-[#050506]"
        >
          <div className="ai-grid pointer-events-none absolute inset-0 opacity-46" />

          <div className="pointer-events-none absolute inset-x-[4vw] top-[6vh] z-30 flex items-start justify-between border-b border-white/12 pb-5">
            <div>
              <p className="avant-legato-font text-[9px] uppercase tracking-[.36em] text-violet-400 md:text-xs">
                02 / NEURAL DECISION
              </p>
              <p className="avant-legato-font mt-2 text-[7px] uppercase tracking-[.28em] text-white/24 md:text-[9px]">
                MULTIPLE SIGNALS / ONE DIRECTION
              </p>
            </div>

            <p className="avant-legato-font text-right text-[8px] uppercase leading-[1.8] tracking-[.30em] text-white/28 md:text-[10px]">
              LIVE INFERENCE
              <br />
              CONFIDENCE / 94.8%
            </p>
          </div>

          <div className="ai-decision-stage">
            <div className="ai-decision-network" aria-hidden="true">
              <svg viewBox="0 0 1000 700" preserveAspectRatio="none">
                <path data-ai-decision-path className="ai-decision-path" stroke="rgba(53,216,255,.48)" d="M35 132 C 220 128, 300 210, 500 350" />
                <path data-ai-decision-path className="ai-decision-path" stroke="rgba(139,92,246,.46)" d="M55 565 C 220 540, 320 460, 500 350" />
                <path data-ai-decision-path className="ai-decision-path" stroke="rgba(32,240,199,.42)" d="M955 130 C 782 148, 694 226, 500 350" />
                <path data-ai-decision-path className="ai-decision-path" stroke="rgba(255,79,216,.42)" d="M945 565 C 790 540, 680 456, 500 350" />

                <path data-ai-decision-path className="ai-decision-path" stroke="rgba(255,255,255,.12)" d="M110 210 C 310 180, 352 284, 500 350 S 704 476, 900 430" />
                <path data-ai-decision-path className="ai-decision-path" stroke="rgba(255,255,255,.10)" d="M100 470 C 270 500, 360 410, 500 350 S 710 218, 915 248" />

                {[
                  ["145","155","#35d8ff"],["245","205","#35d8ff"],
                  ["340","260","#8b5cf6"],["418","310","#8b5cf6"],
                  ["500","350","#ffffff"],["584","305","#20f0c7"],
                  ["664","252","#20f0c7"],["756","190","#ff4fd8"],
                  ["845","155","#ff4fd8"],["272","505","#8b5cf6"],
                  ["680","500","#20f0c7"],["820","535","#ff4fd8"],
                ].map(([cx, cy, fill], index) => (
                  <circle
                    key={`decision-dot-${index}`}
                    data-ai-decision-dot
                    className="ai-decision-dot"
                    cx={cx}
                    cy={cy}
                    r={index === 4 ? "6" : "3.2"}
                    fill={fill}
                  />
                ))}
              </svg>
            </div>

            {[
              {
                id: "01",
                label: "USER INTENT",
                value: "SEMANTIC QUERY",
                left: "2%",
                top: "16%",
                accent: "#35d8ff",
              },
              {
                id: "02",
                label: "PRIVATE CONTEXT",
                value: "VERIFIED DATA",
                left: "5%",
                bottom: "15%",
                accent: "#8b5cf6",
              },
              {
                id: "03",
                label: "MODEL SIGNAL",
                value: "PATTERN MATCH",
                right: "3%",
                top: "17%",
                accent: "#20f0c7",
              },
              {
                id: "04",
                label: "POLICY LAYER",
                value: "SAFE / ALLOWED",
                right: "5%",
                bottom: "14%",
                accent: "#ff4fd8",
              },
            ].map((signal) => (
              <article
                key={signal.id}
                data-ai-decision-signal
                className="ai-decision-signal"
                style={{
                  left: signal.left,
                  right: signal.right,
                  top: signal.top,
                  bottom: signal.bottom,
                  "--decision-accent": signal.accent,
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-[7px] tracking-[.28em] text-white/24">
                    {signal.id}
                  </span>
                  <span
                    className="h-2 w-2 border"
                    style={{ borderColor: signal.accent }}
                  />
                </div>

                <p
                  className="avant-legato-font mt-5 text-[8px] uppercase tracking-[.28em]"
                  style={{ color: signal.accent }}
                >
                  {signal.label}
                </p>

                <p className="avant-legato-font mt-2 text-lg uppercase tracking-[.06em] text-white/78 md:text-xl">
                  {signal.value}
                </p>
              </article>
            ))}

            <div
              data-ai-decision-core
              className="ai-decision-core"
              aria-hidden="true"
            />
          </div>

          <div
            data-ai-decision-word
            className="ai-decision-result"
          >
            <p className="avant-legato-font mb-4 text-[8px] uppercase tracking-[.38em] text-cyan-300/70 md:text-[10px]">
              SIGNALS COLLAPSED / DECISION READY
            </p>

            <h2 className="avant-legato-font ombra2">
              DECIDE.
            </h2>

            <p
              data-ai-decision-sub
              className="avant-legato-font mx-auto mt-6 max-w-[760px] text-lg leading-snug text-gray-300 md:text-2xl"
            >
              Il valore non è generare più output. È trasformare segnali diversi
              in una decisione utile, leggibile e controllabile.
            </p>
          </div>

          <div className="pointer-events-none absolute inset-x-[4vw] bottom-[6vh] z-30">
            <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
              {[
                ["CONTEXT", "100%"],
                ["RELEVANCE", "96%"],
                ["POLICY", "PASS"],
                ["CONFIDENCE", "94.8%"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  data-ai-decision-stat
                  className="ai-decision-stat"
                >
                  <p className="text-[7px] uppercase tracking-[.25em] text-white/24">
                    {label}
                  </p>
                  <p className="avant-legato-font mt-1 text-sm text-white/62">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between text-[7px] uppercase tracking-[.3em] text-white/24 md:text-[9px]">
              <span>MULTI-SIGNAL INFERENCE</span>
              <span>SCROLL / COLLAPSE ↓</span>
            </div>

            <div className="mt-3 h-px bg-white/10">
              <div
                data-ai-decision-progress
                className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
                style={{ transform: "scaleX(0)" }}
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            AI DEMO
        ====================================================== */}
        <section
          ref={demoRef}
          className="relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="ai-grid pointer-events-none absolute inset-0 opacity-45" />

          <div className="relative z-10 mb-14 flex flex-col gap-7 border-b border-white/14 pb-8 md:mb-20 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-violet-400 md:text-xs">
                02 / AI INTERFACE
              </p>
              <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
                INTELLIGENZA
                <br />
                OPERATIVA.
              </h2>
            </div>

            <p className="avant-legato-font max-w-[650px] text-xl leading-snug text-gray-300 md:text-3xl">
              L’AI diventa utile quando entra in un flusso reale, con fonti,
              strumenti, controllo e risultati leggibili.
            </p>
          </div>

          <div
            data-ai-demo-frame
            className="ai-console relative z-10 overflow-hidden"
          >
            <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 text-[8px] text-white/45 md:px-6 md:text-[10px]">
              <span>OXO AI / KNOWLEDGE ASSISTANT</span>
              <span>MODEL / CONTROLLED CONTEXT</span>
            </div>

            <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[240px_minmax(0,1fr)_310px]">
              <aside
                data-ai-demo-panel
                className="hidden border-r border-white/10 bg-white/[0.015] p-5 lg:block"
              >
                <p className="mb-5 text-[8px] uppercase tracking-[.28em] text-white/30">
                  Sources
                </p>

                {[
                  ["01", "Manuale operativo.pdf", "READY"],
                  ["02", "Database clienti", "SYNC"],
                  ["03", "Procedure interne", "READY"],
                  ["04", "Knowledge base", "INDEXED"],
                ].map(([id, label, state]) => (
                  <div
                    key={id}
                    data-ai-demo-row
                    className="border-b border-white/[0.07] py-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-[7px] text-white/24">{id}</span>
                      <span className="text-[7px] text-emerald-300/70">{state}</span>
                    </div>
                    <p className="mt-2 text-[9px] text-white/68">{label}</p>
                  </div>
                ))}
              </aside>

              <main data-ai-demo-panel className="min-w-0 p-5 md:p-7 lg:p-8">
                <div className="mb-6 border border-white/10 bg-white/[0.018] p-4">
                  <p className="text-[8px] uppercase tracking-[.26em] text-cyan-300/70">
                    USER / QUERY
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-white/78 md:text-base">
                    Quali clienti hanno richiesto una personalizzazione del
                    workflow e quali attività risultano ancora aperte?
                  </p>
                </div>

                <div className="border border-white/10 bg-[#0b0c0e] p-4 md:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <p className="text-[8px] uppercase tracking-[.26em] text-violet-300/80">
                      AI / GROUNDED RESPONSE
                    </p>
                    <span className="border border-emerald-300/25 bg-emerald-300/[0.04] px-2 py-1 text-[7px] uppercase tracking-[.2em] text-emerald-300/75">
                      SOURCES VERIFIED
                    </span>
                  </div>

                  <p className="text-sm leading-[1.7] text-white/78 md:text-base">
                    Ho trovato 3 clienti con richieste di personalizzazione.
                    Due hanno attività ancora aperte: configurazione permessi,
                    revisione dashboard e integrazione API. Le informazioni
                    derivano da 4 fonti interne indicizzate.
                  </p>

                  <div className="mt-7 grid gap-3 md:grid-cols-3">
                    {[
                      ["CLIENTI", "03", "#35d8ff"],
                      ["TASK APERTI", "05", "#8b5cf6"],
                      ["FONTI", "04", "#20f0c7"],
                    ].map(([label, value, accent]) => (
                      <div
                        key={label}
                        data-ai-demo-row
                        className="border border-white/10 p-4"
                      >
                        <p
                          className="text-[7px] uppercase tracking-[.24em]"
                          style={{ color: accent }}
                        >
                          {label}
                        </p>
                        <p className="mt-3 text-3xl font-semibold text-white">
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 border-t border-white/10 pt-5">
                    <p className="mb-3 text-[8px] uppercase tracking-[.26em] text-white/30">
                      TRACE
                    </p>

                    {[
                      "retrieval / completed",
                      "ranking / completed",
                      "policy check / passed",
                      "response / generated",
                    ].map((line, index) => (
                      <div
                        key={line}
                        data-ai-demo-row
                        className="flex items-center gap-3 py-1 text-[8px] text-white/42"
                      >
                        <span className="text-emerald-300/70">✓</span>
                        <span>{line}</span>
                        <span className="ml-auto text-white/18">
                          0.{18 + index * 9}s
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </main>

              <aside
                data-ai-demo-panel
                className="border-t border-white/10 bg-white/[0.012] p-5 lg:border-l lg:border-t-0"
              >
                <p className="mb-5 text-[8px] uppercase tracking-[.28em] text-white/30">
                  Controls
                </p>

                {[
                  ["CONTEXT", "STRICT"],
                  ["TEMPERATURE", "0.2"],
                  ["CITATIONS", "ON"],
                  ["HUMAN REVIEW", "REQUIRED"],
                  ["LOGGING", "ACTIVE"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    data-ai-demo-row
                    className="flex items-center justify-between border-b border-white/[0.07] py-4"
                  >
                    <span className="text-[8px] text-white/35">{label}</span>
                    <span className="text-[8px] text-white/72">{value}</span>
                  </div>
                ))}
              </aside>
            </div>
          </div>
        </section>

        {/* =====================================================
            USE CASES
        ====================================================== */}
        <section
          ref={casesRef}
          className="relative overflow-hidden border-y border-white/12 bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="ai-grid pointer-events-none absolute inset-0 opacity-48" />

          <div className="relative z-10 mb-16 border-b border-white/14 pb-8 md:mb-24">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-fuchsia-400 md:text-xs">
              03 / CAPABILITIES
            </p>
            <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
              DOVE CREA
              <br />
              VALORE.
            </h2>
          </div>

          <div className="relative z-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {USE_CASES.map((item) => (
              <article
                key={item.id}
                data-ai-case
                className="ai-case relative min-h-[420px] overflow-hidden border border-white/14 bg-white/[0.012] p-6 md:min-h-[470px] md:p-8"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-55"
                  style={{
                    background: `radial-gradient(circle at 80% 15%, ${item.accent}1f, transparent 34%)`,
                  }}
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] tracking-[.28em] text-white/28">
                      {item.id}
                    </span>
                    <span
                      className="h-2.5 w-2.5 border"
                      style={{
                        borderColor: item.accent,
                        boxShadow: `0 0 16px ${item.accent}33`,
                      }}
                    />
                  </div>

                  <div>
                    <h3 className="ai-case-title avant-legato-font text-[8vw] uppercase leading-[.76] tracking-[-.06em] md:text-[5.2vw] lg:text-[3.6vw]">
                      {item.title}
                    </h3>

                    <p className="avant-legato-font mt-6 text-lg leading-snug text-gray-300 md:text-xl">
                      {item.copy}
                    </p>
                  </div>

                  <span
                    className="avant-legato-font self-end text-3xl"
                    style={{ color: item.accent }}
                  >
                    ↗
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            TECH / TRUST
        ====================================================== */}
        <section
          ref={techRef}
          className="relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="ai-grid pointer-events-none absolute inset-0 opacity-44" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-[8vw]">
            <div>
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-emerald-300 md:text-xs">
                04 / ARCHITETTURA E CONTROLLO
              </p>

              <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
                INTELLIGENTE.
                <br />
                CONTROLLABILE.
              </h2>

              <p className="avant-legato-font mt-9 max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl">
                Modelli, fonti, permessi, logging e revisione umana fanno parte
                della stessa architettura. L’AI non deve essere una scatola nera.
              </p>
            </div>

            <div className="self-end border-t border-white/14">
              {STACK.map(([label, accent], index) => (
                <div
                  key={label}
                  data-ai-stack-row
                  className="ai-stack-row flex items-center justify-between border-b border-white/12 py-5 pl-5 md:py-6"
                  style={{ "--stack-accent": accent }}
                >
                  <span className="text-[9px] tracking-[.28em] text-white/28">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="avant-legato-font text-xl uppercase tracking-[.08em] md:text-3xl">
                    {label}
                  </span>

                  <span
                    className="h-2.5 w-2.5 border"
                    style={{ borderColor: accent }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL
        ====================================================== */}
        <section
          ref={finalRef}
          className="ai-noise relative flex min-h-[100svh] items-end overflow-hidden border-t border-white/12 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="ai-grid pointer-events-none absolute inset-0 opacity-48" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-[18%] h-[34vw] w-[68vw] -translate-x-1/2 blur-[100px]"
            style={{
              background:
                "linear-gradient(90deg, rgba(53,216,255,.12), rgba(139,92,246,.16), rgba(32,240,199,.10), rgba(255,79,216,.10))",
            }}
          />

          <div className="relative z-10 w-full">
            <div
              data-ai-final-meta
              className="mb-8 flex items-center justify-between border-b border-white/18 pb-5 text-[9px] uppercase tracking-[.31em] text-white/34 md:text-[11px]"
            >
              <span>OXO AI / CONTROLLED INTELLIGENCE</span>
              <span>HUMAN IN THE LOOP</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[15vw] uppercase leading-[.69] tracking-[-.085em] md:text-[11.8vw] lg:text-[9.2vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="CAPISCI."
                  attribute="data-ai-final-letter"
                />
              </span>
              <span className="block overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="AUTOMATIZZA."
                  attribute="data-ai-final-letter"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/18 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                data-ai-final-meta
                className="avant-legato-font max-w-[860px] text-xl leading-snug text-gray-300 md:text-3xl"
              >
                L’AI migliore non è quella che sembra più intelligente. È quella
                che rende più chiaro un processo, riduce attrito e lascia il
                controllo alle persone.
              </p>

              <Link
                to="/Contatti"
                data-ai-final-meta
                className="avant-legato-font group inline-flex w-fit items-center gap-5 border border-white/30 bg-white/[0.035] px-5 py-4 text-sm uppercase tracking-[.28em] text-white md:px-6 md:text-base"
              >
                <span>Parliamo di AI</span>
                <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
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