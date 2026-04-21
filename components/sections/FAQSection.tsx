import Link from "next/link";

const faqs = [
  {
    question: "Hvilke områder dekker Hime?",
    answer:
      "Hime leverer internett og TV i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand. Tilgjengelige hastigheter og teknologi varierer etter adresse. Bruk dekningssjekken øverst på siden for å se hva som er tilgjengelig hos deg.",
  },
  {
    question: "Hvilke internett-hastigheter tilbyr Hime?",
    answer:
      "Hime tilbyr fire hastigheter: HIME 100 (100 Mbps, fra 599 kr/mnd), HIME 250 (250 Mbps, fra 699 kr/mnd), HIME 500 (500 Mbps, fra 799 kr/mnd) og HIME 1000 (1000 Mbps, fra 999 kr/mnd). HIME 1000 er kun tilgjengelig i fiberområder.",
  },
  {
    question: "Hva er Himepakken?",
    answer:
      "Himepakken er en kombinasjonspakke med Hime 500 internett og grunnpakke-TV fra 949 kr/mnd. Inkludert er Himeboks-dekoder, tilgang til Hime-appen og 7 dagers programarkiv. Grunnpakken inneholder 23 kanaler inkludert NRK, TV 2 og TVNorge.",
  },
  {
    question: "Kan jeg nå Hime utenom ordinær åpningstid?",
    answer:
      "Ja. Ordinær kundeservice er åpen mandag–fredag 08–19 og lørdag 10–14 på telefon 32 78 46 40. I tillegg har vi vakttelefon 31 90 06 11 på hverdager 19–21 og i helger og på helligdager 09–19.",
  },
  {
    question: "Internett er tregt — hva gjør jeg?",
    answer:
      "Start med å starte ruteren på nytt: hold av-knappen i 30 sekunder, deretter skru på igjen. Kontroller at det ikke er for mange enheter tilkoblet samtidig. Kjør en hastighetstest på fast.com. Hjelper ikke dette, ring oss på 32 78 46 40 — vi finner ut av det.",
  },
];

export function FAQSection() {
  // JSON-LD structured data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <p className="text-label text-primary mb-3">
            Hva lurer du på?
          </p>
          <h2 className="text-h2 md:text-h1">
            Ofte stilte spørsmål
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details key={faq.question} className="group rounded-card border border-border bg-surface hover:bg-surface-soft transition-colors overflow-hidden">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none p-6 md:p-7">
                <span className="text-h4 text-dark group-open:text-primary transition-colors">
                  {faq.question}
                </span>
                <span
                  className="flex-shrink-0 h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center group-open:rotate-45 transition-transform duration-300"
                  aria-hidden="true"
                >
                  <PlusIcon />
                </span>
              </summary>
              <div className="px-6 pb-7 md:px-7 md:pb-8">
                <p className="text-body-base text-dark/70 leading-relaxed border-t border-border pt-5">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block p-8 bg-surface-soft rounded-panel border border-border">
            <p className="text-body-base text-dark/70">
              Finner du ikke svaret du leter etter? 
              <br className="md:hidden" />
              {" "}
              <Link href="/hjelp" className="text-primary font-bold hover:underline">
                Se alle hjelpeartikler
              </Link> 
              {" eller "}
              <a href="tel:+4732784640" className="text-primary font-bold hover:underline">
                ring 32 78 46 40
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 20 20" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 4v12M4 10h12" />
    </svg>
  );
}
