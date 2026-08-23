import { useLayoutEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";
import "../styles/avant-legato.css";


gsap.registerPlugin(ScrollTrigger);

const FIELD_PHASES = [
  {
    id: "01",
    eyebrow: "INPUT",
    title: "COMPLEXITY",
    statement: "READ THE SIGNAL",
    copy: "Entriamo nel problema senza semplificarlo troppo presto. Osserviamo flussi, attriti, dati e comportamento.",
    
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
    name: "POLI MATTEO",
    role: "SOFTWARE / AI / PRODUCT",
    image: "/img/team/matte2.png",
    accent: "#35d8ff",
    link: "/team/matteo",
    fallback:
      "radial-gradient(circle at 70% 25%, rgba(53,216,255,.32), transparent 12%), linear-gradient(145deg, #06141d, #05060b 55%, #010101)",
  },
  {
    id: "02",
    name: "CHIERICI GABRIELE",
    role: "CREATIVE / INTERACTIVE / DEVELOPMENT",
    link:"/team/gab",
    image: "/img/team/gab.png",
    accent: "#8b5cf6",

    fallback:
      "radial-gradient(circle at 28% 30%, rgba(139,92,246,.34), transparent 12%), linear-gradient(145deg, #150720, #07070d 56%, #010101)",
  },
  {
    id: "03",
    name: "ELIA SPAGNOLI",
    role: "ROLE / SPECIALIZATION",
    initials: "03",
    image: "/images/team/team-03.webp",
    accent: "#20f0c7",
    description:
      "Inserisci qui una breve descrizione del ruolo, delle competenze e del contributo della persona ai progetti OXO.",
    fallback:
      "radial-gradient(circle at 72% 26%, rgba(32,240,199,.28), transparent 34%), linear-gradient(145deg, #041815, #05070a 56%, #010101)",
  },
  {
    id: "04",
    name: "LUCA ALBANI",
    role: "ROLE / SPECIALIZATION",
    initials: "04",
    image: "/images/team/team-04.webp",
    accent: "#ff4fd8",
    description:
      "Inserisci qui una breve descrizione del ruolo, delle competenze e del contributo della persona ai progetti OXO.",
    fallback:
      "radial-gradient(circle at 30% 28%, rgba(255,79,216,.28), transparent 34%), linear-gradient(145deg, #190515, #08060b 56%, #010101)",
  },
  {
    id: "05",
    name: "NOME COGNOME",
    role: "ROLE / SPECIALIZATION",
    initials: "05",
    image: "/images/team/team-05.webp",
    accent: "#35d8ff",
    description:
      "Inserisci qui una breve descrizione del ruolo, delle competenze e del contributo della persona ai progetti OXO.",
    fallback:
      "radial-gradient(circle at 64% 32%, rgba(53,216,255,.26), transparent 34%), linear-gradient(145deg, #06131b, #05060a 56%, #010101)",
  },
  {
    id: "06",
    name: "NOME COGNOME",
    role: "ROLE / SPECIALIZATION",
    initials: "06",
    image: "/images/team/team-06.webp",
    accent: "#8b5cf6",
    description:
      "Inserisci qui una breve descrizione del ruolo, delle competenze e del contributo della persona ai progetti OXO.",
    fallback:
      "radial-gradient(circle at 28% 30%, rgba(139,92,246,.30), transparent 34%), linear-gradient(145deg, #12071d, #06070c 56%, #010101)",
  },
  {
    id: "07",
    name: "NOME COGNOME",
    role: "ROLE / SPECIALIZATION",
    initials: "07",
    image: "/images/team/team-07.webp",
    accent: "#20f0c7",
    description:
      "Inserisci qui una breve descrizione del ruolo, delle competenze e del contributo della persona ai progetti OXO.",
    fallback:
      "radial-gradient(circle at 68% 24%, rgba(32,240,199,.26), transparent 34%), linear-gradient(145deg, #041713, #050708 56%, #010101)",
  },
  {
    id: "08",
    name: "NOME COGNOME",
    role: "ROLE / SPECIALIZATION",
    initials: "08",
    image: "/images/team/team-08.webp",
    accent: "#ff4fd8",
    description:
      "Inserisci qui una breve descrizione del ruolo, delle competenze e del contributo della persona ai progetti OXO.",
    fallback:
      "radial-gradient(circle at 30% 26%, rgba(255,79,216,.28), transparent 34%), linear-gradient(145deg, #190515, #08060b 56%, #010101)",
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
  const navigate = useNavigate();
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
    let heroPointerMoveHandler = null;
    let heroPointerLeaveHandler = null;

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


      /*
       * ============================================================
       * HEADER / IDENTITY LENS
       * Effetto Awwwards: lente tipografica interattiva + morph scroll.
       * ============================================================
       */
      const heroLens = hero.querySelector("[data-about-lens]");
      const heroLensInner = hero.querySelector("[data-about-lens-inner]");
      const heroLensGhost = hero.querySelector("[data-about-lens-ghost]");
      const heroLensRing = hero.querySelector("[data-about-lens-ring]");
      const heroLensSlices = gsap.utils.toArray(
        hero.querySelectorAll("[data-about-lens-slice]")
      );
      const heroLensNodes = gsap.utils.toArray(
        hero.querySelectorAll("[data-about-lens-node]")
      );
      const heroLensAperture = hero.querySelector("[data-about-lens-aperture]");
      const heroSweep = hero.querySelector("[data-about-hero-sweep]");
      const heroSignal = hero.querySelector("[data-about-hero-signal]");

      const resetHeroInteractiveState = (immediate = false) => {
        const duration = immediate ? 0 : 0.45;

        if (heroLens) {
          gsap.to(heroLens, {
            x: 0,
            y: 0,
            duration,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (heroLensInner) {
          gsap.to(heroLensInner, {
            rotationX: 0,
            rotationY: 0,
            duration,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (heroLensGhost) {
          gsap.to(heroLensGhost, {
            x: 0,
            y: 0,
            rotationZ: 0,
            duration,
            ease: "power3.out",
            overwrite: "auto",
          });
        }

        if (heroLensSlices.length) {
          gsap.to(heroLensSlices, {
            x: 0,
            y: 0,
            filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
            duration,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      if (heroLens) {
        gsap.fromTo(
          heroLens,
          {
            scale: 0.62,
            rotate: -16,
            opacity: 0,
            filter: "blur(14px)",
          },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.45,
            delay: 0.18,
            ease: "power4.out",
          }
        );

        gsap.to(heroLens, {
          scale: 1.62,
          rotate: 24,
          xPercent: 18,
          yPercent: -10,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (heroLensRing) {
        gsap.to(heroLensRing, {
          rotate: 180,
          scale: 1.12,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1.15,
          },
        });
      }


      if (heroLensSlices.length) {
        gsap.fromTo(
          heroLensSlices,
          {
            xPercent: (index) => (index % 2 === 0 ? -42 : 42),
            opacity: 0,
            filter: "blur(8px)",
          },
          {
            xPercent: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.05,
            stagger: 0.08,
            delay: 0.42,
            ease: "power4.out",
          }
        );

        heroLensSlices.forEach((slice, index) => {
          gsap.to(slice, {
            xPercent: index === 0 ? -20 : index === 1 ? 16 : -11,
            skewX: index === 1 ? 3 : -2,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1 + index * 0.08,
            },
          });
        });
      }

      if (heroLensNodes.length) {
        gsap.fromTo(
          heroLensNodes,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.65,
            stagger: 0.055,
            delay: 0.52,
            ease: "back.out(1.8)",
          }
        );

        heroLensNodes.forEach((node, index) => {
          gsap.to(node, {
            rotate: index % 2 === 0 ? 90 : -90,
            scale: index % 3 === 0 ? 1.7 : 1.15,
            ease: "none",
            scrollTrigger: {
              trigger: hero,
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          });
        });
      }

      if (heroLensAperture) {
        gsap.fromTo(
          heroLensAperture,
          {
            scale: 0.72,
            rotate: -20,
            opacity: 0,
          },
          {
            scale: 1,
            rotate: 0,
            opacity: 0.74,
            duration: 1.3,
            delay: 0.28,
            ease: "power4.out",
          }
        );

        gsap.to(heroLensAperture, {
          scale: 1.85,
          rotate: 54,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (heroSweep) {
        gsap.fromTo(
          heroSweep,
          { xPercent: -120, opacity: 0 },
          {
            xPercent: 120,
            opacity: 0.8,
            duration: 1.55,
            delay: 0.34,
            ease: "power3.inOut",
          }
        );

        gsap.to(heroSweep, {
          yPercent: 42,
          rotate: -3,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      if (heroSignal) {
        gsap.fromTo(
          heroSignal,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 1.2,
            delay: 0.58,
            ease: "power4.out",
            transformOrigin: "left center",
          }
        );
      }


      /*
       * RESET CERTO QUANDO SI TORNA IN CIMA.
       * Le proprietà x/y/rotationX/rotationY arrivano dal puntatore e
       * non fanno parte dello scrub principale: qui le riportiamo a zero.
       */
      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (self.progress <= 0.002) {
            resetHeroInteractiveState(true);
          }
        },
        onRefresh: (self) => {
          if (self.progress <= 0.002) {
            resetHeroInteractiveState(true);
          }
        },
      });

      if (
        heroLens &&
        heroLensInner &&
        !window.matchMedia("(pointer: coarse)").matches
      ) {
        const lensX = gsap.quickTo(heroLens, "x", {
          duration: 0.7,
          ease: "power3.out",
        });
        const lensY = gsap.quickTo(heroLens, "y", {
          duration: 0.7,
          ease: "power3.out",
        });
        const lensRotateX = gsap.quickTo(heroLensInner, "rotationX", {
          duration: 0.75,
          ease: "power3.out",
        });
        const lensRotateY = gsap.quickTo(heroLensInner, "rotationY", {
          duration: 0.75,
          ease: "power3.out",
        });
        const ghostX = heroLensGhost
          ? gsap.quickTo(heroLensGhost, "x", {
              duration: 0.55,
              ease: "power3.out",
            })
          : null;
        const ghostY = heroLensGhost
          ? gsap.quickTo(heroLensGhost, "y", {
              duration: 0.55,
              ease: "power3.out",
            })
          : null;

        const ghostRotate = heroLensGhost
          ? gsap.quickTo(heroLensGhost, "rotationZ", {
              duration: 0.6,
              ease: "power3.out",
            })
          : null;

        heroPointerMoveHandler = (event) => {
          const rect = hero.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;

          lensX(nx * 38);
          lensY(ny * 28);
          lensRotateY(nx * 7);
          lensRotateX(ny * -6);
          ghostX?.(nx * -34);
          ghostY?.(ny * -22);
          ghostRotate?.(nx * -2.2);

          heroLensSlices.forEach((slice, index) => {
            gsap.to(slice, {
              x: nx * (index === 1 ? -34 : 26),
              y: ny * (index === 1 ? -18 : 14),
              filter:
                index === 1
                  ? `drop-shadow(${nx * 7}px 0 0 rgba(139,92,246,.22))`
                  : `drop-shadow(${nx * -6}px 0 0 rgba(53,216,255,.16))`,
              duration: 0.42,
              ease: "power3.out",
              overwrite: true,
            });
          });
        };

        heroPointerLeaveHandler = () => {
          resetHeroInteractiveState(false);
        };

        hero.addEventListener("pointermove", heroPointerMoveHandler, {
          passive: true,
        });
        hero.addEventListener("pointerleave", heroPointerLeaveHandler);
      }

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

      /*
       * TOUCH FALLBACK PER I NODI DEL FIELD
       * Su desktop reagiscono al mouse.
       * Su mobile/tablet touch reagiscono allo scroll senza cambiare grafica.
       */
      if (
        fieldNodes.length &&
        window.matchMedia("(pointer: coarse)").matches &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        fieldNodes.forEach((node, index) => {
          gsap.fromTo(
            node,
            {
              scale: 0.9,
              opacity: 0.38,
            },
            {
              scale: index % 2 === 0 ? 1.85 : 1.55,
              opacity: 0.9,
              ease: "none",
              scrollTrigger: {
                trigger: story,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            }
          );
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
           * Desktop resta IDENTICO.
           * Tablet/mobile mantengono le stesse animazioni,
           * ma con ampiezza e durata proporzionate alla viewport.
           */
          const motion = {
            fieldDistance: desktop ? 3.2 : tablet ? 2.75 : 2.35,
            fieldScrub: desktop ? 1 : tablet ? 0.82 : 0.66,
            phaseGap: desktop ? 0.22 : tablet ? 0.18 : 0.12,
            phaseHold: desktop ? 0.38 : tablet ? 0.31 : 0.24,

            bladeShiftBase: desktop ? 22 : tablet ? 17 : 12,
            bladeShiftAlt: desktop ? -18 : tablet ? -14 : -10,
            bladeShiftStep: desktop ? 5 : tablet ? 4 : 3,

            coreStartScale: desktop ? 0.58 : tablet ? 0.66 : 0.74,
            coreRotate: desktop ? 7 : tablet ? 5 : 3.5,
            coreFinalScale: desktop ? 1.16 : tablet ? 1.1 : 1.06,

            titleEnterY: desktop ? 120 : tablet ? 105 : 92,
            titleExitY: desktop ? -110 : tablet ? -96 : -82,
            titleSkew: desktop ? 8 : tablet ? 6 : 4,

            copyEnterY: desktop ? 46 : tablet ? 36 : 28,
            copyExitY: desktop ? -35 : tablet ? -28 : -22,

            statementShift: desktop ? 12 : tablet ? 9 : 7,
            ghostShift: desktop ? 30 : tablet ? 22 : 16,

            teamMediaScale: desktop ? 1.16 : tablet ? 1.11 : 1.07,
            teamContentY: desktop ? 48 : tablet ? 38 : 28,

            processY: desktop ? 50 : tablet ? 38 : 28,
          };
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
          const coreMatteo = story.querySelector("[data-field-core-matteo]");
          const coreGabriele = story.querySelector("[data-field-core-gabriele]");
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

          if (coreMatteo) {
            gsap.set(coreMatteo, {
              autoAlpha: 1,
              scale: 1,
              filter: "blur(0px)",
            });
          }

          if (coreGabriele) {
            gsap.set(coreGabriele, {
              autoAlpha: 0,
              scale: 1.08,
              filter: "blur(8px)",
            });
          }

          setActivePhase(0);

          const fieldTimeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: story,
              start: "top top",
              end: () =>
                `+=${window.innerHeight * motion.fieldDistance}`,
              pin: true,
              scrub: motion.fieldScrub,
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
                scale: motion.coreStartScale,
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
                yPercent: motion.titleEnterY,
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

            fieldTimeline.addLabel(label, `+=${motion.phaseGap}`);

            /*
             * PHOTO SWITCH:
             * slide 01 = Matteo
             * from slide 02 onward = Gabriele
             */
            if (index === 1) {
              if (coreMatteo) {
                fieldTimeline.to(
                  coreMatteo,
                  {
                    autoAlpha: 0,
                    scale: 1.08,
                    filter: "blur(7px)",
                    duration: 0.34,
                    ease: "power2.in",
                  },
                  label
                );
              }

              if (coreGabriele) {
                fieldTimeline.fromTo(
                  coreGabriele,
                  {
                    autoAlpha: 0,
                    scale: 0.92,
                    filter: "blur(8px)",
                  },
                  {
                    autoAlpha: 1,
                    scale: 1,
                    filter: "blur(0px)",
                    duration: 0.48,
                    ease: "power4.out",
                  },
                  `${label}+=0.18`
                );
              }
            }

            if (previousTitle) {
              fieldTimeline.to(
                previousTitle,
                {
                  yPercent: motion.titleExitY,
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
                  y: motion.copyExitY,
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
                  xPercent: direction * -motion.statementShift,
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
                  skewX: direction * motion.titleSkew,
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
                  y: motion.copyEnterY,
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
                  xPercent: direction * motion.statementShift,
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
                    (bladeIndex % 2 === 0 ? motion.bladeShiftBase + bladeIndex * motion.bladeShiftStep : motion.bladeShiftAlt),
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
                  rotate: direction * motion.coreRotate,
                  scale: index === 2 ? motion.coreFinalScale : (desktop ? 0.88 : tablet ? 0.92 : 0.95),
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
                  xPercent: direction * (index === 2 ? -motion.ghostShift : motion.ghostShift * 0.8),
                  skewX: direction * -6,
                  duration: 0.68,
                },
                label
              );
            }

            fieldTimeline.to({}, { duration: motion.phaseHold });
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
            {
              scale:
                window.innerWidth >= 1024
                  ? 1.16
                  : window.innerWidth >= 768
                    ? 1.11
                    : 1.07,
            },
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
            {
              y:
                window.innerWidth >= 1024
                  ? 48
                  : window.innerWidth >= 768
                    ? 38
                    : 28,
              opacity: 0,
            },
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
        {
          y:
            window.innerWidth >= 1024
              ? 50
              : window.innerWidth >= 768
                ? 38
                : 28,
          opacity: 0,
        },
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

      if (window.scrollY <= 2 && hero) {
        const lens = hero.querySelector("[data-about-lens]");
        const lensInner = hero.querySelector("[data-about-lens-inner]");
        const lensGhost = hero.querySelector("[data-about-lens-ghost]");
        const lensSlices = hero.querySelectorAll("[data-about-lens-slice]");

        if (lens) gsap.set(lens, { x: 0, y: 0 });
        if (lensInner) gsap.set(lensInner, { rotationX: 0, rotationY: 0 });
        if (lensGhost) gsap.set(lensGhost, { x: 0, y: 0, rotationZ: 0 });
        if (lensSlices.length) {
          gsap.set(lensSlices, {
            x: 0,
            y: 0,
            filter: "drop-shadow(0 0 0 rgba(0,0,0,0))",
          });
        }
      }
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

      if (heroPointerMoveHandler) {
        hero.removeEventListener("pointermove", heroPointerMoveHandler);
      }

      if (heroPointerLeaveHandler) {
        hero.removeEventListener("pointerleave", heroPointerLeaveHandler);
      }

      // Eliminano soltanto animazioni, timeline e pin creati da questa pagina.
      mm.revert();
      ctx.revert();
    };
  }, []);

  /*
   * RESPONSIVE REFRESH
   * Riallinea pin e trigger quando cambiano:
   * - larghezza/altezza viewport
   * - orientamento
   * - barra browser mobile
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

      window.removeEventListener(
        "resize",
        refreshResponsiveAnimations
      );

      window.removeEventListener(
        "orientationchange",
        refreshResponsiveAnimations
      );

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
        className="oxo-about-avant relative overflow-x-hidden bg-[#030303] text-white"
      >
        <style>{`
          /* AVANT LEGATO SAFE:
             cambia solo la famiglia, senza alterare box o layout */
          .oxo-about-avant,
          .oxo-about-avant * {
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
            display: revert;
            transform: none;
            text-transform: inherit;
          }

          h1.avant-legato-font,
          h2.avant-legato-font,
          h3.avant-legato-font {
            font-stretch: expanded;
            transform: scaleX(.96);
            transform-origin: left center;
          }

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


          @keyframes oxoAboutLensIdle {
            0%, 100% { transform: rotate(-3deg) scale(.985); }
            50% { transform: rotate(3deg) scale(1.025); }
          }

          @keyframes oxoAboutLensDash {
            to { stroke-dashoffset: -120; }
          }

          .oxo-about-hero-lens {
            position: absolute;
            left: 63%;
            top: 50%;
            width: min(46vw, 720px);
            height: min(46vw, 720px);
            transform: translate(-50%, -50%);
            border-radius: 999px;
            pointer-events: none;
            z-index: 4;
            will-change: transform, opacity, filter;
            perspective: 1200px;
          }

          .oxo-about-hero-lens::before {
            content: "";
            position: absolute;
            inset: -12%;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,.055);
            box-shadow:
              0 0 0 3.5vw rgba(255,255,255,.008),
              0 0 0 7vw rgba(255,255,255,.004);
          }

          .oxo-about-hero-lens-inner {
            position: absolute;
            inset: 0;
            border-radius: inherit;
            border: 1px solid rgba(53,216,255,.28);
            background:
              radial-gradient(circle at 42% 40%, rgba(53,216,255,.08), transparent 28%),
              radial-gradient(circle at 64% 62%, rgba(139,92,246,.07), transparent 30%),
              rgba(0,0,0,.18);
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,.035),
              inset 0 0 90px rgba(53,216,255,.025),
              0 0 80px rgba(53,216,255,.045);
            backdrop-filter: blur(2px);
            transform-style: preserve-3d;
            overflow: hidden;
          }

          .oxo-about-hero-lens-ring {
            position: absolute;
            inset: 11%;
            border-radius: inherit;
            border: 1px dashed rgba(255,255,255,.12);
            will-change: transform;
          }

          .oxo-about-hero-lens-ring::before,
          .oxo-about-hero-lens-ring::after {
            content: "";
            position: absolute;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,.06);
          }

          .oxo-about-hero-lens-ring::before { inset: 14%; }
          .oxo-about-hero-lens-ring::after { inset: 31%; }

          .oxo-about-hero-lens-axis-x,
          .oxo-about-hero-lens-axis-y {
            position: absolute;
            left: 50%;
            top: 50%;
            pointer-events: none;
          }

          .oxo-about-hero-lens-axis-x {
            width: 118%;
            height: 1px;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.28),
                rgba(255,255,255,.16),
                rgba(255,79,216,.24),
                transparent
              );
          }

          .oxo-about-hero-lens-axis-y {
            width: 1px;
            height: 118%;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                180deg,
                transparent,
                rgba(139,92,246,.2),
                rgba(255,255,255,.14),
                rgba(53,216,255,.24),
                transparent
              );
          }

          .oxo-about-hero-lens-ghost {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
            font-size: clamp(3.8rem, 8vw, 8rem);
            line-height: .72;
            letter-spacing: -.07em;
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,.22);
            opacity: .58;
            will-change: transform;
          }

          .oxo-about-hero-lens-node {
            position: absolute;
            width: 9px;
            height: 9px;
            border: 1px solid rgba(255,255,255,.62);
            background: #020203;
          }

          .oxo-about-hero-lens-node--cyan {
            border-color: #35d8ff;
            box-shadow: 0 0 15px rgba(53,216,255,.18);
          }

          .oxo-about-hero-lens-node--pink {
            border-color: #ff4fd8;
            box-shadow: 0 0 15px rgba(255,79,216,.16);
          }


          .oxo-about-lens-aperture {
            position: absolute;
            inset: 4%;
            border-radius: 999px;
            pointer-events: none;
            opacity: .68;
            background:
              conic-gradient(
                from 0deg,
                transparent 0 7deg,
                rgba(53,216,255,.18) 8deg 10deg,
                transparent 11deg 42deg,
                rgba(255,255,255,.10) 43deg 44deg,
                transparent 45deg 88deg,
                rgba(139,92,246,.16) 89deg 92deg,
                transparent 93deg 134deg,
                rgba(255,79,216,.14) 135deg 138deg,
                transparent 139deg 178deg,
                rgba(53,216,255,.15) 179deg 182deg,
                transparent 183deg 226deg,
                rgba(255,255,255,.08) 227deg 229deg,
                transparent 230deg 270deg,
                rgba(139,92,246,.14) 271deg 274deg,
                transparent 275deg 318deg,
                rgba(255,79,216,.13) 319deg 322deg,
                transparent 323deg 360deg
              );
            -webkit-mask:
              radial-gradient(
                circle,
                transparent 0 66%,
                black 67% 69%,
                transparent 70%
              );
            mask:
              radial-gradient(
                circle,
                transparent 0 66%,
                black 67% 69%,
                transparent 70%
              );
            will-change: transform, opacity;
          }

          .oxo-about-lens-slices {
            position: absolute;
            inset: 0;
            overflow: hidden;
            border-radius: inherit;
            pointer-events: none;
          }

          .oxo-about-lens-slice {
            position: absolute;
            left: 4%;
            right: 4%;
            overflow: hidden;
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,.34);
            font-size: clamp(3.8rem, 8vw, 8rem);
            line-height: .72;
            letter-spacing: -.07em;
            text-transform: uppercase;
            white-space: nowrap;
            will-change: transform, opacity, filter;
          }

          .oxo-about-lens-slice span {
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
          }

          .oxo-about-lens-slice--top {
            top: 25%;
            height: 16%;
            border-top: 1px solid rgba(53,216,255,.08);
          }

          .oxo-about-lens-slice--top span {
            top: -156%;
          }

          .oxo-about-lens-slice--middle {
            top: 43%;
            height: 18%;
            -webkit-text-stroke-color: rgba(139,92,246,.58);
            background: rgba(139,92,246,.015);
            border-top: 1px solid rgba(139,92,246,.10);
            border-bottom: 1px solid rgba(139,92,246,.08);
          }

          .oxo-about-lens-slice--middle span {
            top: -96%;
          }

          .oxo-about-lens-slice--bottom {
            top: 64%;
            height: 15%;
            -webkit-text-stroke-color: rgba(53,216,255,.38);
          }

          .oxo-about-lens-slice--bottom span {
            top: -246%;
          }

          .oxo-about-hero-lens::after {
            content: "";
            position: absolute;
            inset: 19%;
            border-radius: inherit;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,.045);
            box-shadow:
              inset 0 0 36px rgba(53,216,255,.018),
              0 0 36px rgba(139,92,246,.015);
          }

          .oxo-about-lens-readout {
            position: absolute;
            z-index: 8;
            font-size: 6px;
            letter-spacing: .34em;
            text-transform: uppercase;
            color: rgba(255,255,255,.28);
            pointer-events: none;
          }

          .oxo-about-lens-ticks {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 108%;
            height: 108%;
            transform: translate(-50%, -50%);
            border-radius: 999px;
            pointer-events: none;
          }

          .oxo-about-lens-tick {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 1px;
            height: 8px;
            background: rgba(255,255,255,.24);
            transform-origin: 50% calc(50% + min(23vw, 360px));
          }

          .oxo-about-hero-sweep {
            position: absolute;
            left: -20%;
            top: 38%;
            width: 140%;
            height: 1px;
            z-index: 3;
            pointer-events: none;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.12),
                rgba(255,255,255,.55),
                rgba(255,79,216,.28),
                transparent
              );
            box-shadow: 0 0 18px rgba(53,216,255,.12);
          }

          .oxo-about-hero-signal {
            position: absolute;
            left: 4vw;
            bottom: 24%;
            width: min(28vw, 420px);
            height: 1px;
            pointer-events: none;
            background:
              linear-gradient(
                90deg,
                #35d8ff,
                rgba(139,92,246,.62),
                transparent
              );
            box-shadow: 0 0 20px rgba(53,216,255,.14);
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
          .oxo-team-card {
            transition:
              border-radius .7s cubic-bezier(.16,1,.3,1),
              border-color .5s ease,
              box-shadow .7s cubic-bezier(.16,1,.3,1);
          }

          .oxo-team-card:hover {
            border-radius: 82px;
            border-color: rgba(255,255,255,.30);
            box-shadow:
              0 30px 90px rgba(0,0,0,.34),
              inset 0 0 70px rgba(255,255,255,.02);
          }

          .oxo-team-card:hover .oxo-team-image {
            transform: scale(1.055);
            filter: saturate(1.14) contrast(1.05);
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


          /* ==========================================
             RESPONSIVE ANIMATION SAFETY
             Nessun redesign: solo stabilità GPU/viewport.
             ========================================== */

          @media (max-width: 1023px) {
            .oxo-about-avant {
              overflow-x: clip;
            }

            .oxo-about-grid {
              background-size: 54px 54px;
            }

            .oxo-flow-glow {
              filter: blur(68px);
            }

            [data-field-core],
            [data-field-core-inner],
            [data-field-core-matteo],
            [data-field-core-gabriele],
            [data-field-phase],
            [data-team-card],
            [data-team-media],
            [data-team-content],
            [data-process-row],
            [data-final-letter] {
              backface-visibility: hidden;
              transform-style: preserve-3d;
            }
          }

          @media (max-width: 767px) {
            .oxo-about-hero-lens {
              left: 68%;
              top: 47%;
              width: 76vw;
              height: 76vw;
            }

            .oxo-about-hero-lens-ghost {
              font-size: 15vw;
            }

            .oxo-about-lens-slice {
              font-size: 15vw;
            }

            .oxo-about-lens-readout {
              font-size: 5px;
              letter-spacing: .22em;
            }

            .oxo-about-hero-signal {
              left: 6vw;
              bottom: 27%;
              width: 42vw;
            }

            .oxo-about-grid {
              background-size: 44px 44px;
            }

            .oxo-flow-glow {
              filter: blur(52px);
            }

            .oxo-field-grid {
              background-size: 52px 52px;
            }

            .oxo-field-node {
              will-change: transform, opacity;
            }

            .oxo-field-blade {
              will-change: transform, background-color;
            }

            [data-field-core] {
              min-width: 220px;
              min-height: 220px;
            }

            .oxo-team-card {
              min-height: max(620px, 72svh);
            }
          }

          @media (max-width: 479px) {
            .oxo-about-grid {
              background-size: 38px 38px;
            }

            .oxo-field-grid {
              background-size: 44px 44px;
            }

            .oxo-flow-glow {
              filter: blur(42px);
            }

            [data-field-core] {
              min-width: 200px;
              min-height: 200px;
            }
          }

          @media (hover: none) and (pointer: coarse) {
            .oxo-team-card:hover {
              border-radius: 34px;
              border-color: rgba(255,255,255,.20);
              box-shadow: none;
            }

            .oxo-team-card:hover .oxo-team-image {
              transform: none;
              filter: none;
            }

            .oxo-process-row:hover .oxo-process-title,
            .oxo-process-row:hover .oxo-process-arrow {
              transform: none;
            }

            .oxo-field-node:hover {
              transform: none;
              filter: none;
            }
          }


        `}</style>

        <section
          ref={heroRef}
          className="oxo-flow-safe oxo-flow-hero-safe oxo-about-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
        >
          <div className="oxo-about-grid pointer-events-none absolute inset-0" />

          {/* AWWWARDS / IDENTITY SCANNER */}
          <div
            data-about-lens
            aria-hidden="true"
            className="oxo-about-hero-lens"
          >
            <div
              data-about-lens-inner
              className="oxo-about-hero-lens-inner"
            >
              <div
                data-about-lens-aperture
                className="oxo-about-lens-aperture"
              />

              <div
                data-about-lens-ring
                className="oxo-about-hero-lens-ring"
              />

              <span className="oxo-about-hero-lens-axis-x" />
              <span className="oxo-about-hero-lens-axis-y" />

              <div className="oxo-about-lens-slices">
                <div
                  data-about-lens-slice
                  className="oxo-about-lens-slice oxo-about-lens-slice--top avant-legato-font ombra2"
                >
                  <span>CHI SIAMO</span>
                </div>

                <div
                  data-about-lens-slice
                  className="oxo-about-lens-slice oxo-about-lens-slice--middle avant-legato-font ombra2"
                >
                  <span>CHI SIAMO</span>
                </div>

                <div
                  data-about-lens-slice
                  className="oxo-about-lens-slice oxo-about-lens-slice--bottom avant-legato-font ombra2"
                >
                  <span>CHI SIAMO</span>
                </div>
              </div>

              <p
                data-about-lens-ghost
                className="oxo-about-hero-lens-ghost avant-legato-font ombra2"
              >
                CHI SIAMO
              </p>

              <span
                data-about-lens-node
                className="oxo-about-hero-lens-node oxo-about-hero-lens-node--cyan left-1/2 top-[5%] -translate-x-1/2"
              />
              <span
                data-about-lens-node
                className="oxo-about-hero-lens-node oxo-about-hero-lens-node--pink left-1/2 bottom-[5%] -translate-x-1/2"
              />
              <span
                data-about-lens-node
                className="oxo-about-hero-lens-node left-[5%] top-1/2 -translate-y-1/2"
              />
              <span
                data-about-lens-node
                className="oxo-about-hero-lens-node right-[5%] top-1/2 -translate-y-1/2"
              />
              <span
                data-about-lens-node
                className="oxo-about-hero-lens-node left-[20%] top-[20%]"
              />
              <span
                data-about-lens-node
                className="oxo-about-hero-lens-node right-[20%] bottom-[20%]"
              />

              <span className="oxo-about-lens-readout left-[15%] top-[13%]">
                ID / 001
              </span>
              <span className="oxo-about-lens-readout right-[13%] top-[24%] text-right">
                HUMAN
                <br />
                SYSTEM
              </span>
              <span className="oxo-about-lens-readout bottom-[14%] left-[17%]">
                OXO / FIELD
              </span>
            </div>
          </div>

          <div
            data-about-hero-sweep
            aria-hidden="true"
            className="oxo-about-hero-sweep"
          />

          <div
            data-about-hero-signal
            aria-hidden="true"
            className="oxo-about-hero-signal"
          />

          <div
            data-hero-orb
            aria-hidden="true"
            className="pointer-events-none absolute -right-[15vw] top-[6vh] h-[55vw] w-[55vw] rounded-full blur-[80px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.16) 0%, rgba(139,92,246,.10) 36%, rgba(255,79,216,.05) 52%, transparent 72%)",
              animation: "oxoAboutFloat 11s ease-in-out infinite",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-8%] top-[48%] h-px w-[116%] -rotate-[7deg] bg-gradient-to-r from-transparent via-cyan-300/35 to-violet-500/10"
            style={{ animation: "oxoAboutPulse 4s ease-in-out infinite" }}
          />

          <div className="relative z-10 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:text-[11px]">
            <p data-about-meta>
              OXO STUDIO®
              <br />
              INDEPENDENT DIGITAL STUDIO
            </p>

            <p data-about-meta className="text-right">
              PEOPLE / PROCESS / SYSTEM
              <br />
              LA SPEZIA / ITALY
            </p>
          </div>

          <div data-hero-title className="relative z-10 my-auto py-14">
            <p
              data-about-meta
              className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.36em] text-cyan-300 md:text-xs"
            >
              Independent digital studio
            </p>

            <h1 className="avant-legato-font ombra2 relative z-10 overflow-hidden text-[17.5vw] uppercase leading-[0.69] tracking-[-0.075em] md:text-[12.5vw] lg:text-[12.2vw]">
              <SplitLetters text="CHI SIAMO" />
            </h1>

            <div className="mt-4 flex items-center gap-4 text-[8px] uppercase tracking-[0.32em] text-white/32 md:text-[10px]">
              <span className="h-2 w-2 border border-cyan-300" />
              <span>IDENTITY / MOTION / TECHNOLOGY</span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p
              data-about-meta
              className="avant-legato-font max-w-[870px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.35rem]"
            >
              Un piccolo studio con una convinzione enorme: tecnologia e
              creatività funzionano davvero soltanto quando diventano la stessa
              cosa.
            </p>

            <p
              data-about-meta
              className="avant-legato-font shrink-0 text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
            >
              Scroll / Enter the system ↓
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
            className="oxo-field-outline avant-legato-font pointer-events-none absolute left-[-4vw] top-1/2 -translate-y-1/2 whitespace-nowrap text-[16.5vw] uppercase leading-none tracking-[-0.09em] opacity-55"
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
            className="pointer-events-none absolute left-1/2 top-1/2 z-[4] h-[34vw] w-[34vw] min-h-[260px] min-w-[260px] max-h-[560px] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-white/15 bg-black"
          >
            {/* SLIDE 01 — MATTEO */}
            <img
              data-field-core-matteo
              src="/img/team/matteo.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* SLIDE 02+ — GABRIELE, stessa identica posizione */}
            <img
              data-field-core-gabriele
              src="/img/team/gab2.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-center"
            />

            {/* overlay tecnico comune alle due foto */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.06] via-transparent to-fuchsia-500/[0.08]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/48 via-transparent to-black/12" />

            {/* il vecchio inner resta come HUD, non contiene più una seconda foto */}
            <div
              data-field-core-inner
              className="absolute inset-[18%] border border-white/20"
            >
              <div className="absolute left-1/2 top-[-18%] h-[136%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/25 to-transparent" />
              <div className="absolute left-[-18%] top-1/2 h-px w-[136%] -translate-y-1/2 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
            </div>

            <div className="oxo-field-flicker absolute left-3 top-3 z-20 h-2 w-2 bg-cyan-300 shadow-[0_0_18px_rgba(53,216,255,.95)]" />
            <div className="oxo-field-flicker absolute bottom-3 right-3 z-20 h-2 w-2 bg-fuchsia-400 shadow-[0_0_18px_rgba(255,79,216,.95)]" />
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
                        className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.36em] md:text-xs"
                        style={{ color: phase.accent }}
                      >
                        {phase.id} / {phase.eyebrow}
                      </p>

                      <div className="overflow-hidden pb-[2vw]">
                        <h2
                          data-field-title
                          className="avant-legato-font ombra2 text-[17.5vw] uppercase leading-[0.67] tracking-[-0.085em] md:text-[12.5vw] lg:text-[8.8vw]"
                        >
                          {phase.title}
                        </h2>
                      </div>

                      <p
                        data-field-copy
                        className="avant-legato-font mt-5 max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl"
                      >
                        {phase.copy}
                      </p>
                    </div>

                    <p
                      data-field-statement
                      aria-hidden="true"
                      className="oxo-field-outline avant-legato-font hidden text-right text-[5.8vw] uppercase leading-[0.8] tracking-[-0.055em] lg:block"
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
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.34em] text-violet-400 md:text-xs">
                The people behind Oxo
              </p>
              <h2 className="avant-legato-font ombra2 text-[15vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[10vw] lg:text-[7.5vw]">
                IL TEAM
              </h2>
            </div>

            <p className="avant-legato-font max-w-[620px] text-lg leading-snug text-gray-300 md:text-2xl">
              Competenze diverse, una sola direzione: costruire esperienze in
              cui ogni scelta visiva abbia una ragione tecnica e ogni scelta
              tecnica migliori l'esperienza.
            </p>
          </div>

          <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-2 lg:gap-[2vw]">
            {TEAM.map((member, index) => (
              <article
                key={member.id}
                data-team-card
                role={member.link ? "link" : undefined}
                tabIndex={member.link ? 0 : undefined}
                aria-label={member.link ? `Apri la pagina di ${member.name}` : undefined}
                onClick={() => {
                  if (member.link) navigate(member.link);
                }}
                onKeyDown={(event) => {
                  if (
                    member.link &&
                    (event.key === "Enter" || event.key === " ")
                  ) {
                    event.preventDefault();
                    navigate(member.link);
                  }
                }}
                className={`oxo-team-card group relative h-[72svh] min-h-[72svh] overflow-hidden rounded-[34px] border border-white/20 md:rounded-[46px] lg:rounded-[62px] ${
                  index % 2 === 1 ? "lg:translate-y-[18vh]" : ""
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
                  className="avant-legato-font pointer-events-none absolute right-[-1vw] top-[-3vw] text-[16.5vw] leading-none tracking-[-0.08em] text-white/[0.055]"
                >
                  {member.initials}
                </p>

                <div className="absolute inset-[14px] rounded-[24px] border border-white/25 md:inset-[22px] md:rounded-[34px] lg:rounded-[48px]" />

                <div className="absolute left-7 top-7 z-10 flex items-center gap-3 md:left-10 md:top-10">
                  <span className="avant-legato-font text-[10px] uppercase tracking-[0.28em]">
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
                    className="avant-legato-font mb-3 text-[10px] uppercase tracking-[0.32em] md:text-xs"
                    style={{ color: member.accent }}
                  >
                    {member.role}
                  </p>

                  <h3 className="avant-legato-font ombra2 text-[clamp(2.8rem,6.3vw,6.4rem)] uppercase leading-[0.78] tracking-[-0.055em]">
                    {member.name}
                  </h3>

                  <p className="avant-legato-font mt-5 max-w-[610px] text-base leading-snug text-gray-200 md:text-xl lg:text-2xl">
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
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.34em] text-cyan-300 md:text-xs">
                Il nostro metodo
              </p>

              <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[0.76] tracking-[-0.065em] md:text-[9.2vw] lg:sticky lg:top-[12vh] lg:text-[6.2vw]">
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
                  <span className="avant-legato-font self-start pt-2 text-[10px] tracking-[0.28em] text-gray-500 md:text-xs">
                    {step.id}
                  </span>

                  <div>
                    <h3 className="oxo-process-title avant-legato-font text-[10vw] uppercase leading-[0.8] tracking-[-0.055em] transition-transform duration-500 ease-out md:text-[5.8vw] lg:text-[4.8vw]">
                      {step.title}
                    </h3>
                    <p className="avant-legato-font mt-4 max-w-[640px] text-base leading-snug text-gray-400 md:text-xl">
                      {step.copy}
                    </p>
                  </div>

                  <span className="oxo-process-arrow avant-legato-font text-2xl transition-transform duration-500 ease-out md:text-4xl">
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

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[16.5vw] uppercase leading-[0.72] tracking-[-0.075em] md:text-[14vw] lg:text-[11.8vw]">
              <SplitLetters text="PARLIAMONE" attribute="data-final-letter" />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="avant-legato-font max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl">
                Hai un prodotto da costruire, un processo da rendere più
                intelligente o un mondo da mettere in movimento?
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