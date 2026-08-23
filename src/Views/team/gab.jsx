import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

gsap.registerPlugin(ScrollTrigger);

const SECURITY_NODES = [
  ["SBN", "CATALOGAZIONE", "12%", "20%", "#35d8ff"],
  ["PROTO", "Z39.50", "28%", "66%", "#8b5cf6"],
  ["FORMAT", "UNIMARC", "48%", "28%", "#20f0c7"],
  ["FORMAT", "MARC 21", "64%", "70%", "#ff4fd8"],
  ["ACCESS", "OPAC", "78%", "24%", "#35d8ff"],
  ["DATA", "METADATI", "88%", "62%", "#8b5cf6"],
];

const STACK_LANES = [
  {
    title: "CATALOGAZIONE",
    accent: "#35d8ff",
    items: [
      "Catalogazione bibliografica",
      "Descrizione documentale",
      "Normalizzazione dei record",
      "Controllo dei dati",
      "Authority / intestazioni",
      "Ricerca bibliografica",
    ],
  },
  {
    title: "SBN / OPAC",
    accent: "#8b5cf6",
    items: [
      "SBN",
      "OPAC",
      "BID",
      "ISBN",
      "Ricerca catalografica",
      "Record bibliografici",
    ],
  },
  {
    title: "PROTOCOLLI / FORMATI",
    accent: "#20f0c7",
    items: [
      "Z39.50",
      "UNIMARC",
      "MARC 21",
      "Interoperabilità",
      "Scambio record",
      "Metadati",
    ],
  },
  {
    title: "ARCHIVIO",
    accent: "#ff4fd8",
    items: [
      "Archivistica",
      "Organizzazione",
      "Classificazione",
      "Ordinamento",
      "Descrizione",
      "Conservazione informativa",
    ],
  },
];

const BUILD_POINTS = [
  "Archivista presso Artisimago",
  "Esperienza professionale in catalogazione e organizzazione documentale",
  "Catalogazione bibliografica e verifica strutturata dei record",
  "Ricerca e interrogazione di cataloghi tramite SBN e OPAC",
  "Utilizzo del protocollo Z39.50 per il recupero di record bibliografici",
  "Conoscenza dei formati UNIMARC e MARC 21",
  "Gestione di identificativi bibliografici come ISBN e BID",
  "Periodo Artisimago: febbraio 2018 — ottobre 2021",
  "Durata complessiva: 3 anni e 9 mesi",
  "La Spezia, Liguria, Italia",
];

const SECURITY_POINTS = [
  "Catalogazione bibliografica",
  "SBN",
  "Z39.50",
  "UNIMARC",
  "MARC 21",
  "OPAC",
  "ISBN",
  "BID",
  "Metadati bibliografici",
  "Normalizzazione dei record",
  "Authority / intestazioni",
  "Ricerca catalografica",
];

