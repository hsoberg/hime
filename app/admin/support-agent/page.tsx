import type { Metadata } from "next";
import {
  getSupportAgentStats,
  normalizeSupportAgentStatsHours,
  SUPPORT_AGENT_STATS_WINDOWS,
  type SupportAgentStatsWindowHours,
} from "@/lib/supportAgentStats";

export const metadata: Metadata = {
  title: "Support Agent Dashboard",
  description: "Internt dashboard for kundeservice-agenten.",
};

export const dynamic = "force-dynamic";

type DashboardPageProps = {
  searchParams?: Promise<{
    hours?: string;
  }>;
};

const WINDOW_LABELS: Record<SupportAgentStatsWindowHours, string> = {
  24: "24t",
  168: "7d",
  720: "30d",
};

function cardClass(accent: "teal" | "coral" | "slate" = "slate"): string {
  if (accent === "teal") {
    return "rounded-2xl border border-cyan-200/70 bg-gradient-to-br from-cyan-50 to-white p-5";
  }

  if (accent === "coral") {
    return "rounded-2xl border border-orange-200/70 bg-gradient-to-br from-orange-50 to-white p-5";
  }

  return "rounded-2xl border border-slate-200/80 bg-white p-5";
}

export default async function SupportAgentDashboardPage({ searchParams }: DashboardPageProps) {
  const params = (await searchParams) ?? {};
  const hours = normalizeSupportAgentStatsHours(params.hours, 24);
  const stats = await getSupportAgentStats(hours);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6fbfc_0%,#ffffff_35%)]">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <header className="rounded-3xl border border-slate-200/80 bg-white p-7 md:p-9 shadow-[0_16px_50px_-35px_rgba(0,60,70,0.35)]">
          <div className="flex items-center justify-between gap-4">
            <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-800">
              Intern innsikt
            </p>
            <form action="/api/admin-auth" method="post">
              <input type="hidden" name="action" value="logout" />
              <button
                type="submit"
                className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Logg ut
              </button>
            </form>
          </div>
          <h1 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kundeservice-agent Dashboard
          </h1>
          <p className="mt-3 text-slate-600 max-w-2xl">
            Live oversikt over agent-trafikk de siste {stats.window}, med kvalitet, kilder og responstid.
          </p>
          <p className="mt-4 text-xs text-slate-500">
            Vindu: {new Date(stats.since).toLocaleString("nb-NO")} til {new Date(stats.until).toLocaleString("nb-NO")}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {SUPPORT_AGENT_STATS_WINDOWS.map((windowHours) => {
              const active = windowHours === hours;

              return (
                <a
                  key={windowHours}
                  href={`/admin/support-agent?hours=${windowHours}`}
                  className={
                    active
                      ? "rounded-full border border-cyan-300 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-800"
                      : "rounded-full border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  }
                >
                  {WINDOW_LABELS[windowHours]}
                </a>
              );
            })}
          </div>
          {stats.message ? (
            <p className="mt-4 inline-flex rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
              {stats.message}
            </p>
          ) : null}
        </header>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <article className={cardClass("teal")}>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Totale foresporsler</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totals.requests}</p>
          </article>
          <article className={cardClass("teal")}>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Vellykkede svar</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totals.successful}</p>
          </article>
          <article className={cardClass("coral")}>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Feilede forsok</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.totals.failed}</p>
          </article>
          <article className={cardClass()}>
            <p className="text-xs uppercase tracking-wide text-slate-500 font-semibold">Snitt responstid</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{stats.latency.averageMs} ms</p>
          </article>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Kildefordeling</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>OpenAI</span>
                <span className="font-semibold">
                  {stats.sourceBreakdown.counts.openai} ({stats.sourceBreakdown.percentages.openai}%)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>Fallback</span>
                <span className="font-semibold">
                  {stats.sourceBreakdown.counts.fallback} ({stats.sourceBreakdown.percentages.fallback}%)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>Error</span>
                <span className="font-semibold">
                  {stats.sourceBreakdown.counts.error} ({stats.sourceBreakdown.percentages.error}%)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>Bad request</span>
                <span className="font-semibold">
                  {stats.sourceBreakdown.counts["bad-request"]} ({stats.sourceBreakdown.percentages.badRequest}%)
                </span>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Confidence</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>High</span>
                <span className="font-semibold">
                  {stats.confidenceBreakdown.counts.high} ({stats.confidenceBreakdown.percentages.high}%)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>Medium</span>
                <span className="font-semibold">
                  {stats.confidenceBreakdown.counts.medium} ({stats.confidenceBreakdown.percentages.medium}%)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>Low</span>
                <span className="font-semibold">
                  {stats.confidenceBreakdown.counts.low} ({stats.confidenceBreakdown.percentages.low}%)
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
                <span>None</span>
                <span className="font-semibold">
                  {stats.confidenceBreakdown.counts.none} ({stats.confidenceBreakdown.percentages.none}%)
                </span>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          <section className="rounded-2xl border border-slate-200/80 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Topp tema</h2>
            <ul className="mt-4 space-y-2">
              {stats.topTopics.length === 0 ? (
                <li className="text-sm text-slate-500">Ingen data enda.</li>
              ) : (
                stats.topTopics.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center justify-between rounded-lg border border-slate-100 px-3 py-2 text-sm"
                  >
                    <span className="text-slate-700">{item.title}</span>
                    <span className="font-semibold text-slate-900">{item.count}</span>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200/80 bg-white p-6">
            <h2 className="text-lg font-bold text-slate-900">Topp sporsmal</h2>
            <ul className="mt-4 space-y-2">
              {stats.topQuestions.length === 0 ? (
                <li className="text-sm text-slate-500">Ingen data enda.</li>
              ) : (
                stats.topQuestions.map((item) => (
                  <li
                    key={item.question}
                    className="rounded-lg border border-slate-100 px-3 py-2 text-sm text-slate-700"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="line-clamp-2">{item.question}</span>
                      <span className="font-semibold text-slate-900 shrink-0">{item.count}</span>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </section>
        </div>
      </section>
    </main>
  );
}
