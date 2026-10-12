// OXO_MUSEI_V7_CARD_PRIMA_SCROLL
// OXO_MUSEI_V6_INSTALLATO
// OXO_MUSEI_HERO_V5_INSTALLATO
// OXO_MUSEI_V4_INSTALLATO
// OXO_MUSEI_STILE_KAIROS: copia dedicata, originale non modificato.
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";

gsap.registerPlugin(ScrollTrigger);

const USERS = [
  {
    "id": "01",
    "label": "MUSEI DIOCESANI",
    "accent": "#35d8ff"
  },
  {
    "id": "02",
    "label": "MUSEI STATALI",
    "accent": "#8b5cf6"
  },
  {
    "id": "03",
    "label": "RETI MUSEALI",
    "accent": "#20f0c7"
  },
  {
    "id": "04",
    "label": "ENTI CONSERVATORI",
    "accent": "#ff4fd8"
  },
  {
    "id": "05",
    "label": "ENTI DI TUTELA",
    "accent": "#35d8ff"
  }
];

const FEATURES = [
  {
    "id": "01",
    "title": "Musei ecclesiastici",
    "meta": "ECCLESIASTICO",
    "copy": "Collezioni diocesane ed ecclesiastiche, inventari e documentazione. Schede, immagini e informazioni gestionali organizzate intorno alle opere e alle esigenze del museo.",
    "accent": "#35d8ff"
  },
  {
    "id": "02",
    "title": "Musei statali",
    "meta": "COLLEZIONI PUBBLICHE",
    "copy": "Gestione delle collezioni pubbliche: inventari, sedi, immagini e documenti collegati alla storia del bene e alle attività dell’istituto.",
    "accent": "#8b5cf6"
  },
  {
    "id": "03",
    "title": "Identità e ubicazione",
    "meta": "PROPRIETÀ / SEDI",
    "copy": "Ente proprietario, soggetto conservatore e sede attuale sono informazioni diverse. L’opera mantiene la propria identità anche quando viene spostata o ospitata da un altro istituto.",
    "accent": "#20f0c7"
  },
  {
    "id": "04",
    "title": "Prestiti e movimentazioni",
    "meta": "PARTENZA / CUSTODIA / RIENTRO",
    "copy": "Una storia documentata collega sedi di provenienza e destinazione, periodo del prestito e allegati. Le informazioni condivisibili vengono concordate con gli enti coinvolti.",
    "accent": "#ff4fd8"
  },
  {
    "id": "05",
    "title": "Fascicoli delle opere",
    "meta": "SCHEDE / IMMAGINI / RELAZIONI",
    "copy": "Organizziamo documenti, fotografie e relazioni per lo studio e il confronto con gli enti di tutela. I passaggi ufficiali seguono i canali e le procedure dell’amministrazione competente.",
    "accent": "#35d8ff"
  },
  {
    "id": "06",
    "title": "Conservazione e rilievi",
    "meta": "DOCUMENTAZIONE / SCANSIONI 3D",
    "copy": "Osservazioni e documentazione conservativa accompagnano il bene. La linea di sviluppo sui rilievi 3D collega modelli e campagne di acquisizione, distinguendo dati osservati ed elaborazioni.",
    "accent": "#8b5cf6"
  }
];

const STACK = [
  [
    "MUSEI PROPRIETARI",
    "#ffffff"
  ],
  [
    "SEDI E DEPOSITI",
    "#35d8ff"
  ],
  [
    "ENTI OSPITANTI",
    "#8b5cf6"
  ],
  [
    "ECCLESIASTICO",
    "#20f0c7"
  ],
  [
    "COLLEZIONI PUBBLICHE",
    "#ff4fd8"
  ],
  [
    "SOPRINTENDENZE",
    "#35d8ff"
  ]
];

