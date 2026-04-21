import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CoverageCheck } from "@/components/CoverageCheck";

export const metadata: Metadata = {
  title: "Produkter og priser — Internett og TV",
  description:
    "Her finner du oversikt over våre internettpakker og TV-løsninger. Himepakken fra 949 kr/mnd. HIME 100, 250, 500 og 1000 Mbps.",
  alternates: { canonical: "https://hime.no/produkter-og-priser" },
};

const himePackage = {
  name: "Himepakken",
  price: "949",
  description: "Alt du trenger i én pakke: grunnpakke-TV med 26 kanaler, Hime 500 internett, Himeboks-dekoder og tilgang til Hime-appen med 7 dagers programarkiv.",
  features: [
    "23 kanaler inkludert i grunnpakken",
    "Hime 500 (500 Mbps) internett inkludert",
    "Himeboks-dekoder med NRK-app og YouTube",
    "Hime-appen — se TV på mobil og nettbrett",
    "7 dagers programarkiv",
    "Valgfrie tilleggskanaler og premiumpakker",
  ],
};

const internetPackages = [
  {
    name: "HIME 100",
    speed: "100 Mbps",
    description: "Passer for vanlig surfing, strømming og mindre husstander.",
    features: ["1-2 personer", "Strømming i HD", "Sosiale medier"],
    price: "599",
  },
  {
    name: "HIME 250",
    speed: "250 Mbps",
    description: "Et godt valg for familier som strømmer mye og bruker flere enheter samtidig.",
    features: ["Familier", "Flere enheter", "4K-strømming"],
    price: "699",
  },
  {
    name: "HIME 500",
    speed: "500 Mbps",
    description: "For hjem med høyt forbruk, gaming, hjemmekontor og mange aktive enheter.",
    features: ["Gaming", "Hjemmekontor", "Smart-hjem"],
    price: "799",
    highlight: true,
    badge: "Mest valgt",
  },
  {
    name: "HIME 1000",
    speed: "1000 Mbps",
    description: "For deg som vil ha maksimal kapasitet hjemme. Full gigabit opp og ned.",
    features: ["Maks kapasitet", "Profesjonell bruk", "Fremtidssikret"],
    price: "999",
    badge: "Kun fiber",
  },
];

const premiumPackages = [
  {
    name: "V Premium",
    price: "649",
    tag: "Sport + underholdning",
    description: "Premier League, Formel 1, håndball, vintersport + film og serier fra Hollywood og Viaplay Originals.",
    highlight: true,
  },
  {
    name: "TV 2 Sport Premium",
    price: "449",
    tag: "Fotball",
    description: "Champions League, La Liga, VM- og EM-kvalifisering, Nations League og vennskapskamper.",
  },
  {
    name: "V Sport",
    price: "349",
    tag: "Internasjonal sport",
    description: "Bundesliga, Europa League, Conference League, Formel 1, MotoGP, NASCAR, NFL, NHL og mer.",
  },
  {
    name: "V Series, Film & Sport",
    price: "399",
    tag: "Familie",
    description: "Kombinert pakke med underholdning og sport — bra verdi for familier.",
  },
];

