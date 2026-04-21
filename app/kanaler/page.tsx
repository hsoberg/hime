import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FilterableChannelGrid } from "@/components/kanaler/FilterableChannelGrid";
import { AddonChannelsExplorer } from "@/components/kanaler/AddonChannelsExplorer";
import { PremiumPackageCard } from "@/components/kanaler/PremiumPackageCard";

export const metadata: Metadata = {
  title: "Kanaloversikt — Alle kanaler hos Hime",
  description:
    "Full oversikt over alle TV-kanaler hos Hime. Grunnpakken inkluderer 26 kanaler. Legg til tilleggskanaler og premiumpakker etter behov. Leveres lokalt i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
  alternates: { canonical: "https://hime.no/kanaler" },
  openGraph: {
    title: "Kanaloversikt hos Hime",
    description:
      "Se grunnpakke, tilleggskanaler og premiumpakker hos Hime i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
    url: "https://hime.no/kanaler",
    siteName: "Hime",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanaloversikt hos Hime",
    description:
      "Se grunnpakke, tilleggskanaler og premiumpakker hos Hime i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
  },
};

const localAreas = ["Modum", "Sigdal", "Krødsherad", "Nakkerud", "Tyristrand"];

const baseChannels: Channel[] = [
  { name: "NRK1", desc: "Norske begivenheter, sport, nyheter og debatt" },
  { name: "NRK2", desc: "Aktualitet, kultur og kunnskap" },
  { name: "NRK3 / NRK Super", desc: "Underholdning og barneprogram" },
  { name: "TV 2 Direkte", desc: "Norges store kommersielle kanal" },
  { name: "TVNorge", desc: "Familie, serier og reality" },
  { name: "TV3", desc: "Film, serier og dokumentar" },
  { name: "FEM", desc: "Underholdning for moderne kvinner" },
  { name: "REX", desc: "Action og sport for menn" },
  { name: "VOX", desc: "Britiske serier og krim for voksne" },
  { name: "3+", desc: "Maskulin underholdning og UEFA-sport" },
  { name: "TV6", desc: "Livsstil for kvinner 35–49" },
  { name: "TV 2 Zebra", desc: "Fotball og maskulin underholdning" },
  { name: "TV 2 Livsstil", desc: "Livsstil og hverdagsmagasin" },
  { name: "TV 2 Sport 1", desc: "Champions League, La Liga og internasjonal fotball" },
  { name: "TV 2 Sport 2", desc: "Norsk hockey, håndball og sykling" },
  { name: "TV 2 Nyheter", desc: "Norges eneste kontinuerlige nyhetskanal" },
  { name: "VGTV", desc: "Nyheter og aktualitet" },
  { name: "TVModum", desc: "Lokal kanal fra Modum" },
  { name: "Animal Planet", desc: "Dyredokumentarer fra hele verden" },
  { name: "BBC News", desc: "Globale nyheter døgnet rundt" },
  { name: "Discovery Channel", desc: "Natur, historie, vitenskap og teknologi" },
  { name: "Nickelodeon", desc: "Barneprogram for 2–14 år" },
  { name: "Investigation Discovery", desc: "Faktabasert krim og etterforskning" },
  { name: "TLC", desc: "Underholdning for kvinner 25–39" },
  { name: "Eurosport 1", desc: "Tennis, sykling og golfturnering" },
  { name: "Eurosport Norge", desc: "Internasjonale sportsbegivenheter" },
];

type Channel = { name: string; desc: string };