function SplitLetters({ text, attribute = "data-kairos-letter" }) {
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



// OXO_MUSEI_DEMO_V4: dati inventati, nessuna richiesta a servizi esterni.
const MUSEI_DEMO = {
  cliente: 'Museo delle Arti di Valdombra',
  sedi: [
    ['Palazzo delle Arti',846,'#20f0c7'],
    ['Deposito Nord',286,'#8b5cf6'],
    ['Galleria del Chiostro',84,'#35d8ff'],
    ['Laboratorio esterno',32,'#ff4fd8']
  ],
  tipi: [
    ['Dipinti',482,'#35d8ff'],
    ['Sculture',318,'#8b5cf6'],
    ['Reperti archeologici',276,'#20f0c7'],
    ['Arti decorative',172,'#ff4fd8']
  ],
  schede: 1186,
  giornaliere: [8,11,7,14,9,12,6,15,13,10,17,8,12,16,11,19,14,9,18,15,12,20,17,14,22,16,19,23,18,21],
  movimenti: [2,1,3,2,4,1,2,3,2,4,3,2,5,3,2,4,3,6,2,5,4,3,5,4,6,3,4,5,7,4]
};

const museoNumero = n =>
  String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.');

const museoTotale = MUSEI_DEMO.sedi.reduce(
  (totale,sede) => totale+sede[1],0
);

const museoSomma = valori => valori.reduce((a,b) => a+b,0);

function AttivitaMuseoDemo() {
  const [giorni, impostaGiorni] = useState(30);
  const indice = 30-giorni;
  const serie = MUSEI_DEMO.giornaliere.slice(indice);
  const movimenti = MUSEI_DEMO.movimenti.slice(indice);
  const passo = giorni === 30 ? 3 : 1;
  const gruppi = [];

  for (let i=0;i<serie.length;i+=passo) {
    const data = new Date(Date.UTC(2026,8,13+indice+i));
    const fine = new Date(
      Date.UTC(2026,8,13+indice+Math.min(i+passo,serie.length)-1)
    );
    const formato = d => d.toLocaleDateString('it-IT',{
      day:'numeric',month:'short',timeZone:'UTC'
    });

    gruppi.push({
      nome: passo===1
        ? formato(data)
        : formato(data)+'–'+formato(fine),
      schede: museoSomma(serie.slice(i,i+passo)),
      movimenti: museoSomma(movimenti.slice(i,i+passo))
    });
  }

  const massimo =
    Math.ceil(Math.max(...gruppi.map(g=>g.schede))/20)*20;

  return (
    <section data-ui-panel className="kd-panel mt-3 w-full">
      <div className="m4-chart-head">
        <div>
          <h4>Attività di catalogazione</h4>
          <p>
            {giorni===30
              ? '13 settembre – 12 ottobre'
              : '6 – 12 ottobre'} 2026 · periodo simulato
          </p>

          <div className="m4-switch">
            {[7,30].map(n=>(
              <button
                type="button"
                key={n}
                aria-pressed={giorni===n}
                onClick={()=>impostaGiorni(n)}
              >
                {n} giorni
              </button>
            ))}
          </div>
        </div>

        <div className="m4-totals" aria-live="polite">
          <div>
            <small>Schede create</small>
            <strong>{museoNumero(museoSomma(serie))}</strong>
          </div>
          <div>
            <small>Movimentazioni</small>
            <strong>{museoNumero(museoSomma(movimenti))}</strong>
          </div>
        </div>
      </div>

      <div
        className="m4-plot"
        role="img"
        aria-label={
          'Grafico dimostrativo: '+museoSomma(serie)+
          ' schede create e '+museoSomma(movimenti)+
          ' movimentazioni. Dati nella tabella sottostante.'
        }
      >
        <div className="m4-scale" aria-hidden="true">
          {[massimo,massimo*0.75,massimo*0.5,massimo*0.25,0].map(
            n=><span key={n}>{n}</span>
          )}
        </div>

        <div className="m4-chart-body">
          <div className="m4-bars" aria-hidden="true">
            {gruppi.map(g=>(
              <div className="m4-group" key={g.nome}>
                <div className="m4-pair">
                  <div
                    className="m4-bar"
                    style={{height:(g.schede/massimo*100)+'%'}}
                  >
                    <span>{g.schede}</span>
                  </div>

                  <div
                    className="m4-bar m4-move"
                    style={{
                      height:(g.movimenti/massimo*100)+'%'
                    }}
                  >
                    <span>{g.movimenti}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="m4-dates" aria-hidden="true">
            {gruppi.map(g=><span key={g.nome}>{g.nome}</span>)}
          </div>
        </div>
      </div>

      <p className="m4-legend">
        <span>▰ Schede create</span>
        <span>▰ Movimentazioni</span>
      </p>

      <details className="m4-data">
        <summary>Leggi i dati del grafico</summary>
        <div className="m4-table">
          <table>
            <caption>
              Valori fittizi per intervallo; stessa scala
              per entrambe le serie.
            </caption>
            <thead>
              <tr>
                <th>Intervallo</th>
                <th>Schede</th>
                <th>Movimentazioni</th>
              </tr>
            </thead>
            <tbody>
              {gruppi.map(g=>(
                <tr key={g.nome}>
                  <td>{g.nome}</td>
                  <td>{g.schede}</td>
                  <td>{g.movimenti}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}

function AltriGraficiMuseoDemo() {
  const tot=museoTotale;
  const create=MUSEI_DEMO.schede;
  const bozze=tot-create;
  let acc=0;

  const profilo=MUSEI_DEMO.giornaliere.map(n=>(acc+=n));
  const finale=profilo[profilo.length-1];

  const punti=profilo.map(
    (n,i)=>(10+i*480/29)+','+(112-n/finale*98)
  ).join(' ');

  return (
    <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
      <section data-ui-panel className="kd-panel p-4 m4-types">
        <h4>Composizione delle collezioni</h4>
        <p>{museoNumero(tot)} beni · categorie dimostrative</p>

        {MUSEI_DEMO.tipi.map(([nome,n,colore])=>(
          <div className="m4-category" key={nome}>
            <div>
              <span>{nome}</span>
              <strong>
                {museoNumero(n)}
                <small>
                  {' '}· {(n/tot*100).toFixed(1).replace('.',',')}%
                </small>
              </strong>
            </div>
            <div className="m4-track">
              <span
                style={{
                  width:(n/tot*100)+'%',
                  background:colore
                }}
              />
            </div>
          </div>
        ))}
      </section>

      <section data-ui-panel className="kd-panel p-4 m4-progress">
        <h4>Avanzamento della documentazione</h4>
        <p>
          Totale collezione e nuove schede nel periodo simulato
        </p>

        <div className="m4-completion">
          <strong>
            {(create/tot*100).toFixed(1).replace('.',',')}%
          </strong>
          <span>
            {museoNumero(create)} schede generate
            <br />
            {museoNumero(bozze)} da generare
          </span>
        </div>

        <div
          className="m4-track"
          role="progressbar"
          aria-label="Schede generate, dati dimostrativi"
          aria-valuemin={0}
          aria-valuemax={tot}
          aria-valuenow={create}
        >
          <span
            style={{
              width:(create/tot*100)+'%',
              background:'#20f0c7'
            }}
          />
        </div>

        <svg
          viewBox="0 0 500 130"
          className="m4-trend"
          role="img"
          aria-label={
            'Nuove schede cumulate nel periodo: '+finale+
            '. Gli incrementi sono gli stessi del grafico di catalogazione.'
          }
        >
          <path
            d={'M10,112 L'+punti.replaceAll(' ',' L')+' L490,112 Z'}
            fill="rgba(139,92,246,.14)"
          />
          <polyline
            points={punti}
            fill="none"
            stroke="#a78bfa"
            strokeWidth="2.5"
          />
          <line
            x1="10" y1="112" x2="490" y2="112"
            stroke="#424242"
          />
          <text x="10" y="126" fill="#aaa" fontSize="10">
            13 set
          </text>
          <text x="448" y="126" fill="#aaa" fontSize="10">
            12 ott
          </text>
        </svg>

        <p className="m4-trend-note">
          +{finale} nuove schede nel periodo · da{' '}
          {museoNumero(create-finale)} a{' '}
          {museoNumero(create)} totali
        </p>
      </section>
    </div>
  );
}


// OXO_MUSEI_HERO_V5: effetti limitati all'apertura.

function useMuseiHero(ref) {
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
      const stage = hero.querySelector('.mv6-depth');
      const tilt = hero.querySelector('.mv6-tilt');
      const glow = hero.querySelector('.mv6-light');
      const arrow = hero.querySelector('.mv6-link span');
      const link = hero.querySelector('.mv6-link');
      const layers = q('.mv6-slice');
      const planes = q('.mv6-plane');

      if (!stage || !tilt || !glow || !arrow || !link) return;

      const intro = gsap.timeline({
        defaults: { ease: 'expo.out' }
      });

      intro.fromTo(
        q('.mv6-curtain'),
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

      intro.from(q('.mv6-enter'), {
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
      const scena = hero.querySelector('.mv6-scene');

      const journey = gsap.timeline({
        scrollTrigger: {
          id: 'musei-apertura-card',
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
        q('.mv6-progress'),
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


export default function Musei() {
  const pageRef = useRef(null);
  const usersRef = useRef(null);
  const interfaceRef = useRef(null);
  const techRef = useRef(null);
  const finalRef = useRef(null);
  const signalRef = useRef(null);
  useMuseiHero(signalRef);
  const auraRef = useRef(null);
  const cursorHaloRef = useRef(null);

  
useLayoutEffect(() => {
  const page=pageRef.current;
  if(!page) return;

  const mm=gsap.matchMedia();

  mm.add({
    desktop:'(min-width:1024px)',
    mobile:'(max-width:1023px)',
    reduce:'(prefers-reduced-motion:reduce)'
  },({conditions})=>{
    const q=s=>page.querySelectorAll(s);

    if(conditions.reduce) {
      
      return;
    }

    // Apertura gestita dal solo useMuseiHero.
      // Nuove transizioni delle sezioni esterne.
    page.querySelectorAll('[data-cinematic-block]').forEach(el=>{
      if(
        interfaceRef.current?.contains(el) ||
        finalRef.current?.contains(el) ||
        el.parentElement?.closest('[data-cinematic-block]')
      ) return;

      gsap.from(el,{
        clipPath:'inset(100% 0% 0% 0%)',
        duration:1,
        ease:'power3.inOut',
        scrollTrigger:{trigger:el,start:'top 88%',once:true}
      });
    });

    q('[data-user-row]').forEach(row=>{
      gsap.from(row,{
        scaleX:.88,
        transformOrigin:'0% 50%',
        opacity:.15,
        duration:.7,
        scrollTrigger:{trigger:row,start:'top 88%',once:true}
      });

      const line=row.querySelector('[data-user-line]');

      if(line) gsap.from(line,{
        scaleX:0,
        transformOrigin:'100% 50%',
        duration:1,
        scrollTrigger:{trigger:row,start:'top 85%',once:true}
      });
    });

    q('[data-stack-row]').forEach((row,i)=>gsap.from(row,{
      clipPath:'inset(0% 100% 0% 0%)',
      duration:.8,
      delay:i*.045,
      ease:'power3.inOut',
      scrollTrigger:{trigger:row,start:'top 90%',once:true}
    }));

    // Prospettiva della dashboard conservata.
    // Nessun blocco dello scorrimento sui pannelli più alti.
    const stage=page.querySelector('[data-interface-stage]');
    const frame=page.querySelector('[data-ui-frame]');

    if(stage&&frame) gsap.fromTo(frame,{
      scale:conditions.desktop ? 0.955 : 0.993,
      rotateX:conditions.desktop ? 3.8 : .9,
      rotateY:conditions.desktop ? -3.2 : -.55,
      transformPerspective:1600,
      transformOrigin:'50% 52%'
    },{
      scale:1,
      rotateX:0,
      rotateY:0,
      ease:'power2.inOut',
      scrollTrigger:{
        trigger:frame,
        start:'top 85%',
        end:'top 18%',
        scrub:.55
      }
    });

    if(finalRef.current) {
      gsap.from(finalRef.current.querySelector('h2'),{
        clipPath:'inset(0% 100% 0% 0%)',
        duration:1.2,
        ease:'power3.inOut',
        scrollTrigger:{
          trigger:finalRef.current,start:'top 75%',once:true
        }
      });

      gsap.from(
        finalRef.current.querySelectorAll('[data-final-kairos-copy]'),
        {
          x:26,opacity:0,stagger:.1,duration:.8,
          scrollTrigger:{
            trigger:finalRef.current,start:'top 65%',once:true
          }
        }
      );
    }
  },page);

  const timer=window.setTimeout(()=>ScrollTrigger.refresh(),120);

  return ()=>{
    window.clearTimeout(timer);
    mm.revert();
  };
}, [])
;

  return (
    <>
      <SeoMetaTags title="Gestione museale | Kairos Archive | OXO Studio" description="Opere, inventari, sedi, prestiti e documentazione per musei ecclesiastici e statali." />

      <main
        ref={pageRef}
        className="kairos-page kairos-musei-v4 kairos-musei-page relative overflow-x-hidden bg-[#020203] text-white"
      >
        <div
          ref={auraRef}
          className="kairos-cinematic-aura"
          aria-hidden="true"
        />

        <div
          ref={cursorHaloRef}
          className="kairos-cursor-halo hidden md:block"
          aria-hidden="true"
        />

        <style>{`
          .kairos-page,
          .kairos-page * {
            font-family:
              "Eurostile",
              "Microgramma",
              "Bank Gothic",
              "Orbitron",
              "Michroma",
              "Arial Narrow",
              sans-serif;
          }

          .kairos-page {
            --kairos-cyan:#35d8ff;
            --kairos-violet:#8b5cf6;
            --kairos-green:#20f0c7;
            --kairos-pink:#ff4fd8;
          }

          .kairos-cinematic-aura {
            position: fixed;
            left: 50%;
            top: 50%;
            width: min(92vw, 1200px);
            height: min(92vw, 1200px);
            transform: translate(-50%, -50%);
            border-radius: 999px;
            pointer-events: none;
            z-index: 0;
            opacity: .14;
            background:
              conic-gradient(
                from 20deg,
                transparent 0 18deg,
                rgba(53,216,255,.16) 22deg,
                transparent 52deg 124deg,
                rgba(139,92,246,.14) 130deg,
                transparent 164deg 230deg,
                rgba(32,240,199,.12) 236deg,
                transparent 268deg 324deg,
                rgba(255,79,216,.1) 330deg,
                transparent 358deg
              );
            -webkit-mask:
              radial-gradient(
                circle,
                transparent 0 56%,
                black 57% 58%,
                transparent 59% 72%,
                black 73% 73.4%,
                transparent 74%
              );
            mask:
              radial-gradient(
                circle,
                transparent 0 56%,
                black 57% 58%,
                transparent 59% 72%,
                black 73% 73.4%,
                transparent 74%
              );
          }

          .kairos-cursor-halo {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 260px;
            margin-left: -130px;
            margin-top: -130px;
            border-radius: 999px;
            pointer-events: none;
            z-index: 3;
            opacity: .12;
            background:
              radial-gradient(
                circle,
                rgba(53,216,255,.16),
                rgba(139,92,246,.08) 38%,
                transparent 70%
              );
            filter: blur(18px);
            mix-blend-mode: screen;
          }

          .kairos-section-shell {
            position: relative;
          }

          .kairos-section-shell::before {
            content:"";
            position:absolute;
            inset:0;
            pointer-events:none;
            background:
              radial-gradient(
                circle at 12% 20%,
                rgba(53,216,255,.035),
                transparent 30%
              ),
              radial-gradient(
                circle at 88% 78%,
                rgba(139,92,246,.035),
                transparent 34%
              );
          }







          .kairos-ghost-word {
            position:absolute;
            pointer-events:none;
            user-select:none;
            white-space:nowrap;
            font-size:clamp(90px, 15vw, 280px);
            line-height:.75;
            letter-spacing:-.08em;
            color:rgba(255,255,255,.018);
          }



          .kairos-record-glass {
            background:
              linear-gradient(
                140deg,
                rgba(255,255,255,.035),
                rgba(255,255,255,.012) 42%,
                transparent 70%
              );
            box-shadow:
              inset 0 1px 0 rgba(255,255,255,.04),
              0 30px 90px rgba(0,0,0,.22);
            backdrop-filter: blur(12px);
          }

          .kairos-interface-vignette {
            pointer-events:none;
            position:absolute;
            inset:0;
            z-index:2;
            background:
              radial-gradient(
                ellipse at center,
                transparent 54%,
                rgba(0,0,0,.16) 78%,
                rgba(0,0,0,.44) 100%
              );
          }

          .kairos-ui-shell {
            transform-style: preserve-3d;
            will-change: transform, filter;
          }

          .kairos-ui-shell::before {
            content:"";
            position:absolute;
            inset:-1px;
            pointer-events:none;
            z-index:3;
            border:1px solid rgba(255,255,255,.05);
            box-shadow:
              inset 0 0 0 1px rgba(255,255,255,.015),
              0 0 0 1px rgba(53,216,255,.02);
          }

          .kairos-final-orbit {
            position:absolute;
            right:-14vw;
            top:-22vw;
            width:55vw;
            height:55vw;
            border-radius:999px;
            border:1px solid rgba(255,255,255,.04);
            box-shadow:
              0 0 0 12vw rgba(255,255,255,.008),
              0 0 0 24vw rgba(255,255,255,.005);
          }

          .kairos-signal-stage {
            isolation: isolate;
          }

          .kairos-card-shell {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(92vw, 1540px);
            aspect-ratio: 1.72 / 1;
            transform: translate(-50%, -50%);
            z-index: 5;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,.17);
            box-shadow:
              inset 0 0 0 1px rgba(53,216,255,.018),
              0 0 28px rgba(0,0,0,.35);
          }

          .kairos-card-shell::before {
            content: "";
            position: absolute;
            left: -1px;
            top: -1px;
            width: 42%;
            height: 1px;
            background:
              linear-gradient(
                90deg,
                rgba(53,216,255,.92),
                rgba(53,216,255,.22),
                transparent
              );
          }

          .kairos-card-shell::after {
            content: "";
            position: absolute;
            right: -1px;
            top: -1px;
            width: 42%;
            height: 1px;
            background:
              linear-gradient(
                270deg,
                rgba(255,79,216,.76),
                rgba(139,92,246,.22),
                transparent
              );
          }

          .kairos-card-corner {
            position: absolute;
            width: 12px;
            height: 12px;
            border: 1px solid rgba(255,255,255,.22);
            pointer-events: none;
          }

          .kairos-card-corner--tl { left: -1px; top: -1px; border-right:0; border-bottom:0; }
          .kairos-card-corner--tr { right: -1px; top: -1px; border-left:0; border-bottom:0; }
          .kairos-card-corner--bl { left: -1px; bottom: -1px; border-right:0; border-top:0; }
          .kairos-card-corner--br { right: -1px; bottom: -1px; border-left:0; border-top:0; }

          .kairos-card-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(47vw, 690px);
            height: min(47vw, 690px);
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 8;
          }

          .kairos-card-orbit-ring {
            position: absolute;
            inset: 0;
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.07);
          }

          .kairos-card-orbit-ring:nth-child(2) {
            inset: 6%;
            border-color: rgba(53,216,255,.15);
            border-style: dashed;
          }

          .kairos-card-orbit-ring:nth-child(3) {
            inset: 13%;
            border-color: rgba(255,255,255,.075);
          }

          .kairos-card-orbit-ring:nth-child(4) {
            inset: 21%;
            border-color: rgba(139,92,246,.13);
          }

          .kairos-card-orbit-ring:nth-child(5) {
            inset: 31%;
            border-color: rgba(255,255,255,.09);
          }

          .kairos-card-inner-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 69%;
            height: 56%;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }

          .kairos-card-loop {
            position: absolute;
            top: 50%;
            width: 58%;
            height: 76%;
            border: 1px solid rgba(255,255,255,.095);
            border-radius: 50%;
            transform: translateY(-50%);
          }

          .kairos-card-loop--left {
            left: -1%;
            transform: translateY(-50%) rotate(14deg);
            border-right-color: rgba(53,216,255,.19);
            box-shadow: inset -10px 0 26px rgba(53,216,255,.018);
          }

          .kairos-card-loop--right {
            right: -1%;
            transform: translateY(-50%) rotate(-14deg);
            border-left-color: rgba(255,79,216,.18);
            box-shadow: inset 10px 0 26px rgba(255,79,216,.018);
          }

          .kairos-card-inner-ring {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 58%;
            height: 58%;
            transform: translate(-50%, -50%);
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.065);
          }

          .kairos-card-arc {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 84%;
            height: 84%;
            border-radius: 999px;
            border: 1px solid transparent;
            transform: translate(-50%, -50%);
            pointer-events: none;
          }

          .kairos-card-arc--cyan {
            border-top-color: rgba(53,216,255,.26);
            border-left-color: rgba(53,216,255,.11);
            transform: translate(-50%, -50%) rotate(-24deg);
          }

          .kairos-card-arc--violet {
            border-bottom-color: rgba(255,79,216,.22);
            border-right-color: rgba(139,92,246,.12);
            transform: translate(-50%, -50%) rotate(22deg);
          }

          .kairos-card-tick {
            position: absolute;
            width: 1px;
            height: 10px;
            background: rgba(255,255,255,.42);
            transform-origin: 50% 50%;
          }

          .kairos-card-mini-line {
            position: absolute;
            height: 1px;
            background: rgba(255,255,255,.16);
            pointer-events: none;
          }

          .kairos-card-mini-line--cyan {
            background: linear-gradient(90deg, #35d8ff, rgba(53,216,255,.14));
          }

          .kairos-card-mini-line--violet {
            background: linear-gradient(90deg, rgba(255,79,216,.72), rgba(139,92,246,.14));
          }

          .kairos-card-bottom-bars {
            position: absolute;
            display: flex;
            gap: 10px;
            align-items: center;
            pointer-events: none;
          }

          .kairos-card-bottom-bars span {
            display: block;
            width: 2px;
            height: 11px;
            background: rgba(255,255,255,.25);
          }

          .kairos-card-bottom-bars span:nth-child(4n+1) {
            background: rgba(255,79,216,.68);
          }

          .kairos-card-axis-x,
          .kairos-card-axis-y {
            position: absolute;
            left: 50%;
            top: 50%;
            pointer-events: none;
          }

          .kairos-card-axis-x {
            width: 118%;
            height: 1px;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(255,255,255,.12),
                rgba(53,216,255,.4),
                rgba(255,79,216,.28),
                rgba(255,255,255,.12),
                transparent
              );
          }

          .kairos-card-axis-y {
            width: 1px;
            height: 118%;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                180deg,
                transparent,
                rgba(255,255,255,.12),
                rgba(53,216,255,.34),
                rgba(255,79,216,.22),
                rgba(255,255,255,.12),
                transparent
              );
          }

          .kairos-card-node {
            position: absolute;
            width: 10px;
            height: 10px;
            border: 1px solid rgba(255,255,255,.62);
            background: rgba(0,0,0,.72);
            pointer-events: none;
          }

          .kairos-card-node--cyan {
            border-color: rgba(53,216,255,.96);
            box-shadow: 0 0 14px rgba(53,216,255,.14);
          }

          .kairos-card-node--violet {
            border-color: rgba(255,79,216,.82);
            box-shadow: 0 0 14px rgba(255,79,216,.12);
          }

          .kairos-card-crosshair {
            position: absolute;
            width: 18px;
            height: 18px;
            pointer-events: none;
          }

          .kairos-card-crosshair::before,
          .kairos-card-crosshair::after {
            content: "";
            position: absolute;
            background: rgba(255,255,255,.4);
          }

          .kairos-card-crosshair::before {
            width: 1px;
            height: 100%;
            left: 50%;
            top: 0;
          }

          .kairos-card-crosshair::after {
            height: 1px;
            width: 100%;
            top: 50%;
            left: 0;
          }

          .kairos-card-ruler {
            position: absolute;
            display: flex;
            flex-direction: column;
            gap: 11px;
            pointer-events: none;
            opacity: .66;
          }

          .kairos-card-ruler span {
            display: block;
            width: 9px;
            height: 1px;
            background: rgba(255,255,255,.35);
          }

          .kairos-card-dots {
            position: absolute;
            display: grid;
            grid-template-columns: repeat(6, 2px);
            gap: 10px 14px;
            pointer-events: none;
            opacity: .72;
          }

          .kairos-card-dots span {
            width: 2px;
            height: 2px;
            border-radius: 999px;
            background: rgba(255,255,255,.65);
          }

          .kairos-card-center-copy {
            position: absolute;
            left: 50%;
            top: 50%;
            z-index: 18;
            transform: translate(-50%, -50%);
            width: min(78vw, 980px);
            text-align: center;
            pointer-events: none;
          }

          .kairos-card-center-title {
            font-size: clamp(3.8rem, 8.4vw, 8.4rem);
            line-height: .72;
            letter-spacing: -.06em;
            text-transform: uppercase;
            color: white;
            text-shadow:
              0 0 10px rgba(255,255,255,.06),
              0 0 30px rgba(53,216,255,.03);
          }

          .kairos-card-center-sub {
            margin-top: .26em;
            font-size: clamp(.8rem, 1.7vw, 1.55rem);
            letter-spacing: .62em;
            padding-left: .62em;
            text-transform: uppercase;
            color: rgba(255,255,255,.78);
          }

          .kairos-card-meta {
            position: absolute;
            z-index: 18;
            font-size: 7px;
            line-height: 1.55;
            letter-spacing: .34em;
            text-transform: uppercase;
            color: rgba(255,255,255,.38);
            pointer-events: none;
          }

          .kairos-card-accent-line {
            position: absolute;
            width: 92px;
            height: 2px;
            background:
              linear-gradient(
                90deg,
                #35d8ff,
                rgba(139,92,246,.8),
                rgba(255,79,216,.75)
              );
            pointer-events: none;
            box-shadow: 0 0 14px rgba(53,216,255,.14);
          }

          .kairos-card-bottom-rule {
            position: absolute;
            left: 4.5%;
            right: 4.5%;
            bottom: 14%;
            height: 1px;
            background:
              linear-gradient(
                90deg,
                rgba(255,255,255,.16),
                transparent 32%,
                transparent 68%,
                rgba(255,255,255,.13)
              );
            pointer-events: none;
          }

          .kairos-signal-stage::before {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background:
              radial-gradient(circle at 50% 50%, rgba(53,216,255,.035), transparent 26%),
              radial-gradient(circle at 50% 50%, rgba(139,92,246,.025), transparent 46%);
          }

          .kairos-signal-frame {
            position: absolute;
            inset: 8% 4vw;
            pointer-events: none;
            border: 1px solid rgba(255,255,255,.035);
          }

          .kairos-signal-frame::before,
          .kairos-signal-frame::after {
            content: "";
            position: absolute;
            background: rgba(255,255,255,.12);
          }

          .kairos-signal-frame::before {
            left: 50%;
            top: -12px;
            width: 1px;
            height: 24px;
          }

          .kairos-signal-frame::after {
            left: -12px;
            top: 50%;
            width: 24px;
            height: 1px;
          }

          .kairos-signal-orbit {
            position: absolute;
            left: 50%;
            top: 50%;
            width: min(44vw, 720px);
            height: min(44vw, 720px);
            transform: translate(-50%, -50%);
            border-radius: 999px;
            border: 1px solid rgba(255,255,255,.04);
            pointer-events: none;
          }

          .kairos-signal-orbit::before,
          .kairos-signal-orbit::after {
            content: "";
            position: absolute;
            border-radius: inherit;
            border: 1px solid rgba(255,255,255,.025);
          }

          .kairos-signal-orbit::before {
            inset: 12%;
          }

          .kairos-signal-orbit::after {
            inset: 28%;
          }

          .kairos-signal-coordinate {
            position: absolute;
            font-size: 7px;
            letter-spacing: .32em;
            text-transform: uppercase;
            color: rgba(255,255,255,.2);
            pointer-events: none;
          }

          .kairos-signal-coreline {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 82%;
            height: 1px;
            transform: translate(-50%, -50%);
            background:
              linear-gradient(
                90deg,
                transparent,
                rgba(53,216,255,.16),
                rgba(255,255,255,.24),
                rgba(139,92,246,.16),
                transparent
              );
            pointer-events: none;
          }

          .kairos-signal-row {
            will-change: transform;
            transform-origin: 50% 50%;
          }

          [data-kairos-signal-rows-wrap] {
            overflow: hidden;
          }

          [data-kairos-signal-rows-wrap] {
            -webkit-mask-image:
              radial-gradient(
                circle at center,
                transparent 0 9%,
                rgba(0,0,0,.78) 18%,
                black 38%,
                black 100%
              );
            mask-image:
              radial-gradient(
                circle at center,
                transparent 0 9%,
                rgba(0,0,0,.78) 18%,
                black 38%,
                black 100%
              );
          }

          [data-kairos-signal-lead-inner] {
            will-change: transform, opacity, filter, letter-spacing;
          }

          [data-kairos-signal-circle] {
            will-change: transform, opacity, border-radius;
          }


          .kairos-signal-window {
            box-shadow:
              0 0 80px rgba(53,216,255,.08),
              inset 0 0 0 1px rgba(255,255,255,.035);
            backdrop-filter: blur(2px);
          }

          @media (max-width: 767px) {
            .kairos-card-shell {
              width: calc(100vw - 24px);
              aspect-ratio: .72 / 1;
            }

            .kairos-card-orbit {
              width: 84vw;
              height: 84vw;
            }

            .kairos-card-center-copy {
              width: 86vw;
            }

            .kairos-card-center-title {
              font-size: 14vw;
            }

            .kairos-card-center-sub {
              font-size: 3.4vw;
              letter-spacing: .45em;
            }

            .kairos-card-meta {
              font-size: 5px;
              letter-spacing: .22em;
            }

            .kairos-card-dots {
              transform: scale(.72);
              transform-origin: top right;
            }

            .kairos-card-ruler {
              opacity: .42;
            }

            .kairos-signal-row {
              will-change: transform;
            }


            [data-kairos-signal-circle] {
              width: 56vw;
              height: 56vw;
            }

            .kairos-signal-frame {
              inset: 10% 12px;
            }

            .kairos-signal-orbit {
              width: 72vw;
              height: 72vw;
            }

            .kairos-signal-coordinate {
              font-size: 6px;
              letter-spacing: .22em;
            }

            [data-kairos-signal-rows-wrap] {
              -webkit-mask-image:
                radial-gradient(
                  circle at center,
                  transparent 0 12%,
                  rgba(0,0,0,.82) 24%,
                  black 46%,
                  black 100%
                );
              mask-image:
                radial-gradient(
                  circle at center,
                  transparent 0 12%,
                  rgba(0,0,0,.82) 24%,
                  black 46%,
                  black 100%
                );
            }
          }

          .kairos-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
            background-size: 68px 68px;
            mask-image:
              linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);
          }

          .kairos-noise::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            opacity: .05;
            background-image:
              url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.85'/%3E%3C/svg%3E");
            mix-blend-mode: soft-light;
          }



          .kairos-ui-shell {
            box-shadow:
              0 40px 120px rgba(0,0,0,.5),
              0 0 0 1px rgba(255,255,255,.08);
          }

          .kairos-real-dashboard {
            --kd-bg:#0d0d0e;
            --kd-panel:#171717;
            --kd-panel-2:#1b1b1b;
            --kd-line:#2a2a2a;
            --kd-soft:#a0a0a0;
            --kd-text:#ededed;
            --kd-blue:#4f46e5;
            font-family:
              "SFMono-Regular",
              "Menlo",
              "Monaco",
              "Consolas",
              monospace !important;
            background:#0d0d0e;
            color:#ededed;
          }

          .kairos-real-dashboard * {
            font-family: inherit !important;
          }

          .kd-sidebar {
            background:#181818;
            border-right:1px solid #2a2a2a;
          }

          .kd-topbar {
            background:#0b0b0c;
            border-bottom:1px solid #242424;
          }

          .kd-card {
            background:
              linear-gradient(180deg, rgba(255,255,255,.018), transparent),
              #171717;
            border:1px solid #2b2b2b;
          }

          .kd-panel {
            background:#171717;
            border:1px solid #2b2b2b;
          }

          .kd-nav-active {
            background:#292929;
            color:#fff;
          }

          .kd-nav-item {
            transition:
              background-color .22s ease,
              color .22s ease,
              transform .22s ease;
          }

          .kd-nav-item:hover {
            background:#222;
            color:#fff;
            transform:translateX(2px);
          }

          .kd-chart-grid {
            background-image:
              linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px);
            background-size:100% 52px;
          }

          .kd-bar {
            background:
              linear-gradient(
                180deg,
                rgba(255,255,255,.48),
                rgba(255,255,255,.10)
              );
            border:1px solid rgba(255,255,255,.08);
          }

          .kd-donut {
            background:
              conic-gradient(
                rgba(32,240,199,.72) 0deg 246deg,
                rgba(139,92,246,.70) 246deg 281deg,
                rgba(53,216,255,.68) 281deg 336deg,
                rgba(255,79,216,.62) 336deg 360deg
              );
            box-shadow:
              0 0 42px rgba(53,216,255,.035),
              0 0 64px rgba(139,92,246,.025);
          }

          .kd-donut::after {
            content:"";
            position:absolute;
            inset:18%;
            border-radius:999px;
            background:#171717;
            border:1px solid #0d0d0e;
          }

          .kd-scrollbar {
            scrollbar-width:thin;
            scrollbar-color:#5f5f5f #141414;
          }

          @media (max-width: 1023px) {
            [data-interface-stage] {
              perspective: 1100px;
            }

            [data-ui-frame] {
              transform-style: preserve-3d;
              backface-visibility: hidden;
              will-change: transform, filter;
            }

            .kairos-real-dashboard {
              width: 100%;
              overflow: hidden;
            }
          }

          @media (max-width: 767px) {
            .kairos-cursor-halo {
              display:none !important;
            }

            .kairos-cinematic-aura {
              opacity:.08;
              width:120vw;
              height:120vw;
            }

            .kairos-ghost-word {
              font-size:28vw;
            }

            .kairos-grid {
              background-size: 44px 44px;
            }

            [data-interface-stage] {
              padding-left: 10px;
              padding-right: 10px;
              perspective: 900px;
            }

            [data-ui-frame] {
              border-radius: 16px !important;
              transform-style: preserve-3d;
              transform-origin: 50% 48%;
            }

            /*
             * Mobile = vera dashboard responsive:
             * layout interno a griglia, niente canvas desktop ridotto.
             * L'effetto 3D resta sul frame esterno.
             */
            .kairos-real-dashboard {
              width: 100%;
              min-width: 0;
              transform-origin: 50% 50%;
            }

            .kairos-real-dashboard .kd-card,
            .kairos-real-dashboard .kd-panel {
              min-width: 0;
            }

            .kairos-real-dashboard .kd-chart-grid {
              background-size: 100% 42px;
            }
          }

          @media (prefers-reduced-motion: reduce) {
          }
        
/* OXO_MUSEI_V4: stili circoscritti alla pagina museale. */
.m4-hero{position:relative;min-height:100svh;background:#020203;isolation:isolate;overflow:hidden;padding:150px 5vw 95px;display:grid;grid-template-columns:1.2fr .8fr;align-items:center;gap:3vw}
.m4-shutters{position:absolute;inset:0;display:flex;pointer-events:none;z-index:5}
.m4-shutters>span{transform:scaleY(0);transform-origin:50% 0%;flex:1;background:#14131d;border-right:1px solid #332e4c}
.m4-hero-copy{position:relative;z-index:2}
.m4-eyebrow{font-size:10px;letter-spacing:.3em;color:#35d8ff}
.m4-hero h1{font-size:clamp(2.7rem,7vw,8.5rem);line-height:.95;letter-spacing:-.045em;margin:30px 0}
.m4-hero h1 span{display:block}
.m4-hero h1 span+span{color:#c6b9fa}
.m4-intro-text{max-width:600px;font-size:clamp(18px,1.8vw,28px);line-height:1.4;color:#b9bac4}
.m4-hero-link{display:inline-flex;gap:28px;border-bottom:1px solid #a78bfa;padding:14px 0;margin-top:24px;color:white;font-size:12px}
.m4-gallery{display:flex;align-items:center;min-width:0;perspective:1000px;gap:12px}
.m4-tile{position:relative;min-width:0;width:33.33%;height:340px;display:flex;flex-direction:column;padding:16px 12px;border:1px solid #494154;background:linear-gradient(160deg,#1c172b,#080a11);box-shadow:10px 20px 35px #0007}
.m4-tile:nth-child(2){margin-top:110px;border-color:#325761}
.m4-tile:nth-child(3){margin-top:-60px}
.m4-tile>span{font-size:8px;letter-spacing:.2em;color:#a78bfa}
.m4-tile strong{font-size:clamp(15px,1.65vw,26px);writing-mode:vertical-rl;transform:rotate(180deg);margin:auto 0 16px;align-self:flex-start}
.m4-tile small{font-size:9px;color:#aaa}
.m4-tile-lines{position:absolute;inset:45px 12px 60px;border:1px solid #ffffff0e;pointer-events:none}
.m4-tile-lines i{display:block;height:1px;background:linear-gradient(90deg,transparent,#8b5cf6,transparent);margin-top:38px}
.m4-tile:nth-child(2) i{background:linear-gradient(90deg,transparent,#35d8ff,transparent)}
.m4-hero-bottom{position:absolute;bottom:32px;left:5vw;right:5vw;border-top:1px solid #ffffff25;padding-top:18px;font-size:9px;letter-spacing:.23em;color:#9d9cac}

.kairos-musei-v4 .kairos-cinematic-aura,
.kairos-musei-v4 .kairos-cursor-halo,
.kairos-musei-v4 .kairos-final-orbit{display:none}
.kairos-musei-v4 [data-kairos-parallax-line]{display:none}
.kairos-musei-v4 [data-stack-row]{border-left:1px solid #35d8ff55;padding-left:24px}
.kairos-musei-v4 [data-ui-frame]{max-width:100%;min-width:0}
.kairos-musei-v4 [data-interface-stage]{min-height:0!important}
.kairos-musei-v4 :is(button,a,summary):focus-visible{outline:2px solid #35d8ff;outline-offset:3px}
.kairos-musei-v4 #musei-pannello{scroll-margin-top:90px}

.m4-client{padding:18px 0 12px}
.m4-client h3{font-size:clamp(17px,1.65vw,27px);font-weight:600;line-height:1.3}
.m4-client p{font-size:10px;color:#a1a1ae;margin-top:6px}
.m4-client small{display:inline-block;color:#c7b8ef;font-size:9px;border:1px solid #635579;padding:4px 8px;margin-bottom:8px}

.m4-chart-head{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:18px;border-bottom:1px solid #2b2b2b}
.m4-chart-head h4,.m4-types h4,.m4-progress h4{font-size:12px;font-weight:600}
.m4-chart-head p,.m4-types>p,.m4-progress>p{font-size:10px;color:#aaa;margin-top:6px}
.m4-switch{display:flex;gap:8px;margin-top:12px}
.m4-switch button{padding:5px 11px;border:1px solid #4a4357;font-size:10px;color:#b7afc6;background:#202025;border-radius:4px}
.m4-switch button[aria-pressed=true]{background:#6d4bb3;border-color:#a58be0;color:white}
.m4-totals{display:flex;flex-shrink:0}
.m4-totals>div{border-left:1px solid #343039;padding:10px 18px}
.m4-totals small{font-size:9px;color:#aaa;display:block}
.m4-totals strong{font-size:27px;display:block}

.m4-plot{height:280px;display:flex;padding:25px 18px 5px;gap:10px}
.m4-scale{width:23px;flex-shrink:0;display:flex;flex-direction:column;justify-content:space-between;padding-bottom:35px;font-size:8px;color:#888}
.m4-chart-body{flex:1;min-width:0;display:flex;flex-direction:column}
.m4-bars{display:flex;gap:7px;flex:1;min-height:0;background:repeating-linear-gradient(to top,#ffffff10 0 1px,transparent 1px 25%)}
.m4-group{flex:1;min-width:0;height:100%}
.m4-pair{height:100%;display:flex;gap:3px;align-items:flex-end;justify-content:center}
.m4-bar{position:relative;width:42%;max-width:44px;background:linear-gradient(#a78bfa,#6e51c440);border-top:1px solid #cbb9ff;border-radius:3px 3px 0 0}
.m4-bar span{position:absolute;top:-16px;left:50%;transform:translateX(-50%);font-size:8px;color:#d7cdf4}
.m4-move{width:26%;background:linear-gradient(#35d8ff,#35d8ff22);border-color:#8ae8ff}
.m4-move span{color:#8ae8ff}
.m4-dates{height:35px;display:flex;gap:7px;align-items:flex-start;padding-top:7px}
.m4-dates>span{flex:1;text-align:center;min-width:0;font-size:7px;color:#b1adb7;line-height:1.4}
.m4-legend{display:flex;justify-content:center;gap:22px;font-size:10px;padding:10px}
.m4-legend span:first-child{color:#c4b5fd}
.m4-legend span+span{color:#67e8f9}
.m4-data{border-top:1px solid #303030;padding:10px 16px;font-size:10px;color:#b4b1b8}
.m4-data summary{cursor:pointer}
.m4-table{overflow:auto}
.m4-table table{width:100%;text-align:left}
.m4-table td,.m4-table th{padding:7px}
.m4-table caption{text-align:left;padding:10px 0}

.m4-category{margin-top:22px}
.m4-category>div:first-child{display:flex;justify-content:space-between;gap:10px;font-size:10px;margin-bottom:10px;color:#c5c2c9}
.m4-category small{font-weight:400;color:#999}
.m4-track{height:7px;background:#29282c;border-radius:8px;overflow:hidden}
.m4-track>span{display:block;height:100%;border-radius:8px}
.m4-completion{display:flex;align-items:center;gap:18px;margin:18px 0}
.m4-completion>strong{font-size:30px}
.m4-completion>span{font-size:10px;color:#bbb;line-height:1.8}
.m4-trend{width:100%;height:140px;display:block}
.m4-progress .m4-trend-note{font-size:9px;color:#c1b2dc;margin-top:0}

@media(max-width:1023px){
  .m4-hero{grid-template-columns:1fr;padding-top:130px}
  .m4-gallery{max-width:620px;width:100%;margin:30px auto 0;gap:18px}
  .m4-tile{height:210px}
  .m4-tile:nth-child(2){margin-top:35px}
  .m4-tile:nth-child(3){margin-top:0}
  .m4-tile strong{font-size:22px}
  .kairos-musei-v4 [data-ui-frame] [class*="min-w-[700px]"]{min-width:0!important}
  .kairos-musei-v4 [data-ui-frame] .kd-sidebar{min-width:0}
}
@media(max-width:767px){
  .m4-hero{padding-top:115px;padding-bottom:100px}
  .m4-hero h1{font-size:clamp(36px,11vw,62px)}
  .m4-hero-bottom{font-size:8px;letter-spacing:.12em;line-height:1.8}
  .m4-gallery{gap:8px}
  .m4-tile{height:190px;padding:12px 8px}
  .m4-tile strong{font-size:18px}
  .m4-tile small{font-size:8px}
  .m4-chart-head{align-items:flex-start;flex-direction:column;padding:14px}
  .m4-totals{width:100%}
  .m4-totals>div{width:50%;padding:6px 12px}
  .m4-plot{height:230px;padding:24px 9px 3px;gap:3px}
  .m4-bars,.m4-dates{gap:3px}
  .m4-dates{height:44px}
  .m4-scale{padding-bottom:44px}
  .m4-dates>span{font-size:6px}
  .m4-bar span{font-size:7px}
  .m4-pair{gap:2px}
  .m4-legend{font-size:9px}
  .m4-tile-lines{inset:35px 6px 50px}
}
@media(prefers-reduced-motion:reduce){
  .m4-shutters{display:none}
  .kairos-musei-v4 *{
    animation:none!important;
    transition:none!important;
    scroll-behavior:auto!important;
  }
}


/* OXO_MUSEI_HERO_V5 — nessuna regola per la dashboard. */
.m4-hero{
  --mh-x:50%;--mh-y:50%;--mh-light:0;
  grid-template-columns:1.15fr .85fr;
  perspective:1400px;
}
.m4-hero::before{
  content:'';
  position:absolute;inset:0;pointer-events:none;z-index:0;
  opacity:var(--mh-light);
  background:radial-gradient(
    ellipse 360px 280px at var(--mh-x) var(--mh-y),
    #8b5cf626,transparent 80%
  );
  transition:opacity .5s;
}
.m4-hero .m4-hero-copy{min-width:0;z-index:3}
.m4-hero h1{
  margin:22px 0 30px;
  font-size:clamp(82px,13.3vw,216px);
  line-height:.92;letter-spacing:-.05em;
}
.m4-hero h1 .mh-title-line{
  display:block;overflow:hidden;padding:.13em 0;
  perspective:1000px;white-space:nowrap;
}
.m4-hero h1 .mh-letter{
  display:inline-block;color:#f5f3f9;
  backface-visibility:hidden;transform-origin:50% 100%;
}
.m4-hero h1 .mh-title-sub{
  display:block;
  font-size:clamp(26px,4vw,66px);
  letter-spacing:-.035em;line-height:1.15;
  color:#c4b5fd;margin-top:4px;
}
.m4-hero .m4-intro-text{
  max-width:570px;font-size:clamp(18px,1.45vw,23px);
}
.m4-hero .m4-hero-link{
  align-items:center;min-height:48px;
  gap:26px;font-size:12px;border-bottom-color:#8b5cf6;
}
.m4-hero .m4-hero-link>span{
  display:inline-grid;place-items:center;
  width:40px;height:40px;
  border:1px solid #75648b;border-radius:50%;font-size:19px;
}
.m4-hero .m4-hero-link:focus-visible{
  outline:2px solid #35d8ff;outline-offset:7px;
}
.m4-hero .m4-gallery{
  position:relative;display:block;width:100%;height:450px;
  perspective:1100px;transform-style:preserve-3d;
  margin:0;z-index:2;
}
.m4-hero .m4-tile{
  position:absolute;top:50%;left:50%;
  width:clamp(140px,14vw,225px);height:320px;
  margin:0!important;padding:18px;
  border:1px solid #665479;
  background:linear-gradient(145deg,#292137,#100f1c 58%,#131a24);
  box-shadow:0 25px 60px #0009;
  backface-visibility:hidden;
  transform:translate(-115%,-42%) rotate(-12deg);
}
.m4-hero .m4-tile:nth-child(2){
  transform:translate(-50%,-56%);z-index:3;
  border-color:#528195;
  background:linear-gradient(145deg,#172d35,#12121e 64%,#282036);
}
.m4-hero .m4-tile:nth-child(3){
  transform:translate(15%,-42%) rotate(12deg);
  border-color:#8e527f;
}
.m4-hero .m4-tile::after{
  content:'';position:absolute;inset:6px;
  border:1px solid #ffffff12;pointer-events:none;
}
.m4-hero .m4-tile strong{
  font-size:clamp(20px,2.1vw,32px);letter-spacing:.035em;
}
.m4-hero .m4-tile>span{color:#c2b4d8;font-size:9px}
.m4-hero .m4-tile small{color:#b1aaba;font-size:10px}
.m4-hero .m4-tile-lines{
  inset:52px 15px 72px;transform:skewY(-8deg);
}
@media(max-width:1023px){
  .m4-hero{grid-template-columns:1fr;padding-bottom:105px}
  .m4-hero h1{font-size:clamp(90px,19vw,190px)}
  .m4-hero h1 .mh-title-sub{
    font-size:clamp(28px,6vw,52px);
  }
  .m4-hero .m4-gallery{
    height:340px;max-width:600px;margin:30px auto 0;
  }
  .m4-hero .m4-tile{
    width:clamp(105px,24vw,175px);height:250px;padding:12px;
    transform:translate(-107%,-42%) rotate(-12deg);
  }
  .m4-hero .m4-tile:nth-child(2){
    transform:translate(-50%,-56%);
  }
  .m4-hero .m4-tile:nth-child(3){
    transform:translate(7%,-42%) rotate(12deg);
  }
}
@media(max-width:479px){
  .m4-hero{padding-top:112px}
  .m4-hero h1{font-size:clamp(72px,22vw,108px)}
  .m4-hero .m4-gallery{height:290px}
  .m4-hero .m4-tile{height:205px;width:105px}
  .m4-hero .m4-tile strong{font-size:20px}
  .m4-hero .m4-tile small{font-size:8px}
}
@media(prefers-reduced-motion:reduce){
  .m4-hero::before,.m4-hero .m4-shutters{display:none}
  .m4-hero *{
    animation:none!important;transition:none!important;
  }
}


/* MUSEI_V6: effetti circoscritti all’apertura. */
.mv6-hero{position:relative;isolation:isolate;display:grid;grid-template-columns:1.15fr .85fr;align-items:center;gap:2vw;min-height:100svh;padding:126px 5vw 110px;overflow:hidden;background:#020203;color:#f8f6ff}
.mv6-hero:before{content:'';position:absolute;inset:0;pointer-events:none;z-index:0;background:linear-gradient(115deg,transparent 20%,#8b5cf60d,transparent 75%),repeating-linear-gradient(90deg,transparent 0 calc(20% - 1px),#ffffff08 calc(20% - 1px) 20%)}
.mv6-light{position:absolute;left:0;top:0;width:650px;height:650px;margin:-325px;pointer-events:none;z-index:0;background:radial-gradient(ellipse,#8b5cf624,transparent 68%)}
.mv6-curtains{display:flex;position:absolute;inset:0;pointer-events:none;z-index:10}
.mv6-curtain{flex:1;transform:scaleY(0);background:#131019;border-right:1px solid #2c253d}
.mv6-copy{position:relative;z-index:3;min-width:0}
.mv6-eyebrow{font-size:10px;letter-spacing:.28em;color:#76d9ed}
.mv6-copy h1{margin:22px 0 25px;font-weight:400}
.mv6-word{position:relative;display:block;width:fit-content;font-size:clamp(80px,12.2vw,190px);line-height:1.05;letter-spacing:-.065em;white-space:nowrap;overflow:hidden;padding-right:.07em}
.mv6-outline{color:transparent;-webkit-text-stroke:1px #a99cbd77}
.mv6-slice{position:absolute;inset:0;color:#f5f1fc;will-change:transform}
.mv6-subtitle{display:block;margin-top:10px;font-size:clamp(25px,3.45vw,54px);line-height:1.12;letter-spacing:-.025em;color:#c1acef}
.mv6-description{max-width:590px;font-size:clamp(17px,1.35vw,22px);line-height:1.65;color:#b5b0bf}
.mv6-link{display:inline-flex;align-items:center;gap:24px;padding:15px 0 12px;border-bottom:1px solid #9777c9;margin-top:23px;font-size:12px;color:#fff;text-decoration:none}
.mv6-link span{display:grid;place-items:center;width:45px;height:45px;border:1px solid #665278;border-radius:50%;font-size:22px}
.mv6-hero a:focus-visible{outline:2px solid #35d8ff;outline-offset:7px}
.mv6-scene{position:relative;height:490px;min-width:0;perspective:1300px;z-index:2}
.mv6-depth,.mv6-tilt{position:absolute;inset:0;transform-style:preserve-3d}
.mv6-portals{position:absolute;inset:20px 0 20px -15px;transform-style:preserve-3d;transform:rotateY(-16deg) rotateX(7deg)}
.mv6-portals i{position:absolute;border:1px solid #7e639b55;box-shadow:inset 0 0 35px #8b5cf608;clip-path:polygon(0 0,88% 0,100% 12%,100% 100%,12% 100%,0 88%)}
.mv6-portals i:nth-child(2n){border-color:#35d8ff38}
.mv6-plane{position:absolute;display:flex;flex-direction:column;justify-content:flex-end;gap:16px;width:70%;height:220px;padding:24px;border:1px solid #635074;background:linear-gradient(130deg,#292035fa,#0c0d16fc);box-shadow:8px 20px 50px #0009;transform-style:preserve-3d;backface-visibility:hidden}
.mv6-plane:before{content:'';position:absolute;inset:9px;border:1px solid #ffffff09;pointer-events:none}
.mv6-plane small{position:absolute;left:24px;top:24px;font-size:9px;letter-spacing:.24em;color:#c8b4e7}
.mv6-plane strong{font-size:clamp(18px,1.85vw,29px);line-height:1;letter-spacing:-.04em;font-weight:400}
.mv6-plane>span{font-size:10px;color:#b5aebe}
.mv6-plane-back{left:4%;top:9%;transform:rotateY(-18deg) rotateZ(-9deg);border-color:#686095}
.mv6-plane-middle{left:16%;top:29%;transform:translateZ(35px) rotateY(-10deg);background:linear-gradient(130deg,#173038fa,#0e1020fc);border-color:#3e6e81}
.mv6-plane-front{left:26%;top:48%;transform:translateZ(70px) rotateY(-6deg) rotateZ(9deg);border-color:#825279;background:linear-gradient(130deg,#322134fa,#15101cfc)}
.mv6-scene-note{position:absolute;bottom:-35px;left:10%;font-size:8px;letter-spacing:.27em;color:#b1a2c1}
.mv6-footer{position:absolute;bottom:30px;left:5vw;right:5vw;display:flex;justify-content:space-between;gap:16px;padding-top:18px;border-top:1px solid #ffffff22;font-size:9px;letter-spacing:.19em;color:#a199ae}
.mv6-progress{position:absolute;top:-1px;left:0;width:100%;height:1px;background:linear-gradient(90deg,#35d8ff,#a78bfa,#ff4fd8);transform:scaleX(0);transform-origin:left}
@media(max-width:1023px){
  .mv6-hero{grid-template-columns:1fr;padding-top:115px;gap:38px}
  .mv6-word{font-size:clamp(85px,19vw,170px)}
  .mv6-subtitle{font-size:clamp(28px,5vw,48px)}
  .mv6-scene{width:min(540px,100%);height:440px;margin:0 auto 30px}
  .mv6-plane strong{font-size:26px}
  .mv6-plane{height:190px}
  .mv6-plane-front{left:23%}
  .mv6-scene-note{bottom:-16px}
}
@media(max-width:479px){
  .mv6-hero{padding:110px 6vw 100px;gap:32px}
  .mv6-word{font-size:23vw}
  .mv6-eyebrow{font-size:8px;letter-spacing:.18em}
  .mv6-description{font-size:16px}
  .mv6-scene{height:340px}
  .mv6-plane{height:154px;padding:17px;gap:12px}
  .mv6-plane small{left:17px;top:18px;font-size:7px;letter-spacing:.1em}
  .mv6-plane strong{font-size:clamp(16px,5vw,21px)}
  .mv6-plane>span{font-size:8px}
  .mv6-footer{font-size:7px;letter-spacing:.1em;line-height:1.7}
  .mv6-footer span{max-width:95px;text-align:right}
  .mv6-scene-note{font-size:7px}
}
@media(hover:none){.mv6-light{display:none}}
@media(prefers-reduced-motion:reduce){
  .mv6-curtains,.mv6-light{display:none}
  .mv6-hero *{animation:none!important;transition:none!important;scroll-behavior:auto!important}
  .mv6-slice{will-change:auto}
}

`}</style>

        {/* =====================================================
            KAIROS / CARD-STYLE OPENING + SIGNAL TRANSITION
        ====================================================== */}
        

<section
  ref={signalRef}
  className="mv6-hero"
  aria-label="Gestione del patrimonio museale"
>
  <div className="mv6-light" aria-hidden="true" />

  <div className="mv6-curtains" aria-hidden="true">
    {[0,1,2,3,4,5].map(n => (
      <span key={n} className="mv6-curtain" />
    ))}
  </div>

  <div className="mv6-copy">
    <p className="mv6-enter mv6-eyebrow">
      OXO STUDIO / PATRIMONIO CULTURALE
    </p>

    <h1
      className="avant-legato-font"
      aria-label="Musei. La cultura prende forma."
    >
      <span className="mv6-word" aria-hidden="true">
        <span className="mv6-outline">MUSEI.</span>

        {[0,1,2].map(n => (
          <span
            className="mv6-slice"
            key={n}
            style={{
              clipPath:
                'inset(' + (n * 33.333) + '% 0 ' +
                ((2 - n) * 33.333) + '% 0)'
            }}
          >
            MUSEI.
          </span>
        ))}
      </span>

      <span
        className="mv6-enter mv6-subtitle"
        aria-hidden="true"
      >
        LA CULTURA<br />PRENDE FORMA.
      </span>
    </h1>

    <p className="mv6-enter mv6-description">
      Opere, luoghi e conoscenza. Un ambiente di lavoro per
      catalogare le collezioni, organizzare i prestiti e
      accompagnare la cura del patrimonio.
    </p>

    <a
      className="mv6-enter mv6-link"
      href="#musei-pannello"
    >
      Esplora il museo digitale
      <span aria-hidden="true">↗</span>
    </a>
  </div>

  <div className="mv6-scene" aria-hidden="true">
    <div className="mv6-depth">
      <div className="mv6-tilt">
        <div className="mv6-portals">
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

        <div className="mv6-plane mv6-plane-back">
          <small>01 / CONOSCERE</small>
          <strong className="avant-legato-font">
            COLLEZIONI
          </strong>
          <span>Schede, immagini e inventari</span>
        </div>

        <div className="mv6-plane mv6-plane-middle">
          <small>02 / COLLEGARE</small>
          <strong className="avant-legato-font">
            RELAZIONI
          </strong>
          <span>Opere, sedi e persone</span>
        </div>

        <div className="mv6-plane mv6-plane-front">
          <small>03 / CUSTODIRE</small>
          <strong className="avant-legato-font">
            PATRIMONIO
          </strong>
          <span>Documentazione e conservazione</span>
        </div>
      </div>
    </div>

    <p className="mv6-scene-note">
      UN’OPERA. MOLTE CONNESSIONI.
    </p>
  </div>

  <div className="mv6-footer">
    <p>MUSEI ECCLESIASTICI · COLLEZIONI PUBBLICHE</p>
    <span>SCORRI PER ESPLORARE ↓</span>
    <i className="mv6-progress" aria-hidden="true" />
  </div>
</section>



        {/* =====================================================
            PER CHI
        ====================================================== */}
        <section
          ref={usersRef}
          className="kairos-section-shell relative overflow-hidden bg-[#020203] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-45" />

          <span
            aria-hidden="true"
            className="kairos-ghost-word avant-legato-font right-[-4vw] top-[8%]"
          >
            ENTI
          </span>

          <div
            data-cinematic-block
            className="relative z-10 mb-16 flex flex-col gap-6 border-b border-white/14 pb-8 md:flex-row md:items-end md:justify-between lg:mb-24">
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-fuchsia-400 md:text-xs">
                01 / DESTINATARI
              </p>

              <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
                PER CHI
                <br />
                È PENSATO.
              </h2>
            </div>

            <p className="avant-legato-font max-w-[620px] text-xl leading-snug text-gray-300 md:text-3xl">
              Un ambiente di lavoro per musei ecclesiastici e statali, sedi conservatrici ed enti coinvolti nella documentazione del patrimonio.
            </p>
          </div>

          <div className="relative z-10">
            {USERS.map((item) => (
              <div
                key={item.id}
                data-user-row
                className="group relative grid min-h-[104px] grid-cols-[42px_1fr_auto] items-center gap-4 py-5 md:min-h-[132px] md:grid-cols-[70px_1fr_120px]"
              >
                <span className="text-[9px] uppercase tracking-[0.28em] text-white/32 md:text-[11px]">
                  {item.id}
                </span>

                <h3
                  className="avant-legato-font text-[7.2vw] uppercase leading-none tracking-[-0.06em] transition-transform duration-500 group-hover:translate-x-3 md:text-[5vw] lg:text-[3.8vw]"
                  style={{ color: "white" }}
                >
                  {item.label}
                </h3>

                <span
                  className="hidden text-right text-3xl md:block"
                  style={{ color: item.accent }}
                >
                  ↗
                </span>

                <span
                  data-user-line
                  className="absolute bottom-0 left-0 h-px w-full origin-left"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, rgba(255,255,255,.12), transparent)`,
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        {/* =====================================================
            INTERFACE
        ====================================================== */}
        <section
          ref={interfaceRef} id="musei-pannello"
          className="kairos-section-shell relative bg-[#020203]"
        >
          <div
            data-cinematic-block
            className="relative z-10 px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[14vh]"
          >
            <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-violet-400 md:text-xs">
              02 / INTERFACCIA
            </p>

            <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="IL TUO"
                  attribute="data-interface-letter"
                />
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="MUSEO."
                  attribute="data-interface-letter"
                />
              </span>
            </h2>
          </div>

          <div
            data-interface-stage
            className="kairos-noise relative flex min-h-[100svh] items-center overflow-hidden border-y border-white/12 bg-[#050506] px-3 py-8 md:px-6 md:py-12 lg:px-[3vw] lg:py-14"
          >
            <div className="kairos-grid pointer-events-none absolute inset-0 opacity-40" />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-[14vw] top-[8%] h-[42vw] w-[42vw] rounded-full bg-cyan-300/[0.035] blur-[120px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-[12vw] bottom-[5%] h-[40vw] w-[40vw] rounded-full bg-violet-500/[0.035] blur-[125px]"
            />

            <div className="relative z-10 mx-auto w-full max-w-[1780px]">
              <div
                data-ui-panel
                className="mb-5 flex flex-col gap-3 border-b border-white/14 pb-5 md:flex-row md:items-end md:justify-between"
              >
                <div>
                  <p className="text-[9px] uppercase tracking-[0.38em] text-cyan-300 md:text-[11px]">
                    KAIROS ARCHIVE / PANNELLO MUSEALE
                  </p>
                  <p className="avant-legato-font mt-2 text-xl text-white/72 md:text-2xl">
                    Il pannello museale, ricostruito nel sito.
                  </p>
                </div>

                <p className="max-w-[620px] text-[9px] uppercase leading-relaxed tracking-[0.24em] text-white/30 md:text-right md:text-[10px]">
                  Opere / sedi / prestiti / documenti. Anteprima dimostrativa: dati illustrativi, non collegati al museo.
</p>
              </div>

              <div
                data-ui-frame
                className="kairos-ui-shell kairos-record-glass kairos-real-dashboard relative overflow-hidden rounded-[18px] border border-white/10"
              >
                <div className="kairos-interface-vignette" aria-hidden="true" />
                {/* TOP APP TITLE */}
                <div className="kd-topbar flex h-10 items-center justify-center px-4 text-[9px] font-medium text-white/85">
                  Kairos Archive · Museo delle Arti di Valdombra
                </div>

                <div className="grid min-h-[620px] grid-cols-1 md:min-h-[760px] md:grid-cols-[190px_minmax(0,1fr)] lg:min-h-[820px] lg:grid-cols-[230px_1fr]">
                  {/* SIDEBAR */}
                  <aside className="kd-sidebar hidden min-w-0 flex-col md:flex">
                    <div className="flex h-[58px] items-center gap-3 border-b border-[#292929] px-3">
                      <div className="grid h-7 w-7 shrink-0 place-items-center bg-indigo-600 text-[13px] text-white">
                        ▰
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-[9px] text-white md:text-[10px] lg:text-[11px]">
                          MUSEO DI VALDOMBRA
                        </p>
                        <p className="text-[7px] text-white/38 md:text-[8px] lg:text-[9px]">CLIENTE FITTIZIO</p>
                      </div>

                      <span className="text-[12px] text-white/70">⌃⌄</span>
                    </div>

                    <nav className="flex-1 overflow-hidden px-2 py-4 text-[8px] text-white/78 md:text-[9px] lg:text-[10px]">
                      <p className="mb-2 px-1 text-[9px] text-white/42">
                        Panoramica
                      </p>

                      <div
                        data-ui-row
                        className="kd-nav-item kd-nav-active mb-1 flex items-center gap-3 rounded-sm px-2 py-2"
                      >
                        <span className="w-3 text-center">⌘</span>
                        <span>Pannello</span>
                      </div>

                      <div
                        data-ui-row
                        className="kd-nav-item flex items-center justify-between px-2 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-3 text-center">✎</span>
                          <span>Catalogazione opere</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Schede", "Opere", "Topografia"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}

                      <div
                        data-ui-row
                        className="kd-nav-item mt-2 flex items-center justify-between px-2 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-3 text-center">▣</span>
                          <span>Sedi della collezione</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Galleria del Chiostro", "Palazzo delle Arti", "Deposito Nord"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}

                      {[
                        ["⌖", "Magazzino"],
                        ["▱", "Prestiti"],
                        ["♙", "Documenti"],
                      ].map(([icon, label]) => (
                        <div
                          key={label}
                          data-ui-row
                          className="kd-nav-item mt-1 flex items-center gap-3 px-2 py-2"
                        >
                          <span className="w-3 text-center">{icon}</span>
                          <span>{label}</span>
                        </div>
                      ))}

                      <div
                        data-ui-row
                        className="kd-nav-item mt-1 flex items-center justify-between px-2 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-3 text-center">◉</span>
                          <span>Utenza</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Profilo", "Fatturazione", "Accesso"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}
                    </nav>

                    <div className="flex h-[48px] items-center gap-3 border-t border-[#2a2a2a] px-3">
                      <div className="grid h-7 w-7 place-items-center bg-violet-600 text-white">
                        ●
                      </div>
                      <p className="truncate text-[9px] text-white/80">
                        UTENTE DIMOSTRATIVO
                      </p>
                    </div>
                  </aside>

                  {/* MOBILE APP NAV */}
                  <div className="border-b border-[#292929] bg-[#181818] md:hidden">
                    <div className="flex items-center justify-between px-3 py-3">
                      <div className="flex items-center gap-2">
                        <div className="grid h-7 w-7 place-items-center bg-indigo-600 text-[12px] text-white">
                          ▰
                        </div>
                        <div>
                          <p className="text-[9px] text-white">MUSEO DI VALDOMBRA</p>
                          <p className="text-[7px] text-white/38">CLIENTE FITTIZIO</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[8px] text-white/56">
                        <span className="border border-[#303030] px-2 py-1">Panoramica</span>
                        <span className="border border-[#303030] px-2 py-1">☰</span>
                      </div>
                    </div>

                    <div className="kd-scrollbar flex gap-2 overflow-x-auto border-t border-[#242424] px-3 py-2 text-[8px] text-white/60">
                      {[
                        "Pannello",
                        "Catalogazione",
                        "Sedi museali",
                        "Magazzino",
                        "Prestiti",
                        "Documenti",
                      ].map((item, index) => (
                        <span
                          key={item}
                          className={`shrink-0 border px-2.5 py-1.5 ${
                            index === 0
                              ? "border-white/18 bg-white/[0.07] text-white"
                              : "border-white/[0.07]"
                          }`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* MAIN APP */}
                  <div className="min-w-0 bg-[#0d0d0e]">
                    {/* INNER TOPBAR */}
                    <div className="flex h-[52px] items-center justify-between border-b border-[#242424] px-3 md:h-[58px] md:px-5">
                      <div className="flex items-center gap-2 text-[8px] text-white/78 md:gap-4 md:text-[10px]">
                        <span className="text-white/80">▣</span>
                        <span className="text-white/45">Pannello</span>
                        <span className="text-white/26">/</span>
                        <span>Panoramica</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="hidden h-9 w-[210px] items-center justify-between rounded-md border border-[#2a2a2a] bg-[#0d0d0e] px-3 text-[9px] text-white/42 lg:flex">
                          <span>Cerca...</span>
                          <span className="rounded bg-[#262626] px-1.5 py-1 text-[8px] text-white/70">
                            ⌘ K
                          </span>
                        </div>

                        <div className="h-7 w-7 rounded-full border-4 border-white bg-violet-600" />
                        <div className="grid h-8 w-8 place-items-center border border-[#2a2a2a] bg-[#171717] text-[10px] text-white/60">
                          ◐
                        </div>
                        <div className="hidden h-9 items-center border border-[#2a2a2a] bg-[#171717] px-3 text-[9px] text-white/48 xl:flex">
                          Tema: Monocromatico　⌄
                        </div>
                      </div>
                    </div>

                    <div className="kd-scrollbar overflow-x-hidden p-3 md:p-5"><div className="m4-client"><small>CLIENTE FITTIZIO · TUTTI I DATI SONO SIMULATI</small><h3>Museo delle Arti di Valdombra</h3><p>Collezione di esempio · Palazzo delle Arti · situazione al 12 ottobre 2026</p></div>
                      {/* KPI ROW */}
                      <div className="grid grid-cols-2 gap-2 md:min-w-[700px] md:grid-cols-4 md:gap-3">
                        {[
  {
    "label": "Opere di proprietà",
    "value": "1.248",
    "badge": "INVENTARIO",
    "caption": "Patrimonio della collezione",
    "sub": "Quattro categorie di beni"
  },
  {
    "label": "Opere presenti",
    "value": "1.132",
    "badge": "SEDI INTERNE",
    "caption": "Palazzo delle Arti e Deposito Nord",
    "sub": "846 esposte · 286 in deposito"
  },
  {
    "label": "Schede generate",
    "value": "1.186",
    "badge": "95,0%",
    "caption": "Documentazione della collezione",
    "sub": "62 schede ancora da generare"
  },
  {
    "label": "Presso altri enti",
    "value": "116",
    "badge": "SEDI ESTERNE",
    "caption": "Prestiti e conservazione",
    "sub": "84 in prestito · 32 in restauro"
  }
].map((item) => (
                          <article
                            key={item.label}
                            data-ui-panel
                            className="kd-card min-h-[118px] p-3 md:min-h-[132px] md:p-4"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <span className="text-[9px] text-white/45">
                                {item.label}
                              </span>
                              <span className="border border-[#303030] bg-[#1c1c1c] px-1.5 py-0.5 text-[8px] text-white/68">
                                {item.badge}
                              </span>
                            </div>

                            <p className="mt-2 text-[22px] font-semibold leading-none tracking-[-.05em] text-white md:text-[28px]">
                              {item.value}
                            </p>

                            <p className="mt-5 text-[9px] font-semibold text-white/86">
                              {item.caption}
                            </p>
                            <p className="mt-1 text-[9px] text-white/40">
                              {item.sub}
                            </p>
                          </article>
                        ))}
                      </div>

                      {/* MAIN CHART */}
<AttivitaMuseoDemo />
{/* LOWER PANELS */}
                      <div className="mt-3 grid grid-cols-1 gap-3 md:min-w-[700px] lg:grid-cols-2">
                        <section
                          data-ui-panel
                          className="kd-panel min-h-[300px] p-4"
                        >
                          <h4 className="text-[11px] font-semibold text-white/92">
                            Ubicazione delle opere
                          </h4>
                          <p className="mt-1 text-[9px] text-white/42">
                            1.248 opere di proprietà, in quattro collocazioni
                          </p>

                          <div className="grid min-h-[225px] grid-cols-1 items-center gap-4 sm:grid-cols-[150px_1fr] md:grid-cols-[170px_1fr] md:gap-5">
                            <div className="flex items-center justify-center">
                              <div className="kd-donut relative h-[128px] w-[128px] rounded-full md:h-[150px] md:w-[150px]" style={{ background: "conic-gradient(#20f0c7 0% 67.7884615385%, #8b5cf6 67.7884615385% 90.7051282051%, #35d8ff 90.7051282051% 97.4358974359%, #ff4fd8 97.4358974359% 100%)" }}>
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                                  <span className="text-[26px] font-semibold leading-none text-white">{museoNumero(museoTotale)}</span>
                                  <span className="mt-2 text-[8px] text-white/46">
                                    Opere in inventario
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 text-[8px]">
                              {MUSEI_DEMO.sedi.map(([label, value, color]) => (
                                <div
                                  key={label}
                                  className="flex items-center justify-between border-b border-white/[0.06] pb-2"
                                >
                                  <span className="flex items-center gap-2 text-white/48">
                                    <span
                                      className="h-1.5 w-1.5"
                                      style={{ backgroundColor: color }}
                                    />
                                    {label}
                                  </span>
                                  <span className="text-white/82">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </section>

                        <section
                          data-ui-panel
                          className="kd-panel min-h-[300px] p-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-[11px] font-semibold text-white/92">
                                Ultime schede aggiornate
                              </h4>
                              <p className="mt-1 text-[9px] text-white/42">
                                Sei schede di esempio · estratto dell’inventario
                              </p>
                            </div>

                            <span className="border border-[#303030] bg-[#1c1c1c] px-2 py-1 text-[7px] uppercase tracking-[0.2em] text-white/46">
                              DATI SIMULATI
                            </span>
                          </div>

                          <div className="mt-4">
                            {[["VA-01248","Madonna con Bambino","Sala II","#20f0c7"],["VA-01247","Ritratto di gentiluomo","Sala V","#35d8ff"],["VA-01246","Busto marmoreo","In prestito","#8b5cf6"],["VA-01245","Coppa in ceramica","Deposito Nord","#ff4fd8"],["VA-01244","Reliquiario ligneo","In restauro","#e4b85b"],["VA-01243","Frammento di capitello","Sala III","#20f0c7"]].map(([code, title, state, accent]) => (
                              <div
                                key={code}
                                data-ui-row
                                className="grid grid-cols-[64px_minmax(0,1fr)] items-center gap-2 border-b border-white/[0.07] py-3 text-[7px] sm:grid-cols-[82px_1fr_auto] sm:gap-3 sm:text-[8px]"
                              >
                                <span className="text-white/34">{code}</span>
                                <span className="truncate text-white/72">{title}</span>
                                <span
                                  className="col-span-2 w-fit border px-2 py-1 uppercase tracking-[0.18em] sm:col-span-1"
                                  style={{
                                    color: accent,
                                    borderColor: `${accent}55`,
                                    backgroundColor: `${accent}10`,
                                  }}
                                >
                                  {state}
                                </span>
                              </div>
                            ))}
                          </div>
                        </section>
                      </div>
<AltriGraficiMuseoDemo />

                    </div>
                  </div>
                </div>
              </div>

              {/* PROMO STRIP AROUND THE REAL UI */}
              <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                {[["01","COLLEZIONI","Inventari / schede / immagini","#35d8ff"],["02","SEDI","Proprietà / ubicazione / depositi","#8b5cf6"],["03","PRESTITI","Partenza / custodia / rientro","#20f0c7"],["04","DOCUMENTI","Fascicoli / relazioni / riscontri","#ff4fd8"]].map(([id, title, copy, accent]) => (
                  <div
                    key={id}
                    data-ui-panel
                    className="border border-white/12 bg-white/[0.02] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] tracking-[0.28em] text-white/28">
                        {id}
                      </span>
                      <span
                        className="h-2 w-2 border"
                        style={{ borderColor: accent }}
                      />
                    </div>

                    <p
                      className="mt-4 text-[9px] uppercase tracking-[0.28em]"
                      style={{ color: accent }}
                    >
                      {title}
                    </p>

                    <p className="avant-legato-font mt-3 text-base leading-snug text-white/68 md:text-lg">
                      {copy}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            TECH
        ====================================================== */}
        <section
          ref={techRef} id="rete-museale"
          className="kairos-section-shell kairos-noise relative overflow-hidden bg-[#050506] px-6 py-24 md:px-10 md:py-32 lg:px-[5vw] lg:py-[15vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-55" />

          <span
            aria-hidden="true"
            className="kairos-ghost-word avant-legato-font -left-[3vw] top-[9%]"
          >RETE</span>

          <div
            data-cinematic-block
            className="relative z-10 grid gap-16 lg:grid-cols-[1fr_.9fr] lg:gap-[8vw]"
          >
            <div>
              <p className="mb-5 text-[10px] uppercase tracking-[0.4em] text-emerald-300 md:text-xs">
                03 / INTERCONNESSIONE MUSEALE
              </p>

              <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
                OPERE.<br />IN RETE.
              </h2>

              <p className="avant-legato-font mt-10 max-w-[780px] text-xl leading-snug text-gray-300 md:text-3xl">
                Colleghiamo l’identità del bene alle sedi, ai documenti e alla storia degli spostamenti. La collaborazione tra musei ed enti di tutela parte da fonti riconoscibili e responsabilità distinte.
              </p>
            </div>

            <div className="self-end">
              {STACK.map(([label, accent], index) => (
                <div
                  key={label}
                  data-stack-row
                  className="relative flex items-center justify-between border-b border-white/12 py-5 md:py-6"
                >
                  <span className="text-[9px] uppercase tracking-[0.28em] text-white/28 md:text-[11px]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="avant-legato-font text-xl uppercase tracking-[0.08em] md:text-3xl">
                    {label}
                  </span>

                  <span
                    className="h-2.5 w-2.5 border"
                    style={{
                      borderColor: accent,
                      boxShadow: `0 0 16px ${accent}55`,
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        
          <div className="relative z-10 mt-20 grid gap-5 md:grid-cols-2 lg:mt-28">
            {FEATURES.map(item => <article key={item.id} data-cinematic-block
              className="border border-white/15 bg-white/[0.02] p-6 md:p-9">
              <p className="text-[10px] uppercase tracking-[.28em]" style={{ color: item.accent }}>{item.id} / {item.meta}</p>
              <h3 className="avant-legato-font mt-6 text-3xl uppercase leading-tight md:text-4xl">{item.title}</h3>
              <p className="avant-legato-font mt-6 text-xl leading-snug text-gray-300 md:text-2xl">{item.copy}</p>
            </article>)}
          </div>
          <div id="enti-tutela" data-cinematic-block className="relative z-10 mt-16 scroll-mt-28 border-y border-white/20 py-10 md:mt-24 md:py-14">
            <p className="text-[10px] uppercase tracking-[.3em] text-cyan-300">DOCUMENTAZIONE / CONDIVISIONE / RESPONSABILITÀ</p>
            <h3 className="avant-legato-font mt-6 text-4xl uppercase leading-tight md:text-5xl">Il fascicolo accompagna l’opera.</h3>
            <p className="avant-legato-font mt-7 max-w-[1100px] text-xl leading-snug text-gray-300 md:text-3xl">
              Nell’esempio fittizio, un’opera del Palazzo delle Arti viene ospitata alla Galleria del Chiostro: la proprietà resta distinta
              dall’ubicazione. Scheda, immagini e documentazione del prestito restano collegate
              al bene; il rientro completa la storia dello spostamento.
            </p>
            <p className="avant-legato-font mt-6 max-w-[1100px] text-lg leading-relaxed text-white/65 md:text-2xl">
              Per il confronto con le Soprintendenze, il fascicolo raccoglie identificativi,
              collocazione, fotografie e relazioni pertinenti. La condivisione tra enti e gli
              eventuali collegamenti ai sistemi istituzionali vengono definiti secondo ruoli,
              formati e autorizzazioni. L’archiviazione interna non equivale a un invio ufficiale
              o a un’autorizzazione dell’ente di tutela.
            </p>
          </div>
</section>

        {/* =====================================================
            FINAL
        ====================================================== */}
        <section
          ref={finalRef}
          className="kairos-noise relative flex min-h-[100svh] items-end overflow-hidden border-t border-white/12 bg-black px-6 pb-10 pt-28 md:px-10 md:pb-14 lg:px-[4vw] lg:pb-[5vh]"
        >
          <div className="kairos-grid pointer-events-none absolute inset-0 opacity-50" />
          <div className="kairos-final-orbit" aria-hidden="true" />

          <span
            data-kairos-parallax-line
            className="pointer-events-none absolute left-[-12%] top-[32%] h-px w-[64%] bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent"
          />
          <span
            data-kairos-parallax-line
            className="pointer-events-none absolute right-[-16%] top-[62%] h-px w-[68%] bg-gradient-to-r from-transparent via-fuchsia-400/20 to-transparent"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-[-12vw] top-[5%] h-[60vw] w-[60vw] rounded-full blur-[110px]"
            style={{
              background:
                "radial-gradient(circle, rgba(53,216,255,.18), rgba(139,92,246,.13) 36%, rgba(255,79,216,.07) 54%, transparent 72%)",
            }}
          />

          <div data-cinematic-block className="relative z-10 w-full">
            <div
              data-final-kairos-copy
              className="mb-8 flex items-center justify-between border-b border-white/18 pb-5 text-[9px] uppercase tracking-[0.31em] text-white/34 md:text-[11px]"
            >
              <span>KAIROS ARCHIVE / OXO STUDIO</span>
              <span>PATRIMONIO / CONDIVISO</span>
            </div>

            <h2 className="avant-legato-font ombra2 overflow-hidden text-[12.2vw] uppercase leading-[.69] tracking-[-0.09em] md:text-[12vw] lg:text-[9.6vw] [perspective:1000px]">
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="VALORIZZA."
                  attribute="data-final-kairos-letter"
                />
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <SplitLetters
                  text="CONSERVA."
                  attribute="data-final-kairos-letter"
                />
              </span>
            </h2>

            <div className="mt-8 flex flex-col gap-7 border-t border-white/18 pt-6 md:flex-row md:items-end md:justify-between">
              <p
                data-final-kairos-copy
                className="avant-legato-font max-w-[860px] text-xl leading-snug text-gray-300 md:text-3xl"
              >
                Dalla scheda alla rete museale: organizziamo il patrimonio e la sua documentazione, mantenendo collegati opere, sedi e conoscenza.
              </p>

              <Link
                to="/Contatti"
                data-final-kairos-copy
                className="avant-legato-font group inline-flex w-fit items-center gap-5 border border-white/30 bg-white/[0.035] px-5 py-4 text-sm uppercase tracking-[0.28em] text-white md:px-6 md:text-base"
              >
                <span>Parliamo del tuo museo</span>
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
