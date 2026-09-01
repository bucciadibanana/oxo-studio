import fs from "node:fs";
import path from "node:path";


const DIST =
  path.resolve("dist");


const INDEX =
  path.join(
    DIST,
    "index.html"
  );


if (!fs.existsSync(INDEX)) {
  throw new Error(
    "dist/index.html non trovato. Esegui prima vite build."
  );
}


const originalTemplate =
  fs.readFileSync(
    INDEX,
    "utf8"
  );


const SITE =
  "https://oxostudio.it";



const PAGES = [
  {
    route: "/",

    title:
      "OXO Studio | Software, AI e Creative Technology",

    description:
      "OXO Studio è uno studio di creative technology a La Spezia. Progettiamo software custom, sistemi di intelligenza artificiale, prodotti web ed esperienze interattive.",

    h1:
      "OXO Studio",

    text:
      "Software, intelligenza artificiale e mondi interattivi progettati come sistemi digitali riconoscibili, solidi e pronti a evolvere.",

    links: [
      [
        "/chisiamo",
        "Chi siamo",
      ],

      [
        "/prodotti",
        "Prodotti",
      ],

      [
        "/contatti",
        "Contatti",
      ],

      [
        "/portfolio/kairosarchive",
        "Kairos Archive",
      ],
    ],
  },


  {
    route:
      "/chisiamo",

    title:
      "Chi siamo | OXO Studio",

    description:
      "Scopri OXO Studio, il team e l'approccio che unisce software, intelligenza artificiale, catalogazione, fotografia e creative technology.",

    h1:
      "Chi siamo",

    text:
      "OXO Studio unisce sviluppo software, intelligenza artificiale, catalogazione, fotografia e visual storytelling.",

    links: [
      [
        "/team/matteo",
        "Matteo Poli",
      ],

      [
        "/team/gab",
        "Gabriele Chierici",
      ],

      [
        "/team/luca",
        "Luca Albani",
      ],
    ],
  },


  {
    route:
      "/prodotti",

    title:
      "Prodotti digitali | OXO Studio",

    description:
      "Scopri i prodotti OXO Studio: Kairos Archive, software custom, sistemi AI e interactive worlds sviluppati come sistemi digitali completi.",

    h1:
      "Prodotti",

    text:
      "Kairos Archive, software custom, sistemi di intelligenza artificiale e interactive worlds.",

    links: [
      [
        "/portfolio/kairosarchive",
        "Kairos Archive",
      ],

      [
        "/portfolio/software",
        "Custom Software",
      ],

      [
        "/portfolio/ai",
        "AI Systems",
      ],

      [
        "/portfolio/game",
        "Interactive Worlds",
      ],
    ],
  },


  {
    route:
      "/contatti",

    title:
      "Contatti | OXO Studio",

    description:
      "Contatta OXO Studio per software custom, sistemi di intelligenza artificiale, prodotti digitali, esperienze web e progetti interattivi.",

    h1:
      "Contatti",

    text:
      "Contatta OXO Studio per parlare di software, intelligenza artificiale, prodotti digitali e creative technology.",

    links: [
      [
        "/",
        "Home",
      ],

      [
        "/prodotti",
        "Prodotti",
      ],
    ],
  },


  {
    route:
      "/portfolio/kairosarchive",

    title:
      "Kairos Archive | OXO Studio",

    description:
      "Kairos Archive è il sistema OXO Studio per metadatazione, catalogazione bibliografica, ricerca e organizzazione documentale con AI, MARC 21, SBN e Z39.50.",

    h1:
      "Kairos Archive",

    text:
      "Sistema intelligente per metadatazione, catalogazione bibliografica, ricerca e organizzazione documentale.",

    links: [
      [
        "/prodotti",
        "Tutti i prodotti",
      ],
    ],
  },


  {
    route:
      "/portfolio/software",

    title:
      "Custom Software | OXO Studio",

    description:
      "Software custom, web application, dashboard, API e sistemi gestionali progettati da OXO Studio intorno ai processi reali del cliente.",

    h1:
      "Custom Software",

    text:
      "Applicazioni web, dashboard, API, database e sistemi gestionali progettati sui processi reali.",

    links: [
      [
        "/prodotti",
        "Tutti i prodotti",
      ],
    ],
  },


  {
    route:
      "/portfolio/ai",

    title:
      "AI Systems | OXO Studio",

    description:
      "Sistemi AI per OCR, classificazione, ricerca semantica, automazione, LLM e workflow intelligenti sviluppati da OXO Studio.",

    h1:
      "AI Systems",

    text:
      "OCR, classificazione, ricerca semantica, automazione, LLM e workflow intelligenti.",

    links: [
      [
        "/prodotti",
        "Tutti i prodotti",
      ],
    ],
  },


  {
    route:
      "/portfolio/game",

    title:
      "Interactive Worlds | OXO Studio",

    description:
      "Videogame, prototipi, ambienti 3D e sistemi real-time sviluppati da OXO Studio unendo codice, gameplay, movimento e direzione visiva.",

    h1:
      "Interactive Worlds",

    text:
      "Videogame, prototipi, ambienti 3D e sistemi real-time.",

    links: [
      [
        "/prodotti",
        "Tutti i prodotti",
      ],
    ],
  },


  {
    route:
      "/team/matteo",

    title:
      "Matteo Poli | OXO Studio",

    description:
      "Matteo Poli di OXO Studio si occupa di sviluppo software, intelligenza artificiale, architettura dei sistemi e prodotti digitali.",

    h1:
      "Matteo Poli",

    text:
      "Software, intelligenza artificiale, product architecture e sviluppo di sistemi digitali.",

    links: [
      [
        "/chisiamo",
        "Chi siamo",
      ],
    ],
  },


  {
    route:
      "/team/gab",

    title:
      "Gabriele Chierici | OXO Studio",

    description:
      "Gabriele Chierici di OXO Studio si occupa di catalogazione bibliografica, SBN, Z39.50, MARC 21 e UNIMARC.",

    h1:
      "Gabriele Chierici",

    text:
      "Catalogazione bibliografica, SBN, Z39.50, MARC 21, UNIMARC e sistemi per il patrimonio culturale.",

    links: [
      [
        "/chisiamo",
        "Chi siamo",
      ],
    ],
  },


  {
    route:
      "/team/luca",

    title:
      "Luca Albani | OXO Studio",

    description:
      "Luca Albani di OXO Studio si occupa di fotografia, video, riprese, montaggio e visual storytelling.",

    h1:
      "Luca Albani",

    text:
      "Fotografia, video, riprese, montaggio e visual storytelling.",

    links: [
      [
        "/chisiamo",
        "Chi siamo",
      ],
    ],
  },
];



