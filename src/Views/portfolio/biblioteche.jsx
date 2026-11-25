import {useLayoutEffect,useRef} from "react";
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import SeoMetaTags from "../../components/SeoMetaTags";
import "../../styles/avant-legato.css";
gsap.registerPlugin(ScrollTrigger);
const menu=["Dashboard","Utenti","Prenotazioni","Calendario restituzioni","Catalogazione","Digitali","Localizzate","Inventario","Esportazioni"];
const books=["Il nome della rosa","Le città invisibili","La coscienza di Zeno"];
const metrics=[["Volumi catalogati","12.480"],["Prestiti attivi","148"],["Utenti iscritti","562"],["Prenotazioni","24"]];
function Desktop(){return (<div
                data-ui-frame
                className="kairos-ui-shell kairos-record-glass kairos-real-dashboard relative overflow-hidden rounded-[18px] border border-white/10"
              >
                <div className="kairos-interface-vignette" aria-hidden="true" />
                {/* TOP APP TITLE */}
                <div className="kd-topbar flex h-10 items-center justify-center px-4 text-[9px] font-medium text-white/85">
                  Kairos Archive - Gestionale bibliografico
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
                          KAIROS ARCHIVE
                        </p>
                        <p className="text-[7px] text-white/38 md:text-[8px] lg:text-[9px]">DEMO WORKSPACE</p>
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
                        <span>Dashboard</span>
                      </div>

                      <div
                        data-ui-row
                        className="kd-nav-item flex items-center justify-between px-2 py-2"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-3 text-center">✎</span>
                          <span>Catalogazione</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Schede", "Frontespizio", "Topografia"].map((item) => (
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
                          <span>Digitali</span>
                        </span>
                        <span>⌄</span>
                      </div>

                      {["Generate", "Approvate", "Revisione"].map((item) => (
                        <div
                          key={item}
                          data-ui-row
                          className="kd-nav-item ml-3 border-l border-[#2a2a2a] px-4 py-1.5 text-white/78"
                        >
                          {item}
                        </div>
                      ))}

                      {[
                        ["♙", "Utenti"], ["⌘", "Prenotazioni"], ["◷", "Calendario restituzioni"], ["▣", "Inventario"], ["⇩", "Esportazioni"], ["⌖", "Localizzate"],
                        ["▱", "Aree di lavoro"],
                        ["♙", "Teams"],
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
                        OXO STUDIO / ADMIN
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
                          <p className="text-[9px] text-white">KAIROS ARCHIVE</p>
                          <p className="text-[7px] text-white/38">DEMO WORKSPACE</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-[8px] text-white/56">
                        <span className="border border-[#303030] px-2 py-1">Panoramica</span>
                        <span className="border border-[#303030] px-2 py-1">☰</span>
                      </div>
                    </div>

                    <div className="kd-scrollbar flex gap-2 overflow-x-auto border-t border-[#242424] px-3 py-2 text-[8px] text-white/60">
                      {[
                        "Dashboard",
                        "Catalogazione",
                        "Digitali",
                        "Localizzate",
                        "Aree di lavoro",
                        "Teams",
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
                        <span className="text-white/45">Dashboard</span>
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
                          Select a theme: Mono　⌄
                        </div>
                      </div>
                    </div>

                    <div className="kd-scrollbar overflow-x-hidden p-3 md:overflow-x-auto md:p-5">
                      {/* KPI ROW */}
                      <div className="grid grid-cols-2 gap-2 md:min-w-[700px] md:grid-cols-4 md:gap-3">
                        {[
                          {
                            label: "Prestiti attivi",
                            value: "148",
                            badge: "↗ +12%",
                            caption: "Volumi attualmente in prestito",
                            sub: "Demo / aggiornamento operativo",
                          },
                          {
                            label: "Utenti iscritti",
                            value: "562",
                            badge: "↗ +48%",
                            caption: "Lettori registrati",
                            sub: "Demo / salvataggio continuo",
                          },
                          {
                            label: "Volumi catalogati",
                            value: "12.480",
                            badge: "↘ -18%",
                            caption: "Patrimonio bibliografico",
                            sub: "Demo / inventario",
                          },
                          {
                            label: "Prenotazioni",
                            value: "24",
                            badge: "↗ +21%",
                            caption: "Richieste in corso",
                            sub: "Demo / richieste dimostrative",
                          },
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
                      <section
                        data-ui-panel
                        className="kd-panel mt-3 w-full"
                      >
                        <div className="grid grid-cols-1 border-b border-[#2b2b2b] sm:grid-cols-[1fr_92px_92px] md:grid-cols-[1fr_120px_120px]">
                          <div className="p-4">
                            <h4 className="text-[11px] font-semibold text-white/92">
                              Andamento prestiti
                            </h4>
                            <p className="mt-1 text-[9px] text-white/42">
                              Dati dimostrativi degli ultimi giorni
                            </p>
                          </div>

                          <div className="border-t border-[#2b2b2b] p-3 sm:border-l sm:border-t-0 md:p-4">
                            <p className="text-[8px] text-white/42">
                              Prestiti registrati
                            </p>
                            <p className="mt-1 text-[26px] font-semibold leading-none text-white">
                              184
                            </p>
                          </div>

                          <div className="border-t border-[#2b2b2b] p-3 sm:border-l sm:border-t-0 md:p-4">
                            <p className="text-[8px] text-white/42">
                              Localizzate
                            </p>
                            <p className="mt-1 text-[26px] font-semibold leading-none text-white">
                              96
                            </p>
                          </div>
                        </div>

                        <div className="kd-chart-grid relative h-[220px] overflow-hidden px-3 pt-5 md:h-[270px] md:px-5">
                          <div className="absolute inset-x-5 bottom-8 top-5 flex items-end justify-between gap-3">
                            {[18, 29, 41, 58, 76, 121, 184].map((v, i) => (
                              <div
                                key={i}
                                className="relative flex h-full flex-1 items-end justify-center"
                              >
                                <div
                                  className="kd-bar relative w-[72%] max-w-[105px]"
                                  style={{
                                    height: `${Math.max(14, (v / 184) * 82)}%`,
                                  }}
                                >
                                  <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[7px] text-white/32">
                                    {v}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="absolute inset-x-5 bottom-2 grid grid-cols-7 text-center text-[8px] text-white/40">
                            {["14 ago", "15 ago", "16 ago", "17 ago", "18 ago", "19 ago", "20 ago"].map(
                              (day) => <span key={day}>{day}</span>
                            )}
                          </div>
                        </div>
                      </section>

                      {/* LOWER PANELS */}
                      <div className="mt-3 grid grid-cols-1 gap-3 md:min-w-[700px] lg:grid-cols-2">
                        <section
                          data-ui-panel
                          className="kd-panel min-h-[300px] p-4"
                        >
                          <h4 className="text-[11px] font-semibold text-white/92">
                            Distribuzione prestiti
                          </h4>
                          <p className="mt-1 text-[9px] text-white/42">
                            Ripartizione per stato
                          </p>

                          <div className="grid min-h-[225px] grid-cols-1 items-center gap-4 sm:grid-cols-[150px_1fr] md:grid-cols-[170px_1fr] md:gap-5">
                            <div className="flex items-center justify-center">
                              <div className="kd-donut relative h-[128px] w-[128px] rounded-full md:h-[150px] md:w-[150px]">
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center">
                                  <span className="text-[26px] font-semibold leading-none text-white">
                                    184
                                  </span>
                                  <span className="mt-2 text-[8px] text-white/46">
                                    Prestiti demo
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="space-y-3 text-[8px]">
                              {[
                                ["Restituiti", "126", "rgba(255,255,255,.52)"],
                                ["Attivi", "18", "rgba(139,92,246,.75)"],
                                ["Prenotati", "28", "rgba(53,216,255,.72)"],
                                ["In ritardo", "12", "rgba(32,240,199,.68)"],
                              ].map(([label, value, color]) => (
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
                                Ultime movimentazioni
                              </h4>
                              <p className="mt-1 text-[9px] text-white/42">
                                Anteprima demo delle attività recenti
                              </p>
                            </div>

                            <span className="border border-[#303030] bg-[#1c1c1c] px-2 py-1 text-[7px] uppercase tracking-[0.2em] text-white/46">
                              ATTIVITÀ RECENTI
                            </span>
                          </div>

                          <div className="mt-4">
                            {[
                              ["KA-001842", "Il nome della rosa", "Restituito", "#20f0c7"],
                              ["KA-001841", "Le città invisibili", "In prestito", "#8b5cf6"],
                              ["KA-001840", "La coscienza di Zeno", "Prenotato", "#35d8ff"],
                              ["KA-001839", "Il barone rampante", "In ritardo", "#ff4fd8"],
                              ["KA-001838", "I promessi sposi", "Disponibile", "#20f0c7"],
                            ].map(([code, title, state, accent]) => (
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
                    </div>
                  </div>
                </div>
              </div>);}
function Mobile(){return <div data-ui-frame className="kairos-ui-shell kairos-real-dashboard mx-auto w-full max-w-[310px] rounded-[38px] border-[7px] border-[#38383e] p-4 shadow-2xl"><div className="mx-auto mb-5 h-5 w-24 rounded-full bg-black"/><div className="flex justify-between text-sm"><strong>Kairos Library</strong><span>♡</span></div><p className="mt-5 text-xl">La tua biblioteca</p><div data-ui-panel className="kd-panel mt-3 rounded-lg p-3 text-xs">Cerca nel catalogo...</div><div className="mt-4 grid grid-cols-2 gap-2">{[["Prestiti attivi","2"],["Preferiti","8"]].map(([k,v])=><div key={k} data-ui-panel className="kd-card rounded-lg p-3"><p className="text-xs">{k}</p><p className="text-2xl">{v}</p></div>)}</div><div className="mt-4 flex flex-wrap gap-2 text-xs">{["Affinità","Generi","Autori","Calendario"].map(x=><span key={x} className="rounded-full border border-white/20 px-2 py-1">{x}</span>)}</div><p className="mt-5 text-sm">Scopri nuovi libri</p><div className="mt-3 grid grid-cols-2 gap-3">{books.slice(0,2).map((b,i)=><div key={b}><div className="flex aspect-[3/4] items-center justify-center rounded-md p-3 text-center text-sm" style={{background:i?"#303034":"#252529"}}>{b}</div><div className="mt-2 flex justify-between text-[10px]"><span>Disponibile</span><span>♡</span></div></div>)}</div><div className="mt-5 flex justify-between border-t border-white/10 pt-3 text-[10px]">{["Home","Catalogo","Preferiti","Prestiti","Profilo"].map(x=><span key={x}>{x}</span>)}</div></div>}
const managementFeatures=[
["01","CATALOGO E INVENTARIO","Organizzare il patrimonio","Gestisci schede bibliografiche, collocazioni, consistenza delle raccolte e inventario. Collega la descrizione bibliografica alla posizione fisica delle opere."],
["02","UTENTI E CIRCOLAZIONE","Seguire ogni movimento","Registra gli utenti, gestisci prestiti, prenotazioni e restituzioni. Consulta le scadenze attraverso il calendario operativo."],
["03","CONTROLLO OPERATIVO","Conoscere la biblioteca","Visualizza gli indicatori di attività, consulta le movimentazioni e individua le opere da restituire. Esporta i dati per le esigenze amministrative."],
["04","CATALOGAZIONE","Valorizzare le raccolte","Integra il gestionale con i flussi di catalogazione di Kairos Archive, dalla scheda bibliografica alla localizzazione e alla revisione."]
];
const readerFeatures=[
["01","CATALOGO","Scoprire il patrimonio","Esplora il catalogo per titolo, autore e genere. Consulta le schede e verifica la disponibilità delle opere."],
["02","AFFINITÀ","Una lettura personale","Esplora suggerimenti correlati ai generi, agli autori e agli argomenti selezionati nel tuo profilo di lettura."],
["03","PRESTITI E AGENDA","Le tue letture in corso","Consulta i prestiti attivi, le prenotazioni da ritirare, le date di restituzione e lo storico delle opere."],
["04","PREFERITI E PROFILO","La tua biblioteca digitale","Conserva le opere nei preferiti e personalizza i tuoi interessi. Accedi ai servizi dal computer o dallo smartphone."]
];
function Editorial({eyebrow,lines,copy,items}){return <section className="kairos-noise relative border-y border-white/12 px-5 py-24 md:px-[6vw] md:py-36"><div className="kairos-grid pointer-events-none absolute inset-0 opacity-30"/><div data-library-copy className="relative z-10"><p className="mb-8 text-[10px] uppercase tracking-[.38em] text-cyan-300">{eyebrow}</p><h2 className="avant-legato-font ombra2 text-[11vw] uppercase leading-[.82] tracking-[-.075em] md:text-[8vw]">{lines.map(line=><span className="block" key={line}>{line}</span>)}</h2><p className="avant-legato-font mt-10 max-w-4xl text-xl leading-relaxed text-white/65 md:text-3xl">{copy}</p></div><div className="relative z-10 mt-16 grid gap-px border border-white/12 bg-white/12 md:grid-cols-2">{items.map(([id,tag,title,desc])=><article key={id} data-library-copy className="bg-[#080809] p-6 md:p-10"><div className="flex justify-between text-[10px] tracking-[.3em] text-white/40"><span>{id} / {tag}</span><span className="text-cyan-300">↗</span></div><h3 className="avant-legato-font mt-6 text-3xl uppercase leading-tight md:text-4xl">{title}</h3><p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60 md:text-base">{desc}</p></article>)}</div></section>}
const readerStats=[["▣","Prestiti attivi","2","Le tue letture in corso","#3888ef"],["◷","Da ritirare","1","Prenotazioni in biblioteca","#e6a600"],["!","Restituzioni scadute","0","Nessun ritardo","#e34c59"],["✓","Opere restituite","12","Il tuo storico","#16b68a"],["♡","Preferiti","8","La tua lista di lettura","#e552a1"],["◇","Generi preferiti","4","I tuoi interessi","#9262ee"]];
const readerMenu=[["▦","Dashboard"],["▥","Catalogo"],["✧","Affinità"],["▣","Generi"],["♙","Autori"],["♡","Preferiti"],["▤","I miei prestiti"],["▦","Calendario"],["◴","Storico"],["♙","Profilo"]];
function ReaderDashboard(){return <div data-ui-frame className="kairos-ui-shell kairos-real-dashboard w-full overflow-hidden rounded-[18px] border border-white/10"><div className="grid md:grid-cols-[185px_minmax(0,1fr)] lg:grid-cols-[215px_minmax(0,1fr)]"><aside className="kd-sidebar hidden md:block"><div className="border-b border-white/10 p-4 text-sm font-semibold">▥ Kairos Library</div><div className="p-3 text-[10px] text-white/50">Biblioteca<div className="mt-2 border border-white/10 bg-[#0b0b0c] p-2 text-white">Biblioteca dimostrativa　⌄</div></div>{readerMenu.map(([icon,label],i)=><div data-ui-row key={label} className={"kd-nav-item flex items-center gap-3 px-3 py-2 text-[10px] "+(i===0?"kd-nav-active":"")}><span>{icon}</span>{label}</div>)}</aside><div className="min-w-0"><div className="kd-topbar flex items-center justify-between gap-2 px-4 py-4 text-[11px]"><span>▦　Dashboard</span><span className="hidden text-white/55 sm:block">♧　◐　 Select a theme: Mono　 ●</span></div><div className="p-3 md:p-4"><div data-ui-panel className="relative overflow-hidden rounded-xl border border-white/10 bg-gradient-to-br from-[#19191d] to-[#171717] p-5 md:p-7" style={{borderBottomColor:"#6655ed"}}><span className="text-[10px] text-white/50">▥ Biblioteca dimostrativa　/　Area lettori</span><h3 className="relative z-10 mt-4 text-2xl font-semibold md:text-3xl">Benvenuto, lettore.</h3><p className="relative z-10 mt-2 max-w-xl text-[11px] leading-relaxed text-white/55">La tua biblioteca, le tue letture e i tuoi interessi. Scopri il patrimonio e trova la tua prossima opera.</p><div className="relative z-10 mt-4 flex flex-wrap gap-2 text-[10px]"><span className="bg-[#777] px-3 py-2">▣ Esplora il catalogo ↗</span><span className="border border-white/15 px-3 py-2">▦ Il mio calendario</span></div><span aria-hidden="true" className="pointer-events-none absolute -bottom-10 right-5 rotate-6 text-[140px] leading-none text-white/[.035]">▥</span></div><div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">{readerStats.map(([icon,label,value,desc,color])=><article data-ui-panel key={label} className="kd-card min-h-[112px] p-3" style={{borderBottom:"2px solid "+color}}><div className="flex justify-between text-[10px]" style={{color}}><span>{icon}</span><span>↗</span></div><p className="mt-3 text-[9px] text-white/55">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p><p className="mt-2 text-[9px] text-white/45">{desc}</p></article>)}</div><div className="mt-4 grid gap-3 lg:grid-cols-[1.3fr_1fr]"><section data-ui-panel className="kd-panel rounded-xl p-4" style={{borderBottom:"2px solid #20bbd9"}}><h4 className="text-sm font-semibold">▦ La tua agenda</h4><p className="mt-2 text-[10px] text-white/50">Prossimi ritiri e restituzioni.</p>{[["26","NOV","Il nome della rosa","Ritiro in biblioteca","#e6a600"],["15","DIC","Le città invisibili","Restituzione","#3888ef"]].map(([day,month,title,desc,color])=><div data-ui-row key={title} className="mt-3 flex gap-3 border border-white/10 p-3"><div style={{color}}><p className="text-lg leading-none">{day}</p><p className="text-[9px]">{month}</p></div><div><p className="text-[10px]">{title}</p><p className="mt-1 text-[9px] text-white/50">{desc}</p></div></div>)}</section><section data-ui-panel className="kd-panel rounded-xl p-4" style={{borderBottom:"2px solid #9262ee"}}><h4 className="text-sm font-semibold">✧ Il tuo profilo di lettura</h4><p className="mt-2 text-[10px] text-white/50">Le preferenze guidano i tuoi consigli.</p>{[["Generi",["Arte","Filosofia","Narrativa","Storia"]],["Autori",["Italo Calvino"]],["Argomenti",["Letteratura","Cultura","Scienza"]]].map(([label,tags])=><div key={label} className="mt-3"><p className="mb-1 text-[9px] text-white/50">{label}</p><div className="flex flex-wrap gap-1">{tags.map(tag=><span key={tag} className="bg-white/10 px-1.5 py-1 text-[9px]">{tag}</span>)}</div></div>)}<p className="mt-4 border-t border-white/10 pt-3 text-[10px]">Scopri le opere affini ↗</p></section></div><section data-ui-panel className="mt-5"><h4 className="text-sm font-semibold">Consigliati per te</h4><p className="mt-1 text-[10px] text-white/50">Opere affini ai tuoi interessi, con priorità a quelle disponibili.</p><div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">{books.map(title=><div key={title} className="kd-card p-3 text-[10px]"><span className="text-white/45">▥　Disponibile</span><p className="mt-3">{title}</p></div>)}</div></section></div></div></div></div>}

export default function Biblioteche(){const root=useRef(null);useLayoutEffect(()=>{const mm=gsap.matchMedia();mm.add({desktop:"(min-width:1024px)",tablet:"(min-width:768px) and (max-width:1023px)",mobile:"(max-width:767px)",reduce:"(prefers-reduced-motion: reduce)"},({conditions})=>{const {desktop,tablet,reduce}=conditions;if(reduce)return;gsap.utils.toArray("[data-library-copy]",root.current).forEach(el=>gsap.fromTo(el,{y:45,opacity:0},{y:0,opacity:1,duration:.9,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 86%",toggleActions:"play none none reverse"}}));gsap.utils.toArray("[data-interface-stage]",root.current).forEach(stage=>{const frame=stage.querySelector("[data-ui-frame]");if(!frame)return;const tl=gsap.timeline({scrollTrigger:{trigger:stage,start:"top top",end:()=>"+="+window.innerHeight*(desktop?1.15:tablet?.92:.62),pin:true,pinSpacing:true,scrub:desktop?.55:tablet?.45:.3,anticipatePin:1,invalidateOnRefresh:true}});tl.fromTo(frame,{scale:desktop?.955:tablet?.975:.993,rotateX:desktop?3.8:tablet?2.4:.9,rotateY:desktop?-3.2:tablet?-1.7:-.55,filter:"brightness(.82) saturate(.88)",transformPerspective:desktop?1600:tablet?1300:1050,transformOrigin:"50% 52%"},{scale:1,rotateX:0,rotateY:0,filter:"brightness(1) saturate(1)",duration:1,ease:"power2.inOut"});stage.querySelectorAll("[data-ui-row]").forEach((row,i)=>tl.fromTo(row,{xPercent:2.5,opacity:.42},{xPercent:0,opacity:1,duration:.28,ease:"power2.out"},.16+i*.045));stage.querySelectorAll("[data-ui-panel]").forEach((panel,i)=>tl.fromTo(panel,{y:12,opacity:.28,filter:"blur(3px)"},{y:0,opacity:1,filter:"blur(0px)",duration:.38,ease:"power2.out"},.2+i*.07));});});return()=>mm.revert();},[]);return <><SeoMetaTags title="Biblioteche e Kairos Library | OXO Studio" description="Gestionale bibliografico e applicazione per i lettori."/><main ref={root} className="bg-[#050507] text-white"><style>{"\n          .kairos-page,\n          .kairos-page * {\n            font-family:\n              \"Eurostile\",\n              \"Microgramma\",\n              \"Bank Gothic\",\n              \"Orbitron\",\n              \"Michroma\",\n              \"Arial Narrow\",\n              sans-serif;\n          }\n\n          .kairos-page {\n            --kairos-cyan:#35d8ff;\n            --kairos-violet:#8b5cf6;\n            --kairos-green:#20f0c7;\n            --kairos-pink:#ff4fd8;\n          }\n\n          .kairos-cinematic-aura {\n            position: fixed;\n            left: 50%;\n            top: 50%;\n            width: min(92vw, 1200px);\n            height: min(92vw, 1200px);\n            transform: translate(-50%, -50%);\n            border-radius: 999px;\n            pointer-events: none;\n            z-index: 0;\n            opacity: .14;\n            background:\n              conic-gradient(\n                from 20deg,\n                transparent 0 18deg,\n                rgba(53,216,255,.16) 22deg,\n                transparent 52deg 124deg,\n                rgba(139,92,246,.14) 130deg,\n                transparent 164deg 230deg,\n                rgba(32,240,199,.12) 236deg,\n                transparent 268deg 324deg,\n                rgba(255,79,216,.1) 330deg,\n                transparent 358deg\n              );\n            -webkit-mask:\n              radial-gradient(\n                circle,\n                transparent 0 56%,\n                black 57% 58%,\n                transparent 59% 72%,\n                black 73% 73.4%,\n                transparent 74%\n              );\n            mask:\n              radial-gradient(\n                circle,\n                transparent 0 56%,\n                black 57% 58%,\n                transparent 59% 72%,\n                black 73% 73.4%,\n                transparent 74%\n              );\n          }\n\n          .kairos-cursor-halo {\n            position: fixed;\n            left: 0;\n            top: 0;\n            width: 260px;\n            height: 260px;\n            margin-left: -130px;\n            margin-top: -130px;\n            border-radius: 999px;\n            pointer-events: none;\n            z-index: 3;\n            opacity: .12;\n            background:\n              radial-gradient(\n                circle,\n                rgba(53,216,255,.16),\n                rgba(139,92,246,.08) 38%,\n                transparent 70%\n              );\n            filter: blur(18px);\n            mix-blend-mode: screen;\n          }\n\n          .kairos-section-shell {\n            position: relative;\n          }\n\n          .kairos-section-shell::before {\n            content:\"\";\n            position:absolute;\n            inset:0;\n            pointer-events:none;\n            background:\n              radial-gradient(\n                circle at 12% 20%,\n                rgba(53,216,255,.035),\n                transparent 30%\n              ),\n              radial-gradient(\n                circle at 88% 78%,\n                rgba(139,92,246,.035),\n                transparent 34%\n              );\n          }\n\n\n\n\n\n\n\n          .kairos-ghost-word {\n            position:absolute;\n            pointer-events:none;\n            user-select:none;\n            white-space:nowrap;\n            font-size:clamp(90px, 15vw, 280px);\n            line-height:.75;\n            letter-spacing:-.08em;\n            color:rgba(255,255,255,.018);\n          }\n\n\n\n          .kairos-record-glass {\n            background:\n              linear-gradient(\n                140deg,\n                rgba(255,255,255,.035),\n                rgba(255,255,255,.012) 42%,\n                transparent 70%\n              );\n            box-shadow:\n              inset 0 1px 0 rgba(255,255,255,.04),\n              0 30px 90px rgba(0,0,0,.22);\n            backdrop-filter: blur(12px);\n          }\n\n          .kairos-interface-vignette {\n            pointer-events:none;\n            position:absolute;\n            inset:0;\n            z-index:2;\n            background:\n              radial-gradient(\n                ellipse at center,\n                transparent 54%,\n                rgba(0,0,0,.16) 78%,\n                rgba(0,0,0,.44) 100%\n              );\n          }\n\n          .kairos-ui-shell {\n            transform-style: preserve-3d;\n            will-change: transform, filter;\n          }\n\n          .kairos-ui-shell::before {\n            content:\"\";\n            position:absolute;\n            inset:-1px;\n            pointer-events:none;\n            z-index:3;\n            border:1px solid rgba(255,255,255,.05);\n            box-shadow:\n              inset 0 0 0 1px rgba(255,255,255,.015),\n              0 0 0 1px rgba(53,216,255,.02);\n          }\n\n          .kairos-final-orbit {\n            position:absolute;\n            right:-14vw;\n            top:-22vw;\n            width:55vw;\n            height:55vw;\n            border-radius:999px;\n            border:1px solid rgba(255,255,255,.04);\n            box-shadow:\n              0 0 0 12vw rgba(255,255,255,.008),\n              0 0 0 24vw rgba(255,255,255,.005);\n          }\n\n          .kairos-signal-stage {\n            isolation: isolate;\n          }\n\n          .kairos-card-shell {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: min(92vw, 1540px);\n            aspect-ratio: 1.72 / 1;\n            transform: translate(-50%, -50%);\n            z-index: 5;\n            pointer-events: none;\n            border: 1px solid rgba(255,255,255,.17);\n            box-shadow:\n              inset 0 0 0 1px rgba(53,216,255,.018),\n              0 0 28px rgba(0,0,0,.35);\n          }\n\n          .kairos-card-shell::before {\n            content: \"\";\n            position: absolute;\n            left: -1px;\n            top: -1px;\n            width: 42%;\n            height: 1px;\n            background:\n              linear-gradient(\n                90deg,\n                rgba(53,216,255,.92),\n                rgba(53,216,255,.22),\n                transparent\n              );\n          }\n\n          .kairos-card-shell::after {\n            content: \"\";\n            position: absolute;\n            right: -1px;\n            top: -1px;\n            width: 42%;\n            height: 1px;\n            background:\n              linear-gradient(\n                270deg,\n                rgba(255,79,216,.76),\n                rgba(139,92,246,.22),\n                transparent\n              );\n          }\n\n          .kairos-card-corner {\n            position: absolute;\n            width: 12px;\n            height: 12px;\n            border: 1px solid rgba(255,255,255,.22);\n            pointer-events: none;\n          }\n\n          .kairos-card-corner--tl { left: -1px; top: -1px; border-right:0; border-bottom:0; }\n          .kairos-card-corner--tr { right: -1px; top: -1px; border-left:0; border-bottom:0; }\n          .kairos-card-corner--bl { left: -1px; bottom: -1px; border-right:0; border-top:0; }\n          .kairos-card-corner--br { right: -1px; bottom: -1px; border-left:0; border-top:0; }\n\n          .kairos-card-orbit {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: min(47vw, 690px);\n            height: min(47vw, 690px);\n            transform: translate(-50%, -50%);\n            pointer-events: none;\n            z-index: 8;\n          }\n\n          .kairos-card-orbit-ring {\n            position: absolute;\n            inset: 0;\n            border-radius: 999px;\n            border: 1px solid rgba(255,255,255,.07);\n          }\n\n          .kairos-card-orbit-ring:nth-child(2) {\n            inset: 6%;\n            border-color: rgba(53,216,255,.15);\n            border-style: dashed;\n          }\n\n          .kairos-card-orbit-ring:nth-child(3) {\n            inset: 13%;\n            border-color: rgba(255,255,255,.075);\n          }\n\n          .kairos-card-orbit-ring:nth-child(4) {\n            inset: 21%;\n            border-color: rgba(139,92,246,.13);\n          }\n\n          .kairos-card-orbit-ring:nth-child(5) {\n            inset: 31%;\n            border-color: rgba(255,255,255,.09);\n          }\n\n          .kairos-card-inner-orbit {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: 69%;\n            height: 56%;\n            transform: translate(-50%, -50%);\n            pointer-events: none;\n          }\n\n          .kairos-card-loop {\n            position: absolute;\n            top: 50%;\n            width: 58%;\n            height: 76%;\n            border: 1px solid rgba(255,255,255,.095);\n            border-radius: 50%;\n            transform: translateY(-50%);\n          }\n\n          .kairos-card-loop--left {\n            left: -1%;\n            transform: translateY(-50%) rotate(14deg);\n            border-right-color: rgba(53,216,255,.19);\n            box-shadow: inset -10px 0 26px rgba(53,216,255,.018);\n          }\n\n          .kairos-card-loop--right {\n            right: -1%;\n            transform: translateY(-50%) rotate(-14deg);\n            border-left-color: rgba(255,79,216,.18);\n            box-shadow: inset 10px 0 26px rgba(255,79,216,.018);\n          }\n\n          .kairos-card-inner-ring {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: 58%;\n            height: 58%;\n            transform: translate(-50%, -50%);\n            border-radius: 999px;\n            border: 1px solid rgba(255,255,255,.065);\n          }\n\n          .kairos-card-arc {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: 84%;\n            height: 84%;\n            border-radius: 999px;\n            border: 1px solid transparent;\n            transform: translate(-50%, -50%);\n            pointer-events: none;\n          }\n\n          .kairos-card-arc--cyan {\n            border-top-color: rgba(53,216,255,.26);\n            border-left-color: rgba(53,216,255,.11);\n            transform: translate(-50%, -50%) rotate(-24deg);\n          }\n\n          .kairos-card-arc--violet {\n            border-bottom-color: rgba(255,79,216,.22);\n            border-right-color: rgba(139,92,246,.12);\n            transform: translate(-50%, -50%) rotate(22deg);\n          }\n\n          .kairos-card-tick {\n            position: absolute;\n            width: 1px;\n            height: 10px;\n            background: rgba(255,255,255,.42);\n            transform-origin: 50% 50%;\n          }\n\n          .kairos-card-mini-line {\n            position: absolute;\n            height: 1px;\n            background: rgba(255,255,255,.16);\n            pointer-events: none;\n          }\n\n          .kairos-card-mini-line--cyan {\n            background: linear-gradient(90deg, #35d8ff, rgba(53,216,255,.14));\n          }\n\n          .kairos-card-mini-line--violet {\n            background: linear-gradient(90deg, rgba(255,79,216,.72), rgba(139,92,246,.14));\n          }\n\n          .kairos-card-bottom-bars {\n            position: absolute;\n            display: flex;\n            gap: 10px;\n            align-items: center;\n            pointer-events: none;\n          }\n\n          .kairos-card-bottom-bars span {\n            display: block;\n            width: 2px;\n            height: 11px;\n            background: rgba(255,255,255,.25);\n          }\n\n          .kairos-card-bottom-bars span:nth-child(4n+1) {\n            background: rgba(255,79,216,.68);\n          }\n\n          .kairos-card-axis-x,\n          .kairos-card-axis-y {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            pointer-events: none;\n          }\n\n          .kairos-card-axis-x {\n            width: 118%;\n            height: 1px;\n            transform: translate(-50%, -50%);\n            background:\n              linear-gradient(\n                90deg,\n                transparent,\n                rgba(255,255,255,.12),\n                rgba(53,216,255,.4),\n                rgba(255,79,216,.28),\n                rgba(255,255,255,.12),\n                transparent\n              );\n          }\n\n          .kairos-card-axis-y {\n            width: 1px;\n            height: 118%;\n            transform: translate(-50%, -50%);\n            background:\n              linear-gradient(\n                180deg,\n                transparent,\n                rgba(255,255,255,.12),\n                rgba(53,216,255,.34),\n                rgba(255,79,216,.22),\n                rgba(255,255,255,.12),\n                transparent\n              );\n          }\n\n          .kairos-card-node {\n            position: absolute;\n            width: 10px;\n            height: 10px;\n            border: 1px solid rgba(255,255,255,.62);\n            background: rgba(0,0,0,.72);\n            pointer-events: none;\n          }\n\n          .kairos-card-node--cyan {\n            border-color: rgba(53,216,255,.96);\n            box-shadow: 0 0 14px rgba(53,216,255,.14);\n          }\n\n          .kairos-card-node--violet {\n            border-color: rgba(255,79,216,.82);\n            box-shadow: 0 0 14px rgba(255,79,216,.12);\n          }\n\n          .kairos-card-crosshair {\n            position: absolute;\n            width: 18px;\n            height: 18px;\n            pointer-events: none;\n          }\n\n          .kairos-card-crosshair::before,\n          .kairos-card-crosshair::after {\n            content: \"\";\n            position: absolute;\n            background: rgba(255,255,255,.4);\n          }\n\n          .kairos-card-crosshair::before {\n            width: 1px;\n            height: 100%;\n            left: 50%;\n            top: 0;\n          }\n\n          .kairos-card-crosshair::after {\n            height: 1px;\n            width: 100%;\n            top: 50%;\n            left: 0;\n          }\n\n          .kairos-card-ruler {\n            position: absolute;\n            display: flex;\n            flex-direction: column;\n            gap: 11px;\n            pointer-events: none;\n            opacity: .66;\n          }\n\n          .kairos-card-ruler span {\n            display: block;\n            width: 9px;\n            height: 1px;\n            background: rgba(255,255,255,.35);\n          }\n\n          .kairos-card-dots {\n            position: absolute;\n            display: grid;\n            grid-template-columns: repeat(6, 2px);\n            gap: 10px 14px;\n            pointer-events: none;\n            opacity: .72;\n          }\n\n          .kairos-card-dots span {\n            width: 2px;\n            height: 2px;\n            border-radius: 999px;\n            background: rgba(255,255,255,.65);\n          }\n\n          .kairos-card-center-copy {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            z-index: 18;\n            transform: translate(-50%, -50%);\n            width: min(78vw, 980px);\n            text-align: center;\n            pointer-events: none;\n          }\n\n          .kairos-card-center-title {\n            font-size: clamp(3.8rem, 8.4vw, 8.4rem);\n            line-height: .72;\n            letter-spacing: -.06em;\n            text-transform: uppercase;\n            color: white;\n            text-shadow:\n              0 0 10px rgba(255,255,255,.06),\n              0 0 30px rgba(53,216,255,.03);\n          }\n\n          .kairos-card-center-sub {\n            margin-top: .26em;\n            font-size: clamp(.8rem, 1.7vw, 1.55rem);\n            letter-spacing: .62em;\n            padding-left: .62em;\n            text-transform: uppercase;\n            color: rgba(255,255,255,.78);\n          }\n\n          .kairos-card-meta {\n            position: absolute;\n            z-index: 18;\n            font-size: 7px;\n            line-height: 1.55;\n            letter-spacing: .34em;\n            text-transform: uppercase;\n            color: rgba(255,255,255,.38);\n            pointer-events: none;\n          }\n\n          .kairos-card-accent-line {\n            position: absolute;\n            width: 92px;\n            height: 2px;\n            background:\n              linear-gradient(\n                90deg,\n                #35d8ff,\n                rgba(139,92,246,.8),\n                rgba(255,79,216,.75)\n              );\n            pointer-events: none;\n            box-shadow: 0 0 14px rgba(53,216,255,.14);\n          }\n\n          .kairos-card-bottom-rule {\n            position: absolute;\n            left: 4.5%;\n            right: 4.5%;\n            bottom: 14%;\n            height: 1px;\n            background:\n              linear-gradient(\n                90deg,\n                rgba(255,255,255,.16),\n                transparent 32%,\n                transparent 68%,\n                rgba(255,255,255,.13)\n              );\n            pointer-events: none;\n          }\n\n          .kairos-signal-stage::before {\n            content: \"\";\n            position: absolute;\n            inset: 0;\n            pointer-events: none;\n            background:\n              radial-gradient(circle at 50% 50%, rgba(53,216,255,.035), transparent 26%),\n              radial-gradient(circle at 50% 50%, rgba(139,92,246,.025), transparent 46%);\n          }\n\n          .kairos-signal-frame {\n            position: absolute;\n            inset: 8% 4vw;\n            pointer-events: none;\n            border: 1px solid rgba(255,255,255,.035);\n          }\n\n          .kairos-signal-frame::before,\n          .kairos-signal-frame::after {\n            content: \"\";\n            position: absolute;\n            background: rgba(255,255,255,.12);\n          }\n\n          .kairos-signal-frame::before {\n            left: 50%;\n            top: -12px;\n            width: 1px;\n            height: 24px;\n          }\n\n          .kairos-signal-frame::after {\n            left: -12px;\n            top: 50%;\n            width: 24px;\n            height: 1px;\n          }\n\n          .kairos-signal-orbit {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: min(44vw, 720px);\n            height: min(44vw, 720px);\n            transform: translate(-50%, -50%);\n            border-radius: 999px;\n            border: 1px solid rgba(255,255,255,.04);\n            pointer-events: none;\n          }\n\n          .kairos-signal-orbit::before,\n          .kairos-signal-orbit::after {\n            content: \"\";\n            position: absolute;\n            border-radius: inherit;\n            border: 1px solid rgba(255,255,255,.025);\n          }\n\n          .kairos-signal-orbit::before {\n            inset: 12%;\n          }\n\n          .kairos-signal-orbit::after {\n            inset: 28%;\n          }\n\n          .kairos-signal-coordinate {\n            position: absolute;\n            font-size: 7px;\n            letter-spacing: .32em;\n            text-transform: uppercase;\n            color: rgba(255,255,255,.2);\n            pointer-events: none;\n          }\n\n          .kairos-signal-coreline {\n            position: absolute;\n            left: 50%;\n            top: 50%;\n            width: 82%;\n            height: 1px;\n            transform: translate(-50%, -50%);\n            background:\n              linear-gradient(\n                90deg,\n                transparent,\n                rgba(53,216,255,.16),\n                rgba(255,255,255,.24),\n                rgba(139,92,246,.16),\n                transparent\n              );\n            pointer-events: none;\n          }\n\n          .kairos-signal-row {\n            will-change: transform;\n            transform-origin: 50% 50%;\n          }\n\n          [data-kairos-signal-rows-wrap] {\n            overflow: hidden;\n          }\n\n          [data-kairos-signal-rows-wrap] {\n            -webkit-mask-image:\n              radial-gradient(\n                circle at center,\n                transparent 0 9%,\n                rgba(0,0,0,.78) 18%,\n                black 38%,\n                black 100%\n              );\n            mask-image:\n              radial-gradient(\n                circle at center,\n                transparent 0 9%,\n                rgba(0,0,0,.78) 18%,\n                black 38%,\n                black 100%\n              );\n          }\n\n          [data-kairos-signal-lead-inner] {\n            will-change: transform, opacity, filter, letter-spacing;\n          }\n\n          [data-kairos-signal-circle] {\n            will-change: transform, opacity, border-radius;\n          }\n\n\n          .kairos-signal-window {\n            box-shadow:\n              0 0 80px rgba(53,216,255,.08),\n              inset 0 0 0 1px rgba(255,255,255,.035);\n            backdrop-filter: blur(2px);\n          }\n\n          @media (max-width: 767px) {\n            .kairos-card-shell {\n              width: calc(100vw - 24px);\n              aspect-ratio: .72 / 1;\n            }\n\n            .kairos-card-orbit {\n              width: 84vw;\n              height: 84vw;\n            }\n\n            .kairos-card-center-copy {\n              width: 86vw;\n            }\n\n            .kairos-card-center-title {\n              font-size: 14vw;\n            }\n\n            .kairos-card-center-sub {\n              font-size: 3.4vw;\n              letter-spacing: .45em;\n            }\n\n            .kairos-card-meta {\n              font-size: 5px;\n              letter-spacing: .22em;\n            }\n\n            .kairos-card-dots {\n              transform: scale(.72);\n              transform-origin: top right;\n            }\n\n            .kairos-card-ruler {\n              opacity: .42;\n            }\n\n            .kairos-signal-row {\n              will-change: transform;\n            }\n\n\n            [data-kairos-signal-circle] {\n              width: 56vw;\n              height: 56vw;\n            }\n\n            .kairos-signal-frame {\n              inset: 10% 12px;\n            }\n\n            .kairos-signal-orbit {\n              width: 72vw;\n              height: 72vw;\n            }\n\n            .kairos-signal-coordinate {\n              font-size: 6px;\n              letter-spacing: .22em;\n            }\n\n            [data-kairos-signal-rows-wrap] {\n              -webkit-mask-image:\n                radial-gradient(\n                  circle at center,\n                  transparent 0 12%,\n                  rgba(0,0,0,.82) 24%,\n                  black 46%,\n                  black 100%\n                );\n              mask-image:\n                radial-gradient(\n                  circle at center,\n                  transparent 0 12%,\n                  rgba(0,0,0,.82) 24%,\n                  black 46%,\n                  black 100%\n                );\n            }\n          }\n\n          .kairos-grid {\n            background-image:\n              linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),\n              linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);\n            background-size: 68px 68px;\n            mask-image:\n              linear-gradient(to bottom, transparent, black 8%, black 92%, transparent);\n          }\n\n          .kairos-noise::after {\n            content: \"\";\n            position: absolute;\n            inset: 0;\n            pointer-events: none;\n            opacity: .05;\n            background-image:\n              url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.92' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.85'/%3E%3C/svg%3E\");\n            mix-blend-mode: soft-light;\n          }\n\n\n\n          .kairos-ui-shell {\n            box-shadow:\n              0 40px 120px rgba(0,0,0,.5),\n              0 0 0 1px rgba(255,255,255,.08);\n          }\n\n          .kairos-real-dashboard {\n            --kd-bg:#0d0d0e;\n            --kd-panel:#171717;\n            --kd-panel-2:#1b1b1b;\n            --kd-line:#2a2a2a;\n            --kd-soft:#a0a0a0;\n            --kd-text:#ededed;\n            --kd-blue:#4f46e5;\n            font-family:\n              \"SFMono-Regular\",\n              \"Menlo\",\n              \"Monaco\",\n              \"Consolas\",\n              monospace !important;\n            background:#0d0d0e;\n            color:#ededed;\n          }\n\n          .kairos-real-dashboard * {\n            font-family: inherit !important;\n          }\n\n          .kd-sidebar {\n            background:#181818;\n            border-right:1px solid #2a2a2a;\n          }\n\n          .kd-topbar {\n            background:#0b0b0c;\n            border-bottom:1px solid #242424;\n          }\n\n          .kd-card {\n            background:\n              linear-gradient(180deg, rgba(255,255,255,.018), transparent),\n              #171717;\n            border:1px solid #2b2b2b;\n          }\n\n          .kd-panel {\n            background:#171717;\n            border:1px solid #2b2b2b;\n          }\n\n          .kd-nav-active {\n            background:#292929;\n            color:#fff;\n          }\n\n          .kd-nav-item {\n            transition:\n              background-color .22s ease,\n              color .22s ease,\n              transform .22s ease;\n          }\n\n          .kd-nav-item:hover {\n            background:#222;\n            color:#fff;\n            transform:translateX(2px);\n          }\n\n          .kd-chart-grid {\n            background-image:\n              linear-gradient(rgba(255,255,255,.055) 1px, transparent 1px);\n            background-size:100% 52px;\n          }\n\n          .kd-bar {\n            background:\n              linear-gradient(\n                180deg,\n                rgba(255,255,255,.48),\n                rgba(255,255,255,.10)\n              );\n            border:1px solid rgba(255,255,255,.08);\n          }\n\n          .kd-donut {\n            background:\n              conic-gradient(\n                rgba(32,240,199,.72) 0deg 246deg,\n                rgba(139,92,246,.70) 246deg 281deg,\n                rgba(53,216,255,.68) 281deg 336deg,\n                rgba(255,79,216,.62) 336deg 360deg\n              );\n            box-shadow:\n              0 0 42px rgba(53,216,255,.035),\n              0 0 64px rgba(139,92,246,.025);\n          }\n\n          .kd-donut::after {\n            content:\"\";\n            position:absolute;\n            inset:18%;\n            border-radius:999px;\n            background:#171717;\n            border:1px solid #0d0d0e;\n          }\n\n          .kd-scrollbar {\n            scrollbar-width:thin;\n            scrollbar-color:#5f5f5f #141414;\n          }\n\n          @media (max-width: 1023px) {\n            [data-interface-stage] {\n              perspective: 1100px;\n            }\n\n            [data-ui-frame] {\n              transform-style: preserve-3d;\n              backface-visibility: hidden;\n              will-change: transform, filter;\n            }\n\n            .kairos-real-dashboard {\n              width: 100%;\n              overflow: hidden;\n            }\n          }\n\n          @media (max-width: 767px) {\n            .kairos-cursor-halo {\n              display:none !important;\n            }\n\n            .kairos-cinematic-aura {\n              opacity:.08;\n              width:120vw;\n              height:120vw;\n            }\n\n            .kairos-ghost-word {\n              font-size:28vw;\n            }\n\n            .kairos-grid {\n              background-size: 44px 44px;\n            }\n\n            [data-interface-stage] {\n              padding-left: 10px;\n              padding-right: 10px;\n              perspective: 900px;\n            }\n\n            [data-ui-frame] {\n              border-radius: 16px !important;\n              transform-style: preserve-3d;\n              transform-origin: 50% 48%;\n            }\n\n            /*\n             * Mobile = vera dashboard responsive:\n             * layout interno a griglia, niente canvas desktop ridotto.\n             * L'effetto 3D resta sul frame esterno.\n             */\n            .kairos-real-dashboard {\n              width: 100%;\n              min-width: 0;\n              transform-origin: 50% 50%;\n            }\n\n            .kairos-real-dashboard .kd-card,\n            .kairos-real-dashboard .kd-panel {\n              min-width: 0;\n            }\n\n            .kairos-real-dashboard .kd-chart-grid {\n              background-size: 100% 42px;\n            }\n          }\n\n          @media (prefers-reduced-motion: reduce) {\n          }\n        "}</style><section className="flex min-h-[85svh] flex-col justify-center px-6 py-32 md:px-[6vw]"><p className="text-xs uppercase tracking-[.35em] text-violet-300">OXO STUDIO / KAIROS LIBRARY</p><h1 className="avant-legato-font mt-8 text-[13vw] uppercase leading-none tracking-[-.06em] md:text-[10vw]">Biblioteche.</h1><p className="avant-legato-font mt-8 max-w-3xl text-2xl md:text-4xl">Gestire il patrimonio. Connettere i lettori.</p></section><Editorial eyebrow="01 / KAIROS ARCHIVE / GESTIONE BIBLIOTECARIA" lines={["Il patrimonio.","Sotto controllo."]} copy="Un ambiente operativo progettato per bibliotecari e istituzioni culturali. Dalla consistenza delle raccolte alla circolazione delle opere, un unico sistema per organizzare, consultare e valorizzare il patrimonio librario." items={managementFeatures}/><section className="border-t border-white/10 px-5 py-20 md:px-[6vw]"><p className="text-xs tracking-[.3em] text-violet-300">01 / GESTIONALE</p><h2 className="avant-legato-font mt-5 text-4xl uppercase md:text-6xl">Gestionale bibliografico</h2><p className="my-7 max-w-3xl text-lg text-white/65">Catalogo, inventario, utenti, prestiti, prenotazioni e restituzioni in un unico ambiente operativo.</p><div data-interface-stage className="kairos-noise relative flex min-h-[100svh] items-center border-y border-white/12 bg-[#050506] py-8"><div className="relative z-10 w-full"><Desktop/></div></div><a className="mt-8 inline-block border border-white/30 px-5 py-3" href="https://kairosarchive.com/">Accedi al gestionale ↗</a></section><Editorial eyebrow="02 / KAIROS LIBRARY / AREA LETTORI" lines={["La biblioteca.","Sempre con te."]} copy="Un accesso digitale al patrimonio bibliografico. Esplora il catalogo, scopri opere affini ai tuoi interessi e gestisci il rapporto con la biblioteca, dal computer allo smartphone." items={readerFeatures}/><section className="border-t border-white/10 px-5 py-20 md:px-[6vw]"><div data-library-copy className="mb-8"><p className="text-[10px] uppercase tracking-[.38em] text-cyan-300">REAL PRODUCT / KAIROS LIBRARY</p><h2 className="avant-legato-font mt-4 text-4xl uppercase md:text-6xl">Il tuo spazio di lettura.</h2><p className="mt-4 max-w-3xl text-white/60">Una panoramica personale di prestiti, ritiri, restituzioni, preferiti e interessi. Interfaccia ricostruita con dati dimostrativi.</p></div><div data-interface-stage className="relative flex min-h-[100svh] items-center"><ReaderDashboard/></div></section><section className="grid items-center gap-12 border-t border-white/10 px-5 py-20 md:grid-cols-2 md:px-[6vw]"><div><p className="text-xs tracking-[.3em] text-violet-300">03 / MOBILE EXPERIENCE</p><h2 className="avant-legato-font mt-5 text-4xl uppercase md:text-6xl">La biblioteca in tasca.</h2><p className="my-7 max-w-lg text-lg text-white/65">Ricerca, affinità, generi, autori, preferiti, prestiti, calendario e profilo personale.</p><a className="inline-block border border-white/30 px-5 py-3" href="https://library.kairosarchive.com/kairos_library">Accedi a Kairos Library ↗</a></div><div data-interface-stage className="relative flex min-h-[100svh] items-center justify-center"><Mobile/></div></section><p className="px-6 pb-10 text-center text-xs text-white/50">Interfacce dimostrative. Nessun dato personale reale.</p><section className="border-t border-white/12 px-5 py-24 md:px-[6vw] md:py-36"><div data-library-copy><p className="text-xs uppercase tracking-[.35em] text-cyan-300">OXO STUDIO / PATRIMONIO CONNESSO</p><h2 className="avant-legato-font ombra2 mt-8 text-[11vw] uppercase leading-[.8] tracking-[-.075em] md:text-[8vw]">Due ambienti.<span className="block">Una biblioteca.</span></h2><p className="mt-8 max-w-3xl text-xl text-white/65">Il gestionale per chi custodisce il patrimonio. Kairos Library per chi lo vive.</p><div className="mt-10 flex flex-wrap gap-4"><a className="border border-white/30 px-6 py-4" href="https://kairosarchive.com/">Gestionale ↗</a><a className="border border-white/30 px-6 py-4" href="https://library.kairosarchive.com/kairos_library">Kairos Library ↗</a><a className="border border-white/30 px-6 py-4" href="/contatti">Contattaci ↗</a></div></div></section></main></>;}
