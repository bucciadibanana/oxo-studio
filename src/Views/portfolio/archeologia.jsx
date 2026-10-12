/**
 * ARCHEOLOGIA STUDIO — componente completo, CSS e animazioni nello stesso file.
 * Dipendenze già usate dal sito: React 18, react-router-dom, GSAP/ScrollTrigger.
 * Non importa ScultoreoStudio e non modifica le altre pagine.
 * Modello visivo: scultoreo.jsx fornito in conversazione / musei.jsx.
 * Nuovi testi archeologici: redazione per questa pagina; non estratti dai file museali.
 * Fotografie: prova il percorso locale, poi il file pubblico di riferimento.
 * La rete serve solo alle fotografie, non a interrogare cataloghi o gestionali.
 * Il diagramma di Harris è un esempio didattico originale, non uno scavo reale.
 * Riferimenti redazionali, non integrazioni del prodotto:
 * https://harrismatrix.com/about-the-matrix/
 * https://intarch.ac.uk/journal/issue55/8/full-text.html
 * https://historicengland.org.uk/images-books/publications/understanding-historic-buildings/
 * https://historicengland.org.uk/images-books/publications/archaeological-and-historic-pottery-production-sites/
 */
import React, { useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fotografie CC0. I crediti restano visibili per identificare correttamente le immagini.
// Nessuna fotografia viene attribuita a un'attività o a un cliente di OXO.
const FOTO = [
  {
    id: 'materiali',
    locale: '/img/archeologia/materiali.jpg',
    remoto: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Terracotta_bowl_MET_DP105600.jpg',
    autore: 'The Metropolitan Museum of Art',
    fonte: 'https://commons.wikimedia.org/wiki/File:Terracotta_bowl_MET_DP105600.jpg',
    licenza: 'CC0 1.0',
    licenzaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    didascalia: 'Ciotola in terracotta, fotografia di riferimento della collezione del Metropolitan Museum of Art.',
    posizione: '50% 48%'
  },
  {
    id: 'architetture',
    locale: '/img/archeologia/architetture.jpg',
    remoto: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Roman_Wall_at_Tower_Hill_1.jpg',
    autore: 'Mx. Granger',
    fonte: 'https://commons.wikimedia.org/wiki/File:Roman_Wall_at_Tower_Hill_1.jpg',
    licenza: 'CC0 1.0',
    licenzaUrl: 'https://creativecommons.org/publicdomain/zero/1.0/',
    didascalia: 'Muratura della cinta di Londra a Tower Hill. Fotografia di riferimento, non un rilievo OXO.',
    posizione: '50% 50%'
  }
];

// In ogni relazione [successiva, precedente] il tempo procede dal basso verso l'alto.
// Si disegnano solo le relazioni immediate: nessun arco transitivo o data inventata.
export const HARRIS_UNITA = [
  { id: '100', tipo: 'Deposito', nome: 'Copertura finale', x: 250, y: 64,
    testo: 'Nell’esempio copre sia il riempimento US 101 sia il deposito laterale US 102. È quindi successiva a entrambi.' },
  { id: '101', tipo: 'Riempimento', nome: 'Riempimento della fossa', x: 125, y: 160,
    testo: 'Riempie il taglio US 103 ed è coperto da US 100. Il rapporto con US 102 non è determinato dalle relazioni rappresentate.' },
  { id: '102', tipo: 'Deposito', nome: 'Deposito laterale', x: 375, y: 160,
    testo: 'Copre US 104 ed è coperto da US 100. Il suo allineamento con US 101 nel diagramma non dimostra contemporaneità.' },
  { id: '103', tipo: 'Unità negativa', nome: 'Taglio della fossa', x: 125, y: 264,
    testo: 'L’asportazione che definisce la fossa taglia US 104. Precede il proprio riempimento US 101: taglio e riempimento sono eventi distinti.' },
  { id: '104', tipo: 'Deposito', nome: 'Strato preesistente', x: 250, y: 378,
    testo: 'È tagliato da US 103 e coperto lateralmente da US 102. Poggia sul substrato US 105: queste relazioni sono le evidenze dell’esempio.' },
  { id: '105', tipo: 'Substrato', nome: 'Substrato osservato', x: 250, y: 482,
    testo: 'È precedente a US 104 nella sequenza rappresentata. La sua posizione non assegna una data assoluta né descrive tutta la storia del sito.' }
];
export const HARRIS_RELAZIONI = [
  ['100','101'], ['100','102'], ['101','103'],
  ['103','104'], ['102','104'], ['104','105']
];

const immagineCss = src => `url(${JSON.stringify(src)})`;
const UNITA_PER_ID = Object.fromEntries(HARRIS_UNITA.map(u => [u.id, u]));

function percorsoRelazione(a, b) {
  const da = UNITA_PER_ID[a];
  const aUnit = UNITA_PER_ID[b];
  const startY = da.y + 23;
  const endY = aUnit.y - 23;
  // I collegamenti diagonali restano ortogonali, come nel diagramma stratigrafico.
  if (da.x === aUnit.x) return `M${da.x},${startY} V${endY}`;
  const mid = a === '102' ? 322 : (startY + endY) / 2;
  return `M${da.x},${startY} V${mid} H${aUnit.x} V${endY}`;
}

// Miniatura incorporata nell'header, coerente con il diagramma dimostrativo sottostante.
const HARRIS_SFONDO = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 550"><rect width="500" height="550" fill="#080809"/>` +
  HARRIS_RELAZIONI.map(([a,b]) => `<path d="${percorsoRelazione(a,b)}" fill="none" stroke="#999" stroke-width="2"/>`).join('') +
  HARRIS_UNITA.map(u => `<rect x="${u.x-47}" y="${u.y-23}" width="94" height="46" fill="#101012" stroke="#ddd" ${u.id==='103'?'stroke-dasharray="5 4"':''}/><text x="${u.x}" y="${u.y+6}" fill="#ddd" text-anchor="middle" font-family="sans-serif" font-size="18">US ${u.id}</text>`).join('') + '</svg>'
);

