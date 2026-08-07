import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";


gsap.registerPlugin(ScrollTrigger);

const CAPABILITIES = [
  {
    id: "01",
    title: "SOFTWARE",
    eyebrow: "PRODUCT / ENGINEERING",
    copy: "Trasformiamo processi complessi in strumenti digitali chiari, solidi e pronti a evolvere.",
    accent: "#35d8ff",
  },
  {
    id: "02",
    title: "WEB",
    eyebrow: "DESIGN / DEVELOPMENT",
    copy: "Costruiamo esperienze web veloci, riconoscibili e progettate per funzionare su ogni dispositivo.",
    accent: "#8b5cf6",
  },
  {
    id: "03",
    title: "AI",
    eyebrow: "DATA / AUTOMATION",
    copy: "Integriamo intelligenza artificiale, ricerca e automazione dove producono valore reale.",
    accent: "#20f0c7",
  },
  {
    id: "04",
    title: "GAME",
    eyebrow: "REAL TIME / INTERACTION",
    copy: "Sviluppiamo videogame, prototipi e mondi interattivi in cui codice, ritmo e direzione visiva coincidono.",
    accent: "#ff4fd8",
  },
];

const PROJECTS = [
  {
    id: "01",
    category: "SOFTWARE / AI",
    title: "KAIROSARCHIVE",
    description:
      "Un ecosistema intelligente per metadatazione, archiviazione documentale e organizzazione delle informazioni.",
    meta: "MARC 21 / SBN / Z39.50 / AUTOMATION",
    video: "/videos/products/kairosarchive.mp4",
    link: "/prodotti",
    accent: "#35d8ff",
    fallback:
      "radial-gradient(circle at 72% 30%, rgba(53,216,255,.32), transparent 34%), radial-gradient(circle at 18% 76%, rgba(80,70,255,.18), transparent 38%), linear-gradient(135deg, #031018 0%, #050711 50%, #010101 100%)",
  },
  {
    id: "02",
    category: "CUSTOM SOFTWARE",
    title: "DIGITAL SYSTEMS",
    description:
      "Applicazioni progettate intorno ai processi reali del cliente, con interfacce precise e architetture pronte a crescere.",
    meta: "PRODUCT / CLOUD / UX / ENGINEERING",
    video: "/videos/products/custom-software.mp4",
    link: "/prodotti",
    accent: "#8b5cf6",
    fallback:
      "radial-gradient(circle at 24% 38%, rgba(139,92,246,.34), transparent 36%), radial-gradient(circle at 84% 72%, rgba(255,79,216,.14), transparent 36%), linear-gradient(135deg, #10041b 0%, #080810 52%, #010101 100%)",
  },
  {
    id: "03",
    category: "INTERACTIVE / GAME",
    title: "LIVING WORLDS",
    description:
      "Esperienze in tempo reale, prototipi e ambienti interattivi in cui tecnologia e direzione artistica costruiscono la stessa sensazione.",
    meta: "GAMEPLAY / MOTION / 3D / SOUND",
    video: "/videos/products/interactive-worlds.mp4",
    link: "/prodotti",
    accent: "#ff4fd8",
    fallback:
      "radial-gradient(circle at 30% 35%, rgba(255,79,216,.30), transparent 36%), radial-gradient(circle at 78% 75%, rgba(87,74,255,.22), transparent 38%), linear-gradient(135deg, #180417 0%, #08040f 54%, #010101 100%)",
  },
];

const FULL_CIRCLE = "circle(150% at 50% 50%)";
const CLOSED_CIRCLES = [
  "circle(0% at 20% 50%)",
  "circle(0% at 80% 42%)",
  "circle(0% at 50% 78%)",
];

