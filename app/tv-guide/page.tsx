import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, List, Tv } from "lucide-react";
import { LiveDateBadge } from "@/components/tv/LiveDateBadge";
import { PremiumGuideSpotlight } from "@/components/tv/PremiumGuideSpotlight";
import { TvGuideGrid } from "@/components/tv/TvGuideGrid";

export const metadata: Metadata = {
  title: "TV-guide - Se hva som går på TV nå | Hime",
  description:
    "Full oversikt over TV-programmet for kanalene hos Hime. Se hva som går nå og neste på NRK, TV 2, TVNorge og alle dine favorittkanaler.",
};

export default function TvGuidePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-dark py-14 pb-20 md:py-20 md:pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/hero-tv-guide.png')" }}
        />
        <div className="absolute inset-0 bg-dark/35" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/82 via-dark/42 to-dark/5" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/10 via-transparent to-dark/40" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-tight border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary">
                <Tv className="h-3 w-3" />
                Live oversikt
              </div>
              <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl">
                Hva går på <span className="text-primary">TV nå?</span>
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                Få full oversikt over favorittkanalene dine, direkte sendinger og hva som kommer i
                kveld på Himes kanaler.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-4 rounded-card border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                <div className="flex h-10 w-10 items-center justify-center rounded-tight bg-primary/20 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    Dato
                  </p>
                  <p className="text-sm font-semibold capitalize text-white">
                    <LiveDateBadge />
                  </p>
                </div>
              </div>

              <Link
                href="/kanaler"
                className="inline-flex items-center gap-2 rounded-tight bg-white px-6 py-4 font-bold text-dark shadow-lg transition-all hover:bg-slate-100"
              >
                <List className="h-5 w-5 text-primary" />
                Se kanalliste
              </Link>
            </div>
          </div>
        </div>
      </section>

      <PremiumGuideSpotlight />

      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-bold text-dark">
                Programoversikt
              </h2>
              <p className="mt-1 text-slate-500">Oppdateres automatisk hvert minutt.</p>
            </div>

            <Link
              href="/produkter-og-priser#tv"
              className="inline-flex items-center justify-center gap-2 rounded-tight border border-dark px-4 py-3 text-sm font-bold text-dark transition-colors hover:bg-dark hover:text-white"
            >
              Se TV-pakker
            </Link>
          </div>

          <TvGuideGrid />

          <div className="mt-12 rounded-card border border-slate-200 bg-white p-8 text-center">
            <h3 className="mb-3 text-xl font-bold text-dark">Savner du innhold?</h3>
            <p className="mx-auto mb-6 max-w-xl text-slate-500">
              Du kan enkelt legge til ekstra kanaler eller premiumpakker som V Premium og TV 2 Sport
              inne på Min side. Oppdateringen skjer umiddelbart på dekoderen din.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://minside.mktv.no/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-tight bg-dark px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Gå til Min side
              </a>
              <Link
                href="/kontakt-oss"
                className="rounded-tight border border-slate-200 px-6 py-3 font-semibold text-slate-600 transition-colors hover:bg-slate-50"
              >
                Kontakt kundeservice
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
