// src/data/categoriePortfolio.js

const categoriePortfolio = [

  /*Categoria Software Developer*/
  {
    id: 1,
    nome: "Software Developer",
    slug: "software-developer",
    lavori: [
      {
        id: "sd-01",
        titolo: "Crazy and Tina Tattoo",
        immagine: "/img/crazy2.png",
        immagini: [
          "/img/crazy2.png",
          "/img/sezione1crazy.png",
          "/img/sezionefinalecrazy.png"
        ],
        descrizione: "Sviluppo software moderno con focus su performance e usabilità.",
        data: "Maggio 2024",
        tecnologie: "Figma"
      },
    ],
  },

  /*Categoria Web Developer*/
  {
    id: 2,
    nome: "Web Developer",
    slug: "web-developer",
    lavori: [
      {
        id: "wd-01",
        titolo: "Crazy and Tina Tattoo",
        immagine: "/img/crazy2.png",
        immagini: [
          "/img/sezione1crazy.png",
          "/img/crazy2.png",
          "/img/sezionefinalecrazy.png"
        ],
        descrizione: "Un progetto moderno con focus sull'usabilità.",
        data: "Maggio 2024",
        tecnologie: "React Gsap"
      },
    ],
  },

  /*Categoria Intelligenza Artificiale*/
  {
    id: 3,
    nome: "Intelligenza Artificiale",
    slug: "intelligenza-artificiale",
    lavori: [
      {
        id: "ai-01",
        titolo: "Oxo Studio",
        immagini: [
          "/SvgCode/logooxopersito.svg",
        ],
        immagine: "/SvgCode/logooxopersito.svg",
        descrizione:
          "Implementazione di intelligenza artificiale integrata nel software per automazione e analisi dati.",
        data: "Giugno 2025",
        tecnologie: "AI Integration"
      },
    ],
  },

  /*Categoria App Developer*/
  {
    id: 4,
    nome: "App Developer",
    slug: "app-developer",
    lavori: [
      {
        id: "ad-01",
        titolo: "Mobile App Project",
        immagine: "/img/appmobile.png",
        immagini: [
          "/img/appmobile.png"
        ],
        descrizione:
          "Sviluppo di applicazioni mobili moderne e performanti progettate per offrire un'esperienza utente fluida su iOS e Android.",
        data: "Luglio 2025",
        tecnologie: "React Native"
      },
    ],
  },

];

export default categoriePortfolio;