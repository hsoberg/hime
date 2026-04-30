"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  PlayCircle,
  RefreshCw,
  ShoppingCart,
} from "lucide-react";
import { ChannelLogo } from "@/components/tv/ChannelLogo";
import type { PremiumGuideHighlight } from "@/lib/epg/premiumHighlights";

const FALLBACK_HIGHLIGHT: PremiumGuideHighlight = {
  packageName: "V Premium",
  packageTag: "Premier League, sport og film",
  price: "649 kr/mnd",
  pitch: "For deg som vil samle Premier League, F1, storfilm og Viaplay-innhold i en pakke.",
  imageSrc: "/premium/football-floodlights.svg",
  imageAlt: "Fotballbane under flomlys",
  visualTone: "football",
  channelName: "V sport 1",
  channelLogo: "https://hime.no/wp-content/uploads/2023/05/V-Sport-1.png",
  programTitle: "Premier League, F1 og storfilm samlet",
  programDescription:
    "Legg til premiuminnhold når du vil ha mer sport og underholdning på toppen av TV-pakken.",
  start: null,
  end: null,
  state: "fallback",
  stateLabel: "Premiumpakke",
  eyebrow: "Premiuminnhold hos Hime",
  ctaLabel: "Legg til på Min side",
  ctaHref: "https://minside.mktv.no/",
  detailsHref: "/produkter-og-priser#tv",
  updatedAt: "1970-01-01T00:00:00.000Z",
  dataSource: "fallback",
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("no-NO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString("no-NO", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function getTimeLabel(highlight: PremiumGuideHighlight) {
  if (!highlight.start || !highlight.end) return "Tilgjengelig nå";

  const start = new Date(highlight.start);
  const today = new Date();
  const sameDay =
    start.getFullYear() === today.getFullYear() &&
    start.getMonth() === today.getMonth() &&
    start.getDate() === today.getDate();

  const dayPrefix = sameDay ? "I dag" : formatDay(highlight.start);

  return `${dayPrefix} ${formatTime(highlight.start)}-${formatTime(highlight.end)}`;
}

function logoSrc(src?: string) {
  if (!src) return undefined;
  if (src.includes("cdn.sportsnext.schibsted.io")) {
    return `/api/vg-live/team-logo?src=${encodeURIComponent(src)}&size=96`;
  }
  if (src.includes("upload.wikimedia.org")) {
    return src;
  }

  return `${src}?rule=clip-96x96`;
}

function packageBenefits(packageName: string) {
  if (packageName.includes("TV 2")) {
    return ["Toppfotball direkte", "Store europeiske kvelder", "Aktiveres på Min side"];
  }

  if (packageName === "V Sport") {
    return ["Mer internasjonal sport", "Fotball, motorsport og golf", "Aktiveres på Min side"];
  }

  return ["Premier League og storkamper", "Sport, F1 og film i samme pakke", "Aktiveres på Min side"];
}

function TeamLogoPair({ highlight }: { highlight: PremiumGuideHighlight }) {
  const teams = highlight.teamLogos?.slice(0, 2) ?? [];

  if (teams.length < 2) return null;

  return (
    <div className="mb-5 grid grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-tight border border-border bg-surface-soft p-3">
      <TeamLogo team={teams[0]} />
      <span className="rounded-full bg-dark px-3 py-1.5 text-[11px] font-extrabold text-white">
        VS
      </span>
      <TeamLogo team={teams[1]} />
    </div>
  );
}

function TeamLogo({ team }: { team: NonNullable<PremiumGuideHighlight["teamLogos"]>[number] }) {
  const src = logoSrc(team.logoUrl);

  return (
    <div className="min-w-0 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-border bg-white p-2 shadow-sm">
        {src ? (
          <img
            src={src}
            alt={`${team.name} logo`}
            className="h-full w-full object-contain"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="text-label font-extrabold text-dark">{team.shortName}</span>
        )}
      </div>
      <p className="mt-2 truncate text-caption font-extrabold text-dark">{team.name}</p>
    </div>
  );
}

export function PremiumGuideSpotlight() {
  const [highlight, setHighlight] = useState<PremiumGuideHighlight>(FALLBACK_HIGHLIGHT);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function fetchHighlight() {
      try {
        const response = await fetch(`/api/epg/premium-highlight?ts=${Date.now()}`, {
          cache: "no-store",
        });

        if (!response.ok) throw new Error("Kunne ikke hente premium-høydepunkt");

        const data = (await response.json()) as PremiumGuideHighlight;
        if (!ignore) {
          setHighlight(data);
          setFailed(false);
        }
      } catch (error) {
        console.error(error);
        if (!ignore) {
          setHighlight(FALLBACK_HIGHLIGHT);
          setFailed(true);
        }
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    fetchHighlight();
    const timer = window.setInterval(fetchHighlight, 60_000);

    return () => {
      ignore = true;
      window.clearInterval(timer);
    };
  }, []);

  const timeLabel = useMemo(() => getTimeLabel(highlight), [highlight]);
  const updatedAt = useMemo(() => formatTime(highlight.updatedAt), [highlight.updatedAt]);
  const benefits = useMemo(() => packageBenefits(highlight.packageName), [highlight.packageName]);

  return (
    <section aria-label="Premium høydepunkt" className="relative z-20 -mt-8 md:-mt-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          aria-live="polite"
          className="relative overflow-hidden rounded-card border border-white/20 bg-dark shadow-2xl shadow-dark/20"
        >
          <img
            src={highlight.imageSrc}
            alt=""
            aria-hidden="true"
            className="absolute inset-y-0 right-0 hidden h-full w-[48%] object-cover opacity-55 lg:block"
            loading="eager"
            decoding="async"
          />
          <div className="absolute inset-0 bg-[linear-gradient(105deg,#003f46_0%,#003f46_44%,rgba(0,63,70,0.86)_62%,rgba(0,63,70,0.24)_100%)]" />
          <div className="absolute inset-x-0 top-0 h-px bg-white/35" />

          <div className="relative grid gap-0 lg:grid-cols-[minmax(0,1fr)_350px]">
            <div className="p-5 text-white sm:p-7 md:p-9">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-tight border border-white/15 bg-white/10 px-3 py-1.5 text-caption font-bold text-white">
                  <CalendarClock className="h-3.5 w-3.5 text-primary" />
                  {timeLabel}
                </span>
                <span className="inline-flex items-center gap-2 rounded-tight border border-white/15 bg-white/10 px-3 py-1.5 text-caption font-bold text-white/75">
                  <RefreshCw className={`h-3.5 w-3.5 text-primary ${loading ? "animate-spin" : ""}`} />
                  {loading
                    ? "Henter"
                    : failed
                      ? "Standardvisning"
                      : `Oppdatert ${updatedAt}`}
                </span>
              </div>

              <div className="mt-7 max-w-2xl">
                <p className="text-caption font-bold uppercase tracking-[0.18em] text-primary">
                  {highlight.eyebrow}
                </p>
                <h2 className="mt-3 text-3xl font-extrabold leading-[1.04] text-white md:text-5xl">
                  {highlight.packageName}
                </h2>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/82">
                  {highlight.pitch}
                </p>
              </div>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex min-h-14 items-center gap-2.5 rounded-tight border border-white/12 bg-white/8 px-3 py-2 text-sm font-semibold text-white"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={highlight.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-tight bg-primary px-5 py-3.5 text-label font-extrabold text-white shadow-lg shadow-primary/25 transition duration-200 ease-out hover:bg-primary-dark active:scale-[0.98]"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Legg til pakken
                </a>
                <Link
                  href={highlight.detailsHref}
                  className="inline-flex items-center justify-center gap-2 rounded-tight border border-white/28 px-5 py-3.5 text-label font-bold text-white transition duration-200 ease-out hover:bg-white hover:text-dark active:scale-[0.98]"
                >
                  Se alle TV-pakker
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <aside className="border-t border-white/10 bg-white p-5 text-dark sm:p-7 lg:border-l lg:border-t-0">
              <div className="flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-caption font-bold uppercase tracking-widest text-primary">
                      Fra
                    </p>
                    <p className="mt-1 text-4xl font-extrabold tracking-tight text-dark">
                      {highlight.price}
                    </p>
                  </div>
                  <div className="flex h-12 w-20 items-center justify-center rounded-tight border border-border bg-white p-2 shadow-sm">
                    <ChannelLogo
                      name={highlight.channelName}
                      src={highlight.channelLogo}
                      className="text-[9px]"
                    />
                  </div>
                </div>

                <div className="my-6 h-px bg-border" />

                <TeamLogoPair highlight={highlight} />

                <div className="flex gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-tight bg-dark text-white">
                    <PlayCircle className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-caption font-bold uppercase tracking-widest text-dark-muted">
                      Aktuelt innhold
                    </p>
                    <h3 className="mt-1 text-xl font-extrabold leading-tight text-dark">
                      {highlight.programTitle}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-body-small leading-relaxed text-dark-muted">
                      {highlight.programDescription}
                    </p>
                    <p className="mt-3 text-caption font-bold text-dark-muted">
                      {highlight.channelName} · {timeLabel}
                    </p>
                  </div>
                </div>

                <a
                  href={highlight.ctaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-tight bg-dark px-5 py-3.5 text-label font-extrabold text-white transition duration-200 ease-out hover:bg-teal active:scale-[0.98] lg:mt-auto"
                >
                  Bestill på Min side
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
