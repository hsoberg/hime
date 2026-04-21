import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const allPackages = [
  {
    name: "HIME 100",
    speed: "100 Mbps",
    description: "Passer for vanlig surfing, strømming og mindre husstander.",
    features: ["1-2 personer", "Strømming i HD", "Sosiale medier"],
    price: "599",
    highlight: false,
  },
  {
    name: "HIME 250",
    speed: "250 Mbps",
    description: "Et godt valg for familier som strømmer mye og bruker flere enheter samtidig.",
    features: ["Familier", "Flere enheter", "4K-strømming"],
    price: "699",
    highlight: false,
  },
  {
    name: "HIME 500",
    speed: "500 Mbps",
    description: "For hjem med høyt forbruk, gaming, hjemmekontor og mange aktive enheter.",
    features: ["Gaming", "Hjemmekontor", "Smart-hjem"],
    price: "799",
    highlight: false,
  },
  {
    name: "Himepakken",
    speed: "500 Mbps + TV",
    description: "Vår mest populære pakke med alt du trenger for en komplett hverdag.",
    features: ["26 kanaler inkl.", "Hime 500 inkl.", "Himeboks inkl.", "Hime-appen", "7 dagers arkiv"],
    price: "949",
    highlight: true,
    badge: "Mest valgt",
  },
  {
    name: "HIME 1000",
    speed: "1000 Mbps",
    description: "For deg som vil ha maksimal kapasitet hjemme. Full gigabit opp og ned.",
    features: ["Maks kapasitet", "Profesjonell bruk", "Fremtidssikret"],
    price: "999",
    highlight: false,
  },
];

export function ProductsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <p className="text-label text-primary tracking-widest uppercase mb-3">
            Pakker og priser
          </p>
          <h2 className="text-h2 md:text-h1">
            Velg hastigheten som passer deg
          </h2>
          <p className="mt-4 text-body-base text-dark/60">
            Fleksible pakker med tydelige vilkår.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 items-stretch pt-8">
          {allPackages.map((pkg) => (
            <Card
              key={pkg.name}
              padding="none"
              className={`relative flex flex-col h-full transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-visible ${
                pkg.highlight ? "bg-dark text-white ring-2 ring-primary" : "bg-white border-border text-dark"
              }`}
            >
              {/* Floating Badge */}
              {pkg.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-30">
                  <span className={`${pkg.highlight ? "bg-primary" : "bg-teal"} text-white text-[12px] font-bold px-5 py-1.5 rounded-full shadow-lg whitespace-nowrap uppercase tracking-wider`}>
                    {pkg.badge}
                  </span>
                </div>
              )}

              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-6">
                  <p className="text-label text-primary mb-1 uppercase tracking-tight">
                    {pkg.name}
                  </p>
                  <h3 className="text-h3 font-bold">
                    {pkg.speed}
                  </h3>
                </div>

                <p className={`text-body-small italic mb-8 leading-relaxed ${pkg.highlight ? "text-white/70" : "text-dark/60"}`}>
                  {pkg.description}
                </p>

                <ul className="space-y-4 mb-12">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-body-small font-medium">
                      <span className="text-teal">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-8 border-t border-white/10">
                  <div className="flex items-baseline gap-1 mb-8 whitespace-nowrap">
                    <span className="text-h3 font-bold">Fra {pkg.price} kr</span>
                    <span className={`text-caption ${pkg.highlight ? "text-white/40" : "text-dark/40"}`}>/mnd</span>
                  </div>
                  
                  <Link href="https://mktv.no/bestille">
                    <Button 
                      as="span"
                      variant={pkg.highlight ? "primary" : "secondary"} 
                      className={`w-full font-bold shadow-md ${pkg.highlight ? "" : "text-white"}`}
                    >
                      Bestill
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-caption text-dark/40 max-w-2xl mx-auto">
            Priser gjelder ved tilgjengelig dekning. Endelig pris bekreftes ved bestilling.{" "}
            <Link href="/produkter-og-priser" className="text-primary hover:underline font-bold">
              Se alle detaljer og vilkår →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
