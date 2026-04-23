export type SupportLink = {
  label: string;
  href: string;
};

export type SupportKnowledgeItem = {
  id: string;
  title: string;
  answer: string;
  keywords: string[];
  links?: SupportLink[];
};

const STOP_WORDS = new Set([
  "jeg",
  "du",
  "vi",
  "dere",
  "man",
  "det",
  "den",
  "de",
  "og",
  "med",
  "for",
  "på",
  "til",
  "av",
  "er",
  "om",
  "kan",
  "hva",
  "hvordan",
  "hvor",
  "når",
  "hvilke",
  "hvilken",
  "hvem",
  "min",
  "mitt",
  "mine",
  "vår",
  "vårt",
  "våre",
  "din",
  "ditt",
  "dine",
  "har",
  "får",
  "skal",
  "som",
  "et",
  "en",
  "i",
  "at",
  "da",
  "så",
  "om",
  "men",
  "eller",
]);

export const supportKnowledge: SupportKnowledgeItem[] = [
  {
    id: "drift",
    title: "Driftsmeldinger",
    answer:
      "Du kan sjekke kjente feil og vedlikehold i ditt område på driftsmeldinger-siden.",
    keywords: ["drift", "driftsmelding", "nede", "feil", "utfall", "status"],
    links: [{ label: "Se driftsmeldinger", href: "/driftsmeldinger" }],
  },
  {
    id: "flytte",
    title: "Jeg skal flytte",
    answer:
      "Ved flytting anbefaler vi at du melder fra tidlig via flytteskjemaet vårt, slik at vi kan klargjøre internett og TV på ny adresse i god tid.",
    keywords: ["flytte", "flytting", "ny adresse", "innflytting", "utflytting", "melde flytting"],
    links: [
      { label: "Meld flytting her", href: "/flytte" },
      { label: "Flytting og abonnement", href: "/kundeservice/abonnement" }
    ],
  },
  {
    id: "regional-prising",
    title: "Prisforskjell mellom områder",
    answer:
      "Forskjell i pris skyldes ofte infrastrukturen. I områder hvor vi leier nett av andre leverandører må vi betale nettleie, som gir en høyere månedspris. Der vi eier nettet selv, er prisen lavere. Dette forklarer hvorfor andre kan ha samme tjeneste til en lavere pris.",
    keywords: ["billigere", "dyrere", "prisforskjell", "samme tjeneste", "pris", "infrastruktur", "nettleie", "leie nett", "eie nett"],
    links: [{ label: "Om abonnement og pris", href: "/kundeservice/abonnement" }],
  },
  {
    id: "sperret-abonnement",
    title: "Sperret eller stengt abonnement",
    answer:
      "Hvis en faktura ikke er betalt innen fristen, blir abonnementet normalt sperret. Ved gjenåpning tilkommer et gebyr på 600 kr. For raskere gjenåpning kan du sende dokumentasjon på betaling til post@mktv.no.",
    keywords: ["sperret", "stengt", "ikke betalt", "gebyr", "gjenåpning", "600", "penger", "kvittering", "dokumentasjon", "apne igjen"],
    links: [{ label: "Hjelp med abonnement", href: "/kundeservice/abonnement" }],
  },
  {
    id: "avtalegiro-setup",
    title: "Oppsett og feil med AvtaleGiro",
    answer:
      "AvtaleGiro opprettes i din nettbank. Det tar ofte 4-8 uker før avtalen blir aktiv. Inntil da må du betale fakturaen manuelt. Merk at kun AvtaleGiro (uten eFaktura) fortsatt kan medføre papirfaktura-gebyr.",
    keywords: ["avtalegiro", "fungerer ikke", "opprette", "bank", "nettbank", "tid", "4 uker", "8 uker", "papirfaktura", "gebyr"],
    links: [{ label: "Faktura og betaling", href: "/kundeservice/faktura" }],
  },
  {
    id: "vipps-faktura",
    title: "Faktura i Vipps",
    answer:
      "Du kan få fakturaene dine direkte i Vipps ifølge eFaktura-avtalen din. Du må i tillegg skru på visning av regninger inne i selve Vipps-appen.",
    keywords: ["vipps", "app", "betaling", "regning", "aktivere", "mobil", "enkel betaling"],
    links: [{ label: "Faktura og betaling", href: "/kundeservice/faktura" }],
  },
  {
    id: "himepakken-fordeling",
    title: "Prisfordeling i Himepakken",
    answer:
      "Når du har Himepakken (Internett + TV), er prisen på fakturaen spesifisert med 60% for internett-delen og 40% for TV-delen. Dette er en fast fordeling av rabatten du får som totalkunde.",
    keywords: ["60%", "40%", "fordeling", "pris", "himepakken", "rabatt", "pakke", "hva betaler jeg for"],
    links: [{ label: "Faktura og betaling", href: "/kundeservice/faktura" }],
  },
  {
    id: "etablering",
    title: "Kostnad for etablering",
    answer:
      "Etableringskostnaden varierer basert på utbyggingsprosjekt, avstand og om du bestiller i en kampanjeperiode. Der vi eier infrastrukturen selv, er det ofte ingen etableringskostnad.",
    keywords: ["etablering", "kostnad", "pris", "salgsperiode", "utbygging", "koble til", "oppstart"],
    links: [{ label: "Abonnement og flytting", href: "/kundeservice/abonnement" }],
  },
  {
    id: "faktura",
    title: "Faktura og betaling",
    answer:
      "Vi sender ut faktura månedlig med forfall rundt den 20. Du kan unngå gebyr på 69 kr ved å velge eFaktura, Vipps eller e-postfaktura. Full oversikt finnes på Min side.",
    keywords: ["faktura", "betaling", "forfall", "pris", "trekk", "e-faktura", "kopi", "fakturakopi", "oversikt", "min side", "gebyr", "spare penger"],
    links: [
      { label: "Hjelp med faktura", href: "/kundeservice/faktura" },
      { label: "Min side", href: "https://minside.mktv.no/" },
    ],
  },
  {
    id: "eierskifte",
    title: "Eierskifte og utstyr",
    answer:
      "Ved eierskifte må ny eier kontakte oss for ny avtale. Himeboksen/dekoderen må returneres av gammel eier, mens ny eier bestiller sin egen. Modemet kan derimot stå igjen til ny eier.",
    keywords: ["eierskifte", "overta", "selge bolig", "ny eier", "himeboks", "dekoder", "modem", "retur"],
    links: [{ label: "Abonnement og flytting", href: "/kundeservice/abonnement" }],
  },
  {
    id: "himepakken-kanaler",
    title: "Kanaler i Himepakken",
    answer:
      "Grunnpakken i Himepakken inkluderer nå 23 utvalgte kanaler med profesjonelle logoer og høy kvalitet. Eksempler er NRK1-3, TV 2 Direkte, TVNorge, TV3, TV 2 Sport 1/2 (norsk sport), TV 2 Nyheter, Eurosport 1/Norge, BBC News, Discovery Channel og vår egen TVModum. For full oppdatert liste med logoer, se oversikten vår.",
    keywords: [
      "himepakken",
      "kanaler i himepakken",
      "hvilke kanaler",
      "hvilke kanaler er med",
      "kanaloversikt",
      "grunnpakken",
      "tv pakke",
      "23 kanaler",
    ],
    links: [
      { label: "Se full kanaloversikt", href: "/produkter-og-priser#grunnpakke" },
      { label: "Se TV og Himepakken", href: "/produkter-og-priser" },
    ],
  },
  {
    id: "himepakken-innhold",
    title: "Hva inngår i Himepakken",
    answer:
      "Himepakken inkluderer Hime 500 internett, grunnpakke-TV med 23 kanaler, Himeboks/dekoder, Hime-appen og 7 dagers arkiv. Som lokal kunde får du alt utstyr ferdig oppsatt og klart til bruk.",
    keywords: [
      "hva inngår i himepakken",
      "hva er med i himepakken",
      "inngår",
      "inkludert",
      "himepakken innhold",
      "himepakke",
    ],
    links: [
      { label: "Se Himepakken og priser", href: "/produkter-og-priser" },
      { label: "Se kanaloversikt", href: "/produkter-og-priser#grunnpakke" },
    ],
  },
  {
    id: "tilleggskanaler",
    title: "Tilleggskanaler",
    answer:
      "Du kan velge over 45 tilleggskanaler innen sport, nyheter, film og barn. Prisene starter fra kun 50 kr/mnd for 5 valgfrie kanaler.",
    keywords: [
      "tilleggskanaler",
      "tilleggskanal",
      "tilleggspakke",
      "ekstra kanaler",
      "kanalpakker",
    ],
    links: [
      { label: "Se tilleggskanaler", href: "/produkter-og-priser#tilleggskanaler" },
    ],
  },
  {
    id: "sportspakker-pris",
    title: "Sportspakker og pris",
    answer:
      "Vi tilbyr blant annet V Premium (med Premier League), TV 2 Sport Premium (med Champions League) og V Sport. Alle pakkene kan enkelt legges til på Min side.",
    keywords: [
      "sportspakker",
      "sportspakke",
      "v premium",
      "tv2 sport premium",
      "pris sport",
      "hva koster sportspakke",
    ],
    links: [
      { label: "Se premiumpakker og priser", href: "/produkter-og-priser#premium" },
    ],
  },
  {
    id: "wifi",
    title: "WiFi og dekning",
    answer:
      "Hvis du opplever tregt eller ustabilt nett, start med WiFi-guiden for dekning, plassering og tips.",
    keywords: ["wifi", "trådløs", "tradlos", "dekning", "treg", "ustabil", "dårlig", "problem", "hjemmekontor", "kontor", "ruter", "vegg", "signaler"],
    links: [{ label: "WiFi-hjelp", href: "/wifi" }],
  },
  {
    id: "internett",
    title: "Internett fungerer ikke",
    answer:
      "Ved problemer med internett kan du finne feilrettingstrinn og ofte stilte spørsmål på internett-hjelpesiden.",
    keywords: ["internett", "nett", "offline", "router", "modem", "ingen forbindelse"],
    links: [{ label: "Hjelp med internett", href: "/kundeservice/internett" }],
  },
  {
    id: "tv",
    title: "TV og kanaler",
    answer:
      "For TV-spørsmål som kanalinnhold eller manglende kanaler finner du hjelp på TV-sidene. Husk at vi nå har oppdatert grunnpakken med 23 kvalitetskanaler med nye logoer.",
    keywords: ["tv", "kanal", "kanaler", "svart skjerm", "dekoder", "lyd"],
    links: [
      { label: "Hjelp med TV", href: "/kundeservice/tv" },
      { label: "Se kanaloversikt", href: "/produkter-og-priser#grunnpakke" },
    ],
  },
  {
    id: "app",
    title: "App og innlogging",
    answer:
      "For problemer med app, innlogging eller avspilling, bruk app-hjelpesiden for aktuelle løsninger.",
    keywords: ["app", "innlogging", "bruker", "passord", "streaming", "avspilling"],
    links: [{ label: "Hjelp med app", href: "/kundeservice/app" }],
  },
  {
    id: "minside",
    title: "Min side",
    answer:
      "På Min side kan du administrere kundeforhold, tjenester og informasjon selv.",
    keywords: ["min side", "kundeportal", "innlogging", "abonnement", "kunde"],
    links: [{ label: "Gå til Min side", href: "https://minside.mktv.no/" }],
  },
  {
    id: "speedtest",
    title: "Slik tester du hastigheten",
    answer:
      "For en korrekt hastighetsmåling bør du bruke kabel. Trådløs måling (WiFi) er ofte lavere pga. vegger og forstyrrelser. Slå av VPN og lukk alle programmer før du tester på nettfart.no.",
    keywords: ["speedtest", "hastighetstest", "tregt nett", "fart", "måle hastighet", "nettfart", "test"],
    links: [
      { label: "Les guide for hastighetsmåling", href: "/kundeservice/internett/speedtest" },
      { label: "Klikk her for å starte test", href: "https://nettfart.no" }
    ],
  },
  {
    id: "kontakt",
    title: "Kontakt kundeservice",
    answer:
      "Telefon 32 78 46 40 eller e-post post@mktv.no. Åpningstider: man-fre 08:00-19:00 og lørdag 10:00-14:00.",
    keywords: ["kontakt", "kundeservice", "telefon", "ringe", "epost", "åpningstider"],
    links: [{ label: "Snakk med oss", href: "/kontakt-oss" }],
  },
  {
    id: "populaere-tjenester",
    title: "Mest populære produkter og anbefalinger",
    answer:
      "Vårt mest populære og anbefalte produkt er Himepakken. Den kombinerer lynraskt internett (500 Mbps) med en komplett TV-pakke, Himeboks og app-tilgang. Dette gir deg alt du trenger i én samlet pakke til en gunstig pris.",
    keywords: ["populær", "anbefaling", "anbefaler", "best", "himepakken", "mestepart", "velge", "tips", "tjenester", "produkter", "tilbud", "hva har dere"],
    links: [{ label: "Se Himepakken og priser", href: "/produkter-og-priser" }],
  },
  {
    id: "valg-av-hastighet",
    title: "Hvilken hastighet passer for meg?",
    answer:
      "Vi anbefaler hastighet basert på bruk: 100 Mbps passer for 1-2 personer. 250 Mbps er ideelt for familier. 500 Mbps (inkludert i Himepakken) er perfekt for hjem med gaming. 1000 Mbps er for deg som vil ha maksimal kapasitet.",
    keywords: ["hastighet", "fart", "best for meg", "passer for meg", "hvilken skal jeg velge", "fps", "gaming", "streaming"],
    links: [{ label: "Se hastigheter og priser", href: "/produkter-og-priser" }],
  },
  {
    id: "lokal-fordel",
    title: "Hvorfor velge Hime?",
    answer:
      "Som din lokale leverandør siden 1996 bor vi der du bor. Det betyr at vi er naboen din, og du får personlig service fra folk som kjenner området. Vi eier ofte infrastrukturen selv, som gir deg raskere hjelp og personlig oppfølging.",
    keywords: ["hvorfor velge dere", "nabo", "lokal", "fordel", "hvem er dere", "1996", "erfaring", "lokalkunnskap"],
    links: [{ label: "Les mer om oss", href: "/produkter-og-priser" }],
  },
];

export function getAllKnowledgeAsText(): string {
  return supportKnowledge
    .map((item, index) => {
      const links = (item.links ?? [])
        .map((link) => `- ${link.label}: ${link.href}`)
        .join("\n");

      return [
        `Kilde ${index + 1}: ${item.title}`,
        `Informasjon: ${item.answer}`,
        links ? `Lenker:\n${links}` : "Lenker: Ingen",
      ].join("\n");
    })
    .join("\n\n---\n\n");
}