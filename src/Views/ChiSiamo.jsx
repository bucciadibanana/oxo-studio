import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";


gsap.registerPlugin(ScrollTrigger);

const FIELD_PHASES = [
  {
    id: "01",
    eyebrow: "INPUT",
    title: "COMPLEXITY",
    statement: "READ THE SIGNAL",
    copy: "Entriamo nel problema senza semplificarlo troppo presto. Osserviamo flussi, attriti, dati e comportamento.",
    accent: "#35d8ff",
  },
  {
    id: "02",
    eyebrow: "PROCESS",
    title: "REDUCE",
    statement: "REMOVE THE NOISE",
    copy: "Riduciamo il rumore fino a lasciare soltanto ciò che serve: struttura, gerarchia, ritmo e funzione.",
    accent: "#8b5cf6",
  },
  {
    id: "03",
    eyebrow: "OUTPUT",
    title: "CLARITY",
    statement: "BUILD THE SYSTEM",
    copy: "Il risultato non è un effetto. È un sistema digitale leggibile, riconoscibile e capace di evolvere.",
    accent: "#ff4fd8",
  },
];

const TEAM = [
  {
    id: "01",
    name: "MATTEO POLI",
    role: "SOFTWARE / AI / PRODUCT",
    initials: "MP",
    image: "/images/team/matteo-poli.webp",
    accent: "#35d8ff",
    description:
      "Trasforma idee, dati e necessità operative in architetture digitali, automazioni e prodotti utilizzabili.",
    fallback:
      "radial-gradient(circle at 70% 25%, rgba(53,216,255,.32), transparent 32%), linear-gradient(145deg, #06141d, #05060b 55%, #010101)",
  },
  {
    id: "02",
    name: "GABRIELE CHIERICI",
    role: "CREATIVE / INTERACTIVE / DEVELOPMENT",
    initials: "GC",
    image: "/images/team/gabriele-chierici.webp",
    accent: "#8b5cf6",
    description:
      "Costruisce direzioni visive e sistemi interattivi in cui identità, movimento e tecnologia parlano la stessa lingua.",
    fallback:
      "radial-gradient(circle at 28% 30%, rgba(139,92,246,.34), transparent 34%), linear-gradient(145deg, #150720, #07070d 56%, #010101)",
  },
];

const PROCESS = [
  {
    id: "01",
    title: "ASCOLTARE",
    copy: "Capire il problema prima di produrre una soluzione.",
  },
  {
    id: "02",
    title: "RIDURRE",
    copy: "Togliere il superfluo fino a rendere leggibile la complessità.",
  },
  {
    id: "03",
    title: "COSTRUIRE",
    copy: "Unire design e ingegneria senza separare forma e funzione.",
  },
  {
    id: "04",
    title: "EVOLVERE",
    copy: "Misurare, imparare e migliorare il prodotto dopo il lancio.",
  },
];

const FULL_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";

const DESKTOP_CUTS = [
  "polygon(0% 42%, 100% 29%, 100% 64%, 0% 57%)",
  "polygon(38% 0%, 64% 0%, 55% 100%, 28% 100%)",
  "polygon(0% 25%, 100% 43%, 100% 58%, 0% 77%)",
];

const MOBILE_CUTS = [
  "polygon(0% 44%, 100% 37%, 100% 63%, 0% 56%)",
  "polygon(0% 33%, 100% 47%, 100% 59%, 0% 71%)",
];

