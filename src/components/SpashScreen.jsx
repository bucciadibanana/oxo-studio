import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

import "../styles/avant-legato.css";

const ACCENTS = ["#35d8ff", "#8b5cf6", "#20f0c7", "#ff4fd8"];

export default function SplashScreen({ onFinish }) {
  const rootRef = useRef(null);
  const counterRef = useRef(null);
  const counterGhostRef = useRef(null);
  const orbRef = useRef(null);
  const ghostRef = useRef(null);
  const progressRef = useRef(null);
  const statusRef = useRef(null);
  const percentRef = useRef(null);
  const curtainsRef = useRef([]);
  const linesRef = useRef([]);
  const metaRefs = useRef([]);

  const addCurtainRef = (el) => {
    if (el && !curtainsRef.current.includes(el)) curtainsRef.current.push(el);
  };

  const addLineRef = (el) => {
    if (el && !linesRef.current.includes(el)) linesRef.current.push(el);
  };

  const addMetaRef = (el) => {
    if (el && !metaRefs.current.includes(el)) metaRefs.current.push(el);
  };

  useLayoutEffect(() => {
    const root = rootRef.current;
    const counterNode = counterRef.current;
    const counterGhost = counterGhostRef.current;
    const orb = orbRef.current;
    const ghost = ghostRef.current;
    const progress = progressRef.current;
    const status = statusRef.current;
    const percent = percentRef.current;

    if (!root || !counterNode || !orb || !ghost || !progress) {
      onFinish?.();
      return undefined;
    }

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const setValue = (raw) => {
      const value = Math.max(0, Math.min(100, Math.round(raw)));
      const formatted = String(value).padStart(3, "0");

      counterNode.textContent = formatted;
      if (counterGhost) counterGhost.textContent = formatted;
      if (percent) percent.textContent = `${formatted}%`;

      gsap.set(progress, {
        scaleX: value / 100,
      });
    };

    if (reduceMotion) {
      setValue(100);
      if (status) status.textContent = "SYSTEM ONLINE";

      const timer = window.setTimeout(() => {
        onFinish?.();
      }, 420);

      return () => window.clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const counter = { value: 0 };

      setValue(0);

      gsap.set(root, {
        autoAlpha: 1,
      });

      /*
       * HEADER-LIKE CURTAINS
       * Stessa logica visiva del menu, ma usata come intro.
       */
      gsap.set(curtainsRef.current, {
        scaleY: 1,
        transformOrigin: "top center",
      });

      gsap.set(linesRef.current, {
        scaleY: 0,
        transformOrigin: "top center",
        opacity: 0,
      });

      gsap.set(metaRefs.current, {
        y: 18,
        opacity: 0,
      });

      /*
       * Counter sempre inchiodato al centro.
       * Nessun x/xPercent/parallax.
       */
      gsap.set(counterNode, {
        x: 0,
        y: 0,
        xPercent: -50,
        yPercent: -50,
        left: "50%",
        top: "50%",
        opacity: 0,
        scale: 0.82,
        rotateX: -72,
        filter: "blur(18px)",
        transformOrigin: "50% 50%",
      });

      if (counterGhost) {
        gsap.set(counterGhost, {
          x: 0,
          y: 0,
          xPercent: -50,
          yPercent: -50,
          left: "50%",
          top: "50%",
          opacity: 0,
          scale: 1,
        });
      }

      gsap.set(orb, {
        scale: 0.24,
        rotate: -52,
        opacity: 0,
      });

      gsap.set(ghost, {
        xPercent: -50,
        yPercent: -50,
        opacity: 0,
        scale: 0.72,
        rotate: -7,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const tl = gsap.timeline({
        defaults: {
          ease: "power4.inOut",
        },
      });

      /* -------------------------------------------------------
         OPENING / HEADER LANGUAGE
      ------------------------------------------------------- */

      tl.to(
        orb,
        {
          scale: 1,
          rotate: 0,
          opacity: 1,
          duration: 1.05,
          ease: "power4.out",
        },
        0.08
      );

      tl.to(
        ghost,
        {
          opacity: 0.035,
          scale: 1,
          rotate: 0,
          duration: 1.1,
          ease: "power4.out",
        },
        0.1
      );

      tl.to(
        metaRefs.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.06,
          ease: "power3.out",
        },
        0.14
      );

      tl.to(
        linesRef.current,
        {
          scaleY: 1,
          opacity: 0.38,
          duration: 0.85,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.18
      );

      tl.to(
        counterNode,
        {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          filter: "blur(0px)",
          duration: 1.0,
          ease: "power4.out",
        },
        0.18
      );

      if (counterGhost) {
        tl.to(
          counterGhost,
          {
            opacity: 0.06,
            duration: 0.8,
            ease: "power3.out",
          },
          0.42
        );
      }

      /* -------------------------------------------------------
         COUNTER
      ------------------------------------------------------- */

      tl.to(
        counter,
        {
          value: 92,
          duration: 2.25,
          ease: "power2.inOut",
          onUpdate: () => setValue(counter.value),
        },
        0.28
      );

      /*
       * Color pulses through the header columns.
       */
      curtainsRef.current.forEach((curtain, index) => {
        const accent = ACCENTS[index];

        tl.fromTo(
          curtain,
          {
            boxShadow: `inset 0 0 0 rgba(0,0,0,0)`,
          },
          {
            boxShadow: `inset 0 0 90px ${accent}14`,
            duration: 0.4,
            ease: "power2.out",
          },
          0.62 + index * 0.42
        );

        tl.to(
          curtain,
          {
            boxShadow: `inset 0 0 0 rgba(0,0,0,0)`,
            duration: 0.6,
            ease: "power3.out",
          },
          0.92 + index * 0.42
        );
      });

      /*
       * Tiny chromatic compression of the number.
       * Still dead center.
       */
      tl.fromTo(
        counterNode,
        {
          scaleX: 1,
        },
        {
          scaleX: 0.965,
          duration: 0.12,
          repeat: 1,
          yoyo: true,
          ease: "expo.out",
        },
        1.18
      );

      tl.fromTo(
        counterNode,
        {
          scaleY: 1,
        },
        {
          scaleY: 0.94,
          duration: 0.1,
          repeat: 1,
          yoyo: true,
          ease: "expo.out",
        },
        2.02
      );

      /* -------------------------------------------------------
         092 → 099 / HOLD
      ------------------------------------------------------- */

      tl.to(
        counter,
        {
          value: 99,
          duration: 0.72,
          ease: "power4.out",
          onUpdate: () => setValue(counter.value),
        },
        2.66
      );

      tl.call(
        () => {
          if (status) status.textContent = "SIGNAL LOCK / HOLD";
        },
        null,
        3.18
      );

      tl.to(
        counterNode,
        {
          scale: 1.025,
          duration: 0.38,
          ease: "power3.inOut",
        },
        3.18
      );

      tl.to({}, { duration: 0.35 });

      /* -------------------------------------------------------
         100 / SYSTEM ONLINE
      ------------------------------------------------------- */

      tl.to(
        counter,
        {
          value: 100,
          duration: 0.12,
          ease: "none",
          onUpdate: () => setValue(counter.value),
          onComplete: () => {
            setValue(100);
            if (status) status.textContent = "SYSTEM ONLINE";
          },
        },
        3.72
      );

      tl.to(
        counterNode,
        {
          scaleX: 1.065,
          scaleY: 0.97,
          duration: 0.35,
          ease: "power4.out",
        },
        3.76
      );

      tl.to(
        orb,
        {
          scale: 1.12,
          opacity: 0.82,
          duration: 0.42,
          ease: "power3.out",
        },
        3.78
      );

      /* -------------------------------------------------------
         EXIT — curtains move like the header
      ------------------------------------------------------- */

      tl.to(
        metaRefs.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.32,
          stagger: 0.025,
          ease: "power3.in",
        },
        4.1
      );

      tl.to(
        [counterNode, counterGhost, orb, ghost],
        {
          opacity: 0,
          duration: 0.34,
          ease: "power3.in",
        },
        4.13
      );

      tl.to(
        linesRef.current,
        {
          opacity: 0,
          duration: 0.22,
        },
        4.16
      );

      /*
       * Four panels leave upward with the same rhythm
       * as the menu curtains.
       */
      tl.to(
        curtainsRef.current,
        {
          scaleY: 0,
          transformOrigin: "bottom center",
          duration: 0.78,
          stagger: 0.055,
          ease: "power4.inOut",
        },
        4.2
      );

      tl.to(
        root,
        {
          autoAlpha: 0,
          duration: 0.06,
          onComplete: () => onFinish?.(),
        },
        5.02
      );

      /* ambient motion */
      gsap.to(orb, {
        rotate: 360,
        duration: 26,
        repeat: -1,
        ease: "none",
      });

      gsap.to(ghost, {
        scale: 1.035,
        duration: 3.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, root);

    return () => {
      ctx.revert();
    };
  }, [onFinish]);

  return (
    <div
      ref={rootRef}
      className="oxo-header-splash fixed inset-0 z-[99999] overflow-hidden bg-[#020203] text-white"
    >
      <style>{`
        :root {
          --oxo-cyan:#35d8ff;
          --oxo-violet:#8b5cf6;
          --oxo-green:#20f0c7;
          --oxo-pink:#ff4fd8;
        }

        .oxo-header-splash,
        .oxo-header-splash * {
          font-family:
            "Eurostile",
            "Microgramma",
            "Bank Gothic",
            "Orbitron",
            "Michroma",
            "Arial Narrow",
            sans-serif;
        }

        .oxo-hs-curtains {
          position:absolute;
          inset:0;
          display:grid;
          grid-template-columns:repeat(4,1fr);
          z-index:1;
        }

        .oxo-hs-curtain {
          position:relative;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.028),
              rgba(255,255,255,0)
            ),
            #050506;
          border-right:1px solid rgba(255,255,255,.05);
          will-change:transform;
        }

        .oxo-hs-curtain::after {
          content:"";
          position:absolute;
          left:50%;
          top:0;
          width:1px;
          height:100%;
          background:
            linear-gradient(
              to bottom,
              transparent,
              var(--accent),
              transparent
            );
          opacity:.28;
        }

        .oxo-hs-grid {
          position:absolute;
          inset:0;
          z-index:2;
          pointer-events:none;
          opacity:.46;
          background-image:
            linear-gradient(
              rgba(255,255,255,.018) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,.018) 1px,
              transparent 1px
            );
          background-size:64px 64px;
          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
        }

        .oxo-hs-orb {
          position:absolute;
          left:50%;
          top:50%;
          z-index:8;
          width:min(62vw,760px);
          aspect-ratio:1;
          border-radius:50%;
          transform:translate(-50%,-50%);
          background:
            radial-gradient(
              circle at 38% 40%,
              rgba(53,216,255,.26),
              transparent 30%
            ),
            radial-gradient(
              circle at 58% 48%,
              rgba(139,92,246,.22),
              transparent 42%
            ),
            radial-gradient(
              circle at 48% 64%,
              rgba(32,240,199,.12),
              transparent 48%
            ),
            radial-gradient(
              circle at 60% 68%,
              rgba(255,79,216,.11),
              transparent 52%
            );
          filter:blur(18px);
          pointer-events:none;
        }

        .oxo-hs-ghost {
          position:absolute;
          left:50%;
          top:50%;
          z-index:7;
          transform:translate(-50%,-50%);
          font-size:clamp(180px,42vw,720px);
          line-height:.7;
          letter-spacing:-.12em;
          color:white;
          pointer-events:none;
          user-select:none;
        }

        .oxo-hs-counter,
        .oxo-hs-counter-ghost {
          position:absolute;
          left:50%;
          top:50%;
          transform:translate(-50%,-50%);
          white-space:nowrap;
          line-height:.72;
          letter-spacing:-.085em;
          pointer-events:none;
          user-select:none;
        }

        .oxo-hs-counter {
          z-index:30;
          font-size:clamp(120px,22vw,420px);
          color:#fff;
          text-shadow:
            -3px 0 0 rgba(53,216,255,.24),
            3px 0 0 rgba(139,92,246,.18),
            0 2px 0 rgba(32,240,199,.09);
        }

        .oxo-hs-counter-ghost {
          z-index:29;
          font-size:clamp(120px,22vw,420px);
          color:transparent;
          -webkit-text-stroke:1px rgba(255,255,255,.16);
        }

        .oxo-hs-top,
        .oxo-hs-bottom {
          position:absolute;
          left:clamp(18px,4vw,70px);
          right:clamp(18px,4vw,70px);
          z-index:50;
          display:flex;
          align-items:flex-start;
          justify-content:space-between;
          gap:20px;
          font-size:9px;
          letter-spacing:.28em;
          text-transform:uppercase;
          color:rgba(255,255,255,.42);
        }

        .oxo-hs-top {
          top:clamp(24px,5vh,52px);
          padding-bottom:18px;
          border-bottom:1px solid rgba(255,255,255,.14);
        }

        .oxo-hs-bottom {
          bottom:clamp(24px,5vh,52px);
          padding-top:18px;
          align-items:flex-end;
          border-top:1px solid rgba(255,255,255,.14);
        }

        .oxo-hs-status {
          display:inline-flex;
          align-items:center;
          gap:9px;
        }

        .oxo-hs-status::before {
          content:"";
          width:6px;
          height:6px;
          border-radius:50%;
          background:var(--oxo-green);
          animation:oxoHsPulse 1.8s ease-in-out infinite;
        }

        .oxo-hs-progress {
          position:absolute;
          left:50%;
          bottom:17%;
          z-index:50;
          width:min(72vw,920px);
          transform:translateX(-50%);
        }

        .oxo-hs-progress-track {
          position:relative;
          height:1px;
          width:100%;
          background:rgba(255,255,255,.12);
        }

        .oxo-hs-progress-bar {
          height:100%;
          width:100%;
          transform-origin:left center;
          background:
            linear-gradient(
              90deg,
              var(--oxo-cyan),
              var(--oxo-violet),
              var(--oxo-green),
              var(--oxo-pink)
            );
        }

        .oxo-hs-progress-meta {
          display:flex;
          justify-content:space-between;
          margin-bottom:10px;
          font-size:8px;
          letter-spacing:.3em;
          text-transform:uppercase;
          color:rgba(255,255,255,.32);
        }

        .oxo-hs-rail {
          position:absolute;
          right:clamp(18px,3vw,54px);
          top:50%;
          z-index:55;
          width:1px;
          height:30vh;
          transform:translateY(-50%);
          background:rgba(255,255,255,.08);
        }

        .oxo-hs-rail-dot {
          position:absolute;
          left:50%;
          width:8px;
          height:8px;
          top:50%;
          border-radius:50%;
          transform:translate(-50%,-50%);
          background:var(--oxo-cyan);
          box-shadow:0 0 22px rgba(53,216,255,.45);
        }

        @keyframes oxoHsPulse {
          0%,100% {
            opacity:.35;
            transform:scale(.8);
          }
          50% {
            opacity:1;
            transform:scale(1.25);
          }
        }

        @media (min-width:900px) {
          .oxo-hs-top,
          .oxo-hs-bottom {
            font-size:10px;
          }
        }

        @media (max-width:640px) {
          .oxo-hs-curtains {
            grid-template-columns:repeat(2,1fr);
          }

          .oxo-hs-curtain:nth-child(3),
          .oxo-hs-curtain:nth-child(4) {
            display:none;
          }

          .oxo-hs-grid {
            background-size:44px 44px;
          }

          .oxo-hs-top span:last-child,
          .oxo-hs-bottom span:last-child {
            display:none;
          }

          .oxo-hs-progress {
            width:82vw;
            bottom:15%;
          }

          .oxo-hs-rail {
            display:none;
          }

          .oxo-hs-orb {
            width:100vw;
          }
        }

        @media (prefers-reduced-motion:reduce) {
          .oxo-header-splash * {
            animation:none!important;
          }
        }
      `}</style>

      {/* 4 HEADER CURTAINS */}
      <div className="oxo-hs-curtains" aria-hidden="true">
        {ACCENTS.map((accent, index) => (
          <div
            key={accent}
            ref={addCurtainRef}
            className="oxo-hs-curtain"
            style={{ "--accent": accent }}
          >
            <span
              ref={addLineRef}
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
              style={{
                background: `linear-gradient(to bottom, transparent, ${accent}, transparent)`,
              }}
            />
          </div>
        ))}
      </div>

      <div className="oxo-hs-grid" aria-hidden="true" />

      {/* SAME ORB LANGUAGE AS HEADER */}
      <div ref={orbRef} className="oxo-hs-orb" aria-hidden="true" />

      {/* GHOST OXO */}
      <div
        ref={ghostRef}
        className="oxo-hs-ghost avant-legato-font"
        aria-hidden="true"
      >
        OXO
      </div>

      {/* COUNTER FIXED CENTER */}
      <div
        ref={counterGhostRef}
        className="oxo-hs-counter-ghost avant-legato-font"
        aria-hidden="true"
      >
        000
      </div>

      <div
        ref={counterRef}
        className="oxo-hs-counter avant-legato-font"
      >
        000
      </div>

      {/* TOP */}
      <div ref={addMetaRef} className="oxo-hs-top avant-legato-font">
        <span>
          OXO STUDIO® /{" "}
          <span className="text-cyan-300">CREATIVE TECHNOLOGY</span>
        </span>

        <span>LA SPEZIA / ITALY</span>
      </div>

      {/* PROGRESS */}
      <div className="oxo-hs-progress">
        <div className="oxo-hs-progress-meta avant-legato-font">
          <span>BOOT SEQUENCE</span>
          <span ref={percentRef}>000%</span>
        </div>

        <div className="oxo-hs-progress-track">
          <div
            ref={progressRef}
            className="oxo-hs-progress-bar"
          />
        </div>
      </div>

      {/* BOTTOM */}
      <div ref={addMetaRef} className="oxo-hs-bottom avant-legato-font">
        <span ref={statusRef} className="oxo-hs-status">
          SYSTEM INITIALIZING
        </span>

        <span>
          SOFTWARE / AI / WEB / GAME
        </span>
      </div>

      {/* HEADER-LIKE RAIL */}
      <div className="oxo-hs-rail" aria-hidden="true">
        <span className="oxo-hs-rail-dot" />
      </div>
    </div>
  );
}