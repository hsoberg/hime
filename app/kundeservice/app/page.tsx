import type { Metadata } from "next";
import { FAQAccordion } from "@/components/support/FAQAccordion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hime TV-app hjelp",
  description: "Finn svar på spørsmål om Hime TV-app for mobil, nettbrett, Apple TV og Chromecast.",
};

const appFaqs = [
  {
    question: "Hvilke enheter støttes av Hime-appen?",
    answer: "Hime TV-app er tilgjengelig for:\n- iPhone og iPad (iOS)\n- Android mobiler og nettbrett\n- Apple TV\n- Google TV / Android TV\n- Chromecast\n- Nettleser (player.mktv.no)",
  },
  {
    question: "Hvor mange kan se samtidig?",
    answer: "Du kan ha appen installert på så mange enheter du vil, og du kan strømme innhold på opptil 2 enheter samtidig per abonnement.",
  },
  {
    question: "Hvor finner jeg brukernavn og passord til appen?",
    answer: "Du bruker samme pålogging som til Min Side. Hvis du har glemt passordet, kan du trykke på 'Glemt passord' på innloggingssiden eller kontakte oss.",
  },
  {
    question: "Kan jeg se TV i utlandet?",
    answer: "Ja, du kan se de fleste av dine kanaler i hele EU/EØS, så lenge du har en norsk konto og bruker appen på reise. Det fungerer på samme måte som hjemme.",
  },
  {
    question: "Støtter appen 4K-oppløsning?",
    answer: "De fleste av våre kanaler sendes i HD-kvalitet. Utvalgt innhold og enkelte strømmetjenester integrert i appen kan støtte høyere oppløsning avhengig av din enhet og internetthastighet.",
  },
];

export default function AppSupportPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link 
          href="/kundeservice"
          className="inline-flex items-center gap-2 text-[#4A7080] hover:text-[#FF8278] transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Tilbake til kundeservice
        </Link>

        <FAQAccordion 
          title="Hime TV-app" 
          description="Ta med deg TV-opplevelsen overalt med vår egen app for mobil, brett og TV-bokser."
          items={appFaqs} 
        />
      </div>
    </main>
  );
}
