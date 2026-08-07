import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";



gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    id: "01",
    code: "SYSTEM_01",
    title: "SOFTWARE",
    eyebrow: "PRODUCT / ENGINEERING",
    copy: "Trasformiamo processi complessi in strumenti digitali chiari, solidi e pronti a evolvere.",
    accent: "#35d8ff",
    soft: "rgba(53,216,255,.18)",
  },
  {
    id: "02",
    code: "SYSTEM_02",
    title: "WEB",
    eyebrow: "DESIGN / DEVELOPMENT",
    copy: "Costruiamo esperienze web veloci, riconoscibili e progettate per funzionare su ogni dispositivo.",
    accent: "#8b5cf6",
    soft: "rgba(139,92,246,.18)",
  },
  {
    id: "03",
    code: "SYSTEM_03",
    title: "AI",
    eyebrow: "DATA / AUTOMATION",
    copy: "Integriamo intelligenza artificiale, ricerca e automazione dove producono valore reale.",
    accent: "#20f0c7",
    soft: "rgba(32,240,199,.16)",
  },
  {
    id: "04",
    code: "SYSTEM_04",
    title: "GAME",
    eyebrow: "REAL TIME / INTERACTION",
    copy: "Sviluppiamo videogame, prototipi e mondi interattivi in cui codice, ritmo e direzione visiva coincidono.",
    accent: "#ff4fd8",
    soft: "rgba(255,79,216,.16)",
  },
];

const PROJECTS = [
  {
    id: "01",
    category: "SOFTWARE / AI",
    title: "KAIROSARCHIVE",
    statement: "KNOWLEDGE, ORGANIZED.",
    description:
      "Un ecosistema intelligente per metadatazione, catalogazione, ricerca e organizzazione documentale.",
    meta: "MARC 21 / SBN / Z39.50 / AUTOMATION",
    video: "/videos/products/kairosarchive.mp4",
    link: "/Prodotti",
    accent: "#35d8ff",
    fallback:
      "radial-gradient(circle at 72% 30%, rgba(53,216,255,.34), transparent 34%), radial-gradient(circle at 18% 76%, rgba(80,70,255,.20), transparent 38%), linear-gradient(135deg, #031018 0%, #050711 50%, #010101 100%)",
  },
  {
    id: "02",
    category: "CUSTOM SOFTWARE",
    title: "DIGITAL SYSTEMS",
    statement: "COMPLEXITY, MADE USABLE.",
    description:
      "Applicazioni progettate intorno ai processi reali del cliente, con interfacce precise e architetture pronte a crescere.",
    meta: "PRODUCT / CLOUD / UX / ENGINEERING",
    video: "/videos/products/custom-software.mp4",
    link: "/Prodotti",
    accent: "#8b5cf6",
    fallback:
      "radial-gradient(circle at 24% 38%, rgba(139,92,246,.36), transparent 36%), radial-gradient(circle at 84% 72%, rgba(255,79,216,.16), transparent 36%), linear-gradient(135deg, #10041b 0%, #080810 52%, #010101 100%)",
  },
  {
    id: "03",
    category: "INTERACTIVE / GAME",
    title: "LIVING WORLDS",
    statement: "TECHNOLOGY YOU CAN FEEL.",
    description:
      "Esperienze in tempo reale, prototipi e ambienti interattivi in cui tecnologia e direzione artistica costruiscono la stessa sensazione.",
    meta: "GAMEPLAY / MOTION / 3D / SOUND",
    video: "/videos/products/interactive-worlds.mp4",
    link: "/Prodotti",
    accent: "#ff4fd8",
    fallback:
      "radial-gradient(circle at 30% 35%, rgba(255,79,216,.32), transparent 36%), radial-gradient(circle at 78% 75%, rgba(87,74,255,.24), transparent 38%), linear-gradient(135deg, #180417 0%, #08040f 54%, #010101 100%)",
  },
];

const SIGNAL_ROWS = [
  "SOFTWARE — AI — DESIGN — INTERACTION —",
  "MAKE IT CLEAR — MAKE IT POWERFUL —",
  "SYSTEMS — STORIES — REAL TIME — WORLDS —",
  "CODE WITH A POINT OF VIEW —",
];

function SplitLetters({ text, attribute = "data-home-v2-letter" }) {
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
      data-manifesto-word
      className="mr-[.22em] inline-block"
    >
      {word}
    </span>
  ));
}

