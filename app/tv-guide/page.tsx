import type { Metadata } from "next";
import Link from "next/link";
import { Tv, Calendar, List } from "lucide-react";
import { TvGuideGrid } from "@/components/tv/TvGuideGrid";

export const metadata: Metadata = {
  title: "TV-guide — Se hva som går på TV nå | Hime",
  description:
    "Full oversikt over TV-programmet for kanalene hos Hime. Se hva som går nå og neste på NRK, TV 2, TVNorge og alle dine favorittkanaler.",
};

export default function TvGuidePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero / Header */}
      <section className="relative overflow-hidden bg-dark py-16 md:py-20">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal/10 rounded-full blur-[80px]" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-4">
                <Tv className="w-3 h-3" /> Live Oversikt
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                Hva går på <span className="text-primary">TV nå?</span>
              </h1>
              <p className="mt-4 text-lg text-slate-300">
                Få full oversikt over dine favorittkanaler. Her ser du hva som sendes akkurat nå 
                og hva som kommer i kveld på Himes kanaler.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dato</p>
                  <p className="text-sm font-semibold text-white">Torsdag 23. april</p>
                </div>
              </div>
              
              <Link
                href="/kanaler"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-dark font-bold hover:bg-slate-100 transition-all shadow-lg"
              >
                <List className="w-5 h-5 text-primary" />
                Se Kanalliste
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-dark flex items-center gap-2">
                Programoversikt
              </h2>
              <p className="text-slate-500 mt-1">Oppdateres automatisk hvert minutt.</p>
            </div>
            
            {/* Filter Tabs (Visual only for now) */}
            <div className="flex bg-white rounded-xl p-1 border border-slate-200">
              <button className="px-4 py-2 rounded-lg bg-primary text-dark text-sm font-bold">Grunnpakke</button>
              <button className="px-4 py-2 rounded-lg text-slate-500 text-sm font-semibold hover:text-dark">Sport</button>
              <button className="px-4 py-2 rounded-lg text-slate-500 text-sm font-semibold hover:text-dark">Film</button>
            </div>
          </div>

          <TvGuideGrid />
          
          {/* Legend / Info */}
          <div className="mt-12 p-8 rounded-3xl bg-white border border-slate-200 text-center">
            <h3 className="text-xl font-bold text-dark mb-3">Savner du innhold?</h3>
            <p className="text-slate-500 max-w-xl mx-auto mb-6">
              Du kan enkelt legge til ekstra kanaler eller premiumpakker som V Premium og TV 2 Sport 
              inne på Min side. Oppdateringen skjer umiddelbart på dekoderen din.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://minside.mktv.no/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-dark text-white font-semibold hover:bg-slate-800 transition-colors"
              >
                Gå til Min side
              </a>
              <Link 
                href="/kontakt-oss"
                className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
              >
                Kontakt kundeservice
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
