import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kontakt oss - Hime",
  description:
    "Kontakt Hime kundeservice i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand. Ring 32 78 46 40 eller send e-post til post@mktv.no.",
  alternates: {
    canonical: "https://hime.no/kontakt-oss",
  },
  openGraph: {
    title: "Kontakt oss | Hime",
    description:
      "Kontakt lokal kundeservice i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand. Ring 32 78 46 40.",
    url: "https://hime.no/kontakt-oss",
    siteName: "Hime",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kontakt oss | Hime",
    description:
      "Kontakt lokal kundeservice i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand. Ring 32 78 46 40.",
  },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Kontakt oss - Hime",
  url: "https://hime.no/kontakt-oss",
  about: {
    "@type": "Organization",
    name: "Hime",
    url: "https://hime.no",
    telephone: "+4732784640",
    email: "post@mktv.no",
    areaServed: ["Modum", "Sigdal", "Krødsherad", "Nakkerud", "Tyristrand"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: "+4732784640",
        email: "post@mktv.no",
        areaServed: "NO",
        availableLanguage: ["nb", "no"],
      },
    ],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Hjem",
      item: "https://hime.no/",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Kontakt oss",
      item: "https://hime.no/kontakt-oss",
    },
  ],
};

export default function KontaktOssPage() {
  return (
    <main className="min-h-screen bg-surface-2">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* Hero Header */}
      <section className="relative overflow-hidden bg-cover bg-center py-16 md:py-24 bg-[url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')]">
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Vi er her for å hjelpe deg</h1>
          <p className="text-lg text-slate-100 max-w-2xl mx-auto">
            Hime er din lokale leverandør. Enten du har spørsmål om faktura, trenger teknisk hjelp eller vil bestille nye tjenester, er vi kun en telefon eller e-post unna.
          </p>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-16 md:py-24 -mt-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Phone Card */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#DCDCDC] shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)] text-primary flex items-center justify-center mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-dark mb-2">Ring oss</h2>
              <p className="text-dark-muted mb-6 text-sm">Snakk direkte med en lokalkjent ansatt.</p>
              <a href="tel:32784640" className="text-3xl font-extrabold text-primary mb-8 hover:scale-105 transition-transform">32 78 46 40</a>
              
              <div className="w-full pt-8 border-t border-light-50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-dark-muted">Mandag – fredag:</span>
                  <span className="font-bold text-dark">08:00 – 19:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-dark-muted">Lørdag:</span>
                  <span className="font-bold text-dark">10:00 – 14:00</span>
                </div>
                <div className="pt-4">
                  <p className="text-[10px] font-bold text-dark-muted uppercase tracking-widest mb-1">Vakttelefon (kun v/feil)</p>
                  <a href="tel:31900611" className="text-lg font-bold text-dark">31 90 06 11</a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#DCDCDC] shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-teal-light text-teal flex items-center justify-center mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-dark mb-2">E-post</h2>
              <p className="text-dark-muted mb-6 text-sm">Send oss dine spørsmål når det passer deg.</p>
              <a href="mailto:post@mktv.no" className="text-xl font-extrabold text-teal mb-8 break-all">post@mktv.no</a>
              
              <div className="w-full pt-8 border-t border-light-50 text-sm text-dark-muted leading-relaxed">
                Vi behandler alle e-poster fortløpende og svarer normalt innen én arbeidsdag.
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-[#DCDCDC] shadow-sm flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-light-50 text-dark flex items-center justify-center mb-6">
                <MapPin className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-dark mb-2">Besøk oss</h2>
              <p className="text-dark-muted mb-6 text-sm">Du er alltid velkommen til en hyggelig prat.</p>
              <div className="text-dark font-bold mb-8 italic">
                Eikerveien 33<br />3340 Åmot
              </div>
              
              <div className="w-full pt-8 border-t border-light-50 text-sm text-dark-muted flex flex-col gap-4">
                <p>Besøk vårt kundesenter for personlig hjelp, henting av utstyr eller en kopp kaffe.</p>
                <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    className="inline-flex items-center justify-center gap-2 font-bold text-primary hover:underline"
                >
                    Se veibeskrivelse <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Simple Form Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark">Send oss en melding</h2>
            <p className="text-dark-muted mt-2">Fyll ut skjemaet under, så kontakter vi deg så snart vi kan.</p>
          </div>
          
          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">Navn</label>
                <input type="text" className="w-full px-5 py-3 rounded-xl border border-[#DCDCDC] focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Ditt navn" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-dark">Mobilnummer</label>
                <input type="tel" className="w-full px-5 py-3 rounded-xl border border-[#DCDCDC] focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Ditt nummer" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">E-post</label>
              <input type="email" className="w-full px-5 py-3 rounded-xl border border-[#DCDCDC] focus:ring-2 focus:ring-primary outline-none transition-all" placeholder="Din e-post" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Hva gjelder henvendelsen?</label>
              <select className="w-full px-5 py-3 rounded-xl border border-[#DCDCDC] focus:ring-2 focus:ring-primary outline-none transition-all bg-white">
                <option>Velg emne</option>
                <option>Teknisk hjelp</option>
                <option>Faktura og betaling</option>
                <option>Bestilling av nye tjenester</option>
                <option>Flytting og oppsigelse</option>
                <option>Annet</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-dark">Melding</label>
              <textarea rows={5} className="w-full px-5 py-3 rounded-xl border border-[#DCDCDC] focus:ring-2 focus:ring-primary outline-none transition-all resize-none" placeholder="Skriv din melding her..."></textarea>
            </div>
            
            <button className="w-full py-4 rounded-xl bg-dark text-white font-bold text-lg hover:bg-dark-mid transition-all shadow-lg hover:shadow-dark/20">
              Send melding
            </button>
            <p className="text-[10px] text-center text-dark-muted">
              Ved å sende inn skjemaet samtykker du til at vi behandler dine opplysninger i tråd med våre personvernregler.
            </p>
          </form>
        </div>
      </section>
    </main>
  );
}
