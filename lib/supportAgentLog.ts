import { appendFile, mkdir } from "node:fs/promises";
import path from "node:path";

type SupportSource = "openai" | "fallback" | "error" | "bad-request";
type SupportConfidence = "high" | "medium" | "low" | "none";

export type SupportAgentLogEvent = {
  source: SupportSource;
  confidence: SupportConfidence;
  question: string;
  title?: string;
  suggestions?: string[];
  statusCode?: number;
  latencyMs?: number;
};

const DEFAULT_LOG_PATH = path.join(process.cwd(), "scratch", "support-agent-logs.ndjson");

export function getSupportAgentLogPath(): string {
  return process.env.SUPPORT_AGENT_LOG_PATH || DEFAULT_LOG_PATH;
}

function enabled(): boolean {
  const value = (process.env.SUPPORT_AGENT_LOG_ENABLED ?? "true").toLowerCase();
  return value !== "false" && value !== "0" && value !== "no";
}

function clip(value: string, max = 220): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max)}...`;
}

export async function logSupportAgentEvent(event: SupportAgentLogEvent): Promise<void> {
  if (!enabled()) return;

  const logPath = getSupportAgentLogPath();
  const payload = {
    timestamp: new Date().toISOString(),
    source: event.source,
    confidence: event.confidence,
    question: clip(event.question),
    title: event.title ? clip(event.title, 100) : undefined,
    suggestions: event.suggestions?.slice(0, 3),
    statusCode: event.statusCode,
    latencyMs: event.latencyMs,
  };

  try {
    await mkdir(path.dirname(logPath), { recursive: true });
    await appendFile(logPath, `${JSON.stringify(payload)}\n`, "utf8");
  } catch {
    // Logging should never break customer responses.
  }
}