import type { Metadata } from "next";
import { FAQAccordion } from "@/components/support/FAQAccordion";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hjelp med Faktura - Hime",
  description: "Finn svar på spørsmål om faktura, betaling, eFaktura og Vipps-faktura.",
};

const fakturaFaqs = [
  {
    question: "Hvor ofte sender dere ut faktura?",
    answer: "Vi sender ut faktura månedlig. Den kommer vanligvis i starten av måneden med forfall rundt den 20.",
  },
  {
    question: "Hvilke fakturatyper tilbyr dere?",
    answer: "For privatkunder tilbyr vi følgende fakturatyper:\n- eFaktura (anbefalt)\n- Vipps-faktura\n- E-postfaktura (PDF)\n- Papirfaktura (med miljøgebyr)\n- AvtaleGiro (betalingsmetode)\n\nFor bedrifter tilbyr vi EHF, papir eller e-post.",
  },
  {
    question: "Er det gebyr på fakturaen?",
    answer: "Ved bruk av papirfaktura tilkommer et miljøgebyr på 69 kr. \n\nVelger du eFaktura, Vipps-faktura eller e-postfaktura er det 0 kr i gebyr. Merk at AvtaleGiro alene ikke fjerner gebyret – det må kombineres med eFaktura eller e-post for å bli gebyrfritt.",
  },
  {
    question: "Hva er Himepakken og hvordan fordeles prisen?",
    answer: "Når du er totalkunde hos oss (Internett + TV) får du rabatt på begge tjenestene. For enkelthet skyld er prisen på Himepakken fordelt slik at 60% utgjør internett og 40% utgjør TV-tjenesten på fakturaen din.",
  },
  {
    question: "Hvordan oppretter jeg eFaktura?",
    answer: "eFaktura oppretter du enkelt i nettbanken din. De fleste banker foreslår dette automatisk når du betaler en faktura fra oss.\n\nHusk å huke av for 'Ja takk til alle' eller søk opp 'Modum Kabel-TV' som tilbyder.",
  },
  {
    question: "Hvorfor får jeg ikke opp eFaktura i nettbanken?",
    answer: "For å motta eFaktura må du først ha registrert dette i nettbanken din. Det er også viktig at kontaktopplysningene dine hos oss (som e-post og telefon) stemmer overens med det banken har registrert.\n\nDu kan sjekke og oppdatere dine opplysninger på Min Side her på hime.no.",
  },
  {
    question: "Hvordan oppretter jeg AvtaleGiro?",
    answer: "AvtaleGiro må du opprette selv via nettbanken din. Hvis du er usikker på hvordan dette gjøres, anbefaler vi å kontakte banken din direkte for veiledning.",
  },
  {
    question: "Hvorfor fungerer ikke AvtaleGiroen min?",
    answer: "Det tar ofte tid fra du oppretter en AvtaleGiro til den blir aktiv i bankens systemer. De fleste banker opplyser at dette kan ta mellom 4 til 8 uker. Inntil avtalen er aktiv må du betale fakturaene manuelt.",
  },
  {
    question: "Hva er forskjellen på AvtaleGiro og eFaktura?",
    answer: "AvtaleGiro er en *betalingsavtale* som gjør at banken trekker beløpet automatisk på forfallsdato. eFaktura er en *faktureringsmetode* som gjør at du mottar fakturaen digitalt.\n\nHvis du kun har AvtaleGiro, men ikke eFaktura, vil du fortsatt motta detaljert faktura på papir i posten (og fakturagebyr tilkommer). Vi anbefaler å kombinere begge.",
  },
  {
    question: "Hvor finner jeg fakturaoversikten min?",
    answer: "Du finner kopi av alle dine fakturaer ved å logge inn på Min Side. Gå til 'Kundestøtte' og velg 'Faktura'. Her kan du laste ned fakturaene som PDF-dokumenter.",
  },
  {
    question: "Jeg har mottatt en purring, men har allerede betalt.",
    answer: "Purringer sendes ut hvis betalingen ikke er registrert innen forfall. Hvis du har betalt nylig kan betalingen ha krysset purringen i posten. Det tar normalt opptil to virkedager før en betaling er synlig i våre systemer.",
  },
  {
    question: "Hva skjer om jeg ikke betaler fakturaen?",
    answer: "Hvis betalingen uteblir etter inkassovarsel, vil tjenestene dine bli stengt uten ytterligere varsel. Ved gjenåpning vil det påløpe et gjenåpningsgebyr i tillegg til det utestående beløpet.",
  },
  {
    question: "Kan jeg få EHF-faktura som privatperson?",
    answer: "Nei, EHF (Elektronisk Handelsformat) er kun for bedrifter og offentlige virksomheter som er registrert i ELMA-registeret. Privatpersoner bruker eFaktura eller Vipps.",
  },
  {
    question: "Kan jeg få fakturaen min i Vipps?",
    answer: "Ja! Hvis du har eFaktura i nettbanken, kan du også få fakturaene dine direkte i Vipps. Du må da aktivere visning av regninger inne i Vipps-appen.",
  },
  {
    question: "Kan jeg få betalingsutsettelse?",
    answer: "Hvis du tar kontakt før forfall, kan vi i enkelte tilfeller innvilge utsettelse i inntil 30 dager. Dette forutsetter at du ikke har andre forfalte fakturaer fra før.",
  },
];

export default function FakturaSupportPage() {
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
          title="Faktura og betaling" 
          description="Her finner du informasjon om fakturatyper, gebyrer og hvordan du administrerer dine betalinger."
          items={fakturaFaqs} 
        />
        
        <div className="mt-12 p-8 rounded-3xl bg-[#E6F7FA] border border-[#00A6C1]/20">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#00A6C1] text-white flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold">kr</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#003C46]">Spar penger med eFaktura</h3>
              <p className="text-[#4A7080] mt-1">Gå over til eFaktura eller Vipps i dag og slipp fakturagebyret på 69 kr.</p>
            </div>
            <Link 
              href="https://minside.mktv.no/"
              target="_blank"
              className="px-6 py-3 rounded-xl bg-[#003C46] text-white font-semibold hover:bg-[#1A5060] transition-colors shrink-0"
            >
              Gå til Min Side
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
