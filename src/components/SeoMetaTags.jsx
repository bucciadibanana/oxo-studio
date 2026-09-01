import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const SITE_URL = "https://oxostudio.it";

const SITE = {
  name: "OXO Studio",
  legalName: "OXO Studio S.r.l.",

  url: SITE_URL,

  locale: "it_IT",

  defaultImage: "/og-default.jpg",

  defaultTitle:
    "OXO Studio | Software, AI e Creative Technology",

  defaultDescription:
    "OXO Studio è uno studio di creative technology a La Spezia. Progettiamo software custom, sistemi di intelligenza artificiale, prodotti web ed esperienze interattive.",
};


/*
 * ============================================
 * SEO CONFIGURATION BY ROUTE
 * ============================================
 */

const ROUTE_SEO = {
  "/": {
    title:
      "OXO Studio | Software, AI e Creative Technology",

    description:
      "OXO Studio è uno studio di creative technology a La Spezia. Progettiamo software custom, sistemi di intelligenza artificiale, prodotti web ed esperienze interattive.",

    type: "website",
  },


  "/chisiamo": {
    title:
      "Chi siamo | OXO Studio",

    description:
      "Scopri OXO Studio, il team e l'approccio che unisce software, intelligenza artificiale, catalogazione, fotografia e creative technology.",

    type: "website",
  },


  "/prodotti": {
    title:
      "Prodotti digitali | OXO Studio",

    description:
      "Scopri i prodotti OXO Studio: Kairos Archive, software custom, sistemi AI e interactive worlds sviluppati come sistemi digitali completi.",

    type: "website",
  },


  "/contatti": {
    title:
      "Contatti | OXO Studio",

    description:
      "Contatta OXO Studio per software custom, sistemi di intelligenza artificiale, prodotti digitali, esperienze web e progetti interattivi.",

    type: "website",
  },


  /*
   * PRODUCTS
   */

  "/portfolio/kairosarchive": {
    title:
      "Kairos Archive | Catalogazione, AI e Metadatazione | OXO Studio",

    description:
      "Kairos Archive è il sistema OXO Studio per metadatazione, catalogazione bibliografica, ricerca e organizzazione documentale con AI, MARC 21, SBN e Z39.50.",

    type: "website",

    entity: {
      "@type": "SoftwareApplication",

      name: "Kairos Archive",

      applicationCategory:
        "BusinessApplication",

      operatingSystem:
        "Web",

      description:
        "Sistema per metadatazione, catalogazione, ricerca e organizzazione documentale.",
    },
  },


  "/portfolio/software": {
    title:
      "Custom Software | OXO Studio",

    description:
      "OXO Studio sviluppa software custom, web application, dashboard, API, database e sistemi gestionali progettati intorno ai processi reali del cliente.",

    type: "website",

    entity: {
      "@type": "Service",

      name:
        "Custom Software Development",

      serviceType:
        "Software development",
    },
  },


  "/portfolio/ai": {
    title:
      "AI Systems | OXO Studio",

    description:
      "OXO Studio sviluppa sistemi AI per OCR, classificazione, ricerca semantica, automazione, LLM, elaborazione documentale e workflow intelligenti.",

    type: "website",

    entity: {
      "@type": "Service",

      name:
        "AI Systems",

      serviceType:
        "Artificial Intelligence Systems and Automation",
    },
  },


  "/portfolio/game": {
    title:
      "Interactive Worlds | OXO Studio",

    description:
      "OXO Studio sviluppa videogame, prototipi, ambienti 3D e sistemi real-time unendo codice, gameplay, movimento e direzione visiva.",

    type: "website",

    entity: {
      "@type": "Service",

      name:
        "Interactive Worlds",

      serviceType:
        "Interactive media and videogame development",
    },
  },


  /*
   * TEAM
   */

  "/team/matteo": {
    title:
      "Matteo Poli | OXO Studio",

    description:
      "Matteo Poli di OXO Studio si occupa di sviluppo software, intelligenza artificiale, architettura dei sistemi e prodotti digitali.",

    type: "profile",

    entity: {
      "@type": "Person",

      name:
        "Matteo Poli",

      jobTitle:
        "Software / AI / Product",
    },
  },


  "/team/gab": {
    title:
      "Gabriele Chierici | OXO Studio",

    description:
      "Gabriele Chierici di OXO Studio si occupa di catalogazione bibliografica, SBN, Z39.50, MARC 21, UNIMARC e sistemi per il patrimonio culturale.",

    type: "profile",

    entity: {
      "@type": "Person",

      name:
        "Gabriele Chierici",
    },
  },


  "/team/luca": {
    title:
      "Luca Albani | OXO Studio",

    description:
      "Luca Albani di OXO Studio si occupa di fotografia, video, riprese, montaggio e visual storytelling.",

    type: "profile",

    entity: {
      "@type": "Person",

      name:
        "Luca Albani",

      jobTitle:
        "Photographer / Visual",
    },
  },
};



