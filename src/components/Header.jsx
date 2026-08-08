import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import gsap from "gsap";
import "../index.css";

const NAV_ITEMS = [
  { label: "HOME", to: "/", index: "01", meta: "START", accent: "#35d8ff" },
  { label: "CHI SIAMO", to: "/ChiSiamo", index: "02", meta: "STUDIO", accent: "#8b5cf6" },
  { label: "PRODOTTI", to: "/Prodotti", index: "03", meta: "WORK", accent: "#20f0c7" },
  { label: "CONTATTI", to: "/Contatti", index: "04", meta: "HELLO", accent: "#ff4fd8" },
];

export default function Header() {
  const location = useLocation();
  const menuRef = useRef(null);
  const timelineRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useLayoutEffect(() => {
    const menu = menuRef.current;
    if (!menu) return undefined;

    const ctx = gsap.context(() => {
      const curtains = gsap.utils.toArray("[data-curtain]", menu);
      const links = gsap.utils.toArray("[data-menu-link]", menu);
      const metas = gsap.utils.toArray("[data-menu-meta]", menu);
      const lines = gsap.utils.toArray("[data-menu-line]", menu);
      const top = menu.querySelector("[data-menu-top]");
      const bottom = menu.querySelector("[data-menu-bottom]");
      const ghost = menu.querySelector("[data-menu-ghost]");
      const orb = menu.querySelector("[data-menu-orb]");

      gsap.set(menu, {
        autoAlpha: 0,
        pointerEvents: "none",
      });

      gsap.set(curtains, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      gsap.set(links, {
        yPercent: 120,
        rotateX: -82,
        opacity: 0,
        transformOrigin: "50% 100%",
      });

      gsap.set(metas, {
        y: 18,
        opacity: 0,
      });

      gsap.set(lines, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      gsap.set([top, bottom], {
        y: 24,
        opacity: 0,
      });

      if (ghost) {
        gsap.set(ghost, {
          xPercent: 18,
          opacity: 0,
        });
      }

      if (orb) {
        gsap.set(orb, {
          scale: 0.25,
          rotate: -50,
          opacity: 0,
        });
      }

      const tl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power4.inOut",
        },
        onStart: () => {
          gsap.set(menu, {
            autoAlpha: 1,
            pointerEvents: "auto",
          });
        },
        onReverseComplete: () => {
          gsap.set(menu, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
        },
      });

      tl.to(curtains, {
        scaleY: 1,
        duration: 0.9,
        stagger: 0.06,
        ease: "power4.inOut",
      });

      if (orb) {
        tl.to(
          orb,
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 1.05,
            ease: "power4.out",
          },
          0.22
        );
      }

      if (ghost) {
        tl.to(
          ghost,
          {
            xPercent: 0,
            opacity: 1,
            duration: 1,
            ease: "power4.out",
          },
          0.28
        );
      }

      tl.to(
        [top, bottom],
        {
          y: 0,
          opacity: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
        },
        0.36
      )
        .to(
          links,
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.065,
            ease: "power4.out",
          },
          0.38
        )
        .to(
          metas,
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.055,
            ease: "power3.out",
          },
          0.5
        )
        .to(
          lines,
          {
            scaleX: 1,
            duration: 0.75,
            stagger: 0.05,
            ease: "power3.out",
          },
          0.48
        );

      timelineRef.current = tl;
    }, menu);

    return () => {
      timelineRef.current?.kill();
      timelineRef.current = null;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const tl = timelineRef.current;
    if (!tl) return;

    if (open) {
      tl.timeScale(1).play();
    } else {
      tl.timeScale(1.15).reverse();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const preventScroll = (event) => {
      event.preventDefault();
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }

      if (
        ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(
          event.key
        )
      ) {
        event.preventDefault();
      }
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <>
      <style>{`
        :root {
          --oxo-cyan:#35d8ff;
          --oxo-violet:#8b5cf6;
          --oxo-green:#20f0c7;
          --oxo-pink:#ff4fd8;
        }

        /*
         * STESSO HAMBURGER DEL FILE APPROVATO.
         * Unica differenza strutturale:
         * è fixed direttamente, senza <header>.
         */
        .oxo-aw-toggle {
          position: fixed;
          top: 18px;
          right: clamp(14px, 2.4vw, 34px);
          z-index: 10020;

          width: clamp(54px,5vw,72px);
          aspect-ratio: 1;

          border: 0;
          padding: 0;
          margin: 0;

          background: transparent;
          color: #fff;

          cursor: pointer;

          display: grid;
          place-items: center;

          opacity: 1;
          visibility: visible;
          pointer-events: auto;

          isolation: isolate;
        }

        .oxo-aw-toggle-ring,
        .oxo-aw-toggle-ring::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,.42);
          transition:
            transform .55s cubic-bezier(.16,1,.3,1),
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .oxo-aw-toggle-ring::after {
          inset: 7px;
          border-color: rgba(53,216,255,.32);
        }

        .oxo-aw-toggle:hover .oxo-aw-toggle-ring {
          transform: rotate(35deg) scale(1.06);
          border-color: rgba(255,255,255,.9);
          box-shadow: none;
        }

        .oxo-aw-toggle.open .oxo-aw-toggle-ring {
          transform: rotate(90deg) scale(.91);
          border-color: rgba(255,255,255,.75);
        }

        .oxo-aw-burger {
          position: relative;
          z-index: 2;
          width: 22px;
          height: 16px;
        }

        .oxo-aw-burger span {
          position: absolute;
          left: 0;
          height: 1px;
          background: #fff;
          transition: all .45s cubic-bezier(.16,1,.3,1);
        }

        .oxo-aw-burger span:first-child {
          top: 4px;
          width: 100%;
        }

        .oxo-aw-burger span:last-child {
          top: 11px;
          right: 0;
          left: auto;
          width: 72%;
        }

        .oxo-aw-toggle:hover .oxo-aw-burger span:last-child {
          width: 100%;
        }

        .oxo-aw-toggle.open .oxo-aw-burger span:first-child {
          top: 8px;
          transform: rotate(45deg);
        }

        .oxo-aw-toggle.open .oxo-aw-burger span:last-child {
          top: 8px;
          width: 100%;
          transform: rotate(-45deg);
        }

        /*
         * STESSO TENDALINO DEL FILE APPROVATO.
         * Nessuna classe .menu / .overlay del vecchio CSS.
         */
        .oxo-aw-menu {
          position: fixed !important;
          inset: 0 !important;

          width: 100vw !important;
          height: 100svh !important;

          z-index: 10010;

          margin: 0 !important;
          padding: 0 !important;

          display: block !important;

          overflow: hidden !important;

          transform: none !important;
          clip-path: none !important;

          background: #020203;
          color: #fff;

          visibility: hidden;
          opacity: 0;

          pointer-events: none;
        }

        .oxo-aw-curtains {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-columns: repeat(4,1fr);
        }

        .oxo-aw-curtain {
          position: relative;
          background:
            linear-gradient(
              180deg,
              rgba(255,255,255,.035),
              rgba(255,255,255,0)
            ),
            #050506;
          border-right: 1px solid rgba(255,255,255,.055);
          will-change: transform;
        }

        .oxo-aw-curtain::after {
          content: "";
          position: absolute;
          left: 50%;
          top: 0;
          width: 1px;
          height: 100%;
          background:
            linear-gradient(
              to bottom,
              transparent,
              var(--accent),
              transparent
            );
          opacity: .32;
        }

        .oxo-aw-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: .52;
          background-image:
            linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),
            linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
          background-size: 64px 64px;
          mask-image:
            linear-gradient(
              to bottom,
              transparent,
              black 10%,
              black 90%,
              transparent
            );
        }

        .oxo-aw-orb {
          position: absolute;
          left: 50%;
          top: 50%;
          width: min(62vw,760px);
          aspect-ratio: 1;
          border-radius: 50%;
          transform: translate(-50%,-50%);
          background:
            radial-gradient(circle at 38% 40%,rgba(53,216,255,.24),transparent 30%),
            radial-gradient(circle at 58% 48%,rgba(139,92,246,.20),transparent 42%),
            radial-gradient(circle at 50% 64%,rgba(255,79,216,.13),transparent 50%);
          filter: blur(18px);
          pointer-events: none;
        }

        .oxo-aw-ghost {
          position: absolute;
          left: 47%;
          top: 50%;
          transform: translate(-50%,-50%);
          font-size: clamp(180px,42vw,720px);
          line-height: .7;
          letter-spacing: -.12em;
          color: rgba(255,255,255,.024);
          pointer-events: none;
          user-select: none;
        }

        .oxo-aw-content {
          position: relative;
          z-index: 5;

          width: 100%;
          height: 100%;
          min-height: 100svh;

          padding:
            clamp(96px,10vh,132px)
            clamp(18px,4vw,70px)
            clamp(24px,5vh,52px);

          box-sizing: border-box;

          display: grid;
          grid-template-rows: auto 1fr auto;
        }

        .oxo-aw-top,
        .oxo-aw-bottom {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          font-size: 9px;
          letter-spacing: .28em;
          text-transform: uppercase;
          color: rgba(255,255,255,.42);
        }

        .oxo-aw-top {
          padding-bottom: 18px;
          border-bottom: 1px solid rgba(255,255,255,.14);
        }

        .oxo-aw-bottom {
          padding-top: 18px;
          align-items: flex-end;
          border-top: 1px solid rgba(255,255,255,.14);
        }

        .oxo-aw-links {
          align-self: center;
          padding: clamp(18px,3vh,42px) 0;
        }

        .oxo-aw-row {
          position: relative;
          display: grid;
          grid-template-columns: 34px minmax(0,1fr) auto;
          gap: clamp(12px,2vw,28px);
          align-items: center;
          min-height: clamp(82px,12vh,132px);
        }

        .oxo-aw-line {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background: rgba(255,255,255,.14);
        }

        .oxo-aw-index,
        .oxo-aw-meta {
          font-size: 9px;
          letter-spacing: .25em;
          color: rgba(255,255,255,.38);
          transition: color .3s ease;
        }

        .oxo-aw-link-mask {
          overflow: hidden;
          perspective: 1200px;
          padding-bottom: .08em;
        }

        .oxo-aw-link {
          position: relative;
          display: inline-block;
          color: #fff;
          text-decoration: none;
          text-transform: uppercase;
          font-size: clamp(52px,11vw,154px);
          line-height: .78;
          letter-spacing: -.055em;
          transition:
            transform .5s cubic-bezier(.16,1,.3,1),
            color .35s ease,
            letter-spacing .45s cubic-bezier(.16,1,.3,1);
        }

        .oxo-aw-link::after {
          content: attr(data-label);
          position: absolute;
          inset: 0;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,.16);
          transform: translate3d(0,16%,0);
          opacity: 0;
          transition: all .5s cubic-bezier(.16,1,.3,1);
        }

        .oxo-aw-row:hover .oxo-aw-link {
          color: var(--accent);
          transform: translateX(clamp(8px,1.5vw,24px));
          letter-spacing: -.035em;
          text-shadow: none;
          transform: translateX(clamp(8px,1.5vw,24px)) skewX(-3deg);
        }

        .oxo-aw-row:hover .oxo-aw-link::after {
          opacity: 1;
          transform: translate3d(-1.2vw,22%,0);
        }

        .oxo-aw-row:hover .oxo-aw-index,
        .oxo-aw-row:hover .oxo-aw-meta {
          color: var(--accent);
        }

        .oxo-aw-status {
          display: inline-flex;
          align-items: center;
          gap: 9px;
        }

        .oxo-aw-status::before {
          content: "";
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--oxo-green);
          box-shadow: none;
          animation: oxoAwPulse 1.8s ease-in-out infinite;
        }

        .oxo-aw-rail {
          position: absolute;
          right: clamp(18px,3vw,54px);
          top: 50%;
          width: 1px;
          height: 34vh;
          transform: translateY(-50%);
          background: rgba(255,255,255,.1);
          z-index: 6;
          display: none;
        }

        .oxo-aw-dot {
          position: absolute;
          left: 50%;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          transform: translate(-50%,-50%);
          transition:
            top .55s cubic-bezier(.16,1,.3,1),
            background-color .3s ease,
            box-shadow .3s ease;
        }

        .oxo-aw-toggle::before {
          content: "";
          position: absolute;
          inset: 5px;
          border-radius: 999px;
          border-top: 1px solid rgba(255,255,255,.78);
          border-right: 1px solid transparent;
          border-bottom: 1px solid rgba(255,255,255,.18);
          border-left: 1px solid transparent;
          transition: transform .65s cubic-bezier(.16,1,.3,1), opacity .3s ease;
          opacity: .65;
        }

        .oxo-aw-toggle:hover::before {
          transform: rotate(145deg);
          opacity: 1;
        }

        .oxo-aw-toggle.open::before {
          transform: rotate(225deg) scale(.92);
        }

        .oxo-aw-row::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width .5s cubic-bezier(.16,1,.3,1);
          opacity: .75;
        }

        .oxo-aw-row:hover::before {
          width: 26px;
        }

        .oxo-aw-row:hover .oxo-aw-index {
          transform: translateX(8px);
        }

        .oxo-aw-index,
        .oxo-aw-meta {
          transition: color .3s ease, transform .45s cubic-bezier(.16,1,.3,1);
        }

        .oxo-aw-link::before {
          content: attr(data-label);
          position: absolute;
          inset: 0;
          color: transparent;
          -webkit-text-stroke: 1px rgba(255,255,255,.13);
          transform: translate3d(1.4vw,-12%,0);
          opacity: 0;
          transition: opacity .4s ease, transform .5s cubic-bezier(.16,1,.3,1);
          pointer-events: none;
        }

        .oxo-aw-row:hover .oxo-aw-link::before {
          opacity: 1;
          transform: translate3d(-.8vw,-10%,0);
        }

        @keyframes oxoAwPulse {
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
          .oxo-aw-row {
            grid-template-columns:56px minmax(0,1fr) 100px;
          }

          .oxo-aw-rail {
            display:block;
          }

          .oxo-aw-index,
          .oxo-aw-meta,
          .oxo-aw-top,
          .oxo-aw-bottom {
            font-size:10px;
          }
        }

        @media (max-width:640px) {
          .oxo-aw-toggle {
            top: 14px;
            right: 14px;
          }

          .oxo-aw-curtains {
            grid-template-columns:repeat(2,1fr);
          }

          .oxo-aw-curtain:nth-child(3),
          .oxo-aw-curtain:nth-child(4) {
            display:none;
          }

          .oxo-aw-content {
            padding-left:16px;
            padding-right:16px;
          }

          .oxo-aw-top span:last-child {
            display:none;
          }

          .oxo-aw-row {
            grid-template-columns:26px minmax(0,1fr);
          }

          .oxo-aw-meta {
            display:none;
          }

          .oxo-aw-link {
            font-size:clamp(46px,16vw,82px);
          }

          .oxo-aw-orb {
            width:100vw;
          }
        }

        @media (prefers-reduced-motion:reduce) {
          .oxo-aw-menu *,
          .oxo-aw-toggle * {
            animation:none!important;
            transition-duration:.01ms!important;
          }
        }
      `}</style>

      <button
        type="button"
        className={`oxo-aw-toggle ${open ? "open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Chiudi menu" : "Apri menu"}
      >
        <span className="oxo-aw-toggle-ring" />
        <span className="oxo-aw-burger">
          <span />
          <span />
        </span>
      </button>

      <div
        ref={menuRef}
        className="oxo-aw-menu"
        aria-hidden={!open}
      >
        <div className="oxo-aw-curtains" aria-hidden="true">
          {NAV_ITEMS.map((item) => (
            <div
              key={item.index}
              data-curtain
              className="oxo-aw-curtain"
              style={{ "--accent": item.accent }}
            />
          ))}
        </div>

        <div className="oxo-aw-grid" aria-hidden="true" />

        <div
          data-menu-orb
          className="oxo-aw-orb"
          aria-hidden="true"
        />

        <div
          data-menu-ghost
          className="oxo-aw-ghost antonio2"
          aria-hidden="true"
        >
          OXO
        </div>

        <div className="oxo-aw-content">
          <div data-menu-top className="oxo-aw-top antonio2">
            <span>OXO STUDIO® / CREATIVE TECHNOLOGY</span>
            <span>LA SPEZIA / ITALY</span>
          </div>

          <nav className="oxo-aw-links" aria-label="Menu principale">
            {NAV_ITEMS.map((item, index) => (
              <div
                key={item.to}
                className="oxo-aw-row"
                style={{ "--accent": item.accent }}
                onPointerEnter={() => setHoveredIndex(index)}
              >
                <span data-menu-meta className="oxo-aw-index antonio2">
                  {item.index}
                </span>

                <div className="oxo-aw-link-mask">
                  <Link
                    data-menu-link
                    to={item.to}
                    data-label={item.label}
                    className="oxo-aw-link antonio2 ombra2"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                </div>

                <span data-menu-meta className="oxo-aw-meta antonio2">
                  {item.meta}
                </span>

                <span data-menu-line className="oxo-aw-line" />
              </div>
            ))}
          </nav>

          <div data-menu-bottom className="oxo-aw-bottom antonio2">
            <span className="oxo-aw-status">SYSTEM ONLINE</span>
            <span>SOFTWARE / AI / WEB / GAME</span>
          </div>
        </div>

        <div className="oxo-aw-rail" aria-hidden="true">
          <span
            className="oxo-aw-dot"
            style={{
              top: `${12 + hoveredIndex * 25.3}%`,
              backgroundColor: NAV_ITEMS[hoveredIndex].accent,
              boxShadow: `0 0 24px ${NAV_ITEMS[hoveredIndex].accent}`,
            }}
          />
        </div>
      </div>
    </>
  );
}