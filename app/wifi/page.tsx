import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ShieldCheck, Signal, Wifi } from "lucide-react";

export const metadata: Metadata = {
  title: "WiFi Pluss - Hime",
  description:
    "WiFi Pluss fra Hime gir jevn WiFi i hele hjemmet med mesh-utstyr, enkel leiepris og rask hjelp når du trenger det.",
};

const benefits = [
  {
    title: "Jevn WiFi i hverdagen",
    description: "Stabilt nett til streaming, gaming og hjemmekontor, også når flere bruker nettet samtidig.",
  },
  {
    title: "Leie, ikke kjøp",
    description: "Du slipper å kjøpe dyrt utstyr som blir utdatert. Vi kan oppgradere løsningen når behovet endrer seg.",
  },
  {
    title: "Raskere hjelp",
    description: "Vi kan se at mesh-enhetene er på nett og snakker godt sammen. Det gir bedre grunnlag når vi feilsøker.",
  },
];

const comparisonPoints = [
  {
    title: "Du slipper feilkjøp",
    description: "Vi finner en løsning som passer boligen din, i stedet for at du må gjette i butikkhylla.",
  },
  {
    title: "Du slipper foreldet utstyr",
    description: "Leie betyr at du ikke sitter igjen med utstyr som blir utdatert. Vi kan oppgradere når det trengs.",
  },
  {
    title: "Vi ser helheten",
    description: "Vi kan se status på mesh-enhetene og signalene mellom dem. Det gjør feilsøking raskere og mer presist.",
  },
];

const faqs = [
  {
    question: "Hvor mange enheter trenger jeg?",
    answer:
      "Det kommer an på planløsning, byggematerialer og hvor mange rom eller etasjer du vil dekke. Mange mindre boliger klarer seg med én enhet, mens større boliger ofte trenger to eller tre.",
  },
  {
    question: "Hva er fordelen med å leie utstyr?",
    answer:
      "Du slipper høy engangskostnad og risikoen for å kjøpe feil. Samtidig får du en løsning vi kjenner godt og kan støtte fullt ut.",
  },
  {
    question: "Kan dere hjelpe hvis nettet føles dårlig?",
    answer:
      "Ja. Nettopp det er en av fordelene med WiFi Pluss. Vi kan hjelpe deg å vurdere plassering, dekning og antall enheter slik at du får en løsning som faktisk fungerer hjemme hos deg.",
  },
];

