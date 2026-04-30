import type { Metadata } from "next";
import { CheckCircle2, AlertTriangle, Clock, MapPin, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { RefreshStatusButton } from "@/components/support/RefreshStatusButton";
import { getOperatingNotices } from "@/lib/operatingNotices";

export const metadata: Metadata = {
  title: "Driftsmeldinger - Hime",
  description:
    "Folg med pa driftsstatus, planlagt vedlikehold og eventuelle feil i vare tjenester.",
};

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("no-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function statusTone(statusText: string) {
  const normalized = statusText.toLowerCase();

  if (normalized.includes("lost")) {
    return {
      chip: "bg-emerald-50 text-emerald-700",
      rail: "bg-emerald-500",
      label: `Status: ${statusText}`,
    };
  }

  if (normalized.includes("feil")) {
    return {
      chip: "bg-rose-50 text-rose-700",
      rail: "bg-rose-500",
      label: statusText,
    };
  }

  if (normalized.includes("delvis")) {
    return {
      chip: "bg-amber-50 text-amber-700",
      rail: "bg-amber-500",
      label: statusText,
    };
  }

  return {
    chip: "bg-teal-light text-teal",
    rail: "bg-teal",
    label: statusText,
  };
}

export default async function DriftsmeldingerPage() {
  const data = await getOperatingNotices();

  const headerTitle = data?.headerTitle || "Driftsmeldinger";
  const headerText =
    data?.headerText ||
    "Her finner du informasjon om planlagt vedlikehold og eventuelle uforutsette feil i vart nett.";

  const active = data?.active || [];
  const historic = data?.historic || [];

  const notices = [...active, ...historic];
  const currentStatus = active.length > 0 ? "warning" : "operational";

  return (
    <main className="min-h-screen bg-surface-2 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link
          href="/kundeservice"
          className="inline-flex items-center gap-2 text-dark-muted hover:text-primary transition-colors mb-8 group"
        >
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Tilbake til kundeservice
        </Link>

        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-dark mb-4">{headerTitle}</h1>
            <p className="text-dark-muted">{headerText}</p>
          </div>
          <RefreshStatusButton />
        </div>

        <div
          className={`p-8 rounded-4xl flex flex-col md:flex-row items-center gap-6 mb-12 ${
            currentStatus === "operational"
              ? "bg-emerald-50 border border-emerald-100"
              : "bg-amber-50 border border-amber-100"
          }`}
        >
          <div
            className={`w-16 h-16 rounded-full flex items-center justify-center shrink-0 ${
              currentStatus === "operational"
                ? "bg-emerald-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {currentStatus === "operational" ? (
              <CheckCircle2 className="w-10 h-10" />
            ) : (
              <AlertTriangle className="w-10 h-10" />
            )}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl font-bold text-dark">
              {currentStatus === "operational"
                ? "Alle systemer er operative"
                : "Vi opplever for oyeblikket ustabilitet"}
            </h2>
            <p className="text-dark-muted mt-1">
              Sist oppdatert: {new Date().toLocaleString("no-NO")}
            </p>
          </div>

          <span className="flex h-3 w-3 relative">
            <span
              className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                currentStatus === "operational"
                  ? "bg-emerald-400"
                  : "bg-amber-400"
              }`}
            />
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${
                currentStatus === "operational"
                  ? "bg-emerald-500"
                  : "bg-amber-500"
              }`}
            />
          </span>
        </div>

        <div className="space-y-8">
          <h3 className="text-xl font-bold text-dark">Historisk</h3>

          {notices.length === 0 ? (
            <div className="bg-white rounded-3xl p-8 border border-[#DCDCDC]">
              <p className="text-dark-muted">
                Ingen aktive driftsmeldinger akkurat na.
              </p>
            </div>
          ) : (
            notices.map((notice) => {
              const latest = notice.messages[0];
              const tone = statusTone(notice.type.text);

              return (
                <div
                  key={notice.uuid}
                  className="bg-white rounded-3xl p-8 border border-[#DCDCDC] relative overflow-hidden"
                >
                  <div className={`absolute top-0 left-0 w-2 h-full ${tone.rail}`} />

                  <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${tone.chip}`}
                        >
                          {tone.label}
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-dark">{notice.name}</h4>
                    </div>

                    <div className="flex items-center gap-2 text-dark-muted text-sm font-medium whitespace-nowrap">
                      <Clock className="w-4 h-4" />
                      {formatDate(notice.created)}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3 text-dark-muted">
                      <MapPin className="w-5 h-5 shrink-0 text-primary" />
                      <div>
                        <p className="font-bold text-dark text-sm">Omrade</p>
                        <p className="text-sm">{notice.name}</p>
                      </div>
                    </div>

                    {latest?.time ? (
                      <div className="flex items-start gap-3 text-dark-muted">
                        <Clock className="w-5 h-5 shrink-0 text-primary" />
                        <div>
                          <p className="font-bold text-dark text-sm">Siste oppdatering</p>
                          <p className="text-sm">{latest.time}</p>
                        </div>
                      </div>
                    ) : null}

                    <div className="pt-2 space-y-3">
                      {notice.messages.map((entry) => (
                        <div key={`${notice.uuid}-${entry.time}`} className="rounded-xl bg-surface-2 p-4">
                          <p className="text-xs font-semibold uppercase tracking-wide text-dark-muted mb-2">
                            {entry.type.text} • {entry.time}
                          </p>
                          <p className="text-dark-muted leading-relaxed whitespace-pre-line">
                            {entry.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="mt-16 p-10 rounded-4xl bg-dark text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Opplever du feil som ikke star her?</h2>
          <p className="text-[#9BBDC5] mb-8 max-w-lg mx-auto">
            Sjekk vare hjelpesider for enkel feilsoking, eller kontakt oss direkte slik
            at vi kan undersoke saken sa fort som mulig.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/kundeservice/internett"
              className="px-8 py-3 rounded-xl border border-white/20 hover:bg-white/10 transition-colors"
            >
              Feilsoking internett
            </Link>
            <Link
              href="/kontakt-oss"
              className="px-8 py-3 rounded-xl bg-primary text-dark font-bold hover:bg-primary-dark transition-colors"
            >
              Meld feil
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
