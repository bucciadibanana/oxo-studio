/**
 * SCULTOREO — file unico.
 * JSX, CSS e animazioni sono contenuti qui; non importa ScultoreoHero
 * né scultoreo-studio.css. Può sostituire integralmente ScultoreoStudio.jsx.
 * Dipendenze del sito: React 18, react-router-dom, GSAP + ScrollTrigger.
 * Riutilizza le fotografie già presenti in public/img/scultoreo/.
 * Nessuna dashboard, nessuna chiamata a banche dati o servizi diagnostici.
 * Fotografie di riferimento: non attestano dotazioni o attività di OXO.
 */
import React, { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FOTO = [
  {
    id: 'rilievo-3d', sigla: '01 / RILIEVO TRIDIMENSIONALE',
    titolo: 'La forma, prima di ogni intervento.',
    immagine: '/img/scultoreo/strumento-3d.jpg',
    alt: 'Scanner a luce strutturata DAVID SLS-2, con proiettore e fotocamera.',
    didascalia: 'Scanner DAVID SLS-2: esempio fotografico di strumentazione 3D, non Artec.',
    autore: 'Creative Tools', licenza: 'CC BY 2.0', licenzaUrl: 'https://creativecommons.org/licenses/by/2.0/',
    fonte: 'https://commons.wikimedia.org/wiki/File:DAVID_SLS-2_Bild01.jpg',
    testo: 'Il rilievo tridimensionale documenta volumi, dettagli e superfici della scultura. Nel percorso previsto con scanner Artec, i modelli vengono associati alla campagna di acquisizione e alla storia del bene.',
    cura: 'Un riferimento geometrico permette di pianificare nuove acquisizioni e confrontare nel tempo le zone di interesse. Allineamento, scala e condizioni di rilievo devono essere controllati.',
    limite: 'Una differenza tra scansioni non dimostra da sola un deterioramento: va confrontata con l’incertezza di misura. Il rilievo 3D non identifica la composizione chimica.'
  },
  {
    id: 'luce-uv', sigla: '02 / OSSERVAZIONE DELLE SUPERFICI',
    titolo: 'La luce rivela altre tracce.',
    immagine: '/img/scultoreo/lampada-uv.jpg',
    alt: 'Fotografia di una lampada ultravioletta portatile.',
    didascalia: 'Lampada UV portatile: fotografia di riferimento della tipologia, non prescrizione d’impiego.',
    autore: 'Hannes Grobe', licenza: 'CC BY-SA 3.0', licenzaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    fonte: 'https://commons.wikimedia.org/wiki/File:UV-handlamp_hg.jpg',
    testo: 'La fluorescenza visibile indotta da UV aiuta a osservare disomogeneità della superficie, alcune vernici e possibili ritocchi. La lettura viene confrontata con fotografie nel visibile e documentazione degli interventi precedenti.',
    cura: 'Fotografare le stesse aree in condizioni documentate aiuta a conservare una memoria delle osservazioni e a orientare gli approfondimenti sulle policromie e sui rivestimenti.',
    limite: 'La risposta UV non identifica un materiale in modo univoco. Banda, filtri ed esposizione vengono scelti sul bene: non tutte le lampade o modalità sono adatte alla conservazione.'
  },
  {
    id: 'analisi-xrf', sigla: '03 / STUDIO DEI MATERIALI',
    titolo: 'La materia lascia una firma.',
    immagine: '/img/scultoreo/analisi-xrf.jpg',
    alt: 'Strumentazione micro-XRF utilizzata in un laboratorio di scienza della conservazione.',
    didascalia: 'Micro-XRF in un laboratorio di conservazione. Scena documentativa, non attività OXO.',
    autore: 'RichardMcCoy', licenza: 'CC BY-SA 3.0', licenzaUrl: 'https://creativecommons.org/licenses/by-sa/3.0/',
    fonte: 'https://commons.wikimedia.org/wiki/File:IMA_Conservation_Science_XRF_2.jpg',
    testo: 'La fluorescenza a raggi X fornisce informazioni sugli elementi chimici rilevabili nei punti esaminati. Il confronto con il contesto dell’opera può contribuire allo studio di leghe, pigmenti e prodotti di alterazione.',
    cura: 'I risultati vengono associati alla posizione di misura e interpretati insieme alle osservazioni della superficie. Raman e FTIR possono completare lo studio dei composti e dei materiali organici.',
    limite: 'XRF non è una radiografia e non identifica ogni composto. Strati sovrapposti, limiti strumentali e sicurezza radiologica fanno parte della valutazione specialistica.'
  },
  {
    id: 'termografia', sigla: '04 / RISPOSTA TERMICA',
    titolo: 'Osservare il comportamento della superficie.',
    immagine: '/img/scultoreo/termocamera.jpg',
    alt: 'Termocamera FLIR E8 fotografata di lato.',
    didascalia: 'Termocamera FLIR E8: esempio reale di strumentazione, non un termogramma di una nostra opera.',
    autore: 'Asurnipal', licenza: 'CC BY-SA 4.0', licenzaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    fonte: 'https://commons.wikimedia.org/wiki/File:Flir_E8-Thermal_imaging_camera-Thermographic_camera-03ASD.jpg',
    testo: 'La termografia documenta la risposta termica della superficie. In condizioni appropriate, le anomalie possono orientare lo studio di discontinuità e fenomeni conservativi da verificare con altre osservazioni.',
    cura: 'Termogrammi, immagini nel visibile e condizioni ambientali vengono letti insieme. Le acquisizioni ripetute richiedono procedure confrontabili, non soltanto immagini dai colori diversi.',
    limite: 'Emissività e riflessi influenzano la lettura. La termografia non misura direttamente l’umidità e non vede automaticamente dentro la scultura; un’eventuale sollecitazione termica va valutata sul bene.'
  }
];

const PAROLE = ['RILIEVO', 'LUCE', 'MATERIA', 'CALORE'];
const PIANI = [
  ['01 / CONOSCERE', 'RILIEVO 3D', 'La geometria dell’opera'],
  ['02 / OSSERVARE', 'LUCE UV', 'La lettura delle superfici'],
  ['03 / STUDIARE', 'MATERIA', 'Lo studio dei materiali'],
];

const CONTROLLI = [
  ['Conoscenza iniziale', 'Materiali, tecniche esecutive, fotografie e interventi precedenti costruiscono il riferimento da cui partire.'],
  ['Osservazioni confrontabili', 'Date, zone esaminate e condizioni di acquisizione rendono interpretabile il confronto tra campagne diverse.'],
  ['Controlli mirati', 'Movimentazioni, microclima, luce e fragilità dell’opera orientano gli approfondimenti e i controlli successivi.'],
];

// Solo i quattro percorsi dichiarati nel file: nessun URL ricevuto dagli utenti.
const immagineCss = (src) => `url(${JSON.stringify(src)})`;

function useScultoreoHero(ref) {
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
      const stage = hero.querySelector('.osc-depth');
      const tilt = hero.querySelector('.osc-tilt');
      const glow = hero.querySelector('.osc-light');
      const arrow = hero.querySelector('.osc-link span');
      const link = hero.querySelector('.osc-link');
      const layers = q('.osc-slice');
      const planes = q('.osc-plane');

      if (!stage || !tilt || !glow || !arrow || !link) return;

      const intro = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: hero, start: 'top 90%', once: true }
      });

      intro.fromTo(
        q('.osc-curtain'),
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

      intro.from(q('.osc-enter'), {
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
      const scena = hero.querySelector('.osc-scene');

      const journey = gsap.timeline({
        scrollTrigger: {
          id: 'scultoreo-apertura-card',
          trigger: hero,

          start: () => {
            const top = 84;
            const available = Math.max(1, window.innerHeight - top);
            const excess = Math.max(0, hero.offsetHeight - available);
            const shift = scena
              ? Math.min(excess, Math.max(0, scena.offsetTop - Math.max(0, (available - scena.offsetHeight) / 2)))
              : 0;
            return 'clamp(top+=' + Math.round(shift) + ' ' + top + 'px)';
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
        z: i => c.wide ? 80 + i * 100 : 25 + i * 40,
        xPercent: i => (i - 1) * (c.wide ? 30 : 8),
        rotationZ: i => (i - 1) * 12,
        duration: 0.8,
        ease: 'none'
      }, 0);

      // Card completamente aperte all'80% del tratto.
      // L'ultimo 20% le mantiene in vista prima di scendere.
      // Titolo e descrizione restano fermi.
      journey.fromTo(
        q('.osc-progress'),
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

/**
 * Le animazioni delle sezioni non cambiano mai il filtro fotografico:
 * il bianco e nero rimane attivo a ogni posizione dello scroll.
 */
function useSezioniScultoreo(ref, fullWidth) {
  useLayoutEffect(() => {
    const page = ref.current;
    if (!page) return undefined;
    let mounted = true;
    let timer = 0;
    let lastWidth = 0;
    const previousWidth = page.style.getPropertyValue('--osc-viewport');
    const imageLoaders = [];

    const aggiornaLarghezza = () => {
      if (!fullWidth) return;
      const width = document.documentElement.clientWidth;
      if (width !== lastWidth) {
        lastWidth = width;
        page.style.setProperty('--osc-viewport', `${width}px`);
      }
    };
    aggiornaLarghezza();

    const refresh = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (!mounted) return;
        aggiornaLarghezza();
        ScrollTrigger.refresh();
      }, 140);
    };

    // Verifica dei file senza inserire fotografie nel flusso della pagina.
    // Lo sfondo visibile rimane un background-image CSS, non un <img>.
    FOTO.forEach((foto) => {
      const image = new Image();
      image.onload = () => {
        if (!mounted) return;
        const note = page.querySelector(`[data-asset-error="${foto.id}"]`);
        if (note) note.hidden = true;
      };
      image.onerror = () => {
        if (!mounted) return;
        const note = page.querySelector(`[data-asset-error="${foto.id}"]`);
        if (note) note.hidden = false;
      };
      image.src = foto.immagine;
      imageLoaders.push(image);
    });

    const mm = gsap.matchMedia();
    mm.add({
      reduce: '(prefers-reduced-motion:reduce)',
      wide: '(min-width:1024px)',
      compact: '(max-width:1023px)',
    }, ({ conditions }) => {
      if (conditions.reduce) return;
      page.querySelectorAll('[data-osc-story]').forEach((row, index) => {
        const title = row.querySelector('[data-osc-title]');
        const copy = row.querySelector('[data-osc-copy]');
        const motionLayer = row.querySelector('[data-osc-photo-motion]');
        const word = row.querySelector('[data-osc-word]');
        const side = index % 2 === 0 ? -1 : 1;

        if (title) gsap.from(title, {
          y: 38, opacity: 0, rotateX: -16,
          transformPerspective: 1100, transformOrigin: '50% 100%',
          duration: 1.05, ease: 'power4.out',
          scrollTrigger: { trigger: row, start: 'top 80%', once: true },
        });
        if (copy) gsap.from(copy, {
          y: 22, opacity: 0, duration: .9, ease: 'power3.out',
          scrollTrigger: { trigger: copy, start: 'top 92%', once: true },
        });
        if (motionLayer) gsap.fromTo(motionLayer, {
          yPercent: -3, scale: 1.04,
        }, {
          yPercent: 3, scale: 1.10, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: .7 },
        });
        if (word) gsap.fromTo(word, { xPercent: -side * 3 }, {
          xPercent: side * 5, ease: 'none',
          scrollTrigger: { trigger: row, start: 'top bottom', end: 'bottom top', scrub: 1 },
        });
      });

      const care = page.querySelector('.osc-care');
      if (care) {
        gsap.from(care.querySelectorAll('[data-osc-reveal]'), {
          y: 35, opacity: 0, duration: .9, stagger: .12, ease: 'power4.out',
          scrollTrigger: { trigger: care, start: 'top 76%', once: true },
        });
      }
    }, page);

    const onResize = () => {
      // Ignora la sola variazione della barra del browser sui telefoni.
      if (document.documentElement.clientWidth !== lastWidth) refresh();
    };
    window.addEventListener('resize', onResize, { passive: true });
    page.addEventListener('toggle', refresh, true);
    document.fonts?.ready.then(() => { if (mounted) refresh(); });
    refresh();

    return () => {
      mounted = false;
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      page.removeEventListener('toggle', refresh, true);
      imageLoaders.forEach((image) => { image.onload = null; image.onerror = null; });
      mm.revert();
      if (previousWidth) page.style.setProperty('--osc-viewport', previousWidth);
      else page.style.removeProperty('--osc-viewport');
    };
  }, [ref, fullWidth]);
}

/**
 * embedded=true: utilizzabile al posto di ScultoreoStudio in Archeologia.
 * embedded=false: utilizzabile come pagina autonoma nel router.
 * fullWidth=false: disattiva l'espansione fuori dal contenitore del genitore.
 */
export default function Scultoreo({ embedded = true, fullWidth = true }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  useSezioniScultoreo(pageRef, fullWidth);
  useScultoreoHero(heroRef);
  const Root = embedded ? 'section' : 'main';
  const Heading = embedded ? 'h2' : 'h1';
  const CareHeading = embedded ? 'h3' : 'h2';

  return (
    <Root
      ref={pageRef}
      id="scultoreo"
      className={`oxo-scultoreo${fullWidth ? ' osc-full-width' : ''}`}
      aria-labelledby="scultoreo-titolo"
    >
      <style>{SCULTOREO_CSS}</style>

      <section ref={heroRef} className="osc-hero" aria-label="Studio e conservazione delle sculture">
        <div className="osc-light" aria-hidden="true" />
        <div className="osc-curtains" aria-hidden="true">
          {[0, 1, 2, 3, 4, 5].map((n) => <span key={n} className="osc-curtain" />)}
        </div>

        <div className="osc-copy">
          <p className="osc-enter osc-eyebrow">OXO STUDIO / SCULTOREO</p>
          <Heading className="osc-title" id="scultoreo-titolo" aria-label="Scultoreo. Studio e conservazione.">
            <span className="osc-word" aria-hidden="true">
              <span className="osc-outline">FORMA.</span>
              {[0, 1, 2].map((n) => (
                <span
                  key={n}
                  className="osc-slice"
                  style={{ clipPath: `inset(${n * 33.333}% 0 ${(2 - n) * 33.333}% 0)` }}
                >FORMA.</span>
              ))}
            </span>
            <span className="osc-enter osc-subtitle" aria-hidden="true">STUDIO E<br />CONSERVAZIONE.</span>
          </Heading>
          <p className="osc-enter osc-description">
            Scanner, luce e analisi dei materiali per documentare le sculture
            e seguirne lo stato nel tempo. Un percorso di studio al fianco
            di conservatori e restauratori.
          </p>
          <a className="osc-enter osc-link" href="#scultoreo-strumenti">
            Esplora gli strumenti <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="osc-scene" aria-hidden="true">
          <div className="osc-depth">
            <div className="osc-tilt">
              <div className="osc-portals">
                {[0, 1, 2, 3, 4].map((n) => (
                  <i key={n} style={{ inset: `${n * 7}%`, transform: `translateZ(${-n * 45}px)` }} />
                ))}
              </div>
              {PIANI.map(([eyebrow, title, caption], index) => (
                <div key={title} className={`osc-plane osc-plane-${['back', 'middle', 'front'][index]}`}>
                  <div className="osc-plane-background" style={{ backgroundImage: immagineCss(FOTO[index].immagine) }} />
                  <div className="osc-plane-shade" />
                  <small>{eyebrow}</small>
                  <strong>{title}</strong>
                  <span>{caption}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="osc-scene-note">SCANSIONE / OSSERVAZIONE / CONSERVAZIONE</p>
        </div>

        <div className="osc-footer">
          <p>SCULTOREO · STUDIO · CURA DELLE OPERE</p>
          <span>SCORRI PER ESPLORARE ↓</span>
          <i className="osc-progress" aria-hidden="true" />
        </div>
      </section>

      <p className="osc-reference">
        Fotografie reali di riferimento: gli strumenti e il laboratorio raffigurati
        non sono presentati come dotazioni, partner o interventi di OXO Studio.
      </p>

      <div id="scultoreo-strumenti" className="osc-stories">
        {FOTO.map((item, index) => (
          <article
            key={item.id}
            id={`scultoreo-${item.id}`}
            className={`osc-story${index % 2 ? ' osc-story-reverse' : ''}`}
            data-osc-story
            aria-labelledby={`scultoreo-${item.id}-titolo`}
          >
            {/* Livelli assoluti di sfondo: nessun img, figure o riquadro nel layout. */}
            <div className="osc-photo-mask" aria-hidden="true">
              <div className="osc-photo-motion" data-osc-photo-motion>
                <div className="osc-photo-background" style={{ backgroundImage: immagineCss(item.immagine) }} />
              </div>
            </div>
            <div className="osc-photo-shade" aria-hidden="true" />
            <div className="osc-story-grid" aria-hidden="true" />
            <span className="osc-ghost-word" data-osc-word aria-hidden="true">{PAROLE[index]}</span>
            <span className="osc-story-line" aria-hidden="true" />

            <div className="osc-story-body">
              <header className="osc-story-heading">
                <p className="osc-eyebrow">{item.sigla}</p>
                <h3 id={`scultoreo-${item.id}-titolo`} data-osc-title>{item.titolo}</h3>
              </header>
              <div className="osc-story-copy" data-osc-copy>
                <p>{item.testo}</p>
                <h4>Per la cura dell’opera</h4>
                <p>{item.cura}</p>
                <details className="osc-limits">
                  <summary>Criteri di interpretazione</summary>
                  <p>{item.limite}</p>
                </details>
                <p className="osc-credit">
                  <span>{item.didascalia}</span>
                  Foto: <a href={item.fonte} target="_blank" rel="noopener noreferrer">{item.autore}</a>
                  {' · '}<a href={item.licenzaUrl} target="_blank" rel="noopener noreferrer">{item.licenza}</a>
                  {' · '}Presentazione in bianco e nero, sfumata e ritagliata; originale invariato.
                </p>
                <p className="osc-asset-error" data-asset-error={item.id} role="status" hidden>
                  Fotografia non disponibile: controlla <code>public{item.immagine}</code>.
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="osc-care" aria-labelledby="scultoreo-cura">
        <span className="osc-care-ghost" aria-hidden="true">CONSERVARE.</span>
        <p className="osc-eyebrow" data-osc-reveal>CONSERVAZIONE PREVENTIVA / MANUTENZIONE PROGRAMMATA</p>
        <CareHeading id="scultoreo-cura" data-osc-reveal>
          NON SOLO ACQUISIRE.<br /><span>TORNARE A OSSERVARE.</span>
        </CareHeading>
        <p className="osc-care-lead" data-osc-reveal>
          Lo studio dei materiali e la storia conservativa guidano il programma dei controlli.
          Frequenza e priorità dipendono dal bene, dalla sua collocazione e dai rischi rilevati.
        </p>
        <div className="osc-care-columns">
          {CONTROLLI.map(([title, text], index) => (
            <div key={title} data-osc-reveal>
              <span className="osc-step-number">0{index + 1}</span>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          ))}
        </div>
        <p className="osc-care-note">
          Raman e FTIR completano, quando appropriato, lo studio dei materiali.
          Strumenti, modalità di misura, eventuali contatti o prelievi e interventi
          vengono concordati con i professionisti e autorizzati quando necessario.
          La scelta di una tecnica non equivale alla sua disponibilità già operativa presso OXO.
        </p>
        <Link to="/contatti" className="osc-contact">
          Parliamo della tua opera <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </Root>
  );
}

const SCULTOREO_CSS = String.raw`
/* MUSEI_V6: effetti circoscritti all’apertura. */
.osc-hero{position:relative;isolation:isolate;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:2vw;min-height:100svh;padding:126px 5vw 110px;overflow:hidden;background:#020203;color:#f8f6ff}
.osc-hero:before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;background:linear-gradient(115deg,transparent 20%,#8b5cf60d,transparent 75%),repeating-linear-gradient(90deg,transparent 0 calc(20% - 1px),#ffffff08 calc(20% - 1px) 20%)}
.osc-light{position:absolute;left:0;top:0;width:650px;height:650px;margin:-325px;pointer-events:none;z-index:0;background:radial-gradient(ellipse,#8b5cf624,transparent 68%)}
.osc-curtains{display:flex;position:absolute;inset:0;pointer-events:none;z-index:10}
.osc-curtain{flex:1;transform:scaleY(0);background:#131019;border-right:1px solid #2c253d}
.osc-copy{position:relative;z-index:3;min-width:0}
.osc-eyebrow{font-size:10px;letter-spacing:.28em;color:#76d9ed}
.osc-copy .osc-title{margin:22px 0 25px;font-weight:400}
.osc-word{position:relative;display:block;width:fit-content;font-size:clamp(80px,12.2vw,190px);line-height:1.05;letter-spacing:-.065em;white-space:nowrap;overflow:hidden;padding-right:.07em}
.osc-outline{color:transparent;-webkit-text-stroke:1px #a99cbd77}
.osc-slice{position:absolute;inset:0;color:#f5f1fc;will-change:transform}
.osc-subtitle{display:block;margin-top:10px;font-size:clamp(25px,3.45vw,54px);line-height:1.12;letter-spacing:-.025em;color:#c1acef}
.osc-description{max-width:590px;font-size:clamp(17px,1.35vw,22px);line-height:1.65;color:#b5b0bf}
.osc-link{display:inline-flex;align-items:center;gap:24px;padding:15px 0 12px;border-bottom:1px solid #9777c9;margin-top:23px;font-size:12px;color:#fff;text-decoration:none}
.osc-link span{display:grid;place-items:center;width:45px;height:45px;border:1px solid #665278;border-radius:50%;font-size:22px}
.osc-hero a:focus-visible{outline:2px solid #35d8ff;outline-offset:7px}
.osc-scene{position:relative;height:490px;min-width:0;perspective:1300px;z-index:2}
.osc-depth,.osc-tilt{position:absolute;inset:0;transform-style:preserve-3d}
.osc-portals{position:absolute;inset:20px 0 20px -15px;transform-style:preserve-3d;transform:rotateY(-16deg) rotateX(7deg)}
.osc-portals i{position:absolute;border:1px solid #7e639b55;box-shadow:inset 0 0 35px #8b5cf608;clip-path:polygon(0 0,88% 0,100% 12%,100% 100%,12% 100%,0 88%)}
.osc-portals i:nth-child(2n){border-color:#35d8ff38}
.osc-plane{position:absolute;display:flex;flex-direction:column;justify-content:flex-end;gap:16px;width:70%;height:220px;padding:24px;border:1px solid #635074;background:linear-gradient(130deg,#292035fa,#0c0d16fc);box-shadow:8px 20px 50px #0009;transform-style:preserve-3d;backface-visibility:hidden}
.osc-plane:before{content:'';position:absolute;inset:9px;border:1px solid #ffffff09;pointer-events:none}
.osc-plane small{position:absolute;left:24px;top:24px;font-size:9px;letter-spacing:.24em;color:#c8b4e7}
.osc-plane strong{font-size:clamp(18px,1.85vw,29px);line-height:1;letter-spacing:-.04em;font-weight:400}
.osc-plane>span{font-size:10px;color:#b5aebe}
.osc-plane-back{left:4%;top:9%;transform:rotateY(-18deg) rotateZ(-9deg);border-color:#686095}
.osc-plane-middle{left:16%;top:29%;transform:translateZ(35px) rotateY(-10deg);background:linear-gradient(130deg,#173038fa,#0e1020fc);border-color:#3e6e81}
.osc-plane-front{left:26%;top:48%;transform:translateZ(70px) rotateY(-6deg) rotateZ(9deg);border-color:#825279;background:linear-gradient(130deg,#322134fa,#15101cfc)}
.osc-scene-note{position:absolute;bottom:-35px;left:10%;font-size:8px;letter-spacing:.27em;color:#b1a2c1}
.osc-footer{position:absolute;bottom:30px;left:5vw;right:5vw;display:flex;justify-content:space-between;gap:16px;padding-top:18px;border-top:1px solid #ffffff22;font-size:9px;letter-spacing:.19em;color:#a199ae}
.osc-progress{position:absolute;top:-1px;left:0;width:100%;height:1px;background:linear-gradient(90deg,#35d8ff,#a78bfa,#ff4fd8);transform:scaleX(0);transform-origin:left}
@media(max-width:1023px){
  .osc-hero{grid-template-columns:1fr;padding-top:115px;gap:38px}
  .osc-word{font-size:clamp(85px,19vw,170px)}
  .osc-subtitle{font-size:clamp(28px,5vw,48px)}
  .osc-scene{width:min(540px,100%);height:440px;margin:0 auto 30px}
  .osc-plane strong{font-size:26px}
  .osc-plane{height:190px}
  .osc-plane-front{left:23%}
  .osc-scene-note{bottom:-16px}
}
@media(max-width:479px){
  .osc-hero{padding:110px 6vw 100px;gap:32px}
  .osc-word{font-size:23vw}
  .osc-eyebrow{font-size:8px;letter-spacing:.18em}
  .osc-description{font-size:16px}
  .osc-scene{height:340px}
  .osc-plane{height:154px;padding:17px;gap:12px}
  .osc-plane small{left:17px;top:18px;font-size:7px;letter-spacing:.1em}
  .osc-plane strong{font-size:clamp(16px,5vw,21px)}
  .osc-plane>span{font-size:8px}
  .osc-footer{font-size:7px;letter-spacing:.1em;line-height:1.7}
  .osc-footer span{max-width:95px;text-align:right}
  .osc-scene-note{font-size:7px}
}
@media(hover:none){.osc-light{display:none}}
@media(prefers-reduced-motion:reduce){
  .osc-curtains,.osc-light{display:none}
  .osc-hero *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .osc-slice{will-change:auto}
}


/* Stili isolati: non riutilizzano s9-, s10-, sc11- o le classi gestionali. */
.oxo-scultoreo{
  --osc-cyan:#35d8ff;--osc-violet:#8b5cf6;--osc-green:#20f0c7;--osc-pink:#ff4fd8;
  position:relative;isolation:isolate;width:100%;max-width:none;min-width:0;
  background:#020203;color:#f8f6ff;padding:0;scroll-margin-top:84px;line-height:1.65;
}
.oxo-scultoreo.osc-full-width{width:var(--osc-viewport,100%);margin-inline:calc((100% - var(--osc-viewport,100%))/2)}
.oxo-scultoreo,.oxo-scultoreo *{box-sizing:border-box;font-family:'Eurostile','Microgramma','Bank Gothic','Orbitron','Michroma','Arial Narrow',sans-serif}
.oxo-scultoreo :is(h1,h2,h3,h4,p){margin:0}
.oxo-scultoreo [hidden]{display:none!important}
.oxo-scultoreo a{color:inherit}
.oxo-scultoreo :is(a,summary):focus-visible{outline:2px solid #35d8ff;outline-offset:5px}
.oxo-scultoreo .osc-eyebrow{font-size:10px;letter-spacing:.28em;color:#76d9ed;line-height:1.8;text-transform:uppercase}
.oxo-scultoreo .osc-hero{scroll-margin-top:84px;min-height:calc(100svh - 84px);padding-top:80px;padding-bottom:110px}
.oxo-scultoreo .osc-copy .osc-title{margin:22px 0 25px;line-height:1.05}
.oxo-scultoreo .osc-subtitle{font-weight:400;line-height:1.12}
.oxo-scultoreo .osc-description{font-size:clamp(17px,1.35vw,22px);line-height:1.65}
.oxo-scultoreo .osc-word{padding-right:.13em}
.oxo-scultoreo .osc-hero .osc-link{margin-top:23px;text-decoration:none}
.oxo-scultoreo .osc-plane{overflow:hidden;isolation:isolate}
.oxo-scultoreo .osc-plane small,.oxo-scultoreo .osc-plane strong,.oxo-scultoreo .osc-plane>span{z-index:3}
.oxo-scultoreo .osc-plane strong,.oxo-scultoreo .osc-plane>span{position:relative}
.oxo-scultoreo .osc-plane strong{font-size:clamp(18px,1.85vw,29px);font-weight:400}
.oxo-scultoreo .osc-plane-background{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-size:cover;background-position:center;background-repeat:no-repeat;
  filter:grayscale(1) saturate(0) contrast(1.10) brightness(.72);opacity:.65;
}
.oxo-scultoreo .osc-plane-shade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,#0202036b,#02020333 28%,#020203cc 63%,#020203 100%)}
.oxo-scultoreo .osc-plane::before{z-index:2}
.oxo-scultoreo .osc-reference{padding:22px 5vw;border-block:1px solid #ffffff1f;font-size:11px;line-height:1.8;color:#b6aabe;background:#020203}
.oxo-scultoreo .osc-stories{position:relative;scroll-margin-top:92px}

/* Fotografie come sfondo dell'intera scena: nessuna colonna foto nel flusso. */
.oxo-scultoreo .osc-story{
  position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:center;
  width:100%;min-height:100svh;padding:100px 5vw 90px;background:#020203;
  border-bottom:1px solid #ffffff20;scroll-margin-top:84px;
}
.oxo-scultoreo .osc-photo-mask{
  position:absolute;z-index:0;inset:-5% auto -5% -4%;width:75%;pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
  mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
}
.oxo-scultoreo .osc-photo-motion{position:absolute;inset:0;transform-origin:50% 50%}
.oxo-scultoreo .osc-photo-background{
  position:absolute;inset:0;background-size:cover;background-position:50% 50%;background-repeat:no-repeat;
  filter:grayscale(1) saturate(0) contrast(1.12) brightness(.72);opacity:.75;
  border:0;border-radius:0;box-shadow:none;
}
.oxo-scultoreo .osc-photo-shade{
  position:absolute;z-index:1;inset:0;pointer-events:none;
  background:linear-gradient(90deg,#02020333 0%,#0202031f 20%,#0202039e 43%,#020203f7 55%,#020203 100%),linear-gradient(180deg,#020203b3,transparent 20%,transparent 78%,#020203e6);
}
.oxo-scultoreo .osc-story-reverse .osc-photo-mask{
  left:auto;right:-4%;
  -webkit-mask-image:linear-gradient(270deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
  mask-image:linear-gradient(270deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
}
.oxo-scultoreo .osc-story-reverse .osc-photo-shade{
  background:linear-gradient(270deg,#02020333 0%,#0202031f 20%,#0202039e 43%,#020203f7 55%,#020203 100%),linear-gradient(180deg,#020203b3,transparent 20%,transparent 78%,#020203e6);
}
.oxo-scultoreo .osc-story-grid{
  position:absolute;z-index:2;inset:0;pointer-events:none;opacity:.55;
  background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);
  background-size:68px 68px;
  -webkit-mask-image:linear-gradient(transparent,#000 12%,#000 85%,transparent);
  mask-image:linear-gradient(transparent,#000 12%,#000 85%,transparent);
}
.oxo-scultoreo .osc-ghost-word{position:absolute;z-index:2;top:30px;left:-1vw;pointer-events:none;user-select:none;white-space:nowrap;font-size:clamp(100px,19vw,330px);letter-spacing:-.075em;line-height:.82;color:#ffffff03;-webkit-text-stroke:1px #ffffff0a}
.oxo-scultoreo .osc-story-line{position:absolute;z-index:2;left:5vw;right:5vw;top:0;height:1px;background:linear-gradient(90deg,#35d8ff55,transparent 40%,transparent 65%,#8b5cf633);pointer-events:none}
.oxo-scultoreo .osc-story-body{position:relative;z-index:3;width:47%;margin-left:auto;min-width:0}
.oxo-scultoreo .osc-story-reverse .osc-story-body{margin-left:0;margin-right:auto}
.oxo-scultoreo .osc-story-heading h3{
  font-size:clamp(32px,4.1vw,70px);line-height:1.02;letter-spacing:-.06em;
  font-weight:400;text-transform:uppercase;margin:24px 0 28px;overflow-wrap:normal;
}
.oxo-scultoreo .osc-story-copy>p:not(.osc-credit):not(.osc-asset-error){font-size:clamp(16px,1.15vw,20px);line-height:1.7;color:#cdc7d5}
.oxo-scultoreo .osc-story-copy h4{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c1acef;font-weight:400;line-height:1.6;margin:29px 0 12px}
.oxo-scultoreo .osc-limits{border-top:1px solid #ffffff26;margin-top:25px;padding-top:14px;color:#b9aec7;font-size:13px;line-height:1.8}
.oxo-scultoreo .osc-limits summary{cursor:pointer;color:#d4c4e7}
.oxo-scultoreo .osc-limits p{padding-top:12px}
.oxo-scultoreo .osc-credit{font-size:10px;line-height:1.8;color:#a99db8;margin-top:25px}
.oxo-scultoreo .osc-credit>span{display:block;margin-bottom:4px}
.oxo-scultoreo .osc-credit a{text-decoration:underline;text-underline-offset:3px}
.oxo-scultoreo .osc-asset-error{margin-top:15px;font-size:11px;color:#d7bddb;line-height:1.8;border-left:1px solid #8b5cf6;padding-left:10px;overflow-wrap:anywhere}

.oxo-scultoreo .osc-care{position:relative;isolation:isolate;overflow:hidden;padding:110px 5vw 120px;background:#050506}
.oxo-scultoreo .osc-care-ghost{position:absolute;top:15%;left:-3%;font-size:20vw;line-height:1;white-space:nowrap;letter-spacing:-.08em;color:#ffffff03;pointer-events:none;z-index:-1}
.oxo-scultoreo .osc-care :is(h2,h3){font-size:clamp(34px,6vw,96px);line-height:.96;letter-spacing:-.06em;font-weight:400;margin:28px 0 35px}
.oxo-scultoreo .osc-care :is(h2,h3)>span{color:#c1acef}
.oxo-scultoreo .osc-care-lead{font-size:clamp(18px,1.6vw,25px);line-height:1.6;color:#c1b9cd;max-width:1100px}
.oxo-scultoreo .osc-care-columns{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:35px;margin:50px 0}
.oxo-scultoreo .osc-care-columns>div{border-top:1px solid #8b5cf666;padding-top:20px}
.oxo-scultoreo .osc-step-number{font-size:11px;letter-spacing:.2em;color:#35d8ff}
.oxo-scultoreo .osc-care-columns h4{font-size:21px;line-height:1.25;font-weight:400;margin:19px 0 16px}
.oxo-scultoreo .osc-care-columns p{font-size:14px;line-height:1.8;color:#b8adc7}
.oxo-scultoreo .osc-care-note{font-size:12px;line-height:1.85;color:#aaa0b9;max-width:1100px}
.oxo-scultoreo .osc-contact{display:inline-flex;align-items:center;gap:36px;padding:17px 23px;margin-top:32px;border:1px solid #35d8ff66;background:#35d8ff06;color:#fff;text-transform:uppercase;text-decoration:none;font-size:12px;letter-spacing:.15em}
.oxo-scultoreo .osc-contact span{font-size:23px;transition:transform .35s}
.oxo-scultoreo .osc-contact:hover span{transform:translate(5px,-5px)}

@media(max-width:1023px){
  .oxo-scultoreo .osc-hero{padding-top:65px}
  .oxo-scultoreo .osc-story{padding:80px 4vw}
  .oxo-scultoreo .osc-story-body{width:49%}
  .oxo-scultoreo .osc-story-heading h3{font-size:4.4vw;line-height:1.05}
  .oxo-scultoreo .osc-story-copy>p:not(.osc-credit):not(.osc-asset-error){font-size:15px}
  .oxo-scultoreo .osc-care{padding:85px 5vw}
}
@media(max-width:767px){
  .oxo-scultoreo .osc-hero{padding:56px 6vw 90px;gap:35px}
  .oxo-scultoreo .osc-subtitle{font-size:clamp(24px,6.1vw,38px)}
  .oxo-scultoreo .osc-word{font-size:22.5vw}
  .oxo-scultoreo .osc-plane strong{font-size:clamp(17px,4.4vw,24px)}
  .oxo-scultoreo .osc-reference{padding:20px 6vw;font-size:10px}
  .oxo-scultoreo .osc-story{display:block;min-height:0;padding:350px 6vw 66px}
  .oxo-scultoreo .osc-photo-mask,.oxo-scultoreo .osc-story-reverse .osc-photo-mask{
    inset:-22px -5% auto;width:110%;height:460px;
    -webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 12%,#000 54%,transparent 96%);
    mask-image:linear-gradient(180deg,transparent 0%,#000 12%,#000 54%,transparent 96%);
  }
  .oxo-scultoreo .osc-photo-background{background-position:center 44%;background-size:cover;opacity:.79}
  .oxo-scultoreo .osc-photo-shade,.oxo-scultoreo .osc-story-reverse .osc-photo-shade{
    background:linear-gradient(180deg,#0202034d 0px,#02020314 100px,#02020352 245px,#020203e6 365px,#020203 475px);
  }
  .oxo-scultoreo .osc-story-body,.oxo-scultoreo .osc-story-reverse .osc-story-body{width:100%;margin:0}
  .oxo-scultoreo .osc-story-heading h3{font-size:clamp(29px,8.3vw,55px);line-height:1.07;letter-spacing:-.05em;margin:18px 0 25px}
  .oxo-scultoreo .osc-eyebrow{font-size:8px;letter-spacing:.20em}
  .oxo-scultoreo .osc-story-copy>p:not(.osc-credit):not(.osc-asset-error){font-size:16px}
  .oxo-scultoreo .osc-ghost-word{font-size:28vw;top:24px}
  .oxo-scultoreo .osc-story-line{left:6vw;right:6vw}
  .oxo-scultoreo .osc-care{padding:70px 6vw}
  .oxo-scultoreo .osc-care :is(h2,h3){font-size:clamp(26px,7.2vw,53px);line-height:1.06;letter-spacing:-.045em}
  .oxo-scultoreo .osc-care-columns{grid-template-columns:1fr;gap:29px;margin:36px 0}
  .oxo-scultoreo .osc-contact{width:100%;justify-content:space-between;gap:15px;font-size:10px}
}
@media(prefers-reduced-motion:reduce){
  .oxo-scultoreo *, .oxo-scultoreo *::before, .oxo-scultoreo *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .oxo-scultoreo .osc-slice{will-change:auto}
  .oxo-scultoreo .osc-curtains,.oxo-scultoreo .osc-light{display:none}
}

`;
