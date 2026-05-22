

import Sezione1ChiSiamo from "../components/ChiSiamo/Sezione1ChiSiamo";
import Sezione2ChiSiamo from "../components/ChiSiamo/Sezione2ChiSiamo";
import SezioneFinale from "../components/ChiSiamo/SezioneFinaleChiSiamo";
import Footer from '../components/ChiSiamo/FooterChisiamo'
import Dna from "../components/shader/dna"





import SeoMetaTags from "../components/SeoMetaTags";



export default function Scroll() {
  return (
    <>
      <SeoMetaTags
        title="Chi Siamo - Agenzia Web La Spezia | OXO Studio"
        description="Scopri OXO Studio, agenzia di sviluppo web e design a La Spezia. Team specializzato in creazione siti internet, SEO e soluzioni digitali."
        canonicalUrl="/ChiSiamo"
      />

      <main style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Dna come sfondo */}
        <div style={{
          position: 'fixed',
          top: 100,
          left: 100,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          pointerEvents: 'none',  // così non blocca click sugli elementi sopra
        }}>
          <Dna />
        </div>

      

        {/* Contenuti sopra Dna */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Sezione1ChiSiamo />
          <Sezione2ChiSiamo />
          <SezioneFinale />
          <Footer />
        </div>
      </main>
    </>
  );
}
