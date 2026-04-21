import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTABanner() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Subtle decorative circles for texture */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-dark/5 blur-3xl pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <h2 className="text-h2 md:text-display-l text-white">
          Klar for lynraskt internett?
        </h2>
        <p className="mt-6 text-lead text-white/90 max-w-2xl mx-auto">
          Sjekk hva som er tilgjengelig på din adresse — det tar under ett minutt.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="https://mktv.no/bestille">
            <Button as="span" variant="secondary" size="lg" className="min-w-[240px] shadow-xl text-white">
              Se tilgjengelighet nå
            </Button>
          </Link>
          <a href="tel:+4732784640">
            <Button variant="ghost" size="lg" className="min-w-[240px] border-white/40 text-white hover:bg-white/10 hover:text-white">
              Ring oss: 32 78 46 40
            </Button>
          </a>
        </div>
        
        <p className="mt-10 text-label text-white/60 tracking-wide uppercase">
          Tydelige vilkår · Lokal service · Rask installasjon
        </p>
      </div>
    </section>
  );
}