/*
 * ============================================
 * HELPERS
 * ============================================
 */

function normalizePath(pathname) {
  if (!pathname) {
    return "/";
  }

  if (pathname === "/") {
    return "/";
  }

  const clean =
    pathname.replace(/\/+$/, "");

  return clean.toLowerCase();
}



function absoluteUrl(path) {
  if (!path) {
    return `${SITE_URL}${SITE.defaultImage}`;
  }

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return `${SITE_URL}${
    path.startsWith("/")
      ? path
      : `/${path}`
  }`;
}



/*
 * ============================================
 * COMPONENT
 * ============================================
 */

export default function SeoMetaTags({
  title,
  description,

  canonicalUrl,

  ogImage = SITE.defaultImage,

  pageType,

  structuredData,

  noindex = false,
}) {
  const location =
    useLocation();


  const pathname =
    normalizePath(
      location.pathname
    );


  const routeConfig =
    ROUTE_SEO[pathname] || {};


  const finalTitle =
    title ||
    routeConfig.title ||
    SITE.defaultTitle;


  const finalDescription =
    description ||
    routeConfig.description ||
    SITE.defaultDescription;


  const canonicalPath =
    canonicalUrl
      ? normalizePath(
          canonicalUrl
        )
      : pathname;


  const canonical =
    canonicalPath === "/"
      ? `${SITE_URL}/`
      : `${SITE_URL}${canonicalPath}`;


  const finalImage =
    absoluteUrl(ogImage);


  const finalType =
    pageType ||
    routeConfig.type ||
    "website";


  /*
   * ============================================
   * SCHEMA IDs
   * ============================================
   */

  const organizationId =
    `${SITE_URL}/#organization`;


  const websiteId =
    `${SITE_URL}/#website`;


  /*
   * ============================================
   * ORGANIZATION
   * ============================================
   */

  const organizationSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "Organization",

    "@id":
      organizationId,

    name:
      SITE.legalName,

    alternateName:
      SITE.name,

    url:
      `${SITE_URL}/`,

    logo: {
      "@type":
        "ImageObject",

      url:
        absoluteUrl(
          "/logo.png"
        ),
    },

    address: {
      "@type":
        "PostalAddress",

      addressLocality:
        "La Spezia",

      addressRegion:
        "Liguria",

      addressCountry:
        "IT",
    },
  };


  /*
   * ============================================
   * WEBSITE
   * ============================================
   */

  const websiteSchema = {
    "@context":
      "https://schema.org",

    "@type":
      "WebSite",

    "@id":
      websiteId,

    name:
      SITE.name,

    url:
      `${SITE_URL}/`,

    publisher: {
      "@id":
        organizationId,
    },

    inLanguage:
      "it-IT",
  };


  /*
   * ============================================
   * WEBPAGE
   * ============================================
   */

  const webPageSchema = {
    "@context":
      "https://schema.org",

    "@type":
      finalType === "profile"
        ? "ProfilePage"
        : "WebPage",

    "@id":
      `${canonical}#webpage`,

    url:
      canonical,

    name:
      finalTitle,

    description:
      finalDescription,

    isPartOf: {
      "@id":
        websiteId,
    },

    about: {
      "@id":
        organizationId,
    },

    inLanguage:
      "it-IT",
  };


  /*
   * ============================================
   * ROUTE SPECIFIC ENTITY
   * ============================================
   */

  let routeEntitySchema =
    null;


  if (routeConfig.entity) {
    routeEntitySchema = {
      "@context":
        "https://schema.org",

      ...routeConfig.entity,

      url:
        canonical,
    };


    if (
      routeConfig.entity["@type"] ===
      "Service"
    ) {
      routeEntitySchema.provider = {
        "@id":
          organizationId,
      };
    }


    if (
      routeConfig.entity["@type"] ===
      "SoftwareApplication"
    ) {
      routeEntitySchema.creator = {
        "@id":
          organizationId,
      };
    }


    if (
      routeConfig.entity["@type"] ===
      "Person"
    ) {
      routeEntitySchema.worksFor = {
        "@id":
          organizationId,
      };
    }
  }


  /*
   * ============================================
   * CUSTOM SCHEMA
   * ============================================
   */

  const extraSchemas =
    Array.isArray(
      structuredData
    )
      ? structuredData
      : structuredData
        ? [structuredData]
        : [];


  /*
   * ============================================
   * FINAL SCHEMA COLLECTION
   * ============================================
   */

  const schemas = [
    ...(pathname === "/"
      ? [
          organizationSchema,
          websiteSchema,
        ]
      : []),

    webPageSchema,

    ...(routeEntitySchema
      ? [routeEntitySchema]
      : []),

    ...extraSchemas,
  ];


  /*
   * ============================================
   * OUTPUT
   * ============================================
   */

  return (
    <Helmet>

      {/* =========================
          BASE SEO
      ========================= */}

      <title>
        {finalTitle}
      </title>


      <meta
        name="description"
        content={
          finalDescription
        }
      />


      <link
        rel="canonical"
        href={canonical}
      />


      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        }
      />


      <meta
        name="author"
        content={
          SITE.name
        }
      />


      {/* =========================
          OPEN GRAPH
      ========================= */}

      <meta
        property="og:type"
        content={
          finalType
        }
      />


      <meta
        property="og:title"
        content={
          finalTitle
        }
      />


      <meta
        property="og:description"
        content={
          finalDescription
        }
      />


      <meta
        property="og:url"
        content={
          canonical
        }
      />


      <meta
        property="og:image"
        content={
          finalImage
        }
      />


      <meta
        property="og:site_name"
        content={
          SITE.name
        }
      />


      <meta
        property="og:locale"
        content={
          SITE.locale
        }
      />


      {/* =========================
          TWITTER / X
      ========================= */}

      <meta
        name="twitter:card"
        content="summary_large_image"
      />


      <meta
        name="twitter:title"
        content={
          finalTitle
        }
      />


      <meta
        name="twitter:description"
        content={
          finalDescription
        }
      />


      <meta
        name="twitter:image"
        content={
          finalImage
        }
      />


      {/* =========================
          GEO
      ========================= */}

      <meta
        name="geo.region"
        content="IT-SP"
      />


      <meta
        name="geo.placename"
        content="La Spezia"
      />


      {/* =========================
          JSON-LD
      ========================= */}

      {schemas.map(
        (
          schema,
          index
        ) => (
          <script
            key={`${schema["@type"]}-${index}`}
            type="application/ld+json"
          >
            {JSON.stringify(
              schema
            )}
          </script>
        )
      )}

    </Helmet>
  );
}



SeoMetaTags.propTypes = {
  title:
    PropTypes.string,

  description:
    PropTypes.string,

  canonicalUrl:
    PropTypes.string,

  ogImage:
    PropTypes.string,

  pageType:
    PropTypes.string,

  structuredData:
    PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
    ]),

  noindex:
    PropTypes.bool,
};