const channelLogos: Record<string, string> = {
  "NRK1": "https://hime.no/wp-content/uploads/2025/02/NRK1.png",
  "NRK2": "https://hime.no/wp-content/uploads/2025/02/NRK2.png",
  "NRK3 / NRK Super": "https://hime.no/wp-content/uploads/2025/02/NRK3NRKSUper.png",
  "TV 2 Direkte": "https://hime.no/wp-content/uploads/2023/05/TV2-Direkte.png",
  "TVNorge": "https://hime.no/wp-content/uploads/2024/02/TVNorge.png",
  "TV3": "https://hime.no/wp-content/uploads/2024/11/TV3_Norway_logo_2016.svg",
  "FEM": "https://hime.no/wp-content/uploads/2024/02/FEM.png",
  "REX": "https://hime.no/wp-content/uploads/2024/03/REX.png",
  "VOX": "https://hime.no/wp-content/uploads/2024/02/Vox.png",
  "3+": "https://hime.no/wp-content/uploads/2024/11/TV3_Norway.svg",
  "TV6": "https://hime.no/wp-content/uploads/2023/05/TV6.png",
  "TV 2 Zebra": "https://hime.no/wp-content/uploads/2023/05/TV2-Zebra.png",
  "TV 2 Livsstil": "https://hime.no/wp-content/uploads/2023/05/TV2-Livsstil.png",
  "TV 2 Sport 1": "https://hime.no/wp-content/uploads/2023/05/TV2-Sport1.png",
  "TV 2 Sport 2": "https://hime.no/wp-content/uploads/2023/05/TV2-Sport-2.png",
  "TV 2 Nyheter": "https://hime.no/wp-content/uploads/2023/05/TV2-Nyheter.png",
  "VGTV": "https://hime.no/wp-content/uploads/2023/05/VGTV.png",
  "TVModum": "https://hime.no/wp-content/uploads/2023/05/TVModum.png",
  "Animal Planet": "https://hime.no/wp-content/uploads/2024/02/Animal-planet.png",
  "BBC News": "https://hime.no/wp-content/uploads/2023/05/BBC-News.png",
  "Discovery Channel": "https://hime.no/wp-content/uploads/2024/02/Discovery.png",
  "Nickelodeon": "https://hime.no/wp-content/uploads/2023/05/nickelodeon.png",
  "Investigation Discovery": "https://hime.no/wp-content/uploads/2024/02/ID.png",
  "TLC": "https://hime.no/wp-content/uploads/2024/02/TLC.png",
  "Eurosport 1": "https://hime.no/wp-content/uploads/2023/05/Eurosport1.png",
  "Eurosport Norge": "https://hime.no/wp-content/uploads/2023/05/EurosportN.png",
  "SVT1": "https://hime.no/wp-content/uploads/2023/05/svt1.png",
  "SVT2": "https://hime.no/wp-content/uploads/2023/05/svt2.png",
  "TV4": "https://hime.no/wp-content/uploads/2023/05/kanal-4.png",
  "TV2 Danmark": "https://hime.no/wp-content/uploads/2023/05/tv2-danmark.png",
  "DR1": "https://hime.no/wp-content/uploads/2023/05/DR1.png",
  "DR2": "https://hime.no/wp-content/uploads/2023/05/DR2.png",
  "YLE1": "https://hime.no/wp-content/uploads/2023/05/yle-TV1.png",
  "BBC Nordic": "https://hime.no/wp-content/uploads/2023/05/BBC-Nordic.png",
  "Kunskapskanalen": "https://hime.no/wp-content/uploads/2023/05/kunnskapskanalen.png",
  "National Geographic": "https://hime.no/wp-content/uploads/2023/05/National-Geographic.png",
  "Nat Geo Wild": "https://hime.no/wp-content/uploads/2023/05/National-Geographic-Wild.png",
  "Viasat Explore": "https://hime.no/wp-content/uploads/2023/05/viasat-explore.png",
  "Viasat History": "https://hime.no/wp-content/uploads/2023/05/viasat-history.png",
  "Viasat Nature": "https://hime.no/wp-content/uploads/2023/05/Viasat-nature.png",
  "Discovery Science": "https://hime.no/wp-content/uploads/2023/05/discovery-science.png",
  "Travel Channel": "https://hime.no/wp-content/uploads/2023/05/travel-channel.png",
  "MTV": "https://hime.no/wp-content/uploads/2023/05/MTV.png",
  "Mezzo": "https://hime.no/wp-content/uploads/2023/05/mezzo.png",
  "SVT Barnkanalen": "https://hime.no/wp-content/uploads/2023/05/barnekanalen-svt24.png",
  "DR Ramasjang": "https://hime.no/wp-content/uploads/2023/05/DR-Rama-sjang.png",
  "Nick Jr.": "https://hime.no/wp-content/uploads/2023/05/nickjr.png",
  "Cartoon Network": "https://hime.no/wp-content/uploads/2023/05/cartoon-network.png",
  "CNN International": "https://hime.no/wp-content/uploads/2023/05/cnn.png",
  "CNBC": "https://hime.no/wp-content/uploads/2023/05/cnbc.png",
  "Bloomberg": "https://hime.no/wp-content/uploads/2023/05/Bloomberg.png",
  "Sky News": "https://hime.no/wp-content/uploads/2023/05/SkyNews.png",
  "Al Jazeera": "https://hime.no/wp-content/uploads/2023/05/aljazeera.png",
  "Deutsche Welle": "https://hime.no/wp-content/uploads/2023/05/deutche-welle.png",
  "France 24": "https://hime.no/wp-content/uploads/2023/05/france-24.png",
  "Das Erste": "https://hime.no/wp-content/uploads/2023/05/das-erste.png",
  "3sat": "https://hime.no/wp-content/uploads/2023/05/3sat-1.png",
  "RTL": "https://hime.no/wp-content/uploads/2023/05/RTL.png",
  "TVE International": "https://hime.no/wp-content/uploads/2023/05/Tve.png",
  "TV5 Monde": "https://hime.no/wp-content/uploads/2023/05/tv5monde.png",
  "TV Polonia": "https://hime.no/wp-content/uploads/2023/05/TVP-Polonia.png",
  "TV Visjon Norge": "https://hime.no/wp-content/uploads/2023/05/Visjon-Norge.png",
  "KANAL 10": "https://hime.no/wp-content/uploads/2023/05/kanal10norge.png",
  "Bedehuskanalen": "https://hime.no/wp-content/uploads/2023/05/bedehuskanalen.png",
};