function SplitLetters({ text, attribute = "data-about-letter" }) {
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

export default function ChiSiamo() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const processRef = useRef(null);
  const finalRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const story = storyRef.current;
    const team = teamRef.current;
    const process = processRef.current;
    const finalSection = finalRef.current;

    if (!page || !hero || !story || !team || !process || !finalSection) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    let storyVideos = [];
    let fieldPointerMoveHandler = null;
    let fieldPointerLeaveHandler = null;

    const ctx = gsap.context(() => {
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-about-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-about-meta]")
      );

      gsap.fromTo(
        heroLetters,
        { yPercent: 125, rotateX: -80, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.25,
          stagger: 0.026,
          ease: "power4.out",
          delay: 0.12,
        }
      );

      gsap.fromTo(
        heroMeta,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.58,
        }
      );

      gsap.to(hero.querySelector("[data-hero-title]"), {
        yPercent: 18,
        scale: 0.94,
        opacity: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(hero.querySelector("[data-hero-orb]"), {
        xPercent: 24,
        yPercent: -18,
        rotate: 22,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      const fieldNodes = gsap.utils.toArray(
        story.querySelectorAll("[data-field-node]")
      );

      if (fieldNodes.length && !window.matchMedia("(pointer: coarse)").matches) {
        fieldPointerMoveHandler = (event) => {
          fieldNodes.forEach((node) => {
            const rect = node.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const distance = Math.hypot(event.clientX - cx, event.clientY - cy);
            const influence = Math.max(0, 1 - distance / 220);

            gsap.to(node, {
              scale: 1 + influence * 2.8,
              opacity: 0.45 + influence * 0.55,
              boxShadow: influence > 0.02
                ? `0 0 ${18 + influence * 42}px currentColor, 0 0 ${42 + influence * 90}px currentColor`
                : "0 0 14px currentColor",
              duration: 0.22,
              ease: "power2.out",
              overwrite: true,
            });
          });
        };

        fieldPointerLeaveHandler = () => {
          gsap.to(fieldNodes, {
            scale: 1,
            opacity: 0.55,
            boxShadow: "0 0 14px currentColor",
            duration: 0.45,
            ease: "power3.out",
            overwrite: true,
          });
        };

        story.addEventListener("pointermove", fieldPointerMoveHandler, {
          passive: true,
        });
        story.addEventListener("pointerleave", fieldPointerLeaveHandler);
      }

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions;
          const phases = gsap.utils.toArray(
            story.querySelectorAll("[data-field-phase]")
          );
          const blades = gsap.utils.toArray(
            story.querySelectorAll("[data-field-blade]")
          );
          const phaseTitles = phases
            .map((phase) => phase.querySelector("[data-field-title]"))
            .filter(Boolean);
          const phaseCopies = phases
            .map((phase) => phase.querySelector("[data-field-copy]"))
            .filter(Boolean);
          const phaseStatements = phases
            .map((phase) => phase.querySelector("[data-field-statement]"))
            .filter(Boolean);
          const core = story.querySelector("[data-field-core]");
          const coreInner = story.querySelector("[data-field-core-inner]");
          const scan = story.querySelector("[data-field-scan]");
          const progress = story.querySelector("[data-field-progress]");
          const counter = story.querySelector("[data-field-counter]");
          const ghost = story.querySelector("[data-field-ghost]");

          if (!phases.length) return undefined;

          const setActivePhase = (index) => {
            if (counter) {
              counter.textContent = String(index + 1).padStart(2, "0");
            }
          };

          if (reduceMotion) {
            gsap.set(story, { height: "auto", overflow: "visible" });
            gsap.set(phases, {
              position: "relative",
              autoAlpha: 1,
              minHeight: "82svh",
              clipPath: "inset(0 0 0 0)",
            });
            gsap.set(blades, { display: "none" });
            gsap.set(progress, { scaleX: 1, transformOrigin: "left center" });
            return undefined;
          }

          gsap.set(phases, { autoAlpha: 0 });
          gsap.set(phases[0], { autoAlpha: 1 });
          gsap.set(phaseTitles, {
            yPercent: 115,
            rotateX: -72,
            transformOrigin: "50% 100%",
          });
          gsap.set(phaseTitles[0], { yPercent: 0, rotateX: 0 });
          gsap.set(phaseCopies, { y: 45, autoAlpha: 0 });
          gsap.set(phaseCopies[0], { y: 0, autoAlpha: 1 });
          gsap.set(phaseStatements, { xPercent: 10, autoAlpha: 0 });
          gsap.set(phaseStatements[0], { xPercent: 0, autoAlpha: 1 });
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          gsap.set(blades, {
            scaleY: 0.12,
            transformOrigin: "center center",
          });
          setActivePhase(0);

          const fieldTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: story,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * (desktop ? 3.2 : 2.45)}`,
              pin: true,
              scrub: desktop ? 1 : 0.72,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (progress) {
                  gsap.set(progress, { scaleX: self.progress });
                }

                const active = Math.min(
                  FIELD_PHASES.length - 1,
                  Math.floor(self.progress * FIELD_PHASES.length)
                );
                setActivePhase(active);
              },
            },
          });

          blades.forEach((blade, index) => {
            fieldTimeline.to(
              blade,
              {
                scaleY: index % 2 === 0 ? 1 : 0.72,
                yPercent: index % 2 === 0 ? -10 : 10,
                duration: 0.65,
                ease: "power3.inOut",
              },
              0
            );
          });

          if (core) {
            fieldTimeline.fromTo(
              core,
              {
                scale: 0.58,
                rotate: -10,
                borderRadius: "38%",
              },
              {
                scale: 1,
                rotate: 0,
                borderRadius: "3%",
                duration: 0.72,
                ease: "power3.inOut",
              },
              0
            );
          }

          if (coreInner) {
            fieldTimeline.to(
              coreInner,
              {
                rotate: 90,
                scale: 0.72,
                duration: 0.72,
              },
              0
            );
          }

          if (scan) {
            fieldTimeline.fromTo(
              scan,
              { yPercent: -120, autoAlpha: 0 },
              {
                yPercent: 120,
                autoAlpha: 0.9,
                duration: 0.72,
                ease: "none",
              },
              0
            );
          }

          if (ghost) {
            fieldTimeline.to(
              ghost,
              {
                xPercent: -18,
                skewX: -8,
                duration: 0.72,
              },
              0
            );
          }

          phases.forEach((phase, index) => {
            if (index === 0) return;

            const previous = phases[index - 1];
            const previousTitle = previous.querySelector("[data-field-title]");
            const previousCopy = previous.querySelector("[data-field-copy]");
            const previousStatement = previous.querySelector(
              "[data-field-statement]"
            );
            const currentTitle = phase.querySelector("[data-field-title]");
            const currentCopy = phase.querySelector("[data-field-copy]");
            const currentStatement = phase.querySelector(
              "[data-field-statement]"
            );
            const accent = FIELD_PHASES[index].accent;
            const direction = index % 2 === 0 ? -1 : 1;
            const label = `field-${index}`;

            fieldTimeline.addLabel(label, `+=${desktop ? 0.22 : 0.14}`);

            if (previousTitle) {
              fieldTimeline.to(
                previousTitle,
                {
                  yPercent: -110,
                  rotateX: 62,
                  autoAlpha: 0,
                  duration: 0.36,
                  ease: "power2.in",
                },
                label
              );
            }

            if (previousCopy) {
              fieldTimeline.to(
                previousCopy,
                {
                  y: -35,
                  autoAlpha: 0,
                  duration: 0.3,
                },
                label
              );
            }

            if (previousStatement) {
              fieldTimeline.to(
                previousStatement,
                {
                  xPercent: direction * -12,
                  autoAlpha: 0,
                  duration: 0.28,
                },
                label
              );
            }

            fieldTimeline.set(previous, { autoAlpha: 0 }, `${label}+=0.34`);
            fieldTimeline.set(phase, { autoAlpha: 1 }, `${label}+=0.28`);

            if (currentTitle) {
              fieldTimeline.fromTo(
                currentTitle,
                {
                  yPercent: 120,
                  rotateX: -76,
                  skewX: direction * 8,
                  autoAlpha: 0,
                },
                {
                  yPercent: 0,
                  rotateX: 0,
                  skewX: 0,
                  autoAlpha: 1,
                  duration: 0.52,
                  ease: "power4.out",
                },
                `${label}+=0.31`
              );
            }

            if (currentCopy) {
              fieldTimeline.fromTo(
                currentCopy,
                {
                  y: 46,
                  autoAlpha: 0,
                },
                {
                  y: 0,
                  autoAlpha: 1,
                  duration: 0.46,
                  ease: "power3.out",
                },
                `${label}+=0.38`
              );
            }

            if (currentStatement) {
              fieldTimeline.fromTo(
                currentStatement,
                {
                  xPercent: direction * 12,
                  autoAlpha: 0,
                },
                {
                  xPercent: 0,
                  autoAlpha: 1,
                  duration: 0.5,
                  ease: "power3.out",
                },
                `${label}+=0.35`
              );
            }

            blades.forEach((blade, bladeIndex) => {
              fieldTimeline.to(
                blade,
                {
                  xPercent:
                    direction *
                    (bladeIndex % 2 === 0 ? 22 + bladeIndex * 5 : -18),
                  scaleY: bladeIndex % 2 === index % 2 ? 0.38 : 1,
                  backgroundColor:
                    bladeIndex === index
                      ? accent
                      : "rgba(255,255,255,.055)",
                  duration: 0.68,
                  ease: "power3.inOut",
                },
                label
              );
            });

            if (core) {
              fieldTimeline.to(
                core,
                {
                  rotate: direction * 7,
                  scale: index === 2 ? 1.16 : 0.88,
                  borderColor: accent,
                  duration: 0.68,
                  ease: "power3.inOut",
                },
                label
              );
            }

            if (coreInner) {
              fieldTimeline.to(
                coreInner,
                {
                  rotate: index * 90 + direction * 28,
                  scale: index === 2 ? 1.25 : 0.72,
                  duration: 0.68,
                },
                label
              );
            }

            if (scan) {
              fieldTimeline.fromTo(
                scan,
                {
                  yPercent: -120,
                  autoAlpha: 0,
                  backgroundColor: accent,
                },
                {
                  yPercent: 120,
                  autoAlpha: 0.85,
                  duration: 0.62,
                  ease: "none",
                },
                label
              );
            }

            if (ghost) {
              fieldTimeline.to(
                ghost,
                {
                  xPercent: direction * (index === 2 ? -30 : 24),
                  skewX: direction * -6,
                  duration: 0.68,
                },
                label
              );
            }

            fieldTimeline.to({}, { duration: desktop ? 0.38 : 0.25 });
          });

          return () => {
            fieldTimeline.scrollTrigger?.kill();
            fieldTimeline.kill();
          };
        }
      );

      const teamCards = gsap.utils.toArray(
        team.querySelectorAll("[data-team-card]")
      );

      teamCards.forEach((card, index) => {
        const media = card.querySelector("[data-team-media]");
        const content = card.querySelector("[data-team-content]");

        gsap.fromTo(
          card,
          {
            clipPath:
              index % 2 === 0
                ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          },
          {
            clipPath: FULL_CLIP,
            duration: 1.15,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (media) {
          gsap.fromTo(
            media,
            { scale: 1.16 },
            {
              scale: 1,
              duration: 1.5,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
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
              duration: 0.8,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 76%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      const processRows = gsap.utils.toArray(
        process.querySelectorAll("[data-process-row]")
      );

      gsap.fromTo(
        processRows,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: process,
            start: "top 67%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const finalLetters = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-final-letter]")
      );

      gsap.fromTo(
        finalLetters,
        { yPercent: 120, rotateX: -75, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.025,
          ease: "power4.out",
          scrollTrigger: {
            trigger: finalSection,
            start: "top 67%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, page);

    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh(true);
      ScrollTrigger.update();
    };

    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(refresh);
    });

    const timer = window.setTimeout(refresh, 350);
    window.addEventListener("load", refresh);

    let cancelled = false;

    if (document.fonts?.ready) {
      document.fonts.ready
        .then(() => {
          if (!cancelled) refresh();
        })
        .catch(() => {});
    }

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(firstFrame);

      if (secondFrame) {
        window.cancelAnimationFrame(secondFrame);
      }

      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
      storyVideos.forEach((video) => video.pause());

      if (fieldPointerMoveHandler) {
        story.removeEventListener("pointermove", fieldPointerMoveHandler);
      }
      if (fieldPointerLeaveHandler) {
        story.removeEventListener("pointerleave", fieldPointerLeaveHandler);
      }

      // Eliminano soltanto animazioni, timeline e pin creati da questa pagina.
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <>
      <SeoMetaTags />

      <main
        ref={pageRef}
        className="relative overflow-x-hidden bg-[#030303] text-white"
      >
        <style>{`
          @keyframes oxoAboutPulse {
            0%, 100% { opacity: .22; transform: scaleX(.74); }
            50% { opacity: .92; transform: scaleX(1); }
          }
          @keyframes oxoAboutFloat {
            0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
            50% { transform: translate3d(3vw, -2.5vh, 0) rotate(7deg); }
          }
          @keyframes oxoAboutBlink {
            0%, 88%, 100% { opacity: .25; }
            89%, 93% { opacity: 1; }
          }
          .oxo-about-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
            background-size: 64px 64px;
            mask-image: linear-gradient(to bottom, transparent, black 14%, black 86%, transparent);
          }
          .oxo-about-noise::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: .055;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode: soft-light;
          }
          .oxo-team-card:hover .oxo-team-image {
            transform: scale(1.045);
            filter: saturate(1.12) contrast(1.04);
          }
          .oxo-process-row:hover .oxo-process-title {
            transform: translateX(1.2vw);
          }
          .oxo-process-row:hover .oxo-process-arrow {
            transform: translateX(.6rem) rotate(-45deg);
          }
          @keyframes oxoFieldFlicker {
            0%, 84%, 100% { opacity: .28; }
            86%, 90% { opacity: .95; }
          }

          .oxo-field-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
            background-size: 72px 72px;
            mask-image: linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
          }

          .oxo-field-blade {
            will-change: transform, background-color;
            box-shadow:
              inset 1px 0 rgba(255,255,255,.08),
              inset -1px 0 rgba(255,255,255,.04);
          }

          .oxo-field-outline {
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,.14);
          }

          .oxo-field-flicker {
            animation: oxoFieldFlicker 3.8s linear infinite;
          }

          .oxo-field-node {
            color: var(--node-color);
            opacity: .55;
            transition:
              transform .22s cubic-bezier(.16,1,.3,1),
              opacity .22s ease,
              filter .22s ease;
            will-change: transform, opacity, box-shadow;
          }

          .oxo-field-node:hover {
            transform: scale(3.2);
            opacity: 1;
            filter: saturate(1.8) brightness(1.4);
          }

          /* SAFE CONTINUOUS FLOW: solo gradienti locali, nessun layer fixed */
          .oxo-flow-safe {
            position: relative;
            isolation: isolate;
          }

          .oxo-flow-safe::before,
          .oxo-flow-safe::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            height: min(26vh, 280px);
            pointer-events: none;
            z-index: 1;
          }

          .oxo-flow-safe::before {
            top: 0;
            background: linear-gradient(to bottom, var(--flow-in, transparent), transparent 92%);
          }

          .oxo-flow-safe::after {
            bottom: 0;
            background: linear-gradient(to bottom, transparent 8%, var(--flow-out, transparent));
          }

          .oxo-flow-hero-safe { --flow-out: rgba(53,216,255,.09); }
          .oxo-flow-field-safe { --flow-in: rgba(53,216,255,.09); --flow-out: rgba(139,92,246,.10); }
          .oxo-flow-team-safe { --flow-in: rgba(139,92,246,.10); --flow-out: rgba(139,92,246,.07); }
          .oxo-flow-process-safe { --flow-in: rgba(139,92,246,.07); --flow-out: rgba(53,216,255,.07); }
          .oxo-flow-final-safe { --flow-in: rgba(53,216,255,.07); }

          .oxo-flow-glow {
            position: absolute;
            left: 50%;
            width: min(90vw, 1200px);
            height: min(38vw, 520px);
            transform: translateX(-50%);
            border-radius: 50%;
            filter: blur(90px);
            opacity: .22;
            pointer-events: none;
            z-index: 0;
          }

          @keyframes oxoFlowDrift {
            0%, 100% { transform: translateX(-52%) scale(.92); opacity: .16; }
            50% { transform: translateX(-48%) scale(1.08); opacity: .28; }
          }

          .oxo-flow-drift {
            animation: oxoFlowDrift 10s ease-in-out infinite;
          }

        `}</style>

        <section
          ref={heroRef}
          className="oxo-flow-safe oxo-flow-hero-safe oxo-about-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
        >
          <div className="oxo-about-grid pointer-events-none absolute inset-0" />

          <div
            data-hero-orb
            aria-hidden="true"
            className="pointer-events-none absolute -right-[15vw] top-[6vh] h-[55vw] w-[55vw] rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.22) 0%, rgba(139,92,246,.15) 36%, rgba(255,79,216,.08) 52%, transparent 72%)",
              animation: "oxoAboutFloat 11s ease-in-out infinite",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-8%] top-[48%] h-px w-[116%] -rotate-[7deg] bg-gradient-to-r from-transparent via-cyan-300/55 to-violet-500/10"
            style={{ animation: "oxoAboutPulse 4s ease-in-out infinite" }}
          />

          <div className="relative z-10 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:text-[11px]">
            <p data-about-meta>OXO STUDIO®</p>
            <p data-about-meta className="text-right">
              CREATIVE TECHNOLOGY
              <br />
              LA SPEZIA / ITALY
            </p>
          </div>

          <div data-hero-title className="relative z-10 my-auto py-14">
            <p
              data-about-meta
              className="antonio2 mb-4 text-[10px] uppercase tracking-[0.36em] text-cyan-300 md:text-xs"
            >
              Independent digital studio
            </p>

            <h1 className="antonio2 ombra2 overflow-hidden text-[21vw] uppercase leading-[0.72] tracking-[-0.07em] md:text-[18vw] lg:text-[15.5vw]">
              <SplitLetters text="CHI SIAMO" />
            </h1>
          </div>

          <div className="relative z-10 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p
              data-about-meta
              className="antonio max-w-[870px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.35rem]"
            >
              Un piccolo studio con una convinzione enorme: tecnologia e
              creatività funzionano davvero soltanto quando diventano la stessa
              cosa.
            </p>

            <p
              data-about-meta
              className="antonio2 shrink-0 text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
            >
              Scroll to discover ↓
            </p>
          </div>
        </section>

        <section
          ref={storyRef}
          className="oxo-flow-safe oxo-flow-field-safe oxo-about-noise relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-[#020203]"
        >
          <div className="oxo-flow-glow oxo-flow-drift bottom-[-16vh] bg-[radial-gradient(circle,rgba(139,92,246,.55),rgba(53,216,255,.18)_42%,transparent_72%)]" />
          <div className="oxo-field-grid pointer-events-none absolute inset-0 opacity-70" />

          <p
            data-field-ghost
            aria-hidden="true"
            className="oxo-field-outline antonio2 pointer-events-none absolute left-[-4vw] top-1/2 -translate-y-1/2 whitespace-nowrap text-[24vw] uppercase leading-none tracking-[-0.09em] opacity-55"
          >
            SIGNAL / SYSTEM / FORM
          </p>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[2] grid grid-cols-4"
          >
            {["#35d8ff", "#8b5cf6", "#20f0c7", "#ff4fd8"].map(
              (accent, index) => (
                <div
                  key={accent}
                  data-field-blade
                  className="oxo-field-blade relative h-full border-x border-white/[0.04]"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(to bottom, rgba(53,216,255,.16), rgba(255,255,255,.02), transparent)"
                        : "rgba(255,255,255,.025)",
                  }}
                >
                  <span
                    data-field-node
                    className="oxo-field-node pointer-events-auto absolute left-1/2 top-[8%] h-2.5 w-2.5 -translate-x-1/2 rounded-[2px]"
                    style={{
                      "--node-color": accent,
                      backgroundColor: accent,
                      color: accent,
                      boxShadow: `0 0 14px ${accent}`,
                    }}
                  />
                </div>
              )
            )}
          </div>

          <div
            data-field-core
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 z-[4] h-[34vw] w-[34vw] min-h-[260px] min-w-[260px] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 border border-cyan-300/45"
          >
            <div
              data-field-core-inner
              className="absolute inset-[18%] border border-violet-400/35"
            >
              <div className="absolute left-1/2 top-[-18%] h-[136%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/35 to-transparent" />
              <div className="absolute left-[-18%] top-1/2 h-px w-[136%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/35 to-transparent" />
            </div>

            <div className="oxo-field-flicker absolute left-3 top-3 h-2 w-2 bg-cyan-300 shadow-[0_0_18px_rgba(53,216,255,.95)]" />
            <div className="oxo-field-flicker absolute bottom-3 right-3 h-2 w-2 bg-fuchsia-400 shadow-[0_0_18px_rgba(255,79,216,.95)]" />
          </div>

          <div
            data-field-scan
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-1/2 z-[6] h-px w-full bg-cyan-300 shadow-[0_0_16px_rgba(53,216,255,.9),0_0_42px_rgba(53,216,255,.48)]"
          />

          <div className="relative z-10 flex h-full flex-col justify-between px-6 pb-8 pt-8 md:px-10 md:pb-10 lg:px-[4vw] lg:pb-[4vh]">
            <div className="flex items-start justify-between border-b border-white/15 pb-5 text-[9px] uppercase tracking-[0.3em] text-white/45 md:text-[11px]">
              <p>
                CREATIVE OPERATING SYSTEM
                <br />
                OXO / FIELD 001
              </p>

              <p className="text-right">
                LIVE PROCESS
                <br />
                <span data-field-counter className="text-cyan-300">
                  01
                </span>{" "}
                / 03
              </p>
            </div>

            <div className="relative my-auto min-h-[58vh]">
              {FIELD_PHASES.map((phase, index) => (
                <article
                  key={phase.id}
                  data-field-phase
                  className="absolute inset-0 flex flex-col justify-center"
                  style={{
                    opacity: index === 0 ? 1 : 0,
                    visibility: index === 0 ? "visible" : "hidden",
                  }}
                >
                  <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                    <div>
                      <p
                        className="antonio2 mb-4 text-[10px] uppercase tracking-[0.36em] md:text-xs"
                        style={{ color: phase.accent }}
                      >
                        {phase.id} / {phase.eyebrow}
                      </p>

                      <div className="overflow-hidden pb-[2vw]">
                        <h2
                          data-field-title
                          className="antonio2 ombra2 text-[21vw] uppercase leading-[0.67] tracking-[-0.085em] md:text-[15vw] lg:text-[10.8vw]"
                        >
                          {phase.title}
                        </h2>
                      </div>

                      <p
                        data-field-copy
                        className="antonio mt-5 max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl"
                      >
                        {phase.copy}
                      </p>
                    </div>

                    <p
                      data-field-statement
                      aria-hidden="true"
                      className="oxo-field-outline antonio2 hidden text-right text-[6.8vw] uppercase leading-[0.8] tracking-[-0.055em] lg:block"
                    >
                      {phase.statement}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-end justify-between border-t border-white/15 pt-5 text-[9px] uppercase tracking-[0.29em] text-white/40 md:text-[11px]">
              <span>INPUT → PROCESS → OUTPUT</span>
              <span>SCROLL / TRANSFORM ↓</span>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 z-[80] h-px w-full bg-white/15">
            <div
              data-field-progress
              className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
            />
          </div>
        </section>

        <section
          ref={teamRef}
          className="oxo-flow-safe oxo-flow-team-safe relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="oxo-flow-glow top-[-18vh] bg-[radial-gradient(circle,rgba(255,79,216,.36),rgba(139,92,246,.12)_45%,transparent_72%)]" />
          <div className="oxo-about-grid pointer-events-none absolute inset-0 opacity-55" />

          <div className="relative z-10 mb-16 flex flex-col gap-7 border-b border-white/20 pb-8 md:mb-24 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="antonio2 mb-4 text-[10px] uppercase tracking-[0.34em] text-violet-400 md:text-xs">
                The people behind Oxo
              </p>
              <h2 className="antonio2 ombra2 text-[18vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[12vw] lg:text-[9vw]">
                IL TEAM
              </h2>
            </div>

            <p className="antonio max-w-[620px] text-lg leading-snug text-gray-300 md:text-2xl">
              Competenze diverse, una sola direzione: costruire esperienze in
              cui ogni scelta visiva abbia una ragione tecnica e ogni scelta
              tecnica migliori l'esperienza.
            </p>
          </div>

          <div className="relative z-10 grid gap-6 lg:grid-cols-2 lg:gap-[2vw]">
            {TEAM.map((member, index) => (
              <article
                key={member.id}
                data-team-card
                className={`oxo-team-card group relative min-h-[72svh] overflow-hidden border border-white/20 ${
                  index === 1 ? "lg:mt-[10vh]" : ""
                }`}
                style={{ clipPath: FULL_CLIP }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: member.fallback }}
                />

                <div className="oxo-about-grid pointer-events-none absolute inset-0 opacity-70" />

                <img
                  data-team-media
                  className="oxo-team-image absolute inset-0 h-full w-full object-cover opacity-80 transition-[transform,filter] duration-700 ease-out"
                  src={member.image}
                  alt={member.name}
                  loading="lazy"
                  onLoad={() => ScrollTrigger.refresh()}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    ScrollTrigger.refresh();
                  }}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/35" />

                <p
                  aria-hidden="true"
                  className="antonio2 pointer-events-none absolute right-[-1vw] top-[-3vw] text-[24vw] leading-none tracking-[-0.08em] text-white/[0.055]"
                >
                  {member.initials}
                </p>

                <div className="absolute inset-[14px] border border-white/25 md:inset-[22px]" />

                <div className="absolute left-7 top-7 z-10 flex items-center gap-3 md:left-10 md:top-10">
                  <span className="antonio2 text-[10px] uppercase tracking-[0.28em]">
                    {member.id}
                  </span>
                  <span
                    className="h-px w-12"
                    style={{ backgroundColor: member.accent }}
                  />
                </div>

                <div
                  data-team-content
                  className="absolute bottom-8 left-7 right-7 z-10 md:bottom-11 md:left-10 md:right-10"
                >
                  <p
                    className="antonio2 mb-3 text-[10px] uppercase tracking-[0.32em] md:text-xs"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </p>

                  <h3 className="antonio2 ombra2 text-[clamp(3.1rem,7.6vw,7.4rem)] uppercase leading-[0.78] tracking-[-0.055em]">
                    {member.name}
                  </h3>

                  <p className="antonio mt-5 max-w-[610px] text-base leading-snug text-gray-200 md:text-xl lg:text-2xl">
                    {member.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={processRef}
          className="oxo-flow-safe oxo-flow-process-safe relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="oxo-flow-glow top-[-18vh] bg-[radial-gradient(circle,rgba(139,92,246,.30),rgba(53,216,255,.10)_48%,transparent_72%)]" />
          <div className="oxo-about-grid pointer-events-none absolute inset-0 opacity-55" />

          <div className="relative z-10 grid gap-14 lg:grid-cols-[.75fr_1.25fr] lg:gap-[8vw]">
            <div>
              <p className="antonio2 mb-4 text-[10px] uppercase tracking-[0.34em] text-cyan-300 md:text-xs">
                Il nostro metodo
              </p>

              <h2 className="antonio2 ombra2 text-[17vw] uppercase leading-[0.76] tracking-[-0.065em] md:text-[11vw] lg:sticky lg:top-[12vh] lg:text-[7.6vw]">
                COME
                <br />
                LAVORIAMO
              </h2>
            </div>

            <div className="border-t border-white/25">
              {PROCESS.map((step) => (
                <article
                  key={step.id}
                  data-process-row
                  className="oxo-process-row group grid min-h-[180px] grid-cols-[48px_1fr_auto] items-center gap-4 border-b border-white/20 py-8 md:min-h-[220px] md:grid-cols-[70px_1fr_auto] md:gap-7"
                >
                  <span className="antonio2 self-start pt-2 text-[10px] tracking-[0.28em] text-gray-500 md:text-xs">
                    {step.id}
                  </span>

                  <div>
                    <h3 className="oxo-process-title antonio2 text-[12vw] uppercase leading-[0.8] tracking-[-0.055em] transition-transform duration-500 ease-out md:text-[7vw] lg:text-[5.8vw]">
                      {step.title}
                    </h3>
                    <p className="antonio mt-4 max-w-[640px] text-base leading-snug text-gray-400 md:text-xl">
                      {step.copy}
                    </p>
                  </div>

                  <span className="oxo-process-arrow antonio2 text-2xl transition-transform duration-500 ease-out md:text-4xl">
                    ↗
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={finalRef}
          className="oxo-flow-safe oxo-flow-final-safe oxo-about-noise relative flex min-h-[92svh] items-end overflow-hidden bg-[#020203] px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="oxo-flow-glow top-[-20vh] bg-[radial-gradient(circle,rgba(53,216,255,.28),rgba(139,92,246,.10)_46%,transparent_72%)]" />
          <div className="oxo-about-grid pointer-events-none absolute inset-0 opacity-65" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-[8vw] bottom-[4vh] h-[45vw] w-[45vw] rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(139,92,246,.20), rgba(53,216,255,.10) 42%, transparent 72%)",
            }}
          />

          <div className="relative z-10 w-full">
            <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 md:text-[11px]">
              <span>START A PROJECT</span>
              <span>OXO STUDIO / 2026</span>
            </div>

            <h2 className="antonio2 ombra2 overflow-hidden text-[20vw] uppercase leading-[0.72] tracking-[-0.075em] md:text-[17vw] lg:text-[14.5vw]">
              <SplitLetters text="PARLIAMONE" attribute="data-final-letter" />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="antonio max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl">
                Hai un prodotto da costruire, un processo da rendere più
                intelligente o un mondo da mettere in movimento?
              </p>

              <Link
                to="/contatti"
                className="antonio2 group inline-flex w-fit items-center gap-5 border-b border-white pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
              >
                <span>Contattaci</span>
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