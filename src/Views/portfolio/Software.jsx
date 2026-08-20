import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

gsap.registerPlugin(ScrollTrigger);

const USERS = [
  { id: "01", label: "AZIENDE", accent: "#35d8ff" },
  { id: "02", label: "STARTUP", accent: "#8b5cf6" },
  { id: "03", label: "ENTI E ORGANIZZAZIONI", accent: "#20f0c7" },
  { id: "04", label: "TEAM OPERATIVI", accent: "#ff4fd8" },
  { id: "05", label: "PROCESSI COMPLESSI", accent: "#35d8ff" },
];

const FEATURES = [
  {
    id: "01",
    title: "WEB APP",
    copy: "Applicazioni costruite intorno ai processi reali dell’azienda, non intorno a un template.",
    meta: "PRODUCT / UX / WORKFLOW",
    accent: "#35d8ff",
  },
  {
    id: "02",
    title: "DASHBOARD",
    copy: "Interfacce operative per leggere dati, gestire attività e prendere decisioni più velocemente.",
    meta: "DATA / CONTROL / OPERATIONS",
    accent: "#8b5cf6",
  },
  {
    id: "03",
    title: "AUTOMAZIONE",
    copy: "Flussi, notifiche e operazioni ripetitive diventano processi automatici, verificabili e misurabili.",
    meta: "WORKFLOW / API / AUTOMATION",
    accent: "#20f0c7",
  },
  {
    id: "04",
    title: "INTEGRAZIONI",
    copy: "Colleghiamo software, database e servizi esterni senza creare nuovi silos.",
    meta: "API / WEBHOOK / DATA",
    accent: "#ff4fd8",
  },
  {
    id: "05",
    title: "SCALABILITÀ",
    copy: "Architetture progettate per crescere insieme a utenti, dati e complessità operativa.",
    meta: "CLOUD / PERFORMANCE / SCALE",
    accent: "#35d8ff",
  },
  {
    id: "06",
    title: "SICUREZZA",
    copy: "Autenticazione, permessi, audit, backup e protezioni applicative pensate fin dall’architettura.",
    meta: "ACCESS / AUDIT / BACKUP",
    accent: "#8b5cf6",
  },
];

const STACK = [
  ["NEXT.JS", "#ffffff"],
  ["TYPESCRIPT", "#35d8ff"],
  ["POSTGRESQL", "#8b5cf6"],
  ["DOCKER", "#20f0c7"],
  ["API / CLOUD", "#ff4fd8"],
  ["BACKUP / CRYPTO", "#35d8ff"],
];