const packageLogos: Record<string, string> = {
  "V Premium": "https://hime.no/wp-content/uploads/2024/01/V-Premium-1280x720-1.jpg",
  "TV 2 Sport Premium": "https://hime.no/wp-content/uploads/2024/01/TV2-Sport-Premium-1280x720-1.jpg",
  "V Sport": "https://hime.no/wp-content/uploads/2024/01/V-Sport-1280x720-1.jpg",
  "V Series, Film & Sport": "https://hime.no/wp-content/uploads/2024/01/V-Sport-Series-film-1280x720-1.jpg",
  "V Series & Film": "https://hime.no/wp-content/uploads/2024/01/V-Series-film-1280x720-1.jpg",
  "V Golf": "https://hime.no/wp-content/uploads/2024/01/V-Sport-Golf-1280x720-1.jpg",
  "C More": "https://hime.no/wp-content/uploads/2024/01/C-more-1280x720-1.jpg",
  "Rikstoto Direkte": "https://hime.no/wp-content/uploads/2024/01/750x500-Rikstoto-april-2023-v1.jpg",
};

const addonGroups: { heading: string; channels: Channel[] }[] = [
  {
    heading: "Nordiske kanaler",
    channels: [
      { name: "SVT1", desc: "Svensk folkelig underholdning og nyheter" },
      { name: "SVT2", desc: "Kultur og samfunn fra Sverige" },
      { name: "TV4", desc: "Svensk familie-TV" },
      { name: "TV2 Danmark", desc: "Dansk familiunderholdning" },
      { name: "DR1", desc: "Kultur og bredt dansk programtilbud" },
      { name: "DR2", desc: "Samfunn, musikk og satire" },
      { name: "YLE1", desc: "Finsk dokumentar, nyheter og utdanning" },
    ],
  },
  {
    heading: "Dokumentar, natur og reise",
    channels: [
      { name: "BBC Nordic", desc: "Top Gear, natur og vitenskapsprogram" },
      { name: "Kunskapskanalen", desc: "Svenske utdanningsdokumentarer" },
      { name: "National Geographic", desc: "Vitenskap og utforskning" },
      { name: "Nat Geo Wild", desc: "Dyr og natur daglig" },
      { name: "Viasat Explore", desc: "Ekspedisjoner og eventyr" },
      { name: "Viasat History", desc: "Historiske dokumentarer" },
      { name: "Viasat Nature", desc: "Natur og dyreliv daglig" },
      { name: "Discovery Science", desc: "Teknologi og ingeniørkunst" },
      { name: "Travel Channel", desc: "Reiseopplevelser fra hele verden" },
    ],
  },
  {
    heading: "Musikk",
    channels: [
      { name: "MTV", desc: "Musikk og underholdning for unge" },
      { name: "MTV Hits", desc: "Hits og popmusikk" },
      { name: "MTV 80s", desc: "80-tallsklassikere" },
      { name: "MTV 90s", desc: "90-tallsnostalgi" },
      { name: "MTV 00s", desc: "2000-tallshits" },
      { name: "Club MTV", desc: "Elektronisk musikk og club-hits" },
      { name: "Mezzo", desc: "Klassisk musikk fra konserthus verden over" },
    ],
  },
  {
    heading: "Barn og familie",
    channels: [
      { name: "SVT Barnkanalen", desc: "Svensk barneprogram" },
      { name: "DR Ramasjang", desc: "Danskt barneprogram med læring" },
      { name: "Nick Jr.", desc: "Førskoleprogrammer" },
      { name: "Cartoon Network", desc: "Animasjon for alle aldre" },
    ],
  },
  {
    heading: "Internasjonale nyheter",
    channels: [
      { name: "CNN International", desc: "Globale nyheter 24/7" },
      { name: "CNBC", desc: "Økonomi og næringsliv" },
      { name: "Bloomberg", desc: "Internasjonale finansnyheter" },
      { name: "Sky News", desc: "Britiske nyheter 24 timer" },
      { name: "Al Jazeera", desc: "Nyheter fra Midtøsten og verden" },
      { name: "Deutsche Welle", desc: "Nyheter med tysk perspektiv" },
      { name: "France 24", desc: "Internasjonale nyheter på engelsk" },
    ],
  },
  {
    heading: "Europeiske kanaler",
    channels: [
      { name: "Das Erste", desc: "Tysk familie-TV, nyheter og sport" },
      { name: "3sat", desc: "Kultur, opera og teater" },
      { name: "RTL", desc: "Nyheter, serier og komedie" },
      { name: "TVE International", desc: "Spansk språk og kultur" },
      { name: "TV5 Monde", desc: "Fransk livsstil, mat og film" },
      { name: "TV Polonia", desc: "Polsk underholdning og dokumentar" },
    ],
  },
  {
    heading: "Livsstil og tro",
    channels: [
      { name: "TV Visjon Norge", desc: "Kristent program og gospel" },
      { name: "KANAL 10", desc: "Kristent innhold fra Skandinavia" },
      { name: "Bedehuskanalen", desc: "Evangelisk kristenprogrammering" },
    ],
  },
];

