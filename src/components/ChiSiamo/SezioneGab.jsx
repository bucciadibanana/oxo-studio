import { useRef, useEffect, useState } from "react";


const SezioneGabrieleChierici = () => {
  const [isVisible, setIsVisible] = useState(false);

  const gabrieleRef = useRef(null);
  const chiericiRef = useRef(null);
  const imageRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const progress = 1 - Math.max(0, Math.min(1, rect.top / windowHeight));

      if (progress > 0.1 && !isVisible) {
        setIsVisible(true);
      }

      if (isVisible) {
        applyImmersiveTransformations(progress);
      }
    };

    const applyImmersiveTransformations = (progress) => {
      if (!gabrieleRef.current || !chiericiRef.current || !imageRef.current)
        return;

      const normalizedProgress = Math.max(0, (progress - 0.1) / 0.9);

      // GABRIELE - Compare da destra
      const gabrieleX = 100 - normalizedProgress * 100;
      gabrieleRef.current.style.transform = `
        translateX(${gabrieleX}px)
        translateZ(${normalizedProgress * 50}px)
      `;
      gabrieleRef.current.style.opacity = normalizedProgress;

      // CHIERICI - Compare da destra con delay
      const chiericiDelay = Math.max(0, normalizedProgress - 0.2);
      const chiericiX = 100 - chiericiDelay * 100;
      chiericiRef.current.style.transform = `
        translateX(${chiericiX}px)
        translateZ(${chiericiDelay * 60}px)
      `;
      chiericiRef.current.style.opacity = chiericiDelay;

      // SVG - Zoom progressivo a sinistra
      const imageScale = 0.3 + normalizedProgress * 0.7;
      imageRef.current.style.transform = `
        scale(${imageScale})
        translateZ(${normalizedProgress * 30}px)
      `;
      imageRef.current.style.opacity = normalizedProgress;
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="w-screen h-screen relative overflow-hidden"
    >


      {/* Contenuto principale */}
      <div className="relative z-hidden md:z-[9999] h-full">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-1 md:grid-cols-2 items-center gap-6 px-4 md:px-12 lg:px-0 lg:ml-[50px]">
          
          {/* SVG a sinistra */}
          <div
            ref={imageRef}
            className="flex justify-center md:justify-start md:items-start
                       md:mt-[-250px] w-full relative
                       transition-all duration-1200 ease-out
                       z-hidden md:z-[9999]"
            style={{
              opacity: 0,
              transform: "scale(0.3) translateZ(-30px)",
            }}
          >
            <div className="absolute ml-[-550px] mt-[-800px]">
              <img
                src="/SvgCode/mia.svg"
                alt="Illustrazione SVG"
                className="
                  lg:w-[1500px] lg:h-[1700px]
                  md:w-[1200px] md:h-[1200px]
                  w-[850px] h-[850px]
                  object-contain max-w-none

                  ml-[100px] mt-[270px]
                  md:ml-[-100px] md:mt-[290px]
                  lg:ml-[100px] lg:mt-[200px]
                "
              />
            </div>
          </div>

          {/* Testo a destra */}
          <div className="relative  text-center md:text-left space-y-4 lg:mt-[0px] md:mt-[-300px] mt-[-100px]">
            <h1
              ref={gabrieleRef}
              className="
                text-white font-bold antonio leading-none
                transition-all duration-1000 ease-out

                text-[75px] ml-[0px]
                md:text-[150px] md:ml-[-80px]
                lg:text-[300px] lg:ml-[-150px] z-50
              "
              style={{
                transform: "translateX(100px) translateZ(-50px)",
                opacity: 0,
              }}
            >
              GABRIELE
            </h1>

            <h1
              ref={chiericiRef}
              className="
                text-white font-bold antonio leading-none
                transition-all duration-1000 ease-out z-50

                text-[75px] ml-[0px]
                md:text-[150px] md:ml-[-40px]
                lg:text-[320px] lg:ml-[-80px] z-50
              "
              style={{
                transform: "translateX(100px) translateZ(-50px)",
                opacity: 0,
              }}
            >
              CHIERICI
            </h1>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SezioneGabrieleChierici;