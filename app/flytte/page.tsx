import type { Metadata } from "next";
import { MoveForm } from "@/components/support/MoveForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meld flytting - Hime",
  description: "Skal du flytte? Meld fra til oss her, så hjelper vi deg med å flytte internett og TV-tjenestene dine til din nye adresse.",
};

export default function FlyttePage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9]">
      {/* Hero Section */}
      <section className="bg-[#003C46] py-16 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link 
            href="/kundeservice"
            className="inline-flex items-center gap-2 text-[#E6F7FA] hover:text-[#FF8278] transition-colors mb-8 group"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Tilbake til kundeservice
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Meld flytting</h1>
          <p className="text-lg text-[#E6F7FA] max-w-2xl mx-auto">
            Husk å melde fra i god tid, slik at vi kan koble opp tjenestene dine på den nye adressen din før du flytter inn.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 -mt-10 mb-20 relative z-10">
        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-[#003C46]/5 p-8 md:p-12">
           <MoveForm />
        </div>
      </div>
    </main>
  );
}
