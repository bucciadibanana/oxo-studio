import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

export default function Videogiochi() {
  const pageRef = useRef(null);

  useLayoutEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;

    const ctx = gsap.context(() => {
      const title = page.querySelector("[data-game-title]");
      const subtitle = page.querySelector("[data-game-subtitle]");
      const meta = gsap.utils.toArray(page.querySelectorAll("[data-game-meta]"));
      const lines = gsap.utils.toArray(page.querySelectorAll("[data-game-line]"));
      const blocks = gsap.utils.toArray(page.querySelectorAll("[data-game-block]"));
      const crosshair = page.querySelector("[data-game-crosshair]");

      gsap.fromTo(
        title,
        {
          yPercent: 120,
          rotateX: -72,
          opacity: 0,
        },
        {
          yPercent: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.25,
          ease: "power4.out",
          delay: 0.12,
        }
      );

      gsap.fromTo(
        subtitle,
        {
          y: 24,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.55,
        }
      );

      gsap.fromTo(
        meta,
        {
          y: 16,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        lines,
        {
          scaleX: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          duration: 1.2,
          stagger: 0.04,
          ease: "power3.inOut",
          delay: 0.18,
        }
      );

      gsap.fromTo(
        blocks,
        {
          opacity: 0,
          scale: 0.75,
          rotate: -4,
        },
        {
          opacity: 0.42,
          scale: 1,
          rotate: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.3,
        }
      );

      if (crosshair) {
        gsap.to(crosshair, {
          rotate: 360,
          duration: 28,
          repeat: -1,
          ease: "none",
        });
      }

      const move = (event) => {
        const rect = page.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;

        gsap.to(blocks, {
          x: (index) => nx * (8 + index * 2),
          y: (index) => ny * (6 + index * 1.5),
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (crosshair) {
          gsap.to(crosshair, {
            x: nx * 28,
            y: ny * 20,
            duration: 0.45,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      const leave = () => {
        gsap.to(blocks, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          overwrite: "auto",
        });

        if (crosshair) {
          gsap.to(crosshair, {
            x: 0,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };

      page.addEventListener("pointermove", move, { passive: true });
      page.addEventListener("pointerleave", leave);

      return () => {
        page.removeEventListener("pointermove", move);
        page.removeEventListener("pointerleave", leave);
      };
    }, page);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <SeoMetaTags />

      <main
        ref={pageRef}
        className="relative isolate flex min-h-[100svh] overflow-hidden bg-[#020203] text-white"
      >
        <style>{`
          .game-coming-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
            background-size:58px 58px;
            mask-image:linear-gradient(to bottom,transparent,black 7%,black 93%,transparent);
          }

          .game-coming-noise::after {
            content:"";
            position:absolute;
            inset:0;
            pointer-events:none;
            opacity:.045;
            background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.94' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.8'/%3E%3C/svg%3E");
            mix-blend-mode:soft-light;
          }

          .game-coming-crosshair {
            position:absolute;
            left:50%;
            top:48%;
            width:min(40vw,620px);
            height:min(40vw,620px);
            transform:translate(-50%,-50%);
            border:1px solid rgba(255,255,255,.055);
            pointer-events:none;
          }

          .game-coming-crosshair::before,
          .game-coming-crosshair::after {
            content:"";
            position:absolute;
            background:rgba(255,255,255,.09);
          }

          .game-coming-crosshair::before {
            left:50%;
            top:-12%;
            bottom:-12%;
            width:1px;
          }

          .game-coming-crosshair::after {
            top:50%;
            left:-12%;
            right:-12%;
            height:1px;
          }

          .game-coming-block {
            position:absolute;
            width:clamp(38px,5vw,90px);
            aspect-ratio:1;
            border:1px solid rgba(255,255,255,.12);
            background:
              linear-gradient(145deg,rgba(53,216,255,.04),transparent 45%),
              rgba(255,255,255,.01);
            box-shadow:inset 0 0 0 1px rgba(255,255,255,.015);
            pointer-events:none;
            will-change:transform,opacity;
          }

          .game-coming-title {
            font-size:clamp(4.5rem,13.4vw,14.5rem);
            line-height:.65;
            letter-spacing:-.09em;
            text-transform:uppercase;
          }

          @media (max-width:767px){
            .game-coming-grid {
              background-size:42px 42px;
            }

            .game-coming-crosshair {
              width:72vw;
              height:72vw;
            }

            .game-coming-title {
              font-size:18vw;
            }
          }
        `}</style>

        <div className="game-coming-grid pointer-events-none absolute inset-0 opacity-55" />
        <div className="game-coming-noise pointer-events-none absolute inset-0" />

        <div
          className="pointer-events-none absolute left-[18%] top-[38%] h-[26vw] w-[26vw] max-h-[440px] max-w-[440px] rounded-full blur-[110px]"
          style={{ background: "rgba(53,216,255,.10)" }}
        />

        <div
          className="pointer-events-none absolute right-[14%] top-[30%] h-[24vw] w-[24vw] max-h-[400px] max-w-[400px] rounded-full blur-[120px]"
          style={{ background: "rgba(139,92,246,.10)" }}
        />

        <div
          data-game-crosshair
          className="game-coming-crosshair"
          aria-hidden="true"
        />

        {[
          ["10%","22%"],
          ["18%","70%"],
          ["31%","16%"],
          ["72%","17%"],
          ["80%","66%"],
          ["89%","36%"],
          ["62%","76%"],
        ].map(([left, top], index) => (
          <span
            key={index}
            data-game-block
            className="game-coming-block"
            style={{ left, top }}
          />
        ))}

        <div className="pointer-events-none absolute inset-x-[4vw] top-[7vh] z-30 flex items-start justify-between">
          <p
            data-game-meta
            className="avant-legato-font text-[8px] uppercase leading-[1.8] tracking-[.34em] text-white/30 md:text-[10px]"
          >
            OXO / GAME LAB
            <br />
            PROJECT / LOCKED
          </p>

          <p
            data-game-meta
            className="avant-legato-font text-right text-[8px] uppercase leading-[1.8] tracking-[.34em] text-white/30 md:text-[10px]"
          >
            REAL-TIME WORLDS
            <br />
            STATUS / IN DEVELOPMENT
          </p>
        </div>

        <div className="relative z-20 flex min-h-[100svh] w-full flex-col justify-end px-6 pb-[8vh] pt-32 md:px-10 lg:px-[4vw]">
          <div className="overflow-hidden [perspective:1200px]">
            <h1
              data-game-title
              className="game-coming-title avant-legato-font ombra2"
            >
              COMING
              <br />
              SOON.
            </h1>
          </div>

          <div className="mt-8 grid gap-7 border-t border-white/16 pt-6 md:grid-cols-[1fr_auto] md:items-end">
            <p
              data-game-subtitle
              className="avant-legato-font max-w-[760px] text-xl leading-snug text-gray-300 md:text-3xl"
            >
              Stiamo costruendo nuovi mondi.
              <br />
              Gameplay, motion e sistemi in tempo reale.
            </p>

            <Link
              to="/Contatti"
              data-game-meta
              className="avant-legato-font group inline-flex w-fit items-center gap-5 border border-white/25 bg-white/[0.025] px-5 py-4 text-sm uppercase tracking-[.28em] text-white"
            >
              <span>Contatti</span>
              <span className="text-xl transition-transform duration-300 group-hover:translate-x-1">
                ↗
              </span>
            </Link>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between text-[7px] uppercase tracking-[.3em] text-white/24 md:text-[9px]">
              <span>WORLD BUILD / PRIVATE</span>
              <span>OXO STUDIO / 2026</span>
            </div>

            <div className="h-px bg-white/10">
              <div
                data-game-line
                className="h-full w-full bg-gradient-to-r from-cyan-300 via-violet-500 to-fuchsia-400"
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}