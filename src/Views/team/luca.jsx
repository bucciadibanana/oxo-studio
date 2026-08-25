import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

gsap.registerPlugin(ScrollTrigger);

const SECURITY_NODES = [
  ["LENS", "FOCUS", "10%", "18%", "#35d8ff"],
  ["LIGHT", "EXPOSURE", "26%", "70%", "#8b5cf6"],
  ["FRAME", "COMPOSITION", "48%", "22%", "#20f0c7"],
  ["MOTION", "CAMERA", "68%", "70%", "#ff4fd8"],
  ["EDIT", "RHYTHM", "82%", "20%", "#35d8ff"],
  ["STORY", "TASTE", "88%", "54%", "#8b5cf6"],
];

const STACK_LANES = [
  {
    title: "FILMMAKING",
    accent: "#35d8ff",
    items: [
      "Regia",
      "Riprese",
      "Visual storytelling",
      "Camera movement",
      "Scena",
      "Atmosfera",
    ],
  },
  {
    title: "PHOTOGRAPHY",
    accent: "#8b5cf6",
    items: [
      "Fotografia",
      "Luce",
      "Composizione",
      "Ritratto",
      "Frame",
      "Visual identity",
    ],
  },
  {
    title: "EDITING",
    accent: "#20f0c7",
    items: [
      "Montaggio",
      "Ritmo",
      "Sequenza",
      "Timing",
      "Transizioni",
      "Continuity",
    ],
  },
  {
    title: "INFLUENCES",
    accent: "#ff4fd8",
    items: [
      "Cinema",
      "Videogiochi",
      "Musica",
      "Fotografia",
      "Arte",
      "Contaminazione",
    ],
  },
];

const BUILD_POINTS = [
  "Regia e costruzione della scena",
  "Riprese e ricerca dell’inquadratura",
  "Montaggio e costruzione del ritmo",
  "Fotografia e controllo della luce",
  "Ricerca di nuovi linguaggi visivi",
  "Contaminazione tra cinema, videogiochi, musica e arte",
  "Racconto attraverso immagini, movimento e atmosfera",
];

const SECURITY_POINTS = [
  "Regia",
  "Riprese",
  "Montaggio",
  "Fotografia",
  "Composizione",
  "Luce",
  "Camera movement",
  "Visual storytelling",
  "Ritmo",
  "Atmosfera",
  "Cinema",
  "Ricerca visiva",
];

