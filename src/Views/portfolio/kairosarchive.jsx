import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

gsap.registerPlugin(ScrollTrigger);

const USERS = [
  { id: "01", label: "BIBLIOTECHE", accent: "#35d8ff" },
  { id: "02", label: "ARCHIVI STORICI", accent: "#8b5cf6" },
  { id: "03", label: "MUSEI E FONDAZIONI", accent: "#20f0c7" },
  { id: "04", label: "ENTI E ISTITUZIONI", accent: "#ff4fd8" },
  { id: "05", label: "COLLEZIONISTI E PROFESSIONISTI", accent: "#35d8ff" },
];

const FEATURES = [
  {
    id: "01",
    title: "CATALOGAZIONE",
    copy: "Strutture dati pensate per collezioni, fondi, biblioteche e patrimoni documentali complessi.",
    meta: "MARC 21 / UNIMARC / ISBD",
    accent: "#35d8ff",
  },
  {
    id: "02",
    title: "AI + OCR",
    copy: "Acquisizione, riconoscimento e supporto alla metadatazione per ridurre il lavoro ripetitivo.",
    meta: "OCR / METADATA / AUTOMATION",
    accent: "#8b5cf6",
  },
  {
    id: "03",
    title: "RICERCA",
    copy: "Consultazione semantica e filtri avanzati per trovare velocemente ciò che serve.",
    meta: "SEARCH / INDEX / DISCOVERY",
    accent: "#20f0c7",
  },
  {
    id: "04",
    title: "COLLEZIONI",
    copy: "Gestione di immagini, documenti, record e relazioni tra oggetti culturali e descrizioni.",
    meta: "MEDIA / RECORDS / RELATIONS",
    accent: "#ff4fd8",
  },
  {
    id: "05",
    title: "INTEROPERABILITÀ",
    copy: "Esportazione e integrazione con sistemi esistenti per evitare silos e duplicazioni.",
    meta: "Z39.50 / EXCHANGE / API",
    accent: "#35d8ff",
  },
  {
    id: "06",
    title: "SICUREZZA",
    copy: "Accessi profilati, log attività, backup e architettura orientata alla continuità del dato.",
    meta: "ACCESS / BACKUP / AUDIT",
    accent: "#8b5cf6",
  },
];

const STACK = [
  ["NEXT.JS", "#ffffff"],
  ["TYPESCRIPT", "#35d8ff"],
  ["POSTGRESQL", "#8b5cf6"],
  ["DOCKER", "#20f0c7"],
  ["AI / OCR", "#ff4fd8"],
  ["BACKUP / CRYPTO", "#35d8ff"],
];

