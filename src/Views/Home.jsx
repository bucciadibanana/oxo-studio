
import Sezione1 from "../components/Home/Sezione1";
import SectionHome2 from "../components/Home/SectioHome2";
import SezioneHome3 from "../components/Home/SezioneHome3";
import MauseBable from "../components/shader/MouseBabble"; // <- shader corretto


import SezioneFinaleHome from "../components/Home/SezioneFinaleHome"
import Footer from '../components/Footer'
import Sudime from "../components/Home/Sudime";

import SeoMetaTags from "../components/SeoMetaTags";




export default function Boxes() {

  return (
    
     <>

       <SeoMetaTags
        title="Agenzia Sviluppo Web La Spezia - Web Design Liguria"
        description="OXO Studio: sviluppo siti web, SEO e design grafico a La Spezia. Servizi professionali per 5 Terre e Liguria. Creiamo siti moderni e performanti."
        canonicalUrl="/"
      />
  {/* SHADER BACKGROUND */}
  <MauseBable />

  {/* CONTENUTO */}
  <main>
    <div className="relative w-full overflow-hidden">
      <Sezione1 />
      <SectionHome2 />
    </div>
    
    <SezioneHome3 />

    <Sudime/>
    
    
    
    <SezioneFinaleHome/>
    <Footer/>
  </main>
</>

  );
}
