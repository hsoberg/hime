import type { Metadata } from "next";
import { HeroSection } from "@/components/sections/HeroSection";
import { DifferentiatorSection } from "@/components/sections/DifferentiatorSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { SupportSection } from "@/components/sections/SupportSection";
import { AktueltSection } from "@/components/sections/AktueltSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTABanner } from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Hime — Lokalt internett og TV i Modum, Sigdal og Krødsherad",
  description:
    "Hime leverer internett og TV i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand. 25 lokale ansatte, familieeid siden 1996. Ring 32 78 46 40.",
  alternates: {
    canonical: "https://hime.no",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://hime.no/#organization",
  name: "Hime",
  legalName: "Modum Kabel-TV AS",
  description:
    "Lokal leverandør av internett og TV i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand. Familieeid og lokalt drevet siden 1996.",
  url: "https://hime.no",
  telephone: "+4732784640",
  email: "post@mktv.no",
  foundingDate: "1996",
  numberOfEmployees: { "@type": "QuantitativeValue", value: 25 },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Eikerveien 33",
    postalCode: "3340",
    addressLocality: "Åmot",
    addressCountry: "NO",
  },
  areaServed: [
    { "@type": "Place", name: "Modum" },
    { "@type": "Place", name: "Sigdal" },
    { "@type": "Place", name: "Krødsherad" },
    { "@type": "Place", name: "Nakkerud" },
    { "@type": "Place", name: "Tyristrand" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  sameAs: [
    "https://www.facebook.com/modumkabeltv",
    "https://www.instagram.com/modumkabeltv",
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <HeroSection />
      <DifferentiatorSection />
      <ProductsSection />
      <TestimonialsSection />
      <SupportSection />
      <AktueltSection />
      <FAQSection />
      <CTABanner />
    </>
  );
}
