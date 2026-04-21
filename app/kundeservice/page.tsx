import type { Metadata } from "next";
import { CategoryTiles } from "@/components/support/CategoryTiles";
import { Search, Phone, Mail, Clock, Signal } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kundeservice og Ofte stilte spørsmål - Hime",
  description:
    "Få hjelp med TV, internett, faktura og mer. Lokal kundeservice for Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
  alternates: {
    canonical: "https://hime.no/kundeservice",
  },
  openGraph: {
    title: "Kundeservice hos Hime",
    description:
      "Få hjelp med TV, internett, faktura og mer fra lokal kundeservice i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
    url: "https://hime.no/kundeservice",
    siteName: "Hime",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kundeservice hos Hime",
    description:
      "Få hjelp med TV, internett, faktura og mer fra lokal kundeservice i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
  },
};

const kundeserviceFaqs = [
  {
    question: "Hvordan kontakter jeg kundeservice?",
    answer:
      "Du kan ringe oss på 32 78 46 40 eller sende e-post til post@mktv.no. Åpningstid er man-fre 08:00-19:00 og lørdag 10:00-14:00.",
  },
  {
    question: "Hvor sjekker jeg driftsmeldinger?",
    answer:
      "Du finner oppdaterte driftsmeldinger på siden for driftsmeldinger. Der ser du status på tjenester i ditt område.",
  },
  {
    question: "Hvilke områder leverer Hime i?",
    answer:
      "Hime leverer lokalt i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand.",
  },
  {
    question: "Hvilke kanaler er med i Himepakken?",
    answer:
      "Grunnpakken i kanaloversikten er oppgitt med 26 kanaler, blant annet NRK1, NRK2, TV 2 Direkte, TVNorge, TV 2 Sport 1 og TV 2 Nyheter.",
  },
  {
    question: "Hvilke tilleggskanaler kan jeg velge?",
    answer:
      "Du kan velge tilleggskanaler innen nordiske kanaler, dokumentar, musikk, barn/familie, internasjonale nyheter, europeiske kanaler og livsstil/tro.",
  },
  {
    question: "Hva koster tilleggskanaler?",
    answer:
      "På TV-siden er eksempeltrinn oppgitt som +5 kanaler for 50 kr/mnd, +10 kanaler for 100 kr/mnd og fullt tilleggsutvalg for 200 kr/mnd.",
  },
  {
    question: "Hvordan melder jeg flytting av abonnement?",
    answer:
      "Ved flytting anbefaler vi at du melder fra tidlig, slik at internett og TV kan klargjøres på ny adresse.",
  },
  {
    question: "Hvor finner jeg hjelp med faktura?",
    answer:
      "Du finner faktura-hjelp på kundeservice under faktura, med informasjon om betaling, forfall og vanlige spørsmål.",
  },
  {
    question: "Hva gjør jeg hvis internett er tregt eller ustabilt?",
    answer:
      "Start med internett- og WiFi-hjelpesidene. Sjekk også driftsmeldinger for å se om det er kjente feil i området ditt.",
  },
  {
    question: "Hvordan logger jeg inn på Min side?",
    answer:
      "Du logger inn på Min side via minsiden vår for å administrere kundeforhold, tjenester og kundeinformasjon.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: kundeserviceFaqs.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Hime kundeservice",
  serviceType: "Kundeservice for internett og TV",
  provider: {
    "@type": "Organization",
    name: "Hime",
    url: "https://hime.no",
    telephone: "+4732784640",
    email: "post@mktv.no",
  },
  areaServed: ["Modum", "Sigdal", "Krødsherad", "Nakkerud", "Tyristrand"],
  availableChannel: [
    {
      "@type": "ServiceChannel",
      serviceUrl: "https://hime.no/kontakt-oss",
    },
    {
      "@type": "ServiceChannel",
      servicePhone: "+4732784640",
    },
  ],
};

const breadcrumbSchema = {
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
      name: "Kundeservice",
      item: "https://hime.no/kundeservice",
    },
  ],
};

export default function KundeservicePage() {
  return (
    <main className="min-h-screen bg-surface-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Search Hero */}
      <section className="relative overflow-hidden bg-cover bg-center py-16 md:py-24 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')]">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hva kan vi hjelpe deg med?
          </h1>
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-muted w-6 h-6" />
            <input
              type="text"
              placeholder="Søk etter hjelp (f.eks 'svart skjerm', 'passord', 'faktura')..."
              className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white text-dark text-lg shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-dark">Velg en kategori</h2>
            <p className="text-dark-muted mt-2">Bla igjennom våre mest populære emner for rask hjelp.</p>
          </div>
          <CategoryTiles />
        </div>
      </section>

      {/* Crawlable FAQ for AEO */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-dark">Ofte stilte spørsmål</h2>
            <p className="mt-2 text-dark-muted">
              Direkte svar på de vanligste spørsmålene om internett, TV, faktura og kundeservice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {kundeserviceFaqs.map((item) => (
              <article key={item.question} className="rounded-2xl border border-[#DCDCDC] bg-white p-5">
                <h3 className="text-base font-bold text-dark">{item.question}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links / Status */}
      <section className="pb-16 md:pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Driftmeldinger */}
            <Link 
              href="/driftsmeldinger"
              className="flex items-center gap-6 p-8 rounded-3xl bg-teal-light border border-teal/20 hover:border-teal transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal text-white flex items-center justify-center shrink-0">
                <Search className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark group-hover:text-teal transition-colors">Driftsmeldinger</h3>
                <p className="text-dark-muted text-sm mt-1">Sjekk status på våre tjenester i ditt område.</p>
              </div>
            </Link>

            {/* Kontakt oss */}
            <Link 
              href="/kontakt-oss"
              className="flex items-center gap-6 p-8 rounded-3xl bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)] border border-primary/20 hover:border-primary transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] text-white flex items-center justify-center shrink-0">
                <Phone className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">Kontakt kundeservice</h3>
                <p className="text-dark-muted text-sm mt-1">Snakk med en av våre 25 lokale ansatte.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Details Grid */}
      <section className="py-16 bg-white border-t border-[#DCDCDC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Telefon */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)] text-primary flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-dark">Ring oss</h4>
                <p className="text-primary text-2xl font-bold mt-1">32 78 46 40</p>
                <div className="mt-4 space-y-1">
                  <p className="text-sm text-dark-muted flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Man–fre: 08:00 – 19:00
                  </p>
                  <p className="text-sm text-dark-muted flex items-center gap-2">
                    <Clock className="w-4 h-4" /> Lørdag: 10:00 – 14:00
                  </p>
                </div>
              </div>
            </div>

            {/* E-post */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-teal-light text-teal flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-dark">Send e-post</h4>
                <p className="text-teal text-lg font-bold mt-1">post@mktv.no</p>
                <p className="mt-4 text-sm text-dark-muted leading-relaxed">
                  Vi svarer normalt i løpet av neste arbeidsdag.
                </p>
              </div>
            </div>

            {/* Vakt */}
            <div className="flex gap-5">
              <div className="w-12 h-12 rounded-xl bg-light-50 text-dark flex items-center justify-center shrink-0">
                <Signal className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-dark">Vakttelefon</h4>
                <p className="text-dark text-xl font-bold mt-1">31 90 06 11</p>
                <p className="mt-4 text-sm text-dark-muted leading-relaxed italic">
                  Kun for kritiske feil (linjebrudd) utenom åpningstider.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
