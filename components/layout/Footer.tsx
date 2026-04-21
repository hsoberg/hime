"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function Footer() {
  return (
    <footer className="mt-auto bg-dark text-white border-t border-dark-mid">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex flex-wrap items-center gap-6 border-b border-dark-mid pb-8 md:gap-10">
          <Link href="/" className="relative block h-9 w-28 transition-opacity hover:opacity-90">
            <Image
              src="/Hime_Logo_Hvit_RGB.svg"
              alt="Hime"
              fill
              className="object-contain object-left"
            />
          </Link>

          <a
            href="https://mktv.no/"
            target="_blank"
            rel="noreferrer"
            className="relative block h-10 w-36 transition-opacity hover:opacity-90"
          >
            <Image
              src="/MKTV_Hovedlogo_Hvit_RGB.png"
              alt="Modum Kabel-TV"
              fill
              className="object-contain object-left"
            />
          </a>
        </div>

        <div className="grid gap-12 pt-10 md:grid-cols-3 md:gap-8 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <h3 className="text-h4 text-white">
              Kontakt oss
            </h3>
            <div className="space-y-2 text-body-small text-white/80">
              <p>
                Telefon: <a href="tel:+4732784640" className="transition-colors hover:text-primary font-bold">32 78 46 40</a>
              </p>
              <p>
                E-post:{" "}
                <a href="mailto:post@mktv.no" className="transition-colors hover:text-primary font-bold">
                  post@mktv.no
                </a>
              </p>
              <p>Eikerveien 33, 3340 Åmot</p>
              <p>Postboks 29, 3341 Åmot</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-h4 text-white">
              Åpningstider kundeservice
            </h3>
            <div className="space-y-2 text-body-small text-white/80">
              <p>Mandag – Fredag: 08.00 – 19.00</p>
              <p>Lørdag: 10.00 – 14.00</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-h4 text-white">
              Vakttelefon
            </h3>
            <div className="space-y-2 text-body-small text-white/80">
              <p>
                Tlf: <a href="tel:+4731900611" className="transition-colors hover:text-primary font-bold">31 90 06 11</a>
              </p>
              <p className="text-caption opacity-80 italic">Bemannes hverdager: 19:00 – 21:00</p>
              <p className="text-caption opacity-80 italic">Helger/helligdager: 09:00 – 19:00</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="space-y-2 text-caption text-white/60">
                <Link href="/personvern" className="block transition-colors hover:text-primary">
                  Personvern & Vilkår
                </Link>
                <p>© {new Date().getFullYear()} Modum Kabel-TV AS</p>
              </div>
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="ghost" 
                size="sm" 
                className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                Til toppen ↑
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
