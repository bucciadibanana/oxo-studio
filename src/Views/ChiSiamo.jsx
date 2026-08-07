import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";


gsap.registerPlugin(ScrollTrigger);

const STORY = [
  {
    id: "01",
    eyebrow: "IDENTITÀ",
    title: "NON SEGUIAMO IL RUMORE",
    statement: "DIAMO FORMA AL SEGNALE.",
    description:
      "Oxo Studio unisce pensiero creativo e sviluppo tecnologico per costruire prodotti digitali con una voce precisa, riconoscibile e utile.",
    meta: "CREATIVE TECHNOLOGY STUDIO",
    video: "/videos/about/oxo-studio.mp4",
    accent: "#35d8ff",
    fallback:
      "radial-gradient(circle at 72% 30%, rgba(53,216,255,.30), transparent 33%), radial-gradient(circle at 18% 76%, rgba(80,70,255,.19), transparent 38%), linear-gradient(135deg, #031018 0%, #050711 50%, #010101 100%)",
  },
  {
    id: "02",
    eyebrow: "SOFTWARE",
    title: "DAL PROBLEMA AL SISTEMA",
    statement: "LA COMPLESSITÀ DIVENTA CHIARA.",
    description:
      "Progettiamo interfacce, architetture e flussi capaci di trasformare processi complessi in strumenti semplici da usare e solidi nel tempo.",
    meta: "PRODUCT / UX / ENGINEERING",
    video: "/videos/about/software.mp4",
    accent: "#8b5cf6",
    fallback:
      "radial-gradient(circle at 25% 42%, rgba(139,92,246,.34), transparent 36%), radial-gradient(circle at 82% 74%, rgba(255,79,216,.13), transparent 35%), linear-gradient(135deg, #10041b 0%, #080810 52%, #010101 100%)",
  },
  {
    id: "03",
    eyebrow: "INTELLIGENZA ARTIFICIALE",
    title: "L'AI NON È DECORAZIONE",
    statement: "È PARTE DEL PROGETTO.",
    description:
      "La integriamo dove crea valore reale: automazione, classificazione, ricerca, elaborazione dei dati e supporto alle decisioni.",
    meta: "DATA / AUTOMATION / KNOWLEDGE",
    video: "/videos/about/artificial-intelligence.mp4",
    accent: "#20f0c7",
    fallback:
      "radial-gradient(circle at 76% 56%, rgba(32,240,199,.28), transparent 35%), radial-gradient(circle at 12% 22%, rgba(41,121,255,.24), transparent 38%), linear-gradient(135deg, #001313 0%, #020711 52%, #010101 100%)",
  },
  {
    id: "04",
    eyebrow: "INTERACTIVE WORLDS",
    title: "TECNOLOGIA CHE SI SENTE",
    statement: "NON SOLO CHE SI VEDE.",
    description:
      "Videogame, prototipi e ambienti interattivi diventano territori in cui design, ritmo, suono e codice costruiscono un'esperienza unica.",
    meta: "GAME / MOTION / REAL TIME",
    video: "/videos/about/interactive-worlds.mp4",
    accent: "#ff4fd8",
    fallback:
      "radial-gradient(circle at 30% 35%, rgba(255,79,216,.29), transparent 36%), radial-gradient(circle at 78% 75%, rgba(87,74,255,.22), transparent 38%), linear-gradient(135deg, #180417 0%, #08040f 54%, #010101 100%)",
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
  const manifestoRef = useRef(null);
  const teamRef = useRef(null);
  const processRef = useRef(null);
  const finalRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const story = storyRef.current;
    const manifesto = manifestoRef.current;
    const team = teamRef.current;
    const process = processRef.current;
    const finalSection = finalRef.current;

    if (!page || !hero || !story || !manifesto || !team || !process || !finalSection) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    let storyVideos = [];

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

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions;
          const panels = gsap.utils.toArray(
            story.querySelectorAll("[data-story-panel]")
          );
          const contents = panels
            .map((panel) => panel.querySelector("[data-story-content]"))
            .filter(Boolean);
          const statements = panels
            .map((panel) => panel.querySelector("[data-story-statement]"))
            .filter(Boolean);
          const cutLines = panels
            .map((panel) => panel.querySelector("[data-story-cut-line]"))
            .filter(Boolean);
          const railItems = gsap.utils.toArray(
            story.querySelectorAll("[data-story-rail-item]")
          );
          const progress = story.querySelector("[data-story-progress]");

          storyVideos = panels
            .map((panel) => panel.querySelector("video"))
            .filter(Boolean);

          if (!panels.length) return undefined;

          let activeVideo = -1;
          let activePanel = 0;
          let timeline;

          const setRail = (index) => {
            railItems.forEach((item, itemIndex) => {
              const line = item.querySelector("[data-story-rail-line]");
              const label = item.querySelector("[data-story-rail-label]");
              const active = itemIndex === index;
              const accent = STORY[itemIndex]?.accent || "#ffffff";

              gsap.to(item, {
                opacity: active ? 1 : 0.35,
                duration: 0.28,
                overwrite: true,
              });
              if (line) {
                gsap.to(line, {
                  scaleX: active ? 1 : 0.3,
                  backgroundColor: active
                    ? accent
                    : "rgba(255,255,255,.28)",
                  duration: 0.3,
                  overwrite: true,
                });
              }
              if (label) {
                gsap.to(label, {
                  color: active ? accent : "rgba(255,255,255,.55)",
                  duration: 0.3,
                  overwrite: true,
                });
              }
            });
          };

          const pauseAll = () => {
            storyVideos.forEach((video) => video.pause());
            activeVideo = -1;
          };

          const playVideo = (index) => {
            if (activeVideo === index) return;
            activeVideo = index;

            storyVideos.forEach((video, videoIndex) => {
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
            gsap.set(story, { height: "auto", overflow: "visible" });
            gsap.set(panels, {
              position: "relative",
              autoAlpha: 1,
              clipPath: FULL_CLIP,
              minHeight: "100svh",
            });
            gsap.set(contents, { autoAlpha: 1, x: 0, y: 0 });
            gsap.set(statements, { autoAlpha: 1, x: 0 });
            gsap.set(cutLines, { autoAlpha: 0 });
            gsap.set(progress, { scaleX: 1, transformOrigin: "left center" });

            return () => pauseAll();
          }

          gsap.set(panels, { autoAlpha: 0, clipPath: FULL_CLIP });
          gsap.set(contents, {
            autoAlpha: 0,
            y: desktop ? 90 : 46,
          });
          gsap.set(statements, {
            autoAlpha: 0,
            xPercent: desktop ? 8 : 3,
          });
          gsap.set(cutLines, { autoAlpha: 0, scaleX: 0 });
          gsap.set(storyVideos, {
            scale: 1.1,
            filter: "brightness(1)",
            transformOrigin: "50% 50%",
          });

          panels.forEach((panel, index) => {
            gsap.set(panel, { zIndex: index + 1 });
          });

          gsap.set(panels[0], { autoAlpha: 1, clipPath: FULL_CLIP });
          gsap.set(contents[0], { autoAlpha: 1, x: 0, y: 0 });
          gsap.set(statements[0], { autoAlpha: 1, xPercent: 0 });
          if (storyVideos[0]) gsap.set(storyVideos[0], { scale: 1 });
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          setRail(0);

          const cuts = desktop ? DESKTOP_CUTS : MOBILE_CUTS;

          timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: story,
              start: "top top",
              end: () => {
                const distance =
                  window.innerHeight * panels.length * (desktop ? 1.2 : 0.95);
                return `+=${Math.max(distance, desktop ? 3800 : 2900)}`;
              },
              pin: true,
              scrub: desktop ? 1 : 0.65,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onEnter: () => playVideo(0),
              onEnterBack: () => playVideo(activePanel),
              onLeave: pauseAll,
              onLeaveBack: pauseAll,
              onUpdate: (self) => {
                gsap.set(progress, { scaleX: self.progress });
                if (!timeline) return;

                let nextPanel = 0;
                const time = timeline.time();

                for (let index = 1; index < panels.length; index += 1) {
                  const labelTime = timeline.labels[`story-${index}`];
                  if (typeof labelTime === "number" && time >= labelTime) {
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

          if (storyVideos[0]) {
            timeline.to(storyVideos[0], {
              scale: desktop ? 1.045 : 1.03,
              duration: 0.85,
            });
          }

          panels.forEach((panel, index) => {
            if (index === 0) return;

            const previous = panels[index - 1];
            const currentContent = panel.querySelector("[data-story-content]");
            const previousContent = previous.querySelector(
              "[data-story-content]"
            );
            const currentStatement = panel.querySelector(
              "[data-story-statement]"
            );
            const previousStatement = previous.querySelector(
              "[data-story-statement]"
            );
            const currentVideo = panel.querySelector("video");
            const previousVideo = previous.querySelector("video");
            const cutLine = panel.querySelector("[data-story-cut-line]");
            const direction = index % 2 === 0 ? -1 : 1;
            const label = `story-${index}`;

            timeline.addLabel(label, `+=${desktop ? 0.2 : 0.12}`);
            timeline.set(panel, { autoAlpha: 1 }, label);

            timeline.fromTo(
              panel,
              { clipPath: cuts[(index - 1) % cuts.length] },
              { clipPath: FULL_CLIP, duration: 1 },
              label
            );

            if (currentVideo) {
              timeline.fromTo(
                currentVideo,
                { scale: desktop ? 1.2 : 1.14 },
                { scale: 1, duration: 1.05 },
                label
              );
            }

            if (previousVideo) {
              timeline.to(
                previousVideo,
                {
                  scale: desktop ? 1.11 : 1.06,
                  filter: "brightness(.37)",
                  duration: 1,
                },
                label
              );
            }

            if (previousContent) {
              timeline.to(
                previousContent,
                {
                  autoAlpha: 0,
                  y: desktop ? -54 : -28,
                  duration: 0.4,
                  ease: "power2.out",
                },
                label
              );
            }

            if (previousStatement) {
              timeline.to(
                previousStatement,
                {
                  autoAlpha: 0,
                  xPercent: direction * -5,
                  duration: 0.36,
                },
                label
              );
            }

            if (currentContent) {
              timeline.fromTo(
                currentContent,
                {
                  autoAlpha: 0,
                  x: direction * (desktop ? 118 : 38),
                  y: desktop ? 42 : 24,
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  duration: 0.68,
                  ease: "power3.out",
                },
                `${label}+=.27`
              );
            }

            if (currentStatement) {
              timeline.fromTo(
                currentStatement,
                { autoAlpha: 0, xPercent: direction * 9 },
                {
                  autoAlpha: 1,
                  xPercent: 0,
                  duration: 0.75,
                  ease: "power3.out",
                },
                `${label}+=.3`
              );
            }

            if (cutLine) {
              timeline.fromTo(
                cutLine,
                {
                  autoAlpha: 0,
                  scaleX: 0,
                  transformOrigin:
                    direction > 0 ? "left center" : "right center",
                },
                {
                  autoAlpha: 1,
                  scaleX: 1,
                  duration: 0.42,
                  ease: "power2.out",
                },
                label
              );
              timeline.to(
                cutLine,
                {
                  autoAlpha: 0,
                  scaleX: 0,
                  transformOrigin:
                    direction > 0 ? "right center" : "left center",
                  duration: 0.42,
                  ease: "power2.in",
                },
                `${label}+=.55`
              );
            }

            timeline.set(previous, { autoAlpha: 0 }, `${label}+=.99`);
            timeline.to({}, { duration: desktop ? 0.34 : 0.22 });
          });

          return () => {
            pauseAll();
            if (timeline?.scrollTrigger) timeline.scrollTrigger.kill();
            timeline?.kill();
          };
        }
      );

      const manifestoTrack = manifesto.querySelector(
        "[data-manifesto-track]"
      );
      const manifestoCopy = manifesto.querySelector("[data-manifesto-copy]");

      gsap.to(manifestoTrack, {
        xPercent: -38,
        ease: "none",
        scrollTrigger: {
          trigger: manifesto,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.fromTo(
        manifestoCopy,
        { y: 70, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: manifesto,
            start: "top 66%",
            toggleActions: "play none none reverse",
          },
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
        `}</style>

        <section
          ref={heroRef}
          className="oxo-about-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
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
          className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-black"
        >
          {STORY.map((item, index) => (
            <article
              key={item.id}
              data-story-panel
              className="oxo-about-noise absolute inset-0 overflow-hidden"
              style={{
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? "visible" : "hidden",
                zIndex: index + 1,
                clipPath: FULL_CLIP,
                willChange: "clip-path, opacity, transform",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: item.fallback }}
              />

              <div className="oxo-about-grid pointer-events-none absolute inset-0 opacity-65" />

              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={item.video}
                muted
                loop
                playsInline
                preload="metadata"
                autoPlay={index === 0}
                onLoadedMetadata={() => ScrollTrigger.refresh()}
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  ScrollTrigger.refresh();
                }}
              />

              <div className="pointer-events-none absolute inset-0 bg-black/24" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/68" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/78 via-black/10 to-black/24" />

              <div className="pointer-events-none absolute inset-[14px] z-10 border border-white/30 md:inset-[26px] lg:inset-[2.2vw]" />

              <div className="antonio2 absolute left-7 top-7 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] md:left-12 md:top-12 md:text-xs lg:left-[4.4vw] lg:top-[4.4vw]">
                <span>{item.id}</span>
                <span
                  className="h-px w-10 md:w-16"
                  style={{ backgroundColor: item.accent }}
                />
                <span className="text-gray-300">{item.eyebrow}</span>
              </div>

              <p className="antonio absolute right-7 top-7 z-20 max-w-[46vw] text-right text-[9px] uppercase tracking-[0.23em] text-gray-300 md:right-12 md:top-12 md:text-[11px] lg:right-[4.4vw] lg:top-[4.4vw]">
                {item.meta}
              </p>

              <div
                data-story-content
                className="absolute bottom-12 left-7 z-20 max-w-[920px] pr-7 md:bottom-16 md:left-12 md:pr-12 lg:bottom-[7vh] lg:left-[5vw]"
              >
                <p
                  className="antonio2 mb-3 text-[10px] uppercase tracking-[0.34em] md:text-xs"
                  style={{ color: item.accent }}
                >
                  Oxo manifesto
                </p>

                <h2 className="antonio2 ombra2 max-w-[1150px] text-[clamp(3.1rem,8.8vw,8.8rem)] uppercase leading-[0.78] tracking-[-0.055em]">
                  {item.title}
                </h2>

                <p className="antonio mt-6 max-w-[720px] text-lg leading-snug text-gray-200 md:text-2xl lg:text-3xl">
                  {item.description}
                </p>
              </div>

              <p
                data-story-statement
                aria-hidden="true"
                className="antonio2 pointer-events-none absolute right-[4vw] top-[27%] z-[3] hidden max-w-[46vw] text-right text-[5.6vw] uppercase leading-[0.82] tracking-[-0.055em] text-white/[0.12] lg:block"
              >
                {item.statement}
              </p>

              <div
                data-story-cut-line
                aria-hidden="true"
                className="pointer-events-none absolute left-[-10%] top-1/2 z-30 h-px w-[120%] -rotate-[7deg]"
                style={{
                  backgroundColor: item.accent,
                  boxShadow: `0 0 18px ${item.accent}, 0 0 42px ${item.accent}`,
                }}
              />
            </article>
          ))}

          <aside className="pointer-events-none absolute right-7 top-1/2 z-[60] hidden -translate-y-1/2 flex-col gap-5 md:flex lg:right-[3vw]">
            {STORY.map((item, index) => (
              <div
                key={item.id}
                data-story-rail-item
                className="flex items-center justify-end gap-3 opacity-40"
              >
                <span
                  data-story-rail-label
                  className="antonio2 text-[9px] uppercase tracking-[0.24em] text-white/60"
                >
                  {item.id}
                </span>
                <span
                  data-story-rail-line
                  className="h-px w-10 origin-right bg-white/30"
                  style={{ transform: index === 0 ? "scaleX(1)" : "scaleX(.3)" }}
                />
              </div>
            ))}
          </aside>

          <div className="pointer-events-none absolute bottom-0 left-0 z-[70] h-px w-full bg-white/20">
            <div
              data-story-progress
              className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
            />
          </div>
        </section>

        <section
          ref={manifestoRef}
          className="oxo-about-noise relative min-h-[100svh] overflow-hidden border-y border-white/15 bg-[#050505] py-24 md:py-32 lg:py-[16vh]"
        >
          <div className="oxo-about-grid pointer-events-none absolute inset-0 opacity-70" />

          <div
            data-manifesto-track
            aria-hidden="true"
            className="antonio2 pointer-events-none relative z-[1] flex w-max whitespace-nowrap text-[24vw] uppercase leading-[0.72] tracking-[-0.065em] text-white/[0.055] md:text-[18vw] lg:text-[14vw]"
          >
            <span>MAKE IT CLEAR — MAKE IT POWERFUL — MAKE IT REAL —&nbsp;</span>
            <span>MAKE IT CLEAR — MAKE IT POWERFUL — MAKE IT REAL —&nbsp;</span>
          </div>

          <div className="relative z-10 mx-auto mt-[-4vw] flex min-h-[55vh] max-w-[1500px] items-center px-6 md:px-10 lg:px-[5vw]">
            <div data-manifesto-copy className="max-w-[1120px]">
              <p className="antonio2 mb-6 text-[10px] uppercase tracking-[0.35em] text-cyan-300 md:text-xs">
                Il nostro punto di vista
              </p>

              <p className="antonio text-[clamp(2rem,5.3vw,5.6rem)] leading-[0.98] tracking-[-0.035em] text-gray-100">
                Non ci interessa aggiungere tecnologia a un progetto. Ci
                interessa capire quale tecnologia lo renda più chiaro, più
                veloce e più umano.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={teamRef}
          className="relative overflow-hidden bg-[#030303] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
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
          className="relative overflow-hidden border-t border-white/15 bg-[#050505] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
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
          className="oxo-about-noise relative flex min-h-[92svh] items-end overflow-hidden bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
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