function SplitLetters({ text, attribute = "data-gab-final-letter" }) {
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

export default function Gab() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const kernelRef = useRef(null);
  const projectRef = useRef(null);
  const securityRef = useRef(null);
  const stackRef = useRef(null);
  const finalRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const kernel = kernelRef.current;
    const project = projectRef.current;
    const security = securityRef.current;
    const stack = stackRef.current;
    const finalSection = finalRef.current;

    if (!page || !hero || !kernel || !project || !security || !stack || !finalSection) {
      return undefined;
    }

    let pointerMove = null;
    let pointerEnter = null;
    let pointerLeave = null;

    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) return;

      /*
       * ============================================================
       * HERO / IDENTITY SIGNAL
       * ============================================================
       */
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-gab-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-gab-meta]")
      );
      const portrait = hero.querySelector("[data-gab-portrait]");
      const portraitInner = hero.querySelector("[data-gab-portrait-inner]");
      const portraitPixels = gsap.utils.toArray(
        hero.querySelectorAll("[data-gab-pixel]")
      );
      const heroGhost = hero.querySelector("[data-gab-ghost]");
      const heroSignal = hero.querySelector("[data-gab-signal]");
      const heroRuler = hero.querySelector("[data-gab-ruler]");

      gsap.fromTo(
        heroLetters,
        {
          yPercent: 120,
          rotateX: -78,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.024,
          ease: "power4.out",
          delay: 0.08,
        }
      );

      gsap.fromTo(
        heroMeta,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.38,
        }
      );

      gsap.fromTo(
        portrait,
        {
          clipPath: "polygon(18% 0%, 100% 0%, 84% 100%, 0% 100%)",
          scale: 0.9,
          opacity: 0,
          rotate: 2.5,
        },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1.35,
          ease: "power4.inOut",
          delay: 0.16,
        }
      );

      gsap.set(portraitPixels, {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1,
      });

      gsap.fromTo(
        heroSignal,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power4.out",
          delay: 0.52,
        }
      );

      gsap.fromTo(
        heroRuler,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.48,
        }
      );

      const heroTl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 0.95,
          invalidateOnRefresh: true,
        },
      });

      heroTl
        .to(
          portrait,
          {
            xPercent: 9,
            scale: 1.07,
            rotate: 2,
            opacity: 0.42,
            duration: 1,
          },
          0
        )
        .to(
          heroGhost,
          {
            xPercent: -18,
            skewX: -5,
            opacity: 0.08,
            duration: 1,
          },
          0
        );

      if (!window.matchMedia("(pointer: coarse)").matches) {
        const PIXEL_COLS = 20;
        const PIXEL_ROWS = 26;
        let rafId = 0;
        let hoverActive = false;
        let targetPX = 0.5;
        let targetPY = 0.5;
        let currentPX = 0.5;
        let currentPY = 0.5;

        const renderPixelField = () => {
          currentPX += (targetPX - currentPX) * 0.18;
          currentPY += (targetPY - currentPY) * 0.18;

          portraitPixels.forEach((pixel, index) => {
            const col = index % PIXEL_COLS;
            const row = Math.floor(index / PIXEL_COLS);

            const px = (col + 0.5) / PIXEL_COLS;
            const py = (row + 0.5) / PIXEL_ROWS;

            const dx = px - currentPX;
            const dy = py - currentPY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const radius = 0.235;
            const influence = hoverActive
              ? Math.max(0, 1 - distance / radius)
              : 0;

            if (influence > 0.001) {
              const safeDistance = Math.max(distance, 0.015);
              const directionX = dx / safeDistance;
              const directionY = dy / safeDistance;

              const checker = (row + col) % 2 === 0 ? 1 : -1;
              const noiseX =
                Math.sin(index * 12.9898 + currentPY * 24) * 2.5;
              const noiseY =
                Math.cos(index * 8.233 + currentPX * 18) * 2;

              const force = 4 + influence * 28;

              pixel.style.opacity = String(
                Math.min(1, 0.34 + influence * 0.76)
              );

              pixel.style.transform = `
                translate3d(
                  ${directionX * force + noiseX * influence}px,
                  ${directionY * force + noiseY * influence}px,
                  0
                )
                scale(${1 + influence * 0.16})
                rotate(${checker * influence * 2.8}deg)
              `;

              pixel.style.filter =
                checker > 0
                  ? `drop-shadow(${2 + influence * 7}px 0 0 rgba(53,216,255,${0.08 + influence * 0.22}))`
                  : `drop-shadow(${-2 - influence * 7}px 0 0 rgba(255,79,216,${0.07 + influence * 0.2}))`;
            } else {
              pixel.style.opacity = hoverActive ? "0.11" : "0";
              pixel.style.transform = "translate3d(0,0,0) scale(1)";
              pixel.style.filter = "none";
            }
          });

          if (hoverActive) {
            rafId = window.requestAnimationFrame(renderPixelField);
          }
        };

        pointerEnter = () => {
          hoverActive = true;

          gsap.to(portraitInner, {
            filter:
              "contrast(1.075) saturate(1.08) brightness(.98)",
            duration: 0.16,
            ease: "power2.out",
            overwrite: "auto",
          });

          if (!rafId) {
            rafId = window.requestAnimationFrame(renderPixelField);
          }
        };

        pointerMove = (event) => {
          const rect = portrait.getBoundingClientRect();

          targetPX = Math.min(
            1,
            Math.max(0, (event.clientX - rect.left) / rect.width)
          );
          targetPY = Math.min(
            1,
            Math.max(0, (event.clientY - rect.top) / rect.height)
          );

          const nx = targetPX - 0.5;
          const ny = targetPY - 0.5;

          gsap.to(portrait, {
            x: nx * 9,
            y: ny * 6,
            rotateY: nx * 1.6,
            rotateX: ny * -1.2,
            transformPerspective: 1600,
            duration: 0.32,
            ease: "power3.out",
            overwrite: "auto",
          });

          portrait.style.setProperty("--mx", `${targetPX * 100}%`);
          portrait.style.setProperty("--my", `${targetPY * 100}%`);
        };

        pointerLeave = () => {
          hoverActive = false;

          if (rafId) {
            window.cancelAnimationFrame(rafId);
            rafId = 0;
          }

          gsap.to(portraitPixels, {
            opacity: 0,
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power3.out",
            overwrite: "auto",
            clearProps: "transform,filter",
          });

          gsap.to(portrait, {
            x: 0,
            y: 0,
            rotateX: 0,
            rotateY: 0,
            duration: 0.58,
            ease: "power3.out",
            overwrite: "auto",
          });

          gsap.to(portraitInner, {
            xPercent: 0,
            yPercent: 0,
            filter: "none",
            duration: 0.44,
            ease: "power3.out",
            overwrite: "auto",
          });

          portrait.style.setProperty("--mx", "50%");
          portrait.style.setProperty("--my", "50%");
        };

        portrait.addEventListener("pointerenter", pointerEnter);
        portrait.addEventListener("pointermove", pointerMove, { passive: true });
        portrait.addEventListener("pointerleave", pointerLeave);
      }

      /*
       * ============================================================
       * PERSONAL KERNEL — EDITORIAL / NON PINNED
       * ============================================================
       */
      const kernelWords = gsap.utils.toArray(
        kernel.querySelectorAll("[data-kernel-word]")
      );
      const kernelMeta = gsap.utils.toArray(
        kernel.querySelectorAll("[data-kernel-meta]")
      );
      const kernelBars = gsap.utils.toArray(
        kernel.querySelectorAll("[data-kernel-bar]")
      );
      const kernelCursor = kernel.querySelector("[data-kernel-cursor]");

      gsap.fromTo(
        kernelWords,
        {
          yPercent: 110,
          rotateX: -70,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.05,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: kernel,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        kernelMeta,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.68,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: kernel,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        }
      );

      kernelBars.forEach((bar, index) => {
        gsap.fromTo(
          bar,
          {
            scaleX: 0,
            transformOrigin: index % 2 === 0 ? "left center" : "right center",
          },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: bar,
              start: "top 86%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      if (kernelCursor) {
        gsap.to(kernelCursor, {
          xPercent: 260,
          ease: "none",
          scrollTrigger: {
            trigger: kernel,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

/*
 * PROJECT REVEAL
 */
const projectRows = gsap.utils.toArray(
  project.querySelectorAll("[data-project-row]")
);
const projectImage = project.querySelector("[data-project-image]");

gsap.fromTo(
  projectImage,
  {
    clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
    scale: 1.12,
    opacity: 0,
  },
  {
    clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    scale: 1,
    opacity: 1,
    duration: 1.15,
    ease: "power4.inOut",
    scrollTrigger: {
      trigger: project,
      start: "top 72%",
      toggleActions: "play none none reverse",
    },
  }
);

projectRows.forEach((row, index) => {
  gsap.fromTo(
    row,
    {
      xPercent: index % 2 === 0 ? -8 : 8,
      opacity: 0,
    },
    {
      xPercent: 0,
      opacity: 1,
      duration: 0.62,
      ease: "power3.out",
      scrollTrigger: {
        trigger: row,
        start: "top 88%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

/*
 * SECURITY MAP
 */
const secNodes = gsap.utils.toArray(
  security.querySelectorAll("[data-security-node]")
);
const secLines = gsap.utils.toArray(
  security.querySelectorAll("[data-security-line]")
);
const secCore = security.querySelector("[data-security-core]");
const secRows = gsap.utils.toArray(
  security.querySelectorAll("[data-security-row]")
);

gsap.fromTo(
  secCore,
  {
    scale: 0.72,
    rotate: -8,
    opacity: 0,
  },
  {
    scale: 1,
    rotate: 0,
    opacity: 1,
    duration: 1,
    ease: "power4.out",
    scrollTrigger: {
      trigger: security,
      start: "top 72%",
      toggleActions: "play none none reverse",
    },
  }
);

gsap.fromTo(
  secLines,
  {
    scaleX: 0,
    transformOrigin: "left center",
    opacity: 0,
  },
  {
    scaleX: 1,
    opacity: 0.45,
    duration: 0.7,
    stagger: 0.05,
    ease: "power3.out",
    scrollTrigger: {
      trigger: security,
      start: "top 72%",
      toggleActions: "play none none reverse",
    },
  }
);

gsap.fromTo(
  secNodes,
  {
    scale: 0,
    opacity: 0,
  },
  {
    scale: 1,
    opacity: 1,
    duration: 0.55,
    stagger: 0.06,
    ease: "back.out(1.8)",
    scrollTrigger: {
      trigger: security,
      start: "top 70%",
      toggleActions: "play none none reverse",
    },
  }
);

secRows.forEach((row, index) => {
  gsap.fromTo(
    row,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      delay: index * 0.02,
      ease: "power3.out",
      scrollTrigger: {
        trigger: row,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    }
  );
});

/*
 * STACK LANES
 */
const lanes = gsap.utils.toArray(
  stack.querySelectorAll("[data-stack-lane]")
);

lanes.forEach((lane, index) => {
  gsap.fromTo(
    lane,
    {
      xPercent: index % 2 === 0 ? -12 : 12,
      opacity: 0,
    },
    {
      xPercent: 0,
      opacity: 1,
      duration: 0.78,
      ease: "power3.out",
      scrollTrigger: {
        trigger: lane,
        start: "top 86%",
        toggleActions: "play none none reverse",
      },
    }
  );
});


      /*
       * FINAL
       */
      const finalLetters = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-gab-final-letter]")
      );
      const finalMeta = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-gab-final-meta]")
      );

      gsap.fromTo(
        finalLetters,
        {
          yPercent: 120,
          rotateX: -78,
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
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        finalMeta,
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
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

    const timer = window.setTimeout(refresh, 240);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);

      if (pointerEnter) portrait?.removeEventListener("pointerenter", pointerEnter);
      if (pointerMove) portrait?.removeEventListener("pointermove", pointerMove);
      if (pointerLeave) portrait?.removeEventListener("pointerleave", pointerLeave);

      ctx.revert();
    };
  }, []);

  return (
    <>
      <SeoMetaTags />

      <main
        ref={pageRef}
        className="gab-aww relative overflow-x-hidden bg-[#020203] text-white"
      >
        <style>{`
          .gab-aww,
          .gab-aww * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .gab-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px);
            background-size:62px 62px;
            mask-image:linear-gradient(to bottom,transparent,black 8%,black 92%,transparent);
          }

          .gab-noise::after {
            content:"";
            position:absolute;
            inset:0;
            pointer-events:none;
            opacity:.045;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.93' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode:soft-light;
          }

          .gab-portrait {
            position:absolute;
            right:4vw;
            top:10vh;
            width:min(42vw,680px);
            height:min(76vh,760px);
            overflow:hidden;
            border:1px solid rgba(255,255,255,.14);
            background:#050608;
            box-shadow:0 34px 120px rgba(0,0,0,.42);
            will-change:transform,opacity,clip-path;
          }

          .gab-portrait::after {
            content:"";
            position:absolute;
            inset:0;
            z-index:20;
            pointer-events:none;
            opacity:0;
            background:
              repeating-linear-gradient(
                to bottom,
                transparent 0 5px,
                rgba(255,255,255,.045) 6px,
                transparent 7px 11px
              );
            mix-blend-mode:screen;
            transition:opacity .16s ease;
          }

          .gab-portrait:hover::after {
            opacity:.48;
          }

          .gab-portrait-inner {
            position:absolute;
            inset:-3%;
            will-change:transform;
          }

          .gab-pixel-layer {
            position:absolute;
            inset:0;
            z-index:13;
            display:grid;
            grid-template-columns:repeat(20,1fr);
            grid-template-rows:repeat(26,1fr);
            pointer-events:none;
            overflow:hidden;
          }

          .gab-pixel {
            position:relative;
            overflow:hidden;
            opacity:0;
            will-change:transform,opacity,filter;
            background-image:url("/img/team/gab2.png");
            background-repeat:no-repeat;
            background-size:2000% 2600%;
          }

          .gab-ruler {
            position:absolute;
            right:2.2vw;
            top:12vh;
            height:66vh;
            width:1px;
            background:
              repeating-linear-gradient(
                to bottom,
                rgba(255,255,255,.26) 0 1px,
                transparent 1px 14px
              );
          }

          .gab-kernel {
            position:relative;
            overflow:hidden;
          }

          .gab-kernel-ghost {
            position:absolute;
            left:-2vw;
            top:10%;
            white-space:nowrap;
            font-size:18vw;
            line-height:.7;
            letter-spacing:-.09em;
            color:rgba(255,255,255,.018);
            pointer-events:none;
          }

          .gab-kernel-shell {
            position:relative;
            min-height:82svh;
            display:grid;
            align-items:center;
            border-top:1px solid rgba(255,255,255,.14);
            border-bottom:1px solid rgba(255,255,255,.14);
          }

          .gab-kernel-word {
            font-size:clamp(4.4rem,12vw,13rem);
            line-height:.62;
            letter-spacing:-.09em;
            text-transform:uppercase;
            will-change:transform,opacity;
          }

          .gab-kernel-outline {
            color:transparent;
            -webkit-text-stroke:1px rgba(255,255,255,.22);
          }

          .gab-kernel-bar {
            height:1px;
            width:100%;
            background:linear-gradient(
              90deg,
              transparent,
              rgba(53,216,255,.65),
              rgba(139,92,246,.55),
              rgba(32,240,199,.45),
              transparent
            );
          }

          .gab-kernel-cursor {
            position:absolute;
            left:10%;
            top:50%;
            width:10px;
            height:10px;
            border:1px solid #35d8ff;
            box-shadow:0 0 18px rgba(53,216,255,.2);
          }

          .gab-project-image {
            box-shadow:0 36px 120px rgba(0,0,0,.42);
          }

          .gab-security-field {
            position:relative;
            min-height:680px;
            border:1px solid rgba(255,255,255,.10);
            overflow:hidden;
            background:
              radial-gradient(circle at 50% 50%,rgba(53,216,255,.05),transparent 28%),
              rgba(255,255,255,.008);
          }

          .gab-security-core {
            position:absolute;
            left:50%;
            top:50%;
            width:min(34vw,480px);
            aspect-ratio:1;
            transform:translate(-50%,-50%);
            border:0;
            background:transparent;
            box-shadow:none;
            isolation:isolate;
            overflow:visible;
          }

          .gab-electric-archive {
            position:absolute;
            inset:-7%;
            display:flex;
            align-items:center;
            justify-content:center;
            pointer-events:none;
            filter:
              drop-shadow(0 0 12px rgba(53,216,255,.13))
              drop-shadow(0 0 28px rgba(139,92,246,.10));
          }

          .gab-electric-archive::before {
            content:"";
            position:absolute;
            left:50%;
            top:50%;
            width:82%;
            height:72%;
            transform:translate(-50%,-50%);
            background:
              radial-gradient(circle at 30% 48%,rgba(53,216,255,.13),transparent 34%),
              radial-gradient(circle at 68% 48%,rgba(139,92,246,.12),transparent 36%),
              radial-gradient(circle at 52% 68%,rgba(255,79,216,.055),transparent 34%);
            filter:blur(30px);
            opacity:.95;
            animation:gabArchiveAura 4.8s ease-in-out infinite;
          }

          .gab-electric-archive::after {
            content:"";
            position:absolute;
            left:50%;
            top:50%;
            width:94%;
            height:86%;
            transform:translate(-50%,-50%);
            border:1px solid rgba(255,255,255,.035);
            box-shadow:
              0 0 0 2.4vw rgba(53,216,255,.005),
              0 0 0 4.8vw rgba(139,92,246,.003);
          }

          .gab-archive-svg {
            position:relative;
            z-index:4;
            width:94%;
            height:94%;
            overflow:visible;
          }

          .gab-archive-line {
            fill:none;
            stroke:rgba(255,255,255,.16);
            stroke-width:1.15;
            vector-effect:non-scaling-stroke;
          }

          .gab-archive-line--cyan {
            stroke:rgba(53,216,255,.62);
            filter:drop-shadow(0 0 4px rgba(53,216,255,.28));
          }

          .gab-archive-line--violet {
            stroke:rgba(139,92,246,.56);
            filter:drop-shadow(0 0 4px rgba(139,92,246,.25));
          }

          .gab-archive-line--pink {
            stroke:rgba(255,79,216,.45);
            filter:drop-shadow(0 0 4px rgba(255,79,216,.2));
          }

          .gab-archive-shelf {
            fill:rgba(255,255,255,.01);
            stroke:rgba(255,255,255,.12);
            stroke-width:1;
            vector-effect:non-scaling-stroke;
          }

          .gab-archive-book {
            fill:rgba(2,2,3,.62);
            stroke-width:1;
            vector-effect:non-scaling-stroke;
          }

          .gab-archive-book--cyan {
            stroke:rgba(53,216,255,.58);
          }

          .gab-archive-book--violet {
            stroke:rgba(139,92,246,.5);
          }

          .gab-archive-book--pink {
            stroke:rgba(255,79,216,.42);
          }

          .gab-archive-record {
            fill:none;
            stroke-width:1.1;
            stroke-linecap:round;
            vector-effect:non-scaling-stroke;
            stroke-dasharray:5 8;
            animation:gabArchiveRecord 4.4s linear infinite;
          }

          .gab-archive-record--cyan {
            stroke:rgba(53,216,255,.78);
            filter:drop-shadow(0 0 5px rgba(53,216,255,.32));
          }

          .gab-archive-record--violet {
            stroke:rgba(139,92,246,.68);
            animation-direction:reverse;
            animation-duration:5.2s;
            filter:drop-shadow(0 0 5px rgba(139,92,246,.28));
          }

          .gab-archive-record--pink {
            stroke:rgba(255,79,216,.58);
            animation-duration:3.8s;
            filter:drop-shadow(0 0 5px rgba(255,79,216,.25));
          }

          .gab-archive-electric {
            fill:none;
            stroke-width:1.35;
            stroke-linecap:round;
            stroke-linejoin:round;
            vector-effect:non-scaling-stroke;
            stroke-dasharray:2 10;
            animation:gabArchiveElectric 1.75s linear infinite;
          }

          .gab-archive-electric--cyan {
            stroke:#35d8ff;
            filter:
              drop-shadow(0 0 3px rgba(53,216,255,.8))
              drop-shadow(0 0 8px rgba(53,216,255,.3));
          }

          .gab-archive-electric--violet {
            stroke:#8b5cf6;
            animation-delay:-.7s;
            animation-duration:2.05s;
            filter:
              drop-shadow(0 0 3px rgba(139,92,246,.75))
              drop-shadow(0 0 8px rgba(139,92,246,.3));
          }

          .gab-archive-node {
            transform-box:fill-box;
            transform-origin:center;
            animation:gabArchiveNode 2.4s ease-in-out infinite;
          }

          .gab-archive-node--cyan {
            fill:#35d8ff;
            filter:drop-shadow(0 0 5px rgba(53,216,255,.9));
          }

          .gab-archive-node--violet {
            fill:#8b5cf6;
            filter:drop-shadow(0 0 5px rgba(139,92,246,.85));
          }

          .gab-archive-node--pink {
            fill:#ff4fd8;
            filter:drop-shadow(0 0 5px rgba(255,79,216,.8));
          }

          .gab-archive-node:nth-of-type(2n) {
            animation-delay:-.8s;
          }

          .gab-archive-node:nth-of-type(3n) {
            animation-delay:-1.35s;
          }

          .gab-archive-page {
            fill:rgba(255,255,255,.012);
            stroke:rgba(255,255,255,.16);
            stroke-width:1;
            vector-effect:non-scaling-stroke;
          }

          .gab-archive-page-line {
            stroke:rgba(255,255,255,.16);
            stroke-width:.8;
            vector-effect:non-scaling-stroke;
          }

          .gab-archive-page-line--accent {
            stroke:rgba(53,216,255,.55);
            stroke-dasharray:4 7;
            animation:gabArchiveRecord 4.8s linear infinite;
          }

          .gab-archive-scanline {
            position:absolute;
            z-index:8;
            left:9%;
            right:9%;
            top:22%;
            height:1px;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.08),
                rgba(53,216,255,.9),
                rgba(255,255,255,.65),
                rgba(139,92,246,.48),
                transparent
              );
            box-shadow:
              0 0 9px rgba(53,216,255,.32),
              0 0 20px rgba(139,92,246,.1);
            opacity:0;
            animation:gabArchiveScan 4s cubic-bezier(.45,0,.55,1) infinite;
          }

          .gab-archive-tag {
            position:absolute;
            z-index:9;
            padding:7px 9px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(2,2,3,.78);
            font-size:6px;
            line-height:1;
            letter-spacing:.26em;
            text-transform:uppercase;
            color:rgba(255,255,255,.42);
            backdrop-filter:blur(5px);
          }

          .gab-archive-tag--sbn {
            left:8%;
            top:16%;
            color:#35d8ff;
          }

          .gab-archive-tag--z3950 {
            right:5%;
            top:34%;
            color:#8b5cf6;
          }

          .gab-archive-tag--unimarc {
            left:12%;
            bottom:23%;
            color:#20f0c7;
          }

          .gab-archive-tag--marc {
            right:9%;
            bottom:18%;
            color:#ff4fd8;
          }

          .gab-archive-meta {
            position:absolute;
            z-index:10;
            left:50%;
            bottom:0;
            transform:translateX(-50%);
            white-space:nowrap;
            text-align:center;
            font-size:7px;
            line-height:1.8;
            letter-spacing:.32em;
            text-transform:uppercase;
            color:rgba(255,255,255,.34);
          }

          .gab-archive-meta strong {
            display:block;
            color:rgba(255,255,255,.72);
            font-weight:400;
            letter-spacing:.28em;
          }

          @keyframes gabArchiveAura {
            0%,100% {
              transform:translate(-50%,-50%) scale(.95);
              opacity:.72;
            }
            50% {
              transform:translate(-50%,-50%) scale(1.07);
              opacity:1;
            }
          }

          @keyframes gabArchiveRecord {
            to {
              stroke-dashoffset:-88;
            }
          }

          @keyframes gabArchiveElectric {
            0% {
              stroke-dashoffset:0;
              opacity:.18;
            }
            18% {
              opacity:.95;
            }
            50% {
              opacity:.32;
            }
            78% {
              opacity:1;
            }
            100% {
              stroke-dashoffset:-76;
              opacity:.2;
            }
          }

          @keyframes gabArchiveNode {
            0%,100% {
              transform:scale(.72);
              opacity:.38;
            }
            50% {
              transform:scale(1.55);
              opacity:1;
            }
          }

          @keyframes gabArchiveScan {
            0% {
              top:19%;
              opacity:0;
            }
            12% {
              opacity:.7;
            }
            48% {
              opacity:.94;
            }
            88% {
              opacity:.42;
            }
            100% {
              top:81%;
              opacity:0;
            }
          }

          .gab-security-node {
            position:absolute;
            width:132px;
            padding:12px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(2,2,3,.72);
            backdrop-filter:blur(6px);
          }

          .gab-security-line {
            position:absolute;
            left:50%;
            top:50%;
            height:1px;
            width:32%;
            transform-origin:left center;
            background:linear-gradient(90deg,rgba(255,255,255,.18),transparent);
          }

          .gab-stack-lane {
            position:relative;
            overflow:hidden;
            border-top:1px solid rgba(255,255,255,.14);
            min-height:180px;
            display:grid;
            grid-template-columns:minmax(170px,.35fr) 1fr;
            align-items:center;
            gap:4vw;
          }

          .gab-stack-marquee {
            display:flex;
            flex-wrap:wrap;
            gap:10px;
          }

          .gab-pill {
            border:1px solid rgba(255,255,255,.11);
            background:rgba(255,255,255,.012);
            padding:10px 12px;
            font-size:8px;
            letter-spacing:.22em;
            text-transform:uppercase;
            color:rgba(255,255,255,.56);
          }

          @media (max-width:767px) {
            .gab-grid { background-size:42px 42px; }

            .gab-portrait {
              position:relative;
              right:auto;
              top:auto;
              width:100%;
              height:62svh;
              margin-top:90px;
            }

            .gab-ruler {
              display:none;
            }

            .gab-security-field {
              min-height:760px;
            }

            .gab-security-core {
              width:min(72vw,330px);
            }

            .gab-archive-meta {
              bottom:-2px;
              font-size:6px;
              letter-spacing:.24em;
            }

            .gab-archive-tag {
              font-size:5px;
              padding:6px 7px;
              letter-spacing:.2em;
            }

            .gab-security-node {
              width:110px;
              padding:9px;
            }

            .gab-stack-lane {
              grid-template-columns:1fr;
              gap:20px;
              padding:28px 0;
            }

            .gab-kernel-shell {
              min-height:72svh;
            }

            .gab-kernel-word {
              font-size:20vw;
            }

          }
        `}</style>

        {/* =====================================================
            HERO / IDENTITY SIGNAL
        ====================================================== */}
        <section
          ref={heroRef}
          className="gab-noise relative isolate min-h-[100svh] overflow-hidden bg-[#020203] px-6 pb-8 pt-7 md:px-10 md:pb-10 lg:px-[4vw] lg:pb-[4vh]"
        >
          <div className="gab-grid pointer-events-none absolute inset-0 opacity-58" />

          <div className="pointer-events-none absolute left-[8%] top-[20%] h-[32vw] w-[32vw] rounded-full bg-cyan-400/[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute right-[8%] top-[18%] h-[26vw] w-[26vw] rounded-full bg-violet-500/[0.08] blur-[130px]" />

          <div className="relative z-30 flex items-start justify-between text-[8px] uppercase tracking-[.32em] text-white/34 md:text-[10px]">
            <p data-gab-meta>
              OXO STUDIO®
              <br />
              PERSON / 002
            </p>

           
          </div>

          <div
            data-gab-ruler
            className="gab-ruler"
            aria-hidden="true"
          />

          <p
            data-gab-ghost
            aria-hidden="true"
            className="avant-legato-font pointer-events-none absolute left-[-3vw] top-[36%] z-[2] whitespace-nowrap text-[14vw] uppercase leading-none tracking-[-.08em] text-white/[0.028]"
          >
            BUILD / HARDEN / SCALE
          </p>

          <div
            data-gab-portrait
            className="gab-portrait"
          >
            <div
              data-gab-portrait-inner
              className="gab-portrait-inner"
            >
              <img
                src="/img/team/gab2.png"
                alt="Gabriele Chierici"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/5 to-black/18" />
              <div className="gab-grid absolute inset-0 opacity-24" />

              <div className="gab-pixel-layer" aria-hidden="true">
                {Array.from({ length: 20 * 26 }).map((_, index) => {
                  const col = index % 20;
                  const row = Math.floor(index / 20);

                  return (
                    <span
                      key={`pixel-${index}`}
                      data-gab-pixel
                      className="gab-pixel"
                      style={{
                        backgroundPosition: `${(col / 19) * 100}% ${(row / 25) * 100}%`,
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <div className="absolute inset-[16px] border border-white/14 md:inset-[22px]" />

            <p className="absolute left-7 top-7 text-[7px] uppercase tracking-[.28em] text-white/42 md:left-9 md:top-9 md:text-[9px]">
              ID / GC-002
            </p>

            <p className="absolute bottom-7 right-7 text-right text-[7px] uppercase leading-[1.8] tracking-[.28em] text-white/42 md:bottom-9 md:right-9 md:text-[9px]">
              CREATIVE DEVELOPER
              <br />
              OXO / LAB
            </p>
          </div>

          <div className="relative z-20 flex min-h-[82svh] max-w-[78vw] flex-col justify-center pt-20 md:max-w-[72vw] lg:max-w-[64vw]">
            <p
              data-gab-meta
              className="avant-legato-font mb-5 text-[9px] uppercase tracking-[.38em] text-cyan-300 md:text-xs"
            >
              Archivista / Catalogazione Bibliografica
            </p>

            <h1 className="avant-legato-font ombra2 overflow-hidden text-[17vw] uppercase leading-[.64] tracking-[-.09em] md:text-[12vw] lg:text-[9.5vw] [perspective:1200px]">
              <span className="block overflow-hidden pb-[.06em]">
                {"GABRIELE".split("").map((char, index) => (
                  <span
                    key={`gab-${index}`}
                    data-gab-letter
                    className="inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>

              <span className="block overflow-hidden pb-[.06em]">
                {"CHIERICI".split("").map((char, index) => (
                  <span
                    key={`poli-${index}`}
                    data-gab-letter
                    className="inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            <p
              data-gab-meta
              className="avant-legato-font mt-7 max-w-[820px] text-xl leading-snug text-gray-300 md:text-3xl"
            >
              Archivista specializzato in catalogazione bibliografica, ricerca nei cataloghi, SBN, Z39.50 e strutturazione dei record documentali.
            </p>
          </div>

          <div className="relative z-30">
            <div className="mb-3 flex items-center justify-between text-[7px] uppercase tracking-[.3em] text-white/24 md:text-[9px]">
              <span>CATALOGAZIONE / SBN / Z39.50 / UNIMARC</span>
              <span>SCROLL / ENTER SYSTEM ↓</span>
            </div>
            <div className="h-px bg-white/10">
              <div
                data-gab-signal
                className="h-full w-full bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
              />
            </div>
          </div>
        </section>

        {/* =====================================================
            01 / PERSONAL KERNEL
        ====================================================== */}
        <section
          ref={kernelRef}
          className="gab-kernel relative overflow-hidden bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="gab-grid pointer-events-none absolute inset-0 opacity-44" />

          <p
            aria-hidden="true"
            className="gab-kernel-ghost avant-legato-font"
          >
            RECORD / STANDARD / ACCESS
          </p>

          <div className="relative z-10 mb-12 flex items-end justify-between border-b border-white/14 pb-7">
            <p
              data-kernel-meta
              className="avant-legato-font text-[9px] uppercase tracking-[.34em] text-cyan-300 md:text-[11px]"
            >
              01 / PERSONAL KERNEL
            </p>

            <p
              data-kernel-meta
              className="avant-legato-font max-w-[560px] text-right text-[9px] uppercase leading-[1.8] tracking-[.24em] text-white/38 md:text-[11px]"
            >
              CATALOGAZIONE / SBN / Z39.50
              <br />
              ONE BIBLIOGRAPHIC SYSTEM
            </p>
          </div>

          <div className="gab-kernel-shell relative z-10">
            <span
              data-kernel-cursor
              className="gab-kernel-cursor"
              aria-hidden="true"
            />

            <div className="py-16">
              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="gab-kernel-word avant-legato-font ombra2"
                >
                  READ
                </h2>
              </div>

              <div data-kernel-bar className="gab-kernel-bar my-6" />

              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="gab-kernel-word gab-kernel-outline avant-legato-font ombra2 text-right"
                >
                  ORDER
                </h2>
              </div>

              <div data-kernel-bar className="gab-kernel-bar my-6" />

              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="gab-kernel-word avant-legato-font ombra2"
                >
                  CONNECT
                </h2>
              </div>
            </div>

            <div className="absolute bottom-5 left-0 right-0 flex items-end justify-between text-[7px] uppercase tracking-[.26em] text-white/25 md:text-[9px]">
              <span data-kernel-meta>
                DOCUMENT → RECORD → CATALOGUE → ACCESS
              </span>
              <span data-kernel-meta>
                CATALOGAZIONE / SBN / Z39.50
              </span>
            </div>
          </div>
        </section>

        {/* =====================================================
            CURRENT BUILD
        ====================================================== */}
        <section
          ref={projectRef}
          className="relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="gab-grid pointer-events-none absolute inset-0 opacity-42" />

          <div className="relative z-10 mb-16 grid gap-10 border-b border-white/14 pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-cyan-300 md:text-xs">
                02 / EXPERIENCE
              </p>

              <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
                CATALOGUE
                <br />
                EXPERIENCE.
              </h2>
            </div>

            <p className="avant-legato-font text-xl leading-snug text-gray-300 md:text-3xl">
              Esperienza professionale in archivistica e catalogazione bibliografica, con particolare attenzione alla struttura dei record e alla ricerca nei cataloghi.
            </p>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-[5vw]">
            <div
              data-project-image
              className="gab-project-image relative aspect-[4/5] overflow-hidden border border-white/14"
            >
              <img
                src="/img/team/gab.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/5 to-black/18" />
              <div className="gab-grid absolute inset-0 opacity-24" />

              <div className="absolute left-6 top-6 text-[8px] uppercase tracking-[.28em] text-white/42">
                ARCHIVE / CATALOGUING
              </div>

              <div className="absolute bottom-6 left-6 right-6 border-t border-white/14 pt-4 text-[8px] uppercase leading-[1.8] tracking-[.28em] text-white/42">
                SBN / Z39.50 / OPAC
                <br />
                FEB 2018 / OCT 2021
              </div>
            </div>

            <div className="self-end border-t border-white/14">
              {BUILD_POINTS.map((point, index) => (
                <div
                  key={point}
                  data-project-row
                  className="grid grid-cols-[52px_1fr] gap-4 border-b border-white/12 py-5 md:grid-cols-[70px_1fr] md:py-6"
                >
                  <span className="text-[8px] tracking-[.28em] text-white/24 md:text-[10px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p className="avant-legato-font text-base leading-snug text-white/74 md:text-xl">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            SECURITY / THREAT SURFACE
        ====================================================== */}
        <section
          ref={securityRef}
          className="relative overflow-hidden border-y border-white/12 bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="gab-grid pointer-events-none absolute inset-0 opacity-44" />

          <div className="relative z-10 mb-14 border-b border-white/14 pb-9">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-fuchsia-400 md:text-xs">
              03 / CATALOGUED BY DESIGN
            </p>

            <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
              CATALOGUED
              <br />
              BY DESIGN.
            </h2>

            <p className="avant-legato-font mt-8 max-w-[880px] text-xl leading-snug text-gray-300 md:text-3xl">
              Catalogare significa trasformare un documento in un record preciso, interrogabile e interoperabile: descrizione, standard e accesso diventano un unico sistema.
            </p>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="gab-security-field">
              <div data-security-core className="gab-security-core">
                <div
                  className="gab-electric-archive"
                  aria-label="Catalogued by design — archive and bibliographic record system"
                >
                  <svg
                    className="gab-archive-svg"
                    viewBox="0 0 460 420"
                    role="img"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="gabArchiveGradient"
                        x1="50"
                        y1="210"
                        x2="410"
                        y2="210"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#35d8ff" />
                        <stop offset=".5" stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#ff4fd8" />
                      </linearGradient>
                    </defs>

                    {/* ARCHIVE CABINET / SHELF STRUCTURE */}
                    <rect
                      className="gab-archive-shelf"
                      x="48"
                      y="72"
                      width="364"
                      height="250"
                      rx="3"
                    />

                    <path
                      className="gab-archive-line"
                      d="M48 147 H412 M48 222 H412"
                    />

                    <path
                      className="gab-archive-line gab-archive-line--cyan"
                      d="M104 72 V322"
                    />
                    <path
                      className="gab-archive-line gab-archive-line--violet"
                      d="M356 72 V322"
                    />

                    {/* BOOK SPINES / RECORDS */}
                    <rect
                      className="gab-archive-book gab-archive-book--cyan"
                      x="64"
                      y="92"
                      width="19"
                      height="48"
                    />
                    <rect
                      className="gab-archive-book gab-archive-book--violet"
                      x="87"
                      y="82"
                      width="14"
                      height="58"
                    />
                    <rect
                      className="gab-archive-book gab-archive-book--pink"
                      x="111"
                      y="95"
                      width="18"
                      height="45"
                    />

                    <rect
                      className="gab-archive-book gab-archive-book--violet"
                      x="330"
                      y="91"
                      width="18"
                      height="49"
                    />
                    <rect
                      className="gab-archive-book gab-archive-book--cyan"
                      x="360"
                      y="84"
                      width="13"
                      height="56"
                    />
                    <rect
                      className="gab-archive-book gab-archive-book--pink"
                      x="381"
                      y="98"
                      width="15"
                      height="42"
                    />

                    <rect
                      className="gab-archive-book gab-archive-book--cyan"
                      x="63"
                      y="164"
                      width="17"
                      height="50"
                    />
                    <rect
                      className="gab-archive-book gab-archive-book--pink"
                      x="86"
                      y="175"
                      width="14"
                      height="39"
                    />

                    <rect
                      className="gab-archive-book gab-archive-book--violet"
                      x="364"
                      y="166"
                      width="15"
                      height="48"
                    />
                    <rect
                      className="gab-archive-book gab-archive-book--cyan"
                      x="384"
                      y="177"
                      width="12"
                      height="37"
                    />

                    {/* OPEN BOOK / CENTRAL RECORD */}
                    <path
                      className="gab-archive-page"
                      d="M230 142
                         C203 124 166 126 137 139
                         V267
                         C170 253 204 255 230 274
                         Z"
                    />
                    <path
                      className="gab-archive-page"
                      d="M230 142
                         C257 124 294 126 323 139
                         V267
                         C290 253 256 255 230 274
                         Z"
                    />

                    <path
                      className="gab-archive-line gab-archive-line--cyan"
                      d="M230 142 V274"
                    />

                    {/* BIBLIOGRAPHIC LINES / LEFT PAGE */}
                    <path
                      className="gab-archive-page-line gab-archive-page-line--accent"
                      d="M154 158 H207"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M154 173 H196"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M154 188 H211"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M154 203 H189"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M154 218 H205"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M154 233 H181"
                    />

                    {/* BIBLIOGRAPHIC LINES / RIGHT PAGE */}
                    <path
                      className="gab-archive-page-line gab-archive-page-line--accent"
                      d="M252 158 H306"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M252 173 H294"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M252 188 H310"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M252 203 H287"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M252 218 H302"
                    />
                    <path
                      className="gab-archive-page-line"
                      d="M252 233 H280"
                    />

                    {/* PROTOCOL / CATALOG CONNECTIONS */}
                    <path
                      className="gab-archive-record gab-archive-record--cyan"
                      d="M76 116 H126 L151 151"
                    />
                    <path
                      className="gab-archive-record gab-archive-record--violet"
                      d="M388 118 H342 L310 151"
                    />
                    <path
                      className="gab-archive-record gab-archive-record--pink"
                      d="M74 190 H120 L151 205"
                    />
                    <path
                      className="gab-archive-record gab-archive-record--cyan"
                      d="M390 192 H340 L309 205"
                    />

                    {/* ELECTRIC DATA SIGNALS */}
                    <path
                      className="gab-archive-electric gab-archive-electric--cyan"
                      d="M65 285
                         L105 277
                         L96 293
                         L141 284
                         L129 304
                         L180 291
                         L168 313
                         L218 296"
                    />

                    <path
                      className="gab-archive-electric gab-archive-electric--violet"
                      d="M395 285
                         L355 277
                         L364 293
                         L319 284
                         L331 304
                         L280 291
                         L292 313
                         L242 296"
                    />

                    {/* CATALOG NETWORK NODES */}
                    <circle
                      className="gab-archive-node gab-archive-node--cyan"
                      cx="76"
                      cy="116"
                      r="3.2"
                    />
                    <circle
                      className="gab-archive-node gab-archive-node--violet"
                      cx="388"
                      cy="118"
                      r="3.2"
                    />
                    <circle
                      className="gab-archive-node gab-archive-node--pink"
                      cx="74"
                      cy="190"
                      r="3"
                    />
                    <circle
                      className="gab-archive-node gab-archive-node--cyan"
                      cx="390"
                      cy="192"
                      r="3"
                    />

                    <circle
                      className="gab-archive-node gab-archive-node--violet"
                      cx="151"
                      cy="151"
                      r="3"
                    />
                    <circle
                      className="gab-archive-node gab-archive-node--pink"
                      cx="310"
                      cy="151"
                      r="3"
                    />

                    <circle
                      className="gab-archive-node gab-archive-node--cyan"
                      cx="230"
                      cy="142"
                      r="3.6"
                    />
                    <circle
                      className="gab-archive-node gab-archive-node--violet"
                      cx="230"
                      cy="274"
                      r="3.4"
                    />

                    {/* lower catalogue rail */}
                    <path
                      className="gab-archive-line gab-archive-line--cyan"
                      d="M78 342 H382"
                    />
                    <path
                      className="gab-archive-record gab-archive-record--violet"
                      d="M118 342 H180 M206 342 H254 M282 342 H344"
                    />
                  </svg>

                  <span className="gab-archive-scanline" />

                  <span className="gab-archive-tag gab-archive-tag--sbn">
                    SBN
                  </span>

                  <span className="gab-archive-tag gab-archive-tag--z3950">
                    Z39.50
                  </span>

                  <span className="gab-archive-tag gab-archive-tag--unimarc">
                    UNIMARC
                  </span>

                  <span className="gab-archive-tag gab-archive-tag--marc">
                    MARC 21
                  </span>

                  <p className="gab-archive-meta avant-legato-font">
                    <strong>CATALOGUED BY DESIGN</strong>
                    Record / Standard / Access
                  </p>
                </div>
              </div>

              {SECURITY_NODES.map(([a, b, left, top, accent], index) => (
                <div
                  key={`${a}-${b}`}
                  data-security-node
                  className="gab-security-node"
                  style={{ left, top }}
                >
                  <span
                    className="mb-3 block h-2 w-2 border"
                    style={{ borderColor: accent }}
                  />
                  <p
                    className="text-[7px] uppercase tracking-[.28em]"
                    style={{ color: accent }}
                  >
                    {a}
                  </p>
                  <p className="avant-legato-font mt-1 text-sm uppercase text-white/68">
                    {b}
                  </p>
                </div>
              ))}

              {[16, 48, 78, 128, 205, 292].map((deg, index) => (
                <span
                  key={deg}
                  data-security-line
                  className="gab-security-line"
                  style={{ transform: `rotate(${deg}deg)` }}
                />
              ))}

              <p className="absolute bottom-5 left-5 text-[7px] uppercase tracking-[.28em] text-white/24 md:text-[9px]">
                RECORD / IN / CONTEXT
              </p>

              <p className="absolute bottom-5 right-5 text-right text-[7px] uppercase tracking-[.28em] text-white/24 md:text-[9px]">
                CATALOGUE / CONNECTED
              </p>
            </div>

            <div className="border-t border-white/14">
              {SECURITY_POINTS.map((item, index) => (
                <div
                  key={item}
                  data-security-row
                  className="grid grid-cols-[48px_1fr] gap-4 border-b border-white/12 py-4"
                >
                  <span className="text-[8px] tracking-[.26em] text-white/22">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="avant-legato-font text-sm uppercase tracking-[.04em] text-white/62 md:text-base">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            STACK / BIBLIOGRAPHIC SYSTEMS LANES
        ====================================================== */}
        <section
          ref={stackRef}
          className="relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="gab-grid pointer-events-none absolute inset-0 opacity-42" />

          <div className="relative z-10 mb-14 border-b border-white/14 pb-9">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-emerald-300 md:text-xs">
              04 / BIBLIOGRAPHIC SYSTEMS
            </p>

            <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
              RECORDS
              <br />
              IN MOTION.
            </h2>
          </div>

          <div className="relative z-10">
            {STACK_LANES.map((lane, index) => (
              <article
                key={lane.title}
                data-stack-lane
                className="gab-stack-lane"
              >
                <div>
                  <p
                    className="avant-legato-font text-[8px] uppercase tracking-[.30em] md:text-[10px]"
                    style={{ color: lane.accent }}
                  >
                    {String(index + 1).padStart(2, "0")} / LANE
                  </p>

                  <h3 className="avant-legato-font mt-4 text-3xl uppercase leading-[.82] tracking-[-.05em] md:text-5xl">
                    {lane.title}
                  </h3>
                </div>

                <div className="gab-stack-marquee">
                  {lane.items.map((item) => (
                    <span key={item} className="gab-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            <div className="gab-stack-lane border-b border-white/14">
              <div>
                <p className="avant-legato-font text-[8px] uppercase tracking-[.30em] text-cyan-300 md:text-[10px]">
                  05 / METHOD
                </p>

                <h3 className="avant-legato-font mt-4 text-3xl uppercase leading-[.82] tracking-[-.05em] md:text-5xl">
                  METHOD
                </h3>
              </div>

              <div className="gab-stack-marquee">
                {[
                  "Descrivere",
                  "Normalizzare",
                  "Verificare",
                  "Collegare",
                  "Ricercare",
                  "Catalogare",
                ].map((item) => (
                  <span key={item} className="gab-pill">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL
        ====================================================== */}
        <section
          ref={finalRef}
          className="gab-noise relative flex min-h-[92svh] items-end overflow-hidden border-t border-white/12 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="gab-grid pointer-events-none absolute inset-0 opacity-46" />

          <div className="pointer-events-none absolute left-1/2 top-[18%] h-[30vw] w-[72vw] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(53,216,255,.10),rgba(139,92,246,.12),rgba(32,240,199,.08))] blur-[110px]" />

          <div className="relative z-10 w-full">
            <div
              data-gab-final-meta
              className="mb-8 flex items-center justify-between border-b border-white/18 pb-5 text-[9px] uppercase tracking-[.31em] text-white/34 md:text-[11px]"
            >
              <span>GABRIELE CHIERICI / OXO STUDIO</span>
              <span>CATALOGAZIONE / SBN / Z39.50</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[15vw] uppercase leading-[.69] tracking-[-.085em] md:text-[11.8vw] lg:text-[9.2vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="ORDER."
                  attribute="data-gab-final-letter"
                />
              </span>

              <span className="block overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="CONNECT."
                  attribute="data-gab-final-letter"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/18 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                data-gab-final-meta
                className="avant-legato-font max-w-[860px] text-xl leading-snug text-gray-300 md:text-3xl"
              >
                Documenti, standard e metadati trasformati in informazione bibliografica accessibile.
              </p>

              <div
                data-gab-final-meta
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/ChiSiamo"
                  className="avant-legato-font inline-flex items-center gap-4 border border-white/22 px-5 py-4 text-[10px] uppercase tracking-[.28em] text-white"
                >
                  ← Team
                </Link>

                <Link
                  to="/Contatti"
                  className="avant-legato-font inline-flex items-center gap-4 border border-white/30 bg-white/[0.035] px-5 py-4 text-[10px] uppercase tracking-[.28em] text-white"
                >
                  Contatti ↗
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
