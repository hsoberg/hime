import type { Metadata } from "next";
import { FAQAccordion } from "@/components/support/FAQAccordion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hjelp med TV - Hime",
  description: "Finn svar på ofte stilte spørsmål om TV-tjenester, dekodere og bildekvalitet.",
};

const tvFaqs = [
  {
    question: "Svart skjerm og meldingen «Ingen signal» på TV-en?",
    answer: "Ofte skyldes feilen at TV-en ikke viser signalet fra din dekoder. Om du har koblet til din dekoder ved hjelp av HDMI-kontakten, er det nødvendig at du velger rett inngang på din TV.\n\nPå fjernkontrollen til din TV finnes det vanligvis en knapp som er merket med AV, EXT, eller Source. Bruk denne til å velge den inngangen på TV-en som dekoderen er koblet til.",
  },
  {
    question: "Hakking på lyd eller bilde?",
    answer: "Hakking kan skyldes svake signaler inn til dekoder. Veldig ofte er det lange eller dårlige antennekabler som har skylden.\n\nSjekk følgende:\n- Benytt medfølgende antennekabel (eller trippelskjermet kabel av god kvalitet).\n- Fjern splittere eller skjøter mellom vegguttak og dekoder.\n- Sjekk at kabelen sitter godt i begge ender.\n- Se etter synlige skader på kabelen.\n- Ta av strømmen på dekoderen i 10 sekunder og start på nytt.",
  },
  {
    question: "Ustabile TV-signaler på Himeboks?",
    answer: "Dette kan skyldes dårlig nettverksforbindelse. Vi anbefaler alltid å bruke nettverkskabel koblet direkte fra ruteren til boksen for å unngå trådløse forstyrrelser.",
  },
  {
    question: "Hvordan stiller jeg inn kanaler direkte på TV-en uten dekoder?",
    answer: "Det viktigste er at du stiller inn TV-en til å befinne seg i Sverige (da dette er nødvendig for korrekt kanalsortering på enkelte modeller). \n\n1. Gå til innstillinger for Antenne eller Kringkasting.\n2. Velg Sverige som land.\n3. Start autoinnstilling.\n4. Velg 'Kabel' og 'Digital'.\n5. Bruk standardverdier for søk.",
  },
  {
    question: "Kan jeg se TV flere steder i huset?",
    answer: "Ja, men du må bestille en ekstra dekoder. Kostnaden er 50 kr i måneden per ekstra dekoder. Du kan bestille dette via Min Side eller ved å kontakte oss.",
  },
  {
    question: "Kan jeg bestille bare TV-pakke uten internett?",
    answer: "Dessverre tilbyr vi ikke lenger kun TV-tjenester. Våre tjenester er nå en del av kombinerte pakker som inkluderer både TV og internett for en mer helhetlig opplevelse.",
  },
  {
    question: "Hva betyr Source Error 2001?",
    answer: "Dette betyr at dekoderen ikke har en aktiv internettforbindelse.\n\nPrøv dette:\n1. Sjekk at nettverkskabelen sitter i.\n2. Start dekoderen på nytt (trekk ut strømmen i 10 sek).\n3. Start ruteren på nytt.\n4. Sjekk om andre enheter i huset har internett.",
  },
  {
    question: "Hva betyr Source Error 2004?",
    answer: "Dette betyr at dekoderen har internett, men ikke klarer å hente innholdet.\n\nPrøv dette:\n1. Bytt til en annen kanal og tilbake igjen.\n2. Start dekoderen på nytt.\n3. Sjekk driftsmeldinger på mktv.no for å se om det er en generell feil.",
  },
];

export default function TVSupportPage() {
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
          title="TV-hjelp" 
          description="Her finner du svar på de vanligste spørsmålene om våre TV-tjenester."
          items={tvFaqs} 
        />
        
        <div className="mt-12 p-8 rounded-3xl bg-white border border-[#DCDCDC] text-center">
          <h3 className="text-xl font-bold text-[#003C46] mb-2">Fant du ikke det du lette etter?</h3>
          <p className="text-[#4A7080] mb-6">Vår kundeservice er her for å hjelpe deg.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/kontakt-oss"
              className="px-6 py-3 rounded-xl bg-[#003C46] text-white font-semibold hover:bg-[#1A5060] transition-colors"
            >
              Kontakt oss
            </Link>
            <a 
              href="tel:32784640"
              className="px-6 py-3 rounded-xl border border-[#DCDCDC] text-[#003C46] font-semibold hover:bg-[#F9F9F9] transition-colors"
            >
              Ring 32 78 46 40
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