function SplitLetters({ text, attribute = "data-luca-final-letter" }) {
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

export default function Luca() {
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
        hero.querySelectorAll("[data-luca-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-luca-meta]")
      );
      const portrait = hero.querySelector("[data-luca-portrait]");
      const portraitInner = hero.querySelector("[data-luca-portrait-inner]");
      const portraitPixels = gsap.utils.toArray(
        hero.querySelectorAll("[data-luca-pixel]")
      );
      const heroGhost = hero.querySelector("[data-luca-ghost]");
      const heroSignal = hero.querySelector("[data-luca-signal]");
      const heroRuler = hero.querySelector("[data-luca-ruler]");

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
        finalSection.querySelectorAll("[data-luca-final-letter]")
      );
      const finalMeta = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-luca-final-meta]")
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
        className="luca-aww relative overflow-x-hidden bg-[#020203] text-white"
      >
        <style>{`
          .luca-aww,
          .luca-aww * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .luca-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px);
            background-size:62px 62px;
            mask-image:linear-gradient(to bottom,transparent,black 8%,black 92%,transparent);
          }

          .luca-noise::after {
            content:"";
            position:absolute;
            inset:0;
            pointer-events:none;
            opacity:.045;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.93' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode:soft-light;
          }

          .luca-portrait {
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

          .luca-portrait::after {
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

          .luca-portrait:hover::after {
            opacity:.48;
          }

          .luca-portrait-inner {
            position:absolute;
            inset:-3%;
            will-change:transform;
          }

          .luca-pixel-layer {
            position:absolute;
            inset:0;
            z-index:13;
            display:grid;
            grid-template-columns:repeat(20,1fr);
            grid-template-rows:repeat(26,1fr);
            pointer-events:none;
            overflow:hidden;
          }

          .luca-pixel {
            position:relative;
            overflow:hidden;
            opacity:0;
            will-change:transform,opacity,filter;
            background-image:url("/img/team/luca.jpg");
            background-repeat:no-repeat;
            background-size:2000% 2600%;
          }

          .luca-ruler {
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

          .luca-kernel {
            position:relative;
            overflow:hidden;
          }

          .luca-kernel-ghost {
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

          .luca-kernel-shell {
            position:relative;
            min-height:82svh;
            display:grid;
            align-items:center;
            border-top:1px solid rgba(255,255,255,.14);
            border-bottom:1px solid rgba(255,255,255,.14);
          }

          .luca-kernel-word {
            font-size:clamp(4.4rem,12vw,13rem);
            line-height:.62;
            letter-spacing:-.09em;
            text-transform:uppercase;
            will-change:transform,opacity;
          }

          .luca-kernel-outline {
            color:transparent;
            -webkit-text-stroke:1px rgba(255,255,255,.22);
          }

          .luca-kernel-bar {
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

          .luca-kernel-cursor {
            position:absolute;
            left:10%;
            top:50%;
            width:10px;
            height:10px;
            border:1px solid #35d8ff;
            box-shadow:0 0 18px rgba(53,216,255,.2);
          }

          .luca-project-image {
            box-shadow:0 36px 120px rgba(0,0,0,.42);
          }

          .luca-security-field {
            position:relative;
            min-height:680px;
            border:1px solid rgba(255,255,255,.10);
            overflow:hidden;
            background:
              radial-gradient(circle at 50% 50%,rgba(53,216,255,.05),transparent 28%),
              rgba(255,255,255,.008);
          }

          .luca-security-core {
            position:absolute;
            left:50%;
            top:50%;
            width:min(38vw,540px);
            aspect-ratio:1;
            transform:translate(-50%,-50%);
            border:0;
            background:transparent;
            box-shadow:none;
            isolation:isolate;
            overflow:visible;
          }

          .luca-electric-camera {
            position:absolute;
            inset:-8%;
            display:flex;
            align-items:center;
            justify-content:center;
            pointer-events:none;
            filter:
              drop-shadow(0 0 12px rgba(53,216,255,.14))
              drop-shadow(0 0 30px rgba(139,92,246,.10));
          }

          .luca-electric-camera::before {
            content:"";
            position:absolute;
            left:50%;
            top:50%;
            width:82%;
            height:72%;
            transform:translate(-50%,-50%);
            border-radius:42%;
            background:
              radial-gradient(circle at 38% 48%,rgba(53,216,255,.14),transparent 34%),
              radial-gradient(circle at 66% 50%,rgba(139,92,246,.13),transparent 34%),
              radial-gradient(circle at 52% 66%,rgba(255,79,216,.06),transparent 36%);
            filter:blur(32px);
            opacity:.95;
            animation:lucaCameraAura 4.8s ease-in-out infinite;
          }

          .luca-electric-camera::after {
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

          .luca-camera-svg {
            position:relative;
            z-index:4;
            width:100%;
            height:100%;
            overflow:visible;
          }

          .luca-camera-body {
            fill:rgba(2,2,3,.72);
            stroke:rgba(255,255,255,.18);
            stroke-width:1.1;
            vector-effect:non-scaling-stroke;
          }

          .luca-camera-line {
            fill:none;
            stroke-width:1.1;
            vector-effect:non-scaling-stroke;
            stroke-linecap:round;
            stroke-linejoin:round;
          }

          .luca-camera-line--cyan {
            stroke:rgba(53,216,255,.74);
            filter:drop-shadow(0 0 5px rgba(53,216,255,.32));
          }

          .luca-camera-line--violet {
            stroke:rgba(139,92,246,.68);
            filter:drop-shadow(0 0 5px rgba(139,92,246,.30));
          }

          .luca-camera-line--pink {
            stroke:rgba(255,79,216,.58);
            filter:drop-shadow(0 0 5px rgba(255,79,216,.24));
          }

          .luca-camera-circuit {
            fill:none;
            stroke-width:1.1;
            stroke-linecap:round;
            stroke-linejoin:round;
            vector-effect:non-scaling-stroke;
            stroke-dasharray:5 8;
            animation:lucaCameraCircuit 4.2s linear infinite;
          }

          .luca-camera-circuit--cyan { stroke:rgba(53,216,255,.82); }
          .luca-camera-circuit--violet {
            stroke:rgba(139,92,246,.72);
            animation-direction:reverse;
            animation-duration:5s;
          }
          .luca-camera-circuit--pink {
            stroke:rgba(255,79,216,.62);
            animation-duration:3.7s;
          }

          .luca-camera-electric {
            fill:none;
            stroke-width:1.35;
            stroke-linecap:round;
            stroke-linejoin:round;
            vector-effect:non-scaling-stroke;
            stroke-dasharray:2 10;
            animation:lucaCameraElectric 1.7s linear infinite;
          }

          .luca-camera-electric--cyan {
            stroke:#35d8ff;
            filter:
              drop-shadow(0 0 3px rgba(53,216,255,.82))
              drop-shadow(0 0 9px rgba(53,216,255,.32));
          }

          .luca-camera-electric--pink {
            stroke:#ff4fd8;
            animation-delay:-.7s;
            animation-duration:2s;
            filter:
              drop-shadow(0 0 3px rgba(255,79,216,.78))
              drop-shadow(0 0 9px rgba(255,79,216,.3));
          }

          .luca-camera-lens-ring {
            fill:none;
            stroke-width:1;
            vector-effect:non-scaling-stroke;
          }

          .luca-camera-lens-ring--outer {
            stroke:rgba(255,255,255,.17);
          }

          .luca-camera-lens-ring--cyan {
            stroke:rgba(53,216,255,.72);
            stroke-dasharray:10 7;
            animation:lucaLensSpin 6s linear infinite;
            transform-box:fill-box;
            transform-origin:center;
          }

          .luca-camera-lens-ring--violet {
            stroke:rgba(139,92,246,.58);
            stroke-dasharray:3 8;
            animation:lucaLensSpin 4.6s linear infinite reverse;
            transform-box:fill-box;
            transform-origin:center;
          }

          .luca-camera-iris {
            fill:none;
            stroke:rgba(255,255,255,.2);
            stroke-width:.9;
            vector-effect:non-scaling-stroke;
            transform-box:fill-box;
            transform-origin:center;
            animation:lucaIrisPulse 3.2s ease-in-out infinite;
          }

          .luca-camera-node {
            transform-box:fill-box;
            transform-origin:center;
            animation:lucaCameraNode 2.35s ease-in-out infinite;
          }

          .luca-camera-node--cyan {
            fill:#35d8ff;
            filter:drop-shadow(0 0 5px rgba(53,216,255,.9));
          }

          .luca-camera-node--violet {
            fill:#8b5cf6;
            filter:drop-shadow(0 0 5px rgba(139,92,246,.85));
          }

          .luca-camera-node--pink {
            fill:#ff4fd8;
            filter:drop-shadow(0 0 5px rgba(255,79,216,.82));
          }

          .luca-camera-scanline {
            position:absolute;
            z-index:8;
            left:9%;
            right:9%;
            top:20%;
            height:1px;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.08),
                rgba(53,216,255,.9),
                rgba(255,255,255,.68),
                rgba(255,79,216,.46),
                transparent
              );
            box-shadow:
              0 0 9px rgba(53,216,255,.34),
              0 0 20px rgba(139,92,246,.11);
            opacity:0;
            animation:lucaCameraScan 4s cubic-bezier(.45,0,.55,1) infinite;
          }

          .luca-camera-tag {
            position:absolute;
            z-index:9;
            padding:7px 9px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(2,2,3,.78);
            font-size:6px;
            line-height:1;
            letter-spacing:.24em;
            text-transform:uppercase;
            color:rgba(255,255,255,.44);
            backdrop-filter:blur(5px);
          }

          .luca-camera-tag--lens {
            left:6%;
            top:15%;
            color:#35d8ff;
          }

          .luca-camera-tag--light {
            right:5%;
            top:29%;
            color:#8b5cf6;
          }

          .luca-camera-tag--frame {
            left:8%;
            bottom:22%;
            color:#20f0c7;
          }

          .luca-camera-tag--edit {
            right:7%;
            bottom:17%;
            color:#ff4fd8;
          }

          .luca-camera-meta {
            position:absolute;
            z-index:10;
            left:50%;
            bottom:-1%;
            transform:translateX(-50%);
            white-space:nowrap;
            text-align:center;
            font-size:7px;
            line-height:1.8;
            letter-spacing:.30em;
            text-transform:uppercase;
            color:rgba(255,255,255,.34);
          }

          .luca-camera-meta strong {
            display:block;
            color:rgba(255,255,255,.72);
            font-weight:400;
            letter-spacing:.28em;
          }

          @keyframes lucaCameraAura {
            0%,100% {
              transform:translate(-50%,-50%) scale(.95);
              opacity:.72;
            }
            50% {
              transform:translate(-50%,-50%) scale(1.07);
              opacity:1;
            }
          }

          @keyframes lucaCameraCircuit {
            to { stroke-dashoffset:-88; }
          }

          @keyframes lucaCameraElectric {
            0% { stroke-dashoffset:0; opacity:.18; }
            18% { opacity:.95; }
            50% { opacity:.34; }
            78% { opacity:1; }
            100% { stroke-dashoffset:-76; opacity:.2; }
          }

          @keyframes lucaLensSpin {
            to { transform:rotate(360deg); }
          }

          @keyframes lucaIrisPulse {
            0%,100% { transform:scale(.92) rotate(0deg); opacity:.48; }
            50% { transform:scale(1.08) rotate(18deg); opacity:.92; }
          }

          @keyframes lucaCameraNode {
            0%,100% { transform:scale(.72); opacity:.38; }
            50% { transform:scale(1.55); opacity:1; }
          }

          @keyframes lucaCameraScan {
            0% { top:19%; opacity:0; }
            12% { opacity:.7; }
            48% { opacity:.94; }
            88% { opacity:.42; }
            100% { top:81%; opacity:0; }
          }

          .luca-security-node {
            position:absolute;
            width:132px;
            padding:12px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(2,2,3,.72);
            backdrop-filter:blur(6px);
          }

          .luca-security-line {
            position:absolute;
            left:50%;
            top:50%;
            height:1px;
            width:32%;
            transform-origin:left center;
            background:linear-gradient(90deg,rgba(255,255,255,.18),transparent);
          }

          .luca-stack-lane {
            position:relative;
            overflow:hidden;
            border-top:1px solid rgba(255,255,255,.14);
            min-height:180px;
            display:grid;
            grid-template-columns:minmax(170px,.35fr) 1fr;
            align-items:center;
            gap:4vw;
          }

          .luca-stack-marquee {
            display:flex;
            flex-wrap:wrap;
            gap:10px;
          }

          .luca-pill {
            border:1px solid rgba(255,255,255,.11);
            background:rgba(255,255,255,.012);
            padding:10px 12px;
            font-size:8px;
            letter-spacing:.22em;
            text-transform:uppercase;
            color:rgba(255,255,255,.56);
          }

          @media (max-width:767px) {
            .luca-grid { background-size:42px 42px; }

            .luca-portrait {
              position:relative;
              right:auto;
              top:auto;
              width:100%;
              height:62svh;
              margin-top:90px;
            }

            .luca-ruler {
              display:none;
            }

            .luca-security-field {
              min-height:760px;
            }

            .luca-security-core {
              width:min(72vw,330px);
            }

            .luca-camera-meta {
              bottom:-4px;
              font-size:6px;
              letter-spacing:.22em;
            }

            .luca-camera-tag {
              font-size:5px;
              padding:6px 7px;
              letter-spacing:.18em;
            }

            .luca-security-node {
              width:110px;
              padding:9px;
            }

            .luca-stack-lane {
              grid-template-columns:1fr;
              gap:20px;
              padding:28px 0;
            }

            .luca-kernel-shell {
              min-height:72svh;
            }

            .luca-kernel-word {
              font-size:12.2vw;
              line-height:.72;
            }

          }
        `}</style>

        {/* =====================================================
            HERO / IDENTITY SIGNAL
        ====================================================== */}
        <section
          ref={heroRef}
          className="luca-noise relative isolate min-h-[100svh] overflow-hidden bg-[#020203] px-6 pb-8 pt-7 md:px-10 md:pb-10 lg:px-[4vw] lg:pb-[4vh]"
        >
          <div className="luca-grid pointer-events-none absolute inset-0 opacity-58" />

          <div className="pointer-events-none absolute left-[8%] top-[20%] h-[32vw] w-[32vw] rounded-full bg-cyan-400/[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute right-[8%] top-[18%] h-[26vw] w-[26vw] rounded-full bg-violet-500/[0.08] blur-[130px]" />

          <div className="relative z-30 flex items-start justify-between text-[8px] uppercase tracking-[.32em] text-white/34 md:text-[10px]">
            <p data-luca-meta>
              OXO STUDIO®
              <br />
              PERSON / 004
            </p>

           
          </div>

          <div
            data-luca-ruler
            className="luca-ruler"
            aria-hidden="true"
          />

          <p
            data-luca-ghost
            aria-hidden="true"
            className="avant-legato-font pointer-events-none absolute left-[-3vw] top-[36%] z-[2] whitespace-nowrap text-[14vw] uppercase leading-none tracking-[-.08em] text-white/[0.028]"
          >
            LIGHT / FRAME / RHYTHM
          </p>

          <div
            data-luca-portrait
            className="luca-portrait"
          >
            <div
              data-luca-portrait-inner
              className="luca-portrait-inner"
            >
              <img
                src="/img/team/luca.jpg"
                alt="Luca Albani"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/5 to-black/18" />
              <div className="luca-grid absolute inset-0 opacity-24" />

              <div className="luca-pixel-layer" aria-hidden="true">
                {Array.from({ length: 20 * 26 }).map((_, index) => {
                  const col = index % 20;
                  const row = Math.floor(index / 20);

                  return (
                    <span
                      key={`pixel-${index}`}
                      data-luca-pixel
                      className="luca-pixel"
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
              ID / LA-004
            </p>

            <p className="absolute bottom-7 right-7 text-right text-[7px] uppercase leading-[1.8] tracking-[.28em] text-white/42 md:bottom-9 md:right-9 md:text-[9px]">
              FILMMAKER
              <br />
              OXO / VISUAL
            </p>
          </div>

          <div className="relative z-20 flex min-h-[82svh] max-w-[78vw] flex-col justify-center pt-20 md:max-w-[72vw] lg:max-w-[64vw]">
            <p
              data-luca-meta
              className="avant-legato-font mb-5 text-[9px] uppercase tracking-[.38em] text-cyan-300 md:text-xs"
            >
              Filmmaker / Photographer
            </p>

            <h1 className="avant-legato-font ombra2 overflow-hidden text-[13.2vw] uppercase leading-[.66] tracking-[-.085em] md:text-[12vw] lg:text-[9.5vw] [perspective:1200px]">
              <span className="block overflow-hidden pb-[.06em]">
                {"LUCA".split("").map((char, index) => (
                  <span
                    key={`luca-${index}`}
                    data-luca-letter
                    className="inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>

              <span className="block overflow-hidden pb-[.06em]">
                {"ALBANI".split("").map((char, index) => (
                  <span
                    key={`albani-${index}`}
                    data-luca-letter
                    className="inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            <p
              data-luca-meta
              className="avant-legato-font mt-7 max-w-[820px] text-xl leading-snug text-gray-300 md:text-3xl"
            >
              Filmmaker appassionato di cinema, videogiochi, musica, fotografia e arte. Si muove tra regia, riprese e montaggio, cercando nuovi linguaggi, contaminazioni e modi di raccontare.
            </p>

            <p
              data-luca-meta
              className="avant-legato-font mt-7 max-w-[760px] border-l border-cyan-300/35 pl-5 text-base italic leading-relaxed text-white/62 md:text-xl"
            >
              “Il cinema non è un pezzo di vita, è un pezzo di torta.” — Alfred Hitchcock
            </p>
          </div>

          <div className="relative z-30">
            <div className="mb-3 flex items-center justify-between text-[7px] uppercase tracking-[.3em] text-white/24 md:text-[9px]">
              <span>FILM / PHOTO / EDIT / STORY</span>
              <span>SCROLL / ENTER SYSTEM ↓</span>
            </div>
            <div className="h-px bg-white/10">
              <div
                data-luca-signal
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
          className="luca-kernel relative overflow-hidden bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="luca-grid pointer-events-none absolute inset-0 opacity-44" />

          <p
            aria-hidden="true"
            className="luca-kernel-ghost avant-legato-font"
          >
            REALITY / FRAME / TASTE
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
              REGIA / RIPRESE / MONTAGGIO
              <br />
              ONE VISUAL LANGUAGE
            </p>
          </div>

          <div className="luca-kernel-shell relative z-10">
            <span
              data-kernel-cursor
              className="luca-kernel-cursor"
              aria-hidden="true"
            />

            <div className="py-16">
              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="luca-kernel-word avant-legato-font ombra2"
                >
                  READ
                </h2>
              </div>

              <div data-kernel-bar className="luca-kernel-bar my-6" />

              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="luca-kernel-word luca-kernel-outline avant-legato-font ombra2 whitespace-nowrap text-right"
                >
                  ORDER
                </h2>
              </div>

              <div data-kernel-bar className="luca-kernel-bar my-6" />

              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="luca-kernel-word avant-legato-font ombra2"
                >
                  CONNECT
                </h2>
              </div>
            </div>

            <div className="absolute bottom-5 left-0 right-0 flex items-end justify-between text-[7px] uppercase tracking-[.26em] text-white/25 md:text-[9px]">
              <span data-kernel-meta>
                REALITY → FRAME → CUT → STORY
              </span>
              <span data-kernel-meta>
                REGIA / RIPRESE / MONTAGGIO
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
          <div className="luca-grid pointer-events-none absolute inset-0 opacity-42" />

          <div className="relative z-10 mb-16 grid gap-10 border-b border-white/14 pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-cyan-300 md:text-xs">
                02 / CREATIVE PRACTICE
              </p>

              <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
                VISUAL
                <br />
                PRACTICE.
              </h2>
            </div>

            <p className="avant-legato-font text-xl leading-snug text-gray-300 md:text-3xl">
              Prendere qualcosa dalla realtà, mescolarlo con immaginazione, gusto personale e curiosità, e trasformarlo in qualcosa da condividere.
            </p>
              <blockquote className="avant-legato-font mt-7 max-w-[820px] border-l border-cyan-300/40 pl-5 text-base italic leading-relaxed text-white/68 md:pl-7 md:text-xl">
                “Il cinema non è un pezzo di vita, è un pezzo di torta.” — Alfred Hitchcock
              </blockquote>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-[5vw]">
            <div
              data-project-image
              className="luca-project-image relative aspect-[4/5] overflow-hidden border border-white/14"
            >
              <img
                src="/img/team/luca.jpg"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/5 to-black/18" />
              <div className="luca-grid absolute inset-0 opacity-24" />

              <div className="absolute left-6 top-6 text-[8px] uppercase tracking-[.28em] text-white/42">
                FILM / PHOTOGRAPHY
              </div>

              <div className="absolute bottom-6 left-6 right-6 border-t border-white/14 pt-4 text-[8px] uppercase leading-[1.8] tracking-[.28em] text-white/42">
                DIRECT / SHOOT / EDIT
                <br />
                CINEMA / MUSIC / GAME / ART
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
            VISUAL SYSTEM / CAMERA FIELD
        ====================================================== */}
        <section
          ref={securityRef}
          className="relative overflow-hidden border-y border-white/12 bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="luca-grid pointer-events-none absolute inset-0 opacity-44" />

          <div className="relative z-10 mb-14 border-b border-white/14 pb-9">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-fuchsia-400 md:text-xs">
              03 / VISUALD BY DESIGN
            </p>

            <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
              VISUALD
              <br />
              BY DESIGN.
            </h2>

            <p className="avant-legato-font mt-8 max-w-[880px] text-xl leading-snug text-gray-300 md:text-3xl">
              Inquadrare significa scegliere cosa lasciare dentro e cosa lasciare fuori. Luce, ottica, movimento e ritmo diventano un unico sistema narrativo.
            </p>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="luca-security-field">
              <div data-security-core className="luca-security-core">
                <div
                  className="luca-electric-camera"
                  aria-label="Framed by design — cinematic camera system"
                >
                  <svg
                    className="luca-camera-svg"
                    viewBox="0 0 480 420"
                    role="img"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="lucaCameraGradient"
                        x1="60"
                        y1="210"
                        x2="420"
                        y2="210"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#35d8ff" />
                        <stop offset=".5" stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#ff4fd8" />
                      </linearGradient>
                    </defs>

                    {/* CINEMA CAMERA BODY */}
                    <path
                      className="luca-camera-body"
                      d="M102 132
                         H304
                         C324 132 336 145 336 165
                         V286
                         C336 305 324 318 304 318
                         H102
                         C82 318 70 305 70 286
                         V165
                         C70 145 82 132 102 132Z"
                    />

                    {/* TOP HOUSING / VIEWFINDER */}
                    <path
                      className="luca-camera-body"
                      d="M130 102 H228 L248 132 H112Z"
                    />
                    <rect
                      className="luca-camera-body"
                      x="248"
                      y="104"
                      width="54"
                      height="28"
                      rx="4"
                    />

                    {/* LENS BARREL */}
                    <path
                      className="luca-camera-body"
                      d="M336 178 H382
                         C399 178 410 190 410 207
                         V245
                         C410 262 399 274 382 274
                         H336Z"
                    />

                    {/* MAIN LENS */}
                    <circle
                      className="luca-camera-lens-ring luca-camera-lens-ring--outer"
                      cx="382"
                      cy="226"
                      r="61"
                    />
                    <circle
                      className="luca-camera-lens-ring luca-camera-lens-ring--cyan"
                      cx="382"
                      cy="226"
                      r="48"
                    />
                    <circle
                      className="luca-camera-lens-ring luca-camera-lens-ring--violet"
                      cx="382"
                      cy="226"
                      r="35"
                    />

                    {/* IRIS */}
                    <path
                      className="luca-camera-iris"
                      d="M382 194
                         L398 206
                         L400 226
                         L390 243
                         L372 251
                         L355 241
                         L349 223
                         L358 205
                         Z"
                    />
                    <circle
                      cx="382"
                      cy="226"
                      r="10"
                      fill="rgba(53,216,255,.08)"
                      stroke="rgba(255,255,255,.18)"
                      strokeWidth="1"
                    />

                    {/* SENSOR / INTERNAL FRAME */}
                    <rect
                      className="luca-camera-line luca-camera-line--cyan"
                      x="112"
                      y="176"
                      width="130"
                      height="92"
                      rx="2"
                    />
                    <rect
                      className="luca-camera-line luca-camera-line--violet"
                      x="130"
                      y="192"
                      width="94"
                      height="60"
                      rx="1"
                    />

                    {/* RULE OF THIRDS */}
                    <path
                      className="luca-camera-line"
                      stroke="rgba(255,255,255,.10)"
                      d="M161 192 V252 M193 192 V252 M130 212 H224 M130 232 H224"
                    />

                    {/* INTERNAL SIGNAL CIRCUITS */}
                    <path
                      className="luca-camera-circuit luca-camera-circuit--cyan"
                      d="M93 157 H128 L145 174"
                    />
                    <path
                      className="luca-camera-circuit luca-camera-circuit--violet"
                      d="M84 289 H128 L151 268"
                    />
                    <path
                      className="luca-camera-circuit luca-camera-circuit--pink"
                      d="M242 174 H286 L316 194"
                    />
                    <path
                      className="luca-camera-circuit luca-camera-circuit--cyan"
                      d="M242 270 H286 L317 252"
                    />

                    {/* CAMERA HANDLE / BASE */}
                    <path
                      className="luca-camera-line luca-camera-line--violet"
                      d="M140 318 V343 H264 V318"
                    />
                    <path
                      className="luca-camera-line luca-camera-line--cyan"
                      d="M108 343 H294"
                    />

                    {/* ELECTRIC SIGNALS */}
                    <path
                      className="luca-camera-electric luca-camera-electric--cyan"
                      d="M72 218
                         L103 207
                         L94 227
                         L126 218
                         L116 241
                         L150 229"
                    />

                    <path
                      className="luca-camera-electric luca-camera-electric--pink"
                      d="M409 186
                         L431 176
                         L423 195
                         L452 185
                         L442 207"
                    />

                    {/* NODES */}
                    <circle className="luca-camera-node luca-camera-node--cyan" cx="93" cy="157" r="3.2" />
                    <circle className="luca-camera-node luca-camera-node--violet" cx="84" cy="289" r="3.2" />
                    <circle className="luca-camera-node luca-camera-node--pink" cx="242" cy="174" r="3.2" />
                    <circle className="luca-camera-node luca-camera-node--cyan" cx="242" cy="270" r="3.2" />
                    <circle className="luca-camera-node luca-camera-node--violet" cx="382" cy="226" r="3.8" />
                    <circle className="luca-camera-node luca-camera-node--pink" cx="177" cy="222" r="3" />
                  </svg>

                  <span className="luca-camera-scanline" />

                  <span className="luca-camera-tag luca-camera-tag--lens">
                    LENS / FOCUS
                  </span>

                  <span className="luca-camera-tag luca-camera-tag--light">
                    LIGHT / EXPOSURE
                  </span>

                  <span className="luca-camera-tag luca-camera-tag--frame">
                    FRAME / COMPOSITION
                  </span>

                  <span className="luca-camera-tag luca-camera-tag--edit">
                    EDIT / RHYTHM
                  </span>

                  <p className="luca-camera-meta avant-legato-font">
                    <strong>FRAMED BY DESIGN</strong>
                    Light / Motion / Story
                  </p>
                </div>
              </div>

              {SECURITY_NODES.map(([a, b, left, top, accent], index) => (
                <div
                  key={`${a}-${b}`}
                  data-security-node
                  className="luca-security-node"
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
                  className="luca-security-line"
                  style={{ transform: `rotate(${deg}deg)` }}
                />
              ))}

              <p className="absolute bottom-5 left-5 text-[7px] uppercase tracking-[.28em] text-white/24 md:text-[9px]">
                LIGHT / IN / FRAME
              </p>

              <p className="absolute bottom-5 right-5 text-right text-[7px] uppercase tracking-[.28em] text-white/24 md:text-[9px]">
                VISUAL / CONNECTED
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
            STACK / VISUAL SYSTEMS LANES
        ====================================================== */}
        <section
          ref={stackRef}
          className="relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="luca-grid pointer-events-none absolute inset-0 opacity-42" />

          <div className="relative z-10 mb-14 border-b border-white/14 pb-9">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-emerald-300 md:text-xs">
              04 / VISUAL SYSTEMS
            </p>

            <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
              IMAGES
              <br />
              IN MOTION.
            </h2>
          </div>

          <div className="relative z-10">
            {STACK_LANES.map((lane, index) => (
              <article
                key={lane.title}
                data-stack-lane
                className="luca-stack-lane"
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

                <div className="luca-stack-marquee">
                  {lane.items.map((item) => (
                    <span key={item} className="luca-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            <div className="luca-stack-lane border-b border-white/14">
              <div>
                <p className="avant-legato-font text-[8px] uppercase tracking-[.30em] text-cyan-300 md:text-[10px]">
                  05 / METHOD
                </p>

                <h3 className="avant-legato-font mt-4 text-3xl uppercase leading-[.82] tracking-[-.05em] md:text-5xl">
                  METHOD
                </h3>
              </div>

              <div className="luca-stack-marquee">
                {[
                  "Descrivere",
                  "Normalizzare",
                  "Verificare",
                  "Collegare",
                  "Ricercare",
                  "Catalogare",
                ].map((item) => (
                  <span key={item} className="luca-pill">
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
          className="luca-noise relative flex min-h-[92svh] items-end overflow-hidden border-t border-white/12 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="luca-grid pointer-events-none absolute inset-0 opacity-46" />

          <div className="pointer-events-none absolute left-1/2 top-[18%] h-[30vw] w-[72vw] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(53,216,255,.10),rgba(139,92,246,.12),rgba(32,240,199,.08))] blur-[110px]" />

          <div className="relative z-10 w-full">
            <div
              data-luca-final-meta
              className="mb-8 flex items-center justify-between border-b border-white/18 pb-5 text-[9px] uppercase tracking-[.31em] text-white/34 md:text-[11px]"
            >
              <span>LUCA ALBANI / OXO STUDIO</span>
              <span>REGIA / RIPRESE / MONTAGGIO</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[12.2vw] uppercase leading-[.69] tracking-[-.085em] md:text-[11.8vw] lg:text-[9.2vw] [perspective:1000px]">
              <span className="block whitespace-nowrap overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="FRAME."
                  attribute="data-luca-final-letter"
                />
              </span>

              <span className="block whitespace-nowrap overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="TELL."
                  attribute="data-luca-final-letter"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/18 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                data-luca-final-meta
                className="avant-legato-font max-w-[860px] text-xl leading-snug text-gray-300 md:text-3xl"
              >
                Cinema, fotografia, musica e videogiochi: cambia il mezzo, non la sostanza. Raccontare qualcosa che lasci un sapore.
              </p>

              <div
                data-luca-final-meta
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/chisiamo"
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
