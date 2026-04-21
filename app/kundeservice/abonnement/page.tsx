import { FAQAccordion } from "@/components/support/FAQAccordion";
import { ChevronLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Abonnement og flytting - Hime",
  description: "Informasjon om flytting, oppsigelse, endring av pakker og eierskifte.",
};

const abonnementFaqs = [
  {
    question: "Hvordan sier jeg opp abonnementet?",
    answer: "Oppsigelse må skje skriftlig til post@mktv.no. Husk å oppgi kundenummer eller adresse. For privatabonnement uten bindingstid gjelder inneværende måned pluss én måned oppsigelsestid.",
  },
  {
    question: "Kan jeg endre hastighet eller TV-pakke?",
    answer: "Ja, du kan bytte mellom våre tilgjengelige pakker når som helst. Endringen trer normalt i kraft i løpet av neste arbeidsdag. Ta kontakt med oss eller logg inn på Min Side for å se dine valg.",
  },
  {
    question: "Hvordan fungerer eierskifte?",
    answer: "Ønsker du å overføre abonnementet til en ny eier? Den nye eieren må ta kontakt med oss for å inngå en ny avtale. Merk at Himeboksen ikke overføres automatisk – ny eier må bestille egen boks, og du må returnere din eksisterende.",
  },
  {
    question: "Hvorfor er prisen på abonnementet forskjellig fra område til område?",
    answer: "Dette skyldes forskjeller i infrastruktur. I områder hvor vi leier nett av andre leverandører, må vi betale nettleie, noe som gir en høyere pris. Der vi eier nettet selv, kan vi tilby lavere månedspriser.",
  },
  {
    question: "Hva koster etablering?",
    answer: "Etableringskostnaden varierer basert på utbyggingsforhold, avstand og om du bestiller innenfor en salgsperiode. I områder hvor vi allerede eier nettet selv, betaler du som regel ingen etableringskostnad.",
  },
  {
    question: "Hvorfor er abonnementet mitt sperret?",
    answer: "Abonnementet sperres normalt hvis en faktura ikke er betalt innen fristen. Ved stenging på grunn av manglende betaling tilkommer et gjenåpningsgebyr på kr 600.",
  },
  {
    question: "Hvordan får jeg abonnementet mitt gjenåpnet?",
    answer: "Du må sende dokumentasjon på at betalingen er utført til post@mktv.no og sørge for at gjenåpningsgebyret er betalt. Vi åpner tjenesten så snart registreringen er bekreftet i våre åpningstider.",
  },
  {
    question: "Jeg har allerede betalt – hvor lang tid tar det før nettet er tilbake?",
    answer: "Ved betaling via nettbank kan det ta 1–3 virkedager før betalingen er registrert i våre systemer. For raskere gjenåpning bør du sende oss en kvittering på e-post.",
  },
  {
    question: "Hva må være med på kvitteringen jeg sender?",
    answer: "Det må tydelig fremgå at betalingen er utført til Modum Kabel-TV, samt hvilket beløp og hvilken dato det gjelder. Ufullstendig dokumentasjon kan forsinke behandlingen.",
  },
  {
    question: "Kan jeg melde flytting på nett?",
    answer: "Ja! Du kan melde flytting ved å fylle ut [flytteskjemaet vårt her](/flytte). Vi anbefaler å melde fra i god tid slik at vi kan sikre en smidig overgang til din nye adresse.",
  },
  {
    question: "Kan jeg fryse abonnementet mitt?",
    answer: "Ja, vi tilbyr midlertidig frys av abonnement i inntil 6 måneder (f.eks. ved lengre reiser). Det påløper et frysgebyr. Kontakt kundeservice for å avtale dette.",
  },
];

export default function AbonnementSupportPage() {
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
          title="Abonnement" 
          description="Her finner du svar på spørsmål om flytting, endring av tjenester og oppsigelse."
          items={abonnementFaqs} 
        />
        
        <div className="mt-12">
          <div className="p-8 rounded-3xl bg-white border border-[#DCDCDC]">
            <h3 className="text-xl font-bold text-[#003C46] mb-3">Min Side</h3>
            <p className="text-[#4A7080] text-sm mb-6">Logg inn for å få full oversikt over dine produkter, priser og fakturaer.</p>
            <Link 
              href="https://minside.mktv.no/"
              className="inline-block text-[#00A6C1] font-bold hover:underline"
            >
              Gå til Min Side →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