function SplitLetters({ text, attribute = "data-software-letter" }) {
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

export default function Software() {
  const pageRef = useRef(null);
  const usersRef = useRef(null);
  const interfaceRef = useRef(null);
  const techRef = useRef(null);
  const finalRef = useRef(null);
  const signalRef = useRef(null);
  const auraRef = useRef(null);
  const cursorHaloRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const users = usersRef.current;
    const interfaceSection = interfaceRef.current;
    const tech = techRef.current;
    const finalSection = finalRef.current;
    const signal = signalRef.current;
    const aura = auraRef.current;
    const cursorHalo = cursorHaloRef.current;

    if (
      !page ||
      !users ||
      !interfaceSection ||
      !tech ||
      !finalSection ||
      !signal
    ) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    let pointerMove = null;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduce) {
        gsap.set(
          page.querySelectorAll(
            "[data-kairos-copy], [data-user-row], [data-stack-row]"
          ),
          { clearProps: "all", opacity: 1 }
        );
        return;
      }

      /*
       * ============================================================
       * AWWWARDS / CINEMATIC FIELD
       * ============================================================
       */

      const cinematicBlocks = gsap.utils.toArray(
        page.querySelectorAll("[data-cinematic-block]")
      );

      cinematicBlocks.forEach((block, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          block,
          {
            y: 70,
            x: direction * 18,
            opacity: 0,
            clipPath:
              direction < 0
                ? "inset(0 100% 0 0)"
                : "inset(0 0 0 100%)",
          },
          {
            y: 0,
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.15,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: block,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const parallaxLines = gsap.utils.toArray(
        page.querySelectorAll("[data-kairos-parallax-line]")
      );

      parallaxLines.forEach((line, index) => {
        gsap.to(line, {
          xPercent: index % 2 === 0 ? 18 : -18,
          ease: "none",
          scrollTrigger: {
            trigger: line.closest("section") || page,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });

      if (aura) {
        gsap.to(aura, {
          rotate: 360,
          duration: 40,
          repeat: -1,
          ease: "none",
        });
      }

      if (
        cursorHalo &&
        !window.matchMedia("(pointer: coarse)").matches
      ) {
        const haloX = gsap.quickTo(cursorHalo, "x", {
          duration: 1.15,
          ease: "power4.out",
        });
        const haloY = gsap.quickTo(cursorHalo, "y", {
          duration: 1.15,
          ease: "power4.out",
        });

        const moveHalo = (event) => {
          haloX(event.clientX);
          haloY(event.clientY);
        };

        window.addEventListener("pointermove", moveHalo, {
          passive: true,
        });

        const oldPointerCleanup = pointerMove;

        pointerMove = (event) => {
          oldPointerCleanup?.(event);
          moveHalo(event);
        };
      }

      /*
       * ============================================================
       * SOFTWARE / COMPILER ROOM OPENING
       * fragments -> compile -> architecture -> SOFTWARE
       * ============================================================
       */
      const buildModules = gsap.utils.toArray(
        signal.querySelectorAll("[data-software-module]")
      );
      const buildWord = signal.querySelector("[data-software-build-word]");
      const buildWordInner = signal.querySelector("[data-software-build-word-inner]");
      const compileLine = signal.querySelector("[data-software-compile-line]");
      const progressFill = signal.querySelector("[data-software-progress-fill]");
      const terminalLines = gsap.utils.toArray(
        signal.querySelectorAll("[data-software-terminal-line]")
      );
      const buildShell = signal.querySelector("[data-software-build-shell]");

      if (buildModules.length && buildWord && buildWordInner) {
        gsap.set(buildWord, { autoAlpha: 0 });
        gsap.set(buildWordInner, {
          scaleX: 1.22,
          scaleY: 0.9,
          filter: "blur(10px)",
          opacity: 0,
        });
        gsap.set(terminalLines, {
          autoAlpha: (index) => (index < 2 ? 0.72 : 0.16),
          x: (index) => (index < 2 ? 0 : -8),
        });
        gsap.set(progressFill, { scaleX: 0.08 });
        gsap.set(compileLine, {
          scaleY: 0.22,
          opacity: 0.38,
          transformOrigin: "top center",
        });

        buildModules.forEach((module, index) => {
          const col = index % 3;
          const row = Math.floor(index / 3);
          const x = col === 0 ? -42 : col === 2 ? 42 : (index % 2 ? 16 : -16);
          const y = row === 0 ? -34 : row === 2 ? 34 : (index % 2 ? 18 : -18);

          gsap.set(module, {
            xPercent: x,
            yPercent: y,
            rotate: index % 2 === 0 ? -5 : 5,
            scale: 0.9,
            opacity: index === 4 ? 0.32 : 0.18,
            filter: "blur(2px)",
          });
        });

        const buildTl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: signal,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.15}`,
            pin: true,
            scrub: 0.9,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        buildTl
          .to(
            compileLine,
            {
              scaleY: 1,
              opacity: 1,
              duration: 0.18,
              ease: "power3.out",
            },
            0
          )
          .to(
            progressFill,
            {
              scaleX: 0.28,
              duration: 0.2,
              ease: "power2.out",
            },
            0
          );

        terminalLines.forEach((line, index) => {
          buildTl.to(
            line,
            {
              autoAlpha: 1,
              x: 0,
              duration: 0.08,
              ease: "power2.out",
            },
            0.05 + index * 0.045
          );
        });

        buildModules.forEach((module, index) => {
          buildTl.to(
            module,
            {
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.34,
              ease: "power3.out",
            },
            0.14 + index * 0.035
          );
        });

        buildTl
          .to(
            progressFill,
            {
              scaleX: 0.68,
              duration: 0.28,
              ease: "power2.inOut",
            },
            0.36
          )
          .to(
            buildShell,
            {
              scaleX: 0.985,
              scaleY: 1.02,
              borderColor: "rgba(78,167,255,.16)",
              duration: 0.24,
              ease: "power2.out",
            },
            0.42
          );

        buildModules.forEach((module, index) => {
          const col = index % 3;
          const row = Math.floor(index / 3);

          buildTl.to(
            module,
            {
              xPercent: col === 0 ? -22 : col === 2 ? 22 : 0,
              yPercent: row === 0 ? -16 : row === 2 ? 16 : 0,
              scale: index === 4 ? 0.72 : 0.9,
              opacity: index === 4 ? 0.18 : 0.46,
              duration: 0.38,
              ease: "power3.inOut",
            },
            0.56
          );
        });

        buildTl
          .to(buildWord, { autoAlpha: 1, duration: 0.08 }, 0.62)
          .to(
            buildWordInner,
            {
              scaleX: 1,
              scaleY: 1,
              filter: "blur(0px)",
              opacity: 1,
              duration: 0.34,
              ease: "power4.out",
            },
            0.62
          )
          .to(
            progressFill,
            {
              scaleX: 1,
              duration: 0.32,
              ease: "power2.out",
            },
            0.64
          )
          .to(
            compileLine,
            {
              xPercent: 26,
              opacity: 0.2,
              duration: 0.3,
            },
            0.7
          );

        buildModules.forEach((module, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          buildTl.to(
            module,
            {
              xPercent: direction * (38 + (index % 3) * 8),
              yPercent: (index < 3 ? -1 : index > 5 ? 1 : 0) * 28,
              rotate: direction * (3 + (index % 4)),
              opacity: 0.08,
              filter: "blur(3px)",
              duration: 0.42,
              ease: "power3.inOut",
            },
            0.84
          );
        });

        buildTl
          .to(
            terminalLines,
            {
              autoAlpha: 0,
              x: 18,
              stagger: 0.02,
              duration: 0.18,
            },
            0.88
          )
          .to(
            buildWordInner,
            {
              scale: 1.08,
              letterSpacing: "-0.07em",
              duration: 0.4,
              ease: "power2.inOut",
            },
            0.88
          )
          .to(
            buildShell,
            {
              scaleX: 1.04,
              scaleY: 0.96,
              opacity: 0.18,
              duration: 0.4,
            },
            0.9
          );
      }

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        ({ conditions }) => {
          const { desktop, tablet, mobile } = conditions;

          /*
           * SOFTWARE / RESPONSIVE 3D PROFILE
           * Stesso effetto su tutti i device, ma più morbido.
           */
          const interfaceMotion = {
            startScale: desktop ? 0.955 : tablet ? 0.975 : 0.993,
            startRotateX: desktop ? 3.8 : tablet ? 2.4 : 0.9,
            startRotateY: desktop ? -3.2 : tablet ? -1.7 : -0.55,
            startBrightness: desktop ? 0.82 : tablet ? 0.88 : 0.94,
            startSaturation: desktop ? 0.88 : tablet ? 0.92 : 0.96,
            endScale: desktop ? 1 : tablet ? 0.995 : 1,
            scrollDistance: desktop ? 1.15 : tablet ? 0.92 : 0.62,
            scrub: desktop ? 0.55 : tablet ? 0.45 : 0.3,
          };

          /* USERS */
          const userRows = gsap.utils.toArray(
            users.querySelectorAll("[data-user-row]")
          );

          userRows.forEach((row, index) => {
            const line = row.querySelector("[data-user-line]");

            gsap.fromTo(
              row,
              {
                y: 42,
                opacity: 0,
                x: index % 2 === 0 ? -24 : 24,
              },
              {
                y: 0,
                x: 0,
                opacity: 1,
                duration: 0.78,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 84%",
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
                  duration: 0.9,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: row,
                    start: "top 82%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          });

          /* INTERFACE PINNED DEMO */
          const interfaceStage = interfaceSection.querySelector(
            "[data-interface-stage]"
          );
          const uiFrame = interfaceSection.querySelector("[data-ui-frame]");
          const uiRows = gsap.utils.toArray(
            interfaceSection.querySelectorAll("[data-ui-row]")
          );

          const uiPanels = gsap.utils.toArray(
            interfaceSection.querySelectorAll("[data-ui-panel]")
          );
          const interfaceLetters = gsap.utils.toArray(
            interfaceSection.querySelectorAll("[data-interface-letter]")
          );

          gsap.fromTo(
            interfaceLetters,
            {
              yPercent: 125,
              rotateX: -82,
              opacity: 0,
              transformOrigin: "50% 100%",
            },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.02,
              ease: "power4.out",
              scrollTrigger: {
                trigger: interfaceSection,
                start: "top 76%",
                toggleActions: "play none none reverse",
              },
            }
          );

          if (interfaceStage && uiFrame) {
            const uiTl = gsap.timeline({
              scrollTrigger: {
                trigger: interfaceStage,
                start: "top top",
                end: () =>
                  `+=${window.innerHeight * interfaceMotion.scrollDistance}`,
                pin: true,
                pinSpacing: true,
                scrub: interfaceMotion.scrub,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            uiTl.fromTo(
              uiFrame,
              {
                scaleX: desktop ? 0.86 : tablet ? 0.92 : 0.97,
                scaleY: desktop ? 0.94 : tablet ? 0.97 : 0.99,
                xPercent: desktop ? -4 : -2,
                filter: "brightness(.72) saturate(.78) contrast(1.12)",
                clipPath: "inset(8% 12% 8% 12%)",
                transformOrigin: "50% 50%",
              },
              {
                scaleX: 1,
                scaleY: 1,
                xPercent: 0,
                filter: "brightness(1) saturate(1) contrast(1)",
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1,
                ease: "power3.inOut",
              }
            );

            uiRows.forEach((row, index) => {
              uiTl.fromTo(
                row,
                { xPercent: desktop ? 2.5 : 1.2, opacity: 0.42 },
                {
                  xPercent: 0,
                  opacity: 1,
                  duration: 0.28,
                  ease: "power2.out",
                },
                0.16 + index * 0.045
              );
            });

            uiPanels.forEach((panel, index) => {
              uiTl.fromTo(
                panel,
                {
                  y: desktop ? 12 : 7,
                  opacity: 0.28,
                  filter: desktop ? "blur(3px)" : "blur(1.5px)",
                },
                {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 0.38,
                  ease: "power2.out",
                },
                0.2 + index * 0.07
              );
            });
          }

          /* TECH STACK */
          const stackRows = gsap.utils.toArray(
            tech.querySelectorAll("[data-stack-row]")
          );

          stackRows.forEach((row, index) => {
            gsap.fromTo(
              row,
              {
                yPercent: 55,
                opacity: 0,
                skewX: index % 2 === 0 ? -3 : 3,
              },
              {
                yPercent: 0,
                opacity: 1,
                skewX: 0,
                duration: 0.78,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: row,
                  start: "top 86%",
                  toggleActions: "play none none reverse",
                },
              }
            );
          });

          /* FINAL */
          const finalLetters = gsap.utils.toArray(
            finalSection.querySelectorAll("[data-final-software-letter]")
          );
          const finalCopy = gsap.utils.toArray(
            finalSection.querySelectorAll("[data-final-software-copy]")
          );

          gsap.fromTo(
            finalLetters,
            {
              yPercent: 135,
              rotateX: -84,
              opacity: 0,
            },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: 1.05,
              stagger: 0.02,
              ease: "power4.out",
              scrollTrigger: {
                trigger: finalSection,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            finalCopy,
            {
              y: 36,
              opacity: 0,
              filter: "blur(8px)",
            },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.82,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: finalSection,
                start: "top 66%",
                toggleActions: "play none none reverse",
              },
            }
          );

          return () => {};
        }
      );

    }, page);

    const refreshTimer = window.setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
    }, 180);

    return () => {
      window.clearTimeout(refreshTimer);

      if (pointerMove) {
        window.removeEventListener("pointermove", pointerMove);
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
        className="kairos-page relative overflow-x-hidden bg-[#020203] text-white"
      >
        <div
          ref={auraRef}
          className="kairos-cinematic-aura"
          aria-hidden="true"
        />

        <div
          ref={cursorHaloRef}
          className="kairos-cursor-halo hidden md:block"
          aria-hidden="true"
        />

        <style>{`
          .kairos-page,
          .kairos-page * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .kairos-page {
            --kairos-cyan:#35d8ff;
            --kairos-violet:#8b5cf6;
            --kairos-green:#20f0c7;
            --kairos-pink:#ff4fd8;
          }

          .kairos-cinematic-aura {
            position: fixed;
            left: 50%;
            top: 50%;
            width: min(92vw, 1200px);
            height: min(92vw, 1200px);
            transform: translate(-50%, -50%);
            border-radius: 999px;
            pointer-events: none;
            z-index: 0;
            opacity: .14;
            background:
              conic-gradient(
                from 20deg,
                transparent 0 18deg,
                rgba(53,216,255,.16) 22deg,
                transparent 52deg 124deg,
                rgba(139,92,246,.14) 130deg,
                transparent 164deg 230deg,
                rgba(32,240,199,.12) 236deg,
                transparent 268deg 324deg,
                rgba(255,79,216,.1) 330deg,
                transparent 358deg
              );
            -webkit-mask:
              radial-gradient(
                circle,
                transparent 0 56%,
                black 57% 58%,
                transparent 59% 72%,
                black 73% 73.4%,
                transparent 74%
              );
            mask:
              radial-gradient(
                circle,
                transparent 0 56%,
                black 57% 58%,
                transparent 59% 72%,
                black 73% 73.4%,
                transparent 74%
              );
          }

          .kairos-cursor-halo {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 260px;
            margin-left: -130px;
            margin-top: -130px;
            border-radius: 999px;
            pointer-events: none;
            z-index: 3;
            opacity: .12;
            background:
              radial-gradient(
                circle,
                rgba(53,216,255,.16),
                rgba(139,92,246,.08) 38%,
                transparent 70%
              );
            filter: blur(18px);
            mix-blend-mode: screen;
          }

          .kairos-section-shell {
            position: relative;
          }

          .kairos-section-shell::before {
            content:"";
            position:absolute;
            inset:0;
            pointer-events:none;
            background:
              radial-gradient(
                circle at 12% 20%,
                rgba(53,216,255,.035),
                transparent 30%
              ),
              radial-gradient(
                circle at 88% 78%,
                rgba(139,92,246,.035),
                transparent 34%
              );
          }







          .kairos-ghost-word {
            position:absolute;
            pointer-events:none;
            user-select:none;
            white-space:nowrap;
            font-size:clamp(90px, 15vw, 280px);
            line-height:.75;
            letter-spacing:-.08em;
            color:rgba(255,255,255,.018);
          }



          .kairos-record-glass {
            background:
              linear-gradient(
                140deg,
                rgba(255,255,255,.035),
                rgba(255,255,255,.012) 42%,
                transparent 70%
              );
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,.04),
              0 30px 90px rgba(0,0,0,.22);
            backdrop-filter: blur(12px);
          }

          .kairos-interface-vignette {
            pointer-events:none;
            position:absolute;
            inset:0;
            z-index:2;
            background:
              radial-gradient(
                ellipse at center,
                transparent 54%,
                rgba(0,0,0,.16) 78%,
                rgba(0,0,0,.44) 100%
              );
          }

          .kairos-ui-shell {
            transform-style: preserve-3d;
            will-change: transform, filter;
          }

          .kairos-ui-shell::before {
            content:"";
            position:absolute;
            inset:-1px;
            pointer-events:none;
            z-index:3;
            border:1px solid rgba(255,255,255,.05);
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,.015),
              0 0 0 1px rgba(53,216,255,.02);
          }

          .kairos-final-orbit {
            position:absolute;
            right:-14vw;
            top:-22vw;
            width:55vw;
            height:55vw;
            border-radius:999px;
            border:1px solid rgba(255,255,255,.04);
            box-shadow:
              0 0 0 12vw rgba(255,255,255,.008),
              0 0 0 24vw rgba(255,255,255,.005);
          }

          .kairos-signal-stage {
            isolation: isolate;
          }

          .kairos-card-shell {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(92vw, 1540px);
            aspect-ratio: 1.72 / 1;
            transform: translate(-50%, -50%);
            z-index: 5;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,.17);
            box-shadow:
              inset 0 0 0 1px rgba(53,216,255,.018),
              0 0 28px rgba(0,0,0,.35);
          }

          .kairos-card-shell::before {
            content: "";
            position: absolute;
            left: -1px;
            top: -1px;
            width: 42%;
            height: 1px;
            background:
              linear-gradient(
                90deg,
                rgba(53,216,255,.92),
                rgba(53,216,255,.22),
                transparent
              );
          }

          .kairos-card-shell::after {
            content: "";
            position: absolute;
            right: -1px;
            top: -1px;
            width: 42%;
            height: 1px;
            background:
              linear-gradient(
                270deg,
                rgba(255,79,216,.76),
                rgba(139,92,246,.22),
                transparent
              );
          }

          .kairos-card-corner {
            position: absolute;
            width: 12px;
            height: 12px;
            border: 1px solid rgba(255,255,255,.22);
            pointer-events: none;
          }

          .kairos-card-corner--tl { left: -1px; top: -1px; border-right:0; border-bottom:0; }
          .kairos-card-corner--tr { right: -1px; top: -1px; border-left:0; border-bottom:0; }
          .kairos-card-corner--bl { left: -1px; bottom: -1px; border-right:0; border-top:0; }
          .kairos-card-corner--br { right: -1px; bottom: -1px; border-left:0; border-top:0; }

          .kairos-card-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(47vw, 690px);
            height: min(47vw, 690px);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 8;
          }

          .kairos-card-orbit-ring {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.07);
          }

          .kairos-card-orbit-ring:nth-child(2) {
            inset: 6%;
            border-color: rgba(53,216,255,.15);
            border-style: dashed;
          }

          .kairos-card-orbit-ring:nth-child(3) {
            inset: 13%;
            border-color: rgba(255,255,255,.075);
          }

          .kairos-card-orbit-ring:nth-child(4) {
            inset: 21%;
            border-color: rgba(139,92,246,.13);
          }

          .kairos-card-orbit-ring:nth-child(5) {
            inset: 31%;
            border-color: rgba(255,255,255,.09);
          }

          .kairos-card-inner-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 69%;
            height: 56%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }

          .kairos-card-loop {
            position: absolute;
            top: 50%;
            width: 58%;
            height: 76%;
            border: 1px solid rgba(255,255,255,.095);
            border-radius: 50%;
            transform: translateY(-50%);
          }

          .kairos-card-loop--left {
            left: -1%;
            transform: translateY(-50%) rotate(14deg);
            border-right-color: rgba(53,216,255,.19);
            box-shadow: inset -10px 0 26px rgba(53,216,255,.018);
          }

          .kairos-card-loop--right {
            right: -1%;
            transform: translateY(-50%) rotate(-14deg);
            border-left-color: rgba(255,79,216,.18);
            box-shadow: inset 10px 0 26px rgba(255,79,216,.018);
          }

          .kairos-card-inner-ring {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 58%;
            height: 58%;
            transform: translate(-50%, -50%);
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.065);
          }

          .kairos-card-arc {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 84%;
            height: 84%;
            border-radius: 999px;
            border: 1px solid transparent;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }

          .kairos-card-arc--cyan {
            border-top-color: rgba(53,216,255,.26);
            border-left-color: rgba(53,216,255,.11);
            transform: translate(-50%, -50%) rotate(-24deg);
          }

          .kairos-card-arc--violet {
            border-bottom-color: rgba(255,79,216,.22);
            border-right-color: rgba(139,92,246,.12);
            transform: translate(-50%, -50%) rotate(22deg);
          }

          .kairos-card-tick {
            position: absolute;
            width: 1px;
            height: 10px;
            background: rgba(255,255,255,.42);
            transform-origin: 50% 50%;
          }

          .kairos-card-mini-line {
            position: absolute;
            height: 1px;
            background: rgba(255,255,255,.16);
            pointer-events: none;
          }

          .kairos-card-mini-line--cyan {
            background: linear-gradient(90deg, #35d8ff, rgba(53,216,255,.14));
          }

          .kairos-card-mini-line--violet {
            background: linear-gradient(90deg, rgba(255,79,216,.72), rgba(139,92,246,.14));
          }

          .kairos-card-bottom-bars {
            position: absolute;
            display: flex;
            gap: 10px;
            align-items: center;
            pointer-events: none;
          }

          .kairos-card-bottom-bars span {
            display: block;
            width: 2px;
            height: 11px;
            background: rgba(255,255,255,.25);
          }

          .kairos-card-bottom-bars span:nth-child(4n+1) {
            background: rgba(255,79,216,.68);
          }

          .kairos-card-axis-x,
          .kairos-card-axis-y {
            position: absolute;
            left: 50%;
            top: 50%;
            pointer-events: none;
          }

          .kairos-card-axis-x {
            width: 118%;
            height: 1px;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,.12),
                rgba(53,216,255,.4),
                rgba(255,79,216,.28),
                rgba(255,255,255,.12),
                transparent
              );
          }

          .kairos-card-axis-y {
            width: 1px;
            height: 118%;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                180deg,
                transparent,
                rgba(255,255,255,.12),
                rgba(53,216,255,.34),
                rgba(255,79,216,.22),
                rgba(255,255,255,.12),
                transparent
              );
          }

          .kairos-card-node {
            position: absolute;
            width: 10px;
            height: 10px;
            border: 1px solid rgba(255,255,255,.62);
            background: rgba(0,0,0,.72);
            pointer-events: none;
          }

          .kairos-card-node--cyan {
            border-color: rgba(53,216,255,.96);
            box-shadow: 0 0 14px rgba(53,216,255,.14);
          }

          .kairos-card-node--violet {
            border-color: rgba(255,79,216,.82);
            box-shadow: 0 0 14px rgba(255,79,216,.12);
          }

          .kairos-card-crosshair {
            position: absolute;
            width: 18px;
            height: 18px;
            pointer-events: none;
          }

          .kairos-card-crosshair::before,
          .kairos-card-crosshair::after {
            content: "";
            position: absolute;
            background: rgba(255,255,255,.4);
          }

          .kairos-card-crosshair::before {
            width: 1px;
            height: 100%;
            left: 50%;
            top: 0;
          }

          .kairos-card-crosshair::after {
            height: 1px;
            width: 100%;
            top: 50%;
            left: 0;
          }

          .kairos-card-ruler {
            position: absolute;
            display: flex;
            flex-direction: column;
            gap: 11px;
            pointer-events: none;
            opacity: .66;
          }

          .kairos-card-ruler span {
            display: block;
            width: 9px;
            height: 1px;
            background: rgba(255,255,255,.35);
          }

          .kairos-card-dots {
            position: absolute;
            display: grid;
            grid-template-columns: repeat(6, 2px);
            gap: 10px 14px;
            pointer-events: none;
            opacity: .72;
          }

          .kairos-card-dots span {
            width: 2px;
            height: 2px;
            border-radius: 999px;
            background: rgba(255,255,255,.65);
          }

          .kairos-card-center-copy {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 18;
            transform: translate(-50%, -50%);
            width: min(78vw, 980px);
            text-align: center;
            pointer-events: none;
          }

          .kairos-card-center-title {
            font-size: clamp(3.8rem, 8.4vw, 8.4rem);
            line-height: .72;
            letter-spacing: -.06em;
            text-transform: uppercase;
            color: white;
            text-shadow:
              0 0 10px rgba(255,255,255,.06),
              0 0 30px rgba(53,216,255,.03);
          }

          .kairos-card-center-sub {
            margin-top: .26em;
            font-size: clamp(.8rem, 1.7vw, 1.55rem);
            letter-spacing: .62em;
            padding-left: .62em;
            text-transform: uppercase;
            color: rgba(255,255,255,.78);
          }

          .kairos-card-meta {
            position: absolute;
            z-index: 18;
            font-size: 7px;
            line-height: 1.55;
            letter-spacing: .34em;
            text-transform: uppercase;
            color: rgba(255,255,255,.38);
            pointer-events: none;
          }

          .kairos-card-accent-line {
            position: absolute;
            width: 92px;
            height: 2px;
            background:
              linear-gradient(
                90deg,
                #35d8ff,
                rgba(139,92,246,.8),
                rgba(255,79,216,.75)
              );
            pointer-events: none;
            box-shadow: 0 0 14px rgba(53,216,255,.14);
          }

          .kairos-card-bottom-rule {
            position: absolute;
            left: 4.5%;
            right: 4.5%;
            bottom: 14%;
            height: 1px;
            background:
              linear-gradient(
                90deg,
                rgba(255,255,255,.16),
                transparent 32%,
                transparent 68%,
                rgba(255,255,255,.13)
              );
            pointer-events: none;
          }

          .kairos-signal-stage::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              radial-gradient(circle at 50% 50%, rgba(53,216,255,.035), transparent 26%),
              radial-gradient(circle at 50% 50%, rgba(139,92,246,.025), transparent 46%);
          }

          .kairos-signal-frame {
            position: absolute;
            inset: 8% 4vw;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,.035);
          }

          .kairos-signal-frame::before,
          .kairos-signal-frame::after {
            content: "";
            position: absolute;
            background: rgba(255,255,255,.12);
          }

          .kairos-signal-frame::before {
            left: 50%;
            top: -12px;
            width: 1px;
            height: 24px;
          }

          .kairos-signal-frame::after {
            left: -12px;
            top: 50%;
            width: 24px;
            height: 1px;
          }

          .kairos-signal-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(44vw, 720px);
            height: min(44vw, 720px);
            transform: translate(-50%, -50%);
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.04);
            pointer-events: none;
          }

          .kairos-signal-orbit::before,
          .kairos-signal-orbit::after {
            content: "";
            position: absolute;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,.025);
          }

          .kairos-signal-orbit::before {
            inset: 12%;
          }

          .kairos-signal-orbit::after {
            inset: 28%;
          }

          .kairos-signal-coordinate {
            position: absolute;
            font-size: 7px;
            letter-spacing: .32em;
            text-transform: uppercase;
            color: rgba(255,255,255,.2);
            pointer-events: none;
          }

          .kairos-signal-coreline {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 82%;
            height: 1px;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.16),
                rgba(255,255,255,.24),
                rgba(139,92,246,.16),
                transparent
              );
            pointer-events: none;
          }

          .kairos-signal-row {
            will-change: transform;
            transform-origin: 50% 50%;
          }

          [data-kairos-signal-rows-wrap] {
            overflow: hidden;
          }

          [data-kairos-signal-rows-wrap] {
            -webkit-mask-image:
              radial-gradient(
                circle at center,
                transparent 0 9%,
                rgba(0,0,0,.78) 18%,
                black 38%,
                black 100%
              );
            mask-image:
              radial-gradient(
                circle at center,
                transparent 0 9%,
                rgba(0,0,0,.78) 18%,
                black 38%,
                black 100%
              );
          }

          [data-kairos-signal-lead-inner] {
            will-change: transform, opacity, filter, letter-spacing;
          }

          [data-kairos-signal-circle] {
            will-change: transform, opacity, border-radius;
          }


          .kairos-signal-window {
            box-shadow:
              0 0 80px rgba(53,216,255,.08),
              inset 0 0 0 1px rgba(255,255,255,.035);
            backdrop-filter: blur(2px);
          }


          /* =========================================================
             SOFTWARE / INVERSE OPENING
             Le bande sono il primo frame; l'HUD è il risultato finale.
             ========================================================= */

          .software-inverse-label {
            position: absolute;
            left: 5vw;
            top: 8vh;
            z-index: 60;
            font-size: 8px;
            letter-spacing: .38em;
            text-transform: uppercase;
            color: rgba(255,255,255,.28);
            pointer-events: none;
          }

          .software-inverse-edge {
            position: absolute;
            inset: 6vh 4vw;
            z-index: 2;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,.035);
          }

          .software-inverse-edge::before,
          .software-inverse-edge::after {
            content: "";
            position: absolute;
            height: 1px;
            width: 22%;
          }

          .software-inverse-edge::before {
            left: -1px;
            top: -1px;
            background: linear-gradient(90deg, #35d8ff, transparent);
          }

          .software-inverse-edge::after {
            right: -1px;
            bottom: -1px;
            background: linear-gradient(270deg, #ff4fd8, transparent);
          }

          .software-inverse-center-axis {
            position: absolute;
            left: 50%;
            top: 0;
            bottom: 0;
            width: 1px;
            transform: translateX(-50%);
            pointer-events: none;
            background:
              linear-gradient(
                to bottom,
                transparent,
                rgba(255,255,255,.05) 22%,
                rgba(53,216,255,.12) 50%,
                rgba(255,255,255,.05) 78%,
                transparent
              );
          }


          /* =========================================================
             SOFTWARE / COMPILER ROOM MOOD
             Rettangolare, modulare, architetturale, terminal-like.
             ========================================================= */
          .software-page {
            --sw-blue:#4ea7ff;
            --sw-green:#7dffb2;
            --sw-white:#f4f7fb;
          }

          .software-build-stage {
            isolation:isolate;
            background:
              linear-gradient(180deg, rgba(255,255,255,.012), transparent 28%),
              #020304;
          }

          .software-build-grid {
            position:absolute;
            inset:0;
            pointer-events:none;
            background-image:
              linear-gradient(rgba(78,167,255,.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78,167,255,.05) 1px, transparent 1px);
            background-size:52px 52px;
            mask-image:linear-gradient(to bottom,transparent,black 8%,black 92%,transparent);
          }

          .software-perspective-grid {
            position:absolute;
            left:-12%;
            right:-12%;
            bottom:-24%;
            height:62%;
            pointer-events:none;
            opacity:.32;
            transform:perspective(900px) rotateX(67deg);
            transform-origin:50% 100%;
            background-image:
              linear-gradient(rgba(78,167,255,.11) 1px, transparent 1px),
              linear-gradient(90deg, rgba(78,167,255,.11) 1px, transparent 1px);
            background-size:64px 44px;
            mask-image:linear-gradient(to top,black,transparent 88%);
          }

          .software-build-shell {
            position:absolute;
            inset:7vh 4vw;
            pointer-events:none;
            border:1px solid rgba(255,255,255,.07);
            z-index:5;
          }

          .software-build-shell::before,
          .software-build-shell::after {
            content:"";
            position:absolute;
            height:1px;
          }

          .software-build-shell::before {
            left:-1px;
            top:-1px;
            width:34%;
            background:linear-gradient(90deg,var(--sw-blue),transparent);
          }

          .software-build-shell::after {
            right:-1px;
            bottom:-1px;
            width:28%;
            background:linear-gradient(270deg,var(--sw-green),transparent);
          }

          .software-build-columns {
            position:absolute;
            inset:0;
            display:grid;
            grid-template-columns:repeat(12,1fr);
            pointer-events:none;
            opacity:.46;
          }

          .software-build-columns > span {
            border-right:1px solid rgba(255,255,255,.035);
          }

          .software-build-module {
            position:relative;
            border:1px solid rgba(255,255,255,.13);
            background:
              linear-gradient(145deg,rgba(255,255,255,.03),transparent 55%),
              rgba(3,5,7,.82);
            box-shadow:
              inset 0 0 0 1px rgba(78,167,255,.02),
              0 18px 60px rgba(0,0,0,.28);
            overflow:hidden;
            will-change:transform,opacity,filter;
          }

          .software-build-module::before {
            content:"";
            position:absolute;
            left:0;
            top:0;
            width:100%;
            height:1px;
            background:linear-gradient(90deg,var(--sw-blue),transparent 68%);
            opacity:.62;
          }

          .software-build-module--green::before {
            background:linear-gradient(90deg,var(--sw-green),transparent 68%);
          }

          .software-build-module-label {
            position:absolute;
            left:14px;
            top:12px;
            font-size:6px;
            letter-spacing:.28em;
            text-transform:uppercase;
            color:rgba(255,255,255,.34);
          }

          .software-build-module-bars {
            position:absolute;
            left:14px;
            right:14px;
            bottom:14px;
            display:grid;
            gap:7px;
          }

          .software-build-module-bars span {
            display:block;
            height:1px;
            background:rgba(255,255,255,.12);
          }

          .software-build-module-bars span:nth-child(2){width:76%;}
          .software-build-module-bars span:nth-child(3){
            width:42%;
            background:rgba(78,167,255,.34);
          }

          .software-terminal {
            position:absolute;
            left:5vw;
            bottom:9vh;
            z-index:30;
            width:min(34vw,520px);
            pointer-events:none;
            font-family:"SFMono-Regular","Menlo","Monaco","Consolas",monospace !important;
            font-size:8px;
            line-height:1.8;
            letter-spacing:.08em;
            color:rgba(255,255,255,.34);
          }

          .software-terminal .ok{color:rgba(125,255,178,.82);}
          .software-terminal .blue{color:rgba(78,167,255,.78);}

          .software-build-ghost {
            position:absolute;
            left:50%;
            top:50%;
            z-index:8;
            transform:translate(-50%,-50%);
            width:100%;
            text-align:center;
            pointer-events:none;
            user-select:none;
            white-space:nowrap;
            font-size:clamp(5.5rem,15.5vw,17rem);
            line-height:.66;
            letter-spacing:-.09em;
            text-transform:uppercase;
            color:rgba(255,255,255,.018);
            -webkit-text-stroke:1px rgba(78,167,255,.045);
            text-shadow:
              0 0 70px rgba(78,167,255,.025),
              0 0 110px rgba(125,255,178,.012);
          }

          .software-build-ghost-sub {
            position:absolute;
            left:50%;
            top:63%;
            z-index:8;
            transform:translateX(-50%);
            pointer-events:none;
            white-space:nowrap;
            font-size:7px;
            letter-spacing:.52em;
            text-transform:uppercase;
            color:rgba(255,255,255,.16);
          }

          .software-build-word {
            position:absolute;
            left:50%;
            top:49%;
            z-index:35;
            transform:translate(-50%,-50%);
            width:92vw;
            text-align:center;
            pointer-events:none;
          }

          .software-build-word h1 {
            font-size:clamp(4rem,13.2vw,14rem);
            line-height:.68;
            letter-spacing:-.085em;
            text-transform:uppercase;
            color:var(--sw-white);
            text-shadow:0 0 32px rgba(78,167,255,.045);
          }

          .software-build-word p {
            margin-top:1.6rem;
            font-size:8px;
            letter-spacing:.42em;
            text-transform:uppercase;
            color:rgba(255,255,255,.36);
          }

          .software-compile-line {
            position:absolute;
            left:50%;
            top:0;
            bottom:0;
            width:1px;
            z-index:20;
            pointer-events:none;
            transform:translateX(-50%);
            background:linear-gradient(to bottom,transparent,rgba(78,167,255,.8),rgba(125,255,178,.5),transparent);
            box-shadow:0 0 18px rgba(78,167,255,.28);
          }

          .software-progress-shell {
            position:absolute;
            left:4vw;
            right:4vw;
            top:11vh;
            z-index:30;
            display:flex;
            align-items:center;
            gap:16px;
            pointer-events:none;
          }

          .software-progress-track {
            flex:1;
            height:1px;
            background:rgba(255,255,255,.08);
            overflow:hidden;
          }

          .software-progress-fill {
            height:100%;
            width:100%;
            transform:scaleX(0);
            transform-origin:left center;
            background:linear-gradient(90deg,var(--sw-blue),var(--sw-green));
          }

          .software-progress-label {
            font-size:7px;
            letter-spacing:.3em;
            text-transform:uppercase;
            color:rgba(255,255,255,.28);
            white-space:nowrap;
          }

          .software-boot-frame {
            border-radius:0 !important;
            box-shadow:
              0 30px 120px rgba(0,0,0,.5),
              0 0 0 1px rgba(78,167,255,.055) !important;
          }

          .software-stack-compiler [data-stack-row] {
            padding-left:0;
            transition:padding-left .35s ease;
          }

          .software-stack-compiler [data-stack-row]:hover {
            padding-left:14px;
          }

          @media (max-width: 767px) {
            .software-build-ghost {
              font-size:22vw;
            }

            .software-build-ghost-sub {
              top:60%;
              font-size:5px;
              letter-spacing:.3em;
            }

            .software-terminal {
              width:58vw;
              font-size:6px;
            }


            .kairos-card-shell {
              width: calc(100vw - 24px);
              aspect-ratio: .72 / 1;
            }

            .kairos-card-orbit {
              width: 84vw;
              height: 84vw;
            }

            .kairos-card-center-copy {
              width: 86vw;
            }

            .kairos-card-center-title {
              font-size: 20vw;
            }

            .kairos-card-center-sub {
              font-size: 3.4vw;
              letter-spacing: .45em;
            }

            .kairos-card-meta {
              font-size: 5px;
              letter-spacing: .22em;
            }

            .kairos-card-dots {
              transform: scale(.72);
              transform-origin: top right;
            }

            .kairos-card-ruler {
              opacity: .42;
            }

            .kairos-signal-row {
              will-change: transform;
            }


            [data-kairos-signal-circle] {
              width: 56vw;
              height: 56vw;
            }

            .kairos-signal-frame {
              inset: 10% 12px;
            }

            .kairos-signal-orbit {
              width: 72vw;
              height: 72vw;
            }

            .kairos-signal-coordinate {
              font-size: 6px;
              letter-spacing: .22em;
            }

            [data-kairos-signal-rows-wrap] {
              -webkit-mask-image:
                radial-gradient(
                  circle at center,
                  transparent 0 12%,
                  rgba(0,0,0,.82) 24%,
                  black 46%,
                  black 100%
                );
              mask-image:
                radial-gradient(
                  circle at center,
                  transparent 0 12%,
                  rgba(0,0,0,.82) 24%,
                  black 46%,
                  black 100%
                );
            }
          }

          .kairos-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
            background-size: 68px 68px;
            mask-image:
              linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
          }

          .kairos-noise::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: .05;
            background-image:
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.85'/%3E%3C/svg%3E");
            mix-blend-mode: soft-light;
          }



          .kairos-ui-shell {
            box-shadow:
              0 40px 120px rgba(0,0,0,.5),
              0 0 0 1px rgba(255,255,255,.08);
          }

          .kairos-real-dashboard {
            --kd-bg:#0d0d0e;
            --kd-panel:#171717;
            --kd-panel-2:#1b1b1b;
            --kd-line:#2a2a2a;
            --kd-soft:#a0a0a0;
            --kd-text:#ededed;
            --kd-blue:#4f46e5;
            font-family:
              "SFMono-Regular",
              "Menlo",
              "Monaco",
              "Consolas",
              monospace !important;
            background:#0d0d0e;
            color:#ededed;
          }

          .kairos-real-dashboard * {
            font-family: inherit !important;
          }

          .kd-sidebar {
            background:#181818;
            border-right:1px solid #2a2a2a;
          }

          .kd-topbar {
            background:#0b0b0c;
            border-bottom:1px solid #242424;
          }

          .kd-card {
            background:
              linear-gradient(180deg, rgba(255,255,255,.018), transparent),
              #171717;
            border:1px solid #2b2b2b;
          }

          .kd-panel {
            background:#171717;
            border:1px solid #2b2b2b;
          }

          .kd-nav-active {
            background:#292929;
            color:#fff;
          }

          .kd-nav-item {
            transition:
              background-color .22s ease,
              color .22s ease,
              transform .22s ease;
          }

          .kd-nav-item:hover {
            background:#222;
            color:#fff;
            transform:translateX(2px);
          }

          .kd-chart-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px);
            background-size:100% 52px;
          }

          .kd-bar {
            background:
              linear-gradient(
                180deg,
                rgba(255,255,255,.48),
                rgba(255,255,255,.10)
              );
            border:1px solid rgba(255,255,255,.08);
          }

          .kd-donut {
            background:
              conic-gradient(
                rgba(32,240,199,.72) 0deg 246deg,
                rgba(139,92,246,.70) 246deg 281deg,
                rgba(53,216,255,.68) 281deg 336deg,
                rgba(255,79,216,.62) 336deg 360deg
              );
            box-shadow:
              0 0 42px rgba(53,216,255,.035),
              0 0 64px rgba(139,92,246,.025);
          }

          .kd-donut::after {
            content:"";
            position:absolute;
            inset:18%;
            border-radius:999px;
            background:#171717;
            border:1px solid #0d0d0e;
          }

          .kd-scrollbar {
            scrollbar-width:thin;
            scrollbar-color:#5f5f5f #141414;
          }

          @media (max-width: 1023px) {
            [data-interface-stage] {
              perspective: 1100px;
            }

            [data-ui-frame] {
              transform-style: preserve-3d;
              backface-visibility: hidden;
              will-change: transform, filter;
            }

            .kairos-real-dashboard {
              width: 100%;
              overflow: hidden;
            }
          }

          @media (max-width: 767px) {
            .kairos-cursor-halo {
              display:none !important;
            }

            .kairos-cinematic-aura {
              opacity:.08;
              width:120vw;
              height:120vw;
            }

            .kairos-ghost-word {
              font-size:28vw;
            }

            .kairos-grid {
              background-size: 44px 44px;
            }

            [data-interface-stage] {
              padding-left: 10px;
              padding-right: 10px;
              perspective: 900px;
            }

            [data-ui-frame] {
              border-radius: 16px !important;
              transform-style: preserve-3d;
              transform-origin: 50% 48%;
            }

            /*
             * Mobile = vera dashboard responsive:
             * layout interno a griglia, niente canvas desktop ridotto.
             * L'effetto 3D resta sul frame esterno.
             */
            .kairos-real-dashboard {
              width: 100%;
              min-width: 0;
              transform-origin: 50% 50%;
            }

            .kairos-real-dashboard .kd-card,
            .kairos-real-dashboard .kd-panel {
              min-width: 0;
            }

            .kairos-real-dashboard .kd-chart-grid {
              background-size: 100% 42px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
          }
        `}</style>

        {/* =====================================================
            SOFTWARE / COMPILER ROOM
        ====================================================== */}
        <section
          ref={signalRef}
          className="software-page software-build-stage kairos-noise relative flex h-[100svh] min-h-[680px] items-center overflow-hidden"
        >
          <div className="software-build-grid" />
          <div className="software-perspective-grid" aria-hidden="true" />

          <div
            data-software-build-shell
            className="software-build-shell"
            aria-hidden="true"
          />

          <div className="software-build-columns" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={`build-col-${index}`} />
            ))}
          </div>

          <div className="software-progress-shell">
            <span className="software-progress-label avant-legato-font">
              BUILD / 001
            </span>
            <div className="software-progress-track">
              <div
                data-software-progress-fill
                className="software-progress-fill"
              />
            </div>
            <span className="software-progress-label avant-legato-font">
              COMPILING SYSTEM
            </span>
          </div>

          <span
            data-software-compile-line
            className="software-compile-line"
            aria-hidden="true"
          />

          <p
            aria-hidden="true"
            className="software-build-ghost avant-legato-font ombra2"
          >
            SOFTWARE
          </p>

          <p
            aria-hidden="true"
            className="software-build-ghost-sub avant-legato-font"
          >
            ARCHITECTURE / LOGIC / DATA / SYSTEM
          </p>

          <div className="absolute inset-[17%_7%] z-10 grid grid-cols-3 grid-rows-3 gap-[1.2vw]">
            {[
              ["AUTH / ACCESS", false],
              ["API / ROUTING", true],
              ["DATA / STORE", false],
              ["WORKFLOW", true],
              ["CORE / LOGIC", false],
              ["AUTOMATION", true],
              ["UI / STATE", false],
              ["CLOUD / SCALE", true],
              ["AUDIT / BACKUP", false],
            ].map(([label, green], index) => (
              <div
                key={label}
                data-software-module
                className={`software-build-module ${green ? "software-build-module--green" : ""}`}
              >
                <span className="software-build-module-label avant-legato-font">
                  {String(index + 1).padStart(2, "0")} / {label}
                </span>

                <div className="software-build-module-bars">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            ))}
          </div>

          <div
            data-software-build-word
            className="software-build-word"
          >
            <div data-software-build-word-inner>
              <h1 className="avant-legato-font ombra2">SOFTWARE</h1>
              <p className="avant-legato-font">
                CUSTOM SYSTEMS / BUILT AROUND REAL WORK
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute left-[5vw] top-[15vh] z-30">
            <p className="avant-legato-font text-[7px] uppercase leading-[1.8] tracking-[.34em] text-white/22">
              SYSTEM MAP / 09 MODULES
              <br />
              STATUS / STANDBY
            </p>
          </div>

          <div className="pointer-events-none absolute right-[5vw] top-[15vh] z-30 text-right">
            <p className="avant-legato-font text-[7px] uppercase leading-[1.8] tracking-[.34em] text-white/22">
              BUILD TARGET / WEB
              <br />
              ENV / PRODUCTION
            </p>
          </div>

          <div className="software-terminal">
            {[
              ["$ init oxo/software", "blue"],
              ["✓ loading architecture", "ok"],
              ["✓ mounting data layer", "ok"],
              ["✓ connecting services", "ok"],
              ["✓ compiling interface", "ok"],
              ["ready / system online", "blue"],
            ].map(([line, cls]) => (
              <div
                key={line}
                data-software-terminal-line
                className={cls}
              >
                {line}
              </div>
            ))}
          </div>

          <div className="pointer-events-none absolute bottom-[7vh] right-[5vw] z-30 text-right">
            <p className="avant-legato-font text-[7px] uppercase tracking-[.34em] text-white/24">
              OXO SOFTWARE ENGINE
              <br />
              PRODUCT / CLOUD / DATA / AUTOMATION
            </p>
          </div>
        </section>

        {/* =====================================================
            PER CHI
        ====================================================== */}
        <section
          ref={usersRef}
          className="kairos-section-shell relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-45" />

          <span
            aria-hidden="true"
            className="kairos-ghost-word avant-legato-font right-[-4vw] top-[8%]"
          >
            USERS
          </span>

          <div
            data-cinematic-block
            className="relative z-10 mb-16 flex flex-col gap-6 border-b border-white/14 pb-8 md:flex-row md:items-end md:justify-between lg:mb-24">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-fuchsia-400 md:text-xs">
                01 / PER CHI
              </p>

              <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
                PER CHI
                <br />
                LO PROGETTIAMO.
              </h2>
            </div>

            <p className="avant-legato-font max-w-[620px] text-xl leading-snug text-gray-300 md:text-3xl">
              Un’unica architettura, adattabile a team, flussi e livelli
              di complessità diversi.
            </p>
          </div>

          <div className="relative z-10">
            {USERS.map((item) => (
              <div
                key={item.id}
                data-user-row
                className="group relative grid min-h-[104px] grid-cols-[42px_1fr_auto] items-center gap-4 py-5 md:min-h-[132px] md:grid-cols-[70px_1fr_120px]"
              >
                <span className="text-[9px] uppercase tracking-[0.28em] text-white/32 md:text-[11px]">
                  {item.id}
                </span>

                <h3
                  className="avant-legato-font text-[8vw] uppercase leading-none tracking-[-0.06em] transition-transform duration-500 group-hover:translate-x-3 md:text-[5vw] lg:text-[3.8vw]"
                  style={{ color: "white" }}
                >
                  {item.label}
                </h3>

                <span
                  className="hidden text-right text-3xl md:block"
                  style={{ color: item.accent }}
                >
                  ↗
                </span>

                <span
                  data-user-line
                  className="absolute bottom-0 left-0 h-px w-full origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, rgba(255,255,255,.12), transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            INTERFACE
        ====================================================== */}
        <section
          ref={interfaceRef}
          className="kairos-section-shell relative bg-[#020203]"
        >
          <div
            data-cinematic-block
            className="relative z-10 px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-violet-400 md:text-xs">
              02 / INTERFACCIA
            </p>

            <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="MODULARE."
                  attribute="data-interface-letter"
                />
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="CONNESSA."
                  attribute="data-interface-letter"
                />
              </span>
            </h2>
          </div>

          <div
            data-interface-stage
            className="kairos-noise relative flex min-h-[100svh] items-center overflow-hidden border-y border-white/12 bg-[#050506] px-3 py-8 md:px-6 md:py-12 lg:px-[3vw] lg:py-14"
          >
            <div className="kairos-grid pointer-events-none absolute inset-0 opacity-40" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[14vw] top-[8%] h-[42vw] w-[42vw] rounded-full bg-cyan-300/[0.035] blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[12vw] bottom-[5%] h-[40vw] w-[40vw] rounded-full bg-violet-500/[0.035] blur-[125px]"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1780px]">
              <div
                data-ui-panel
                className="mb-5 flex flex-col gap-3 border-b border-white/14 pb-5 md:flex-row md:items-end md:justify-between"
              >
                <div>
                  <p className="text-[9px] uppercase tracking-[0.38em] text-cyan-300 md:text-[11px]">
                    REAL SOFTWARE / DASHBOARD
                  </p>
                  <p className="avant-legato-font mt-2 text-xl text-white/72 md:text-2xl">
                    Un’interfaccia operativa, ricostruita direttamente nel sito.
                  </p>
                </div>

                <p className="max-w-[620px] text-[9px] uppercase leading-relaxed tracking-[0.24em] text-white/30 md:text-right md:text-[10px]">
                  Progetti / automazioni / analytics / clienti /
                  workspace / team
                </p>
              </div>

              <div
                data-ui-frame
                className="software-boot-frame kairos-ui-shell kairos-record-glass kairos-real-dashboard relative overflow-hidden border border-white/10"
              >
                <div className="kairos-interface-vignette" aria-hidden="true" />
                {/* TOP APP TITLE */}
                <div className="kd-topbar flex h-10 items-center justify-center px-4 text-[9px] font-medium text-white/85">
                  OXO SOFTWARE - Operations Dashboard
                </div>

                <div className="grid min-h-[620px] grid-cols-1 md:min-h-[760px] md:grid-cols-[190px_minmax(0,1fr)] lg:min-h-[820px] lg:grid-cols-[230px_1fr]">
                  {/* SIDEBAR */}
                  <aside className="kd-sidebar hidden min-w-0 flex-col md:flex">
                    <div className="flex h-[58px] items-center gap-3 border-b border-[#292929] px-3">
                      <div className="grid h-7 w-7 shrink-0 place-items-center bg-indigo-600 text-[13px] text-white">
                        ▰
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[9px] text-white md:text-[10px] lg:text-[11px]">
                          SOFTWARE SYSTEMS
                        </p>
                        <p className="text-[7px] text-white/38 md:text-[8px] lg:text-[9px]">OPERATIONS WORKSPACE</p>
                      </div>

                      <span className="text-[12px] text-white/70">⌃⌄</span>
                    </div>

                    <nav className="flex-1 overflow-hidden px-2 py-4 text-[8px] text-white/78 md:text-[9px] lg:text-[10px]">
                      <p className="mb-2 px-1 text-[9px] text-white/42">
                        Overview
                      </p>

                      <div
                        data-ui-row
                        className="kd-nav-item kd-nav-active mb-1 flex items-center gap-3 rounded-sm px-2 py-2"
                      >
                        <span className="w-3 text-center">⌘</span>
                        <span>Dashboard</span>
                      </div>

                      <div
                        data-ui-row
                        className="kd-nav-item flex items-center justify-between px-2 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-3 text-center">✎</span>
                          <span>Progetti</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Attività", "Pipeline", "Report"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}

                      <div
                        data-ui-row
                        className="kd-nav-item mt-2 flex items-center justify-between px-2 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-3 text-center">▣</span>
                          <span>Automazioni</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Attive", "Completate", "Da verificare"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}

                      {[
                        ["⌖", "Clienti"],
                        ["▱", "Workspaces"],
                        ["♙", "Team"],
                      ].map(([icon, label]) => (
                        <div
                          key={label}
                          data-ui-row
                          className="kd-nav-item mt-1 flex items-center gap-3 px-2 py-2"
                        >
                          <span className="w-3 text-center">{icon}</span>
                          <span>{label}</span>
                        </div>
                      ))}

                      <div
                        data-ui-row
                        className="kd-nav-item mt-1 flex items-center justify-between px-2 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-3 text-center">◉</span>
                          <span>Account</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Profile", "Billing", "Login"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}
                    </nav>

                    <div className="flex h-[48px] items-center gap-3 border-t border-[#2a2a2a] px-3">
                      <div className="grid h-7 w-7 place-items-center bg-violet-600 text-white">
                        ●
                      </div>
                      <p className="truncate text-[9px] text-white/80">
                        OXO STUDIO / ADMIN
                      </p>
                    </div>
                  </aside>

                  {/* MOBILE APP NAV */}
                  <div className="border-b border-[#292929] bg-[#181818] md:hidden">
                    <div className="flex items-center justify-between px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center bg-indigo-600 text-[12px] text-white">
                          ▰
                        </div>
                        <div>
                          <p className="text-[9px] text-white">SOFTWARE SYSTEMS</p>
                          <p className="text-[7px] text-white/38">OPERATIONS WORKSPACE</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[8px] text-white/56">
                        <span className="border border-[#303030] px-2 py-1">Overview</span>
                        <span className="border border-[#303030] px-2 py-1">☰</span>
                      </div>
                    </div>

                    <div className="kd-scrollbar flex gap-2 overflow-x-auto border-t border-[#242424] px-3 py-2 text-[8px] text-white/60">
                      {[
                        "Dashboard",
                        "Progetti",
                        "Automazioni",
                        "Clienti",
                        "Workspaces",
                        "Team",
                      ].map((item, index) => (
                        <span
                          key={item}
                          className={`shrink-0 border px-2.5 py-1.5 ${
                            index === 0
                              ? "border-white/18 bg-white/[0.07] text-white"
                              : "border-white/[0.07]"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* MAIN APP */}
                  <div className="min-w-0 bg-[#0d0d0e]">
                    {/* INNER TOPBAR */}
                    <div className="flex h-[52px] items-center justify-between border-b border-[#242424] px-3 md:h-[58px] md:px-5">
                      <div className="flex items-center gap-2 text-[8px] text-white/78 md:gap-4 md:text-[10px]">
                        <span className="text-white/80">▣</span>
                        <span className="text-white/45">Dashboard</span>
                        <span className="text-white/26">/</span>
                        <span>Overview</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="hidden h-9 w-[210px] items-center justify-between rounded-md border border-[#2a2a2a] bg-[#0d0d0e] px-3 text-[9px] text-white/42 lg:flex">
                          <span>Search...</span>
                          <span className="rounded bg-[#262626] px-1.5 py-1 text-[8px] text-white/70">
                            ⌘ K
                          </span>
                        </div>

                        <div className="h-7 w-7 rounded-full border-4 border-white bg-violet-600" />
                        <div className="grid h-8 w-8 place-items-center border border-[#2a2a2a] bg-[#171717] text-[10px] text-white/60">
                          ◐
                        </div>
                        <div className="hidden h-9 items-center border border-[#2a2a2a] bg-[#171717] px-3 text-[9px] text-white/48 xl:flex">
                          Select a theme: Mono　⌄
                        </div>
                      </div>
                    </div>

                    <div className="kd-scrollbar overflow-x-hidden p-3 md:overflow-x-auto md:p-5">
                      {/* KPI ROW */}
                      <div className="grid grid-cols-2 gap-2 md:min-w-[700px] md:grid-cols-4 md:gap-3">
                        {[
                          {
                            label: "In corso",
                            value: "18",
                            badge: "↗ +12%",
                            caption: "Attività ancora da completare",
                            sub: "Demo / aggiornamento operativo",
                          },
                          {
                            label: "Automazioni oggi",
                            value: "46",
                            badge: "↗ +48%",
                            caption: "Operazioni eseguite automaticamente",
                            sub: "Demo / salvataggio continuo",
                          },
                          {
                            label: "Tempo medio attività",
                            value: "02:34",
                            badge: "↘ -18%",
                            caption: "Input → processo → output",
                            sub: "Demo / tempo medio di lavorazione",
                          },
                          {
                            label: "Operazioni completate",
                            value: "32",
                            badge: "↗ +21%",
                            caption: "Eseguite e tracciate nel sistema",
                            sub: "Demo / 31 confermate · 1 in verifica",
                          },
                        ].map((item) => (
                          <article
                            key={item.label}
                            data-ui-panel
                            className="kd-card min-h-[118px] p-3 md:min-h-[132px] md:p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-[9px] text-white/45">
                                {item.label}
                              </span>
                              <span className="border border-[#303030] bg-[#1c1c1c] px-1.5 py-0.5 text-[8px] text-white/68">
                                {item.badge}
                              </span>
                            </div>

                            <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-.05em] text-white md:text-[28px]">
                              {item.value}
                            </p>

                            <p className="mt-5 text-[9px] font-semibold text-white/86">
                              {item.caption}
                            </p>
                            <p className="mt-1 text-[9px] text-white/40">
                              {item.sub}
                            </p>
                          </article>
                        ))}
                      </div>

                      {/* MAIN CHART */}
                      <section
                        data-ui-panel
                        className="kd-panel mt-3 w-full"
                      >
                        <div className="grid grid-cols-1 border-b border-[#2b2b2b] sm:grid-cols-[1fr_92px_92px] md:grid-cols-[1fr_120px_120px]">
                          <div className="p-4">
                            <h4 className="text-[11px] font-semibold text-white/92">
                              Andamento operativo
                            </h4>
                            <p className="mt-1 text-[9px] text-white/42">
                              Metriche demo degli ultimi giorni
                            </p>
                          </div>

                          <div className="border-t border-[#2b2b2b] p-3 sm:border-l sm:border-t-0 md:p-4">
                            <p className="text-[8px] text-white/42">
                              Attività generate
                            </p>
                            <p className="mt-1 text-[26px] font-semibold leading-none text-white">
                              184
                            </p>
                          </div>

                          <div className="border-t border-[#2b2b2b] p-3 sm:border-l sm:border-t-0 md:p-4">
                            <p className="text-[8px] text-white/42">
                              Clienti
                            </p>
                            <p className="mt-1 text-[26px] font-semibold leading-none text-white">
                              96
                            </p>
                          </div>
                        </div>

                        <div className="kd-chart-grid relative h-[220px] overflow-hidden px-3 pt-5 md:h-[270px] md:px-5">
                          <div className="absolute inset-x-5 bottom-8 top-5 flex items-end justify-between gap-3">
                            {[18, 29, 41, 58, 76, 121, 184].map((v, i) => (
                              <div
                                key={i}
                                className="relative flex h-full flex-1 items-end justify-center"
                              >
                                <div
                                  className="kd-bar relative w-[72%] max-w-[105px]"
                                  style={{
                                    height: `${Math.max(14, (v / 184) * 82)}%`,
                                  }}
                                >
                                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[7px] text-white/32">
                                    {v}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="absolute inset-x-5 bottom-2 grid grid-cols-7 text-center text-[8px] text-white/40">
                            {["14 ago", "15 ago", "16 ago", "17 ago", "18 ago", "19 ago", "20 ago"].map(
                              (day) => <span key={day}>{day}</span>
                            )}
                          </div>
                        </div>
                      </section>

                      {/* LOWER PANELS */}
                      <div className="mt-3 grid grid-cols-1 gap-3 md:min-w-[700px] lg:grid-cols-2">
                        <section
                          data-ui-panel
                          className="kd-panel min-h-[300px] p-4"
                        >
                          <h4 className="text-[11px] font-semibold text-white/92">
                            Distribuzione attività
                          </h4>
                          <p className="mt-1 text-[9px] text-white/42">
                            Ripartizione del lavoro per stato
                          </p>

                          <div className="grid min-h-[225px] grid-cols-1 items-center gap-4 sm:grid-cols-[150px_1fr] md:grid-cols-[170px_1fr] md:gap-5">
                            <div className="flex items-center justify-center">
                              <div className="kd-donut relative h-[128px] w-[128px] rounded-full md:h-[150px] md:w-[150px]">
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                                  <span className="text-[26px] font-semibold leading-none text-white">
                                    184
                                  </span>
                                  <span className="mt-2 text-[8px] text-white/46">
                                    Task demo
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 text-[8px]">
                              {[
                                ["Completati", "126", "rgba(255,255,255,.52)"],
                                ["In corso", "18", "rgba(139,92,246,.75)"],
                                ["Pianificati", "28", "rgba(53,216,255,.72)"],
                                ["Da verificare", "12", "rgba(32,240,199,.68)"],
                              ].map(([label, value, color]) => (
                                <div
                                  key={label}
                                  className="flex items-center justify-between border-b border-white/[0.06] pb-2"
                                >
                                  <span className="flex items-center gap-2 text-white/48">
                                    <span
                                      className="h-1.5 w-1.5"
                                      style={{ backgroundColor: color }}
                                    />
                                    {label}
                                  </span>
                                  <span className="text-white/82">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>

                        <section
                          data-ui-panel
                          className="kd-panel min-h-[300px] p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-[11px] font-semibold text-white/92">
                                Ultime attività
                              </h4>
                              <p className="mt-1 text-[9px] text-white/42">
                                Flusso operativo recente
                              </p>
                            </div>

                            <span className="border border-[#303030] bg-[#1c1c1c] px-2 py-1 text-[7px] uppercase tracking-[0.2em] text-white/46">
                              LIVE FLOW
                            </span>
                          </div>

                          <div className="mt-4">
                            {[
                              ["KA-001842", "Onboarding nuovo cliente", "Completato", "#20f0c7"],
                              ["KA-001841", "Revisione dashboard vendite", "Da verificare", "#8b5cf6"],
                              ["KA-001840", "Automazione report settimanale", "Automation", "#35d8ff"],
                              ["KA-001839", "Importazione dati CRM", "Pianificato", "#ff4fd8"],
                              ["KA-001838", "Deploy nuova release", "Deploy", "#20f0c7"],
                            ].map(([code, title, state, accent]) => (
                              <div
                                key={code}
                                data-ui-row
                                className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-2 border-b border-white/[0.07] py-3 text-[7px] sm:grid-cols-[82px_1fr_auto] sm:gap-3 sm:text-[8px]"
                              >
                                <span className="text-white/34">{code}</span>
                                <span className="truncate text-white/72">{title}</span>
                                <span
                                  className="col-span-2 w-fit border px-2 py-1 uppercase tracking-[0.18em] sm:col-span-1"
                                  style={{
                                    color: accent,
                                    borderColor: `${accent}55`,
                                    backgroundColor: `${accent}10`,
                                  }}
                                >
                                  {state}
                                </span>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* PROMO STRIP AROUND THE REAL UI */}
              <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                {[
                  ["01", "PROGETTI", "Attività / frontespizio / topografia", "#35d8ff"],
                  ["02", "AUTOMAZIONI", "Attive / approvate / revisione", "#8b5cf6"],
                  ["03", "CLIENTI", "Dati / attività / relazioni", "#20f0c7"],
                  ["04", "WORKSPACE", "Organizzazioni / team / permessi", "#ff4fd8"],
                ].map(([id, title, copy, accent]) => (
                  <div
                    key={id}
                    data-ui-panel
                    className="border border-white/12 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] tracking-[0.28em] text-white/28">
                        {id}
                      </span>
                      <span
                        className="h-2 w-2 border"
                        style={{ borderColor: accent }}
                      />
                    </div>

                    <p
                      className="mt-4 text-[9px] uppercase tracking-[0.28em]"
                      style={{ color: accent }}
                    >
                      {title}
                    </p>

                    <p className="avant-legato-font mt-3 text-base leading-snug text-white/68 md:text-lg">
                      {copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TECH
        ====================================================== */}
        <section
          ref={techRef}
          className="software-stack-compiler kairos-section-shell kairos-noise relative overflow-hidden bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-55" />

          <span
            aria-hidden="true"
            className="kairos-ghost-word avant-legato-font -left-[3vw] top-[9%]"
          >
            STACK
          </span>

          <div
            data-cinematic-block
            className="relative z-10 grid gap-16 lg:grid-cols-[1fr_.9fr] lg:gap-[8vw]"
          >
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-emerald-300 md:text-xs">
                03 / TECNOLOGIA E SICUREZZA
              </p>

              <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
                COMPILATO
                <br />
                PER SCALARE.
              </h2>

              <p className="avant-legato-font mt-10 max-w-[780px] text-xl leading-snug text-gray-300 md:text-3xl">
                Un software moderno deve essere scalabile, leggibile,
                manutenibile e sicuro quanto i processi che gestisce.
              </p>
            </div>

            <div className="self-end">
              {STACK.map(([label, accent], index) => (
                <div
                  key={label}
                  data-stack-row
                  className="relative flex items-center justify-between border-b border-white/12 py-5 md:py-6"
                >
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/28 md:text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="avant-legato-font text-xl uppercase tracking-[0.08em] md:text-3xl">
                    {label}
                  </span>

                  <span
                    className="h-2.5 w-2.5 border"
                    style={{
                      borderColor: accent,
                      boxShadow: `0 0 16px ${accent}55`,
                    }}
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
          className="kairos-noise relative flex min-h-[100svh] items-end overflow-hidden border-t border-white/12 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="kairos-final-orbit" aria-hidden="true" />

          <span
            data-kairos-parallax-line
            className="pointer-events-none absolute left-[-12%] top-[32%] h-px w-[64%] bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
          />
          <span
            data-kairos-parallax-line
            className="pointer-events-none absolute right-[-16%] top-[62%] h-px w-[68%] bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12vw] top-[5%] h-[60vw] w-[60vw] rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.18), rgba(139,92,246,.13) 36%, rgba(255,79,216,.07) 54%, transparent 72%)",
            }}
          />

          <div data-cinematic-block className="relative z-10 w-full">
            <div
              data-final-software-copy
              className="mb-8 flex items-center justify-between border-b border-white/18 pb-5 text-[9px] uppercase tracking-[0.31em] text-white/34 md:text-[11px]"
            >
              <span>SOFTWARE SYSTEMS / OXO STUDIO</span>
              <span>COMPLEXITY / ORGANIZED</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[16vw] uppercase leading-[.69] tracking-[-0.09em] md:text-[12vw] lg:text-[9.6vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="COSTRUISCI."
                  attribute="data-final-software-letter"
                />
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="EVOLVI."
                  attribute="data-final-software-letter"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/18 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                data-final-software-copy
                className="avant-legato-font max-w-[860px] text-xl leading-snug text-gray-300 md:text-3xl"
              >
                Software su misura significa togliere attrito dai processi, collegare
                dati e persone e costruire strumenti chiari, sicuri e pronti
                a crescere insieme all’organizzazione.
              </p>

              <Link
                to="/Contatti"
                data-final-software-copy
                className="avant-legato-font group inline-flex w-fit items-center gap-5 border border-white/30 bg-white/[0.035] px-5 py-4 text-sm uppercase tracking-[0.28em] text-white md:px-6 md:text-base"
              >
                <span>Parliamo del software</span>
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