function escapeHtml(
  value
) {
  return String(value)

    .replaceAll(
      "&",
      "&amp;"
    )

    .replaceAll(
      "<",
      "&lt;"
    )

    .replaceAll(
      ">",
      "&gt;"
    )

    .replaceAll(
      '"',
      "&quot;"
    );
}



function canonical(
  route
) {
  if (route === "/") {
    return `${SITE}/`;
  }

  return `${SITE}${route}`;
}



function createHead(
  page
) {
  const url =
    canonical(
      page.route
    );


  return `
<title>${escapeHtml(
    page.title
  )}</title>

<meta
  name="description"
  content="${escapeHtml(
    page.description
  )}"
>

<meta
  name="robots"
  content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
>

<link
  rel="canonical"
  href="${url}"
>

<meta
  property="og:type"
  content="website"
>

<meta
  property="og:title"
  content="${escapeHtml(
    page.title
  )}"
>

<meta
  property="og:description"
  content="${escapeHtml(
    page.description
  )}"
>

<meta
  property="og:url"
  content="${url}"
>

<meta
  property="og:site_name"
  content="OXO Studio"
>

<meta
  property="og:locale"
  content="it_IT"
>

<meta
  name="twitter:card"
  content="summary_large_image"
>
`;
}



function createSeoContent(
  page
) {
  const links =
    page.links

      .map(
        ([href, label]) =>
          `<li>
            <a href="${href}">
              ${escapeHtml(label)}
            </a>
          </li>`
      )

      .join("");


  return `
<div id="seo-prerender">

  <main>

    <article>

      <p>
        OXO Studio
      </p>

      <h1>
        ${escapeHtml(
          page.h1
        )}
      </h1>

      <p>
        ${escapeHtml(
          page.text
        )}
      </p>

      <nav
        aria-label="Navigazione principale"
      >

        <ul>
          ${links}
        </ul>

      </nav>

    </article>

  </main>

</div>
`;
}



function removeOldSeo(
  html
) {
  return html

    .replace(
      /<title\b[^>]*>[\s\S]*?<\/title>/gi,
      ""
    )

    .replace(
      /<meta\b[^>]*name=["']description["'][^>]*>/gi,
      ""
    )

    .replace(
      /<meta\b[^>]*name=["']robots["'][^>]*>/gi,
      ""
    )

    .replace(
      /<link\b[^>]*rel=["']canonical["'][^>]*>/gi,
      ""
    );
}



for (
  const page
  of PAGES
) {
  let html =
    removeOldSeo(
      originalTemplate
    );


  /*
   * HEAD
   */

  html =
    html.replace(
      "</head>",

      `${createHead(
        page
      )}

</head>`
    );


  /*
   * SEO CONTENT
   *
   * Viene inserito prima del root React.
   */

  html =
    html.replace(
      '<div id="root"></div>',

      `
${createSeoContent(
  page
)}

<div id="root"></div>
`
    );


  /*
   * DIRECTORY
   */

  const outputDirectory =
    page.route === "/"

      ? DIST

      : path.join(
          DIST,

          page.route.replace(
            /^\/+/,
            ""
          )
        );


  fs.mkdirSync(
    outputDirectory,

    {
      recursive: true,
    }
  );


  /*
   * WRITE
   */

  fs.writeFileSync(
    path.join(
      outputDirectory,
      "index.html"
    ),

    html,

    "utf8"
  );
}



console.log(
  `SEO prerender completato: ${PAGES.length} pagine generate.`
);