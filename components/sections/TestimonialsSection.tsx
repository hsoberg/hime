const testimonials = [
  {
    quote:
      "Strålende service! Ringte ang. ustabilt nett kl. 14 en fredag. Under en time senere var de på plass og løste problemet. Takk til montør som jobbet en ekstra lang fredag for å bli ferdig.",
    name: "Christian Bye",
    location: "Google-anmeldelse",
    initials: "CB",
  },
  {
    quote:
      "Hadde i dag besøk av fibermontør fra Modum kabel! Meget hyggelig fyr som monterte alt etter boka og våres ønsker. Meget flink til å forklare hvordan alt funket når han var ferdig. Trosset regnet for å skjøte fiberkabel og fikk jobben ferdig på en super måte! Veldig fornøyd.",
    name: "Per O.",
    location: "Google-anmeldelse",
    initials: "PO",
  },
  {
    quote: "Bra service 😊",
    name: "Rune Christensen",
    location: "Google-anmeldelse",
    initials: "RC",
  },
];

import { Card } from "@/components/ui/Card";

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-label text-primary mb-3">
            Hva sier kundene?
          </p>
          <h2 className="text-h2 md:text-h1 text-dark">
            Naboene snakker for oss
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <Card
              key={t.name}
              className="flex flex-col h-full hover:shadow-lg transition-all duration-300 border-border bg-surface-soft"
              padding="lg"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6 text-primary" aria-label="5 av 5 stjerner">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} />
                ))}
              </div>

              <blockquote className="flex-1 text-body-base text-dark/80 leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 font-bold shadow-sm">
                  {t.initials}
                </div>
                <div>
                  <p className="text-body-base font-bold text-dark">{t.name}</p>
                  <p className="text-caption text-dark/50">{t.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <a
            href="https://g.page/r/hime-no"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-label text-dark/60 hover:text-primary transition-colors group"
          >
            <span className="group-hover:underline">Se alle omtaler på Google</span>
            <ExternalIcon />
          </a>
        </div>
      </div>
    </section>
  );
}

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-[#F59E0B] fill-current" viewBox="0 0 20 20" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function ExternalIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 3.5H3a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5V10m-2-6.5H13.5V7m0-3.5L7 10" />
    </svg>
  );
}
