import type { Metadata } from "next";
import { MoveForm } from "@/components/support/MoveForm";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Skal du flytte? - Hime",
  description: "Meld fra om at du skal flytte og vi ordner alt for deg.",
};

export default function FlyttePage() {
  return (
    <main className="min-h-screen bg-[#F9F9F9] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link 
          href="/kundeservice/abonnement"
          className="inline-flex items-center gap-2 text-[#4A7080] hover:text-[#FF8278] transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Tilbake til abonnement
        </Link>

        <MoveForm />
      </div>
    </main>
  );
}
