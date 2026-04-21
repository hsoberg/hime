import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const areas = ["Modum", "Sigdal", "Krødsherad", "Nakkerud", "Tyristrand"];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hf_20260414_081654_149688cf-7e99-461b-9833-e2f4fe88b278.png"
          alt="Familie som koser seg i sofaen"
          fill
          className="object-cover object-center scale-x-[1]"
          sizes="100vw"
          quality={95}
          priority
        />
        {/* Stronger overlay for better legibility */}
        <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-transparent md:from-white/95 md:via-white/60 min-w-full" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-6xl items-center px-4 py-16 sm:px-6 md:min-h-[85vh] md:py-24">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-pill bg-primary px-4 py-1.5 text-label text-white shadow-sm">
            <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
            Lokal leverandør siden 1996
          </div>

          <h1 className="mt-6 text-display-l tracking-tight text-dark md:text-display-xl lg:text-[72px]">
            Stabilt nett
            <br />
            <span className="text-primary italic font-medium">der du bor</span>
          </h1>

          <p className="mt-6 max-w-lg text-lead text-dark font-medium leading-relaxed">
            Hime leverer lynraskt internett og TV i
            {" "}
            {areas.slice(0, -1).join(", ")} og {areas[areas.length - 1]}.
            Som lokal leverandør er vi alltid i nærheten når du trenger oss.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="https://mktv.no/bestille">
              <Button as="span" size="lg" className="px-8 py-4 shadow-xl shadow-primary/20">
                Sjekk din adresse
              </Button>
            </Link>
            <Link href="/kundeservice">
              <Button as="span" variant="ghost" size="lg" className="px-8 py-4 bg-white/80 border-white shadow-sm hover:bg-white transition-all">
                Kontakt oss
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

