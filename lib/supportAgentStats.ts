import { readFile } from "node:fs/promises";
import { getSupportAgentLogPath } from "@/lib/supportAgentLog";

type Source = "openai" | "fallback" | "error" | "bad-request";
type Confidence = "high" | "medium" | "low" | "none";

type LogRow = {
  timestamp?: string;
  source?: Source;
  confidence?: Confidence;
  question?: string;
  title?: string;
  statusCode?: number;
  latencyMs?: number;
};

export type SupportAgentStats = {
  window: string;
  since: string;
  until: string;
  totals: {
    requests: number;
    successful: number;
    failed: number;
  };
  sourceBreakdown: {
    counts: Record<Source, number>;
    percentages: {
      openai: number;
      fallback: number;
      error: number;
      badRequest: number;
    };
  };
  confidenceBreakdown: {
    counts: Record<Confidence, number>;
    percentages: {
      high: number;
      medium: number;
      low: number;
      none: number;
    };
  };
  latency: {
    averageMs: number;
  };
  topTopics: Array<{ title: string; count: number }>;
  topQuestions: Array<{ question: string; count: number }>;
  message?: string;
};

export const SUPPORT_AGENT_STATS_WINDOWS = [24, 24 * 7, 24 * 30] as const;

export type SupportAgentStatsWindowHours = (typeof SUPPORT_AGENT_STATS_WINDOWS)[number];

export function normalizeSupportAgentStatsHours(
  value: string | number | null | undefined,
  fallback: SupportAgentStatsWindowHours = 24
): SupportAgentStatsWindowHours {
  const parsed = typeof value === "number" ? value : Number(value ?? "");

  if (!Number.isFinite(parsed)) return fallback;

  if (parsed === 24 || parsed === 24 * 7 || parsed === 24 * 30) {
    return parsed;
  }

  return fallback;
}

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  return null;
}

function toSource(value: unknown): Source | null {
  if (value === "openai" || value === "fallback" || value === "error" || value === "bad-request") {
    return value;
  }
  return null;
}

function toConfidence(value: unknown): Confidence | null {
  if (value === "high" || value === "medium" || value === "low" || value === "none") {
    return value;
  }
  return null;
}

function parseLine(line: string): LogRow | null {
  if (!line.trim()) return null;

  try {
    const parsed = JSON.parse(line) as Record<string, unknown>;
    return {
      timestamp: typeof parsed.timestamp === "string" ? parsed.timestamp : undefined,
      source: toSource(parsed.source) ?? undefined,
      confidence: toConfidence(parsed.confidence) ?? undefined,
      question: typeof parsed.question === "string" ? parsed.question : undefined,
      title: typeof parsed.title === "string" ? parsed.title : undefined,
      statusCode: toNumber(parsed.statusCode) ?? undefined,
      latencyMs: toNumber(parsed.latencyMs) ?? undefined,
    };
  } catch {
    return null;
  }
}

function avg(numbers: number[]): number {
  if (numbers.length === 0) return 0;
  return Math.round((numbers.reduce((sum, value) => sum + value, 0) / numbers.length) * 10) / 10;
}

function pct(part: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((part / total) * 1000) / 10;
}

function emptyStats(now: number, hours: number): SupportAgentStats {
  const since = now - hours * 60 * 60 * 1000;

  return {
    window: `${hours}h`,
    since: new Date(since).toISOString(),
    until: new Date(now).toISOString(),
    message: "No log data found yet.",
    totals: {
      requests: 0,
      successful: 0,
      failed: 0,
    },
    sourceBreakdown: {
      counts: { openai: 0, fallback: 0, error: 0, "bad-request": 0 },
      percentages: { openai: 0, fallback: 0, error: 0, badRequest: 0 },
    },
    confidenceBreakdown: {
      counts: { high: 0, medium: 0, low: 0, none: 0 },
      percentages: { high: 0, medium: 0, low: 0, none: 0 },
    },
    latency: {
      averageMs: 0,
    },
    topTopics: [],
    topQuestions: [],
  };
}

export async function getSupportAgentStats(hours = 24): Promise<SupportAgentStats> {
  const now = Date.now();
  const sinceWindow = now - hours * 60 * 60 * 1000;
  const logPath = getSupportAgentLogPath();

  try {
    const raw = await readFile(logPath, "utf8");
    const rows = raw
      .split("\n")
      .map(parseLine)
      .filter((row): row is LogRow => row !== null);

    const recent = rows.filter((row) => {
      if (!row.timestamp) return false;
      const ts = Date.parse(row.timestamp);
      return Number.isFinite(ts) && ts >= sinceWindow;
    });

    const bySource: Record<Source, number> = {
      openai: 0,
      fallback: 0,
      error: 0,
      "bad-request": 0,
    };

    const byConfidence: Record<Confidence, number> = {
      high: 0,
      medium: 0,
      low: 0,
      none: 0,
    };

    const titleCounts = new Map<string, number>();
    const questionCounts = new Map<string, number>();
    const latencyValues: number[] = [];

    for (const row of recent) {
      if (row.source) bySource[row.source] += 1;
      if (row.confidence) byConfidence[row.confidence] += 1;
      if (row.latencyMs !== undefined) latencyValues.push(row.latencyMs);

      if (row.title) {
        titleCounts.set(row.title, (titleCounts.get(row.title) ?? 0) + 1);
      }

      if (row.question) {
        questionCounts.set(row.question, (questionCounts.get(row.question) ?? 0) + 1);
      }
    }

    const total = recent.length;
    const successful = bySource.openai + bySource.fallback;

    return {
      window: `${hours}h`,
      since: new Date(sinceWindow).toISOString(),
      until: new Date(now).toISOString(),
      totals: {
        requests: total,
        successful,
        failed: bySource.error + bySource["bad-request"],
      },
      sourceBreakdown: {
        counts: bySource,
        percentages: {
          openai: pct(bySource.openai, total),
          fallback: pct(bySource.fallback, total),
          error: pct(bySource.error, total),
          badRequest: pct(bySource["bad-request"], total),
        },
      },
      confidenceBreakdown: {
        counts: byConfidence,
        percentages: {
          high: pct(byConfidence.high, total),
          medium: pct(byConfidence.medium, total),
          low: pct(byConfidence.low, total),
          none: pct(byConfidence.none, total),
        },
      },
      latency: {
        averageMs: avg(latencyValues),
      },
      topTopics: Array.from(titleCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([title, count]) => ({ title, count })),
      topQuestions: Array.from(questionCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([question, count]) => ({ question, count })),
    };
  } catch {
    return emptyStats(now, hours);
  }
}