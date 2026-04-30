import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { getOperatingNotices, type OperatingNotice } from "@/lib/operatingNotices";

function normalizeText(value?: string) {
  return value?.replace(/\s+/g, " ").trim() || "";
}

function shortenText(value: string, maxLength = 180) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3).trim()}...`;
}

function getNoticeSummary(notice: OperatingNotice) {
  const latest = notice.messages[0];
  const latestMessage = shortenText(normalizeText(latest?.message));
  const status = normalizeText(latest?.type.text || notice.type.text);

  if (latestMessage) {
    return `${notice.name}: ${latestMessage}`;
  }

  if (status) {
    return `${notice.name}: ${status}`;
  }

  return notice.name;
}

export async function OperatingNoticeBanner() {
  const data = await getOperatingNotices();
  const activeNotices = data?.active || [];

  if (activeNotices.length === 0) {
    return null;
  }

  const summaries = activeNotices.map(getNoticeSummary);
  const ariaLabel = `${activeNotices.length} aktiv${
    activeNotices.length === 1 ? "" : "e"
  } driftsmelding${activeNotices.length === 1 ? "" : "er"}: ${summaries.join(" ")}`;

  return (
    <Link
      href="/driftsmeldinger"
      aria-label={`${ariaLabel}. Se driftsmeldinger.`}
      className="group relative z-40 flex min-h-10 items-center overflow-hidden border-b border-amber-200/70 bg-amber-50 text-dark shadow-sm"
    >
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <span className="inline-flex shrink-0 items-center gap-2 rounded-pill bg-amber-500 px-3 py-1 text-[11px] font-extrabold uppercase leading-none text-white">
          <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
          Aktiv driftsmelding
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden whitespace-nowrap text-sm font-semibold text-dark-muted">
          <div className="operating-notice-marquee flex w-max items-center gap-8 pr-8">
            {[0, 1].map((copyIndex) => (
              <span
                key={copyIndex}
                aria-hidden={copyIndex === 1}
                className="flex min-w-full shrink-0 items-center gap-8 pr-8"
              >
                {summaries.map((summary, index) => (
                  <span key={`${copyIndex}-${index}`} className="inline-flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" aria-hidden="true" />
                    {summary}
                  </span>
                ))}
                <span className="text-dark">Se status</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
