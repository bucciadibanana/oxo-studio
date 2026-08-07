import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../components/SeoMetaTags";


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

    const ctx = gsap.context(() => {
      const heroLetters = gsap.utils.toArray(
        hero.querySelectorAll("[data-contact-letter]")
      );
      const heroMeta = gsap.utils.toArray(
        hero.querySelectorAll("[data-contact-meta]")
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

      gsap.to(hero.querySelector("[data-contact-title]"), {
        yPercent: 19,
        scale: 0.93,
        opacity: 0.38,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(hero.querySelector("[data-contact-orb]"), {
        rotate: -48,
        xPercent: 18,
        yPercent: -12,
        ease: "none",
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1.15,
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
        className="relative overflow-x-hidden bg-[#030303] text-white"
      >
        <style>{`
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
        `}</style>

        <section
          ref={heroRef}
          className="oxo-contact-noise relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden px-6 pb-8 pt-7 md:px-10 md:pb-10 md:pt-9 lg:px-[4vw] lg:pb-[4vh] lg:pt-[3.5vh]"
        >
          <div className="oxo-contact-grid pointer-events-none absolute inset-0" />

          <div
            data-contact-orb
            aria-hidden="true"
            className="pointer-events-none absolute -left-[18vw] top-[4vh] h-[62vw] w-[62vw] rounded-full border border-violet-400/20"
            style={{ animation: "oxoContactOrbit 11s ease-in-out infinite" }}
          >
            <div className="absolute inset-[15%] rounded-full border border-cyan-300/20" />
            <div className="absolute inset-[31%] rounded-full border border-fuchsia-400/15" />
            <div className="absolute inset-[44%] rounded-full bg-violet-500/10 blur-[60px]" />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-[-8%] top-[49%] h-px w-[116%] rotate-[7deg] bg-gradient-to-r from-transparent via-violet-400/60 to-cyan-300/10"
            style={{ animation: "oxoContactPulse 4.2s ease-in-out infinite" }}
          />

          <div className="relative z-10 flex items-start justify-between gap-6 text-[9px] uppercase tracking-[0.3em] text-gray-400 md:text-[11px]">
            <p data-contact-meta>OXO STUDIO®</p>
            <p data-contact-meta className="text-right">
              PROJECT INQUIRIES
              <br />
              LA SPEZIA / ITALY
            </p>
          </div>

          <div data-contact-title className="relative z-10 my-auto py-14">
            <p
              data-contact-meta
              className="antonio2 mb-4 text-[10px] uppercase tracking-[0.36em] text-violet-400 md:text-xs"
            >
              Start a conversation
            </p>

            <h1 className="antonio2 ombra2 overflow-hidden text-[21vw] uppercase leading-[0.71] tracking-[-0.075em] md:text-[18vw] lg:text-[15vw]">
              <SplitLetters text="CONTATTI" />
            </h1>
          </div>

          <div className="relative z-10 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
            <p
              data-contact-meta
              className="antonio max-w-[900px] text-xl leading-snug text-gray-200 md:text-3xl lg:text-[2.35rem]"
            >
              Raccontaci cosa deve esistere, cosa non funziona ancora o quale idea
              vuoi trasformare in un prodotto reale.
            </p>

            <p
              data-contact-meta
              className="antonio2 shrink-0 text-[10px] uppercase tracking-[0.3em] text-gray-500 md:text-xs"
            >
              Scroll to write ↓
            </p>
          </div>
        </section>

        <section
          ref={formSectionRef}
          className="relative overflow-hidden border-y border-white/15 bg-[#050505] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
        >
          <div className="oxo-contact-grid pointer-events-none absolute inset-0 opacity-60" />

          <div className="relative z-10 mb-14 border-b border-white/20 pb-8 md:mb-20">
            <p className="antonio2 mb-4 text-[10px] uppercase tracking-[0.34em] text-cyan-300 md:text-xs">
              Project brief
            </p>
            <h2 className="antonio2 ombra2 text-[17vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[11vw] lg:text-[8vw]">
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
                  <span className="antonio2 mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    01 / Nome *
                  </span>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    className="antonio w-full bg-transparent text-xl text-white outline-none placeholder:text-white/25 md:text-2xl"
                    placeholder="Il tuo nome"
                  />
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-cyan-300 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3"
                >
                  <span className="antonio2 mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    02 / Email *
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    className="antonio w-full bg-transparent text-xl text-white outline-none placeholder:text-white/25 md:text-2xl"
                    placeholder="nome@email.it"
                  />
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-violet-400 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3"
                >
                  <span className="antonio2 mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    03 / Azienda
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="antonio w-full bg-transparent text-xl text-white outline-none placeholder:text-white/25 md:text-2xl"
                    placeholder="Nome azienda"
                  />
                  <span className="oxo-contact-field-line absolute bottom-[-1px] left-0 h-px w-full origin-left scale-x-0 bg-fuchsia-400 opacity-0 transition-all duration-500" />
                </label>

                <label
                  data-contact-form-row
                  className="oxo-contact-field relative block border-b border-white/25 pb-3"
                >
                  <span className="antonio2 mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    04 / Tipo di progetto
                  </span>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="antonio w-full appearance-none bg-transparent text-xl text-white outline-none md:text-2xl"
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
                  <span className="antonio2 mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    05 / Budget indicativo
                  </span>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="antonio w-full appearance-none bg-transparent text-xl text-white outline-none md:text-2xl"
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
                  <span className="antonio2 mb-3 block text-[10px] uppercase tracking-[0.3em] text-gray-500">
                    06 / Il progetto *
                  </span>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="antonio w-full resize-none bg-transparent text-xl leading-snug text-white outline-none placeholder:text-white/25 md:text-2xl"
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
                  <p className="antonio max-w-[610px] text-sm leading-snug text-gray-500 md:text-base">
                    Il pulsante apre il tuo programma email con il brief già
                    compilato. Nessun dato viene salvato da questa pagina.
                  </p>
                  {formError ? (
                    <p className="antonio mt-3 text-sm text-fuchsia-400">
                      {formError}
                    </p>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="antonio2 group inline-flex w-fit items-center gap-5 border-b border-white pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
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
                  <p className="antonio2 mb-4 text-[10px] uppercase tracking-[0.34em] text-violet-400 md:text-xs">
                    Direct contact
                  </p>
                  <h3 className="antonio2 ombra2 text-[15vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[9vw] lg:text-[5.6vw]">
                    SCRIVI
                    <br />
                    DIRETTO
                  </h3>
                </div>

                <div>
                  <p className="antonio mb-6 text-lg leading-snug text-gray-300 md:text-2xl">
                    Preferisci saltare il form? Invia direttamente una mail con
                    materiali, riferimenti e obiettivi del progetto.
                  </p>

                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="antonio2 group inline-flex items-center gap-4 border-b border-white/70 pb-2 text-xs uppercase tracking-[0.22em] md:text-sm"
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
            className="antonio2 pointer-events-none absolute left-0 top-[8vh] z-[1] flex w-max whitespace-nowrap text-[23vw] uppercase leading-[0.72] tracking-[-0.065em] text-white/[0.045] md:text-[17vw] lg:text-[13vw]"
          >
            <span>LET'S BUILD SOMETHING REAL —&nbsp;</span>
            <span>LET'S BUILD SOMETHING REAL —&nbsp;</span>
          </div>

          <div className="relative z-10 mb-16 mt-[16vw] flex flex-col gap-7 border-b border-white/20 pb-8 md:mb-24 md:mt-[11vw] md:flex-row md:items-end md:justify-between lg:mt-[8vw]">
            <div>
              <p className="antonio2 mb-4 text-[10px] uppercase tracking-[0.34em] text-fuchsia-400 md:text-xs">
                Coordinates
              </p>
              <h2 className="antonio2 ombra2 text-[17vw] uppercase leading-[0.75] tracking-[-0.065em] md:text-[11vw] lg:text-[8vw]">
                DOVE TROVARCI
              </h2>
            </div>

            <p className="antonio max-w-[620px] text-lg leading-snug text-gray-300 md:text-2xl">
              Lavoriamo da La Spezia con progetti, team e organizzazioni anche a
              distanza.
            </p>
          </div>

          <div className="relative z-10 grid gap-5 lg:grid-cols-3 lg:gap-[1.5vw]">
            {CONTACT_BLOCKS.map((block) => {
              const content = (
                <>
                  <div className="flex items-center justify-between">
                    <span className="antonio2 text-[10px] uppercase tracking-[0.3em] text-gray-500">
                      {block.id}
                    </span>
                    <span
                      className="h-px w-16"
                      style={{ backgroundColor: block.accent }}
                    />
                  </div>

                  <div>
                    <p
                      className="antonio2 mb-4 text-[10px] uppercase tracking-[0.34em] md:text-xs"
                      style={{ color: block.accent }}
                    >
                      {block.label}
                    </p>
                    <p className="antonio2 break-words text-[9vw] uppercase leading-[0.82] tracking-[-0.05em] md:text-[5vw] lg:text-[3.25vw]">
                      {block.value}
                    </p>
                  </div>

                  <span className="oxo-contact-card-arrow antonio2 self-end text-3xl transition-transform duration-500 ease-out md:text-5xl">
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

            <h2 className="antonio2 ombra2 overflow-hidden text-[20vw] uppercase leading-[0.72] tracking-[-0.075em] md:text-[17vw] lg:text-[14.5vw]">
              <SplitLetters
                text="SCRIVICI"
                attribute="data-contact-final-letter"
              />
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/20 pt-6 md:flex-row md:items-end md:justify-between">
              <p className="antonio max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl">
                Una buona collaborazione comincia da un problema raccontato bene.
              </p>

              <div className="flex flex-col items-start gap-4 md:items-end">
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="antonio2 group inline-flex w-fit items-center gap-5 border-b border-white pb-2 text-sm uppercase tracking-[0.28em] md:text-base"
                >
                  <span>Invia una mail</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </a>

                <Link
                  to="/prodotti"
                  className="antonio2 text-[10px] uppercase tracking-[0.28em] text-gray-500 transition-colors hover:text-white md:text-xs"
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