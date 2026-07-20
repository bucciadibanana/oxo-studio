import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SectionHome2 = () => {
  const sectionRefLg = useRef(null);
  const sectionRefSm = useRef(null);

  // Desktop refs
  const titleRefLg = useRef([]);
  const refText2Lg = useRef([]);
  const refText3Lg = useRef([]);
  const refText4Lg = useRef([]);
  const refText5Lg = useRef([]);

  const refText6Lg = useRef([]);
  const refText7Lg = useRef([]);
  const refText8Lg = useRef([]);
  const refText9Lg = useRef([]);

  // Mobile refs
  const titleRefSm = useRef([]);
  const refText2Sm = useRef([]);
  const refText3Sm = useRef([]);
  const refText4Sm = useRef([]);
  const refText5Sm = useRef([]);

  const refText6Sm = useRef([]);
  const refText7Sm = useRef([]);
  const refText8Sm = useRef([]);
  const refText9Sm = useRef([]);

  useEffect(() => {
    ScrollTrigger.matchMedia({
      "(min-width: 1024px)": () => {
        const animateLetters = (letters, delay = 0) => {
          gsap.fromTo(
            letters,
            { opacity: 0, y: 50 },
            {
              duration:2,
              opacity: 1,
              y: 0,
              stagger: 0.01,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRefLg.current,
                start: 'top 30%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        };

        const animateLetters2 = (letters, delay = 0) => { 
            gsap.fromTo(
        letters,
            { opacity: 0, y: 80 },
            {
              duration: 1,
              opacity: 1,
              y: 0,
              stagger: 0.01,
              delay,
              ease: 'power2.out',
              scrollTrigger: { 
                trigger: titleRefLg.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
          },
        }
      );
        };

        animateLetters(titleRefLg.current, 0.3);
        animateLetters(refText2Lg.current, 0.1);
        animateLetters(refText3Lg.current, 0.2);
        animateLetters(refText4Lg.current, 0.3);
        animateLetters(refText5Lg.current, 0.4);

        animateLetters2(refText6Lg.current, 0.5);
        animateLetters2(refText7Lg.current, 0.6);
        animateLetters2(refText8Lg.current, 0.7);
        animateLetters2(refText9Lg.current, 0.8);

        return () => {
          ScrollTrigger.getAll().forEach(t => t.kill());
        };
      },
      "(max-width: 1023px)": () => {
        const animateLetters = (letters, delay = 0) => {
          gsap.fromTo(
            letters,
            { opacity: 0, y: 50 },
            {
              duration:1,
              opacity: 1,
              y: 0,
              stagger: 0.01,
              delay,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRefSm.current,
                start: 'top 60%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        };

        const animateLetters2 = (letters, delay = 0) => {
          gsap.fromTo(
            letters,
            { opacity: 0, y: 30 },
            {
              duration: 1,
              opacity: 1,
              y: 0, 
              stagger: 0.01,
              delay,
              ease: 'power2.out',
              scrollTrigger: { 
                trigger: titleRefSm.current,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        };

        animateLetters(titleRefSm.current);
        animateLetters(refText2Sm.current, 0.1);
        animateLetters(refText3Sm.current, 0.2);
        animateLetters(refText4Sm.current, 0.3);
        animateLetters(refText5Sm.current, 0.4);

        animateLetters2(refText6Sm.current, 0.5);
        animateLetters2(refText7Sm.current, 0.6);
        animateLetters2(refText8Sm.current, 0.7);
        animateLetters2(refText9Sm.current, 0.8);

        return () => {
          ScrollTrigger.getAll().forEach(t => t.kill());
        };
      }
    });
  }, []);

  // Funzione splitWords ora pulisce l'array di ref
 const splitLetters = (text, ref) => {
  ref.current = [];
  return text.split('').map((char, i) => (
    <span
      key={i}
      ref={(el) => (ref.current[i] = el)}
      className="inline-block "
      style={{ whiteSpace: 'pre' }} // preserva spazi
    >
      {char}
    </span>
  ));
};

const splitWords = (text, ref) => {
  ref.current = [];
  return text.split(' ').map((word, i) => (
    <span
      key={i}
      ref={(el) => (ref.current[i] = el)}
      className="inline-block"
      style={{ whiteSpace: 'pre' }}
    >
      {word + ' '}
    </span>
  ));
};

  return (
    <>
      {/* VERSIONE DESKTOP */}
      <section
        ref={sectionRefLg}
        className="h-screen w-full relative hidden lg:flex items-center justify-center overflow-hidden flex-col"
      >
        <div className="absolute inset-0 z-0 pointer-events-none" />
        <div className="relative z-10 w-full h-full flex items-center justify-center flex-col">
          <h1 className="text-[230px] text-gray-700 antonio2 text-center -rotate-[25deg]">
            {splitLetters ('I NOSTRI SERVIZI', titleRefLg)}
          </h1>

          <h1 className="absolute top-10 text-5xl antonio2  text-gray-400">
            {splitLetters('Softw dev ', refText2Lg)}
          </h1>
          <p className="absolute top-28 w-1/2 text-lg lg:text-2xl text-white text-center antonio">
            {splitWords(
              'Creiamo interfacce intuitive, moderne e responsive che riflettono l’identità del tuo brand e migliorano l’esperienza utente su ogni dispositivo.',
              refText6Lg
            )}
          </p>

          <h1 className="absolute bottom-20 text-5xl antonio2 text  text-gray-400">
            {splitLetters('Web developer', refText3Lg)}
          </h1>
          <p className="absolute bottom-2 w-1/2 text-lg lg:text-2xl  text-white text-center antonio break-normal whitespace-normal">
            {splitWords(
              'Sviluppiamo siti performanti, scalabili e ottimizzati, utilizzando tecnologie moderne per garantire velocità, sicurezza e funzionalità avanzate.',
              refText7Lg
            )}
          </p>

          <h1 className="absolute left-[150px] top-[400px] -translate-y-1/2 text-5xl antonio2  text-gray-400">
            {splitLetters('Intell. AI ', refText4Lg)}
          </h1>
          <p className="absolute left-[-10px] top-[450px]  max-w-[500px] text-lg lg:text-2xl text-white antonio text-center">
            {splitWords(
              "Integriamo l'intelligenza artificiale nel software per automatizzare i processi e valorizzare i dati.",
              refText8Lg
            )}
          </p>

          <h1 className="absolute right-32 top-[400px] -translate-y-1/2 text-5xl antonio2  text-gray-400
          ">
            {splitLetters('App developer', refText5Lg)}
          </h1>
          <p className="absolute right-[20px] top-[450px] text-lg lg:text-2xl max-w-[500px] text-white text-center antonio">
  {splitWords(
    'Sviluppiamo applicazioni mobile su misura, performanti e intuitive, pensate per offrire esperienze utente fluide su ogni dispositivo.',
    refText9Lg
  )}
</p>

        </div>
      </section>

      {/* VERSIONE MOBILE */}
      <section
        ref={sectionRefSm}
        className="block lg:hidden w-full lg:py-24 md:py-24 py-[50px] px-6"
      >
        <h1 className="text-5xl md:text-8xl antonio2 text-center mb-16">
          {splitLetters('I NOSTRI SERVIZI', titleRefSm)}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-16 max-w-6xl mx-auto">
          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitLetters('Softw dev ', refText2Sm)}</h2>
            <p className="text-lg text-white text-center antonio">
              {splitLetters(
                'Creiamo interfacce intuitive, moderne e responsive che riflettono l’identità del tuo brand e migliorano l’esperienza utente su ogni dispositivo.',
                refText6Sm
              )}
            </p>
          </div>

          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitLetters('Web developer', refText3Sm)}</h2>
            <p className="text-lg text-white text-center antonio">
              {splitLetters(
                'Sviluppiamo siti performanti, scalabili e ottimizzati, utilizzando tecnologie moderne per garantire velocità, sicurezza e funzionalità avanzate.',
                refText7Sm
              )}
            </p>
          </div>

          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitLetters('Intell. AI ', refText4Sm)}</h2>
            <p className="text-lg text-white text-center antonio">
              {splitLetters(
                "Integriamo l'intelligenza artificiale nel software per automatizzare i processi e valorizzare i dati.",
                refText8Sm
              )}
            </p>
          </div>

          <div>
            <h2 className="md:text-5xl text-center text-4xl antonio2 mb-3">{splitLetters('App developer', refText5Sm)}</h2>
            <p className="text-lg text-white text-center antonio">
              {splitLetters(
                'Sviluppiamo applicazioni mobile su misura, performanti e intuitive, pensate per offrire esperienze utente fluide su ogni dispositivo.',
                refText9Sm
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default SectionHome2;