const premiumPackages = [
  {
    name: "V Premium",
    price: "649",
    tag: "Sport + underholdning",
    channels: ["V Sport 1", "V Sport 2", "V Sport 3", "V Sport+", "V Series", "V Premiere", "V Hits", "V Action", "V Family"],
    highlight: true,
  },
  {
    name: "TV 2 Sport Premium",
    price: "449",
    tag: "Fotball",
    channels: ["Champions League", "La Liga", "VM-kval.", "EM-kval.", "Nations League"],
    highlight: false,
  },
  {
    name: "V Sport",
    price: "349",
    tag: "Internasjonal sport",
    channels: ["Bundesliga", "Europa League", "F1", "MotoGP", "NASCAR", "NFL", "NHL"],
    highlight: false,
  },
  {
    name: "V Series, Film & Sport",
    price: "399",
    tag: "Kombinasjon",
    channels: ["V Sport 1", "V Sport 2", "V Sport 3", "V Sport+", "V Series", "V Films"],
    highlight: false,
  },
  {
    name: "V Series & Film",
    price: "229",
    tag: "Film og serier",
    channels: ["Hollywood-filmer", "Nordiske filmer", "Familiefilmer", "Klassikere"],
    highlight: false,
  },
  {
    name: "V Golf",
    price: "229",
    tag: "Golf",
    channels: ["European Tour", "Ryder Cup", "LPGA Tour", "PGA Championship", "US Open", "The Open"],
    highlight: false,
  },
  {
    name: "C More",
    price: "99",
    tag: "Film og serier",
    channels: ["Filmer", "Serier", "Dokumentar", "Familieinnhold"],
    highlight: false,
  },
  {
    name: "Rikstoto Direkte",
    price: "199",
    tag: "Hestesport",
    channels: ["Direktesendinger", "Tips og intervjuer", "Daglige løp"],
    highlight: false,
  },
];

