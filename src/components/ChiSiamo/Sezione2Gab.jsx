import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const Sezione2GabrieleChierici = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef([]);

  const h2Refs = useRef([]);
  const pRefs = useRef([]);

  const addToRefs = (refArray, el) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  useEffect(() => {
    const animateTextSpans = (element) => {
      const letters = element.querySelectorAll("span");
      return letters;
    };

    const allLetters = [];

    titleRef.current.forEach((el) => {
      allLetters.push(el);
    });

    h2Refs.current.forEach((h2) => {
      const letters = animateTextSpans(h2);
      letters.forEach((l) => allLetters.push(l));
    });

    pRefs.current.forEach((p) => {
      const letters = animateTextSpans(p);
      letters.forEach((l) => allLetters.push(l));
    });

    gsap.fromTo(
      allLetters,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.01,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <div ref={sectionRef} className="relative lg:mt-[200px]">
  
      <h1
        className="text-8xl md:text-8xl pl-[70px] text-white"
        style={{ fontFamily: "Human" }}
        ref={(el) =>
          (titleRef.current = el ? Array.from(el.querySelectorAll("span")) : [])
        }
      >
        {splitText("Le sue skills")}
      </h1>

      <section className="pl-4 pr-4 md:pl-20 md:pr-20 antonio2 text-white relative mb-[200px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pt-12">
          
          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl text-gray-400 mb-2"
              ref={(el) => addToRefs(h2Refs, el)}
            >
              {splitText("Catalogazione")}
            </h2>
            {[
              "SBN",
              "Catalogazione bibliografica",
              "Descrizione bibliografica",
              "Authority control",
              "Classificazione",
            ].map((text, i) => (
              <p
                className="text-xl md:text-2xl"
                key={i}
                ref={(el) => addToRefs(pRefs, el)}
              >
                {splitText(text)}
              </p>
            ))}
          </div>

          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl text-gray-400 mb-2"
              ref={(el) => addToRefs(h2Refs, el)}
            >
              {splitText("Biblioteche")}
            </h2>
            {[
              "Gestione collezioni",
              "Servizi bibliotecari",
              "Inventariazione",
              "Collocazione",
              "Reference",
            ].map((text, i) => (
              <p
                className="text-xl md:text-2xl"
                key={i}
                ref={(el) => addToRefs(pRefs, el)}
              >
                {splitText(text)}
              </p>
            ))}
          </div>

          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl text-gray-400 mb-2"
              ref={(el) => addToRefs(h2Refs, el)}
            >
              {splitText("Standard")}
            </h2>
            {[
              "ISBD",
              "REICAT",
              "MARC21",
              "UNIMARC",
              "Dewey",
            ].map((text, i) => (
              <p
                className="text-xl md:text-2xl"
                key={i}
                ref={(el) => addToRefs(pRefs, el)}
              >
                {splitText(text)}
              </p>
            ))}
          </div>

          <div className="text-center">
            <h2
              className="text-4xl md:text-5xl text-gray-400 mb-2"
              ref={(el) => addToRefs(h2Refs, el)}
            >
              {splitText("Archivi digitali")}
            </h2>
            {[
              "Metadatazione",
              "Digitalizzazione",
              "OPAC",
              "Repository",
              "Banche dati",
            ].map((text, i) => (
              <p
                className="text-xl md:text-2xl"
                key={i}
                ref={(el) => addToRefs(pRefs, el)}
              >
                {splitText(text)}
              </p>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default Sezione2GabrieleChierici;