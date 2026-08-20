import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";
import "../styles/avant-legato.css";



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

const FULL_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CAPABILITY_TILTS = [-1.8, 1.4, 1.2, -1.5];
const PROJECT_REVEALS = [
  "polygon(0% 0%, 0% 0%, 18% 100%, 18% 100%)",
  "polygon(100% 0%, 100% 0%, 82% 100%, 82% 100%)",
  "polygon(0% 44%, 100% 32%, 100% 62%, 0% 56%)",
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
    let finalPointerMoveHandler = null;
    let finalPointerLeaveHandler = null;

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
          tablet: "(min-width: 768px) and (max-width: 1023px)",
          mobile: "(max-width: 767px)",
          coarse: "(pointer: coarse)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (mediaContext) => {
          const {
            desktop,
            tablet,
            mobile,
            coarse,
            reduceMotion,
          } = mediaContext.conditions;

          /*
           * RESPONSIVE MOTION PROFILE
           * Desktop resta identico.
           * Tablet e mobile mantengono gli stessi effetti con ampiezze,
           * blur, pin e scrub più adatti alla viewport.
           */
          const motion = {
            heroDistance: desktop ? 2.15 : tablet ? 1.65 : 1.38,
            signalDistance: desktop ? 1.9 : tablet ? 1.52 : 1.3,
            heroOxoX: desktop ? -38 : tablet ? -29 : -21,
            heroOxoScale: desktop ? 1.38 : tablet ? 1.28 : 1.18,
            heroStudioX: desktop ? 34 : tablet ? 26 : 18,
            heroStudioScale: desktop ? 1.32 : tablet ? 1.23 : 1.14,
            heroBrainScale: desktop ? 3.15 : tablet ? 2.65 : 2.2,
            heroBrainRotate: desktop ? 16 : tablet ? 12 : 8,
            heroCopyY: desktop ? -80 : tablet ? -58 : -38,
            signalWindowScale: desktop ? 5.8 : tablet ? 4.9 : 4.05,
            capabilityX: desktop ? 34 : tablet ? 22 : 12,
            capabilityY: desktop ? 92 : tablet ? 66 : 42,
            capabilityScale: desktop ? 0.955 : tablet ? 0.972 : 0.988,
            capabilityContentX: desktop ? 70 : tablet ? 44 : 24,
            capabilityContentY: desktop ? 42 : tablet ? 32 : 20,
            projectContentX: desktop ? 120 : tablet ? 72 : 36,
            projectContentY: desktop ? 46 : tablet ? 34 : 24,
            projectVideoEnterScale: desktop ? 1.2 : tablet ? 1.16 : 1.11,
            projectVideoExitScale: desktop ? 1.1 : tablet ? 1.075 : 1.045,
            projectFirstScale: desktop ? 1.045 : tablet ? 1.035 : 1.022,
            projectDistanceFactor: desktop ? 1.28 : tablet ? 1.12 : 0.98,
            projectMinDistance: desktop ? 3600 : tablet ? 3100 : 2450,
            projectScrub: desktop ? 1 : tablet ? 0.82 : 0.58,
            projectGap: desktop ? 0.22 : tablet ? 0.18 : 0.12,
            projectHold: desktop ? 0.36 : tablet ? 0.29 : 0.2,
          };

          const signalRows = gsap.utils.toArray(
            signal.querySelectorAll("[data-signal-row]")
          );
          const signalWindow = signal.querySelector("[data-signal-window]");
          const signalCopy = signal.querySelector("[data-signal-copy]");
          const signalCross = signal.querySelector("[data-signal-cross]");

          const capabilityCards = gsap.utils.toArray(
            capabilities.querySelectorAll("[data-capability-panel]")
          );

          const projectStage = projects.querySelector("[data-project-stage]");
          const projectPanels = projectStage
            ? gsap.utils.toArray(
                projectStage.querySelectorAll("[data-project-panel]")
              )
            : [];
          const projectContents = projectPanels
            .map((panel) => panel.querySelector("[data-project-content]"))
            .filter(Boolean);
          const projectRail = projectStage
            ? gsap.utils.toArray(
                projectStage.querySelectorAll("[data-project-rail]")
              )
            : [];
          const projectProgress = projectStage?.querySelector(
            "[data-project-progress]"
          );

          let signalTimeline;
          let projectTimeline;
          let activeProject = 0;
          let activeVideo = -1;

          const pauseProjectVideos = () => {
            projectVideos.forEach((video) => video.pause());
            activeVideo = -1;
          };

          const playProjectVideo = (index) => {
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

          const setProjectRail = (index) => {
            projectRail.forEach((item, itemIndex) => {
              const active = itemIndex === index;
              const accent = PROJECTS[itemIndex]?.accent || "#ffffff";
              const line = item.querySelector("[data-project-rail-line]");
              const label = item.querySelector("[data-project-rail-label]");

              gsap.to(item, {
                opacity: active ? 1 : 0.28,
                duration: 0.24,
                overwrite: true,
              });

              if (line) {
                gsap.to(line, {
                  scaleX: active ? 1 : 0.28,
                  backgroundColor: active
                    ? accent
                    : "rgba(255,255,255,.24)",
                  duration: 0.28,
                  overwrite: true,
                });
              }

              if (label) {
                gsap.to(label, {
                  color: active ? accent : "rgba(255,255,255,.50)",
                  duration: 0.28,
                  overwrite: true,
                });
              }
            });
          };

          if (reduceMotion) {
            gsap.set(
              page.querySelectorAll(
                "[data-home-v2-letter], [data-home-v2-meta], [data-manifesto-word]"
              ),
              { clearProps: "all", opacity: 1 }
            );

            if (projectStage && projectPanels.length) {
              gsap.set(projectStage, { height: "auto", overflow: "visible" });
              gsap.set(projectPanels, {
                position: "relative",
                autoAlpha: 1,
                clipPath: FULL_CLIP,
                minHeight: "100svh",
              });
              gsap.set(projectContents, { autoAlpha: 1, x: 0, y: 0 });
              if (projectProgress) {
                gsap.set(projectProgress, {
                  scaleX: 1,
                  transformOrigin: "left center",
                });
              }
            }

            return () => pauseProjectVideos();
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
              end: () => `+=${window.innerHeight * motion.heroDistance}`,
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
                xPercent: motion.heroOxoX,
                scaleX: motion.heroOxoScale,
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
                xPercent: motion.heroStudioX,
                scaleX: motion.heroStudioScale,
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
                scale: motion.heroBrainScale,
                rotateZ: motion.heroBrainRotate,
                opacity: 0,
                filter: "blur(14px)",
                duration: 1,
              },
              0
            )
            .to(
              heroCopy,
              {
                y: motion.heroCopyY,
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

          gsap.set(signalCopy, { autoAlpha: 0, y: 45 });

          signalTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: signal,
              start: "top top",
              end: () => `+=${window.innerHeight * motion.signalDistance}`,
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
                scale: motion.signalWindowScale,
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

          /* TERZA SEZIONE: le quattro card restano volutamente inclinate. */
          capabilityCards.forEach((card, index) => {
            const content = card.querySelector("[data-capability-content]");
            const number = card.querySelector("[data-capability-number]");
            const line = card.querySelector("[data-capability-line]");
            const glow = card.querySelector("[data-capability-glow]");
            const direction = index % 2 === 0 ? -1 : 1;
            const finalTilt = desktop
              ? CAPABILITY_TILTS[index]
              : tablet
                ? CAPABILITY_TILTS[index] * 0.72
                : CAPABILITY_TILTS[index] * 0.38;

            gsap.fromTo(
              card,
              {
                clipPath:
                  direction < 0
                    ? "polygon(0 0, 0 0, 0 100%, 0 100%)"
                    : "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
                x: direction * motion.capabilityX,
                y: motion.capabilityY,
                rotate: finalTilt + direction * 3.4,
                scale: motion.capabilityScale,
              },
              {
                clipPath: FULL_CLIP,
                x: 0,
                y: 0,
                rotate: finalTilt,
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
                  x: direction * motion.capabilityContentX,
                  y: motion.capabilityContentY,
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
                { yPercent: 18, rotate: direction * 7 },
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

          /* QUARTA SEZIONE: stage fermo; le card cambiano con wipe cromatici. */
          if (projectStage && projectPanels.length) {
            const projectWashes = projectPanels
              .map((panel) => panel.querySelector("[data-project-color-wash]"))
              .filter(Boolean);
            const projectChromas = projectPanels
              .map((panel) => panel.querySelector("[data-project-chroma]"))
              .filter(Boolean);

            gsap.set(projectPanels, {
              autoAlpha: 0,
              clipPath: FULL_CLIP,
            });
            gsap.set(projectContents, {
              autoAlpha: 0,
              y: desktop ? 72 : 40,
            });
            gsap.set(projectVideos, {
              scale: 1.1,
              filter: "brightness(1) saturate(1)",
              transformOrigin: "50% 50%",
            });
            gsap.set(projectWashes, { autoAlpha: 0, xPercent: -115 });
            gsap.set(projectChromas, { autoAlpha: 0 });

            projectPanels.forEach((panel, index) => {
              gsap.set(panel, { zIndex: index + 1 });
            });

            gsap.set(projectPanels[0], { autoAlpha: 1, clipPath: FULL_CLIP });
            if (projectContents[0]) {
              gsap.set(projectContents[0], { autoAlpha: 1, x: 0, y: 0 });
            }
            if (projectVideos[0]) {
              gsap.set(projectVideos[0], { scale: 1 });
            }
            if (projectProgress) {
              gsap.set(projectProgress, {
                scaleX: 0,
                transformOrigin: "left center",
              });
            }
            setProjectRail(0);

            projectTimeline = gsap.timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: projectStage,
                start: "top top",
                end: () => {
                  const distance =
                    window.innerHeight * projectPanels.length * motion.projectDistanceFactor;
                  return `+=${Math.max(distance, motion.projectMinDistance)}`;
                },
                pin: true,
                scrub: motion.projectScrub,
                anticipatePin: 1,
                invalidateOnRefresh: true,
                onEnter: () => playProjectVideo(0),
                onEnterBack: () => playProjectVideo(activeProject),
                onLeave: pauseProjectVideos,
                onLeaveBack: pauseProjectVideos,
                onUpdate: (self) => {
                  if (projectProgress) {
                    gsap.set(projectProgress, { scaleX: self.progress });
                  }

                  if (!projectTimeline) return;

                  let nextProject = 0;
                  const currentTime = projectTimeline.time();

                  for (let index = 1; index < projectPanels.length; index += 1) {
                    const labelTime =
                      projectTimeline.labels[`project-${index}`];
                    if (
                      typeof labelTime === "number" &&
                      currentTime >= labelTime
                    ) {
                      nextProject = index;
                    }
                  }

                  if (nextProject !== activeProject) {
                    activeProject = nextProject;
                    setProjectRail(activeProject);
                    playProjectVideo(activeProject);
                  }
                },
              },
            });

            const firstChroma = projectPanels[0].querySelector(
              "[data-project-chroma]"
            );
            if (firstChroma) {
              projectTimeline.fromTo(
                firstChroma,
                { autoAlpha: 0.62 },
                { autoAlpha: 0, duration: 0.72, ease: "power2.out" },
                0
              );
            }
            if (projectVideos[0]) {
              projectTimeline.to(
                projectVideos[0],
                { scale: motion.projectFirstScale, duration: 0.82 },
                0
              );
            }

            projectPanels.forEach((panel, index) => {
              if (index === 0) return;

              const previous = projectPanels[index - 1];
              const currentContent = panel.querySelector(
                "[data-project-content]"
              );
              const previousContent = previous.querySelector(
                "[data-project-content]"
              );
              const currentVideo = panel.querySelector("video");
              const previousVideo = previous.querySelector("video");
              const currentWash = panel.querySelector(
                "[data-project-color-wash]"
              );
              const currentChroma = panel.querySelector(
                "[data-project-chroma]"
              );
              const currentGhost = panel.querySelector("[data-project-ghost]");
              const currentLine = panel.querySelector("[data-project-line]");
              const direction = index % 2 === 0 ? -1 : 1;
              const label = `project-${index}`;

              projectTimeline.addLabel(label, `+=${motion.projectGap}`);
              projectTimeline.set(panel, { autoAlpha: 1 }, label);

              projectTimeline.fromTo(
                panel,
                {
                  clipPath:
                    PROJECT_REVEALS[(index - 1) % PROJECT_REVEALS.length],
                },
                {
                  clipPath: FULL_CLIP,
                  duration: 1.02,
                  ease: "power3.inOut",
                },
                label
              );

              if (currentWash) {
                projectTimeline.fromTo(
                  currentWash,
                  {
                    autoAlpha: 0.92,
                    xPercent: direction * 112,
                  },
                  {
                    autoAlpha: 0,
                    xPercent: direction * -112,
                    duration: 1.05,
                    ease: "power2.inOut",
                  },
                  label
                );
              }

              if (currentChroma) {
                projectTimeline.fromTo(
                  currentChroma,
                  { autoAlpha: 0.8, scale: 0.82 },
                  {
                    autoAlpha: 0,
                    scale: 1.35,
                    duration: 0.86,
                    ease: "power2.out",
                  },
                  label
                );
              }

              if (currentVideo) {
                projectTimeline.fromTo(
                  currentVideo,
                  {
                    scale: motion.projectVideoEnterScale,
                    filter: `brightness(1.45) saturate(2.4) contrast(1.22) hue-rotate(${direction * 70}deg)`,
                  },
                  {
                    scale: 1,
                    filter: "brightness(1) saturate(1) contrast(1) hue-rotate(0deg)",
                    duration: 1.08,
                  },
                  label
                );
              }

              if (previousVideo) {
                projectTimeline.to(
                  previousVideo,
                  {
                    scale: motion.projectVideoExitScale,
                    filter: `brightness(.28) saturate(.45) hue-rotate(${direction * -48}deg)`,
                    duration: 1,
                  },
                  label
                );
              }

              if (previousContent) {
                projectTimeline.to(
                  previousContent,
                  {
                    autoAlpha: 0,
                    x: direction * -80,
                    y: -28,
                    duration: 0.42,
                    ease: "power2.out",
                  },
                  label
                );
              }

              if (currentContent) {
                projectTimeline.fromTo(
                  currentContent,
                  {
                    autoAlpha: 0,
                    x: direction * motion.projectContentX,
                    y: motion.projectContentY,
                  },
                  {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    duration: 0.72,
                    ease: "power3.out",
                  },
                  `${label}+=0.28`
                );
              }

              if (currentGhost) {
                projectTimeline.fromTo(
                  currentGhost,
                  { xPercent: direction * 14, skewX: direction * 7 },
                  { xPercent: direction * -10, skewX: 0, duration: 1 },
                  label
                );
              }

              if (currentLine) {
                projectTimeline.fromTo(
                  currentLine,
                  {
                    scaleX: 0,
                    transformOrigin:
                      direction > 0 ? "left center" : "right center",
                    autoAlpha: 1,
                  },
                  {
                    scaleX: 1,
                    duration: 0.55,
                    ease: "power2.out",
                  },
                  label
                );
                projectTimeline.to(
                  currentLine,
                  {
                    autoAlpha: 0.25,
                    duration: 0.38,
                  },
                  `${label}+=0.62`
                );
              }

              projectTimeline.set(previous, { autoAlpha: 0 }, `${label}+=1.01`);
              projectTimeline.to({}, { duration: motion.projectHold });
            });
          }

          return () => {
            pauseProjectVideos();

            heroTimeline?.scrollTrigger?.kill();
            heroTimeline?.kill();
            signalTimeline?.scrollTrigger?.kill();
            signalTimeline?.kill();
            projectTimeline?.scrollTrigger?.kill();
            projectTimeline?.kill();
          };
        }
      );

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

      const finalNodes = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-final-node]")
      );
      const finalField = finalSection.querySelector("[data-final-field]");
      const finalCursor = finalSection.querySelector("[data-final-cursor]");
      const finalVector = finalSection.querySelector("[data-final-vector]");
      const finalCross = finalSection.querySelector("[data-final-cross]");
      const finalSweep = finalSection.querySelector("[data-final-sweep]");

      if (
        finalNodes.length &&
        finalField &&
        !window.matchMedia("(pointer: coarse)").matches
      ) {
        const cursorX = finalCursor
          ? gsap.quickTo(finalCursor, "x", {
              duration: 0.42,
              ease: "power3.out",
            })
          : null;
        const cursorY = finalCursor
          ? gsap.quickTo(finalCursor, "y", {
              duration: 0.42,
              ease: "power3.out",
            })
          : null;

        const crossX = finalCross
          ? gsap.quickTo(finalCross, "x", {
              duration: 0.62,
              ease: "power3.out",
            })
          : null;
        const crossY = finalCross
          ? gsap.quickTo(finalCross, "y", {
              duration: 0.62,
              ease: "power3.out",
            })
          : null;

        finalPointerMoveHandler = (event) => {
          const fieldRect = finalField.getBoundingClientRect();
          const localX = event.clientX - fieldRect.left;
          const localY = event.clientY - fieldRect.top;
          const nx = localX / fieldRect.width - 0.5;
          const ny = localY / fieldRect.height - 0.5;

          cursorX?.(localX);
          cursorY?.(localY);
          crossX?.(nx * 38);
          crossY?.(ny * 30);

          if (finalVector) {
            const angle =
              Math.atan2(
                event.clientY - (fieldRect.top + fieldRect.height / 2),
                event.clientX - (fieldRect.left + fieldRect.width / 2)
              ) *
              (180 / Math.PI);

            gsap.to(finalVector, {
              rotation: angle,
              scaleX: 0.9 + Math.min(1.8, Math.hypot(nx, ny) * 2.4),
              opacity: 0.28 + Math.min(0.4, Math.hypot(nx, ny)),
              duration: 0.34,
              ease: "power3.out",
              overwrite: true,
            });
          }

          if (finalSweep) {
            gsap.to(finalSweep, {
              xPercent: nx * 18,
              yPercent: ny * 10,
              rotate: nx * 4,
              duration: 0.55,
              ease: "power3.out",
              overwrite: true,
            });
          }

          finalNodes.forEach((node, index) => {
            const rect = node.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;
            const distance = Math.hypot(dx, dy);
            const influence = Math.max(0, 1 - distance / 245);

            const accent = node.dataset.finalAccent || "#ffffff";
            const direction = index % 2 === 0 ? 1 : -1;

            gsap.to(node, {
              x: influence * dx * 0.055,
              y: influence * dy * 0.055,
              scale: 1 + influence * (index % 4 === 0 ? 3.2 : 2.15),
              rotate: influence * direction * (20 + (index % 5) * 8),
              opacity: 0.16 + influence * 0.84,
              borderColor:
                influence > 0.04
                  ? accent
                  : "rgba(255,255,255,.18)",
              backgroundColor:
                influence > 0.22
                  ? `${accent}2a`
                  : "rgba(255,255,255,.012)",
              boxShadow:
                influence > 0.12
                  ? `0 0 0 1px ${accent}22, 0 0 ${
                      8 + influence * 26
                    }px ${accent}33`
                  : "0 0 0 rgba(0,0,0,0)",
              duration: 0.18,
              ease: "power2.out",
              overwrite: true,
            });
          });
        };

        finalPointerLeaveHandler = () => {
          gsap.to(finalNodes, {
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            opacity: 0.24,
            borderColor: "rgba(255,255,255,.18)",
            backgroundColor: "rgba(255,255,255,.012)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
            duration: 0.65,
            ease: "power3.out",
            overwrite: true,
          });

          if (finalCursor) {
            gsap.to(finalCursor, {
              opacity: 0,
              scale: 0.5,
              duration: 0.35,
              ease: "power3.out",
            });
          }

          if (finalCross) {
            gsap.to(finalCross, {
              x: 0,
              y: 0,
              rotate: 0,
              duration: 0.7,
              ease: "power3.out",
            });
          }

          if (finalVector) {
            gsap.to(finalVector, {
              rotation: 0,
              scaleX: 1,
              opacity: 0.16,
              duration: 0.55,
              ease: "power3.out",
            });
          }

          if (finalSweep) {
            gsap.to(finalSweep, {
              xPercent: 0,
              yPercent: 0,
              rotate: 0,
              duration: 0.7,
              ease: "power3.out",
            });
          }
        };

        finalSection.addEventListener(
          "pointermove",
          finalPointerMoveHandler,
          { passive: true }
        );

        finalSection.addEventListener(
          "pointerenter",
          () => {
            if (finalCursor) {
              gsap.to(finalCursor, {
                opacity: 1,
                scale: 1,
                duration: 0.32,
                ease: "power3.out",
              });
            }
          },
          { passive: true }
        );

        finalSection.addEventListener(
          "pointerleave",
          finalPointerLeaveHandler
        );
      }

      /*
       * MOBILE / TOUCH FALLBACK PER IL CAMPO FINALE
       * Su desktop reagisce al mouse; su touch mantiene vita tramite scroll.
       */
      if (
        finalField &&
        window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        if (finalCross) {
          gsap.fromTo(
            finalCross,
            { rotate: -8, scale: 0.92, opacity: 0.18 },
            {
              rotate: 12,
              scale: 1.08,
              opacity: 0.34,
              ease: "none",
              scrollTrigger: {
                trigger: finalSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (finalVector) {
          gsap.fromTo(
            finalVector,
            { rotate: -18, scaleX: 0.72, opacity: 0.12 },
            {
              rotate: 18,
              scaleX: 1.18,
              opacity: 0.3,
              ease: "none",
              scrollTrigger: {
                trigger: finalSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        if (finalSweep) {
          gsap.fromTo(
            finalSweep,
            { xPercent: -6, yPercent: 2 },
            {
              xPercent: 6,
              yPercent: -2,
              ease: "none",
              scrollTrigger: {
                trigger: finalSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            }
          );
        }

        finalNodes.forEach((node, index) => {
          gsap.fromTo(
            node,
            {
              y: index % 2 === 0 ? 8 : -8,
              rotate: index % 2 === 0 ? -4 : 4,
              opacity: 0.18,
            },
            {
              y: index % 2 === 0 ? -10 : 10,
              rotate: index % 2 === 0 ? 7 : -7,
              opacity: 0.5,
              ease: "none",
              scrollTrigger: {
                trigger: finalSection,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.85,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }

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

    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 180);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener("load", refresh);

      if (pointerMoveHandler) {
        window.removeEventListener("pointermove", pointerMoveHandler);
      }

      if (finalPointerMoveHandler) {
        finalSection.removeEventListener(
          "pointermove",
          finalPointerMoveHandler
        );
      }

      if (finalPointerLeaveHandler) {
        finalSection.removeEventListener(
          "pointerleave",
          finalPointerLeaveHandler
        );
      }

      projectVideos.forEach((video) => video.pause());
      mm.revert();
      ctx.revert();
    };
  }, []);

  /*
   * RESPONSIVE REFRESH
   * Non cambia il design: riallinea pin e distanze quando viewport,
   * barra browser mobile o orientamento cambiano.
   */
  useLayoutEffect(() => {
    if (typeof window === "undefined") return undefined;

    let resizeTimer = 0;

    const refreshResponsiveAnimations = () => {
      window.clearTimeout(resizeTimer);

      resizeTimer = window.setTimeout(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh(true);
        ScrollTrigger.update();
      }, 140);
    };

    window.addEventListener("resize", refreshResponsiveAnimations, {
      passive: true,
    });

    window.addEventListener("orientationchange", refreshResponsiveAnimations, {
      passive: true,
    });

    window.visualViewport?.addEventListener(
      "resize",
      refreshResponsiveAnimations,
      { passive: true }
    );

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", refreshResponsiveAnimations);
      window.removeEventListener("orientationchange", refreshResponsiveAnimations);
      window.visualViewport?.removeEventListener(
        "resize",
        refreshResponsiveAnimations
      );
    };
  }, []);

  return (
    <>
      <SeoMetaTags />

      <main
        ref={pageRef}
        className="oxo-home-avant relative overflow-x-hidden bg-[#020203] text-white"
      >
        <style>{`
          /* AVANT LEGATO SAFE:
             cambia SOLO la famiglia tipografica.
             Niente scaleX, display:inline-block o letter-spacing globale. */
          .oxo-home-avant,
          .oxo-home-avant * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .avant-legato-font {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif !important;

            font-style: normal;
            font-weight: 400;
            font-stretch: normal;

            /* IMPORTANTISSIMO:
               non altera box, dimensioni o trasformazioni */
            display: revert;
            transform: none;
            text-transform: inherit;
          }

          /* Solo i display title mantengono un sapore Avant più largo,
             ma con intensità molto minore rispetto alla versione rotta. */
          h1.avant-legato-font,
          h2.avant-legato-font,
          h3.avant-legato-font {
            font-stretch: expanded;
            transform: scaleX(.96);
            transform-origin: left center;
          }

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

          .oxo-project-color-wash {
            mix-blend-mode: screen;
            filter: blur(8px) saturate(1.55);
          }

          .oxo-project-chroma {
            mix-blend-mode: color-dodge;
            filter: blur(28px) saturate(1.8);
          }

          .oxo-capability-v2 {
            transition:
              border-radius .7s cubic-bezier(.16,1,.3,1),
              border-color .5s ease,
              box-shadow .7s cubic-bezier(.16,1,.3,1);
          }

          .oxo-capability-v2:hover {
            border-radius: 86px;
            border-color: rgba(255,255,255,.28);
            box-shadow:
              0 30px 90px rgba(0,0,0,.35),
              inset 0 0 70px rgba(255,255,255,.018);
          }

          .oxo-capability-v2:hover .oxo-capability-v2-title {
            transform: translateX(1.1vw) skewX(-2.5deg);
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


          [data-final-node] {
            transform-style: preserve-3d;
          }

          [data-final-field] {
            isolation: isolate;
          }
          [data-final-node] {
            transition:
              border-color .18s ease,
              background-color .18s ease;
          }


          /* ==========================================
             RESPONSIVE ANIMATION SAFETY
             Stesso design, stessi effetti.
             Cambiano soltanto scala/intensità per device.
             ========================================== */

          @media (max-width: 1023px) {
            .oxo-home-avant {
              overflow-x: clip;
            }

            .oxo-project-color-wash {
              filter: blur(5px) saturate(1.3);
            }

            .oxo-project-chroma {
              filter: blur(20px) saturate(1.45);
            }

            .oxo-v2-brain-halo {
              filter: blur(52px);
            }

            [data-project-stage] {
              min-height: max(620px, 100svh);
            }

            [data-final-field] {
              perspective: 900px;
            }
          }

          @media (max-width: 767px) {
            .oxo-v2-grid {
              background-size: 46px 46px;
            }

            .oxo-v2-electric-path {
              filter: drop-shadow(0 0 5px rgba(53,216,255,.55));
            }

            .oxo-project-color-wash {
              filter: blur(3px) saturate(1.15);
            }

            .oxo-project-chroma {
              filter: blur(14px) saturate(1.25);
            }

            [data-signal-row] {
              will-change: transform;
            }

            [data-signal-window],
            [data-signal-cross],
            [data-project-panel],
            [data-project-content],
            [data-capability-panel],
            [data-capability-inner],
            [data-manifesto-track],
            [data-final-node],
            [data-final-cross],
            [data-final-vector],
            [data-final-sweep] {
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }

            [data-project-stage] {
              min-height: max(600px, 100svh);
            }

            [data-project-content] {
              max-width: 100%;
            }

            [data-final-field] {
              height: 52%;
            }

            .oxo-capability-v2:hover {
              border-radius: 34px;
            }
          }

          @media (max-width: 479px) {
            .oxo-v2-grid {
              background-size: 38px 38px;
            }

            [data-project-stage] {
              min-height: max(580px, 100svh);
            }

            [data-final-field] {
              height: 47%;
            }

            .oxo-v2-brain-halo {
              filter: blur(38px);
            }
          }

          @media (hover: none) and (pointer: coarse) {
            .oxo-capability-v2:hover {
              border-color: rgba(255,255,255,.18);
              box-shadow: none;
            }

            .oxo-capability-v2:hover .oxo-capability-v2-title,
            .oxo-capability-v2:hover .oxo-capability-v2-arrow,
            .oxo-project-v2:hover .oxo-project-v2-title {
              transform: none;
              letter-spacing: inherit;
            }
          }

          @media (prefers-reduced-motion: reduce) {
            .oxo-v2-brain-halo,
            .oxo-v2-brain-orbit,
            .oxo-v2-brain-orbit-reverse {
              animation: none;
            }

            [data-final-node] {
              transition: none;
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
            className="avant-legato-font pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[40vw] uppercase leading-none tracking-[-0.11em] text-white/[0.018]"
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
            className="relative z-10 my-auto py-10 md:py-12 lg:py-14 [transform-style:preserve-3d]"
          >
            <div className="relative">
              <p
                data-home-v2-meta
                className="avant-legato-font mb-3 text-[9px] uppercase tracking-[0.38em] text-cyan-300 md:text-xs"
              >
                Software / AI / Interactive worlds
              </p>

              <div className="relative py-[0.6vw] md:py-[0.4vw]">
                <h1
                  data-hero-oxo
                  className="avant-legato-font ombra2 relative z-[4] overflow-hidden py-[0.14em] text-[29vw] uppercase leading-[0.76] tracking-[-0.105em] md:py-[0.13em] md:text-[24vw] lg:text-[17vw]"
                >
                  <SplitLetters text="OXO" />
                </h1>

                <h1
                  data-hero-studio
                  className="avant-legato-font ombra2 relative z-[4] ml-auto mt-[-1.25vw] w-fit overflow-hidden py-[0.15em] pr-[0.12em] text-[19vw] uppercase leading-[0.79] tracking-[-0.09em] md:py-[0.14em] md:pr-[0.14em] md:text-[13.5vw] lg:pr-[0.16em] lg:text-[13.5vw]"
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
              className="avant-legato-font max-w-[980px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.55rem]"
            >
              Progettiamo sistemi digitali con una voce precisa: software,
              intelligenza artificiale e mondi interattivi che non sembrano già
              visti.
            </p>

            <p
              data-home-v2-meta
              className="avant-legato-font shrink-0 text-[9px] uppercase tracking-[0.31em] text-white/38 md:text-xs"
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
                className={`avant-legato-font flex w-max whitespace-nowrap uppercase leading-[.72] tracking-[-0.065em] ${
                  index === 1
                    ? "text-[15vw] md:text-[10.5vw]"
                    : index === 2
                      ? "text-[13.5vw] text-white/[0.12] md:text-[9vw]"
                      : "text-[16.5vw] text-white/[0.055] md:text-[9vw]"
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
            <p className="avant-legato-font mb-5 text-[9px] uppercase tracking-[0.4em] text-cyan-300 md:text-xs">
              One studio / one signal
            </p>
            <h2 className="avant-legato-font ombra2 text-[11.5vw] uppercase leading-[.76] tracking-[-0.07em] md:text-[6.8vw]">
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

              <h2 className="avant-legato-font ombra2 text-[16.5vw] uppercase leading-[.69] tracking-[-0.085em] md:text-[10.5vw] lg:text-[7.8vw]">
                BUILT
                <br />
                AS ONE.
              </h2>
            </div>

            <p className="avant-legato-font max-w-[720px] text-xl leading-snug text-gray-300 md:justify-self-end md:text-3xl">
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
                className={`oxo-capability-v2 group relative min-h-[60svh] overflow-hidden rounded-[34px] border border-white/18 bg-[#030304] p-7 md:min-h-[66svh] md:rounded-[46px] md:p-10 lg:min-h-[72svh] lg:rounded-[64px] lg:p-[3vw] ${
                  index % 2 === 1 ? "lg:mt-[6vh]" : ""
                }`}
                style={{
                  clipPath: FULL_CLIP,
                  transform: `rotate(${CAPABILITY_TILTS[index]}deg)`,
                  transformOrigin: index % 2 === 0 ? "35% 55%" : "65% 55%",
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

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-[12px] rounded-[26px] border border-white/[0.07] md:inset-[16px] md:rounded-[36px] lg:inset-[20px] lg:rounded-[50px]"
                />

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-[14%] -left-[8%] h-[44%] w-[44%] rounded-full border border-white/[0.06]"
                  style={{
                    boxShadow: `0 0 70px ${item.soft}`,
                  }}
                />

                <p
                  data-capability-number
                  aria-hidden="true"
                  className="avant-legato-font pointer-events-none absolute -right-[2vw] -top-[6vw] text-[31vw] leading-none tracking-[-0.11em] text-white/[0.04] md:text-[23vw] lg:text-[16.5vw]"
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

                    <h3 className="oxo-capability-v2-title avant-legato-font ombra2 text-[15vw] uppercase leading-[.68] tracking-[-0.09em] transition-transform duration-700 ease-out md:text-[9vw] lg:text-[6.2vw]">
                      {item.title}
                    </h3>

                    <div className="mt-8 flex items-end justify-between gap-7">
                      <p className="avant-legato-font max-w-[650px] text-lg leading-snug text-gray-300 md:text-2xl lg:text-[1.75rem]">
                        {item.copy}
                      </p>

                      <span
                        className="oxo-capability-v2-arrow avant-legato-font shrink-0 text-4xl transition-transform duration-700 ease-out md:text-6xl"
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
            <p className="avant-legato-font mb-5 text-[10px] uppercase tracking-[0.38em] text-fuchsia-400 md:text-xs">
              Selected systems
            </p>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <h2 className="avant-legato-font ombra2 text-[17vw] uppercase leading-[.69] tracking-[-0.085em] md:text-[9vw] lg:text-[8vw]">
                WORK THAT
                <br />
                CHANGES.
              </h2>
              <p className="avant-legato-font max-w-[640px] text-xl leading-snug text-gray-300 md:text-3xl">
                Lo schermo resta fermo. Il progetto cambia pelle, colore e ritmo
                mentre continui a scorrere.
              </p>
            </div>
          </div>

          <div
            data-project-stage
            className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-black"
          >
            {PROJECTS.map((project, index) => (
              <article
                key={project.id}
                data-project-panel
                className="oxo-project-v2 oxo-v2-noise absolute inset-0 overflow-hidden bg-black"
                style={{
                  opacity: index === 0 ? 1 : 0,
                  visibility: index === 0 ? "visible" : "hidden",
                  zIndex: index + 1,
                  clipPath: FULL_CLIP,
                  willChange: "clip-path, opacity, transform, filter",
                }}
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
                  autoPlay={index === 0}
                  onLoadedMetadata={() => ScrollTrigger.refresh()}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                    ScrollTrigger.refresh();
                  }}
                />

                <div
                  data-project-chroma
                  aria-hidden="true"
                  className="oxo-project-chroma pointer-events-none absolute -inset-[18%] z-[4] rounded-full"
                  style={{
                    background: `radial-gradient(circle at ${
                      index % 2 === 0 ? "70% 30%" : "30% 66%"
                    }, ${project.accent}cc 0%, ${project.accent}44 28%, transparent 62%)`,
                    opacity: index === 0 ? 0.2 : 0,
                  }}
                />

                <div
                  data-project-color-wash
                  aria-hidden="true"
                  className="oxo-project-color-wash pointer-events-none absolute -left-[18%] top-[-20%] z-[8] h-[140%] w-[136%] -skew-x-[14deg]"
                  style={{
                    background: `linear-gradient(100deg, transparent 14%, ${project.accent}00 30%, ${project.accent} 48%, rgba(255,255,255,.95) 50%, ${project.accent} 52%, ${project.accent}00 70%, transparent 86%)`,
                    opacity: 0,
                  }}
                />

                <div className="pointer-events-none absolute inset-0 z-[5] bg-black/23" />
                <div className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-t from-black via-black/5 to-black/68" />
                <div
                  className={`pointer-events-none absolute inset-0 z-[5] ${
                    index % 2 === 0
                      ? "bg-gradient-to-r from-black/82 via-black/10 to-black/22"
                      : "bg-gradient-to-l from-black/82 via-black/10 to-black/22"
                  }`}
                />

                <p
                  data-project-ghost
                  aria-hidden="true"
                  className="avant-legato-font pointer-events-none absolute left-1/2 top-1/2 z-[6] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[16.5vw] uppercase leading-none tracking-[-0.08em] text-white/[0.065]"
                >
                  {project.statement}
                </p>

                <div className="pointer-events-none absolute inset-[14px] z-10 border border-white/28 md:inset-[26px] lg:inset-[2.2vw]" />

                <div className="avant-legato-font absolute left-7 top-7 z-20 flex items-center gap-3 text-[9px] uppercase tracking-[0.31em] md:left-12 md:top-12 md:text-xs lg:left-[4.4vw] lg:top-[4.4vw]">
                  <span>{project.id}</span>
                  <span
                    className="h-px w-12 md:w-20"
                    style={{ backgroundColor: project.accent }}
                  />
                  <span className="text-gray-300">{project.category}</span>
                </div>

                <p className="avant-legato-font absolute right-7 top-7 z-20 max-w-[48vw] text-right text-[8px] uppercase tracking-[0.24em] text-gray-300 md:right-12 md:top-12 md:text-[11px] lg:right-[4.4vw] lg:top-[4.4vw]">
                  {project.meta}
                </p>

                <div
                  data-project-content
                  className={`absolute bottom-12 z-20 max-w-[1120px] px-7 md:bottom-16 md:px-12 lg:bottom-[7vh] lg:px-[5vw] ${
                    index % 2 === 0 ? "left-0" : "right-0 text-right"
                  }`}
                >
                  <p
                    className="avant-legato-font mb-3 text-[9px] uppercase tracking-[0.37em] md:text-xs"
                    style={{ color: project.accent }}
                  >
                    Selected work / {project.statement}
                  </p>

                  <h3 className="oxo-project-v2-title avant-legato-font ombra2 text-[clamp(3rem,8.2vw,8.2rem)] uppercase leading-[.72] tracking-[-0.075em] transition-[letter-spacing] duration-700">
                    {project.title}
                  </h3>

                  <p
                    className={`avant-legato-font mt-6 max-w-[760px] text-lg leading-snug text-gray-200 md:text-2xl lg:text-3xl ${
                      index % 2 === 0 ? "" : "ml-auto"
                    }`}
                  >
                    {project.description}
                  </p>

                  <Link
                    to={project.link}
                    className="avant-legato-font group mt-8 inline-flex items-center gap-5 border-b border-white/70 pb-2 text-sm uppercase tracking-[0.28em] md:mt-10 md:text-base"
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
                    boxShadow: `0 0 22px ${project.accent}`,
                  }}
                />
              </article>
            ))}

            <aside className="pointer-events-none absolute right-7 top-1/2 z-[70] hidden -translate-y-1/2 flex-col gap-5 md:flex lg:right-[3vw]">
              {PROJECTS.map((project, index) => (
                <div
                  key={project.id}
                  data-project-rail
                  className="flex items-center justify-end gap-3 opacity-30"
                >
                  <span
                    data-project-rail-label
                    className="avant-legato-font text-[9px] uppercase tracking-[0.24em] text-white/55"
                  >
                    {project.id}
                  </span>
                  <span
                    data-project-rail-line
                    className="h-px w-10 origin-right bg-white/25"
                    style={{ transform: index === 0 ? "scaleX(1)" : "scaleX(.28)" }}
                  />
                </div>
              ))}
            </aside>

            <div className="pointer-events-none absolute bottom-0 left-0 z-[80] h-px w-full bg-white/20">
              <div
                data-project-progress
                className="h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
              />
            </div>
          </div>
        </section>

        <section
          ref={manifestoRef}
          className="oxo-v2-noise relative min-h-[110svh] overflow-hidden border-y border-white/15 bg-[#050506] py-24 md:py-32 lg:py-[16vh]"
        >
          <div className="oxo-v2-grid pointer-events-none absolute inset-0 opacity-70" />

          <div
            data-manifesto-track
            aria-hidden="true"
            className="avant-legato-font pointer-events-none relative z-[1] flex w-max whitespace-nowrap text-[20vw] uppercase leading-[.7] tracking-[-0.08em] text-white/[0.045] md:text-[15vw] lg:text-[11.5vw]"
          >
            <span>NO TEMPLATES — NO NOISE — NO EMPTY MOTION —&nbsp;</span>
            <span>NO TEMPLATES — NO NOISE — NO EMPTY MOTION —&nbsp;</span>
          </div>

          <div className="relative z-10 mx-auto mt-[-2vw] flex min-h-[68vh] max-w-[1500px] items-center px-6 md:px-10 lg:px-[5vw]">
            <div className="max-w-[1250px]">
              <p className="avant-legato-font mb-7 text-[10px] uppercase tracking-[0.38em] text-violet-400 md:text-xs">
                Oxo point of view
              </p>

              <p className="avant-legato-font text-[clamp(2rem,5.2vw,5.6rem)] leading-[.94] tracking-[-0.045em] text-gray-100 [perspective:900px]">
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

          {/* Awwwards reactive field: nessuna nuova altezza */}
          <div
            data-final-field
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[58%] overflow-hidden [perspective:1200px]"
          >
            <div className="absolute inset-0 opacity-55">
              <div className="absolute left-[4vw] top-[17%] h-px w-[92vw] bg-white/[0.055]" />
              <div className="absolute left-1/2 top-[4%] h-[90%] w-px -translate-x-1/2 bg-white/[0.045]" />
              <div className="absolute left-[20%] top-[54%] h-px w-[60%] -rotate-[7deg] bg-white/[0.035]" />
              <div className="absolute left-[16%] top-[12%] h-[70%] w-[70%] rounded-full border border-white/[0.035]" />
              <div className="absolute left-[33%] top-[22%] h-[42%] w-[34%] rotate-45 border border-white/[0.04]" />
            </div>

            <div
              data-final-cross
              className="absolute left-1/2 top-[37%] h-[18vw] w-[18vw] min-h-[160px] min-w-[160px] -translate-x-1/2 -translate-y-1/2 opacity-35"
            >
              <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
              <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="absolute inset-[22%] rotate-45 border border-white/10" />
            </div>

            <div
              data-final-vector
              className="absolute left-1/2 top-[37%] h-px w-[22vw] min-w-[190px] origin-left bg-gradient-to-r from-cyan-300/65 via-violet-400/45 to-transparent opacity-20"
            />

            <div
              data-final-sweep
              className="absolute left-[12%] top-[10%] h-[70%] w-[76%] opacity-30"
            >
              <div className="absolute left-[8%] top-[18%] h-px w-[23%] bg-gradient-to-r from-cyan-300/35 to-transparent" />
              <div className="absolute right-[7%] top-[44%] h-px w-[27%] bg-gradient-to-l from-fuchsia-400/28 to-transparent" />
              <div className="absolute left-[34%] top-[75%] h-px w-[30%] bg-gradient-to-r from-violet-400/20 via-white/10 to-transparent" />
            </div>

            {[
              { left: "7%", top: "17%", size: 9, accent: "#35d8ff" },
              { left: "14%", top: "37%", size: 5, accent: "#8b5cf6" },
              { left: "21%", top: "61%", size: 8, accent: "#20f0c7" },
              { left: "28%", top: "25%", size: 11, accent: "#ff4fd8" },
              { left: "36%", top: "50%", size: 6, accent: "#35d8ff" },
              { left: "43%", top: "17%", size: 7, accent: "#8b5cf6" },
              { left: "50%", top: "35%", size: 12, accent: "#20f0c7" },
              { left: "57%", top: "68%", size: 6, accent: "#ff4fd8" },
              { left: "64%", top: "28%", size: 9, accent: "#35d8ff" },
              { left: "72%", top: "54%", size: 7, accent: "#8b5cf6" },
              { left: "79%", top: "19%", size: 11, accent: "#20f0c7" },
              { left: "86%", top: "42%", size: 6, accent: "#ff4fd8" },
              { left: "93%", top: "66%", size: 9, accent: "#35d8ff" },
              { left: "10%", top: "76%", size: 6, accent: "#8b5cf6" },
              { left: "31%", top: "78%", size: 7, accent: "#20f0c7" },
              { left: "69%", top: "80%", size: 8, accent: "#ff4fd8" },
              { left: "88%", top: "77%", size: 5, accent: "#35d8ff" },
            ].map((node, index) => (
              <span
                key={`final-node-${index}`}
                data-final-node
                data-final-accent={node.accent}
                className="absolute border border-white/20 bg-white/[0.012]"
                style={{
                  left: node.left,
                  top: node.top,
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  opacity: 0.24,
                  transform: "translate(-50%, -50%)",
                  willChange:
                    "transform, opacity, border-color, background-color, box-shadow",
                }}
              />
            ))}

            <span
              data-final-cursor
              className="absolute left-0 top-0 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20 opacity-0"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,.08), transparent 62%)",
                boxShadow:
                  "inset 0 0 0 1px rgba(53,216,255,.08)",
              }}
            >
              <span className="absolute left-1/2 top-[-10px] h-[calc(100%+20px)] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/18 to-transparent" />
              <span className="absolute left-[-10px] top-1/2 h-px w-[calc(100%+20px)] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            </span>

            <p className="avant-legato-font absolute bottom-[6%] left-[5vw] text-[8px] uppercase tracking-[0.38em] text-white/22 md:text-[10px]">
              MOVE / DISTORT / CONNECT
            </p>

            <p className="avant-legato-font absolute bottom-[6%] right-[5vw] text-right text-[8px] uppercase tracking-[0.38em] text-white/22 md:text-[10px]">
              FIELD 05 / POINTER ACTIVE
            </p>
          </div>

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

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[16.5vw] uppercase leading-[.68] tracking-[-0.09em] md:text-[13.5vw] lg:text-[10.8vw]">
              <SplitLetters
                text="BREAK FORM"
                attribute="data-home-final-letter"
              />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="avant-legato-font max-w-[840px] text-xl leading-snug text-gray-300 md:text-3xl">
                Hai un prodotto che non deve assomigliare al prossimo sito che
                scorrerai domani?
              </p>

              <Link
                to="/Contatti"
                data-magnetic
                className="oxo-final-cta avant-legato-font relative z-20 inline-flex w-fit items-center gap-5 border border-white/35 bg-white/[0.035] px-5 py-4 text-sm uppercase tracking-[0.28em] text-white opacity-100 md:px-6 md:py-4 md:text-base"
              >
                <span>
                  Parliamo del progetto
                </span>

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