const channelFaqs = [
  {
    question: "Hvor leverer Hime TV og kanalpakker?",
    answer:
      "Vi leverer TV og kanalpakker lokalt i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
  },
  {
    question: "Hvor mange kanaler er i grunnpakken?",
    answer:
      "I kanaloversikten er grunnpakken oppgitt med 26 kanaler inkludert.",
  },
  {
    question: "Hvilke tilleggskanaler kan jeg velge?",
    answer:
      "Du kan velge tilleggskanaler innen nordiske kanaler, dokumentar/natur/reise, musikk, barn og familie, internasjonale nyheter, europeiske kanaler og livsstil/tro.",
  },
  {
    question: "Hva koster tilleggskanaler?",
    answer:
      "Tilleggskanaler er oppgitt med trinn på +5 kanaler for 50 kr/mnd, +10 kanaler for 100 kr/mnd og +alle kanaler for 200 kr/mnd.",
  },
  {
    question: "Hvordan bestiller jeg premiumpakker?",
    answer:
      "Premiumpakker bestilles via Min side eller ved å kontakte kundeservice på 32 78 46 40.",
  },
];

const channelFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: channelFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const channelServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hime kanaloversikt og kanalpakker",
  serviceType: "TV-kanaler, tilleggskanaler og premiumpakker",
  areaServed: localAreas,
  provider: {
    "@type": "Organization",
    name: "Hime",
    url: "https://hime.no",
    telephone: "+4732784640",
    email: "post@mktv.no",
  },
  offers: {
    "@type": "Offer",
    priceCurrency: "NOK",
    description: "Kanalpakker og tilleggskanaler fra lokal leverandør",
    url: "https://hime.no/kanaler",
  },
};

const channelBreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hjem",
      item: "https://hime.no/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Kanaler",
      item: "https://hime.no/kanaler",
    },
  ],
};