function useFotografie() {
  const [stato, setStato] = useState(() => FOTO.map(f => ({ src: f.locale, errore: false })));
  useLayoutEffect(() => {
    let attivo = true;
    const loaders = [];
    FOTO.forEach((foto, index) => {
      const image = new Image();
      let alternativa = false;
      image.onload = () => {
        if (!attivo) return;
        setStato(precedente => precedente.map((p,i) => i === index ? { src: image.src, errore: false } : p));
      };
      image.onerror = () => {
        if (!attivo) return;
        if (!alternativa) {
          alternativa = true;
          image.src = foto.remoto;
        } else {
          setStato(precedente => precedente.map((p,i) => i === index ? { src: '', errore: true } : p));
        }
      };
      image.src = foto.locale;
      loaders.push(image);
    });
    return () => { attivo = false; loaders.forEach(i => { i.onload = null; i.onerror = null; }); };
  }, []);
  return stato;
}

function Credito({ foto, errore }) {
  return <>
    <p className="arc-credit">
      <span>{foto.didascalia}</span>
      Foto: <a href={foto.fonte} target="_blank" rel="noopener noreferrer">{foto.autore}</a>
      {' · '}<a href={foto.licenzaUrl} target="_blank" rel="noopener noreferrer">{foto.licenza}</a>
      {' · '}Visualizzazione in bianco e nero, sfumata e ritagliata.
    </p>
    {errore && <p className="arc-asset-error" role="status">
      Fotografia non caricata: salva l’immagine di riferimento in <code>public{foto.locale}</code>.
    </p>}
  </>;
}

/** Il diagramma è un esempio navigabile, non un editor o un gestionale di scavo. */
function MatrixHarris() {
  const [selezionata, seleziona] = useState('101');
  const active = UNITA_PER_ID[selezionata];
  const precedenti = HARRIS_RELAZIONI.filter(([a]) => a === selezionata).map(([,b]) => b);
  const successive = HARRIS_RELAZIONI.filter(([,b]) => b === selezionata).map(([a]) => a);

  return <section className="arc-harris" id="archeologia-harris" aria-labelledby="archeologia-harris-titolo" data-arc-story>
    <div className="arc-story-grid" aria-hidden="true" />
    <span className="arc-ghost-word" data-arc-word aria-hidden="true">SEQUENZA.</span>
    <span className="arc-story-line" aria-hidden="true" />
    <div className="arc-harris-diagram">
      <p className="arc-eyebrow">ESEMPIO DIDATTICO / NON UNO SCAVO REALE</p>
      <div className="arc-matrix-surface" role="group" aria-label="Matrix di Harris dimostrativa: seleziona un’unità stratigrafica">
        <svg viewBox="0 0 500 550" aria-hidden="true" className="arc-matrix-lines">
          {HARRIS_RELAZIONI.map(([a,b]) => <path key={a+'-'+b}
            d={percorsoRelazione(a,b)} data-arc-matrix-line
            className={a===selezionata || b===selezionata ? 'arc-relation-active' : ''} />)}
        </svg>
        {HARRIS_UNITA.map(u => <button
          type="button" key={u.id}
          className={`arc-us${u.id==='103'?' arc-us-negative':''}`}
          style={{ left: (u.x/500*100)+'%', top: (u.y/550*100)+'%' }}
          aria-pressed={selezionata===u.id}
          aria-controls="archeologia-us-dettaglio"
          aria-label={`US ${u.id}: ${u.nome}`}
          onClick={() => seleziona(u.id)}
        >US {u.id}</button>)}
        <span className="arc-time-label arc-time-late">PIÙ RECENTE</span>
        <span className="arc-time-label arc-time-early">PIÙ ANTICO</span>
      </div>
      <p className="arc-matrix-note">Le linee indicano successioni dirette. Posizioni orizzontali e distanze grafiche non sono misure del tempo.</p>
    </div>
    <div className="arc-harris-copy">
      <header className="arc-story-heading">
        <p className="arc-eyebrow">02 / STRATIGRAFIA</p>
        <h3 id="archeologia-harris-titolo" data-arc-title>MATRIX<br />DI HARRIS.</h3>
      </header>
      <div className="arc-story-copy" data-arc-copy>
        <p>Dal rapporto osservato alla successione degli eventi. La matrix collega le unità stratigrafiche e rende leggibile ciò che precede o segue: depositi, tagli, riempimenti e trasformazioni del contesto.</p>
        <h4>Il tempo, non soltanto la profondità</h4>
        <p>Un taglio è distinto dal materiale che lo riempie. Due unità affiancate non sono necessariamente contemporanee. Le relazioni si documentano sul campo e restano verificabili attraverso schede, piante, sezioni e fotografie.</p>
        <div className="arc-us-detail" id="archeologia-us-dettaglio" aria-live="polite" aria-atomic="true">
          <p className="arc-eyebrow">US {active.id} / {active.tipo}</p>
          <h4>{active.nome}</h4>
          <p>{active.testo}</p>
          <p className="arc-us-relations">Relazioni dirette: {precedenti.length ? `successiva a ${precedenti.map(x=>'US '+x).join(', ')}` : 'nessuna unità precedente rappresentata'}; {successive.length ? `precedente a ${successive.map(x=>'US '+x).join(', ')}` : 'nessuna unità successiva rappresentata'}.</p>
        </div>
        <details className="arc-limits"><summary>Come leggere questo esempio</summary>
          <p>US 100 è successiva a US 101 e US 102. US 101 riempie il taglio US 103; US 103 taglia US 104. US 102 copre US 104; US 104 copre US 105. Non sono assegnate date assolute. Le unità in rami distinti non ricevono un ordine relativo quando le evidenze non lo stabiliscono.</p>
        </details>
      </div>
    </div>
  </section>;
}

