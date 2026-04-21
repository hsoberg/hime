import type { Metadata } from "next";
import { FAQAccordion } from "@/components/support/FAQAccordion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hjelp med Internett - Hime",
  description: "Finn svar på ofte stilte spørsmål om internett, ruter, passord og hastighet.",
};

const internettFaqs = [
  {
    question: "Jeg kommer meg ikke på nett",
    answer: "Hvis du opplever problemer med internett, bør du prøve dette:\n\n1. Sjekk at alle kabler er koblet riktig og at modemet er på.\n2. Restart modemet ved å trekke ut strømkontakten i 30 sekunder.\n3. Vent noen minutter til modemet er online igjen.\n4. Forsøk å koble en datamaskin direkte til modemet med kabel. Hvis dette fungerer, er det feil på det trådløse nettet.\n5. Sjekk driftsmeldinger på mktv.no.",
  },
  {
    question: "Glemt passord til det trådløse nettet?",
    answer: "Standard brukernavn og passord står vanligvis på en klistrelapp under eller på siden av modemet ditt.\n\nFinner du ikke passordlappen, eller fungerer ikke passordet? Ta kontakt med oss på telefon 32 78 46 40 eller stikk innom oss i Eikerveien 33.",
  },
  {
    question: "Hva er forskjellen på 2,4 GHz og 5 GHz?",
    answer: "Mange av våre rutere sender på to bånd:\n\n- 2,4 GHz: Har lengre rekkevidde og trenger lettere gjennom vegger, men har lavere hastighet og er mer utsatt for forstyrrelser fra naboer.\n- 5 GHz: Har mye høyere hastighet og kapasitet, men kortere rekkevidde. \n\nDe fleste moderne enheter kobler seg automatisk til det beste båndet.",
  },
  {
    question: "Hvordan bytter jeg navn (SSID) og passord?",
    answer: "For AirTies-utstyr kan du gjøre dette selv:\n\n1. Koble deg til nettet og åpne en nettleser.\n2. Skriv inn http://air4920.local eller http://air4930.local i adressefeltet.\n3. Logg inn (standard er ofte uten passord på første innlogging).\n4. Naviger til 'Quick Setup' eller 'WiFi Settings' for å endre navn og passord.",
  },
  {
    question: "Tilbyr dere internett via 5G?",
    answer: "Nei, Hime leverer internett via fiber og kabelnett. Vi mener fiber er den overlegne teknologien for hjemmebruk fordi den gir en dedikert, stabil og lynrask forbindelse som ikke påvirkes av vær eller antall brukere på mobilmasta.",
  },
  {
    question: "Jeg får ikke hastigheten jeg betaler for?",
    answer: "Husk at hastighet målt over WiFi nesten alltid er lavere enn det som leveres til boligen pga. vegger og forstyrrelser.\n\nFor en korrekt måling:\n1. Bruk en fersk nettverkskabel (Cat5e eller bedre).\n2. Koble PC-en direkte til modemet.\n3. Gå til nettfart.no for å kjøre testen.\n\nLes vår guide om [hvordan du tester hastigheten riktig her](/kundeservice/internett/speedtest).",
  },
];

export default function InternettSupportPage() {
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
          title="Internett-hjelp" 
          description="Her finner du svar på spørsmål om oppkobling, trådløst nett og feilsøking."
          items={internettFaqs} 
        />
        
        <div className="mt-12 p-8 rounded-3xl bg-white border border-[#DCDCDC] text-center">
          <h3 className="text-xl font-bold text-[#003C46] mb-2">Trenger du hjelp med oppsettet?</h3>
          <p className="text-[#4A7080] mb-6">Vi kan sende en montør hvis du ikke får det til selv.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/kontakt-oss"
              className="px-6 py-3 rounded-xl bg-[#003C46] text-white font-semibold hover:bg-[#1A5060] transition-colors"
            >
              Bestill hjelp
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