export default function KanalerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(channelFaqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(channelServiceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(channelBreadcrumbSchema) }} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-cover bg-center py-16 md:py-24 bg-[url('/hf_20260414_081657_d455bafa-1b0f-4960-8371-1f8b7f7d71a4.png')]">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-3">
            Kanaler
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
            Full kanaloversikt
          </h1>
          <p className="mt-4 text-lg text-slate-100 max-w-2xl">
            Her finner du alle kanaler Hime tilbyr — grunnpakke, tilleggskanaler og premiumpakker.
            Sett sammen din egen pakke med det innholdet du elsker.
          </p>
          {/* Jump links */}
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              { href: "#grunnpakke", label: "Grunnpakke (26)" },
              { href: "#tilleggskanaler", label: "Tilleggskanaler (45+)" },
              { href: "#premium", label: "Premiumpakker (8)" },
            ].map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-sm font-semibold text-white hover:bg-white hover:text-dark transition-all"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Base channels */}
      <section id="grunnpakke" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                Inkludert i alle pakker
              </p>
              <h2 className="text-3xl font-bold text-dark">Grunnpakken</h2>
              <p className="mt-2 text-dark-muted">26 kanaler — inkludert i Himepakken fra 949 kr/mnd.</p>
            </div>
            <Link
              href="/tv"
              className="shrink-0 px-5 py-2.5 rounded-xl bg-primary text-dark text-sm font-semibold hover:bg-primary-dark transition-colors"
            >
              Se Himepakken →
            </Link>
          </div>

          <FilterableChannelGrid channels={baseChannels} logos={channelLogos} />
        </div>
      </section>

      {/* Add-on channels */}
      <section id="tilleggskanaler" className="py-20 bg-surface-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
                Valgfritt tillegg
              </p>
              <h2 className="text-3xl font-bold text-dark">Tilleggskanaler</h2>
              <p className="mt-2 text-dark-muted">Legg til 5, 10 eller alle tilleggskanaler på toppen av grunnpakken.</p>
            </div>
          </div>

          {/* Pricing pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {[
              { label: "+5 kanaler", price: "50 kr/mnd" },
              { label: "+10 kanaler", price: "100 kr/mnd" },
              { label: "+Alle kanaler", price: "200 kr/mnd" },
            ].map((t) => (
              <div
                key={t.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E7EB]"
              >
                <span className="text-sm font-semibold text-dark">{t.label}</span>
                <span className="text-sm text-primary font-medium">{t.price}</span>
              </div>
            ))}
          </div>

          <AddonChannelsExplorer groups={addonGroups} logos={channelLogos} />
        </div>
      </section>

      {/* Premium packages */}
      <section id="premium" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">
              Eksklusivt innhold
            </p>
            <h2 className="text-3xl font-bold text-dark">Premiumpakker</h2>
            <p className="mt-2 text-dark-muted">
              Sport, film og serier utover grunnpakken. Bestill via{" "}
              <a href="https://minside.mktv.no/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                Min side
              </a>{" "}
              eller ring <a href="tel:+4732784640" className="text-primary hover:underline font-medium">32 78 46 40</a>.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {premiumPackages.map((pkg) => (
              <PremiumPackageCard
                key={pkg.name}
                name={pkg.name}
                price={pkg.price}
                tag={pkg.tag}
                channels={pkg.channels}
                highlight={pkg.highlight}
                logoSrc={packageLogos[pkg.name]}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Klar til å sette opp din pakke?
          </h2>
          <p className="mt-3 text-[#9BBDC5]">
            Ring oss eller bestill direkte — vi hjelper deg velge riktig kombinasjon.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tv"
              className="px-8 py-3 rounded-xl bg-primary text-dark font-semibold hover:bg-primary-dark transition-colors"
            >
              Se Himepakken
            </Link>
            <a
              href="tel:+4732784640"
              className="px-8 py-3 rounded-xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Ring 32 78 46 40
            </a>
          </div>
        </div>
      </section>

      {/* Local FAQ for AEO */}
      <section className="py-16 bg-surface-2">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-2">Ofte stilte spørsmål</p>
            <h2 className="text-3xl font-bold text-dark">Kanalvalg fra lokal leverandør</h2>
            <p className="mt-3 text-dark-muted">
              Svar for kunder i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {channelFaqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-light bg-white p-5">
                <h3 className="text-base font-bold text-dark">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}


