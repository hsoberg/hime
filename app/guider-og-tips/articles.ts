export type GuideArticleSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  image: string;
  publishedAt: string;
  sourceHref: string;
  sourceLabel: string;
  sections: GuideArticleSection[];
};

export const guideArticles: GuideArticle[] = [
  {
    slug: "stabilt-wifi-i-hele-huset",
    title: "Slik fikk familien i Vikersund stabilt WiFi i hele huset",
    description:
      "Et typisk hjem med tykke vegger, mange enheter og ustabil dekning. Se hva som faktisk ga bedre fart i hverdagen.",
    category: "Hjemme hos",
    readTime: "4 min lesetid",
    image: "/hf_20260414_081808_cb7eaa03-62e5-46c8-ba69-b00b97bd44ec.png",
    publishedAt: "11. april 2026",
    sourceHref: "/kundeservice/wifi",
    sourceLabel: "Mer om WiFi-hjelp",
    sections: [
      {
        title: "Utgangspunktet",
        paragraphs: [
          "Familien opplevde at videomøter stoppet i andre etasje, mens streaming på TV gikk tregt på kvelden.",
          "Hovedproblemet var ikke linjen inn i huset, men plassering av ruter og mange enheter på samme frekvensbånd.",
        ],
      },
      {
        title: "Hva de endret",
        paragraphs: [
          "Ruteren ble flyttet fra hjørnet i stua til et mer sentralt punkt i boligen.",
          "I tillegg ble de viktigste enhetene prioritert, slik at jobb og skole fikk stabil kapasitet når nettet var travlest.",
        ],
        bullets: [
          "Ruter sentralt, åpent og høyere plassert",
          "Separasjon av enheter med høy trafikk",
          "Fast rutine for enkel restart ved behov",
        ],
      },
      {
        title: "Resultatet",
        paragraphs: [
          "Etter justeringene ble dekningen jevnere, og familien opplevde mindre hakking på nett-TV og videomøter.",
          "Poenget er enkelt: små, riktige grep gir ofte stor effekt uten nytt utstyr.",
        ],
      },
    ],
  },
  {
    slug: "tolk-driftsmeldinger-riktig",
    title: "Driftsmeldinger: slik tolker du statusfeltet",
    description: "Lurer du på hva delvis feil, feilretting eller løst betyr i praksis?",
    category: "Drift",
    readTime: "3 min",
    image: "/hf_20260414_081412_cf58a4e4-d094-4be8-9b0a-e8364def1031.png",
    publishedAt: "10. april 2026",
    sourceHref: "/driftsmeldinger",
    sourceLabel: "Se alle driftsmeldinger",
    sections: [
      {
        title: "Derfor varierer status",
        paragraphs: [
          "En driftsmelding beskriver hvor i prosessen saken er, ikke bare om alt er oppe eller nede.",
          "Statusen oppdateres fortløpende når feilen avgrenses, repareres og verifiseres.",
        ],
      },
      {
        title: "Slik leser du feltene",
        paragraphs: [
          "Se alltid på område, siste oppdatering og beskrivelse av tiltak for å forstå hvor langt saken har kommet.",
        ],
        bullets: [
          "Delvis feil: enkelte kunder eller tjenester er berørt",
          "Feilretting pågår: aktiv jobb på infrastrukturen",
          "Løst: tjenesten er tilbake, men overvåkes ofte videre",
        ],
      },
    ],
  },
  {
    slug: "hva-hastigheten-egentlig-betyr",
    title: "Hva betyr egentlig hastigheten du betaler for?",
    description: "Forskjellen på teoretisk toppfart og faktisk opplevd kapasitet i hjemmet.",
    category: "Internett",
    readTime: "5 min",
    image: "/hf_20260414_082229_8f99cb80-7966-46af-9c25-d49704a5569a.png",
    publishedAt: "9. april 2026",
    sourceHref: "/kundeservice/internett",
    sourceLabel: "Les mer om internett-hjelp",
    sections: [
      {
        title: "Målt hastighet vs. opplevd hastighet",
        paragraphs: [
          "Avstanden mellom enhet og ruter, antall samtidige brukere og type bruk påvirker resultatet mer enn mange tror.",
          "Derfor kan to hjem med samme abonnement oppleve ulik ytelse i praksis.",
        ],
      },
      {
        title: "Når bør du feilsøke",
        paragraphs: [
          "Hvis flere enheter over tid opplever markant lavere fart enn normalt, er det lurt å starte med enkel feilsøking.",
        ],
        bullets: [
          "Test både trådløst og kablet",
          "Sammenlign ulike tidspunkt på døgn",
          "Sjekk driftsmeldinger for ditt område",
        ],
      },
    ],
  },
  {
    slug: "nett-tv-pa-hytta",
    title: "Nett-TV på hytta: dette fungerer best",
    description: "Tre konkrete grep for bedre opplevelse når flere streamer samtidig.",
    category: "TV",
    readTime: "4 min",
    image: "/hf_20260414_081712_60c12902-717c-4653-bd81-f7f90fc49bfb.png",
    publishedAt: "8. april 2026",
    sourceHref: "/tv",
    sourceLabel: "Se TV-produkter",
    sections: [
      {
        title: "Forberedelser som monner",
        paragraphs: [
          "Mange hytter har svakere mobildekning og mer varierende kapasitet enn hjemme.",
          "Med riktig plassering av utstyr og realistisk kvalitetsnivå blir opplevelsen ofte mye bedre.",
        ],
      },
      {
        title: "Praktiske anbefalinger",
        paragraphs: [
          "Prioriter stabilitet foran høyeste bildekvalitet når nettet er presset.",
        ],
        bullets: [
          "Bruk 5 GHz nær ruteren ved streaming",
          "Reduser kvalitet ett hakk ved hakking",
          "Unngå store nedlastinger samtidig med live-TV",
        ],
      },
    ],
  },
  {
    slug: "5-grep-for-tregt-nett",
    title: "5 grep som ofte løser tregt nett på under 10 minutter",
    description: "En enkel sjekkliste du kan gjøre selv før du kontakter support.",
    category: "Internett",
    readTime: "6 min",
    image: "/hf_20260414_082803_2c17f0d5-ddc2-42e5-a0de-1af6328a8d1d.png",
    publishedAt: "7. april 2026",
    sourceHref: "/kundeservice/internett",
    sourceLabel: "Gå til internett-feilsøking",
    sections: [
      {
        title: "Start med det enkle",
        paragraphs: [
          "Mange treghetsproblemer skyldes lokale forhold i hjemmenettet, ikke linjefeil.",
        ],
        bullets: [
          "Restart ruter og vent et par minutter",
          "Flytt enheten nærmere ruteren for test",
          "Lukk apper og faner som bruker mye data",
          "Sjekk om andre i huset laster opp/ned samtidig",
          "Se om problemet gjelder alle enheter eller bare en",
        ],
      },
      {
        title: "Når du bør melde inn feil",
        paragraphs: [
          "Hvis problemet vedvarer etter disse stegene, er det nyttig å ha testresultater klare når du kontakter oss.",
        ],
      },
    ],
  },
  {
    slug: "wifi-i-andre-etasje",
    title: "Derfor forsvinner WiFi-signalet i andre etasje",
    description: "Hvordan plassering, byggematerialer og enhetsmengde spiller inn.",
    category: "WiFi",
    readTime: "4 min",
    image: "/hf_20260414_082455_e1e920ae-e5db-4d9b-80d3-f9ead6f659dd.png",
    publishedAt: "6. april 2026",
    sourceHref: "/kundeservice/wifi",
    sourceLabel: "Få hjelp med WiFi",
    sections: [
      {
        title: "Hva stopper signalet",
        paragraphs: [
          "Betong, gulvvarme og plassering i skap reduserer rekkevidde betydelig.",
          "I mange hjem gir en liten flytting av ruter stor forskjell i overetasjen.",
        ],
      },
      {
        title: "Slik kommer du i gang",
        paragraphs: [
          "Test dekning rom for rom og noter hvor signalet faller mest.",
        ],
        bullets: [
          "Flytt ruter vekk fra metall og hjørneskap",
          "Plasser ruter høyere og mer sentralt",
          "Prioriter kritiske enheter ved behov",
        ],
      },
    ],
  },
  {
    slug: "tv-hakker-tre-ting",
    title: "TV hakker? Sjekk disse tre tingene først",
    description: "Rask feilsøkingsguide for app, dekoder og nettverk hjemme.",
    category: "TV",
    readTime: "3 min",
    image: "/hf_20260414_081654_149688cf-7e99-461b-9833-e2f4fe88b278.png",
    publishedAt: "5. april 2026",
    sourceHref: "/kundeservice/tv",
    sourceLabel: "Gå til TV-feilsøking",
    sections: [
      {
        title: "Tre raske kontroller",
        paragraphs: [
          "De fleste avbrudd skyldes kombinasjonen av app, enhet og nettverk, ikke bare en av delene.",
        ],
        bullets: [
          "Restart app eller dekoder",
          "Sjekk om problemet gjelder alle kanaler",
          "Test med kablet nett hvis mulig",
        ],
      },
      {
        title: "Etterkontroll",
        paragraphs: [
          "Hvis feilen kommer tilbake på faste tidspunkt, noter klokkeslett og hva du ser på. Det gir raskere hjelp videre.",
        ],
      },
    ],
  },
  {
    slug: "faktura-forklart",
    title: "Faktura forklart: fra forfall til eFaktura",
    description: "Dette er de vanligste spørsmålene vi får om betaling og faktura.",
    category: "Faktura",
    readTime: "4 min",
    image: "/hf_20260414_080929_ebad72dd-3e45-43d1-88ad-5684c4eadd1b.png",
    publishedAt: "4. april 2026",
    sourceHref: "/kundeservice/faktura",
    sourceLabel: "Les mer om faktura",
    sections: [
      {
        title: "Vanlige avklaringer",
        paragraphs: [
          "Mange henvendelser handler om forfallsdato, delbetaling og hvordan eFaktura settes opp.",
          "En tydelig oversikt over avtaler og betalingshistorikk gjør prosessen enklere.",
        ],
      },
      {
        title: "Tips for mindre fakturastress",
        bullets: [
          "Aktiver eFaktura eller avtalegiro",
          "Sjekk prisendringer i tide",
          "Ta kontakt tidlig ved avvik",
        ],
        paragraphs: [
          "Tidlig dialog gir som regel raskere og bedre løsning enn å vente til etter forfall.",
        ],
      },
    ],
  },
  {
    slug: "ny-kunde-etablering",
    title: "Ny kunde? Dette skjer i etableringsfasen",
    description: "Fra graving til ferdig oppkobling: forventninger steg for steg.",
    category: "Etablering",
    readTime: "5 min",
    image: "/hf_20260414_083014_efa4170b-5f0c-4ec2-9bbd-87d9b6f7868f.png",
    publishedAt: "3. april 2026",
    sourceHref: "/kundeservice/graving",
    sourceLabel: "Les om graving og etablering",
    sections: [
      {
        title: "Fremdrift i praksis",
        paragraphs: [
          "Etablering består ofte av flere trinn: planlegging, eventuell graving, teknisk installasjon og verifisering.",
          "Tidslinjen varierer med lokale forhold, men tydelig kommunikasjon underveis gjør prosessen mer forutsigbar.",
        ],
      },
      {
        title: "Hva du kan forberede",
        bullets: [
          "Sjekk tilgang til teknisk rom eller innføringspunkt",
          "Avklar intern plassering av ruter på forhånd",
          "Ha kontaktinformasjon oppdatert for raske avklaringer",
        ],
        paragraphs: [
          "God forberedelse reduserer risiko for forsinkelser og gir raskere oppstart.",
        ],
      },
    ],
  },
  {
    slug: "flytting-nett-og-tv-klart-til-innflytting",
    title: "Flytting: slik får du nett og TV klart til innflytting",
    description: "Skal du flytte? Dette bør du gjøre før du overtar ny bolig, enten du er kunde hos oss i dag eller ikke.",
    category: "Flytting",
    readTime: "4 min",
    image: "/hf_20260414_081144_3709650a-67c6-46aa-80c5-b4adaa798ab2.png",
    publishedAt: "11. april 2026",
    sourceHref: "/kundeservice/abonnement",
    sourceLabel: "Gå til abonnement og flytting",
    sections: [
      {
        title: "Før du flytter",
        paragraphs: [
          "Hvis du vil ha nett og TV klart fra dag én, lønner det seg å melde fra så snart du vet flyttedato. Da blir det enklere å sjekke dekning, tilgjengelige tjenester og hva som må forberedes i boligen.",
          "Jo tidligere du tar kontakt, desto større er sjansen for at alt er klart til innflytting uten unødvendige avbrudd.",
        ],
      },
      {
        title: "Hvis du ikke er kunde i dag",
        paragraphs: [
          "Det første du bør gjøre er å sjekke om vi kan levere til den nye adressen. Det gir rask avklaring på hvilke produkter og hastigheter som er tilgjengelige.",
        ],
        bullets: [
          "Sjekk dekning på den nye adressen",
          "Avklar om du vil ha internett, TV eller begge deler",
          "Bestill i god tid før overtakelse",
        ],
      },
      {
        title: "Hvis du allerede er kunde",
        paragraphs: [
          "Er du allerede kunde, bør abonnementet flyttes til ny adresse i god tid. Da kan vi planlegge overføringen og unngå unødige hull i leveransen.",
          "Har du bindingstid eller utstyr som skal returneres eller flyttes, er det spesielt viktig å avklare dette tidlig.",
        ],
        bullets: [
          "Meld flytting så snart datoen er kjent",
          "Oppgi både gammel og ny adresse",
          "Avklar hva som skjer med eksisterende utstyr og abonnement",
        ],
      },
    ],
  },
  {
    slug: "fibertwist-ft1-oppsett",
    title: "Slik setter du opp FiberTwist FT1 hjemme",
    description: "Praktisk steg-for-steg oppsett av FiberTwist FT1 og hva lysene betyr.",
    category: "Utstyr",
    readTime: "6 min",
    image: "/hf_20260414_081939_0ed4fe06-00ca-4cc0-b6bd-59b896cfc43c.png",
    publishedAt: "11. april 2026",
    sourceHref: "https://kundeservice.altibox.no/hc/no/articles/12791341970449-FT1-fibertwist-hjemmesentral",
    sourceLabel: "Kilde: FT1 hjemmesentral",
    sections: [
      {
        title: "Før du begynner",
        paragraphs: [
          "FiberTwist FT1 er hjemmesentral med ruterfunksjon, men uten innebygget WiFi. Du trenger derfor eget WiFi-punkt koblet til FT1.",
          "Sjekk at fiber, strømadapter og nettverkskabel er klare før oppsett.",
        ],
      },
      {
        title: "Steg-for-steg oppsett",
        paragraphs: [
          "Start med fysisk tilkobling og vent et par minutter til enheten har startet helt opp.",
        ],
        bullets: [
          "Koble FiberTwist til fiberterminering i vegg",
          "Koble til strøm og vent på oppstart",
          "Koble WiFi-punkt i LAN-port på FT1",
          "Koble en enhet til WiFi-punktet og test internett",
        ],
      },
      {
        title: "Vanlige feilsituasjoner",
        paragraphs: [
          "Ved manglende nett: sjekk kabler, restart FT1 og WiFi-punkt, og se driftsmeldinger i ditt område.",
          "Hvis problemet vedvarer, noter lysstatus og tidspunkt. Da kan support hjelpe raskere.",
        ],
      },
    ],
  },
  {
    slug: "fibertwist-g2110c-g2120b-guide",
    title: "FiberTwist G2110C og G2120B: oppsett og bruk",
    description: "En enkel guide til installasjon, bruk og hva som er viktig å vite i hverdagen.",
    category: "Utstyr",
    readTime: "5 min",
    image: "/hf_20260414_081939_0ed4fe06-00ca-4cc0-b6bd-59b896cfc43c.png",
    publishedAt: "11. april 2026",
    sourceHref: "https://genexis.eu/product/fibertwist-g2110c/",
    sourceLabel: "Kilde: FiberTwist G2110C",
    sections: [
      {
        title: "Hva enhetene brukes til",
        paragraphs: [
          "FiberTwist G2110C er en 1-port GPON ONT med 1GE LAN, laget for stabil fibertilkobling inn i hjemmet.",
          "G2120B brukes i samme familie av oppsett hos oss. Fremgangsmåte i hjemmet er i praksis tilsvarende.",
        ],
      },
      {
        title: "Praktisk installasjon",
        paragraphs: [
          "FiberTwist-serien er laget for enkel installasjon med twist-mekanisme.",
        ],
        bullets: [
          "Monter enheten riktig i feste/brakett",
          "Koble strøm og LAN videre til ruter/WiFi-gateway",
          "Vent på stabil oppstart før du tester fart",
        ],
      },
      {
        title: "Tips for stabil drift",
        paragraphs: [
          "Unngå unødig flytting av fiberkabel og la enheten stå godt ventilert.",
          "Ved bytte av ruter: start med kabel direkte fra FiberTwist til ny gateway og test deretter trinnvis.",
        ],
      },
    ],
  },
  {
    slug: "aura-e650-oppsett",
    title: "Aura E650: komplett oppsett for best WiFi hjemme",
    description: "Slik setter du opp Aura E650 med riktig plassering, porter og mesh-utvidelse.",
    category: "Utstyr",
    readTime: "7 min",
    image: "/hf_20260414_080929_ebad72dd-3e45-43d1-88ad-5684c4eadd1b.png",
    publishedAt: "11. april 2026",
    sourceHref: "https://genexis.eu/product/aura-e650/",
    sourceLabel: "Kilde: Aura E650",
    sections: [
      {
        title: "Nøkkelpunkter for Aura E650",
        paragraphs: [
          "Aura E650 er en WiFi 6-gateway (AX3600) med 2.5GE WAN og 2.5GE LAN, laget for høy kapasitet og lav forsinkelse.",
          "Den fungerer godt som hovedenhet i hjemmet og kan utvides med EasyMesh-kompatible enheter.",
        ],
      },
      {
        title: "Slik setter du den opp",
        bullets: [
          "Koble WAN-port til internett/fiberenhet",
          "Plasser gateway synlig og sentralt i boligen",
          "Koble viktige enheter med kabel i LAN der det er mulig",
          "Legg til mesh-utvidelse ved svake soner",
        ],
        paragraphs: [
          "Sentral plassering gir merkbart bedre dekning enn skjult plassering i skap eller bak TV-benk.",
        ],
      },
      {
        title: "Bruk i hverdagen",
        paragraphs: [
          "Har du mange samtidige brukere, kan du prioritere arbeidsenheter med kabel eller nærmeste tilgangspunkt.",
          "Ved ustabilitet: restart gateway og eventuelle mesh-enheter, og test igjen etter 2-3 minutter.",
        ],
      },
    ],
  },
  {
    slug: "pulse-ex600-oppsett",
    title: "Pulse EX600: slik utvider du dekningen rom for rom",
    description: "Bruk Pulse EX600 som extender med kabel eller trådløst for bedre dekning i hele huset.",
    category: "Utstyr",
    readTime: "6 min",
    image: "/hf_20260414_080508_95bdace7-1742-476d-b3a1-e94f62cf907d.png",
    publishedAt: "11. april 2026",
    sourceHref: "https://genexis.eu/product/pulse-ex600/",
    sourceLabel: "Kilde: Pulse EX600",
    sections: [
      {
        title: "Hva Pulse EX600 gjør",
        paragraphs: [
          "Pulse EX600 er en kompakt WiFi 6-enhet som kan fungere som ruter eller extender, avhengig av hvordan den kobles.",
          "Den støtter EasyMesh for bedre lastbalansering og roaming i hjemmet.",
        ],
      },
      {
        title: "To måter å sette opp extender på",
        bullets: [
          "Kablet: koble Ethernet mellom hovedruter og Pulse EX600 for automatisk konfigurasjon",
          "Trådløst: trykk WPS på både hovedruter og Pulse EX600 for rask paring",
          "Plasser enheten mellom ruter og område med svak dekning",
        ],
        paragraphs: [
          "Kablet backhaul gir ofte høyere stabilitet og kapasitet enn trådløst backhaul.",
        ],
      },
      {
        title: "Når du bør flytte enheten",
        paragraphs: [
          "Hvis ytelsen fortsatt er lav, er plassering som regel årsaken. Flytt Pulse EX600 ett rom nærmere hovedruteren og test på nytt.",
        ],
      },
    ],
  },
];

export const featuredStorySlug = "flytting-nett-og-tv-klart-til-innflytting";

export const sideStorySlugs = [
  "tolk-driftsmeldinger-riktig",
  "hva-hastigheten-egentlig-betyr",
  "nett-tv-pa-hytta",
];

export const gridStorySlugs = [
  "stabilt-wifi-i-hele-huset",
  "flytting-nett-og-tv-klart-til-innflytting",
  "fibertwist-ft1-oppsett",
  "fibertwist-g2110c-g2120b-guide",
  "aura-e650-oppsett",
  "pulse-ex600-oppsett",
  "5-grep-for-tregt-nett",
  "wifi-i-andre-etasje",
  "tv-hakker-tre-ting",
  "faktura-forklart",
  "ny-kunde-etablering",
];

export function getGuideArticle(slug: string) {
  return guideArticles.find((article) => article.slug === slug);
}
