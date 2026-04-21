"use client";

import Link from "next/link";
import { Wifi, Tv, Receipt, UserRound, HardHat, Smartphone, Signal } from "lucide-react";

const categories = [
  {
    title: "Internett",
    href: "/kundeservice/internett",
    icon: Wifi,
    description: "Oppkobling, hastighet og trådløst nett.",
  },
  {
    title: "TV",
    href: "/kundeservice/tv",
    icon: Tv,
    description: "Dekodere, kanalsøk og bildekvalitet.",
  },
  {
    title: "Faktura",
    href: "/kundeservice/faktura",
    icon: Receipt,
    description: "Betaling, eFaktura og fakturaspørsmål.",
  },
  {
    title: "Abonnement",
    href: "/kundeservice/abonnement",
    icon: UserRound,
    description: "Flytting, oppsigelse og endring.",
  },
  {
    title: "Graving",
    href: "/kundeservice/graving",
    icon: HardHat,
    description: "Informasjon om graving av fiber.",
  },
  {
    title: "App",
    href: "/kundeservice/app",
    icon: Smartphone,
    description: "Bruk av TV-appen på ulike enheter.",
  },
  {
    title: "WiFi Pluss",
    href: "/kundeservice/wifi",
    icon: Signal,
    description: "Mesh-nettverk og WiFi-utvidelse.",
  },
];

export function CategoryTiles() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((cat) => (
        <Link
          key={cat.title}
          href={cat.href}
          className="group p-8 rounded-3xl bg-white border border-[#DCDCDC] hover:border-[#FF8278] hover:shadow-xl hover:shadow-[#FF8278]/5 transition-all duration-300 flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)] text-[#FF8278] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <cat.icon className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-[#003C46] mb-2">{cat.title}</h3>
          <p className="text-sm text-[#4A7080] leading-relaxed">
            {cat.description}
          </p>
        </Link>
      ))}
    </div>
  );
}
