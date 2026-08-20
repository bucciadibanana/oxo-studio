import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";
import "../styles/avant-legato.css";


gsap.registerPlugin(ScrollTrigger);

const CONTACT_EMAIL = "matteo.poli@oxostudio.it";

const PROJECT_TYPES = [
  "Software su misura",
  "Sito o piattaforma web",
  "Intelligenza artificiale",
  "Videogame o esperienza interattiva",
  "Identità e direzione digitale",
  "Altro",
];

const BUDGETS = [
  "Da definire",
  "Fino a €5.000",
  "€5.000 – €15.000",
  "€15.000 – €30.000",
  "Oltre €30.000",
];

const CONTACT_BLOCKS = [
  {
    id: "01",
    label: "EMAIL",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
    accent: "#35d8ff",
  },
  {
    id: "02",
    label: "STUDIO",
    value: "LA SPEZIA / ITALY",
    href: null,
    accent: "#8b5cf6",
  },
  {
    id: "03",
    label: "PROJECTS",
    value: "SOFTWARE / AI / WEB / GAME",
    href: null,
    accent: "#20f0c7",
  },
];

function SplitLetters({ text, attribute = "data-contact-letter" }) {
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

export default function Contatti() {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const formSectionRef = useRef(null);
  const informationRef = useRef(null);
  const finalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: PROJECT_TYPES[0],
    budget: BUDGETS[0],
    message: "",
  });

  const [formError, setFormError] = useState("");

  useLayoutEffect(() => {
    const page = pageRef.current;
    const hero = heroRef.current;
    const formSection = formSectionRef.current;
    const information = informationRef.current;
    const finalSection = finalRef.current;

    if (!page || !hero || !formSection || !information || !finalSection) {
      return undefined;
    }

    let heroPointerMoveHandler = null;
    let heroPointerLeaveHandler = null;

    const ctx = gsap.context(() => {
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-contact-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-contact-meta]")
      );

      const heroTitle = hero.querySelector("[data-contact-title]");
      const heroOutline = hero.querySelector("[data-contact-outline]");
      const heroRibbon = hero.querySelector("[data-contact-ribbon]");
      const heroSweep = hero.querySelector("[data-contact-sweep]");
      const heroSlice = hero.querySelector("[data-contact-slice]");
      const heroSliceInner = hero.querySelector("[data-contact-slice-inner]");
      const heroVeil = hero.querySelector("[data-contact-veil]");
      const heroSplitLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-contact-split-letter]")
      );

      gsap.fromTo(
        heroLetters,
        { yPercent: 130, rotateX: -82, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.25,
          stagger: 0.024,
          ease: "power4.out",
          delay: 0.08,
        }
      );

      gsap.fromTo(
        heroMeta,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.55,
        }
      );


      if (heroOutline) {
        gsap.fromTo(heroOutline,
          { xPercent: 10, opacity: 0, filter: "blur(10px)" },
          { xPercent: 0, opacity: 0.32, filter: "blur(0px)", duration: 1.35, delay: 0.28, ease: "power4.out" }
        );

        gsap.to(heroOutline, {
          xPercent: -13,
          yPercent: 6,
          skewX: -4,
          opacity: 0.07,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
        });
      }

      if (heroRibbon) {
        gsap.fromTo(heroRibbon,
          { scaleX: 0.58, scaleY: 0.76, rotate: -9, opacity: 0, filter: "blur(18px)" },
          { scaleX: 1, scaleY: 1, rotate: 0, opacity: 0.82, filter: "blur(0px)", duration: 1.5, delay: 0.18, ease: "power4.out" }
        );

        gsap.to(heroRibbon, {
          scaleX: 1.34,
          scaleY: 0.5,
          rotate: 6,
          xPercent: 15,
          yPercent: 10,
          opacity: 0.16,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1.05 },
        });
      }

      if (heroSweep) {
        gsap.fromTo(heroSweep,
          { xPercent: -135, opacity: 0 },
          { xPercent: 135, opacity: 0.88, duration: 1.7, delay: 0.46, ease: "power3.inOut" }
        );

        gsap.to(heroSweep, {
          yPercent: 44,
          rotate: -4,
          opacity: 0.08,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
        });
      }

      if (heroSlice) {
        gsap.fromTo(
          heroSlice,
          { xPercent: -18, opacity: 0, clipPath: "inset(0 100% 0 0)" },
          {
            xPercent: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 1.1,
            delay: 0.5,
            ease: "power4.inOut",
          }
        );

        gsap.to(heroSlice, {
          xPercent: 20,
          yPercent: -10,
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

      if (heroSliceInner) {
        gsap.fromTo(
          heroSliceInner,
          { xPercent: 8 },
          { xPercent: 0, duration: 1.1, delay: 0.5, ease: "power4.out" }
        );
      }

      if (heroVeil) {
        gsap.fromTo(
          heroVeil,
          { xPercent: -120, opacity: 0 },
          {
            xPercent: 120,
            opacity: 0.7,
            duration: 1.9,
            delay: 0.34,
            ease: "power3.inOut",
          }
        );

        gsap.to(heroVeil, {
          xPercent: 165,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      heroSplitLetters.forEach((letter, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const distance = 8 + (index % 4) * 4;

        gsap.to(letter, {
          xPercent: direction * distance,
          yPercent: index % 3 === 0 ? -10 : 7,
          rotateZ: direction * (1.2 + (index % 3) * 0.55),
          rotateX: index % 2 === 0 ? -4 : 3,
          scaleY: index % 2 === 0 ? 1.035 : 0.975,
          opacity: index % 2 === 0 ? 0.78 : 0.64,
          transformPerspective: 1200,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
        });
      });

      if (heroTitle) {
        gsap.to(heroTitle, {
          yPercent: 17,
          scale: 0.94,
          opacity: 0.34,
          ease: "none",
          scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: 1 },
        });
      }

      if (heroRibbon && heroOutline && !window.matchMedia("(pointer: coarse)").matches) {
        const ribbonX = gsap.quickTo(heroRibbon, "x", { duration: 0.8, ease: "power3.out" });
        const ribbonY = gsap.quickTo(heroRibbon, "y", { duration: 0.8, ease: "power3.out" });
        const outlineX = gsap.quickTo(heroOutline, "x", { duration: 0.58, ease: "power3.out" });
        const outlineY = gsap.quickTo(heroOutline, "y", { duration: 0.58, ease: "power3.out" });

        heroPointerMoveHandler = (event) => {
          const rect = hero.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;

          ribbonX(nx * 22);
          ribbonY(ny * 14);
          outlineX(nx * -26);
          outlineY(ny * -14);
        };

        heroPointerLeaveHandler = () => {
          gsap.to(heroRibbon, { x: 0, y: 0, duration: 0.8, ease: "power3.out", overwrite: true });
          gsap.to(heroOutline, { x: 0, y: 0, duration: 0.7, ease: "power3.out", overwrite: true });
        };

        hero.addEventListener("pointermove", heroPointerMoveHandler, { passive: true });
        hero.addEventListener("pointerleave", heroPointerLeaveHandler);
      }

      ScrollTrigger.create({
        trigger: hero,
        start: "top top",
        end: "bottom top",
        onUpdate: (self) => {
          if (self.progress <= 0.002) {
            if (heroRibbon) gsap.set(heroRibbon, { x: 0, y: 0 });
            if (heroOutline) gsap.set(heroOutline, { x: 0, y: 0 });
          }
        },
      });

      const formRows = gsap.utils.toArray(
        formSection.querySelectorAll("[data-contact-form-row]")
      );

      gsap.fromTo(
        formRows,
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.82,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formSection,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      const formPanel = formSection.querySelector("[data-contact-form-panel]");
      const sidePanel = formSection.querySelector("[data-contact-side-panel]");

      if (formPanel) {
        gsap.fromTo(
          formPanel,
          { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.15,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: formSection,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      if (sidePanel) {
        gsap.fromTo(
          sidePanel,
          { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" },
          {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            duration: 1.15,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: formSection,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      const infoCards = gsap.utils.toArray(
        information.querySelectorAll("[data-contact-card]")
      );

      infoCards.forEach((card, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.fromTo(
          card,
          { x: direction * 100, y: 30, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.82,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const track = information.querySelector("[data-contact-track]");
      if (track) {
        gsap.to(track, {
          xPercent: -38,
          ease: "none",
          scrollTrigger: {
            trigger: information,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      const finalLetters = gsap.utils.toArray(
        finalSection.querySelectorAll("[data-contact-final-letter]")
      );

      gsap.fromTo(
        finalLetters,
        { yPercent: 125, rotateX: -78, opacity: 0 },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.1,
          stagger: 0.024,
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

      if (heroPointerMoveHandler) {
        hero.removeEventListener("pointermove", heroPointerMoveHandler);
      }
      if (heroPointerLeaveHandler) {
        hero.removeEventListener("pointerleave", heroPointerLeaveHandler);
      }

      ctx.revert();
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setFormError("Compila nome, email e descrizione del progetto.");
      return;
    }

    const subject = encodeURIComponent(
      `Nuovo progetto Oxo Studio — ${formData.projectType}`
    );

    const body = encodeURIComponent(
      [
        `Nome: ${name}`,
        `Email: ${email}`,
        `Azienda: ${formData.company.trim() || "Non indicata"}`,
        `Tipo di progetto: ${formData.projectType}`,
        `Budget: ${formData.budget}`,
        "",
        "Descrizione:",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <SeoMetaTags />

      <main
        ref={pageRef}
        className="oxo-contact-avant relative overflow-x-hidden bg-[#030303] text-white"
      >
        <style>{`
          /* AVANT LEGATO SAFE */
          .oxo-contact-avant,
          .oxo-contact-avant * {
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

          @keyframes oxoContactPulse {
            0%, 100% { opacity: .22; transform: scaleX(.7); }
            50% { opacity: .95; transform: scaleX(1); }
          }

          @keyframes oxoContactOrbit {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(-10deg) scale(1.05); }
          }

          .oxo-contact-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px);
            background-size: 64px 64px;
            mask-image: linear-gradient(to bottom, transparent, black 12%, black 88%, transparent);
          }

          @keyframes oxoContactRibbonBreath {
            0%, 100% { transform: translate(-50%, -50%) rotate(-4deg) scaleX(.985) scaleY(1); }
            50% { transform: translate(-50%, -50%) rotate(-1deg) scaleX(1.03) scaleY(1.06); }
          }

          .oxo-contact-ribbon {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(72vw, 1120px);
            height: min(20vw, 310px);
            transform: translate(-50%, -50%) rotate(-4deg);
            border-radius: 50%;
            pointer-events: none;
            z-index: 3;
            background:
              linear-gradient(
                90deg,
                transparent 0%,
                rgba(53,216,255,.08) 18%,
                rgba(255,255,255,.08) 42%,
                rgba(139,92,246,.10) 64%,
                rgba(255,79,216,.07) 82%,
                transparent 100%
              );
            border: 1px solid rgba(255,255,255,.07);
            box-shadow:
              0 0 0 5vw rgba(255,255,255,.003),
              0 0 70px rgba(139,92,246,.035);
            will-change: transform, opacity, filter;
            animation: oxoContactRibbonBreath 7.5s ease-in-out infinite;
          }

          .oxo-contact-ribbon::before,
          .oxo-contact-ribbon::after {
            content: "";
            position: absolute;
            inset: 12%;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,.045);
          }

          .oxo-contact-ribbon::after {
            inset: 30%;
            border-color: rgba(53,216,255,.06);
          }

          .oxo-contact-outline {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 4;
            transform: translate(-50%, -50%);
            white-space: nowrap;
            font-size: clamp(5rem, 13vw, 13rem);
            line-height: .68;
            letter-spacing: -.08em;
            text-transform: uppercase;
            color: transparent;
            -webkit-text-stroke: 1px rgba(139,92,246,.35);
            pointer-events: none;
            will-change: transform, opacity, filter;
          }

          .oxo-contact-slice {
            position: absolute;
            left: 7vw;
            right: 7vw;
            top: 45%;
            height: 15vw;
            max-height: 210px;
            z-index: 5;
            overflow: hidden;
            pointer-events: none;
            border-top: 1px solid rgba(255,255,255,.055);
            border-bottom: 1px solid rgba(255,255,255,.04);
            background: rgba(255,255,255,.008);
            backdrop-filter: blur(1px);
            will-change: transform, opacity, clip-path;
          }

          .oxo-contact-slice-inner {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            white-space: nowrap;
            font-size: clamp(5rem, 13vw, 13rem);
            line-height: .68;
            letter-spacing: -.08em;
            text-transform: uppercase;
            color: transparent;
            -webkit-text-stroke: 1px rgba(255,255,255,.30);
            opacity: .7;
            will-change: transform;
          }

          .oxo-contact-veil {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 42%;
            width: 16vw;
            min-width: 120px;
            z-index: 8;
            pointer-events: none;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,.025),
                rgba(255,255,255,.12),
                rgba(139,92,246,.08),
                transparent
              );
            filter: blur(8px);
            mix-blend-mode: screen;
            will-change: transform, opacity;
          }

          .oxo-contact-sweep {
            position: absolute;
            left: -18%;
            top: 42%;
            width: 136%;
            height: 1px;
            z-index: 6;
            pointer-events: none;
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.08),
                rgba(255,255,255,.76),
                rgba(139,92,246,.36),
                rgba(255,79,216,.14),
                transparent
              );
            box-shadow:
              0 0 16px rgba(53,216,255,.14),
              0 0 28px rgba(139,92,246,.07);
            will-change: transform, opacity;
          }

          .oxo-contact-editorial-rule {
            position: absolute;
            pointer-events: none;
            background: rgba(255,255,255,.08);
          }

          .oxo-contact-editorial-rule--v {
            top: 12%;
            bottom: 12%;
            width: 1px;
          }

          .oxo-contact-editorial-rule--h {
            left: 4vw;
            right: 4vw;
            height: 1px;
          }

          .oxo-contact-micro {
            position: absolute;
            z-index: 7;
            font-size: 6px;
            line-height: 1.55;
            letter-spacing: .34em;
            text-transform: uppercase;
            color: rgba(255,255,255,.27);
            pointer-events: none;
          }

          .oxo-contact-noise::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: .055;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode: soft-light;
          }

          .oxo-contact-field:focus-within .oxo-contact-field-line {
            transform: scaleX(1);
            opacity: 1;
          }

          .oxo-contact-card:hover .oxo-contact-card-arrow {
            transform: translate(.55rem, -.35rem) rotate(-45deg);
          }

          @media (max-width: 767px) {
            .oxo-contact-ribbon {
              width: 92vw;
              height: 34vw;
            }

            .oxo-contact-outline {
              font-size: 18vw;
            }

            .oxo-contact-slice {
              left: 4vw;
              right: 4vw;
              top: 46%;
              height: 20vw;
            }

            .oxo-contact-slice-inner {
              font-size: 18vw;
            }

            .oxo-contact-veil {
              width: 26vw;
            }

            .oxo-contact-micro {
              font-size: 5px;
              letter-spacing: .22em;
            }
          }

          @media (min-width: 1024px) {
            .oxo-contact-card[href^="mailto:"] .avant-legato-font.break-words {
              white-space: nowrap;
              font-size: clamp(1rem, 1.7vw, 1.9rem);
              letter-spacing: -0.025em;
            }
          }
        `}</style>

        <section
          ref={heroRef}
          className="oxo-contact-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
        >
          <div className="oxo-contact-grid pointer-events-none absolute inset-0 opacity-55" />

          <div data-contact-ribbon aria-hidden="true" className="oxo-contact-ribbon" />

          <p
            data-contact-outline
            aria-hidden="true"
            className="oxo-contact-outline avant-legato-font ombra2"
          >
            CONTATTI
          </p>

          <div
            data-contact-slice
            aria-hidden="true"
            className="oxo-contact-slice"
          >
            <span
              data-contact-slice-inner
              className="oxo-contact-slice-inner avant-legato-font ombra2"
            >
              CONTATTI
            </span>
          </div>

          <div
            data-contact-veil
            aria-hidden="true"
            className="oxo-contact-veil"
          />

          <div data-contact-sweep aria-hidden="true" className="oxo-contact-sweep" />

          <span className="oxo-contact-editorial-rule oxo-contact-editorial-rule--v left-[4vw]" />
          <span className="oxo-contact-editorial-rule oxo-contact-editorial-rule--v right-[4vw]" />
          <span className="oxo-contact-editorial-rule oxo-contact-editorial-rule--h top-[18vh]" />
          <span className="oxo-contact-editorial-rule oxo-contact-editorial-rule--h bottom-[20vh]" />

          <span className="oxo-contact-micro left-[4vw] top-[14vh]">
            OXO / CONTACT
          </span>

          <span className="oxo-contact-micro right-[4vw] top-[14vh] text-right">
            HUMAN RESPONSE
            <br />
            SELECTED PROJECTS
          </span>

          <div className="relative z-20 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:text-[11px]">
            <p data-contact-meta>
              OXO STUDIO®
              <br />
              START A CONVERSATION
            </p>

            <p data-contact-meta className="text-right">
              LA SPEZIA / ITALY
              <br />
              AVAILABLE / 2026
            </p>
          </div>

          <div data-contact-title className="relative z-20 my-auto py-14">
            <p
              data-contact-meta
              className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.36em] text-violet-400 md:text-xs"
            >
              Start a conversation
            </p>

            <h1
              aria-label="CONTATTI"
              className="avant-legato-font ombra2 overflow-visible text-[17.5vw] uppercase leading-[0.67] tracking-[-0.082em] md:text-[12vw] lg:text-[12.1vw]"
            >
              <span data-contact-split-letter className="inline-block">C</span>
              <span data-contact-split-letter className="inline-block">O</span>
              <span data-contact-split-letter className="inline-block">N</span>
              <span data-contact-split-letter className="inline-block">T</span>
              <span data-contact-split-letter className="inline-block">A</span>
              <span data-contact-split-letter className="inline-block">T</span>
              <span data-contact-split-letter className="inline-block">T</span>
              <span data-contact-split-letter className="inline-block">I</span>
            </h1>

            <div className="mt-5 flex items-center gap-4 text-[8px] uppercase tracking-[0.32em] text-white/28 md:text-[10px]">
              <span className="h-2 w-2 border border-violet-400" />
              <span>WRITE / CONNECT / BUILD</span>
            </div>
          </div>

          <div className="relative z-20 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p
              data-contact-meta
              className="avant-legato-font max-w-[900px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.35rem]"
            >
              Raccontaci cosa deve esistere, cosa non funziona ancora o quale idea
              vuoi trasformare in un prodotto reale.
            </p>

            <p
              data-contact-meta
              className="avant-legato-font shrink-0 text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
            >
              Scroll / Write the brief ↓
            </p>
          </div>
        </section>

        <section
          ref={formSectionRef}
          className="relative overflow-hidden border-y border-white/15 bg-[#050505] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="oxo-contact-grid pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative z-10 mb-14 border-b border-white/20 pb-8 md:mb-20">
            <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.34em] text-cyan-300 md:text-xs">
              Project brief
            </p>
            <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[9.3vw] lg:text-[6.8vw]">
              PARLIAMONE
            </h2>
          </div>

          <div className="relative z-10 grid gap-5 lg:grid-cols-[1.35fr_.65fr] lg:gap-[2vw]">
            <form
              data-contact-form-panel
              onSubmit={handleSubmit}
              className="relative overflow-hidden border border-white/20 bg-black/45 p-7 md:p-10 lg:p-[4vw]"
              noValidate
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-65"
                style={{
                  background:
                    "radial-gradient(circle at 88% 12%, rgba(53,216,255,.16), transparent 34%), linear-gradient(145deg, rgba(255,255,255,.025), transparent)",
                }}
              />

              <div className="relative z-10 grid gap-8 md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3"
                >
                  <span className="avant-legato-font mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    01 / Nome *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="avant-legato-font w-full bg-transparent text-xl text-white outline-none placeholder:text-white/25 md:text-2xl"
                    placeholder="Il tuo nome"
                  />
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-cyan-300 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3"
                >
                  <span className="avant-legato-font mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    02 / Email *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="avant-legato-font w-full bg-transparent text-xl text-white outline-none placeholder:text-white/25 md:text-2xl"
                    placeholder="nome@email.it"
                  />
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-violet-400 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3"
                >
                  <span className="avant-legato-font mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    03 / Azienda
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="avant-legato-font w-full bg-transparent text-xl text-white outline-none placeholder:text-white/25 md:text-2xl"
                    placeholder="Nome azienda"
                  />
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-fuchsia-400 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3"
                >
                  <span className="avant-legato-font mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    04 / Tipo di progetto
                  </span>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="avant-legato-font w-full appearance-none bg-transparent text-xl text-white outline-none md:text-2xl"
                  >
                    {PROJECT_TYPES.map((type) => (
                      <option key={type} value={type} className="bg-black text-white">
                        {type}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute bottom-4 right-0 text-white/55">
                    ↓
                  </span>
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-cyan-300 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3 md:col-span-2"
                >
                  <span className="avant-legato-font mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    05 / Budget indicativo
                  </span>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="avant-legato-font w-full appearance-none bg-transparent text-xl text-white outline-none md:text-2xl"
                  >
                    {BUDGETS.map((budget) => (
                      <option
                        key={budget}
                        value={budget}
                        className="bg-black text-white"
                      >
                        {budget}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute bottom-4 right-0 text-white/55">
                    ↓
                  </span>
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-violet-400 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3 md:col-span-2"
                >
                  <span className="avant-legato-font mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    06 / Il progetto *
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="avant-legato-font w-full resize-none bg-transparent text-xl leading-snug text-white outline-none placeholder:text-white/25 md:text-2xl"
                    placeholder="Descrivi obiettivo, problema, contesto e risultato atteso."
                  />
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-fuchsia-400 opacity-0 transition-all duration-500" />
                </label>
              </div>

              <div
                data-contact-form-row
                className="relative z-10 mt-10 flex flex-col gap-5 border-t border-white/15 pt-7 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="avant-legato-font max-w-[610px] text-sm leading-snug text-gray-500 md:text-base">
                    Il pulsante apre il tuo programma email con il brief già
                    compilato. Nessun dato viene salvato da questa pagina.
                  </p>
                  {formError ? (
                    <p className="avant-legato-font mt-3 text-sm text-fuchsia-400">
                      {formError}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="avant-legato-font group inline-flex w-fit items-center gap-5 border-b border-white pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
                >
                  <span>Apri la richiesta</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </button>
              </div>
            </form>

            <aside
              data-contact-side-panel
              className="relative min-h-[580px] overflow-hidden border border-white/20 bg-black/45 p-7 md:p-10 lg:min-h-full lg:p-[3vw]"
            >
              <div
                className="absolute inset-0 opacity-75"
                style={{
                  background:
                    "radial-gradient(circle at 30% 20%, rgba(139,92,246,.28), transparent 35%), radial-gradient(circle at 82% 78%, rgba(53,216,255,.16), transparent 34%), linear-gradient(145deg, #0b0612, #020202 58%)",
                }}
              />
              <div className="oxo-contact-grid pointer-events-none absolute inset-0 opacity-60" />

              <div className="relative z-10 flex h-full min-h-[500px] flex-col justify-between">
                <div>
                  <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.34em] text-violet-400 md:text-xs">
                    Direct contact
                  </p>
                  <h3 className="avant-legato-font ombra2 text-[12vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[7.5vw] lg:text-[4.7vw]">
                    SCRIVI
                    <br />
                    DIRETTO
                  </h3>
                </div>

                <div>
                  <p className="avant-legato-font mb-6 text-lg leading-snug text-gray-300 md:text-2xl">
                    Preferisci saltare il form? Invia direttamente una mail con
                    materiali, riferimenti e obiettivi del progetto.
                  </p>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="avant-legato-font group inline-flex items-center gap-4 border-b border-white/70 pb-2 text-xs uppercase tracking-[0.22em] md:text-sm"
                  >
                    <span>{CONTACT_EMAIL}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-2">
                      →
                    </span>
                  </a>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section
          ref={informationRef}
          className="oxo-contact-noise relative overflow-hidden bg-[#030303] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="oxo-contact-grid pointer-events-none absolute inset-0 opacity-55" />

          <div
            data-contact-track
            aria-hidden="true"
            className="avant-legato-font pointer-events-none absolute left-0 top-[8vh] z-[1] flex w-max whitespace-nowrap text-[18vw] uppercase leading-[0.72] tracking-[-0.065em] text-white/[0.045] md:text-[14vw] lg:text-[10.5vw]"
          >
            <span>LET'S BUILD SOMETHING REAL —&nbsp;</span>
            <span>LET'S BUILD SOMETHING REAL —&nbsp;</span>
          </div>

          <div className="relative z-10 mb-16 mt-[16vw] flex flex-col gap-7 border-b border-white/20 pb-8 md:mb-24 md:mt-[11vw] md:flex-row md:items-end md:justify-between lg:mt-[8vw]">
            <div>
              <p className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.34em] text-fuchsia-400 md:text-xs">
                Coordinates
              </p>
              <h2 className="avant-legato-font ombra2 text-[14vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[9.3vw] lg:text-[6.8vw]">
                DOVE TROVARCI
              </h2>
            </div>

            <p className="avant-legato-font max-w-[620px] text-lg leading-snug text-gray-300 md:text-2xl">
              Lavoriamo da La Spezia con progetti, team e organizzazioni anche a
              distanza.
            </p>
          </div>

          <div className="relative z-10 grid gap-5 lg:grid-cols-3 lg:gap-[1.5vw]">
            {CONTACT_BLOCKS.map((block) => {
              const content = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="avant-legato-font text-[10px] uppercase tracking-[0.3em] text-gray-500">
                      {block.id}
                    </span>
                    <span
                      className="h-px w-16"
                      style={{ backgroundColor: block.accent }}
                    />
                  </div>

                  <div>
                    <p
                      className="avant-legato-font mb-4 text-[10px] uppercase tracking-[0.34em] md:text-xs"
                      style={{ color: block.accent }}
                    >
                      {block.label}
                    </p>
                    <p className="avant-legato-font break-words text-[5.8vw] uppercase leading-[0.88] tracking-[-0.035em] md:text-[3.3vw] lg:text-[2.05vw]">
                      {block.value}
                    </p>
                  </div>

                  <span className="oxo-contact-card-arrow avant-legato-font self-end text-3xl transition-transform duration-500 ease-out md:text-5xl">
                    ↗
                  </span>
                </>
              );

              return block.href ? (
                <a
                  key={block.id}
                  href={block.href}
                  data-contact-card
                  className="oxo-contact-card group flex min-h-[420px] flex-col justify-between overflow-hidden border border-white/20 bg-white/[0.025] p-7 md:p-9"
                >
                  {content}
                </a>
              ) : (
                <article
                  key={block.id}
                  data-contact-card
                  className="oxo-contact-card group flex min-h-[420px] flex-col justify-between overflow-hidden border border-white/20 bg-white/[0.025] p-7 md:p-9"
                >
                  {content}
                </article>
              );
            })}
          </div>
        </section>

        <section
          ref={finalRef}
          className="oxo-contact-noise relative flex min-h-[92svh] items-end overflow-hidden border-t border-white/15 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="oxo-contact-grid pointer-events-none absolute inset-0 opacity-65" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-[10vw] bottom-[-4vh] h-[52vw] w-[52vw] rounded-full blur-[90px]"
            style={{
              background:
                "radial-gradient(circle, rgba(255,79,216,.18), rgba(139,92,246,.14) 42%, transparent 72%)",
            }}
          />

          <div className="relative z-10 w-full">
            <div className="mb-8 flex items-center justify-between border-b border-white/20 pb-5 text-[9px] uppercase tracking-[0.3em] text-gray-500 md:text-[11px]">
              <span>READY WHEN YOU ARE</span>
              <span>OXO STUDIO / 2026</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[16vw] uppercase leading-[0.72] tracking-[-0.075em] md:text-[14vw] lg:text-[11.5vw]">
              <SplitLetters
                text="SCRIVICI"
                attribute="data-contact-final-letter"
              />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="avant-legato-font max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl">
                Una buona collaborazione comincia da un problema raccontato bene.
              </p>

              <div className="flex flex-col items-start gap-4 md:items-end">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="avant-legato-font group inline-flex w-fit items-center gap-5 border-b border-white pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
                >
                  <span>Invia una mail</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </a>

                <Link
                  to="/prodotti"
                  className="avant-legato-font text-[10px] uppercase tracking-[0.28em] text-gray-500 transition-colors hover:text-white md:text-xs"
                >
                  Prima guarda i prodotti ↗
                </Link>
              </div>
            </div>
          </div>
        </section>

  
      </main>
    </>
  );
}