const baseChannels = [
  { name: "NRK1", logo: "https://hime.no/wp-content/uploads/2025/02/NRK1.png" },
  { name: "NRK2", logo: "https://hime.no/wp-content/uploads/2025/02/NRK2.png" },
  { name: "NRK3", logo: "https://hime.no/wp-content/uploads/2025/02/NRK3NRKSUper.png" },
  { name: "TV 2 Direkte", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Direkte.png" },
  { name: "TVNorge", logo: "https://hime.no/wp-content/uploads/2024/02/TVNorge.png" },
  { name: "TV3", logo: "https://hime.no/wp-content/uploads/2024/11/TV3_Norway_logo_2016.svg" },
  { name: "FEM", logo: "https://hime.no/wp-content/uploads/2024/02/FEM.png" },
  { name: "REX", logo: "https://hime.no/wp-content/uploads/2024/03/REX.png" },
  { name: "VOX", logo: "https://hime.no/wp-content/uploads/2024/02/Vox.png" },
  { name: "3+", logo: "https://hime.no/wp-content/uploads/2024/11/TV3_Norway.svg" },
  { name: "TV6", logo: "https://hime.no/wp-content/uploads/2023/05/TV6.png" },
  { name: "TV 2 Zebra", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Zebra.png" },
  { name: "TV 2 Livsstil", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Livsstil.png" },
  { name: "TV 2 Sport 1", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Sport1.png" },
  { name: "TV 2 Sport 2", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Sport-2.png" },
  { name: "TV 2 Nyheter", logo: "https://hime.no/wp-content/uploads/2023/05/TV2-Nyheter.png" },
  { name: "VGTV", logo: "https://hime.no/wp-content/uploads/2023/05/VGTV.png" },
  { name: "TVModum", logo: "https://hime.no/wp-content/uploads/2023/05/TVModum.png" },
  { name: "Animal Planet", logo: "https://hime.no/wp-content/uploads/2024/02/Animal-planet.png" },
  { name: "BBC News", logo: "https://hime.no/wp-content/uploads/2023/05/BBC-News.png" },
  { name: "Discovery Channel", logo: "https://hime.no/wp-content/uploads/2024/02/Discovery.png" },
  { name: "TLC", logo: "https://hime.no/wp-content/uploads/2024/02/TLC.png" },
  { name: "ID", logo: "https://hime.no/wp-content/uploads/2024/02/ID.png" },
];

const faqs = [
  {
    q: "Hva er inkludert i Himepakken?",
    a: "Himepakken inkluderer internett (500 Mbps), grunnpakke-TV (26 kanaler), Himeboks, Hime-appen og 7 dagers arkiv.",
  },
  {
    q: "Kan jeg oppgradere hastigheten senere?",
    a: "Ja, du kan bytte pakke når som helst via Min side eller ved å kontakte oss.",
  },
  {
    q: "Hvor leverer Hime produkter?",
    a: "Vi leverer lokalt i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
  },
  {
    q: "Får jeg hjelp med installasjon?",
    a: "Ja, våre lokale montører hjelper deg med alt fra trekking av fiber til oppsett av WiFi.",
  },
];

export default function ProdukterOgPriserPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-dark py-20 md:py-40 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
            <Image 
                src="/products-hero.png" 
                alt="En familie som koser seg med oppkoblede tjenester i hjemmet" 
                fill 
                className="object-cover"
                priority
            />
            {/* Gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/20 to-dark/80" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-label text-primary uppercase tracking-[0.2em] mb-6">Pakker og priser</p>
          <h1 className="text-display-l md:text-display-xl text-white mb-8">
            Enkelt og oversiktlig,
            <br />
            <span className="text-primary italic font-medium">der du bor</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lead text-white/80 mb-12">
            Velg mellom lynraskt internett, TV med masse innhold, eller den populære Himepakken som samler alt i ett.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#himepakken">
              <Button size="lg" className="px-8 shadow-xl">Se Himepakken</Button>
            </a>
            <a href="#internett">
              <Button variant="ghost" size="lg" className="px-8 border-white/20 text-white hover:bg-white/10">Internett-hastigheter</Button>
            </a>
          </div>
        </div>
      </section>

      {/* Himepakken Section */}
      <section id="himepakken" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block bg-primary text-white text-caption font-bold px-4 py-1 rounded-pill mb-6">
                Mest populær
              </div>
              <h2 className="text-h1 text-dark mb-4">{himePackage.name}</h2>
              <p className="text-h3 text-primary mb-8">Fra {himePackage.price} kr/mnd</p>
              <p className="text-body-base text-dark/70 mb-10 leading-relaxed">
                {himePackage.description}
              </p>
              
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4 mb-12">
                {himePackage.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-body-small text-dark/80">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-white text-[10px]">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <Link href="https://mktv.no/bestille">
                <Button as="span" variant="secondary" size="lg" className="min-w-[240px] text-white font-bold">Bestill Himepakken</Button>
              </Link>
            </div>
            
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                    src="/himepakken-tv.png" 
                    alt="Moderne TV-opplevelse med Himepakken" 
                    fill 
                    className="object-cover"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Internet Grid */}
      <section id="internett" className="py-24 bg-surface-soft">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-label text-primary uppercase tracking-widest mb-3">Kun internett</p>
            <h2 className="text-h2 md:text-h1">Velg din hastighet</h2>
            <p className="mt-4 text-body-base text-dark/60">Fleksible pakker for alle behov.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {internetPackages.map((pkg) => (
              <Card
                key={pkg.name}
                padding="none"
                className={`relative flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 overflow-visible ${
                  pkg.highlight ? "bg-dark text-white ring-2 ring-primary" : "bg-white border-border text-dark"
                }`}
              >
                {/* Floating Badge */}
                {pkg.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                    <span className={`${pkg.highlight ? "bg-primary" : "bg-teal"} text-white text-[12px] font-bold px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap uppercase tracking-wider`}>
                      {pkg.badge}
                    </span>
                  </div>
                )}
                
                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-label text-primary mb-1 uppercase tracking-tight">{pkg.name}</p>
                  <h3 className="text-h3 mb-4">{pkg.speed}</h3>
                  <p className={`text-body-small mb-8 leading-relaxed ${pkg.highlight ? "text-white/70" : "text-dark/60"}`}>
                    {pkg.description}
                  </p>
                  <ul className="space-y-3 mb-10">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-body-small font-medium">
                        <span className="text-teal">✓</span> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 border-t border-white/10">
                    <p className="text-h3 mb-6">Fra {pkg.price} kr<span className="text-caption font-normal opacity-50 ml-1">/mnd</span></p>
                    <Link href="https://mktv.no/bestille">
                        <Button as="span" variant={pkg.highlight ? "primary" : "secondary"} className="w-full text-white font-bold">Bestill</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium TV Section */}
      <section id="tv" className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <p className="text-label text-primary uppercase tracking-widest mb-3">TV & Underholdning</p>
            <h2 className="text-h2 md:text-h1">Topp sport og film</h2>
            <p className="mt-4 text-body-base text-dark/60">Legg til ekstra pakker på toppen av grunnpakken.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {premiumPackages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`flex flex-col transform transition-all hover:-translate-y-1 ${pkg.highlight ? "bg-dark text-white ring-2 ring-primary" : ""}`}
              >
                <div className="flex-1">
                  <p className="text-caption font-bold text-primary mb-1 uppercase tracking-wider">{pkg.tag}</p>
                  <h3 className="text-h3 mb-4">{pkg.name}</h3>
                  <p className={`text-body-small mb-6 leading-relaxed ${pkg.highlight ? "text-white/70" : "text-dark/60"}`}>
                    {pkg.description}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-h3 font-bold">{pkg.price} kr<span className="text-caption font-normal opacity-50 ml-1">/mnd</span></p>
                </div>
              </Card>
            ))}
          </div>

          {/* Channel Grid */}
          <div className="mt-24 text-center">
            <h3 className="text-h3 mb-10">23 kanaler inkludert i grunnpakken</h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {baseChannels.map((channel) => (
                <div key={channel.name} className="aspect-[3/2] bg-white rounded-xl flex items-center justify-center p-4 border border-border shadow-sm hover:shadow-md transition-shadow group">
                  <div className="relative w-full h-full max-w-[80px] max-h-[40px]">
                    <Image
                      src={channel.logo}
                      alt={`${channel.name} logo`}
                      fill
                      className="object-contain filter group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="py-24 bg-surface-soft">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-h2 mb-6">Sjekk din adresse</h2>
          <p className="text-body-base text-dark/60 mb-10">Skriv inn adressen din for å se hvilke pakker vi kan levere der du bor.</p>
          <div className="bg-white p-2 rounded-2xl shadow-xl border border-border">
            <CoverageCheck />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-h2 text-center mb-16">Ofte stilte spørsmål</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.q} className="p-8 group cursor-default">
                <h3 className="text-h4 mb-4 text-dark group-hover:text-primary transition-colors">{faq.q}</h3>
                <p className="text-body-base text-dark/70 leading-relaxed">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
