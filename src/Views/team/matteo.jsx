import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

gsap.registerPlugin(ScrollTrigger);

const SECURITY_NODES = [
  ["AUTH", "CLERK", "12%", "20%", "#35d8ff"],
  ["TENANT", "ISOLATION", "28%", "66%", "#8b5cf6"],
  ["INPUT", "VALIDATION", "48%", "28%", "#20f0c7"],
  ["HMAC", "SHA-256", "64%", "70%", "#ff4fd8"],
  ["UPLOAD", "SECURITY", "78%", "24%", "#35d8ff"],
  ["SECRETS", "ENV", "88%", "62%", "#8b5cf6"],
];

const STACK_LANES = [
  {
    title: "AI / OCR",
    accent: "#35d8ff",
    items: [
      "Tesseract OCR",
      "OpenCV",
      "Pillow",
      "Image preprocessing",
      "Denoise",
      "Contrast",
      "Sharpening",
      "ROI detection",
      "PDF processing",
      "RegEx / heuristics",
      "AI document processing",
      "ML microservices",
    ],
  },
  {
    title: "BACKEND",
    accent: "#8b5cf6",
    items: [
      "Python",
      "FastAPI",
      "Flask",
      "PHP",
      "Laravel",
      "REST API",
      "Pydantic",
      "OOP",
      "SQL",
      "MongoDB",
      "Supabase",
    ],
  },
  {
    title: "FRONTEND",
    accent: "#20f0c7",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "WebGL",
      "Zod",
    ],
  },
  {
    title: "DEVOPS / ARCHITECTURE",
    accent: "#ff4fd8",
    items: [
      "Docker",
      "Docker Compose",
      "Nginx",
      "Git",
      "SaaS multi-tenant",
      "Microservices",
      "API Gateway",
      "Production deploy",
      "Environment management",
    ],
  },
];

const BUILD_POINTS = [
  "Estrazione automatica da documenti, frontespizi e copertine",
  "OCR con denoise, contrasto, sharpening e ROI detection",
  "Parsing con euristiche, RegEx e modelli AI",
  "Autocompilazione di form strutturati",
  "Integrazione con servizi bibliografici e Z39.50",
  "Frontend, API backend e servizio ML indipendente",
  "Elaborazione asincrona e gestione controllata dei risultati",
  "Deployment con Docker e Nginx",
];

const SECURITY_POINTS = [
  "Clerk route protection",
  "Organization authorization",
  "Tenant isolation",
  "Zod + Pydantic validation",
  "HMAC-SHA256 service auth",
  "API protection",
  "Upload validation",
  "Environment secrets",
  "Microservice separation",
  "Data sanitization",
  "Firewall / bot protection",
  "Dependency monitoring",
];