export default function Home() {
  const [brainActive, setBrainActive] = useState(true);

  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const signalRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const projectsRef = useRef(null);
  const manifestoRef = useRef(null);
  const finalRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const signal = signalRef.current;
    const capabilities = capabilitiesRef.current;
    const projects = projectsRef.current;
    const manifesto = manifestoRef.current;
    const finalSection = finalRef.current;

    if (
      !page ||
      !hero ||
      !signal ||
      !capabilities ||
      !projects ||
      !manifesto ||
      !finalSection
    ) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    const projectVideos = Array.from(projects.querySelectorAll("video"));
    let pointerMoveHandler = null;
    let videoObserver = null;

    const ctx = gsap.context(() => {
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-home-v2-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-home-v2-meta]")
      );
      const heroPaths = gsap.utils.toArray(
        hero.querySelectorAll("[data-home-v2-path]")
      );
      const heroBrainEntry = hero.querySelector("[data-hero-brain-entry]");

      gsap.fromTo(
        heroLetters,
        {
          yPercent: 145,
          rotateX: -88,
          opacity: 0,
          transformOrigin: "50% 100%",
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.22,
          stagger: 0.018,
          ease: "power4.out",
          delay: 0.06,
        }
      );

      gsap.fromTo(
        heroMeta,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.09,
          ease: "power3.out",
          delay: 0.48,
        }
      );

      gsap.fromTo(
        heroPaths,
        { strokeDashoffset: 1, opacity: 0 },
        {
          strokeDashoffset: 0,
          opacity: 0.85,
          duration: 1.8,
          stagger: 0.12,
          ease: "power3.inOut",
          delay: 0.42,
        }
      );

      if (heroBrainEntry) {
        gsap.fromTo(
          heroBrainEntry,
          {
            scale: 0.42,
            rotateY: -34,
            rotateX: 16,
            opacity: 0,
            filter: "blur(18px)",
            transformPerspective: 1200,
          },
          {
            scale: 1,
            rotateY: 0,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.65,
            delay: 0.18,
            ease: "power4.out",
          }
        );
      }

      ScrollTrigger.create({
        trigger: hero,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => setBrainActive(true),
        onEnterBack: () => setBrainActive(true),
        onLeave: () => setBrainActive(false),
        onLeaveBack: () => setBrainActive(false),
      });

      const pointerLayer = hero.querySelector("[data-home-v2-pointer]");

      if (pointerLayer && !window.matchMedia("(pointer: coarse)").matches) {
        const moveX = gsap.quickTo(pointerLayer, "x", {
          duration: 0.8,
          ease: "power3.out",
        });
        const moveY = gsap.quickTo(pointerLayer, "y", {
          duration: 0.8,
          ease: "power3.out",
        });
        const rotateX = gsap.quickTo(pointerLayer, "rotationY", {
          duration: 0.9,
          ease: "power3.out",
        });
        const rotateY = gsap.quickTo(pointerLayer, "rotationX", {
          duration: 0.9,
          ease: "power3.out",
        });

        pointerMoveHandler = (event) => {
          const normalizedX = event.clientX / window.innerWidth - 0.5;
          const normalizedY = event.clientY / window.innerHeight - 0.5;

          moveX(normalizedX * 28);
          moveY(normalizedY * 20);
          rotateX(normalizedX * 4.5);
          rotateY(normalizedY * -3.5);
        };

        window.addEventListener("pointermove", pointerMoveHandler, {
          passive: true,
        });
      }

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions;

          if (reduceMotion) {
            gsap.set(
              page.querySelectorAll(
                "[data-home-v2-letter], [data-home-v2-meta], [data-manifesto-word]"
              ),
              { clearProps: "all", opacity: 1 }
            );

            return undefined;
          }

          const heroOxo = hero.querySelector("[data-hero-oxo]");
          const heroStudio = hero.querySelector("[data-hero-studio]");
          const heroBrain = hero.querySelector("[data-hero-brain]");
          const heroCopy = hero.querySelector("[data-hero-copy]");
          const heroGhost = hero.querySelector("[data-hero-ghost]");

          const heroTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: () => `+=${window.innerHeight * (desktop ? 2.15 : 1.35)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          heroTimeline
            .to(
              heroOxo,
              {
                xPercent: desktop ? -38 : -22,
                scaleX: desktop ? 1.38 : 1.2,
                skewX: -8,
                opacity: 0.16,
                filter: "blur(3px)",
                duration: 1,
              },
              0
            )
            .to(
              heroStudio,
              {
                xPercent: desktop ? 34 : 19,
                scaleX: desktop ? 1.32 : 1.16,
                skewX: 7,
                opacity: 0.15,
                filter: "blur(3px)",
                duration: 1,
              },
              0
            )
            .to(
              heroBrain,
              {
                scale: desktop ? 3.15 : 2.35,
                rotateZ: desktop ? 16 : 9,
                opacity: 0,
                filter: "blur(14px)",
                duration: 1,
              },
              0
            )
            .to(
              heroCopy,
              {
                y: -80,
                opacity: 0,
                duration: 0.55,
              },
              0
            )
            .to(
              heroGhost,
              {
                scale: 1.65,
                rotate: -8,
                opacity: 0.12,
                duration: 1,
              },
              0
            );

          const signalRows = gsap.utils.toArray(
            signal.querySelectorAll("[data-signal-row]")
          );
          const signalWindow = signal.querySelector("[data-signal-window]");
          const signalCopy = signal.querySelector("[data-signal-copy]");
          const signalCross = signal.querySelector("[data-signal-cross]");

          gsap.set(signalCopy, { autoAlpha: 0, y: 45 });

          const signalTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: signal,
              start: "top top",
              end: () => `+=${window.innerHeight * (desktop ? 1.9 : 1.25)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          signalRows.forEach((row, index) => {
            signalTimeline.to(
              row,
              {
                xPercent: index % 2 === 0 ? -24 : 24,
                skewX: index % 2 === 0 ? -4 : 4,
                duration: 1,
              },
              0
            );
          });

          signalTimeline
            .to(
              signalWindow,
              {
                scale: desktop ? 5.8 : 4.2,
                rotate: 210,
                borderRadius: "12%",
                duration: 1,
              },
              0
            )
            .to(
              signalCross,
              {
                rotate: 180,
                scale: 0.3,
                opacity: 0,
                duration: 0.8,
              },
              0
            )
            .to(
              signalCopy,
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out",
              },
              0.34
            )
            .to(
              signalCopy,
              {
                scale: 1.08,
                duration: 0.55,
              },
              0.45
            );

          const capabilityCards = gsap.utils.toArray(
            capabilities.querySelectorAll("[data-capability-panel]")
          );

          capabilityCards.forEach((card, index) => {
            const content = card.querySelector("[data-capability-content]");
            const number = card.querySelector("[data-capability-number]");
            const line = card.querySelector("[data-capability-line]");
            const glow = card.querySelector("[data-capability-glow]");
            const direction = index % 2 === 0 ? -1 : 1;

            gsap.fromTo(
              card,
              {
                clipPath:
                  direction < 0
                    ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                    : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                y: desktop ? 90 : 48,
                rotate: desktop ? direction * 1.2 : 0,
                scale: desktop ? 0.965 : 0.985,
              },
              {
                clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                y: 0,
                rotate: 0,
                scale: 1,
                duration: 1.15,
                ease: "power4.inOut",
                scrollTrigger: {
                  trigger: card,
                  start: "top 84%",
                  toggleActions: "play none none reverse",
                },
              }
            );

            if (content) {
              gsap.fromTo(
                content,
                {
                  x: desktop ? direction * 70 : direction * 28,
                  y: desktop ? 42 : 25,
                  opacity: 0,
                },
                {
                  x: 0,
                  y: 0,
                  opacity: 1,
                  duration: 0.86,
                  delay: 0.18,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }

            if (number) {
              gsap.fromTo(
                number,
                {
                  yPercent: 18,
                  rotate: direction * 7,
                },
                {
                  yPercent: -24,
                  rotate: direction * -4,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                  },
                }
              );
            }

            if (line) {
              gsap.fromTo(
                line,
                {
                  scaleX: 0,
                  transformOrigin:
                    direction < 0 ? "left center" : "right center",
                },
                {
                  scaleX: 1,
                  duration: 0.95,
                  delay: 0.2,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 79%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }

            if (glow) {
              gsap.fromTo(
                glow,
                { scale: 0.65, opacity: 0 },
                {
                  scale: 1,
                  opacity: 1,
                  duration: 1.2,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 82%",
                    toggleActions: "play none none reverse",
                  },
                }
              );
            }
          });

          return () => {
            heroTimeline.scrollTrigger?.kill();
            heroTimeline.kill();
            signalTimeline.scrollTrigger?.kill();
            signalTimeline.kill();
          };
        }
      );

      const projectShells = gsap.utils.toArray(
        projects.querySelectorAll("[data-project-shell]")
      );

      projectShells.forEach((shell, index) => {
        const panel = shell.querySelector("[data-project-panel]");
        const media = shell.querySelector("[data-project-media]");
        const content = shell.querySelector("[data-project-content]");
        const ghost = shell.querySelector("[data-project-ghost]");
        const line = shell.querySelector("[data-project-line]");

        if (!panel) return;

        gsap.fromTo(
          panel,
          {
            clipPath: "inset(8% 5% 8% 5% round 34px)",
          },
          {
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            ease: "none",
            scrollTrigger: {
              trigger: shell,
              start: "top 92%",
              end: "top top",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          }
        );

        if (content) {
          gsap.fromTo(
            content,
            {
              x: index % 2 === 0 ? -90 : 90,
              y: 55,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.95,
              ease: "power3.out",
              scrollTrigger: {
                trigger: shell,
                start: "top 58%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (media) {
          gsap.fromTo(
            media,
            {
              scale: 1.12,
              filter: "brightness(1) saturate(1)",
            },
            {
              scale: 1.24,
              filter: "brightness(.3) saturate(.55)",
              ease: "none",
              scrollTrigger: {
                trigger: shell,
                start: "top top",
                end: "bottom top",
                scrub: 1,
              },
            }
          );
        }

        if (ghost) {
          gsap.to(ghost, {
            xPercent: index % 2 === 0 ? -18 : 18,
            ease: "none",
            scrollTrigger: {
              trigger: shell,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: index % 2 === 0 ? "left" : "right" },
            {
              scaleX: 1,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: shell,
                start: "top 62%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      const manifestoTrack = manifesto.querySelector(
        "[data-manifesto-track]"
      );
      const manifestoWords = gsap.utils.toArray(
        manifesto.querySelectorAll("[data-manifesto-word]")
      );

      if (manifestoTrack) {
        gsap.to(manifestoTrack, {
          xPercent: -44,
          ease: "none",
          scrollTrigger: {
            trigger: manifesto,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      gsap.fromTo(
        manifestoWords,
        {
          yPercent: 110,
          rotateX: -70,
          opacity: 0.08,
          transformOrigin: "50% 100%",
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.045,
          ease: "power4.out",
          scrollTrigger: {
            trigger: manifesto,
            start: "top 62%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const finalLetters = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-home-final-letter]")
      );

      gsap.fromTo(
        finalLetters,
        {
          yPercent: 135,
          rotateX: -82,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.08,
          stagger: 0.022,
          ease: "power4.out",
          scrollTrigger: {
            trigger: finalSection,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, page);

    if ("IntersectionObserver" in window) {
      videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const video = entry.target.querySelector("video");
            if (!video) return;

            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const request = video.play();
              if (request && typeof request.catch === "function") {
                request.catch(() => {});
              }
            } else {
              video.pause();
            }
          });
        },
        { threshold: [0, 0.5, 0.75] }
      );

      projects
        .querySelectorAll("[data-project-panel]")
        .forEach((panel) => videoObserver.observe(panel));
    }

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 180);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);

      if (pointerMoveHandler) {
        window.removeEventListener("pointermove", pointerMoveHandler);
      }

      videoObserver?.disconnect();
      projectVideos.forEach((video) => video.pause());
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <SeoMetaTags />

      <main
        ref={pageRef}
        className="relative overflow-x-hidden bg-[#020203] text-white"
      >
        <style>{`
          .oxo-v2-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.038) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.038) 1px, transparent 1px);
            background-size: 68px 68px;
            mask-image: linear-gradient(to bottom, transparent, black 9%, black 91%, transparent);
          }

          .oxo-v2-noise::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: .06;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.85'/%3E%3C/svg%3E");
            mix-blend-mode: soft-light;
          }

          .oxo-v2-electric-path {
            stroke-dasharray: 1;
            stroke-dashoffset: 1;
            filter: drop-shadow(0 0 8px rgba(53,216,255,.9));
          }

          .oxo-v2-core-ring {
            animation: oxoV2Core 4.8s ease-in-out infinite;
          }

          .oxo-v2-core-ring:nth-child(2) {
            animation-delay: -1.6s;
          }

          .oxo-v2-core-ring:nth-child(3) {
            animation-delay: -3.2s;
          }

          .oxo-capability-v2:hover .oxo-capability-v2-title {
            transform: translateX(1.5vw) skewX(-4deg);
          }

          .oxo-capability-v2:hover .oxo-capability-v2-arrow {
            transform: translate(.75rem, -.55rem) rotate(-45deg);
          }

          .oxo-project-v2:hover .oxo-project-v2-title {
            letter-spacing: -.035em;
          }

          @keyframes oxoV2BrainHalo {
            0%, 100% { transform: scale(.78); opacity: .24; }
            50% { transform: scale(1.18); opacity: .74; }
          }

          @keyframes oxoV2BrainOrbit {
            from { transform: rotate(0deg) scaleX(1); }
            to { transform: rotate(360deg) scaleX(1); }
          }

          .oxo-v2-brain-halo {
            animation: oxoV2BrainHalo 4.8s ease-in-out infinite;
          }

          .oxo-v2-brain-orbit {
            animation: oxoV2BrainOrbit 13s linear infinite;
          }

          .oxo-v2-brain-orbit-reverse {
            animation: oxoV2BrainOrbit 18s linear infinite reverse;
          }

          @media (prefers-reduced-motion: reduce) {
            .oxo-v2-brain-halo,
            .oxo-v2-brain-orbit,
            .oxo-v2-brain-orbit-reverse {
              animation: none;
            }
          }
        `}</style>

        <section
          ref={heroRef}
          className="oxo-v2-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-5 pb-7 pt-[90px] md:px-9 md:pb-10 lg:px-[3vw] lg:pb-[4vh]"
        >
          <div className="oxo-v2-grid pointer-events-none absolute inset-0" />

          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
            viewBox="0 0 1600 900"
            preserveAspectRatio="none"
          >
            <path
              data-home-v2-path
              pathLength="1"
              d="M-80 610 C170 510 260 770 490 590 C720 410 820 690 1040 500 C1240 330 1370 470 1690 290"
              fill="none"
              stroke="#35d8ff"
              strokeWidth="1.5"
              className="oxo-v2-electric-path"
            />
            <path
              data-home-v2-path
              pathLength="1"
              d="M-120 250 C190 380 330 120 610 280 C880 435 1030 170 1260 310 C1450 420 1540 250 1700 180"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="1"
              className="oxo-v2-electric-path"
            />
          </svg>

          <p
            data-hero-ghost
            aria-hidden="true"
            className="antonio2 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[47vw] uppercase leading-none tracking-[-0.11em] text-white/[0.018]"
          >
            X
          </p>

          <div className="relative z-10 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.31em] text-white/45 md:text-[11px]">
            <p data-home-v2-meta>
              OXO STUDIO®
              <br />
              INDEPENDENT DIGITAL LAB
            </p>
            <p data-home-v2-meta className="text-right">
              CREATIVE TECHNOLOGY
              <br />
              LA SPEZIA / ITALY
            </p>
          </div>

          <div
            data-home-v2-pointer
            className="relative z-10 my-auto py-8 [transform-style:preserve-3d]"
          >
            <div className="relative">
              <p
                data-home-v2-meta
                className="antonio2 mb-3 text-[9px] uppercase tracking-[0.38em] text-cyan-300 md:text-xs"
              >
                Software / AI / Interactive worlds
              </p>

              <div className="relative ">
                <h1
                  data-hero-oxo
                  className="antonio2 ombra2 relative z-[4] overflow-hidden text-[35vw] uppercase leading-[0.61] tracking-[-0.105em] md:text-[29vw] lg:text-[25vw]"
                >
                  <SplitLetters text="OXO" />
                </h1>

                <h1
                  data-hero-studio
                  className="antonio2 ombra2 relative z-[4] ml-auto mt-[-1.6vw] w-fit overflow-hidden text-[23vw] uppercase leading-[0.66] tracking-[-0.09em] md:text-[19vw] lg:text-[16vw]"
                >
                  <SplitLetters text="STUDIO" />
                </h1>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 z-[2] h-[76vw] w-[76vw] min-h-[280px] min-w-[280px] -translate-x-1/2 -translate-y-1/2 md:h-[54vw] md:w-[54vw] lg:h-[42vw] lg:w-[42vw] lg:max-h-[680px] lg:max-w-[680px]"
                >
                  <div
                    data-hero-brain
                    className="relative h-full w-full [transform-style:preserve-3d]"
                  >
                    <div
                      data-hero-brain-entry
                      className="relative h-full w-full [transform-style:preserve-3d]"
                    >
                      <div className="oxo-v2-brain-halo absolute inset-[18%] rounded-full bg-cyan-300/15 blur-[70px]" />

                      <div className="oxo-v2-brain-orbit absolute inset-[8%] rounded-full border border-cyan-300/28" />
                      <div className="oxo-v2-brain-orbit-reverse absolute inset-[17%] rounded-full border border-violet-400/28" />


                      <div className="absolute left-1/2 top-[4%] h-[92%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300/45 to-transparent" />
                      <div className="absolute left-[4%] top-1/2 h-px w-[92%] -translate-y-1/2 bg-gradient-to-r from-transparent via-violet-400/45 to-transparent" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            data-hero-copy
            className="relative z-10 flex flex-col gap-6 border-t border-white/20 pt-5 md:flex-row md:items-end md:justify-between"
          >
            <p
              data-home-v2-meta
              className="antonio max-w-[980px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.55rem]"
            >
              Progettiamo sistemi digitali con una voce precisa: software,
              intelligenza artificiale e mondi interattivi che non sembrano già
              visti.
            </p>

            <p
              data-home-v2-meta
              className="antonio2 shrink-0 text-[9px] uppercase tracking-[0.31em] text-white/38 md:text-xs"
            >
              Scroll / Break the surface ↓
            </p>
          </div>
        </section>

        <section
          ref={signalRef}
          className="oxo-v2-noise relative flex h-[100svh] min-h-[650px] items-center overflow-hidden bg-[#050506]"
        >
          <div className="oxo-v2-grid pointer-events-none absolute inset-0 opacity-70" />

          <div className="relative z-10 w-full py-10">
            {SIGNAL_ROWS.map((row, index) => (
              <div
                key={row}
                data-signal-row
                className={`antonio2 flex w-max whitespace-nowrap uppercase leading-[.72] tracking-[-0.065em] ${
                  index === 1
                    ? "text-[18vw] md:text-[13vw]"
                    : index === 2
                      ? "text-[16vw] text-white/[0.12] md:text-[11vw]"
                      : "text-[20vw] text-white/[0.055] md:text-[14vw]"
                }`}
                style={{
                  transform: `translateX(${index % 2 === 0 ? -9 : -22}vw)`,
                  ...(index === 1
                    ? {
                        color: "transparent",
                        WebkitTextStroke: "1px rgba(139,92,246,.7)",
                      }
                    : {}),
                }}
              >
                <span>{row}&nbsp;</span>
                <span>{row}&nbsp;</span>
              </div>
            ))}
          </div>

          <div
            data-signal-window
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-20 h-[34vw] w-[34vw] min-h-[220px] min-w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/55 bg-black/65 shadow-[0_0_80px_rgba(53,216,255,.12)] backdrop-blur-[2px] md:h-[24vw] md:w-[24vw]"
          />

          <div
            data-signal-cross
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[26vw] w-[26vw] min-h-[170px] min-w-[170px] -translate-x-1/2 -translate-y-1/2 md:h-[17vw] md:w-[17vw]"
          >
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-cyan-300 to-transparent" />
            <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-fuchsia-400 to-transparent" />
          </div>

          <div
            data-signal-copy
            className="absolute left-1/2 top-1/2 z-40 w-[86vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <p className="antonio2 mb-5 text-[9px] uppercase tracking-[0.4em] text-cyan-300 md:text-xs">
              One studio / one signal
            </p>
            <h2 className="antonio2 ombra2 text-[14vw] uppercase leading-[.76] tracking-[-0.07em] md:text-[8vw]">
              NOISE OUT.
              <br />
              MEANING IN.
            </h2>
          </div>
        </section>

        <section
          ref={capabilitiesRef}
          className="relative overflow-hidden border-y border-white/15 bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="oxo-v2-grid pointer-events-none absolute inset-0 opacity-55" />

          <div className="relative z-10 mb-16 grid gap-10 border-b border-white/18 pb-10 md:mb-24 md:grid-cols-[1.1fr_.9fr] md:items-end lg:mb-[10vh]">
            <div>
              <div className="mb-5 flex items-center gap-4 text-[9px] uppercase tracking-[0.34em] text-white/42 md:text-xs">
                <span>CAPABILITIES INDEX</span>
                <span className="h-px w-14 bg-cyan-300/65" />
                <span>04 SYSTEMS</span>
              </div>

              <h2 className="antonio2 ombra2 text-[20vw] uppercase leading-[.69] tracking-[-0.085em] md:text-[13vw] lg:text-[9.5vw]">
                BUILT
                <br />
                AS ONE.
              </h2>
            </div>

            <p className="antonio max-w-[720px] text-xl leading-snug text-gray-300 md:justify-self-end md:text-3xl">
              Strategia, interfaccia e ingegneria non passano da un reparto
              all'altro. Nascono insieme, nello stesso sistema.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 gap-5 md:gap-6 lg:grid-cols-2 lg:gap-[2vw]">
            {CAPABILITIES.map((item, index) => (
              <article
                key={item.id}
                data-capability-panel
                onPointerMove={(event) => {
                  if (window.matchMedia("(pointer: coarse)").matches) return;

                  const card = event.currentTarget;
                  const inner = card.querySelector("[data-capability-inner]");
                  const glow = card.querySelector("[data-capability-glow]");
                  const rect = card.getBoundingClientRect();
                  const x = event.clientX - rect.left - rect.width / 2;
                  const y = event.clientY - rect.top - rect.height / 2;

                  if (inner) {
                    gsap.to(inner, {
                      rotationY: (x / rect.width) * 5,
                      rotationX: (y / rect.height) * -4,
                      x: (x / rect.width) * 10,
                      y: (y / rect.height) * 8,
                      transformPerspective: 1200,
                      duration: 0.45,
                      ease: "power3.out",
                      overwrite: true,
                    });
                  }

                  if (glow) {
                    gsap.to(glow, {
                      xPercent: (x / rect.width) * 18,
                      yPercent: (y / rect.height) * 18,
                      duration: 0.55,
                      ease: "power3.out",
                      overwrite: true,
                    });
                  }
                }}
                onPointerLeave={(event) => {
                  const card = event.currentTarget;
                  const inner = card.querySelector("[data-capability-inner]");
                  const glow = card.querySelector("[data-capability-glow]");

                  if (inner) {
                    gsap.to(inner, {
                      rotationY: 0,
                      rotationX: 0,
                      x: 0,
                      y: 0,
                      duration: 0.75,
                      ease: "elastic.out(1, .45)",
                      overwrite: true,
                    });
                  }

                  if (glow) {
                    gsap.to(glow, {
                      xPercent: 0,
                      yPercent: 0,
                      duration: 0.75,
                      ease: "power3.out",
                      overwrite: true,
                    });
                  }
                }}
                className={`oxo-capability-v2 group relative min-h-[60svh] overflow-hidden border border-white/18 bg-[#030304] p-7 md:min-h-[66svh] md:p-10 lg:min-h-[72svh] lg:p-[3vw] ${
                  index % 2 === 1 ? "lg:translate-y-[7vh]" : ""
                }`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                <div
                  data-capability-glow
                  className="pointer-events-none absolute -right-[18%] -top-[20%] h-[70%] w-[70%] rounded-full blur-[80px]"
                  style={{
                    background: `radial-gradient(circle, ${item.soft}, transparent 68%)`,
                  }}
                />

                <div
                  className="pointer-events-none absolute inset-0 opacity-85"
                  style={{
                    background: `radial-gradient(circle at ${
                      index % 2 === 0 ? "78% 22%" : "20% 76%"
                    }, ${item.soft}, transparent 38%), linear-gradient(145deg, rgba(255,255,255,.018), transparent 55%)`,
                  }}
                />

                <div className="oxo-v2-grid pointer-events-none absolute inset-0 opacity-65" />

                <p
                  data-capability-number
                  aria-hidden="true"
                  className="antonio2 pointer-events-none absolute -right-[2vw] -top-[6vw] text-[38vw] leading-none tracking-[-0.11em] text-white/[0.04] md:text-[28vw] lg:text-[20vw]"
                >
                  {item.id}
                </p>

                <div
                  data-capability-inner
                  className="relative z-10 flex min-h-[52svh] flex-col justify-between [transform-style:preserve-3d] md:min-h-[56svh] lg:min-h-[62svh]"
                >
                  <div className="flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.31em] text-white/42 md:text-xs">
                    <span>{item.code}</span>
                    <span className="max-w-[52%] text-right">{item.eyebrow}</span>
                  </div>

                  <div data-capability-content>
                    <div
                      data-capability-line
                      className="mb-7 h-px w-full"
                      style={{
                        background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                        boxShadow: `0 0 22px ${item.soft}`,
                      }}
                    />

                    <h3 className="oxo-capability-v2-title antonio2 ombra2 text-[18vw] uppercase leading-[.68] tracking-[-0.09em] transition-transform duration-700 ease-out md:text-[11vw] lg:text-[7.6vw]">
                      {item.title}
                    </h3>

                    <div className="mt-8 flex items-end justify-between gap-7">
                      <p className="antonio max-w-[650px] text-lg leading-snug text-gray-300 md:text-2xl lg:text-[1.75rem]">
                        {item.copy}
                      </p>

                      <span
                        className="oxo-capability-v2-arrow antonio2 shrink-0 text-4xl transition-transform duration-700 ease-out md:text-6xl"
                        style={{ color: item.accent }}
                      >
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="relative z-10 mt-20 flex items-center justify-between border-t border-white/18 pt-5 text-[9px] uppercase tracking-[0.31em] text-white/38 md:mt-32 md:text-xs lg:mt-[18vh]">
            <span>NO DEPARTMENTS / ONE SYSTEM</span>
            <span>SCROLL TO SELECTED WORK ↓</span>
          </div>
        </section>

        <section
          ref={projectsRef}
          className="relative bg-[#020203]"
        >
          <div className="relative z-20 border-b border-white/15 px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]">
            <p className="antonio2 mb-5 text-[10px] uppercase tracking-[0.38em] text-fuchsia-400 md:text-xs">
              Selected systems
            </p>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <h2 className="antonio2 ombra2 text-[21vw] uppercase leading-[.69] tracking-[-0.085em] md:text-[14vw] lg:text-[10vw]">
                WORK THAT
                <br />
                MOVES.
              </h2>
              <p className="antonio max-w-[640px] text-xl leading-snug text-gray-300 md:text-3xl">
                Non mostriamo schermate. Mettiamo in scena sistemi, ritmo e
                comportamento.
              </p>
            </div>
          </div>

          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              data-project-shell
              className="relative min-h-[132svh]"
            >
              <article
                data-project-panel
                className="oxo-project-v2 oxo-v2-noise sticky top-0 h-[100svh] min-h-[650px] overflow-hidden bg-black"
              >
                <div
                  className="absolute inset-0"
                  style={{ background: project.fallback }}
                />
                <div className="oxo-v2-grid pointer-events-none absolute inset-0 opacity-65" />

                <video
                  data-project-media
                  className="absolute inset-0 h-full w-full object-cover"
                  src={project.video}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={() => ScrollTrigger.refresh()}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    ScrollTrigger.refresh();
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-black/25" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/68" />
                <div
                  className={`pointer-events-none absolute inset-0 ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-black/82 via-black/12 to-black/25"
                      : "bg-gradient-to-l from-black/82 via-black/12 to-black/25"
                  }`}
                />

                <p
                  data-project-ghost
                  aria-hidden="true"
                  className="antonio2 pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[20vw] uppercase leading-none tracking-[-0.08em] text-white/[0.06]"
                >
                  {project.statement}
                </p>

                <div className="pointer-events-none absolute inset-[14px] z-10 border border-white/28 md:inset-[26px] lg:inset-[2.2vw]" />

                <div className="antonio2 absolute left-7 top-7 z-20 flex items-center gap-3 text-[9px] uppercase tracking-[0.31em] md:left-12 md:top-12 md:text-xs lg:left-[4.4vw] lg:top-[4.4vw]">
                  <span>{project.id}</span>
                  <span
                    className="h-px w-12 md:w-20"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span className="text-gray-300">{project.category}</span>
                </div>

                <p className="antonio absolute right-7 top-7 z-20 max-w-[48vw] text-right text-[8px] uppercase tracking-[0.24em] text-gray-300 md:right-12 md:top-12 md:text-[11px] lg:right-[4.4vw] lg:top-[4.4vw]">
                  {project.meta}
                </p>

                <div
                  data-project-content
                  className={`absolute bottom-12 z-20 max-w-[1120px] px-7 md:bottom-16 md:px-12 lg:bottom-[7vh] lg:px-[5vw] ${
                    index % 2 === 0 ? "left-0" : "right-0 text-right"
                  }`}
                >
                  <p
                    className="antonio2 mb-3 text-[9px] uppercase tracking-[0.37em] md:text-xs"
                    style={{ color: project.accent }}
                  >
                    Selected work / {project.statement}
                  </p>

                  <h3 className="oxo-project-v2-title antonio2 ombra2 text-[clamp(3.5rem,10vw,10rem)] uppercase leading-[.72] tracking-[-0.075em] transition-[letter-spacing] duration-700">
                    {project.title}
                  </h3>

                  <p
                    className={`antonio mt-6 max-w-[760px] text-lg leading-snug text-gray-200 md:text-2xl lg:text-3xl ${
                      index % 2 === 0 ? "" : "ml-auto"
                    }`}
                  >
                    {project.description}
                  </p>

                  <Link
                    to={project.link}
                    className="antonio2 group mt-8 inline-flex items-center gap-5 border-b border-white/70 pb-2 text-sm uppercase tracking-[0.28em] md:mt-10 md:text-base"
                  >
                    <span>Entra nel progetto</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </Link>
                </div>

                <div
                  data-project-line
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-[3.2vh] left-[5vw] z-30 h-px w-[90vw]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
                    boxShadow: `0 0 20px ${project.accent}`,
                  }}
                />
              </article>
            </div>
          ))}
        </section>

        <section
          ref={manifestoRef}
          className="oxo-v2-noise relative min-h-[110svh] overflow-hidden border-y border-white/15 bg-[#050506] py-24 md:py-32 lg:py-[16vh]"
        >
          <div className="oxo-v2-grid pointer-events-none absolute inset-0 opacity-70" />

          <div
            data-manifesto-track
            aria-hidden="true"
            className="antonio2 pointer-events-none relative z-[1] flex w-max whitespace-nowrap text-[25vw] uppercase leading-[.7] tracking-[-0.08em] text-white/[0.045] md:text-[18vw] lg:text-[14vw]"
          >
            <span>NO TEMPLATES — NO NOISE — NO EMPTY MOTION —&nbsp;</span>
            <span>NO TEMPLATES — NO NOISE — NO EMPTY MOTION —&nbsp;</span>
          </div>

          <div className="relative z-10 mx-auto mt-[-2vw] flex min-h-[68vh] max-w-[1500px] items-center px-6 md:px-10 lg:px-[5vw]">
            <div className="max-w-[1250px]">
              <p className="antonio2 mb-7 text-[10px] uppercase tracking-[0.38em] text-violet-400 md:text-xs">
                Oxo point of view
              </p>

              <p className="antonio text-[clamp(2.3rem,6.2vw,6.7rem)] leading-[.94] tracking-[-0.045em] text-gray-100 [perspective:900px]">
                <SplitWords text="NON AGGIUNGIAMO EFFETTI A UN PRODOTTO. PROGETTIAMO IL MODO IN CUI IL PRODOTTO SI FA CAPIRE, SI FA USARE E SI FA RICORDARE." />
              </p>
            </div>
          </div>
        </section>

        <section
          ref={finalRef}
          className="oxo-v2-noise relative flex min-h-[100svh] items-end overflow-hidden bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="oxo-v2-grid pointer-events-none absolute inset-0 opacity-70" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[10vw] bottom-[-14vh] h-[58vw] w-[58vw] rounded-full blur-[100px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.22), rgba(139,92,246,.15) 38%, rgba(255,79,216,.08) 55%, transparent 73%)",
            }}
          />

          <div className="relative z-10 w-full">
            <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.31em] text-white/38 md:text-[11px]">
              <span>START A PROJECT</span>
              <span>OXO STUDIO / 2026</span>
            </div>

            <h2 className="antonio2 ombra2 overflow-hidden text-[20vw] uppercase leading-[.68] tracking-[-0.09em] md:text-[16vw] lg:text-[13.6vw]">
              <SplitLetters
                text="BREAK FORM"
                attribute="data-home-final-letter"
              />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="antonio max-w-[840px] text-xl leading-snug text-gray-300 md:text-3xl">
                Hai un prodotto che non deve assomigliare al prossimo sito che
                scorrerai domani?
              </p>

              <Link
                to="/Contatti"
                className="antonio2 group inline-flex w-fit items-center gap-5 border-b border-white pb-2 text-sm uppercase tracking-[0.29em] md:text-base"
              >
                <span>Costruiamolo</span>
                <span className="transition-transform duration-300 group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>

     
      </main>
    </>
  );
}