// OXO_KAIROS_SCULTOREO_V8
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/avant-legato.css";
import "./oxo-catalogo-hero.css";
gsap.registerPlugin(ScrollTrigger);
function useCatalogoHero(ref) {
  useLayoutEffect(() => {
    const hero = ref.current;
    if (!hero) return;
    const mm = gsap.matchMedia();

    mm.add({
      wide: '(min-width:1024px)',
      small: '(max-width:1023px)',
      fine: '(hover:hover) and (pointer:fine)',
      reduce: '(prefers-reduced-motion:reduce)'
    }, ({ conditions: c }) => {
      if (c.reduce) return;

      const q = s => hero.querySelectorAll(s);
      const stage = hero.querySelector('.oc8-depth');
      const tilt = hero.querySelector('.oc8-tilt');
      const glow = hero.querySelector('.oc8-light');
      const arrow = hero.querySelector('.oc8-link span');
      const link = hero.querySelector('.oc8-link');
      const layers = q('.oc8-slice');
      const planes = q('.oc8-plane');

      if (!stage || !tilt || !glow || !arrow || !link) return;

      const intro = gsap.timeline({
        defaults: { ease: 'expo.out' }
      });

      intro.fromTo(
        q('.oc8-curtain'),
        { scaleY: 1 },
        {
          scaleY: 0,
          transformOrigin: '50% 0%',
          stagger: .055,
          duration: .85
        },
        0
      );

      intro.from(layers, {
        xPercent: i => i % 2 ? -105 : 105,
        duration: 1.25,
        stagger: .09
      }, .12);

      intro.from(q('.oc8-enter'), {
        y: 28,
        opacity: 0,
        duration: .9,
        stagger: .08
      }, .4);

      intro.from(stage, {
        rotateY: -28,
        rotateX: 14,
        scale: .78,
        opacity: 0,
        duration: 1.4
      }, .22);

      intro.from(planes, {
        x: i => (i - 1) * 60,
        opacity: 0,
        duration: 1,
        stagger: .1
      }, .48);

      // Ingresso e scorrimento agiscono su proprietà separate.
      
      // Prima le card si aprono; poi l'apertura lascia lo schermo.
      const scena = hero.querySelector('.oc8-scene');

      const journey = gsap.timeline({
        scrollTrigger: {
          id: 'catalogo-apertura-card',
          trigger: hero,

          start: () => {
            const altezza = window.innerHeight;
            const eccedenza = Math.max(
              0, hero.offsetHeight - altezza
            );

            // Negli schermi piccoli, fermiamo la sezione
            // quando le card sono interamente visibili.
            const centro = scena
              ? Math.max(0, (altezza - scena.offsetHeight) / 2)
              : 0;

            const anticipo = scena
              ? Math.min(
                  eccedenza,
                  Math.max(0, scena.offsetTop - centro)
                )
              : 0;

            return 'clamp(top+=' +
              Math.round(anticipo) + ' top)';
          },

          end: () => '+=' +
            Math.round(window.innerHeight * 1.25),

          pin: true,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 2,

          onUpdate: self => {
            // Uno scroll immediato non deve trovare
            // le card ancora invisibili.
            if (self.progress > 0 && intro.progress() < 1) {
              intro.progress(1).pause();
            }
          }
        }
      });

      journey.to(planes, {
        z: i => 80 + i * 100,
        xPercent: i => (i - 1) * (c.wide ? 30 : 8),
        rotationZ: i => (i - 1) * 12,
        duration: 0.8,
        ease: 'none'
      }, 0);

      // Card completamente aperte all'80% del tratto.
      // L'ultimo 20% le mantiene in vista prima di scendere.
      // Titolo e descrizione restano fermi.
      journey.fromTo(
        q('.oc8-progress'),
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'none'
        },
        0
      );

      const off = [];


      if (c.fine) {
        const rx = gsap.quickTo(tilt, 'rotationX', {
          duration: .7, ease: 'power3.out'
        });
        const ry = gsap.quickTo(tilt, 'rotationY', {
          duration: .7, ease: 'power3.out'
        });
        const gx = gsap.quickTo(glow, 'x', {
          duration: .6, ease: 'power3.out'
        });
        const gy = gsap.quickTo(glow, 'y', {
          duration: .6, ease: 'power3.out'
        });
        const ax = gsap.quickTo(arrow, 'x', { duration: .4 });
        const ay = gsap.quickTo(arrow, 'y', { duration: .4 });

        const move = e => {
          if (e.pointerType === 'touch') return;

          const r = hero.getBoundingClientRect();
          const x = Math.max(
            0, Math.min(r.width, e.clientX - r.left)
          );
          const y = Math.max(
            0, Math.min(r.height, e.clientY - r.top)
          );

          rx((.5 - y / r.height) * 12);
          ry((x / r.width - .5) * 18);
          gx(x);
          gy(y);
        };

        const reset = () => {
          rx(0);
          ry(0);
        };

        const magnetic = e => {
          const r = link.getBoundingClientRect();

          ax(Math.max(-9, Math.min(
            9, (e.clientX - r.left - r.width / 2) * .12
          )));
          ay(Math.max(-5, Math.min(
            5, (e.clientY - r.top - r.height / 2) * .18
          )));
        };

        const resetArrow = () => {
          ax(0);
          ay(0);
        };

        [
          [hero, 'pointermove', move],
          [hero, 'pointerleave', reset],
          [link, 'pointermove', magnetic],
          [link, 'pointerleave', resetArrow]
        ].forEach(([el, event, fn]) => {
          el.addEventListener(event, fn, { passive: true });
          off.push(() => el.removeEventListener(event, fn));
        });
      }

      return () => off.forEach(fn => fn());
    }, hero);

    return () => mm.revert();
  }, [ref]);
}
export default function OxoCatalogoHero(){
 const ref = useRef(null);
 useCatalogoHero(ref);
 return (<section
  ref={ref}
  className="oc8-hero"
  aria-label="Catalogazione bibliografica con Kairos Archive"
>
  <div className="oc8-light" aria-hidden="true" />

  <div className="oc8-curtains" aria-hidden="true">
    {[0,1,2,3,4,5].map(n => (
      <span key={n} className="oc8-curtain" />
    ))}
  </div>

  <div className="oc8-copy">
    <p className="oc8-enter oc8-eyebrow">
      OXO STUDIO / PATRIMONIO CULTURALE
    </p>

    <h1
      className="avant-legato-font"
      aria-label="Kairos Archive. Catalogazione bibliografica."
    >
      <span className="oc8-word" aria-hidden="true">
        <span className="oc8-outline">KAIROS.</span>

        {[0,1,2].map(n => (
          <span
            className="oc8-slice"
            key={n}
            style={{
              clipPath:
                'inset(' + (n * 33.333) + '% 0 ' +
                ((2 - n) * 33.333) + '% 0)'
            }}
          >
            KAIROS.
          </span>
        ))}
      </span>

      <span
        className="oc8-enter oc8-subtitle"
        aria-hidden="true"
      >
        ARCHIVE.<br />CATALOGAZIONE.
      </span>
    </h1>

    <p className="oc8-enter oc8-description">
      Dai frontespizi alle schede. Kairos Archive collega acquisizione dei dati, verifica bibliografica, inventari e collocazioni, mantenendo il controllo professionale al centro del lavoro.
    </p>

    <a
      className="oc8-enter oc8-link"
      href="#kairos-pannello"
    >
      Esplora la catalogazione
      <span aria-hidden="true">↗</span>
    </a>
  </div>

  <div className="oc8-scene" aria-hidden="true">
    <div className="oc8-depth">
      <div className="oc8-tilt">
        <div className="oc8-portals">
          {[0,1,2,3,4].map(n => (
            <i
              key={n}
              style={{
                inset: (n * 7) + '%',
                transform: 'translateZ(' + (-n * 45) + 'px)'
              }}
            />
          ))}
        </div>

        <div className="oc8-plane oc8-plane-back">
          <small>01 / ACQUISIRE</small>
          <strong className="avant-legato-font">
            FRONTESPIZI
          </strong>
          <span>Documenti e dati di partenza</span>
        </div>

        <div className="oc8-plane oc8-plane-middle">
          <small>02 / VERIFICARE</small>
          <strong className="avant-legato-font">
            SCHEDE
          </strong>
          <span>Riscontri e controllo professionale</span>
        </div>

        <div className="oc8-plane oc8-plane-front">
          <small>03 / ORGANIZZARE</small>
          <strong className="avant-legato-font">CATALOGHI</strong>
          <span>Inventari, collocazioni e ricerca</span>
        </div>
      </div>
    </div>

    <p className="oc8-scene-note">
      DAL DOCUMENTO ALLA CONOSCENZA.
    </p>
  </div>

  <div className="oc8-footer">
    <p>BIBLIOTECHE · ARCHIVI · COLLEZIONI</p>
    <span>SCORRI PER ESPLORARE ↓</span>
    <i className="oc8-progress" aria-hidden="true" />
  </div>
</section>);
}