function SplitLetters({ text, attribute = "data-kairos-letter" }) {
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

export default function KairosArchive() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const introRef = useRef(null);
  const usersRef = useRef(null);
  const featuresRef = useRef(null);
  const interfaceRef = useRef(null);
  const techRef = useRef(null);
  const finalRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const intro = introRef.current;
    const users = usersRef.current;
    const features = featuresRef.current;
    const interfaceSection = interfaceRef.current;
    const tech = techRef.current;
    const finalSection = finalRef.current;

    if (
      !page ||
      !hero ||
      !intro ||
      !users ||
      !features ||
      !interfaceSection ||
      !tech ||
      !finalSection
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
            "[data-kairos-letter], [data-kairos-copy], [data-user-row], [data-feature-card], [data-stack-row]"
          ),
          { clearProps: "all", opacity: 1 }
        );
        return;
      }

      /* HERO */
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-kairos-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-kairos-meta]")
      );
      const heroMark = hero.querySelector("[data-kairos-mark]");
      const heroOrbit = hero.querySelector("[data-kairos-orbit]");
      const heroGhost = hero.querySelector("[data-kairos-ghost]");
      const heroLight = hero.querySelector("[data-kairos-light]");

      gsap.fromTo(
        heroLetters,
        {
          yPercent: 135,
          rotateX: -84,
          opacity: 0,
          transformOrigin: "50% 100%",
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.18,
          stagger: 0.018,
          ease: "power4.out",
          delay: 0.08,
        }
      );

      gsap.fromTo(
        heroMeta,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.46,
        }
      );

      if (heroMark) {
        gsap.fromTo(
          heroMark,
          {
            scale: 0.55,
            rotate: -18,
            opacity: 0,
            filter: "blur(14px)",
          },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.35,
            ease: "power4.out",
            delay: 0.18,
          }
        );
      }

      if (heroOrbit) {
        gsap.to(heroOrbit, {
          rotate: 360,
          duration: 22,
          repeat: -1,
          ease: "none",
        });
      }

      if (heroGhost) {
        gsap.to(heroGhost, {
          scale: 1.08,
          rotate: 2,
          duration: 4,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }

      if (heroLight) {
        gsap.fromTo(
          heroLight,
          { scaleX: 0, opacity: 0, xPercent: -15 },
          {
            scaleX: 1,
            opacity: 1,
            xPercent: 0,
            duration: 0.18,
            ease: "expo.out",
            delay: 0.7,
            onComplete: () => {
              gsap.to(heroLight, {
                xPercent: 34,
                opacity: 0,
                duration: 0.65,
                ease: "power3.out",
              });
            },
          }
        );
      }

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
        },
        ({ conditions }) => {
          const { desktop, tablet } = conditions;

          /* HERO PIN */
          const heroTl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (desktop ? 1.9 : tablet ? 1.5 : 1.2)}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          heroTl
            .to(
              "[data-kairos-title-a]",
              {
                xPercent: desktop ? -14 : -8,
                skewX: -4,
                opacity: 0.14,
                filter: "blur(3px)",
                duration: 1,
              },
              0
            )
            .to(
              "[data-kairos-title-b]",
              {
                xPercent: desktop ? 13 : 8,
                skewX: 4,
                opacity: 0.14,
                filter: "blur(3px)",
                duration: 1,
              },
              0
            )
            .to(
              heroMark,
              {
                scale: desktop ? 2.2 : 1.7,
                rotate: 14,
                opacity: 0,
                filter: "blur(12px)",
                duration: 1,
              },
              0
            )
            .to(
              heroGhost,
              {
                scale: 1.55,
                opacity: 0.08,
                duration: 1,
              },
              0
            );

          /* INTRO COPY */
          const introLetters = gsap.utils.toArray(
            intro.querySelectorAll("[data-intro-letter]")
          );
          const introCopy = gsap.utils.toArray(
            intro.querySelectorAll("[data-kairos-copy]")
          );

          gsap.fromTo(
            introLetters,
            {
              yPercent: 120,
              rotateX: -78,
              opacity: 0,
              transformOrigin: "50% 100%",
            },
            {
              yPercent: 0,
              rotateX: 0,
              opacity: 1,
              duration: 0.98,
              stagger: 0.022,
              ease: "power4.out",
              scrollTrigger: {
                trigger: intro,
                start: "top 74%",
                toggleActions: "play none none reverse",
              },
            }
          );

          gsap.fromTo(
            introCopy,
            {
              y: desktop ? 46 : 28,
              opacity: 0,
              filter: "blur(8px)",
            },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.86,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: intro,
                start: "top 68%",
                toggleActions: "play none none reverse",
              },
            }
          );

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

          /* FEATURES */
          const featureCards = gsap.utils.toArray(
            features.querySelectorAll("[data-feature-card]")
          );

          featureCards.forEach((card, index) => {
            const direction = index % 2 === 0 ? -1 : 1;
            const content = card.querySelector("[data-feature-content]");

            gsap.fromTo(
              card,
              {
                y: desktop ? 90 : 54,
                x: direction * (desktop ? 38 : 18),
                rotate: direction * 2.4,
                opacity: 0,
                clipPath:
                  direction < 0
                    ? "polygon(0 0,0 0,0 100%,0 100%)"
                    : "polygon(100% 0,100% 0,100% 100%,100% 100%)",
              },
              {
                y: 0,
                x: 0,
                rotate: direction * (desktop ? 0.8 : 0.3),
                opacity: 1,
                clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)",
                duration: 1.05,
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
                { y: 30, opacity: 0 },
                {
                  y: 0,
                  opacity: 1,
                  duration: 0.72,
                  delay: 0.14,
                  ease: "power3.out",
                  scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
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
                  `+=${window.innerHeight * (desktop ? 1.7 : 1.25)}`,
                pin: desktop,
                scrub: desktop ? 1 : 0.7,
                invalidateOnRefresh: true,
              },
            });

            uiTl.fromTo(
              uiFrame,
              {
                scale: 0.86,
                rotateX: 12,
                rotateY: -10,
                filter: "brightness(.55) saturate(.7)",
                transformPerspective: 1400,
              },
              {
                scale: 1,
                rotateX: 0,
                rotateY: 0,
                filter: "brightness(1) saturate(1)",
                duration: 1,
                ease: "power3.inOut",
              }
            );

            uiRows.forEach((row, index) => {
              uiTl.fromTo(
                row,
                { xPercent: 5, opacity: 0.18 },
                {
                  xPercent: 0,
                  opacity: 1,
                  duration: 0.2,
                  ease: "power2.out",
                },
                0.16 + index * 0.045
              );
            });

            uiPanels.forEach((panel, index) => {
              uiTl.fromTo(
                panel,
                {
                  y: 24,
                  opacity: 0,
                  filter: "blur(6px)",
                },
                {
                  y: 0,
                  opacity: 1,
                  filter: "blur(0px)",
                  duration: 0.3,
                  ease: "power3.out",
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
            finalSection.querySelectorAll("[data-final-kairos-letter]")
          );
          const finalCopy = gsap.utils.toArray(
            finalSection.querySelectorAll("[data-final-kairos-copy]")
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

          return () => {
            heroTl?.scrollTrigger?.kill();
            heroTl?.kill();
          };
        }
      );

      /* POINTER FIELD IN HERO */
      const pointerField = hero.querySelector("[data-kairos-pointer]");

      if (
        pointerField &&
        !window.matchMedia("(pointer: coarse)").matches
      ) {
        const moveX = gsap.quickTo(pointerField, "x", {
          duration: 0.8,
          ease: "power3.out",
        });
        const moveY = gsap.quickTo(pointerField, "y", {
          duration: 0.8,
          ease: "power3.out",
        });
        const rotY = gsap.quickTo(pointerField, "rotationY", {
          duration: 0.9,
          ease: "power3.out",
        });
        const rotX = gsap.quickTo(pointerField, "rotationX", {
          duration: 0.9,
          ease: "power3.out",
        });

        pointerMove = (event) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;

          moveX(nx * 18);
          moveY(ny * 12);
          rotY(nx * 2.8);
          rotX(ny * -2.2);
        };

        window.addEventListener("pointermove", pointerMove, {
          passive: true,
        });
      }
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

          .kairos-orbit {
            background:
              conic-gradient(
                from 15deg,
                transparent 0deg 24deg,
                rgba(53,216,255,.7) 25deg,
                rgba(53,216,255,.06) 36deg,
                transparent 48deg 120deg,
                rgba(139,92,246,.58) 121deg,
                rgba(139,92,246,.05) 135deg,
                transparent 148deg 228deg,
                rgba(32,240,199,.48) 229deg,
                rgba(32,240,199,.04) 240deg,
                transparent 252deg 305deg,
                rgba(255,79,216,.42) 306deg,
                rgba(255,79,216,.04) 320deg,
                transparent 333deg
              );
            -webkit-mask:
              radial-gradient(
                farthest-side,
                transparent calc(100% - 1px),
                #000 calc(100% - 1px)
              );
            mask:
              radial-gradient(
                farthest-side,
                transparent calc(100% - 1px),
                #000 calc(100% - 1px)
              );
          }

          .kairos-feature {
            transition:
              border-color .45s ease,
              border-radius .65s cubic-bezier(.16,1,.3,1),
              box-shadow .65s cubic-bezier(.16,1,.3,1);
          }

          .kairos-feature:hover {
            border-radius: 54px;
            border-color: rgba(255,255,255,.26);
            box-shadow:
              0 30px 90px rgba(0,0,0,.35),
              inset 0 0 60px rgba(255,255,255,.015);
          }

          .kairos-feature:hover .kairos-feature-title {
            transform: translateX(.6vw) skewX(-2deg);
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

          @media (max-width: 767px) {
            .kairos-grid {
              background-size: 44px 44px;
            }

            .kairos-feature:hover {
              border-radius: 30px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .kairos-feature {
              transition: none;
            }
          }
        `}</style>

        {/* =====================================================
            HERO
        ====================================================== */}
        <section
          ref={heroRef}
          className="kairos-noise relative flex min-h-[100svh] flex-col justify-between overflow-hidden px-5 pb-7 pt-[92px] md:px-9 md:pb-10 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[16vw] top-[5%] h-[50vw] w-[50vw] rounded-full bg-cyan-300/[0.07] blur-[130px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[12vw] top-[18%] h-[46vw] w-[46vw] rounded-full bg-violet-500/[0.065] blur-[135px]"
          />

          <p
            data-kairos-ghost
            aria-hidden="true"
            className="avant-legato-font pointer-events-none absolute left-1/2 top-1/2 whitespace-nowrap text-[45vw] uppercase leading-none tracking-[-0.12em] text-white/[0.025]"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            K
          </p>

          <div
            data-kairos-pointer
            className="pointer-events-none absolute inset-0 z-[2] [transform-style:preserve-3d]"
          >
            <div
              data-kairos-orbit
              className="absolute left-1/2 top-1/2 h-[68vw] w-[68vw] max-h-[860px] max-w-[860px] -translate-x-1/2 -translate-y-1/2 md:h-[54vw] md:w-[54vw] lg:h-[44vw] lg:w-[44vw]"
            >
              <div className="kairos-orbit absolute inset-0 rounded-full" />
              <div className="kairos-orbit absolute inset-[17%] rotate-[52deg] rounded-full opacity-65" />
              <div className="kairos-orbit absolute inset-[34%] -rotate-[31deg] rounded-full opacity-50" />
            </div>

            <div
              data-kairos-mark
              className="absolute left-1/2 top-1/2 h-[28vw] w-[28vw] max-h-[420px] max-w-[420px] -translate-x-1/2 -translate-y-1/2 md:h-[22vw] md:w-[22vw]"
            >
              <div className="absolute left-[14%] top-[8%] h-[84%] w-[8%] skew-y-[-10deg] bg-white" />
              <div className="absolute left-[26%] top-[45%] h-[9%] w-[60%] origin-left -rotate-[44deg] bg-white" />
              <div className="absolute left-[26%] top-[48%] h-[9%] w-[60%] origin-left rotate-[44deg] bg-gradient-to-r from-white via-cyan-300 to-violet-400" />
            </div>

            <div
              data-kairos-light
              aria-hidden="true"
              className="absolute left-[8%] top-1/2 z-[10] h-px w-[84%] origin-left bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_14px_rgba(53,216,255,.38)]"
            />
          </div>

          <div className="relative z-20 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.31em] text-white/42 md:text-[11px]">
            <p data-kairos-meta>
              OXO STUDIO® / PRODUCT
              <br />
              CULTURAL TECHNOLOGY
            </p>

            <p data-kairos-meta className="text-right">
              KAIROS ARCHIVE
              <br />
              SYSTEM / 01
            </p>
          </div>

          <div className="relative z-20 my-auto py-12">
            <p
              data-kairos-meta
              className="avant-legato-font mb-5 text-[9px] uppercase tracking-[0.42em] text-cyan-300 md:text-xs"
            >
              Catalogazione / gestione / conoscenza
            </p>

            <div className="[perspective:1200px]">
              <h1
                data-kairos-title-a
                className="avant-legato-font ombra2 overflow-hidden text-[19vw] uppercase leading-[.7] tracking-[-0.09em] md:text-[14vw] lg:text-[10.8vw]"
              >
                <SplitLetters text="KAIROS" />
              </h1>

              <h1
                data-kairos-title-b
                className="avant-legato-font ombra2 ml-auto w-fit overflow-hidden text-[18vw] uppercase leading-[.7] tracking-[-0.09em] md:text-[13vw] lg:text-[10.2vw]"
              >
                <SplitLetters text="ARCHIVE" />
              </h1>
            </div>
          </div>

          <div className="relative z-20 flex flex-col gap-5 border-t border-white/16 pt-5 md:flex-row md:items-end md:justify-between">
            <p
              data-kairos-meta
              className="avant-legato-font max-w-[900px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.4rem]"
            >
              Il software di catalogazione intelligente per organizzare,
              valorizzare e preservare patrimoni culturali complessi.
            </p>

            <p
              data-kairos-meta
              className="shrink-0 text-[9px] uppercase tracking-[0.31em] text-white/34 md:text-xs"
            >
              Scroll / enter archive ↓
            </p>
          </div>
        </section>

        {/* =====================================================
            INTRO / COSA È
        ====================================================== */}
        <section
          ref={introRef}
          className="kairos-noise relative overflow-hidden border-y border-white/12 bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[16vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-[8vw]">
            <div>
              <p
                data-kairos-copy
                className="mb-6 text-[10px] uppercase tracking-[0.4em] text-violet-400 md:text-xs"
              >
                01 / COSA È
              </p>

              <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw] [perspective:1000px]">
                <span className="block overflow-hidden pb-[0.08em]">
                  <SplitLetters text="UN SISTEMA" attribute="data-intro-letter" />
                </span>
                <span className="block overflow-hidden pb-[0.08em]">
                  <SplitLetters text="CHE PENSA." attribute="data-intro-letter" />
                </span>
              </h2>
            </div>

            <div className="flex flex-col justify-end gap-9">
              <p
                data-kairos-copy
                className="avant-legato-font text-xl leading-snug text-gray-200 md:text-3xl"
              >
                Kairos Archive è un software all-in-one per catalogazione,
                gestione e consultazione di archivi, biblioteche e collezioni.
              </p>

              <p
                data-kairos-copy
                className="avant-legato-font border-l border-cyan-300/40 pl-5 text-lg leading-relaxed text-gray-400 md:text-2xl"
              >
                Nato per trasformare dati, documenti e metadati in conoscenza
                accessibile, ordinata e pronta a durare.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            PER CHI
        ====================================================== */}
        <section
          ref={usersRef}
          className="relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-45" />

          <div className="relative z-10 mb-16 flex flex-col gap-6 border-b border-white/14 pb-8 md:flex-row md:items-end md:justify-between lg:mb-24">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-fuchsia-400 md:text-xs">
                02 / DESTINATARI
              </p>

              <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
                PER CHI
                <br />
                È PENSATO.
              </h2>
            </div>

            <p className="avant-legato-font max-w-[620px] text-xl leading-snug text-gray-300 md:text-3xl">
              Una sola architettura, adattabile a patrimoni, flussi e livelli
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
            FEATURES
        ====================================================== */}
        <section
          ref={featuresRef}
          className="kairos-noise relative overflow-hidden border-y border-white/12 bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-55" />

          <div className="relative z-10 mb-16 md:mb-24">
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-cyan-300 md:text-xs">
              03 / FUNZIONALITÀ
            </p>

            <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
              COMPLESSO
              <br />
              FUORI. CHIARO DENTRO.
            </h2>
          </div>

          <div className="relative z-10 grid gap-5 md:grid-cols-2 lg:gap-6">
            {FEATURES.map((item) => (
              <article
                key={item.id}
                data-feature-card
                className="kairos-feature relative min-h-[48svh] overflow-hidden rounded-[30px] border border-white/14 bg-[#030304] p-7 md:min-h-[52svh] md:rounded-[42px] md:p-9 lg:p-[2.6vw]"
              >
                <div
                  className="pointer-events-none absolute -right-[15%] -top-[15%] h-[65%] w-[65%] rounded-full blur-[85px]"
                  style={{
                    background: `radial-gradient(circle, ${item.accent}26, transparent 68%)`,
                  }}
                />

                <div className="kairos-grid pointer-events-none absolute inset-0 opacity-45" />

                <div
                  data-feature-content
                  className="relative z-10 flex h-full min-h-[42svh] flex-col justify-between"
                >
                  <div className="flex items-start justify-between text-[9px] uppercase tracking-[0.3em] text-white/38 md:text-xs">
                    <span>{item.id}</span>
                    <span>{item.meta}</span>
                  </div>

                  <div>
                    <div
                      className="mb-7 h-px w-full"
                      style={{
                        background: `linear-gradient(90deg, ${item.accent}, transparent)`,
                      }}
                    />

                    <h3 className="kairos-feature-title avant-legato-font ombra2 text-[12vw] uppercase leading-[.72] tracking-[-0.075em] transition-transform duration-700 md:text-[7vw] lg:text-[4.8vw]">
                      {item.title}
                    </h3>

                    <p className="avant-legato-font mt-7 max-w-[720px] text-lg leading-snug text-gray-300 md:text-2xl">
                      {item.copy}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =====================================================
            INTERFACE
        ====================================================== */}
        <section
          ref={interfaceRef}
          className="relative bg-[#020203]"
        >
          <div className="relative z-10 px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]">
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-violet-400 md:text-xs">
              04 / INTERFACCIA
            </p>

            <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="PULITA."
                  attribute="data-interface-letter"
                />
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="POTENTE."
                  attribute="data-interface-letter"
                />
              </span>
            </h2>
          </div>

          <div
            data-interface-stage
            className="kairos-noise relative flex min-h-[100svh] items-center overflow-hidden border-y border-white/12 bg-[#050506] px-3 py-10 md:px-6 md:py-14 lg:px-[3vw]"
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
                    REAL PRODUCT / DASHBOARD
                  </p>
                  <p className="avant-legato-font mt-2 text-xl text-white/72 md:text-2xl">
                    L’interfaccia reale, ricostruita nel sito.
                  </p>
                </div>

                <p className="max-w-[620px] text-[9px] uppercase leading-relaxed tracking-[0.24em] text-white/30 md:text-right md:text-[10px]">
                  Catalogazione / digitalizzazione / revisione / localizzazioni /
                  workspace / team
                </p>
              </div>

              <div
                data-ui-frame
                className="kairos-ui-shell kairos-real-dashboard relative overflow-hidden rounded-[18px] border border-white/10"
              >
                {/* TOP APP TITLE */}
                <div className="kd-topbar flex h-10 items-center justify-center px-4 text-[9px] font-medium text-white/85">
                  KairosArchive - Next Shadcn Dashboard Starter
                </div>

                <div className="grid min-h-[760px] grid-cols-1 md:grid-cols-[230px_1fr] lg:min-h-[820px]">
                  {/* SIDEBAR */}
                  <aside className="kd-sidebar hidden min-w-0 flex-col md:flex">
                    <div className="flex h-[58px] items-center gap-3 border-b border-[#292929] px-3">
                      <div className="grid h-7 w-7 shrink-0 place-items-center bg-indigo-600 text-[13px] text-white">
                        ▰
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[11px] text-white">
                          KAIROS ARCHIVE
                        </p>
                        <p className="text-[9px] text-white/38">DEMO WORKSPACE</p>
                      </div>

                      <span className="text-[12px] text-white/70">⌃⌄</span>
                    </div>

                    <nav className="flex-1 overflow-hidden px-2 py-4 text-[10px] text-white/78">
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
                          <span>Catalogazione</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Schede", "Frontespizio", "Topografia"].map((item) => (
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
                          <span>Digitali</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Generate", "Approvate", "Revisione"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}

                      {[
                        ["⌖", "Localizzate"],
                        ["▱", "Workspaces"],
                        ["♙", "Teams"],
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

                  {/* MAIN APP */}
                  <div className="min-w-0 bg-[#0d0d0e]">
                    {/* INNER TOPBAR */}
                    <div className="flex h-[58px] items-center justify-between border-b border-[#242424] px-4 md:px-5">
                      <div className="flex items-center gap-4 text-[10px] text-white/78">
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

                    <div className="kd-scrollbar overflow-x-auto p-4 md:p-5">
                      {/* KPI ROW */}
                      <div className="grid min-w-[760px] grid-cols-4 gap-3">
                        {[
                          {
                            label: "In revisione",
                            value: "18",
                            badge: "↗ +12%",
                            caption: "Record nel flusso di revisione",
                            sub: "Demo / aggiornamento operativo",
                          },
                          {
                            label: "Auto-salvati oggi",
                            value: "46",
                            badge: "↗ +48%",
                            caption: "Bozze create oggi",
                            sub: "Demo / salvataggio continuo",
                          },
                          {
                            label: "Tempo medio per record",
                            value: "02:34",
                            badge: "↘ -18%",
                            caption: "OCR → OPAC → decisione",
                            sub: "Demo / tempo medio di lavorazione",
                          },
                          {
                            label: "Localizzazioni Polo oggi",
                            value: "32",
                            badge: "↗ +21%",
                            caption: "Inviate e tracciate nel flusso",
                            sub: "Demo / 31 confermate · 1 in verifica",
                          },
                        ].map((item) => (
                          <article
                            key={item.label}
                            data-ui-panel
                            className="kd-card min-h-[132px] p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-[9px] text-white/45">
                                {item.label}
                              </span>
                              <span className="border border-[#303030] bg-[#1c1c1c] px-1.5 py-0.5 text-[8px] text-white/68">
                                {item.badge}
                              </span>
                            </div>

                            <p className="mt-2 text-[28px] font-semibold leading-none tracking-[-.05em] text-white">
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
                        className="kd-panel mt-3 min-w-[760px]"
                      >
                        <div className="grid grid-cols-[1fr_120px_120px] border-b border-[#2b2b2b]">
                          <div className="p-4">
                            <h4 className="text-[11px] font-semibold text-white/92">
                              Andamento lavorazione record
                            </h4>
                            <p className="mt-1 text-[9px] text-white/42">
                              Dati reali degli ultimi giorni per cliente attivo
                            </p>
                          </div>

                          <div className="border-l border-[#2b2b2b] p-4">
                            <p className="text-[8px] text-white/42">
                              Schede generate
                            </p>
                            <p className="mt-1 text-[26px] font-semibold leading-none text-white">
                              184
                            </p>
                          </div>

                          <div className="border-l border-[#2b2b2b] p-4">
                            <p className="text-[8px] text-white/42">
                              Localizzate
                            </p>
                            <p className="mt-1 text-[26px] font-semibold leading-none text-white">
                              96
                            </p>
                          </div>
                        </div>

                        <div className="kd-chart-grid relative h-[270px] overflow-hidden px-5 pt-5">
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
                      <div className="mt-3 grid min-w-[760px] grid-cols-2 gap-3">
                        <section
                          data-ui-panel
                          className="kd-panel min-h-[300px] p-4"
                        >
                          <h4 className="text-[11px] font-semibold text-white/92">
                            Distribuzione esiti lavorazione
                          </h4>
                          <p className="mt-1 text-[9px] text-white/42">
                            Ripartizione dei record per stato
                          </p>

                          <div className="grid min-h-[225px] grid-cols-[170px_1fr] items-center gap-5">
                            <div className="flex items-center justify-center">
                              <div className="kd-donut relative h-[150px] w-[150px] rounded-full">
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                                  <span className="text-[26px] font-semibold leading-none text-white">
                                    184
                                  </span>
                                  <span className="mt-2 text-[8px] text-white/46">
                                    Record demo
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 text-[8px]">
                              {[
                                ["Approvati", "126", "rgba(255,255,255,.52)"],
                                ["In revisione", "18", "rgba(139,92,246,.75)"],
                                ["Bozze", "28", "rgba(53,216,255,.72)"],
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
                                Ultimi Record Elaborati
                              </h4>
                              <p className="mt-1 text-[9px] text-white/42">
                                Anteprima demo delle attività recenti
                              </p>
                            </div>

                            <span className="border border-[#303030] bg-[#1c1c1c] px-2 py-1 text-[7px] uppercase tracking-[0.2em] text-white/46">
                              LIVE FLOW
                            </span>
                          </div>

                          <div className="mt-4">
                            {[
                              ["KA-001842", "Fondo fotografico storico", "Approvato", "#20f0c7"],
                              ["KA-001841", "Periodici locali / 1968", "Revisione", "#8b5cf6"],
                              ["KA-001840", "Carteggio istituzionale", "OCR", "#35d8ff"],
                              ["KA-001839", "Manifesti e materiale grafico", "Bozza", "#ff4fd8"],
                              ["KA-001838", "Collezione bibliografica", "Localizzato", "#20f0c7"],
                            ].map(([code, title, state, accent]) => (
                              <div
                                key={code}
                                data-ui-row
                                className="grid grid-cols-[82px_1fr_auto] items-center gap-3 border-b border-white/[0.07] py-3 text-[8px]"
                              >
                                <span className="text-white/34">{code}</span>
                                <span className="truncate text-white/72">{title}</span>
                                <span
                                  className="border px-2 py-1 uppercase tracking-[0.18em]"
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
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {[
                  ["01", "CATALOGAZIONE", "Schede / frontespizio / topografia", "#35d8ff"],
                  ["02", "DIGITALI", "Generate / approvate / revisione", "#8b5cf6"],
                  ["03", "LOCALIZZAZIONI", "Invio e tracciamento operativo", "#20f0c7"],
                  ["04", "WORKSPACE", "Organizzazioni / team / ruoli", "#ff4fd8"],
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
          className="kairos-noise relative overflow-hidden bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-55" />

          <div className="relative z-10 grid gap-16 lg:grid-cols-[1fr_.9fr] lg:gap-[8vw]">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-emerald-300 md:text-xs">
                05 / TECNOLOGIA E SICUREZZA
              </p>

              <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
                COSTRUITO
                <br />
                PER DURARE.
              </h2>

              <p className="avant-legato-font mt-10 max-w-[780px] text-xl leading-snug text-gray-300 md:text-3xl">
                Un prodotto moderno deve essere scalabile, leggibile,
                manutenibile e sicuro quanto i dati che custodisce.
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

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12vw] top-[5%] h-[60vw] w-[60vw] rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.18), rgba(139,92,246,.13) 36%, rgba(255,79,216,.07) 54%, transparent 72%)",
            }}
          />

          <div className="relative z-10 w-full">
            <div
              data-final-kairos-copy
              className="mb-8 flex items-center justify-between border-b border-white/18 pb-5 text-[9px] uppercase tracking-[0.31em] text-white/34 md:text-[11px]"
            >
              <span>KAIROS ARCHIVE / OXO STUDIO</span>
              <span>KNOWLEDGE / ORGANIZED</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[16vw] uppercase leading-[.69] tracking-[-0.09em] md:text-[12vw] lg:text-[9.6vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="VALORIZZA."
                  attribute="data-final-kairos-letter"
                />
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="CONSERVA."
                  attribute="data-final-kairos-letter"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/18 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                data-final-kairos-copy
                className="avant-legato-font max-w-[860px] text-xl leading-snug text-gray-300 md:text-3xl"
              >
                Kairos Archive non è solo un software: è uno strumento per dare
                valore alla memoria, rendendola accessibile, sicura e pronta
                per il futuro.
              </p>

              <Link
                to="/Contatti"
                data-final-kairos-copy
                className="avant-legato-font group inline-flex w-fit items-center gap-5 border border-white/30 bg-white/[0.035] px-5 py-4 text-sm uppercase tracking-[0.28em] text-white md:px-6 md:text-base"
              >
                <span>Parliamo di Kairos</span>
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