function SplitLetters({ text, attribute = "data-home-letter" }) {
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

export default function Home() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const capabilitiesRef = useRef(null);
  const projectsRef = useRef(null);
  const manifestoRef = useRef(null);
  const finalRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const capabilities = capabilitiesRef.current;
    const projects = projectsRef.current;
    const manifesto = manifestoRef.current;
    const finalSection = finalRef.current;

    if (!page || !hero || !capabilities || !projects || !manifesto || !finalSection) {
      return undefined;
    }

    const mm = gsap.matchMedia();
    let projectVideos = [];

    const ctx = gsap.context(() => {
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-home-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-home-meta]")
      );

      gsap.fromTo(
        heroLetters,
        { yPercent: 130, rotateX: -84, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.28,
          stagger: 0.024,
          ease: "power4.out",
          delay: 0.08,
        }
      );

      gsap.fromTo(
        heroMeta,
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.55,
        }
      );

      gsap.to(hero.querySelector("[data-home-hero-title]"), {
        yPercent: 22,
        scale: 0.91,
        opacity: 0.32,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(hero.querySelector("[data-home-orbit]"), {
        rotate: 58,
        xPercent: -18,
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      const capabilityCards = gsap.utils.toArray(
        capabilities.querySelectorAll("[data-capability-card]")
      );

      capabilityCards.forEach((card, index) => {
        const content = card.querySelector("[data-capability-content]");
        const number = card.querySelector("[data-capability-number]");
        const line = card.querySelector("[data-capability-line]");
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          card,
          {
            clipPath:
              direction < 0
                ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
          },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.1,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );

        if (content) {
          gsap.fromTo(
            content,
            { x: direction * 70, y: 34, opacity: 0 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              duration: 0.8,
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
          gsap.to(number, {
            yPercent: -32,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        }

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: direction < 0 ? "left" : "right" },
            {
              scaleX: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 78%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const { desktop, reduceMotion } = mediaContext.conditions;
          const panels = gsap.utils.toArray(
            projects.querySelectorAll("[data-home-project-panel]")
          );
          const contents = panels
            .map((panel) => panel.querySelector("[data-home-project-content]"))
            .filter(Boolean);
          const railItems = gsap.utils.toArray(
            projects.querySelectorAll("[data-home-project-rail]")
          );
          const progress = projects.querySelector("[data-home-project-progress]");

          projectVideos = panels
            .map((panel) => panel.querySelector("video"))
            .filter(Boolean);

          if (!panels.length) return undefined;

          let activePanel = 0;
          let activeVideo = -1;
          let timeline;

          const pauseAll = () => {
            projectVideos.forEach((video) => video.pause());
            activeVideo = -1;
          };

          const playVideo = (index) => {
            if (activeVideo === index) return;
            activeVideo = index;

            projectVideos.forEach((video, videoIndex) => {
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

          const setRail = (index) => {
            railItems.forEach((item, itemIndex) => {
              const active = index === itemIndex;
              const accent = PROJECTS[itemIndex]?.accent || "#fff";
              const line = item.querySelector("span:last-child");

              gsap.to(item, {
                opacity: active ? 1 : 0.3,
                color: active ? accent : "rgba(255,255,255,.55)",
                duration: 0.25,
                overwrite: true,
              });

              if (line) {
                gsap.to(line, {
                  scaleX: active ? 1 : 0.28,
                  backgroundColor: active ? accent : "rgba(255,255,255,.25)",
                  duration: 0.25,
                  overwrite: true,
                });
              }
            });
          };

          if (reduceMotion) {
            gsap.set(projects, { height: "auto", overflow: "visible" });
            gsap.set(panels, {
              position: "relative",
              autoAlpha: 1,
              clipPath: FULL_CIRCLE,
              minHeight: "100svh",
            });
            gsap.set(contents, { autoAlpha: 1, x: 0, y: 0 });
            gsap.set(progress, { scaleX: 1, transformOrigin: "left center" });
            return () => pauseAll();
          }

          gsap.set(panels, { autoAlpha: 0, clipPath: FULL_CIRCLE });
          gsap.set(contents, { autoAlpha: 0, x: 0, y: desktop ? 70 : 40 });
          gsap.set(projectVideos, {
            scale: 1.12,
            filter: "brightness(1)",
            transformOrigin: "50% 50%",
          });

          panels.forEach((panel, index) => {
            gsap.set(panel, { zIndex: index + 1 });
          });

          gsap.set(panels[0], { autoAlpha: 1, clipPath: FULL_CIRCLE });
          gsap.set(contents[0], { autoAlpha: 1, x: 0, y: 0 });
          if (projectVideos[0]) gsap.set(projectVideos[0], { scale: 1 });
          gsap.set(progress, { scaleX: 0, transformOrigin: "left center" });
          setRail(0);

          timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: projects,
              start: "top top",
              end: () => {
                const distance =
                  window.innerHeight * panels.length * (desktop ? 1.22 : 0.98);
                return `+=${Math.max(distance, desktop ? 3600 : 2700)}`;
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
                if (progress) gsap.set(progress, { scaleX: self.progress });
                if (!timeline) return;

                let nextPanel = 0;
                const currentTime = timeline.time();

                for (let index = 1; index < panels.length; index += 1) {
                  const labelTime = timeline.labels[`home-project-${index}`];
                  if (typeof labelTime === "number" && currentTime >= labelTime) {
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

          if (projectVideos[0]) {
            timeline.to(projectVideos[0], {
              scale: desktop ? 1.05 : 1.03,
              duration: 0.9,
            });
          }

          panels.forEach((panel, index) => {
            if (index === 0) return;

            const previous = panels[index - 1];
            const currentContent = panel.querySelector(
              "[data-home-project-content]"
            );
            const previousContent = previous.querySelector(
              "[data-home-project-content]"
            );
            const currentVideo = panel.querySelector("video");
            const previousVideo = previous.querySelector("video");
            const ring = panel.querySelector("[data-home-project-ring]");
            const label = `home-project-${index}`;
            const direction = index % 2 === 0 ? -1 : 1;

            timeline.addLabel(label, `+=${desktop ? 0.22 : 0.14}`);
            timeline.set(panel, { autoAlpha: 1 }, label);

            timeline.fromTo(
              panel,
              { clipPath: CLOSED_CIRCLES[(index - 1) % CLOSED_CIRCLES.length] },
              { clipPath: FULL_CIRCLE, duration: 1.05, ease: "power2.inOut" },
              label
            );

            if (ring) {
              timeline.fromTo(
                ring,
                { scale: 0.15, rotate: direction * -80, autoAlpha: 0 },
                {
                  scale: 1,
                  rotate: direction * 24,
                  autoAlpha: 0.65,
                  duration: 0.9,
                  ease: "power3.out",
                },
                label
              );
            }

            if (previousContent) {
              timeline.to(
                previousContent,
                {
                  autoAlpha: 0,
                  x: direction * -80,
                  y: -25,
                  duration: 0.4,
                  ease: "power2.out",
                },
                label
              );
            }

            if (currentContent) {
              timeline.fromTo(
                currentContent,
                {
                  autoAlpha: 0,
                  x: direction * 115,
                  y: 42,
                },
                {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  duration: 0.7,
                  ease: "power3.out",
                },
                `${label}+=.28`
              );
            }

            if (currentVideo) {
              timeline.fromTo(
                currentVideo,
                { scale: 1.22, rotate: direction * 1.5 },
                { scale: 1, rotate: 0, duration: 1.08 },
                label
              );
            }

            if (previousVideo) {
              timeline.to(
                previousVideo,
                {
                  scale: 1.12,
                  filter: "brightness(.3) saturate(.5)",
                  duration: 1,
                },
                label
              );
            }

            timeline.set(previous, { autoAlpha: 0 }, `${label}+=1.02`);
            timeline.to({}, { duration: desktop ? 0.35 : 0.22 });
          });

          return () => {
            pauseAll();
            if (timeline?.scrollTrigger) timeline.scrollTrigger.kill();
            timeline?.kill();
          };
        }
      );

      const manifestoTrack = manifesto.querySelector("[data-home-manifesto-track]");
      const manifestoCopy = manifesto.querySelector("[data-home-manifesto-copy]");

      if (manifestoTrack) {
        gsap.to(manifestoTrack, {
          xPercent: -42,
          ease: "none",
          scrollTrigger: {
            trigger: manifesto,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (manifestoCopy) {
        gsap.fromTo(
          manifestoCopy,
          { y: 80, opacity: 0 },
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
      }

      const finalLetters = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-home-final-letter]")
      );

      gsap.fromTo(
        finalLetters,
        { yPercent: 125, rotateX: -80, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.1,
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

    const refresh = () => ScrollTrigger.refresh();
    const timer = window.setTimeout(refresh, 180);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", refresh);
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
        className="relative overflow-x-hidden bg-[#030303] text-white"
      >
        <style>{`
          @keyframes oxoHomeOrbit {
            0%, 100% { transform: rotate(0deg) scale(1); opacity: .38; }
            50% { transform: rotate(12deg) scale(1.06); opacity: .72; }
          }

          @keyframes oxoHomeScan {
            0% { transform: translateX(-120%); opacity: 0; }
            15% { opacity: .8; }
            85% { opacity: .8; }
            100% { transform: translateX(120%); opacity: 0; }
          }

          .oxo-home-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
            background-size: 64px 64px;
            mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
          }

          .oxo-home-noise::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: .055;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode: soft-light;
          }

          .oxo-capability-card:hover .oxo-capability-title {
            transform: translateX(1.2vw);
          }

          .oxo-capability-card:hover .oxo-capability-arrow {
            transform: translate(.55rem, -.35rem) rotate(-45deg);
          }
        `}</style>

        <section
          ref={heroRef}
          className="oxo-home-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
        >
          <div className="oxo-home-grid pointer-events-none absolute inset-0" />

          <div
            data-home-orbit
            aria-hidden="true"
            className="pointer-events-none absolute right-[-14vw] top-[-8vh] h-[65vw] w-[65vw] rounded-full border border-cyan-300/20"
            style={{ animation: "oxoHomeOrbit 12s ease-in-out infinite" }}
          >
            <div className="absolute inset-[13%] rounded-full border border-violet-400/20" />
            <div className="absolute inset-[27%] rounded-full border border-fuchsia-400/15" />
            <div className="absolute inset-[42%] rounded-full bg-cyan-300/10 blur-[55px]" />
          </div>

          <div className="pointer-events-none absolute left-0 top-[48%] h-px w-full overflow-hidden bg-white/10">
            <div
              className="h-full w-[42%] bg-gradient-to-r from-transparent via-cyan-300 to-transparent"
              style={{ animation: "oxoHomeScan 4.8s linear infinite" }}
            />
          </div>

          <div className="relative z-10 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:text-[11px]">
            <p data-home-meta>OXO STUDIO®</p>
            <p data-home-meta className="text-right">
              CREATIVE TECHNOLOGY
              <br />
              LA SPEZIA / ITALY
            </p>
          </div>

          <div data-home-hero-title className="relative z-10 my-auto py-14">
            <p
              data-home-meta
              className="antonio2 mb-4 text-[10px] uppercase tracking-[0.36em] text-cyan-300 md:text-xs"
            >
              Software / AI / Interactive worlds
            </p>

            <h1 className="antonio2 ombra2 overflow-hidden text-[22vw] uppercase leading-[0.7] tracking-[-0.075em] md:text-[18vw] lg:text-[15.8vw]">
              <SplitLetters text="OXO STUDIO" />
            </h1>
          </div>

          <div className="relative z-10 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p
              data-home-meta
              className="antonio max-w-[930px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.4rem]"
            >
              Progettiamo software, prodotti digitali e mondi interattivi in cui
              tecnologia e identità visiva diventano un unico sistema.
            </p>

            <p
              data-home-meta
              className="antonio2 shrink-0 text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
            >
              Scroll to enter ↓
            </p>
          </div>
        </section>

        <section
          ref={capabilitiesRef}
          className="relative overflow-hidden border-y border-white/15 bg-[#050505] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="oxo-home-grid pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative z-10 mb-16 flex flex-col gap-7 border-b border-white/20 pb-8 md:mb-24 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="antonio2 mb-4 text-[10px] uppercase tracking-[0.34em] text-cyan-300 md:text-xs">
                What we build
              </p>
              <h2 className="antonio2 ombra2 text-[18vw] uppercase leading-[0.74] tracking-[-0.07em] md:text-[12vw] lg:text-[9vw]">
                CAPABILITIES
              </h2>
            </div>

            <p className="antonio max-w-[640px] text-lg leading-snug text-gray-300 md:text-2xl">
              Non separiamo strategia, design e sviluppo: ogni progetto nasce come
              un sistema completo, leggibile e pronto a funzionare.
            </p>
          </div>

          <div className="relative z-10 grid gap-5 lg:grid-cols-2 lg:gap-[2vw]">
            {CAPABILITIES.map((item, index) => (
              <article
                key={item.id}
                data-capability-card
                className={`oxo-capability-card group relative min-h-[54svh] overflow-hidden border border-white/20 bg-black/40 p-7 md:min-h-[58svh] md:p-10 ${
                  index % 2 === 1 ? "lg:translate-y-[8vh]" : ""
                }`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              >
                <div
                  className="absolute inset-0 opacity-70"
                  style={{
                    background: `radial-gradient(circle at ${
                      index % 2 === 0 ? "78% 24%" : "22% 28%"
                    }, ${item.accent}35, transparent 38%), linear-gradient(145deg, #070707, #020202)`,
                  }}
                />
                <div className="oxo-home-grid pointer-events-none absolute inset-0 opacity-60" />

                <p
                  data-capability-number
                  aria-hidden="true"
                  className="antonio2 pointer-events-none absolute right-[-1vw] top-[-4vw] text-[26vw] leading-none tracking-[-0.08em] text-white/[0.045]"
                >
                  {item.id}
                </p>

                <div className="relative z-10 flex h-full min-h-[45svh] flex-col justify-between">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-gray-400 md:text-xs">
                    <span>{item.id}</span>
                    <span>{item.eyebrow}</span>
                  </div>

                  <div data-capability-content>
                    <div
                      data-capability-line
                      className="mb-7 h-px w-full"
                      style={{ backgroundColor: item.accent }}
                    />

                    <h3 className="oxo-capability-title antonio2 ombra2 text-[16vw] uppercase leading-[0.76] tracking-[-0.065em] transition-transform duration-500 ease-out md:text-[9vw] lg:text-[7.2vw]">
                      {item.title}
                    </h3>

                    <div className="mt-7 flex items-end justify-between gap-8">
                      <p className="antonio max-w-[610px] text-lg leading-snug text-gray-300 md:text-2xl">
                        {item.copy}
                      </p>
                      <span className="oxo-capability-arrow antonio2 shrink-0 text-3xl transition-transform duration-500 ease-out md:text-5xl">
                        ↗
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          ref={projectsRef}
          className="relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-black"
        >
          {PROJECTS.map((project, index) => (
            <article
              key={project.id}
              data-home-project-panel
              className="oxo-home-noise absolute inset-0 overflow-hidden"
              style={{
                opacity: index === 0 ? 1 : 0,
                visibility: index === 0 ? "visible" : "hidden",
                zIndex: index + 1,
                clipPath: FULL_CIRCLE,
                willChange: "clip-path, opacity, transform",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ background: project.fallback }}
              />
              <div className="oxo-home-grid pointer-events-none absolute inset-0 opacity-65" />

              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={project.video}
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

              <div className="pointer-events-none absolute inset-0 bg-black/26" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/5 to-black/62" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/78 via-black/5 to-black/25" />

              <div
                data-home-project-ring
                aria-hidden="true"
                className="pointer-events-none absolute right-[7vw] top-[12vh] h-[42vw] w-[42vw] rounded-full border opacity-60"
                style={{ borderColor: project.accent }}
              >
                <div className="absolute inset-[18%] rounded-full border border-white/20" />
                <div className="absolute inset-[36%] rounded-full border border-white/15" />
              </div>

              <div className="pointer-events-none absolute inset-[14px] z-10 border border-white/30 md:inset-[26px] lg:inset-[2.2vw]" />

              <div className="antonio2 absolute left-7 top-7 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] md:left-12 md:top-12 md:text-xs lg:left-[4.4vw] lg:top-[4.4vw]">
                <span>{project.id}</span>
                <span
                  className="h-px w-10 md:w-16"
                  style={{ backgroundColor: project.accent }}
                />
                <span className="text-gray-300">{project.category}</span>
              </div>

              <p className="antonio absolute right-7 top-7 z-20 max-w-[48vw] text-right text-[9px] uppercase tracking-[0.23em] text-gray-300 md:right-12 md:top-12 md:text-[11px] lg:right-[4.4vw] lg:top-[4.4vw]">
                {project.meta}
              </p>

              <div
                data-home-project-content
                className="absolute bottom-12 left-7 z-20 max-w-[1040px] pr-7 md:bottom-16 md:left-12 md:pr-12 lg:bottom-[7vh] lg:left-[5vw]"
              >
                <p
                  className="antonio2 mb-3 text-[10px] uppercase tracking-[0.34em] md:text-xs"
                  style={{ color: project.accent }}
                >
                  Selected work
                </p>

                <h2 className="antonio2 ombra2 max-w-[1200px] text-[clamp(3.2rem,9vw,9.2rem)] uppercase leading-[0.76] tracking-[-0.06em]">
                  {project.title}
                </h2>

                <p className="antonio mt-6 max-w-[720px] text-lg leading-snug text-gray-200 md:text-2xl lg:text-3xl">
                  {project.description}
                </p>

                <Link
                  to={project.link}
                  className="antonio2 group mt-8 inline-flex items-center gap-5 border-b border-white/70 pb-2 text-sm uppercase tracking-[0.27em] md:mt-10 md:text-base"
                >
                  <span>Esplora i prodotti</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </Link>
              </div>
            </article>
          ))}

          <aside className="pointer-events-none absolute right-7 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-5 md:flex lg:right-[3vw]">
            {PROJECTS.map((project, index) => (
              <div
                key={project.id}
                data-home-project-rail
                className="antonio2 flex items-center justify-end gap-3 text-[9px] uppercase tracking-[0.24em] text-white/60 opacity-40"
              >
                <span>{project.id}</span>
                <span
                  className="h-px w-10 origin-right bg-white/30"
                  style={{ transform: index === 0 ? "scaleX(1)" : "scaleX(.28)" }}
                />
              </div>
            ))}
          </aside>

          <div className="pointer-events-none absolute bottom-0 left-0 z-[80] h-px w-full bg-white/20">
            <div
              data-home-project-progress
              className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
            />
          </div>
        </section>

        <section
          ref={manifestoRef}
          className="oxo-home-noise relative min-h-[100svh] overflow-hidden border-y border-white/15 bg-[#050505] py-24 md:py-32 lg:py-[16vh]"
        >
          <div className="oxo-home-grid pointer-events-none absolute inset-0 opacity-70" />

          <div
            data-home-manifesto-track
            aria-hidden="true"
            className="antonio2 pointer-events-none relative z-[1] flex w-max whitespace-nowrap text-[24vw] uppercase leading-[0.72] tracking-[-0.065em] text-white/[0.055] md:text-[18vw] lg:text-[14vw]"
          >
            <span>MAKE IT CLEAR — MAKE IT POWERFUL — MAKE IT REAL —&nbsp;</span>
            <span>MAKE IT CLEAR — MAKE IT POWERFUL — MAKE IT REAL —&nbsp;</span>
          </div>

          <div className="relative z-10 mx-auto mt-[-4vw] flex min-h-[55vh] max-w-[1500px] items-center px-6 md:px-10 lg:px-[5vw]">
            <div data-home-manifesto-copy className="max-w-[1160px]">
              <p className="antonio2 mb-6 text-[10px] uppercase tracking-[0.35em] text-violet-400 md:text-xs">
                Oxo point of view
              </p>

              <p className="antonio text-[clamp(2rem,5.3vw,5.7rem)] leading-[0.98] tracking-[-0.035em] text-gray-100">
                Dal primo click all’ultima interazione, costruiamo esperienze su
                misura che non aggiungono rumore: rendono il prodotto più chiaro,
                più forte e più memorabile.
              </p>
            </div>
          </div>
        </section>

        <section
          ref={finalRef}
          className="oxo-home-noise relative flex min-h-[94svh] items-end overflow-hidden bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="oxo-home-grid pointer-events-none absolute inset-0 opacity-65" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[8vw] bottom-[-8vh] h-[52vw] w-[52vw] rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.20), rgba(139,92,246,.13) 42%, transparent 72%)",
            }}
          />

          <div className="relative z-10 w-full">
            <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 md:text-[11px]">
              <span>START A PROJECT</span>
              <span>OXO STUDIO / 2026</span>
            </div>

            <h2 className="antonio2 ombra2 overflow-hidden text-[19vw] uppercase leading-[0.72] tracking-[-0.075em] md:text-[16vw] lg:text-[13.6vw]">
              <SplitLetters
                text="FACCIAMOLO"
                attribute="data-home-final-letter"
              />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="antonio max-w-[790px] text-xl leading-snug text-gray-300 md:text-3xl">
                Hai un’idea, un processo da ripensare o un prodotto che deve
                finalmente prendere forma?
              </p>

              <Link
                to="/contatti"
                className="antonio2 group inline-flex w-fit items-center gap-5 border-b border-white pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
              >
                <span>Parliamone</span>
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