export default function WifiPage() {
  return (
    <main className="min-h-screen bg-surface-2 py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Link
          href="/kundeservice"
          className="group mb-8 inline-flex items-center gap-2 text-dark-muted transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
          Tilbake til kundeservice
        </Link>

        <section className="overflow-hidden rounded-[2.5rem] border border-light bg-white shadow-sm">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="bg-dark px-8 py-10 text-white sm:px-10 md:px-14 md:py-14">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-primary-light">WiFi Pluss fra Hime</p>
              <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
                WiFi Pluss, stabil WiFi i hele hjemmet
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#9BBDC5]">
                Hvis internettlinja er rask, men nettet likevel oppleves ustabilt i deler av boligen, er det ofte WiFi som er flaskehalsen. WiFi Pluss er vår mesh-løsning der du leier utstyret, og vi hjelper deg å få det satt opp riktig.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/kontakt-oss"
                  className="inline-flex items-center gap-2 rounded-xl bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] px-6 py-3 font-semibold text-dark transition-colors hover:bg-primary-dark"
                >
                  Bestill WiFi Pluss
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/kontakt-oss"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
                >
                  Spør oss først
                </Link>
              </div>

              <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-teal/20 bg-white/5 px-4 py-2 text-sm font-medium text-white">
                <ShieldCheck className="h-4 w-4 text-teal" />
                39 kr/mnd for én enhet, 99 kr/mnd for inntil tre
              </div>
            </div>

            <div className="relative min-h-[320px] bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)]">
              <Image
                src="/hf_20260414_080929_ebad72dd-3e45-43d1-88ad-5684c4eadd1b.png"
                alt="Mesh-ruter plassert på et bord hos en kunde."
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/20 via-transparent to-transparent" />
            </div>
          </div>
        </section>

        <section className="mt-12 grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[2rem] border border-light bg-white p-8 shadow-sm md:p-10">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">WiFi i praksis</p>
            <h2 className="mt-3 text-3xl font-bold text-dark">Jevnere nett i flere rom</h2>
            <p className="mt-4 text-base leading-relaxed text-dark-muted">
              WiFi fungerer best når signalene får spre seg fritt, og når flere enheter samarbeider. Med WiFi Pluss får du en løsning som er tilpasset boligen din, og du slipper å gjette deg fram alene.
            </p>
            <Link
              href="/kontakt-oss"
              className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:underline"
            >
              Snakk med oss om WiFi Pluss
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {benefits.map((item) => (
              <article key={item.title} className="rounded-[2rem] border border-light bg-white p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-surface-2 text-primary">
                  <Wifi className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-light bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Priser</p>
            <h2 className="mt-3 text-3xl font-bold text-dark">Enkel leiepris</h2>
            <p className="mt-4 text-base leading-relaxed text-dark-muted">
              Forutsigbart og enkelt: du betaler per måned, uten store engangskostnader. Vi anbefaler alltid antall enheter ut fra boligen din og behovet ditt.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-[1.5rem] border border-primary/20 bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)] p-6">
              <p className="text-3xl font-bold text-dark">39 kr/mnd</p>
              <p className="mt-2 text-sm text-dark-muted">Én enhet, passer mange leiligheter og mindre boliger.</p>
            </div>
            <div className="rounded-[1.5rem] border border-teal/20 bg-teal-light p-6">
              <p className="text-3xl font-bold text-dark">99 kr/mnd</p>
              <p className="mt-2 text-sm text-dark-muted">Inntil tre enheter, for flere rom, etasjer eller større bolig.</p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/kontakt-oss"
              className="inline-flex items-center gap-2 rounded-xl bg-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-dark-mid"
            >
              Bestill WiFi Pluss
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/kontakt-oss"
              className="inline-flex items-center gap-2 rounded-xl border border-dark/15 px-6 py-3 font-semibold text-dark transition-colors hover:bg-surface-2"
            >
              Spør oss først
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-light bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">WiFi Pluss vs eget system</p>
            <h2 className="mt-3 text-3xl font-bold text-dark">Hvorfor WiFi Pluss fra oss?</h2>
            <p className="mt-4 text-base leading-relaxed text-dark-muted">
              Du kan kjøpe mye bra WiFi-utstyr i butikk. Forskjellen er at med WiFi Pluss får du en løsning som er testet sammen med nettet vårt, satt opp riktig, og du har én support å forholde deg til.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {comparisonPoints.map((item) => (
              <article key={item.title} className="rounded-[1.5rem] border border-light bg-surface-2 p-6">
                <h3 className="text-lg font-bold text-dark">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-dark-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-light bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Utstyr</p>
            <h2 className="mt-3 text-3xl font-bold text-dark">Utstyret vi bruker</h2>
            <p className="mt-4 text-base leading-relaxed text-dark-muted">
              WiFi Pluss leveres med mesh-utstyr fra Genexis: Aura E650 som hovedenhet og Pulse EX600 som ekstra enheter ved behov. Det viktigste er ikke å kunne flest spesifikasjoner, men å få riktig oppsett hjemme hos deg.
            </p>
            <p className="mt-4 text-sm text-dark-muted">
              Les mer hos produsenten:
              {" "}
              <a href="https://genexis.eu/product/aura-e650/" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                Aura E650
              </a>
              {" "}og{" "}
              <a href="https://genexis.eu/product/pulse-ex600/" target="_blank" rel="noreferrer" className="font-semibold text-primary hover:underline">
                Pulse EX600
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-[2rem] border border-light bg-white p-8 shadow-sm md:p-10">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-dark">Vanlige spørsmål om WiFi Pluss</h2>
          </div>

          <div className="mt-8 space-y-4">
            {faqs.map((item, index) => (
              <article key={item.question} className="rounded-[1.5rem] border border-light bg-surface-2 p-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-bold text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-dark">{item.question}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-dark-muted">{item.answer}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}