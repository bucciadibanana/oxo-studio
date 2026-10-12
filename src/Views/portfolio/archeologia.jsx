// OXO_RIMOSSA_VECCHIA_INTESTAZIONE
// OXO_RIMOSSA_CODA_VECCHIO_SCULTOREO
// OXO_KAIROS_SCULTOREO_V8
import ScultoreoStudio from "./ScultoreoStudio";
// OXO_PATRIMONIO_ITALIANO
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SeoMetaTags from '../../components/SeoMetaTags';

const sezioni = [
  [
    'archeologia',
    'Archeologia',
    'Reperti, frammenti e contesti',
    'Catalogazione e documentazione di reperti, gruppi di frammenti e strutture. Descrizioni, provenienze, contesti di rinvenimento, fotografie e rilievi sono collegati per mantenere riconoscibili le fonti e le interpretazioni degli specialisti.'
  ],
  [
    'scultoreo',
    'Patrimonio scultoreo',
    'La forma e la storia dell’opera',
    'Schede storico-artistiche, materiali, tecniche, misure, attribuzioni documentate e storia conservativa. Organizziamo fotografie, relazioni e informazioni sugli interventi precedenti in un fascicolo aggiornabile.'
  ],
  [
    'scansioni',
    'Scansioni tridimensionali',
    'Dal rilievo all’archivio digitale',
    'Progettiamo percorsi di acquisizione a partire dal flusso Artec. Il modello viene collegato alla scheda del bene e alla campagna di rilievo, mantenendo separati dati acquisiti, elaborazioni e ricostruzioni ipotetiche.'
  ],
  [
    'conservazione',
    'Conservazione e monitoraggio',
    'Seguire l’opera nel tempo',
    'Osservazioni conservative, fotografie, documentazione degli interventi e controlli periodici supportano il lavoro dei professionisti. Il confronto tra scansioni successive è una linea di ricerca: prima di interpretare una variazione si valutano allineamento, condizioni di rilievo e incertezza di misura.'
  ],
  [
    'documentazione',
    'Documentazione per gli enti di tutela',
    'Archivi e fascicoli delle opere',
    'Organizziamo schede, immagini, rilievi e relazioni per il confronto con le Soprintendenze. Lo scambio con sistemi esterni viene definito secondo gli standard richiesti e le autorizzazioni disponibili: non è un invio ufficiale automatico.'
  ],
  [
    'ricerca',
    'Ricerca applicata',
    'Evidenze e ipotesi restano distinte',
    'Sviluppiamo percorsi di ricerca per il confronto delle superfici e lo studio delle parti mancanti. Le ipotesi geometriche richiedono verifica specialistica: non sostituiscono il dato acquisito, la diagnosi conservativa o il progetto di restauro.'
  ]
];

const museali = [
  [
    'ecclesiastici',
    'Musei ecclesiastici e diocesani',
    'Patrimonio ecclesiastico / CEI / BeWeB',
    'Inventari, schede delle opere, immagini e collocazioni, con riferimenti alle risorse CEI e alle schede consultabili in BeWeB. Ente proprietario, soggetto conservatore e ubicazione attuale restano distinti.'
  ],
  [
    'statali',
    'Musei statali e istituti pubblici',
    'Patrimonio pubblico / MiC / ICCD',
    'Organizzazione delle collezioni e della documentazione, con riferimento agli standard ICCD e alle risorse del Catalogo generale dei beni culturali. Conserviamo identificativi e provenienza dei riscontri.'
  ],
  [
    'collezioni',
    'Gestione delle collezioni',
    'Opere esposte, depositi e prestiti',
    'Schede, fotografie, sedi, inventari e movimenti contribuiscono alla storia gestionale del bene. La documentazione accompagna gli spostamenti, i prestiti e gli interventi.'
  ],
  sezioni[4]
];

export default function Archeologia() {
  const location = useLocation();
  const musei = location.pathname === '/portfolio/musei';
  
const elenco = musei
  ? museali
  : sezioni.filter(([id]) =>
      !['scansioni', 'conservazione', 'documentazione', 'ricerca'].includes(id)
    );


  useEffect(() => {
    if (!location.hash) return;

    const timer = window.setTimeout(() => {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView();
    }, 100);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <>
      <SeoMetaTags
        title={
          musei
            ? 'Gestione museale ecclesiastica e statale | OXO Studio'
            : 'Archeologia e scultoreo | OXO Studio'
        }
        description={
          musei
            ? 'Catalogazione e gestione delle collezioni ecclesiastiche e statali, inventari, prestiti e documentazione.'
            : 'Documentazione di reperti e sculture, progetti di scansione 3D, archivi digitali e ricerca sulla conservazione.'
        }
      />

      <main
        className="bg-[#020203] text-white"
        style={{ minHeight: '100vh', paddingTop: 130 }}
      >
        

        <div className="mx-auto max-w-7xl px-6 md:px-10">
          {elenco.map(([id, nome, sottotitolo, testo], index) => (
            id === "scultoreo" ? <ScultoreoStudio key={id} /> : (<section
              key={id}
              id={id}
              className="scroll-mt-28 border-t border-white/20 py-16 md:py-24"
            >
              <p className="mb-5 text-xs uppercase tracking-widest text-cyan-300">
                {String(index + 1).padStart(2, '0')} / {sottotitolo}
              </p>

              <h2 className="avant-legato-font text-4xl md:text-6xl">
                {nome}
              </h2>

              <p className="mt-7 max-w-4xl text-lg leading-relaxed text-gray-300 md:text-xl">
                {testo}
              </p>
            </section>)
          ))}
        </div>

        
      </main>
    </>
  );
}
