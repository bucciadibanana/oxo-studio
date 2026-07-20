

import Sezione1ChiSiamo from "../components/ChiSiamo/Sezione1ChiSiamo";
import Sezione2ChiSiamo from "../components/ChiSiamo/Sezione2ChiSiamo";
import SezioneGab from "../components/ChiSiamo/SezioneGab";
import Sezione2Gab from "../components/ChiSiamo/Sezione2Gab";
import SezioneFinale from "../components/ChiSiamo/SezioneFinaleChiSiamo";
import Footer from '../components/ChiSiamo/FooterChisiamo'






import SeoMetaTags from "../components/SeoMetaTags";



export default function Scroll() {
  return (
    <>
      <SeoMetaTags
        title="Chi Siamo - Agenzia Web La Spezia | OXO Studio"
        description="Scopri OXO Studio, agenzia di sviluppo web e design a La Spezia. Team specializzato in creazione siti internet, SEO e soluzioni digitali."
        canonicalUrl="/ChiSiamo"
      />
    

        {/* Contenuti sopra Dna */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Sezione1ChiSiamo />
          <Sezione2ChiSiamo />
          <SezioneGab/>
          <Sezione2Gab/>
          <SezioneFinale />
          <Footer />
        </div>
    
    </>
  );
}
