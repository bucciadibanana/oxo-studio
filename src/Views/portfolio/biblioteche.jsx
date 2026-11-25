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

const USERS=[{"id":"01","label":"BIBLIOTECHE PUBBLICHE","accent":"#35d8ff"},{"id":"02","label":"BIBLIOTECHE ECCLESIASTICHE","accent":"#8b5cf6"},{"id":"03","label":"ISTITUTI CULTURALI","accent":"#20f0c7"},{"id":"04","label":"BIBLIOTECARI","accent":"#ff4fd8"},{"id":"05","label":"LETTORI","accent":"#35d8ff"}];
const FEATURES=[{"id":"01","title":"Catalogo e inventario","meta":"GESTIONALE","copy":"Organizza schede, collocazioni e consistenza delle raccolte. Mantieni collegati descrizione bibliografica e patrimonio fisico.","accent":"#35d8ff"},{"id":"02","title":"Utenti e circolazione","meta":"GESTIONALE","copy":"Gestisci iscritti, prestiti, prenotazioni, restituzioni e calendario operativo.","accent":"#8b5cf6"},{"id":"03","title":"Controllo operativo","meta":"GESTIONALE","copy":"Consulta indicatori, movimentazioni ed esportazioni per organizzare le attività della biblioteca.","accent":"#20f0c7"},{"id":"04","title":"Catalogazione integrata","meta":"GESTIONALE","copy":"Collega i flussi di catalogazione, revisione e localizzazione alla gestione del patrimonio.","accent":"#ff4fd8"},{"id":"05","title":"Catalogo e affinità","meta":"KAIROS LIBRARY","copy":"Esplora opere, autori e generi. Scopri suggerimenti legati agli interessi del tuo profilo di lettura.","accent":"#35d8ff"},{"id":"06","title":"Agenda e preferiti","meta":"KAIROS LIBRARY","copy":"Consulta prestiti, ritiri, scadenze, storico e preferiti dal computer o dallo smartphone.","accent":"#8b5cf6"}];
const STACK=[["CATALOGO","#fff"],["INVENTARIO","#35d8ff"],["UTENTI","#8b5cf6"],["PRESTITI","#20f0c7"],["PRENOTAZIONI","#ff4fd8"],["AFFINITÀ","#35d8ff"]];
const books=["Il nome della rosa","Le città invisibili","La coscienza di Zeno"];
function Desktop(){return (<Desktop/>
{/* PROMO STRIP AROUND THE REAL UI */}
              <div className="mt-5 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
                {[["01","CATALOGO","Inventari / schede / immagini","#35d8ff"],["02","UTENTI","Iscritti / prenotazioni","#8b5cf6"],["03","PRESTITI","Prestiti / restituzioni / calendario","#20f0c7"],["04","INVENTARIO","Collocazioni / esportazioni","#ff4fd8"]].map(([id, title, copy, accent]) => (
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

        <section className="kairos-section-shell relative bg-[#020203]"><div data-cinematic-block className="relative z-10 px-6 py-24 md:px-10 lg:px-[5vw]"><p className="mb-5 text-[10px] uppercase tracking-[.4em] text-violet-400">03 / KAIROS LIBRARY</p><h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.8] tracking-[-.08em] md:text-[9vw] lg:text-[7vw]">LA TUA.<br/>BIBLIOTECA.</h2><p className="avant-legato-font mt-10 max-w-3xl text-xl text-gray-300 md:text-3xl">Esplora il catalogo, scopri le affinità e consulta prestiti, prenotazioni e preferiti.</p></div><div data-interface-stage className="kairos-noise relative border-y border-white/12 p-3 md:p-8 lg:p-[3vw]"><ReaderDashboard/></div><div className="relative grid items-center gap-10 px-6 py-24 md:grid-cols-2 lg:px-[5vw]"><div data-cinematic-block><p className="mb-5 text-[10px] uppercase tracking-[.4em] text-violet-400">KAIROS LIBRARY / MOBILE</p><h2 className="avant-legato-font ombra2 text-[11vw] uppercase leading-[.85] tracking-[-.08em] md:text-[5.8vw]">SEMPRE.<br/>CON TE.</h2><p className="avant-legato-font mt-8 text-xl text-gray-300 md:text-2xl">La stessa dashboard personale, adattata allo smartphone: agenda, prestiti, profilo di lettura e opere consigliate.</p><a href="https://library.kairosarchive.com/kairos_library" className="avant-legato-font mt-8 inline-flex border border-white/30 px-5 py-4 text-sm uppercase tracking-[.2em] text-white">Accedi a Kairos Library ↗</a></div><div data-interface-stage className="relative"><Mobile/></div></div></section>
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
                04 / PATRIMONIO CONNESSO
              </p>

              <h2 className="avant-legato-font ombra2 text-[12.2vw] uppercase leading-[.72] tracking-[-0.08em] md:text-[9vw] lg:text-[7vw]">
                LIBRI.<br />IN RETE.
              </h2>

              <p className="avant-legato-font mt-10 max-w-[780px] text-xl leading-snug text-gray-300 md:text-3xl">
                Colleghiamo il catalogo, la circolazione e i servizi ai lettori. Due ambienti distinti per organizzare il patrimonio e renderlo accessibile.
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
          <div data-cinematic-block className="relative z-10 mt-16 border-y border-white/20 py-10 md:py-14"><p className="text-[10px] uppercase tracking-[.3em] text-cyan-300">GESTIONALE / LETTORI / PATRIMONIO</p><h3 className="avant-legato-font mt-6 text-4xl uppercase md:text-5xl">Due ambienti. Una biblioteca.</h3><p className="avant-legato-font mt-7 max-w-[1100px] text-xl text-gray-300 md:text-3xl">Il gestionale per chi custodisce le raccolte. Kairos Library per chi le vive: il catalogo, le disponibilità e i servizi bibliotecari accompagnano il lettore.</p></div>
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
                Dalla scheda bibliografica alla prossima lettura: un unico patrimonio, due ambienti dedicati.
              </p>

              <Link
                to="/Contatti"
                data-final-kairos-copy
                className="avant-legato-font group inline-flex w-fit items-center gap-5 border border-white/30 bg-white/[0.035] px-5 py-4 text-sm uppercase tracking-[0.28em] text-white md:px-6 md:text-base"
              >
                <span>Parliamo della tua biblioteca</span>
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