function SplitLetters({ text, attribute = "data-matteo-final-letter" }) {
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

export default function Matteo() {
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
        hero.querySelectorAll("[data-matteo-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-matteo-meta]")
      );
      const portrait = hero.querySelector("[data-matteo-portrait]");
      const portraitInner = hero.querySelector("[data-matteo-portrait-inner]");
      const portraitPixels = gsap.utils.toArray(
        hero.querySelectorAll("[data-matteo-pixel]")
      );
      const heroGhost = hero.querySelector("[data-matteo-ghost]");
      const heroSignal = hero.querySelector("[data-matteo-signal]");
      const heroRuler = hero.querySelector("[data-matteo-ruler]");

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
        finalSection.querySelectorAll("[data-matteo-final-letter]")
      );
      const finalMeta = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-matteo-final-meta]")
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
        className="matteo-aww relative overflow-x-hidden bg-[#020203] text-white"
      >
        <style>{`
          .matteo-aww,
          .matteo-aww * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .matteo-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.026) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.026) 1px, transparent 1px);
            background-size:62px 62px;
            mask-image:linear-gradient(to bottom,transparent,black 8%,black 92%,transparent);
          }

          .matteo-noise::after {
            content:"";
            position:absolute;
            inset:0;
            pointer-events:none;
            opacity:.045;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.93' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode:soft-light;
          }

          .matteo-portrait {
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

          .matteo-portrait::after {
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

          .matteo-portrait:hover::after {
            opacity:.48;
          }

          .matteo-portrait-inner {
            position:absolute;
            inset:-3%;
            will-change:transform;
          }

          .matteo-pixel-layer {
            position:absolute;
            inset:0;
            z-index:13;
            display:grid;
            grid-template-columns:repeat(20,1fr);
            grid-template-rows:repeat(26,1fr);
            pointer-events:none;
            overflow:hidden;
          }

          .matteo-pixel {
            position:relative;
            overflow:hidden;
            opacity:0;
            will-change:transform,opacity,filter;
            background-image:url("/img/team/matte2.png");
            background-repeat:no-repeat;
            background-size:2000% 2600%;
          }

          .matteo-ruler {
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

          .matteo-kernel {
            position:relative;
            overflow:hidden;
          }

          .matteo-kernel-ghost {
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

          .matteo-kernel-shell {
            position:relative;
            min-height:82svh;
            display:grid;
            align-items:center;
            border-top:1px solid rgba(255,255,255,.14);
            border-bottom:1px solid rgba(255,255,255,.14);
          }

          .matteo-kernel-word {
            font-size:clamp(4.4rem,12vw,13rem);
            line-height:.62;
            letter-spacing:-.09em;
            text-transform:uppercase;
            will-change:transform,opacity;
          }

          .matteo-kernel-outline {
            color:transparent;
            -webkit-text-stroke:1px rgba(255,255,255,.22);
          }

          .matteo-kernel-bar {
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

          .matteo-kernel-cursor {
            position:absolute;
            left:10%;
            top:50%;
            width:10px;
            height:10px;
            border:1px solid #35d8ff;
            box-shadow:0 0 18px rgba(53,216,255,.2);
          }

          .matteo-project-image {
            box-shadow:0 36px 120px rgba(0,0,0,.42);
          }

          .matteo-security-field {
            position:relative;
            min-height:680px;
            border:1px solid rgba(255,255,255,.10);
            overflow:hidden;
            background:
              radial-gradient(circle at 50% 50%,rgba(53,216,255,.05),transparent 28%),
              rgba(255,255,255,.008);
          }

          .matteo-security-core {
            position:absolute;
            left:50%;
            top:50%;
            width:min(30vw,430px);
            aspect-ratio:1;
            transform:translate(-50%,-50%);
            border:0;
            background:transparent;
            box-shadow:none;
            isolation:isolate;
            overflow:visible;
          }

          .matteo-electric-brain {
            position:absolute;
            inset:-8%;
            display:flex;
            align-items:center;
            justify-content:center;
            pointer-events:none;
            filter:
              drop-shadow(0 0 10px rgba(53,216,255,.16))
              drop-shadow(0 0 28px rgba(139,92,246,.11));
          }

          .matteo-electric-brain::before {
            content:"";
            position:absolute;
            left:50%;
            top:50%;
            width:78%;
            height:72%;
            transform:translate(-50%,-50%);
            border-radius:50%;
            background:
              radial-gradient(circle at 38% 43%,rgba(53,216,255,.15),transparent 34%),
              radial-gradient(circle at 66% 48%,rgba(139,92,246,.13),transparent 36%),
              radial-gradient(circle at 52% 64%,rgba(255,79,216,.07),transparent 32%);
            filter:blur(28px);
            opacity:.95;
            animation:matteoBrainAura 4.8s ease-in-out infinite;
          }

          .matteo-electric-brain::after {
            content:"";
            position:absolute;
            left:50%;
            top:50%;
            width:91%;
            height:91%;
            transform:translate(-50%,-50%);
            border-radius:50%;
            border:1px solid rgba(255,255,255,.035);
            box-shadow:
              0 0 0 2.6vw rgba(53,216,255,.006),
              0 0 0 5.2vw rgba(139,92,246,.004);
          }

          .matteo-brain-svg {
            position:relative;
            z-index:4;
            width:88%;
            height:88%;
            overflow:visible;
          }

          .matteo-brain-outline {
            fill:none;
            stroke:rgba(255,255,255,.13);
            stroke-width:1.15;
            vector-effect:non-scaling-stroke;
          }

          .matteo-brain-outline--cyan {
            stroke:rgba(53,216,255,.44);
            filter:drop-shadow(0 0 4px rgba(53,216,255,.25));
          }

          .matteo-brain-outline--violet {
            stroke:rgba(139,92,246,.36);
            filter:drop-shadow(0 0 4px rgba(139,92,246,.24));
          }

          .matteo-brain-circuit {
            fill:none;
            stroke-width:1.15;
            vector-effect:non-scaling-stroke;
            stroke-linecap:round;
            stroke-linejoin:round;
            stroke-dasharray:5 8;
            animation:matteoBrainCircuit 4.6s linear infinite;
          }

          .matteo-brain-circuit--cyan {
            stroke:rgba(53,216,255,.72);
            filter:drop-shadow(0 0 5px rgba(53,216,255,.36));
          }

          .matteo-brain-circuit--violet {
            stroke:rgba(139,92,246,.66);
            animation-direction:reverse;
            animation-duration:5.3s;
            filter:drop-shadow(0 0 5px rgba(139,92,246,.32));
          }

          .matteo-brain-circuit--pink {
            stroke:rgba(255,79,216,.55);
            animation-duration:3.8s;
            filter:drop-shadow(0 0 5px rgba(255,79,216,.28));
          }

          .matteo-brain-electric {
            fill:none;
            stroke-width:1.35;
            vector-effect:non-scaling-stroke;
            stroke-linecap:round;
            stroke-linejoin:round;
            stroke-dasharray:2 11;
            animation:matteoBrainElectric 1.65s linear infinite;
          }

          .matteo-brain-electric--cyan {
            stroke:#35d8ff;
            filter:
              drop-shadow(0 0 3px rgba(53,216,255,.85))
              drop-shadow(0 0 9px rgba(53,216,255,.38));
          }

          .matteo-brain-electric--pink {
            stroke:#ff4fd8;
            animation-delay:-.7s;
            animation-duration:1.92s;
            filter:
              drop-shadow(0 0 3px rgba(255,79,216,.72))
              drop-shadow(0 0 8px rgba(255,79,216,.3));
          }

          .matteo-brain-node-dot {
            transform-box:fill-box;
            transform-origin:center;
            animation:matteoBrainNode 2.4s ease-in-out infinite;
          }

          .matteo-brain-node-dot--cyan {
            fill:#35d8ff;
            filter:drop-shadow(0 0 5px rgba(53,216,255,.9));
          }

          .matteo-brain-node-dot--violet {
            fill:#8b5cf6;
            filter:drop-shadow(0 0 5px rgba(139,92,246,.85));
          }

          .matteo-brain-node-dot--pink {
            fill:#ff4fd8;
            filter:drop-shadow(0 0 5px rgba(255,79,216,.82));
          }

          .matteo-brain-node-dot:nth-of-type(2n) {
            animation-delay:-.8s;
          }

          .matteo-brain-node-dot:nth-of-type(3n) {
            animation-delay:-1.4s;
          }

          .matteo-brain-divider {
            stroke:rgba(255,255,255,.12);
            stroke-width:.8;
            stroke-dasharray:2 7;
            vector-effect:non-scaling-stroke;
          }

          .matteo-brain-wave {
            fill:none;
            stroke:url(#brainGradient);
            stroke-width:1.15;
            stroke-linecap:round;
            vector-effect:non-scaling-stroke;
            opacity:.76;
            stroke-dasharray:18 16;
            animation:matteoBrainWave 2.2s linear infinite;
            filter:drop-shadow(0 0 5px rgba(53,216,255,.3));
          }

          .matteo-brain-scanline {
            position:absolute;
            z-index:8;
            left:12%;
            right:12%;
            top:20%;
            height:1px;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.08),
                rgba(53,216,255,.92),
                rgba(255,255,255,.7),
                rgba(255,79,216,.52),
                transparent
              );
            box-shadow:
              0 0 9px rgba(53,216,255,.38),
              0 0 22px rgba(139,92,246,.12);
            opacity:0;
            animation:matteoBrainScan 3.9s cubic-bezier(.45,0,.55,1) infinite;
          }

          .matteo-brain-spark {
            position:absolute;
            z-index:9;
            width:4px;
            height:4px;
            border-radius:999px;
            background:#fff;
            opacity:.12;
            box-shadow:
              0 0 4px #fff,
              0 0 12px rgba(53,216,255,.9),
              0 0 24px rgba(139,92,246,.36);
            animation:matteoBrainSpark 2.6s steps(1,end) infinite;
          }

          .matteo-brain-spark--1 {
            left:20%;
            top:33%;
            animation-delay:-.4s;
          }

          .matteo-brain-spark--2 {
            right:18%;
            top:41%;
            animation-delay:-1.2s;
          }

          .matteo-brain-spark--3 {
            left:42%;
            top:18%;
            animation-delay:-1.8s;
          }

          .matteo-brain-spark--4 {
            right:35%;
            bottom:24%;
            animation-delay:-2.2s;
          }

          .matteo-brain-meta {
            position:absolute;
            z-index:10;
            left:50%;
            bottom:4%;
            transform:translateX(-50%);
            white-space:nowrap;
            text-align:center;
            font-size:7px;
            line-height:1.75;
            letter-spacing:.34em;
            text-transform:uppercase;
            color:rgba(255,255,255,.34);
          }

          .matteo-brain-meta strong {
            display:block;
            color:rgba(255,255,255,.72);
            font-weight:400;
            letter-spacing:.3em;
          }

          @keyframes matteoBrainAura {
            0%,100% {
              transform:translate(-50%,-50%) scale(.94);
              opacity:.72;
            }
            50% {
              transform:translate(-50%,-50%) scale(1.08);
              opacity:1;
            }
          }

          @keyframes matteoBrainCircuit {
            to {
              stroke-dashoffset:-90;
            }
          }

          @keyframes matteoBrainElectric {
            0% {
              stroke-dashoffset:0;
              opacity:.18;
            }
            18% {
              opacity:.92;
            }
            48% {
              opacity:.3;
            }
            74% {
              opacity:1;
            }
            100% {
              stroke-dashoffset:-78;
              opacity:.2;
            }
          }

          @keyframes matteoBrainNode {
            0%,100% {
              transform:scale(.72);
              opacity:.38;
            }
            50% {
              transform:scale(1.55);
              opacity:1;
            }
          }

          @keyframes matteoBrainWave {
            to {
              stroke-dashoffset:-68;
            }
          }

          @keyframes matteoBrainScan {
            0% {
              top:18%;
              opacity:0;
            }
            12% {
              opacity:.72;
            }
            48% {
              opacity:.94;
            }
            88% {
              opacity:.46;
            }
            100% {
              top:80%;
              opacity:0;
            }
          }

          @keyframes matteoBrainSpark {
            0%,74%,100% {
              transform:scale(.45);
              opacity:.08;
            }
            75% {
              transform:scale(2.2);
              opacity:1;
            }
            78% {
              transform:scale(.8);
              opacity:.3;
            }
            82% {
              transform:scale(1.6);
              opacity:.86;
            }
            86% {
              transform:scale(.4);
              opacity:.08;
            }
          }

          .matteo-security-node {
            position:absolute;
            width:132px;
            padding:12px;
            border:1px solid rgba(255,255,255,.12);
            background:rgba(2,2,3,.72);
            backdrop-filter:blur(6px);
          }

          .matteo-security-line {
            position:absolute;
            left:50%;
            top:50%;
            height:1px;
            width:32%;
            transform-origin:left center;
            background:linear-gradient(90deg,rgba(255,255,255,.18),transparent);
          }

          .matteo-stack-lane {
            position:relative;
            overflow:hidden;
            border-top:1px solid rgba(255,255,255,.14);
            min-height:180px;
            display:grid;
            grid-template-columns:minmax(170px,.35fr) 1fr;
            align-items:center;
            gap:4vw;
          }

          .matteo-stack-marquee {
            display:flex;
            flex-wrap:wrap;
            gap:10px;
          }

          .matteo-pill {
            border:1px solid rgba(255,255,255,.11);
            background:rgba(255,255,255,.012);
            padding:10px 12px;
            font-size:8px;
            letter-spacing:.22em;
            text-transform:uppercase;
            color:rgba(255,255,255,.56);
          }

          @media (max-width:767px) {
            .matteo-grid { background-size:42px 42px; }

            .matteo-portrait {
              position:relative;
              right:auto;
              top:auto;
              width:100%;
              height:62svh;
              margin-top:90px;
            }

            .matteo-ruler {
              display:none;
            }

            .matteo-security-field {
              min-height:760px;
            }

            .matteo-security-core {
              width:min(72vw,330px);
            }

            .matteo-brain-meta {
              bottom:0;
              font-size:6px;
              letter-spacing:.27em;
            }

            .matteo-security-node {
              width:110px;
              padding:9px;
            }

            .matteo-stack-lane {
              grid-template-columns:1fr;
              gap:20px;
              padding:28px 0;
            }

            .matteo-kernel-shell {
              min-height:72svh;
            }

            .matteo-kernel-word {
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
          className="matteo-noise relative isolate min-h-[100svh] overflow-hidden bg-[#020203] px-6 pb-8 pt-7 md:px-10 md:pb-10 lg:px-[4vw] lg:pb-[4vh]"
        >
          <div className="matteo-grid pointer-events-none absolute inset-0 opacity-58" />

          <div className="pointer-events-none absolute left-[8%] top-[20%] h-[32vw] w-[32vw] rounded-full bg-cyan-400/[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute right-[8%] top-[18%] h-[26vw] w-[26vw] rounded-full bg-violet-500/[0.08] blur-[130px]" />

          <div className="relative z-30 flex items-start justify-between text-[8px] uppercase tracking-[.32em] text-white/34 md:text-[10px]">
            <p data-matteo-meta>
              OXO STUDIO®
              <br />
              PERSON / 001
            </p>

            
          </div>

          <div
            data-matteo-ruler
            className="matteo-ruler"
            aria-hidden="true"
          />

          <p
            data-matteo-ghost
            aria-hidden="true"
            className="avant-legato-font pointer-events-none absolute left-[-3vw] top-[36%] z-[2] whitespace-nowrap text-[14vw] uppercase leading-none tracking-[-.08em] text-white/[0.028]"
          >
            BUILD / HARDEN / SCALE
          </p>

          <div
            data-matteo-portrait
            className="matteo-portrait"
          >
            <div
              data-matteo-portrait-inner
              className="matteo-portrait-inner"
            >
              <img
                src="/img/team/matte2.png"
                alt="Matteo Poli"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/5 to-black/18" />
              <div className="matteo-grid absolute inset-0 opacity-24" />

              <div className="matteo-pixel-layer" aria-hidden="true">
                {Array.from({ length: 20 * 26 }).map((_, index) => {
                  const col = index % 20;
                  const row = Math.floor(index / 20);

                  return (
                    <span
                      key={`pixel-${index}`}
                      data-matteo-pixel
                      className="matteo-pixel"
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
              ID / MP-001
            </p>

            <p className="absolute bottom-7 right-7 text-right text-[7px] uppercase leading-[1.8] tracking-[.28em] text-white/42 md:bottom-9 md:right-9 md:text-[9px]">
              SYSTEM ARCHITECT
              <br />
              OXO / LAB
            </p>
          </div>

          <div className="relative z-20 flex min-h-[82svh] max-w-[78vw] flex-col justify-center pt-20 md:max-w-[72vw] lg:max-w-[64vw]">
            <p
              data-matteo-meta
              className="avant-legato-font mb-5 text-[9px] uppercase tracking-[.38em] text-cyan-300 md:text-xs"
            >
              AI, OCR & SaaS Developer
            </p>

            <h1 className="avant-legato-font ombra2 overflow-hidden text-[13.2vw] uppercase leading-[.66] tracking-[-.085em] md:text-[12vw] lg:text-[9.5vw] [perspective:1200px]">
              <span className="block overflow-hidden pb-[.06em]">
                {"MATTEO".split("").map((char, index) => (
                  <span
                    key={`matteo-${index}`}
                    data-matteo-letter
                    className="inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>

              <span className="block overflow-hidden pb-[.06em]">
                {"POLI".split("").map((char, index) => (
                  <span
                    key={`poli-${index}`}
                    data-matteo-letter
                    className="inline-block"
                  >
                    {char}
                  </span>
                ))}
              </span>
            </h1>

            <p
              data-matteo-meta
              className="avant-legato-font mt-7 max-w-[820px] text-xl leading-snug text-gray-300 md:text-3xl"
            >
              Progetto piattaforme SaaS, sistemi OCR avanzati e architetture
              software sicure per trasformare documenti, immagini e dati in
              processi utilizzabili.
            </p>
          </div>

          <div className="relative z-30">
            <div className="mb-3 flex items-center justify-between text-[7px] uppercase tracking-[.3em] text-white/24 md:text-[9px]">
              <span>PYTHON / FASTAPI / NEXT.JS / DOCKER</span>
              <span>SCROLL / ENTER SYSTEM ↓</span>
            </div>
            <div className="h-px bg-white/10">
              <div
                data-matteo-signal
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
          className="matteo-kernel relative overflow-hidden bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="matteo-grid pointer-events-none absolute inset-0 opacity-44" />

          <p
            aria-hidden="true"
            className="matteo-kernel-ghost avant-legato-font"
          >
            INPUT / LOGIC / OUTPUT
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
              AI / SOFTWARE ARCHITECTURE / SECURITY
              <br />
              ONE WORKING SYSTEM
            </p>
          </div>

          <div className="matteo-kernel-shell relative z-10">
            <span
              data-kernel-cursor
              className="matteo-kernel-cursor"
              aria-hidden="true"
            />

            <div className="py-16">
              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="matteo-kernel-word avant-legato-font ombra2"
                >
                  READ
                </h2>
              </div>

              <div data-kernel-bar className="matteo-kernel-bar my-6" />

              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="matteo-kernel-word matteo-kernel-outline avant-legato-font ombra2 whitespace-nowrap text-right"
                >
                  STRUCTURE
                </h2>
              </div>

              <div data-kernel-bar className="matteo-kernel-bar my-6" />

              <div className="overflow-hidden pb-[1vw]">
                <h2
                  data-kernel-word
                  className="matteo-kernel-word avant-legato-font ombra2"
                >
                  PROTECT
                </h2>
              </div>
            </div>

            <div className="absolute bottom-5 left-0 right-0 flex items-end justify-between text-[7px] uppercase tracking-[.26em] text-white/25 md:text-[9px]">
              <span data-kernel-meta>
                INPUT → MODEL → SERVICE → OUTPUT
              </span>
              <span data-kernel-meta>
                SECURE / MODULAR / SCALABLE
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
          <div className="matteo-grid pointer-events-none absolute inset-0 opacity-42" />

          <div className="relative z-10 mb-16 grid gap-10 border-b border-white/14 pb-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-cyan-300 md:text-xs">
                02 / CURRENT BUILD
              </p>

              <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
                DOCUMENT
                <br />
                INTELLIGENCE.
              </h2>
            </div>

            <p className="avant-legato-font text-xl leading-snug text-gray-300 md:text-3xl">
              Una piattaforma SaaS per automatizzare processi di catalogazione
              bibliografica attraverso OCR, parsing intelligente, servizi
              bibliografici e un’architettura distribuita.
            </p>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_1fr] lg:gap-[5vw]">
            <div
              data-project-image
              className="matteo-project-image relative aspect-[4/5] overflow-hidden border border-white/14"
            >
              <img
                src="/img/team/matteo.png"
                alt=""
                className="absolute inset-0 h-full w-full object-cover object-center"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/5 to-black/18" />
              <div className="matteo-grid absolute inset-0 opacity-24" />

              <div className="absolute left-6 top-6 text-[8px] uppercase tracking-[.28em] text-white/42">
                SYSTEM / LIVE BUILD
              </div>

              <div className="absolute bottom-6 left-6 right-6 border-t border-white/14 pt-4 text-[8px] uppercase leading-[1.8] tracking-[.28em] text-white/42">
                OCR / AI / DATA / AUTOMATION
                <br />
                MULTI-SERVICE ARCHITECTURE
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
          <div className="matteo-grid pointer-events-none absolute inset-0 opacity-44" />

          <div className="relative z-10 mb-14 border-b border-white/14 pb-9">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-fuchsia-400 md:text-xs">
              03 / SECURITY SURFACE
            </p>

            <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
              TRUST
              <br />
              THE SYSTEM.
            </h2>

            <p className="avant-legato-font mt-8 max-w-[880px] text-xl leading-snug text-gray-300 md:text-3xl">
              La sicurezza non è uno strato aggiunto alla fine. È una rete di
              controlli distribuiti dentro l’architettura.
            </p>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="matteo-security-field">
              <div data-security-core className="matteo-security-core">
                <div
                  className="matteo-electric-brain"
                  aria-label="Structured by design — electric neural system"
                >
                  <svg
                    className="matteo-brain-svg"
                    viewBox="0 0 420 420"
                    role="img"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="brainGradient"
                        x1="40"
                        y1="210"
                        x2="380"
                        y2="210"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="0" stopColor="#35d8ff" />
                        <stop offset=".48" stopColor="#8b5cf6" />
                        <stop offset="1" stopColor="#ff4fd8" />
                      </linearGradient>
                    </defs>

                    {/* silhouette / left hemisphere */}
                    <path
                      className="matteo-brain-outline matteo-brain-outline--cyan"
                      d="M205 95
                         C170 57 116 69 101 108
                         C72 113 58 139 68 164
                         C42 186 50 220 73 235
                         C60 270 83 299 113 301
                         C124 335 163 348 194 329
                         C204 317 208 300 207 280
                         L207 116
                         C207 107 207 101 205 95Z"
                    />

                    {/* silhouette / right hemisphere */}
                    <path
                      className="matteo-brain-outline matteo-brain-outline--violet"
                      d="M215 95
                         C250 57 304 69 319 108
                         C348 113 362 139 352 164
                         C378 186 370 220 347 235
                         C360 270 337 299 307 301
                         C296 335 257 348 226 329
                         C216 317 212 300 213 280
                         L213 116
                         C213 107 213 101 215 95Z"
                    />

                    {/* hemisphere divider */}
                    <path
                      className="matteo-brain-divider"
                      d="M210 84 L210 335"
                    />

                    {/* left neural circuits */}
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--cyan"
                      d="M104 129 L142 129 L158 151 L186 151 L202 171"
                    />
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--violet"
                      d="M83 190 L118 190 L137 170 L164 170 L189 197"
                    />
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--cyan"
                      d="M92 243 L126 243 L144 222 L177 222 L201 204"
                    />
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--pink"
                      d="M118 291 L142 274 L169 278 L197 254"
                    />

                    {/* right neural circuits */}
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--violet"
                      d="M316 129 L278 129 L262 151 L234 151 L218 171"
                    />
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--cyan"
                      d="M337 190 L302 190 L283 170 L256 170 L231 197"
                    />
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--pink"
                      d="M328 243 L294 243 L276 222 L243 222 L219 204"
                    />
                    <path
                      className="matteo-brain-circuit matteo-brain-circuit--violet"
                      d="M302 291 L278 274 L251 278 L223 254"
                    />

                    {/* electrical bolts */}
                    <path
                      className="matteo-brain-electric matteo-brain-electric--cyan"
                      d="M91 154 L122 144 L111 166 L150 157 L136 183 L179 171 L165 199 L201 185"
                    />
                    <path
                      className="matteo-brain-electric matteo-brain-electric--pink"
                      d="M329 156 L299 145 L309 169 L270 158 L284 185 L241 172 L255 201 L220 186"
                    />

                    <path
                      className="matteo-brain-electric matteo-brain-electric--cyan"
                      d="M112 255 L148 247 L138 268 L171 261 L163 286 L201 267"
                    />
                    <path
                      className="matteo-brain-electric matteo-brain-electric--pink"
                      d="M308 255 L272 247 L282 268 L249 261 L257 286 L219 267"
                    />

                    {/* central signal wave */}
                    <path
                      className="matteo-brain-wave"
                      d="M79 211
                         L119 211
                         L130 196
                         L142 229
                         L157 184
                         L175 240
                         L192 207
                         L207 207
                         L218 207
                         L233 207
                         L247 183
                         L263 239
                         L278 195
                         L291 224
                         L302 211
                         L341 211"
                    />

                    {/* node field */}
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--cyan"
                      cx="103"
                      cy="129"
                      r="3.3"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--violet"
                      cx="158"
                      cy="151"
                      r="3"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--pink"
                      cx="137"
                      cy="170"
                      r="3"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--cyan"
                      cx="177"
                      cy="222"
                      r="3.4"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--violet"
                      cx="142"
                      cy="274"
                      r="2.8"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--pink"
                      cx="197"
                      cy="254"
                      r="3.1"
                    />

                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--violet"
                      cx="317"
                      cy="129"
                      r="3.3"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--cyan"
                      cx="262"
                      cy="151"
                      r="3"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--pink"
                      cx="283"
                      cy="170"
                      r="3"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--violet"
                      cx="243"
                      cy="222"
                      r="3.4"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--cyan"
                      cx="278"
                      cy="274"
                      r="2.8"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--pink"
                      cx="223"
                      cy="254"
                      r="3.1"
                    />

                    {/* core signal */}
                    <circle
                      cx="210"
                      cy="210"
                      r="8"
                      fill="none"
                      stroke="rgba(255,255,255,.22)"
                      strokeWidth="1"
                    />
                    <circle
                      className="matteo-brain-node-dot matteo-brain-node-dot--cyan"
                      cx="210"
                      cy="210"
                      r="3.8"
                    />
                  </svg>

                  <span className="matteo-brain-scanline" />

                  <span className="matteo-brain-spark matteo-brain-spark--1" />
                  <span className="matteo-brain-spark matteo-brain-spark--2" />
                  <span className="matteo-brain-spark matteo-brain-spark--3" />
                  <span className="matteo-brain-spark matteo-brain-spark--4" />

                  <p className="matteo-brain-meta avant-legato-font">
                    <strong>STRUCTURED BY DESIGN</strong>
                    Neural / Secure / Controlled
                  </p>
                </div>
              </div>

              {SECURITY_NODES.map(([a, b, left, top, accent], index) => (
                <div
                  key={`${a}-${b}`}
                  data-security-node
                  className="matteo-security-node"
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
                  className="matteo-security-line"
                  style={{ transform: `rotate(${deg}deg)` }}
                />
              ))}

              <p className="absolute bottom-5 left-5 text-[7px] uppercase tracking-[.28em] text-white/24 md:text-[9px]">
                DEFENSE / IN / DEPTH
              </p>

              <p className="absolute bottom-5 right-5 text-right text-[7px] uppercase tracking-[.28em] text-white/24 md:text-[9px]">
                SURFACE / CONTROLLED
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
            STACK / INFRASTRUCTURE LANES
        ====================================================== */}
        <section
          ref={stackRef}
          className="relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="matteo-grid pointer-events-none absolute inset-0 opacity-42" />

          <div className="relative z-10 mb-14 border-b border-white/14 pb-9">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[.36em] text-emerald-300 md:text-xs">
              04 / TECHNICAL INFRASTRUCTURE
            </p>

            <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.7] tracking-[-.075em] md:text-[9vw] lg:text-[6.8vw]">
              STACK
              <br />
              IN MOTION.
            </h2>
          </div>

          <div className="relative z-10">
            {STACK_LANES.map((lane, index) => (
              <article
                key={lane.title}
                data-stack-lane
                className="matteo-stack-lane"
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

                <div className="matteo-stack-marquee">
                  {lane.items.map((item) => (
                    <span key={item} className="matteo-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}

            <div className="matteo-stack-lane border-b border-white/14">
              <div>
                <p className="avant-legato-font text-[8px] uppercase tracking-[.30em] text-cyan-300 md:text-[10px]">
                  05 / METHOD
                </p>

                <h3 className="avant-legato-font mt-4 text-3xl uppercase leading-[.82] tracking-[-.05em] md:text-5xl">
                  WORKFLOW
                </h3>
              </div>

              <div className="matteo-stack-marquee">
                {[
                  "Agile",
                  "Iterative development",
                  "Version control",
                  "Code review",
                  "Testing",
                  "Debugging",
                  "Technical documentation",
                ].map((item) => (
                  <span key={item} className="matteo-pill">
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
          className="matteo-noise relative flex min-h-[92svh] items-end overflow-hidden border-t border-white/12 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="matteo-grid pointer-events-none absolute inset-0 opacity-46" />

          <div className="pointer-events-none absolute left-1/2 top-[18%] h-[30vw] w-[72vw] -translate-x-1/2 bg-[linear-gradient(90deg,rgba(53,216,255,.10),rgba(139,92,246,.12),rgba(32,240,199,.08))] blur-[110px]" />

          <div className="relative z-10 w-full">
            <div
              data-matteo-final-meta
              className="mb-8 flex items-center justify-between border-b border-white/18 pb-5 text-[9px] uppercase tracking-[.31em] text-white/34 md:text-[11px]"
            >
              <span>MATTEO POLI / OXO STUDIO</span>
              <span>AI / OCR / SAAS / SECURITY</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[12.2vw] uppercase leading-[.69] tracking-[-.085em] md:text-[11.8vw] lg:text-[9.2vw] [perspective:1000px]">
              <span className="block whitespace-nowrap overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="BUILD."
                  attribute="data-matteo-final-letter"
                />
              </span>

              <span className="block whitespace-nowrap overflow-hidden pb-[.08em]">
                <SplitLetters
                  text="HARDEN."
                  attribute="data-matteo-final-letter"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/18 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                data-matteo-final-meta
                className="avant-legato-font max-w-[860px] text-xl leading-snug text-gray-300 md:text-3xl"
              >
                Sistemi affidabili, scalabili e sicuri fin dalla progettazione.
              </p>

              <div
                data-matteo-final-meta
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
                <span>  Contatti ↗</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
