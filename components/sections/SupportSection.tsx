import Link from "next/link";
import { Phone, Wrench, Activity, User } from "lucide-react";
import { Card } from "@/components/ui/Card";

const supportLinks = [
  {
    icon: Phone,
    title: "Ring oss",
    description: "Man–fre 08–19 · Lør 10–14",
    action: "32 78 46 40",
    href: "tel:+4732784640",
    color: "primary",
  },
  {
    icon: Wrench,
    title: "Feilsøk selv",
    description: "Steg-for-steg guider",
    action: "Gå til hjelp",
    href: "/hjelp",
    color: "teal",
  },
  {
    icon: Activity,
    title: "Driftstatus",
    description: "Er det driftsproblemer nå?",
    action: "Se status",
    href: "/kundeservice/driftstatus",
    color: "primary",
  },
  {
    icon: User,
    title: "Min side",
    description: "Faktura, abonnement, innstillinger",
    action: "Logg inn",
    href: "/min-side",
    color: "teal",
  },
];

export function SupportSection() {
  return (
    <section className="py-24 bg-surface-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-label text-primary mb-3">
            Hime Kundeservice
          </p>
          <h2 className="text-h2 md:text-h1">
            Trenger du hjelp?
          </h2>
          <p className="mt-6 text-lead text-dark/70">
            Vi i Hime er her for å hjelpe deg. Som lokal leverandør er vi aldri langt unna når du trenger assistanse.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {supportLinks.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="group block h-full"
            >
              <Card 
                className="h-full border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 overflow-visible"
                padding="md"
              >
                <div className="flex flex-col h-full gap-4">
                  <div className={`h-14 w-14 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300 ${
                    item.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-teal/10 text-teal'
                  }`}>
                    <item.icon size={28} strokeWidth={2} />
                  </div>
                  <div>
                    <h3 className="text-h4 text-dark group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-body-small text-dark/60 mt-1.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 flex items-center text-label text-primary group-hover:gap-2 transition-all">
                    <span>{item.action}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
