import { Card } from "@/components/ui/Card";
import { PhoneCall, Users, MapPin, ShieldCheck } from "lucide-react";

const comparisons = [
  {
    them: "Callsenter med lang ventetid",
    us: "Lokalt kontor — vi svarer telefonen",
    icon: PhoneCall,
    color: "primary",
  },
  {
    them: "Du er kundenummer 847 291",
    us: "Du er naboen vår",
    icon: Users,
    color: "teal",
  },
  {
    them: "Tekniker kommer «om 3–5 virkedager»",
    us: "Vi er i området — ofte neste dag",
    icon: MapPin,
    color: "primary",
  },
  {
    them: "Standardkontrakter med bindingstid",
    us: "Tydelige vilkår uten overraskelser",
    icon: ShieldCheck,
    color: "teal",
  },
];

export function DifferentiatorSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-label text-primary mb-3">
              Hvorfor Hime?
            </p>
            <h2 className="text-h2 md:text-display-l">
              Det er forskjell på en leverandør
              <span className="block text-primary italic">og en nabo.</span>
            </h2>
            <p className="mt-8 text-lead text-dark/70">
              Hos de store nasjonale leverandørene er du én av millioner.
              Vi kjenner området der du bor, fordi vi også bor her.
              Det betyr raskere service, personlig oppfølging og lokalt eierskap.
            </p>
          </div>

          <div className="grid gap-4">
            {comparisons.map((item) => (
              <Card
                key={item.them}
                padding="none"
                className="hover:border-primary/20 transition-all duration-300"
                variant="default"
              >
                <div className="flex items-center gap-5 p-6">
                  <div className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center shadow-sm ${item.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-teal/10 text-teal'
                    }`}>
                    <item.icon size={22} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-body-small text-dark/40 line-through decoration-primary/30">
                      {item.them}
                    </p>
                    <p className="text-body-base font-bold text-dark">
                      {item.us}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
