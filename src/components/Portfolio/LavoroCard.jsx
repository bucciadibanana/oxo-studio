import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

import "../CategoriePortfolio/FileCategorie.jsx"
import { useEffect, useRef } from "react";



const LavoroCard = ({ lavoro, dimensione = "grande" }) => {

 

  const dimensioni = {
  grande: "w-[90vh] sm:w-[60vw] md:w-[80vw] lg:w-[80vw] h-[70vh] md:h-[75vh] lg:h-[75vh]",
  medio: "w-[90vh] sm:w-[90vw] md:w-[80vw] lg:w-[45vw] h-[40vh] md:h-[60vh] lg:h-[50vh]",
};

const imgAnimateRef = useRef(null)

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger);

  const isMobile = window.innerWidth <= 640; // breakpoint sm Tailwind (640px)
  const startValue = isMobile ? "top 95%" : "top 80%";

  gsap.fromTo(
    imgAnimateRef.current, 
    { opacity: 0, y: 350 },
    {
      opacity: 1,
      duration: 1,
      y: 0,
      ease: "slow(3,3,false)",
      scrollTrigger: {
        trigger: imgAnimateRef.current,
        start: startValue,
        toggleActions: "play none none reverse",
      },
    }
  );

  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}, []);






  return (
    <div className="relative w-full h-full flex items-center justify-center " ref={imgAnimateRef}>
      <div className={`relative group ${dimensioni[dimensione]} rounded overflow-visible `} >
        {/* Immagine */}
     <Link to={`/lavoro/${lavoro.id}`}>

  <div className="w-full h-full flex items-center justify-center overflow-hidden rounded transition-transform duration-500 group-hover:scale-105">
    <img
      src={lavoro.immagine}
      alt={lavoro.titolo}
      className="object-contain w-full h-full "
    />
  </div>
</Link>

 


        {/* Icona in alto a destra */}
        <FontAwesomeIcon
  icon={faArrowRight}
  className="text-gray-500 absolute top-32 right-2 md:-top-12 text-[20px] md:text-2xl transition-transform duration-500 group-hover:-rotate-45"
/>

      </div>

      {/* Titolo in alto */}
      <div className="absolute top-[-15px] left-[3px]   md:left-[25px] md:mt-[25px] lg:mt-[0px] lg:ml-[140px]">
        <h3 className="text-white text-2xl  md:text-4xl font-bold antonio2">{lavoro.titolo}</h3>
      </div>

      {/* Categorie in basso a sinistra */}
      <div className="absolute bottom-1 left-[3px] md:left-[35px]">
        <p className="text-gray-500 text-1xl md:text-2xl lg:ml-[128px] antonio2">{lavoro.categorie.join(", ")}</p>
      </div>

      {/* Data in basso a destra */}
      <div className="absolute bottom-1 right-[3px] md:right-[35px]">
        <p className="text-gray-500 text-1xl md:text-2xl lg:mr-[125px] antonio2">{lavoro.data}</p>
      </div>
    </div>
    
  );
  
};


LavoroCard.propTypes = {
  lavoro: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    titolo: PropTypes.string.isRequired,
    immagine: PropTypes.string.isRequired,
    data: PropTypes.string,
    categorie: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  dimensione: PropTypes.oneOf(['grande', 'medio']),
};


export default LavoroCard;
