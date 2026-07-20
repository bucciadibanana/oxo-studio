import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Sudime = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const chiSiamo = useRef([]);
  const descrRef = useRef([]);

  useEffect(() => {
    // Animazione titolo - lenta
    gsap.fromTo(
      chiSiamo.current,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Animazione descrizione - più veloce
    gsap.fromTo(
      descrRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.015,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Scroll effect immagine
    gsap.set(imageRef.current, {
      y: "20%",
    });

    gsap.to(imageRef.current, {
      y: "-20%",
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  const splitText = (text, ref) =>
    text.split("").map((char, i) => (
      <span
        key={i}
        ref={(el) => (ref.current[i] = el)}
        className="inline-block whitespace-nowrap"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div ref={sectionRef} className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center -translate-y-20 md:-translate-y-32 lg:-translate-y-40 z-[999]">
        {/* Contenitore immagine responsivo */}
        <div className="relative h-[70vh] w-[90vw] sm:w-[110vw] md:w-[90vw] lg:w-[170vh] lg:h-[100vh] mt-[160px] overflow-hidden">
          <img
            ref={imageRef}
            src="/img/solitudine-sulla-costa-una-persona-piedi-generata-dall-ia.jpg"
            alt="Persona sulla costa"
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
          <h1
            className="text-white antonio2  
              text-[9vw] sm:text-[8vw] md:text-[10vw] lg:text-9xl
              text-center select-none whitespace-nowrap z- ombra2"
          >
            {splitText("Sfumature personali", chiSiamo)}
          </h1>

          <h3 className="text-white text-[20px] w-[330px] md:text-3xl md:w-[600px] lg:text-4xl lg:w-[1000px] lg:max-w-[1000px] text-center lg:mt-10 text-shadow-black ombra2 antonio">
             {splitText(
             "Sviluppiamo software intelligenti che integrano l'intelligenza artificiale per automatizzare la metadatazione, l'archiviazione documentale e l'organizzazione delle informazioni.",
             descrRef
             )}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Sudime;