function useArcheologiaHero(ref) {
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
      const stage = hero.querySelector('.arc-depth');
      const tilt = hero.querySelector('.arc-tilt');
      const glow = hero.querySelector('.arc-light');
      const arrow = hero.querySelector('.arc-link span');
      const link = hero.querySelector('.arc-link');
      const layers = q('.arc-slice');
      const planes = q('.arc-plane');

      if (!stage || !tilt || !glow || !arrow || !link) return;

      const intro = gsap.timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: hero, start: 'top 90%', once: true }
      });

      intro.fromTo(
        q('.arc-curtain'),
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

      intro.from(q('.arc-enter'), {
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
      const scena = hero.querySelector('.arc-scene');

      const journey = gsap.timeline({
        scrollTrigger: {
          id: 'archeologia-apertura-card',
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
          refreshPriority: 3,

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
        q('.arc-progress'),
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


function useSezioniArcheologia(ref, fullWidth) {
  useLayoutEffect(() => {
    const page = ref.current;
    if (!page) return undefined;
    let mounted = true;
    let timer = 0;
    let lastWidth = 0;
    const previousWidth = page.style.getPropertyValue('--arc-viewport');


    const aggiornaLarghezza = () => {
      const width = document.documentElement.clientWidth;
      if (width !== lastWidth) {
        lastWidth = width;
        if (fullWidth) page.style.setProperty('--arc-viewport', `${width}px`);
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

    const mm = gsap.matchMedia();
    mm.add({
      reduce: '(prefers-reduced-motion:reduce)',
      wide: '(min-width:1024px)',
      compact: '(max-width:1023px)',
    }, ({ conditions }) => {
      if (conditions.reduce) return;
      page.querySelectorAll('[data-arc-story]').forEach((row, index) => {
        const title = row.querySelector('[data-arc-title]');
        const copy = row.querySelector('[data-arc-copy]');
        const motionLayer = row.querySelector('[data-arc-photo-motion]');
        const word = row.querySelector('[data-arc-word]');
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

      page.querySelectorAll('[data-arc-matrix-line]').forEach((line, index) => {
        const length = line.getTotalLength();
        gsap.fromTo(line, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0, duration: .8, delay: index * .07, ease: 'power2.inOut',
          scrollTrigger: { trigger: line.closest('.arc-harris'), start: 'top 78%', once: true }
        });
      });
      const care = page.querySelector('.arc-care');
      if (care) {
        gsap.from(care.querySelectorAll('[data-arc-reveal]'), {
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
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(refresh) : null;
    const harrisCopy = page.querySelector('.arc-harris-copy');
    if (harrisCopy && ro) ro.observe(harrisCopy);
    document.fonts?.ready.then(() => { if (mounted) refresh(); });
    refresh();

    return () => {
      mounted = false;
      window.clearTimeout(timer);
      window.removeEventListener('resize', onResize);
      page.removeEventListener('toggle', refresh, true);

      ro?.disconnect();
      mm.revert();
      if (previousWidth) page.style.setProperty('--arc-viewport', previousWidth);
      else page.style.removeProperty('--arc-viewport');
    };
  }, [ref, fullWidth]);
}


/**
 * embedded=true: sezione integrabile nel contenitore archeologia.jsx.
 * embedded=false: pagina autonoma (main + h1).
 * fullWidth=true: stessa espansione a piena larghezza di ScultoreoStudio.
 */
export default function ArcheologiaStudio({ embedded = true, fullWidth = true }) {
  const pageRef = useRef(null);
  const heroRef = useRef(null);
  const immagini = useFotografie();
  useSezioniArcheologia(pageRef, fullWidth);
  useArcheologiaHero(heroRef);
  const Root = embedded ? 'section' : 'main';
  const Heading = embedded ? 'h2' : 'h1';
  const ClosingHeading = embedded ? 'h3' : 'h2';
  const piani = [
    ['01 / LEGGERE', 'MATERIALI', 'Il reperto nel suo contesto', immagini[0].src],
    ['02 / COLLEGARE', 'STRATIGRAFIA', 'Relazioni e successioni', HARRIS_SFONDO],
    ['03 / RICOSTRUIRE', 'ARCHITETTURE', 'La storia delle trasformazioni', immagini[1].src]
  ];

  return <Root ref={pageRef} id="archeologia"
    className={`oxo-archeologia${fullWidth ? ' arc-full-width' : ''}`}
    aria-labelledby="archeologia-titolo">
    <style>{ARCHEOLOGIA_CSS}</style>
    <section ref={heroRef} className="arc-hero" aria-label="Studio archeologico di materiali, stratigrafie e architetture">
      <div className="arc-light" aria-hidden="true" />
      <div className="arc-curtains" aria-hidden="true">
        {[0,1,2,3,4,5].map(n => <span key={n} className="arc-curtain" />)}
      </div>
      <div className="arc-copy">
        <p className="arc-enter arc-eyebrow">OXO STUDIO / ARCHEOLOGIA</p>
        <Heading className="arc-title" id="archeologia-titolo" aria-label="Archeologia. Materiali, stratigrafie e architetture.">
          <span className="arc-word" aria-hidden="true">
            <span className="arc-outline">STRATI.</span>
            {[0,1,2].map(n => <span key={n} className="arc-slice"
              style={{clipPath:`inset(${n*33.333}% 0 ${(2-n)*33.333}% 0)`}}>STRATI.</span>)}
          </span>
          <span className="arc-enter arc-subtitle" aria-hidden="true">MATERIALI E<br />ARCHITETTURE.</span>
        </Heading>
        <p className="arc-enter arc-description">Dal frammento al contesto, dal muro alla sua storia. Studio dei materiali, lettura stratigrafica e rilievo per mettere in relazione le evidenze archeologiche.</p>
        <a className="arc-enter arc-link" href="#archeologia-materiali">Esplora la ricerca <span aria-hidden="true">↗</span></a>
      </div>
      <div className="arc-scene" aria-hidden="true">
        <div className="arc-depth"><div className="arc-tilt">
          <div className="arc-portals">{[0,1,2,3,4].map(n => <i key={n} style={{inset:`${n*7}%`,transform:`translateZ(${-n*45}px)`}}/>)}</div>
          {piani.map(([label,title,caption,src],index) => <div key={title} className={`arc-plane arc-plane-${['back','middle','front'][index]}`}>
            <div className={`arc-plane-background${index===1?' arc-plane-matrix':''}`} style={{backgroundImage:src?immagineCss(src):'none'}}/>
            <div className="arc-plane-shade"/>
            <small>{label}</small><strong>{title}</strong><span>{caption}</span>
          </div>)}
        </div></div>
        <p className="arc-scene-note">REPERTO / CONTESTO / SEQUENZA</p>
      </div>
      <div className="arc-footer"><p>ARCHEOLOGIA · MATERIALI · ARCHITETTURE</p><span>SCORRI PER ESPLORARE ↓</span><i className="arc-progress" aria-hidden="true"/></div>
    </section>

    <article id="archeologia-materiali" className="arc-story" data-arc-story aria-labelledby="archeologia-materiali-titolo">
      <div className="arc-photo-mask" aria-hidden="true"><div className="arc-photo-motion" data-arc-photo-motion>
        <div className="arc-photo-background" style={{backgroundImage:immagini[0].src?immagineCss(immagini[0].src):'none',backgroundPosition:FOTO[0].posizione}}/>
      </div></div>
      <div className="arc-photo-shade" aria-hidden="true"/><div className="arc-story-grid" aria-hidden="true"/>
      <span className="arc-ghost-word" data-arc-word aria-hidden="true">MATERIA.</span><span className="arc-story-line" aria-hidden="true"/>
      <div className="arc-story-body">
        <header className="arc-story-heading"><p className="arc-eyebrow">01 / MATERIALI E REPERTI</p>
          <h3 id="archeologia-materiali-titolo" data-arc-title>IL FRAMMENTO.<br />IL CONTESTO.</h3>
        </header>
        <div className="arc-story-copy" data-arc-copy>
          <p>Ceramiche, metalli, vetri, materiali litici e reperti organici: la descrizione del manufatto acquista significato insieme al luogo, all’unità stratigrafica e alle condizioni del rinvenimento.</p>
          <h4>Dalla forma alla tecnologia</h4>
          <p>Organizziamo forme, impasti, superfici, tracce di lavorazione e stato di conservazione. Fotografie, disegni e modelli tridimensionali accompagnano il confronto tipologico e lo studio dei possibili ricongiungimenti tra frammenti.</p>
          <div className="arc-materials" aria-label="Ambiti di studio"><span>CERAMICA</span><span>METALLI</span><span>VETRO</span><span>MATERIALI LITICI</span></div>
          <details className="arc-limits"><summary>Studio dei materiali e interpretazione</summary>
            <p>Le osservazioni macroscopiche possono essere integrate con indagini archeometriche selezionate in base alla domanda di ricerca. L’analisi petrografica degli impasti e le analisi chimiche non sono intercambiabili. Datazione, provenienza e attribuzione restano ipotesi da motivare; una somiglianza visiva o una misura isolata non le dimostra.</p>
          </details>
          <Credito foto={FOTO[0]} errore={immagini[0].errore}/>
        </div>
      </div>
    </article>

    <MatrixHarris />

    <article id="archeologia-architetture" className="arc-story arc-story-reverse" data-arc-story aria-labelledby="archeologia-architetture-titolo">
      <div className="arc-photo-mask" aria-hidden="true"><div className="arc-photo-motion" data-arc-photo-motion>
        <div className="arc-photo-background" style={{backgroundImage:immagini[1].src?immagineCss(immagini[1].src):'none',backgroundPosition:FOTO[1].posizione}}/>
      </div></div>
      <div className="arc-photo-shade" aria-hidden="true"/><div className="arc-story-grid" aria-hidden="true"/>
      <span className="arc-ghost-word" data-arc-word aria-hidden="true">COSTRUIRE.</span><span className="arc-story-line" aria-hidden="true"/>
      <div className="arc-story-body">
        <header className="arc-story-heading"><p className="arc-eyebrow">03 / ARCHEOLOGIA DELL’ARCHITETTURA</p>
          <h3 id="archeologia-architetture-titolo" data-arc-title>LEGGERE<br />LE MURATURE.</h3>
        </header>
        <div className="arc-story-copy" data-arc-copy>
          <p>Un edificio conserva le tracce delle proprie trasformazioni. Murature, giunti, aperture, tamponamenti, rivestimenti e demolizioni permettono di indagare costruzioni, modifiche e riusi.</p>
          <h4>Unità stratigrafiche murarie e fasi</h4>
          <p>Documentiamo le unità stratigrafiche murarie, o USM, e i loro rapporti. Apparecchi, ammorsature, appoggi e discontinuità vengono letti insieme a materiali, malte, documenti e contesto, mantenendo distinta l’osservazione dalla proposta di fase.</p>
          <h4>Rilievo e restituzione</h4>
          <p>Piante, prospetti, sezioni, ortofotografie e modelli 3D mettono in relazione geometria e lettura archeologica. Fotogrammetria, scansione e misure di controllo vengono scelte in funzione della scala e degli obiettivi del rilievo.</p>
          <details className="arc-limits"><summary>Dal rilievo alla ricostruzione storica</summary>
            <p>Un rilievo descrive ciò che è acquisito, non assegna automaticamente una cronologia. La sequenza costruttiva nasce dal confronto delle evidenze. Ricostruzioni, parti mancanti e attribuzioni di fase restano distinguibili dalle superfici effettivamente documentate.</p>
          </details>
          <Credito foto={FOTO[1]} errore={immagini[1].errore}/>
        </div>
      </div>
    </article>

    <section className="arc-care" aria-labelledby="archeologia-metodo">
      <span className="arc-care-ghost" aria-hidden="true">CONTESTO.</span>
      <p className="arc-eyebrow" data-arc-reveal>UN METODO / TRE SCALE DI LETTURA</p>
      <ClosingHeading id="archeologia-metodo" data-arc-reveal>DAL REPERTO<br /><span>AL PAESAGGIO.</span></ClosingHeading>
      <p className="arc-care-lead" data-arc-reveal>Materiali, stratigrafie e architetture non sono archivi separati. Progettiamo percorsi di documentazione per collegare ogni osservazione al suo contesto e rendere leggibili le interpretazioni.</p>
      <div className="arc-care-columns">
        {[
          ['Descrivere','Identificativi, provenienze, fotografie e osservazioni restano associati al reperto e all’unità di riferimento.'],
          ['Mettere in relazione','Schede, piante, sezioni e rilievi sostengono il confronto tra eventi stratigrafici e trasformazioni del costruito.'],
          ['Argomentare','Fasi e ricostruzioni riportano le evidenze disponibili, i limiti e le alternative, senza sostituire la verifica dell’archeologo.']
        ].map(([title,text],i)=><div key={title} data-arc-reveal><span className="arc-step-number">0{i+1}</span><h4>{title}</h4><p>{text}</p></div>)}
      </div>
      <p className="arc-care-note">Il diagramma è un esempio dimostrativo. Le fotografie sono riferimenti pubblici, non documentazione di campagne OXO. Attività, strumenti, accessi e modalità operative vengono definiti per ciascun progetto.</p>
      <Link to="/contatti" className="arc-contact">Parliamo del tuo progetto <span aria-hidden="true">↗</span></Link>
    </section>
  </Root>;
}

const ARCHEOLOGIA_CSS = String.raw`

/* MUSEI_V6: effetti circoscritti all’apertura. */
.arc-hero{position:relative;isolation:isolate;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:2vw;min-height:100svh;padding:126px 5vw 110px;overflow:hidden;background:#020203;color:#f8f6ff}
.arc-hero:before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;background:linear-gradient(115deg,transparent 20%,#8b5cf60d,transparent 75%),repeating-linear-gradient(90deg,transparent 0 calc(20% - 1px),#ffffff08 calc(20% - 1px) 20%)}
.arc-light{position:absolute;left:0;top:0;width:650px;height:650px;margin:-325px;pointer-events:none;z-index:0;background:radial-gradient(ellipse,#8b5cf624,transparent 68%)}
.arc-curtains{display:flex;position:absolute;inset:0;pointer-events:none;z-index:10}
.arc-curtain{flex:1;transform:scaleY(0);background:#131019;border-right:1px solid #2c253d}
.arc-copy{position:relative;z-index:3;min-width:0}
.arc-eyebrow{font-size:10px;letter-spacing:.28em;color:#76d9ed}
.arc-copy .arc-title{margin:22px 0 25px;font-weight:400}
.arc-word{position:relative;display:block;width:fit-content;font-size:clamp(80px,12.2vw,190px);line-height:1.05;letter-spacing:-.065em;white-space:nowrap;overflow:hidden;padding-right:.07em}
.arc-outline{color:transparent;-webkit-text-stroke:1px #a99cbd77}
.arc-slice{position:absolute;inset:0;color:#f5f1fc;will-change:transform}
.arc-subtitle{display:block;margin-top:10px;font-size:clamp(25px,3.45vw,54px);line-height:1.12;letter-spacing:-.025em;color:#c1acef}
.arc-description{max-width:590px;font-size:clamp(17px,1.35vw,22px);line-height:1.65;color:#b5b0bf}
.arc-link{display:inline-flex;align-items:center;gap:24px;padding:15px 0 12px;border-bottom:1px solid #9777c9;margin-top:23px;font-size:12px;color:#fff;text-decoration:none}
.arc-link span{display:grid;place-items:center;width:45px;height:45px;border:1px solid #665278;border-radius:50%;font-size:22px}
.arc-hero a:focus-visible{outline:2px solid #35d8ff;outline-offset:7px}
.arc-scene{position:relative;height:490px;min-width:0;perspective:1300px;z-index:2}
.arc-depth,.arc-tilt{position:absolute;inset:0;transform-style:preserve-3d}
.arc-portals{position:absolute;inset:20px 0 20px -15px;transform-style:preserve-3d;transform:rotateY(-16deg) rotateX(7deg)}
.arc-portals i{position:absolute;border:1px solid #7e639b55;box-shadow:inset 0 0 35px #8b5cf608;clip-path:polygon(0 0,88% 0,100% 12%,100% 100%,12% 100%,0 88%)}
.arc-portals i:nth-child(2n){border-color:#35d8ff38}
.arc-plane{position:absolute;display:flex;flex-direction:column;justify-content:flex-end;gap:16px;width:70%;height:220px;padding:24px;border:1px solid #635074;background:linear-gradient(130deg,#292035fa,#0c0d16fc);box-shadow:8px 20px 50px #0009;transform-style:preserve-3d;backface-visibility:hidden}
.arc-plane:before{content:'';position:absolute;inset:9px;border:1px solid #ffffff09;pointer-events:none}
.arc-plane small{position:absolute;left:24px;top:24px;font-size:9px;letter-spacing:.24em;color:#c8b4e7}
.arc-plane strong{font-size:clamp(18px,1.85vw,29px);line-height:1;letter-spacing:-.04em;font-weight:400}
.arc-plane>span{font-size:10px;color:#b5aebe}
.arc-plane-back{left:4%;top:9%;transform:rotateY(-18deg) rotateZ(-9deg);border-color:#686095}
.arc-plane-middle{left:16%;top:29%;transform:translateZ(35px) rotateY(-10deg);background:linear-gradient(130deg,#173038fa,#0e1020fc);border-color:#3e6e81}
.arc-plane-front{left:26%;top:48%;transform:translateZ(70px) rotateY(-6deg) rotateZ(9deg);border-color:#825279;background:linear-gradient(130deg,#322134fa,#15101cfc)}
.arc-scene-note{position:absolute;bottom:-35px;left:10%;font-size:8px;letter-spacing:.27em;color:#b1a2c1}
.arc-footer{position:absolute;bottom:30px;left:5vw;right:5vw;display:flex;justify-content:space-between;gap:16px;padding-top:18px;border-top:1px solid #ffffff22;font-size:9px;letter-spacing:.19em;color:#a199ae}
.arc-progress{position:absolute;top:-1px;left:0;width:100%;height:1px;background:linear-gradient(90deg,#35d8ff,#a78bfa,#ff4fd8);transform:scaleX(0);transform-origin:left}
@media(max-width:1023px){
  .arc-hero{grid-template-columns:1fr;padding-top:115px;gap:38px}
  .arc-word{font-size:clamp(85px,19vw,170px)}
  .arc-subtitle{font-size:clamp(28px,5vw,48px)}
  .arc-scene{width:min(540px,100%);height:440px;margin:0 auto 30px}
  .arc-plane strong{font-size:26px}
  .arc-plane{height:190px}
  .arc-plane-front{left:23%}
  .arc-scene-note{bottom:-16px}
}
@media(max-width:479px){
  .arc-hero{padding:110px 6vw 100px;gap:32px}
  .arc-word{font-size:23vw}
  .arc-eyebrow{font-size:8px;letter-spacing:.18em}
  .arc-description{font-size:16px}
  .arc-scene{height:340px}
  .arc-plane{height:154px;padding:17px;gap:12px}
  .arc-plane small{left:17px;top:18px;font-size:7px;letter-spacing:.1em}
  .arc-plane strong{font-size:clamp(16px,5vw,21px)}
  .arc-plane>span{font-size:8px}
  .arc-footer{font-size:7px;letter-spacing:.1em;line-height:1.7}
  .arc-footer span{max-width:95px;text-align:right}
  .arc-scene-note{font-size:7px}
}
@media(hover:none){.arc-light{display:none}}
@media(prefers-reduced-motion:reduce){
  .arc-curtains,.arc-light{display:none}
  .arc-hero *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .arc-slice{will-change:auto}
}


/* Stili isolati: non riutilizzano s9-, s10-, sc11- o le classi gestionali. */
.oxo-archeologia{
  --arc-cyan:#35d8ff;--arc-violet:#8b5cf6;--arc-green:#20f0c7;--arc-pink:#ff4fd8;
  position:relative;isolation:isolate;width:100%;max-width:none;min-width:0;
  background:#020203;color:#f8f6ff;padding:0;scroll-margin-top:84px;line-height:1.65;
}
.oxo-archeologia.arc-full-width{width:var(--arc-viewport,100%);margin-inline:calc((100% - var(--arc-viewport,100%))/2)}
.oxo-archeologia,.oxo-archeologia *{box-sizing:border-box;font-family:'Eurostile','Microgramma','Bank Gothic','Orbitron','Michroma','Arial Narrow',sans-serif}
.oxo-archeologia :is(h1,h2,h3,h4,p){margin:0}
.oxo-archeologia [hidden]{display:none!important}
.oxo-archeologia a{color:inherit}
.oxo-archeologia :is(a,summary):focus-visible{outline:2px solid #35d8ff;outline-offset:5px}
.oxo-archeologia .arc-eyebrow{font-size:10px;letter-spacing:.28em;color:#76d9ed;line-height:1.8;text-transform:uppercase}
.oxo-archeologia .arc-hero{scroll-margin-top:84px;min-height:calc(100svh - 84px);padding-top:80px;padding-bottom:110px}
.oxo-archeologia .arc-copy .arc-title{margin:22px 0 25px;line-height:1.05}
.oxo-archeologia .arc-subtitle{font-weight:400;line-height:1.12}
.oxo-archeologia .arc-description{font-size:clamp(17px,1.35vw,22px);line-height:1.65}
.oxo-archeologia .arc-word{padding-right:.13em}
.oxo-archeologia .arc-hero .arc-link{margin-top:23px;text-decoration:none}
.oxo-archeologia .arc-plane{overflow:hidden;isolation:isolate}
.oxo-archeologia .arc-plane small,.oxo-archeologia .arc-plane strong,.oxo-archeologia .arc-plane>span{z-index:3}
.oxo-archeologia .arc-plane strong,.oxo-archeologia .arc-plane>span{position:relative}
.oxo-archeologia .arc-plane strong{font-size:clamp(18px,1.85vw,29px);font-weight:400}
.oxo-archeologia .arc-plane-background{
  position:absolute;inset:0;z-index:0;pointer-events:none;
  background-size:cover;background-position:center;background-repeat:no-repeat;
  filter:grayscale(1) saturate(0) contrast(1.10) brightness(.72);opacity:.65;
}
.oxo-archeologia .arc-plane-shade{position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(180deg,#0202036b,#02020333 28%,#020203cc 63%,#020203 100%)}
.oxo-archeologia .arc-plane::before{z-index:2}
.oxo-archeologia .arc-reference{padding:22px 5vw;border-block:1px solid #ffffff1f;font-size:11px;line-height:1.8;color:#b6aabe;background:#020203}
.oxo-archeologia .arc-stories{position:relative;scroll-margin-top:92px}

/* Fotografie come sfondo dell'intera scena: nessuna colonna foto nel flusso. */
.oxo-archeologia .arc-story{
  position:relative;isolation:isolate;overflow:hidden;display:flex;align-items:center;
  width:100%;min-height:100svh;padding:100px 5vw 90px;background:#020203;
  border-bottom:1px solid #ffffff20;scroll-margin-top:84px;
}
.oxo-archeologia .arc-photo-mask{
  position:absolute;z-index:0;inset:-5% auto -5% -4%;width:75%;pointer-events:none;
  -webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
  mask-image:linear-gradient(90deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
}
.oxo-archeologia .arc-photo-motion{position:absolute;inset:0;transform-origin:50% 50%}
.oxo-archeologia .arc-photo-background{
  position:absolute;inset:0;background-size:cover;background-position:50% 50%;background-repeat:no-repeat;
  filter:grayscale(1) saturate(0) contrast(1.12) brightness(.72);opacity:.75;
  border:0;border-radius:0;box-shadow:none;
}
.oxo-archeologia .arc-photo-shade{
  position:absolute;z-index:1;inset:0;pointer-events:none;
  background:linear-gradient(90deg,#02020333 0%,#0202031f 20%,#0202039e 43%,#020203f7 55%,#020203 100%),linear-gradient(180deg,#020203b3,transparent 20%,transparent 78%,#020203e6);
}
.oxo-archeologia .arc-story-reverse .arc-photo-mask{
  left:auto;right:-4%;
  -webkit-mask-image:linear-gradient(270deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
  mask-image:linear-gradient(270deg,transparent 0%,#000 12%,#000 68%,transparent 100%);
}
.oxo-archeologia .arc-story-reverse .arc-photo-shade{
  background:linear-gradient(270deg,#02020333 0%,#0202031f 20%,#0202039e 43%,#020203f7 55%,#020203 100%),linear-gradient(180deg,#020203b3,transparent 20%,transparent 78%,#020203e6);
}
.oxo-archeologia .arc-story-grid{
  position:absolute;z-index:2;inset:0;pointer-events:none;opacity:.55;
  background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);
  background-size:68px 68px;
  -webkit-mask-image:linear-gradient(transparent,#000 12%,#000 85%,transparent);
  mask-image:linear-gradient(transparent,#000 12%,#000 85%,transparent);
}
.oxo-archeologia .arc-ghost-word{position:absolute;z-index:2;top:30px;left:-1vw;pointer-events:none;user-select:none;white-space:nowrap;font-size:clamp(100px,19vw,330px);letter-spacing:-.075em;line-height:.82;color:#ffffff03;-webkit-text-stroke:1px #ffffff0a}
.oxo-archeologia .arc-story-line{position:absolute;z-index:2;left:5vw;right:5vw;top:0;height:1px;background:linear-gradient(90deg,#35d8ff55,transparent 40%,transparent 65%,#8b5cf633);pointer-events:none}
.oxo-archeologia .arc-story-body{position:relative;z-index:3;width:47%;margin-left:auto;min-width:0}
.oxo-archeologia .arc-story-reverse .arc-story-body{margin-left:0;margin-right:auto}
.oxo-archeologia .arc-story-heading h3{
  font-size:clamp(32px,4.1vw,70px);line-height:1.02;letter-spacing:-.06em;
  font-weight:400;text-transform:uppercase;margin:24px 0 28px;overflow-wrap:normal;
}
.oxo-archeologia .arc-story-copy>p:not(.arc-credit):not(.arc-asset-error){font-size:clamp(16px,1.15vw,20px);line-height:1.7;color:#cdc7d5}
.oxo-archeologia .arc-story-copy h4{font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#c1acef;font-weight:400;line-height:1.6;margin:29px 0 12px}
.oxo-archeologia .arc-limits{border-top:1px solid #ffffff26;margin-top:25px;padding-top:14px;color:#b9aec7;font-size:13px;line-height:1.8}
.oxo-archeologia .arc-limits summary{cursor:pointer;color:#d4c4e7}
.oxo-archeologia .arc-limits p{padding-top:12px}
.oxo-archeologia .arc-credit{font-size:10px;line-height:1.8;color:#a99db8;margin-top:25px}
.oxo-archeologia .arc-credit>span{display:block;margin-bottom:4px}
.oxo-archeologia .arc-credit a{text-decoration:underline;text-underline-offset:3px}
.oxo-archeologia .arc-asset-error{margin-top:15px;font-size:11px;color:#d7bddb;line-height:1.8;border-left:1px solid #8b5cf6;padding-left:10px;overflow-wrap:anywhere}

.oxo-archeologia .arc-care{position:relative;isolation:isolate;overflow:hidden;padding:110px 5vw 120px;background:#050506}
.oxo-archeologia .arc-care-ghost{position:absolute;top:15%;left:-3%;font-size:20vw;line-height:1;white-space:nowrap;letter-spacing:-.08em;color:#ffffff03;pointer-events:none;z-index:-1}
.oxo-archeologia .arc-care :is(h2,h3){font-size:clamp(34px,6vw,96px);line-height:.96;letter-spacing:-.06em;font-weight:400;margin:28px 0 35px}
.oxo-archeologia .arc-care :is(h2,h3)>span{color:#c1acef}
.oxo-archeologia .arc-care-lead{font-size:clamp(18px,1.6vw,25px);line-height:1.6;color:#c1b9cd;max-width:1100px}
.oxo-archeologia .arc-care-columns{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:35px;margin:50px 0}
.oxo-archeologia .arc-care-columns>div{border-top:1px solid #8b5cf666;padding-top:20px}
.oxo-archeologia .arc-step-number{font-size:11px;letter-spacing:.2em;color:#35d8ff}
.oxo-archeologia .arc-care-columns h4{font-size:21px;line-height:1.25;font-weight:400;margin:19px 0 16px}
.oxo-archeologia .arc-care-columns p{font-size:14px;line-height:1.8;color:#b8adc7}
.oxo-archeologia .arc-care-note{font-size:12px;line-height:1.85;color:#aaa0b9;max-width:1100px}
.oxo-archeologia .arc-contact{display:inline-flex;align-items:center;gap:36px;padding:17px 23px;margin-top:32px;border:1px solid #35d8ff66;background:#35d8ff06;color:#fff;text-transform:uppercase;text-decoration:none;font-size:12px;letter-spacing:.15em}
.oxo-archeologia .arc-contact span{font-size:23px;transition:transform .35s}
.oxo-archeologia .arc-contact:hover span{transform:translate(5px,-5px)}

@media(max-width:1023px){
  .oxo-archeologia .arc-hero{padding-top:65px}
  .oxo-archeologia .arc-story{padding:80px 4vw}
  .oxo-archeologia .arc-story-body{width:49%}
  .oxo-archeologia .arc-story-heading h3{font-size:4.4vw;line-height:1.05}
  .oxo-archeologia .arc-story-copy>p:not(.arc-credit):not(.arc-asset-error){font-size:15px}
  .oxo-archeologia .arc-care{padding:85px 5vw}
}
@media(max-width:767px){
  .oxo-archeologia .arc-hero{padding:56px 6vw 90px;gap:35px}
  .oxo-archeologia .arc-subtitle{font-size:clamp(24px,6.1vw,38px)}
  .oxo-archeologia .arc-word{font-size:22.5vw}
  .oxo-archeologia .arc-plane strong{font-size:clamp(17px,4.4vw,24px)}
  .oxo-archeologia .arc-reference{padding:20px 6vw;font-size:10px}
  .oxo-archeologia .arc-story{display:block;min-height:0;padding:350px 6vw 66px}
  .oxo-archeologia .arc-photo-mask,.oxo-archeologia .arc-story-reverse .arc-photo-mask{
    inset:-22px -5% auto;width:110%;height:460px;
    -webkit-mask-image:linear-gradient(180deg,transparent 0%,#000 12%,#000 54%,transparent 96%);
    mask-image:linear-gradient(180deg,transparent 0%,#000 12%,#000 54%,transparent 96%);
  }
  .oxo-archeologia .arc-photo-background{background-position:center 44%;background-size:cover;opacity:.79}
  .oxo-archeologia .arc-photo-shade,.oxo-archeologia .arc-story-reverse .arc-photo-shade{
    background:linear-gradient(180deg,#0202034d 0px,#02020314 100px,#02020352 245px,#020203e6 365px,#020203 475px);
  }
  .oxo-archeologia .arc-story-body,.oxo-archeologia .arc-story-reverse .arc-story-body{width:100%;margin:0}
  .oxo-archeologia .arc-story-heading h3{font-size:clamp(29px,8.3vw,55px);line-height:1.07;letter-spacing:-.05em;margin:18px 0 25px}
  .oxo-archeologia .arc-eyebrow{font-size:8px;letter-spacing:.20em}
  .oxo-archeologia .arc-story-copy>p:not(.arc-credit):not(.arc-asset-error){font-size:16px}
  .oxo-archeologia .arc-ghost-word{font-size:28vw;top:24px}
  .oxo-archeologia .arc-story-line{left:6vw;right:6vw}
  .oxo-archeologia .arc-care{padding:70px 6vw}
  .oxo-archeologia .arc-care :is(h2,h3){font-size:clamp(26px,7.2vw,53px);line-height:1.06;letter-spacing:-.045em}
  .oxo-archeologia .arc-care-columns{grid-template-columns:1fr;gap:29px;margin:36px 0}
  .oxo-archeologia .arc-contact{width:100%;justify-content:space-between;gap:15px;font-size:10px}
}
@media(prefers-reduced-motion:reduce){
  .oxo-archeologia *, .oxo-archeologia *::before, .oxo-archeologia *::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .oxo-archeologia .arc-slice{will-change:auto}
  .oxo-archeologia .arc-curtains,.oxo-archeologia .arc-light{display:none}
}

/* Specificità distinta da Scultoreo: nessuna regola ne modifica i componenti. */
.oxo-archeologia .arc-word{font-size:clamp(70px,11vw,170px)}
.oxo-archeologia .arc-plane-matrix{background-size:auto 155%;background-position:50% 45%;opacity:.5}
.oxo-archeologia .arc-materials{display:flex;gap:10px 18px;flex-wrap:wrap;margin:24px 0 0;font-size:9px;letter-spacing:.18em;color:#bbb0ce}
.oxo-archeologia .arc-materials span{border-bottom:1px solid #8b5cf65c;padding-bottom:7px}
.oxo-archeologia .arc-harris{position:relative;isolation:isolate;overflow:hidden;display:grid;grid-template-columns:minmax(0,1.08fr) minmax(0,1fr);gap:6vw;align-items:center;min-height:100svh;padding:110px 5vw;background:#050506;border-bottom:1px solid #ffffff20;scroll-margin-top:84px}
.oxo-archeologia .arc-harris-diagram,.oxo-archeologia .arc-harris-copy{position:relative;z-index:3;min-width:0}
.oxo-archeologia .arc-harris-diagram>.arc-eyebrow{font-size:9px;letter-spacing:.22em;color:#b3a8c8}
.oxo-archeologia .arc-matrix-surface{position:relative;width:100%;max-width:610px;aspect-ratio:500/550;margin:25px auto 8px;isolation:isolate}
.oxo-archeologia .arc-matrix-lines{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none}
.oxo-archeologia .arc-matrix-lines path{fill:none;stroke:#b4afbe88;stroke-width:1.7;vector-effect:non-scaling-stroke;transition:stroke .3s,stroke-width .3s}
.oxo-archeologia .arc-matrix-lines .arc-relation-active{stroke:#35d8ff;stroke-width:2.5}
.oxo-archeologia .arc-us{position:absolute;transform:translate(-50%,-50%);width:18.8%;height:8.36%;min-height:34px;display:grid;place-items:center;padding:0;white-space:nowrap;line-height:1;border:1px solid #b8b2c8;background:#0d0c11;color:#e6e3ee;font:inherit;font-size:clamp(12px,1.2vw,20px);letter-spacing:.05em;cursor:pointer;transition:background .2s,border-color .2s,box-shadow .2s}
.oxo-archeologia .arc-us-negative{border-style:dashed}
.oxo-archeologia .arc-us:hover{background:#211c2a;border-color:#c8b8e9}
.oxo-archeologia .arc-us[aria-pressed=true]{border-color:#35d8ff;background:#092026;box-shadow:0 0 28px #35d8ff12}
.oxo-archeologia button:focus-visible{outline:2px solid #35d8ff;outline-offset:5px}
.oxo-archeologia .arc-time-label{position:absolute;font-size:9px;letter-spacing:.22em;color:#a7a0b5;left:50%;transform:translateX(-50%);white-space:nowrap}
.oxo-archeologia .arc-time-late{top:0}
.oxo-archeologia .arc-time-early{bottom:0}
.oxo-archeologia .arc-matrix-note{font-size:11px;line-height:1.8;color:#afa6be;max-width:560px;margin:0 auto}
.oxo-archeologia .arc-us-detail{border-left:2px solid #8b5cf6;padding:6px 0 6px 20px;margin-top:30px;min-height:245px}
.oxo-archeologia .arc-us-detail h4{font-size:17px;letter-spacing:0;text-transform:none;margin:13px 0 10px;color:#ece4f4}
.oxo-archeologia .arc-us-detail>p:not(.arc-eyebrow){font-size:14px;line-height:1.8;color:#c4bace}
.oxo-archeologia .arc-us-detail .arc-us-relations{margin-top:14px;font-size:11px!important;color:#b9afc7!important}
@media(max-width:1023px){
 .oxo-archeologia .arc-word{font-size:17.5vw}
 .oxo-archeologia .arc-harris{grid-template-columns:minmax(0,1fr);padding:85px 5vw;gap:45px}
 .oxo-archeologia .arc-harris-diagram{max-width:660px;margin:auto;width:100%}
 .oxo-archeologia .arc-harris-copy{max-width:880px;margin:auto;width:100%}
 .oxo-archeologia .arc-us{font-size:19px}
}
@media(max-width:767px){
 .oxo-archeologia .arc-word{font-size:21vw}
 .oxo-archeologia .arc-harris{padding:65px 6vw;gap:42px}
 .oxo-archeologia .arc-us{font-size:12px;letter-spacing:0}
 .oxo-archeologia .arc-time-label{font-size:8px;letter-spacing:.15em}
 .oxo-archeologia .arc-matrix-note{font-size:10px}
 .oxo-archeologia .arc-harris-diagram>.arc-eyebrow{font-size:8px;letter-spacing:.13em}
 .oxo-archeologia .arc-us-detail{min-height:275px;padding-left:16px}
 .oxo-archeologia .arc-story-heading h3{overflow-wrap:normal}
}

`;
