import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

import "../styles/avant-legato.css";

export default function SplashScreen({ onFinish }) {
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const visualRef = useRef(null);
  const numberRef = useRef(null);
  const numberGhostRef = useRef(null);
  const oxoGhostRef = useRef(null);
  const ringRef = useRef(null);
  const progressRef = useRef(null);
  const progressGlowRef = useRef(null);
  const shutterTopRef = useRef(null);
  const shutterBottomRef = useRef(null);
  const flashRef = useRef(null);

  const aquaRef = useRef(null);
  const violetRef = useRef(null);
  const greenRef = useRef(null);
  const fuchsiaRef = useRef(null);

  const metaRefs = useRef([]);
  const fragmentRefs = useRef([]);

  const [value, setValue] = useState("000");

  useLayoutEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const visual = visualRef.current;
    const number = numberRef.current;
    const numberGhost = numberGhostRef.current;
    const oxoGhost = oxoGhostRef.current;
    const ring = ringRef.current;
    const progress = progressRef.current;
    const progressGlow = progressGlowRef.current;
    const shutterTop = shutterTopRef.current;
    const shutterBottom = shutterBottomRef.current;
    const flash = flashRef.current;

    if (
      !root ||
      !stage ||
      !visual ||
      !number ||
      !numberGhost ||
      !oxoGhost ||
      !ring ||
      !progress ||
      !progressGlow ||
      !shutterTop ||
      !shutterBottom ||
      !flash
    ) {
      onFinish?.();
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      setValue("100");
      gsap.set(progress, { scaleX: 1 });
      const timer = window.setTimeout(() => onFinish?.(), 450);
      return () => window.clearTimeout(timer);
    }

    let pointerMove = null;

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      gsap.set(root, {
        autoAlpha: 1,
        clipPath: "inset(0% 0% 0% 0%)",
      });

      // Lo stage resta immobile: contiene il counter centrato.
      gsap.set(stage, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        perspective: 1400,
        transformStyle: "preserve-3d",
      });

      // Solo questo layer grafico può muoversi col mouse.
      gsap.set(visual, {
        x: 0,
        y: 0,
        rotationX: 0,
        rotationY: 0,
        transformPerspective: 1400,
        transformStyle: "preserve-3d",
      });

      gsap.set(number, {
        left: "50%",
        top: "50%",
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: 70,
        rotateX: -86,
        opacity: 0,
        filter: "blur(18px)",
        transformOrigin: "50% 50%",
      });

      gsap.set(numberGhost, {
        left: "50%",
        top: "50%",
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
      });

      gsap.set(oxoGhost, {
        scale: 0.7,
        rotate: -12,
        opacity: 0,
      });

      gsap.set(ring, {
        scale: 0.48,
        rotate: -28,
        opacity: 0,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(progressGlow, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set(metaRefs.current, {
        y: 18,
        opacity: 0,
      });

      gsap.set(fragmentRefs.current, {
        opacity: 0,
        y: 8,
      });

      gsap.set(
        [aquaRef.current, violetRef.current, greenRef.current, fuchsiaRef.current],
        {
          scaleX: 0,
          opacity: 0,
        }
      );

      gsap.set(shutterTop, { yPercent: -100 });
      gsap.set(shutterBottom, { yPercent: 100 });
      gsap.set(flash, { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      /* ENTRY */

      tl.to(
        metaRefs.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.055,
        },
        0.03
      );

      tl.to(
        oxoGhost,
        {
          scale: 1,
          rotate: 0,
          opacity: 0.055,
          duration: 1.3,
          ease: "power4.out",
        },
        0.04
      );

      tl.to(
        ring,
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1.25,
          ease: "power4.out",
        },
        0.06
      );

      tl.to(
        number,
        {
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          rotateX: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power4.out",
        },
        0.1
      );

      tl.to(
        numberGhost,
        {
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          opacity: 0.065,
          duration: 1.0,
          ease: "power4.out",
        },
        0.18
      );

      /* COUNTER */

      tl.to(
        counter,
        {
          value: 100,
          duration: 3.55,
          ease: "power2.inOut",
          onUpdate: () => {
            const current = Math.min(100, Math.round(counter.value));
            const formatted = String(current).padStart(3, "0");
            setValue(formatted);

            const ratio = current / 100;
            gsap.set(progress, { scaleX: ratio });
            gsap.set(progressGlow, { scaleX: ratio });

            /*
             * Micro-glitch only at selected milestones.
             */
            if ([24, 51, 77, 100].includes(current)) {
              gsap.fromTo(
                number,
                {
                  x: 0,
                  skewX: current % 2 === 0 ? -5 : 5,
                  scaleX: current % 2 === 0 ? 1.025 : 0.975,
                  filter: "blur(1.5px)",
                },
                {
                  x: 0,
                  skewX: 0,
                  scaleX: 1,
                  filter: "blur(0px)",
                  duration: 0.16,
                  ease: "expo.out",
                  overwrite: true,
                }
              );

              gsap.fromTo(
                numberGhost,
                {
                  xPercent: -50,
                  scaleX: current % 2 === 0 ? 1.03 : 0.97,
                  opacity: 0.14,
                },
                {
                  xPercent: -50,
                  scaleX: 1,
                  opacity: 0.065,
                  duration: 0.3,
                  ease: "power3.out",
                  overwrite: true,
                }
              );
            }
          },
        },
        0.22
      );

      /* AWWWARDS LIGHT BLADES */

      tl.fromTo(
        aquaRef.current,
        { scaleX: 0, xPercent: -16, opacity: 0 },
        {
          scaleX: 1,
          xPercent: 0,
          opacity: 1,
          duration: 0.17,
          ease: "expo.out",
        },
        0.62
      ).to(
        aquaRef.current,
        {
          xPercent: 38,
          opacity: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        0.79
      );

      tl.fromTo(
        violetRef.current,
        { scaleX: 0, xPercent: 20, opacity: 0 },
        {
          scaleX: 1,
          xPercent: 0,
          opacity: 0.95,
          duration: 0.17,
          ease: "expo.out",
        },
        1.34
      ).to(
        violetRef.current,
        {
          xPercent: -34,
          opacity: 0,
          duration: 0.52,
          ease: "power3.out",
        },
        1.5
      );

      tl.fromTo(
        greenRef.current,
        { scaleX: 0, xPercent: -18, opacity: 0 },
        {
          scaleX: 1,
          xPercent: 0,
          opacity: 0.95,
          duration: 0.16,
          ease: "expo.out",
        },
        2.1
      ).to(
        greenRef.current,
        {
          xPercent: 30,
          opacity: 0,
          duration: 0.52,
          ease: "power3.out",
        },
        2.26
      );

      tl.fromTo(
        fuchsiaRef.current,
        { scaleX: 0, xPercent: 20, opacity: 0 },
        {
          scaleX: 1,
          xPercent: 0,
          opacity: 0.85,
          duration: 0.15,
          ease: "expo.out",
        },
        2.82
      ).to(
        fuchsiaRef.current,
        {
          xPercent: -30,
          opacity: 0,
          duration: 0.48,
          ease: "power3.out",
        },
        2.97
      );

      /* DATA FRAGMENTS */

      tl.to(
        fragmentRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.05,
          ease: "power3.out",
        },
        0.48
      );

      tl.to(
        fragmentRefs.current,
        {
          opacity: 0.18,
          xPercent: (index) => (index % 2 === 0 ? -12 : 12),
          duration: 1.8,
          stagger: 0.04,
          ease: "none",
        },
        1.3
      );

      /* CONTINUOUS HUD */

      gsap.to(ring, {
        rotate: 360,
        duration: 24,
        repeat: -1,
        ease: "none",
      });

      gsap.to(oxoGhost, {
        scale: 1.06,
        rotate: 2.4,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
      });

      /* POINTER PARALLAX */

      if (!window.matchMedia("(pointer: coarse)").matches) {
        const moveStageX = gsap.quickTo(visual, "x", {
          duration: 0.9,
          ease: "power3.out",
        });

        const moveStageY = gsap.quickTo(visual, "y", {
          duration: 0.9,
          ease: "power3.out",
        });

        const rotateX = gsap.quickTo(visual, "rotationY", {
          duration: 1.0,
          ease: "power3.out",
        });

        const rotateY = gsap.quickTo(visual, "rotationX", {
          duration: 1.0,
          ease: "power3.out",
        });

        pointerMove = (event) => {
          const nx = event.clientX / window.innerWidth - 0.5;
          const ny = event.clientY / window.innerHeight - 0.5;

          moveStageX(nx * 18);
          moveStageY(ny * 12);
          rotateX(nx * 2.2);
          rotateY(ny * -1.8);
        };

        window.addEventListener("pointermove", pointerMove, {
          passive: true,
        });
      }

      /* FINAL LOCK */

      tl.to(
        number,
        {
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          scaleX: 1.08,
          scaleY: 0.96,
          letterSpacing: "-0.095em",
          duration: 0.36,
          ease: "power3.inOut",
        },
        3.56
      );

      tl.to(
        ring,
        {
          scale: 1.18,
          opacity: 0.22,
          duration: 0.42,
          ease: "power3.inOut",
        },
        3.58
      );

      tl.to(
        flash,
        {
          opacity: 1,
          duration: 0.055,
          ease: "none",
        },
        3.86
      ).to(
        flash,
        {
          opacity: 0,
          duration: 0.18,
          ease: "power2.out",
        },
        3.915
      );

      /* CINEMATIC EXIT */

      tl.to(
        shutterTop,
        {
          yPercent: 0,
          duration: 0.52,
          ease: "power4.inOut",
        },
        3.9
      );

      tl.to(
        shutterBottom,
        {
          yPercent: 0,
          duration: 0.52,
          ease: "power4.inOut",
        },
        3.9
      );

      tl.to(
        root,
        {
          autoAlpha: 0,
          duration: 0.08,
          onComplete: () => onFinish?.(),
        },
        4.42
      );
    }, root);

    return () => {
      if (pointerMove) {
        window.removeEventListener("pointermove", pointerMove);
      }

      ctx.revert();
    };
  }, [onFinish]);

  const addMetaRef = (el) => {
    if (el && !metaRefs.current.includes(el)) {
      metaRefs.current.push(el);
    }
  };

  const addFragmentRef = (el) => {
    if (el && !fragmentRefs.current.includes(el)) {
      fragmentRefs.current.push(el);
    }
  };

  return (
    <div
      ref={rootRef}
      className="oxo-aww-splash fixed inset-0 z-[99999] overflow-hidden bg-[#020203] text-white"
    >
      <style>{`
        .oxo-aww-splash,
        .oxo-aww-splash * {
          font-family:
            "Eurostile",
            "Microgramma",
            "Bank Gothic",
            "Orbitron",
            "Michroma",
            "Arial Narrow",
            sans-serif;
        }

        .oxo-aww-grid {
          background-image:
            linear-gradient(
              rgba(255,255,255,.012) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.012) 1px,
              transparent 1px
            );
          background-size: 68px 68px;
          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 8%,
              black 92%,
              transparent
            );
        }

        .oxo-aww-noise::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .045;
          background-image:
            url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.85'/%3E%3C/svg%3E");
          mix-blend-mode: soft-light;
        }

        .oxo-aww-number {
          font-weight: 400;
          font-stretch: expanded;
          letter-spacing: -.085em;
          text-shadow:
            -4px 0 0 rgba(53,216,255,.28),
            4px 0 0 rgba(139,92,246,.22),
            0 3px 0 rgba(32,240,199,.12),
            0 -2px 0 rgba(255,79,216,.08);
        }

        .oxo-aww-number-ghost {
          -webkit-text-stroke: 1px rgba(255,255,255,.18);
          color: transparent;
        }

        /*
         * HARD CENTER LOCK
         * Il punto geometrico del counter è sempre il centro viewport.
         * GSAP può cambiare scale/skew/blur, mai la posizione.
         */
        .oxo-aww-counter-lock {
          position: absolute !important;
          left: 50% !important;
          top: 50% !important;
          margin: 0 !important;
          transform-origin: 50% 50% !important;
        }

        .oxo-aww-ring {
          background:
            conic-gradient(
              from 12deg,
              transparent 0deg,
              transparent 22deg,
              rgba(53,216,255,.62) 23deg,
              rgba(53,216,255,.08) 32deg,
              transparent 42deg,
              transparent 117deg,
              rgba(139,92,246,.52) 118deg,
              rgba(139,92,246,.07) 130deg,
              transparent 143deg,
              transparent 224deg,
              rgba(32,240,199,.44) 225deg,
              rgba(32,240,199,.06) 236deg,
              transparent 248deg,
              transparent 304deg,
              rgba(255,79,216,.38) 305deg,
              rgba(255,79,216,.05) 316deg,
              transparent 330deg
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

        .oxo-aww-blade {
          height: 1px;
          filter: drop-shadow(0 0 9px currentColor);
          mix-blend-mode: screen;
        }

        .oxo-aww-fragment {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }

        .oxo-aww-shutter {
          background:
            linear-gradient(
              90deg,
              #020203,
              #050506 48%,
              #020203
            );
        }

        @media (max-width: 767px) {
          .oxo-aww-grid {
            background-size: 44px 44px;
          }

          .oxo-aww-number {
            letter-spacing: -.07em;
          }

          .oxo-aww-fragment {
            display: none;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .oxo-aww-ring,
          .oxo-aww-blade {
            animation: none !important;
          }
        }
      `}</style>

      <div className="oxo-aww-noise absolute inset-0" />

      <div
        aria-hidden="true"
        className="oxo-aww-grid pointer-events-none absolute inset-0 opacity-70"
      />

      {/* COLOR FIELDS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[14vw] top-[4%] h-[48vw] w-[48vw] rounded-full bg-cyan-300/[0.065] blur-[125px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[14vw] top-[18%] h-[46vw] w-[46vw] rounded-full bg-violet-500/[0.06] blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-24vw] left-[24%] h-[44vw] w-[44vw] rounded-full bg-emerald-300/[0.045] blur-[135px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-18vw] right-[5%] h-[36vw] w-[36vw] rounded-full bg-fuchsia-400/[0.045] blur-[120px]"
      />

      {/* STRUCTURAL LINES */}
      <div className="pointer-events-none absolute left-1/2 top-[7%] h-[86%] w-px -translate-x-1/2 bg-white/[0.035]" />
      <div className="pointer-events-none absolute left-[5%] top-1/2 h-px w-[90%] -translate-y-1/2 bg-white/[0.03]" />
      <div className="pointer-events-none absolute left-[12%] top-[20%] h-px w-[25%] -rotate-[7deg] bg-white/[0.025]" />
      <div className="pointer-events-none absolute right-[10%] top-[70%] h-px w-[23%] rotate-[9deg] bg-white/[0.025]" />

      {/* STAGE */}
      <div
        ref={stageRef}
        className="absolute inset-0 [transform-style:preserve-3d]"
      >
        {/* VISUAL FIELD: questo può muoversi, il counter NO */}
        <div
          ref={visualRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
        >
        {/* GIANT GHOST OXO */}
        <div
          ref={oxoGhostRef}
          aria-hidden="true"
          className="avant-legato-font pointer-events-none absolute left-1/2 top-1/2 z-[1] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[42vw] uppercase leading-none tracking-[-0.12em] text-white"
        >
          OXO
        </div>

        {/* RING SYSTEM */}
        <div
          ref={ringRef}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[6] h-[60vw] w-[60vw] min-h-[330px] min-w-[330px] max-h-[820px] max-w-[820px] -translate-x-1/2 -translate-y-1/2"
        >
          <div className="oxo-aww-ring absolute inset-0 rounded-full" />
          <div className="oxo-aww-ring absolute inset-[14%] rotate-[41deg] rounded-full opacity-70" />
          <div className="oxo-aww-ring absolute inset-[31%] -rotate-[28deg] rounded-full opacity-55" />

          <div className="absolute left-1/2 top-[-3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(53,216,255,.65)]" />
          <div className="absolute bottom-[12%] right-[10%] h-[5px] w-[5px] bg-emerald-300 shadow-[0_0_18px_rgba(32,240,199,.5)]" />
          <div className="absolute left-[13%] top-[22%] h-[4px] w-[4px] bg-violet-400 shadow-[0_0_16px_rgba(139,92,246,.45)]" />
        </div>

        {/* LIGHT BLADES */}
        <div
          ref={aquaRef}
          aria-hidden="true"
          className="oxo-aww-blade pointer-events-none absolute left-[11%] top-[40%] z-[24] w-[44%] origin-left bg-gradient-to-r from-transparent via-cyan-300 to-transparent text-cyan-300"
        />

        <div
          ref={violetRef}
          aria-hidden="true"
          className="oxo-aww-blade pointer-events-none absolute right-[10%] top-[51%] z-[24] w-[40%] origin-right bg-gradient-to-l from-transparent via-violet-400 to-transparent text-violet-400"
        />

        <div
          ref={greenRef}
          aria-hidden="true"
          className="oxo-aww-blade pointer-events-none absolute left-[28%] top-[62%] z-[24] w-[42%] origin-left bg-gradient-to-r from-transparent via-emerald-300 to-transparent text-emerald-300"
        />

        <div
          ref={fuchsiaRef}
          aria-hidden="true"
          className="oxo-aww-blade pointer-events-none absolute right-[18%] top-[34%] z-[24] w-[31%] origin-right bg-gradient-to-l from-transparent via-fuchsia-400 to-transparent text-fuchsia-400"
        />
        </div>

        {/* COUNTER GHOST — SEMPRE CENTRATO */}
        <div
          ref={numberGhostRef}
          aria-hidden="true"
          className="oxo-aww-counter-lock oxo-aww-number-ghost avant-legato-font pointer-events-none absolute z-[28] whitespace-nowrap text-[34vw] leading-none tracking-[-0.085em] md:text-[26vw] lg:text-[20vw]"
        >
          {value}
        </div>

        {/* COUNTER */}
        <div
          ref={numberRef}
          className="oxo-aww-counter-lock oxo-aww-number avant-legato-font absolute z-[30] whitespace-nowrap text-[34vw] leading-none text-white md:text-[26vw] lg:text-[20vw]"
        >
          {value}
        </div>
      </div>

      {/* TOP META */}
      <div
        ref={addMetaRef}
        className="absolute left-6 top-7 z-50 md:left-10 md:top-9 lg:left-[4vw]"
      >
        <p className="avant-legato-font text-[9px] uppercase tracking-[0.34em] text-white/72 md:text-[11px]">
          OXO STUDIO® /{" "}
          <span className="text-cyan-300">SYSTEM BOOT</span>
        </p>

        <p className="avant-legato-font mt-2 text-[8px] uppercase tracking-[0.3em] text-white/32 md:text-[10px]">
          CREATIVE TECHNOLOGY / 2026
        </p>
      </div>

      <div
        ref={addMetaRef}
        className="absolute right-6 top-7 z-50 text-right md:right-10 md:top-9 lg:right-[4vw]"
      >
        <p className="avant-legato-font text-[9px] uppercase tracking-[0.34em] text-white/72 md:text-[11px]">
          INDEX /{" "}
          <span className="text-violet-400">{value}%</span>
        </p>

        <p className="avant-legato-font mt-2 text-[8px] uppercase tracking-[0.3em] text-white/32 md:text-[10px]">
          SIGNAL / LIVE / READY
        </p>
      </div>

      {/* VERTICAL DATA FRAGMENTS */}
      <p
        ref={addFragmentRef}
        className="oxo-aww-fragment avant-legato-font pointer-events-none absolute left-[2.1vw] top-[33%] z-20 text-[8px] uppercase tracking-[0.42em] text-cyan-300/38"
      >
        SIGNAL / 01 / INPUT / ACTIVE
      </p>

      <p
        ref={addFragmentRef}
        className="oxo-aww-fragment avant-legato-font pointer-events-none absolute right-[2.1vw] top-[29%] z-20 text-[8px] uppercase tracking-[0.42em] text-violet-400/36"
      >
        VECTOR / 04 / MOTION / FIELD
      </p>

      <p
        ref={addFragmentRef}
        className="oxo-aww-fragment avant-legato-font pointer-events-none absolute left-[7vw] bottom-[23%] z-20 text-[8px] uppercase tracking-[0.42em] text-emerald-300/32"
      >
        SYSTEM / STABLE / BUILD
      </p>

      <p
        ref={addFragmentRef}
        className="oxo-aww-fragment avant-legato-font pointer-events-none absolute right-[8vw] bottom-[22%] z-20 text-[8px] uppercase tracking-[0.42em] text-fuchsia-400/30"
      >
        NOISE / OUT / MEANING / IN
      </p>

      {/* PROGRESS SYSTEM */}
      <div className="absolute bottom-[14%] left-1/2 z-50 w-[78vw] max-w-[1080px] -translate-x-1/2">
        <div className="mb-3 flex items-center justify-between text-[8px] uppercase tracking-[0.34em] text-white/30 md:text-[10px]">
          <span>BOOT SEQUENCE</span>
          <span>{value} / 100</span>
        </div>

        <div className="relative h-px w-full bg-white/14">
          <div
            ref={progressGlowRef}
            className="absolute inset-y-[-4px] left-0 w-full origin-left bg-gradient-to-r from-cyan-300/0 via-violet-400/28 to-emerald-300/0 blur-[7px]"
          />

          <div
            ref={progressRef}
            className="relative h-full w-full origin-left bg-gradient-to-r from-cyan-300 via-violet-500 via-65% to-emerald-300"
          />
        </div>

        <div className="mt-2 grid grid-cols-4 gap-2">
          <span className="h-px bg-cyan-300/30" />
          <span className="h-px bg-violet-400/28" />
          <span className="h-px bg-emerald-300/25" />
          <span className="h-px bg-fuchsia-400/22" />
        </div>
      </div>

      {/* BOTTOM META */}
      <div
        ref={addMetaRef}
        className="absolute bottom-7 left-6 z-50 md:bottom-9 md:left-10 lg:left-[4vw]"
      >
        <p className="avant-legato-font text-[8px] uppercase tracking-[0.34em] text-white/36 md:text-[10px]">
          NOISE OUT. / <span className="text-emerald-300/70">MEANING IN.</span>
        </p>
      </div>

      <div
        ref={addMetaRef}
        className="absolute bottom-7 right-6 z-50 text-right md:bottom-9 md:right-10 lg:right-[4vw]"
      >
        <p className="avant-legato-font text-[8px] uppercase tracking-[0.34em] text-white/36 md:text-[10px]">
          ONE STUDIO / <span className="text-cyan-300/70">ONE SIGNAL</span>
        </p>
      </div>

      {/* FINAL FLASH */}
      <div
        ref={flashRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[90] bg-white"
      />

      {/* CINEMATIC SHUTTERS */}
      <div
        ref={shutterTopRef}
        aria-hidden="true"
        className="oxo-aww-shutter pointer-events-none absolute left-0 top-0 z-[100] h-1/2 w-full border-b border-cyan-300/20"
      />

      <div
        ref={shutterBottomRef}
        aria-hidden="true"
        className="oxo-aww-shutter pointer-events-none absolute bottom-0 left-0 z-[100] h-1/2 w-full border-t border-violet-400/20"
      />
    </div>
  );
}