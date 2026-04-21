import type { Metadata } from "next";
import { FAQAccordion } from "@/components/support/FAQAccordion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informasjon om graving - Hime",
  description: "Alt du trenger å vite om graving og fiberinstallasjon til din bolig.",
};

const gravingFaqs = [
  {
    question: "Hvorfor må det graves?",
    answer: "For å levere fiber helt inn til husveggen din må vi legge en tynn rørgate i bakken fra nærmeste kum eller stolpe og frem til boligen din. Dette sikrer en stabil og værbestanding forbindelse.",
  },
  {
    question: "Hvem skal utføre gravingen?",
    answer: "Det varierer. I mange områder utfører Hime gravingen helt frem til huset. I andre tilfeller kan du velge å gjøre gravejobben på egen tomt selv mot en redusert etableringspris. Dette blir avtalt ved bestilling.",
  },
  {
    question: "Hvor dypt må fiberkabelen ligge?",
    answer: "På privat tomt holder det normalt at kabelen ligger på 20-30 cm dybde. Det er viktig at den graves ned slik at den ikke blir skadet av hagearbeid eller snømåking.",
  },
  {
    question: "Hva med asfalt og belegningsstein?",
    answer: "Vi forsøker alltid å finne den mest skånsomme veien. Hvis vi må gjennom asfalt eller stein, kan vi ofte skjære et tynt spor eller bore under. Vi sørger for grovgjenoppretting etter endt arbeid.",
  },
  {
    question: "Hvor plasseres inntaket i huset?",
    answer: "Vår montør avtaler plassering med deg. Vanligvis plasseres inntaket der det er kortest vei fra rørgate i bakken og der det er mest hensiktsmessig å plassere hjemmesentral/ruter.",
  },
];

export default function GravingSupportPage() {
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
          title="Graving og installasjon" 
          description="Her finner du informasjon om hvordan graveprosessen foregår når du skal få fiber fra Hime."
          items={gravingFaqs} 
        />
      </div>
    </main>
  );
}
