import type { Metadata } from "next";
import { ChevronLeft, Laptop, Cable, Wifi, Activity, AlertCircle } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Slik tester du hastigheten riktig - Hime",
  description: "Lær hvordan du tar en korrekt hastighetsmåling av din internettlinje. Unngå vanlige feilkilder som WiFi-forstyrrelser og VPN.",
};

export default function SpeedtestPage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      {/* Hero Section */}
      <section className="bg-[#003C46] py-16 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link 
            href="/kundeservice/internett"
            className="inline-flex items-center gap-2 text-[#E6F7FA] hover:text-[#FF8278] transition-colors mb-8 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Tilbake til internett-hjelp
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Slik tester du hastigheten riktig</h1>
          <p className="text-xl text-[#E6F7FA] max-w-2xl leading-relaxed">
            Speedtest kan være forvirrende. Ofte måler testen Wi-Fi i huset ditt, ikke selve internettlinja. Her forklarer vi hvordan du tester riktig.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 -mt-10 mb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-[40px] shadow-xl border border-[#003C46]/5 p-8 md:p-12">
            
            {/* Kort forklart */}
            <div className="bg-[#E6F7FA]/50 rounded-3xl p-8 mb-12 border border-[#003C46]/10">
              <h2 className="text-2xl font-bold text-[#003C46] mb-4 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-[#003C46]" />
                Kort forklart
              </h2>
              <p className="text-[#1A5060] leading-relaxed">
                Når du tar en speedtest trådløst, måler du ofte hvor godt Wi-Fi-signalet fungerer der du sitter – ikke hva linja faktisk leverer inn i huset. 
                For å vite hva du faktisk får, må du teste med **kabel**.
              </p>
            </div>

            <div className="space-y-16">
              {/* Før du tester */}
              <div>
                <h2 className="text-3xl font-bold text-[#003C46] mb-6 flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FF8278]/10 text-[#FF8278] text-xl">1</span>
                  Før du starter testen
                </h2>
                <div className="prose prose-lg text-[#4A7080] max-w-none">
                  <p>
                    Det er viktig at nettet får være i ro et lite øyeblikk. Sett streaming, nedlasting og andre nettaktiviteter på pause på alle enheter som er koblet til samme nett. 
                    Vent gjerne et par minutter før du går videre.
                  </p>
                </div>
              </div>

              {/* Kabeltest */}
              <div>
                <h2 className="text-3xl font-bold text-[#003C46] mb-6 flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#003C46]/10 text-[#003C46] text-xl">2</span>
                  Kabeltest: Bruk riktig utstyr
                </h2>
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  <div className="flex gap-4 p-6 rounded-3xl bg-[#F9F9F9] border border-[#DCDCDC]">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#003C46]">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003C46] mb-2">Bruk PC eller Mac</h3>
                      <p className="text-sm text-[#4A7080]">Sørg for at maskinen du tester med faktisk støtter hastigheten på abonnementet ditt.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 p-6 rounded-3xl bg-[#F9F9F9] border border-[#DCDCDC]">
                    <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-[#003C46]">
                      <Cable className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#003C46] mb-2">Koble direkte</h3>
                      <p className="text-sm text-[#4A7080]">Koble nettverkskabelen (Cat5e eller nyere) direkte fra maskinen til ruteren.</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-6 rounded-3xl bg-amber-50 border border-amber-200 text-amber-900 flex gap-4">
                   <Wifi className="w-6 h-6 shrink-0 mt-1" />
                   <p className="font-medium">Viktig: Skru av Wi-Fi på maskinen du tester med for å være sikker på at den bruker kabelen.</p>
                </div>
              </div>

              {/* Bakgrunnsprogrammer */}
              <div>
                <h2 className="text-3xl font-bold text-[#003C46] mb-6 flex items-center gap-4">
                  <span className="flex items-center justify-center w-12 h-12 rounded-2xl bg-[#003C46]/10 text-[#003C46] text-xl">3</span>
                  Lukk programmer og VPN
                </h2>
                <div className="prose prose-lg text-[#4A7080] max-w-none">
                  <p>
                    Skylagring (Dropbox/iCloud), oppdateringer og sikkerhetsprogrammer kan bruke mye båndbredde i bakgrunnen.
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Lukk alle unødvendige faner og programmer.</li>
                    <li><strong>Slå av VPN</strong> &ndash; dette kan redusere hastigheten betraktelig og gi et misvisende resultat.</li>
                  </ul>
                </div>
              </div>

              {/* Kjør testen */}
              <div className="text-center pt-8 border-t border-[#DCDCDC]">
                <h2 className="text-2xl font-bold text-[#003C46] mb-6">Klar til å teste?</h2>
                <p className="text-[#4A7080] mb-8 max-w-md mx-auto">
                  Vi anbefaler nettfart.no for en uavhengig og korrekt måling. Kjør gjerne testen 2&ndash;3 ganger for å se gjennomsnittet.
                </p>
                <a 
                  href="https://nettfart.no" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-[#003C46] text-white font-bold text-lg hover:bg-[#1A5060] transition-transform hover:scale-105 shadow-lg"
                >
                  <Activity className="w-6 h-6" />
                  Start testen på nettfart.no
                </a>
              </div>

              {/* Ved lav hastighet */}
              <div className="p-8 md:p-12 rounded-[32px] bg-[#003C46] text-white">
                <h2 className="text-2xl font-bold mb-4">Fortsatt lav hastighet?</h2>
                <p className="text-[#E6F7FA] mb-8 leading-relaxed">
                  Hvis testen viser lavere hastighet enn forventet selv med kabel, hjelper vi deg gjerne videre. 
                  Ta et skjermbilde av testen og kontakt oss.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link 
                    href="/kontakt-oss"
                    className="px-6 py-3 rounded-xl bg-[#FF8278] text-white font-bold hover:bg-[#FF6B60] transition-colors"
                  >
                    Kontakt kundeservice
                  </Link>
                  <Link 
                    href="/wifi"
                    className="px-6 py-3 rounded-xl border border-[#E6F7FA]/30 text-[#E6F7FA] font-bold hover:bg-white/10 transition-colors"
                  >
                    Tips til bedre Wi-Fi
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
