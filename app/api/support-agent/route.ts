import { NextResponse } from "next/server";
import {
  findSupportAnswer,
  getRelevantSupportKnowledge,
  type SupportKnowledgeItem,
} from "@/lib/supportAgentKnowledge";
import { logSupportAgentEvent } from "@/lib/supportAgentLog";

type RequestBody = {
  question?: string;
};

type LlmResponse = {
  title: string;
  answer: string;
  links: Array<{ label: string; href: string }>;
  confidence: "high" | "medium" | "low";
};

function buildContext(items: SupportKnowledgeItem[]): string {
  return items
    .map((item, index) => {
      const links = (item.links ?? [])
        .map((link) => `- ${link.label}: ${link.href}`)
        .join("\n");

      return [
        `Kilde ${index + 1}: ${item.title}`,
        `Svar: ${item.answer}`,
        `Nokkelord: ${item.keywords.join(", ")}`,
        links ? `Lenker:\n${links}` : "Lenker: Ingen",
      ].join("\n");
    })
    .join("\n\n");
}

function parseJsonObject(value: string): LlmResponse | null {
  try {
    const parsed = JSON.parse(value) as Partial<LlmResponse>;

    if (
      typeof parsed.title !== "string" ||
      typeof parsed.answer !== "string" ||
      !Array.isArray(parsed.links) ||
      (parsed.confidence !== "high" && parsed.confidence !== "medium" && parsed.confidence !== "low")
    ) {
      return null;
    }

    return {
      title: parsed.title,
      answer: parsed.answer,
      links: parsed.links
        .filter((link): link is { label: string; href: string } => {
          return (
            typeof link === "object" &&
            link !== null &&
            typeof link.label === "string" &&
            typeof link.href === "string"
          );
        })
        .slice(0, 3),
      confidence: parsed.confidence,
    };
  } catch {
    return null;
  }
}

async function askOpenAI(question: string, contextItems: SupportKnowledgeItem[]): Promise<LlmResponse | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const knowledgeContext = buildContext(contextItems);

  const system = [
    "Du er en norsk kundeservice-agent for Hime.",
    "Svar kort, konkret og vennlig på norsk med korrekte norske bokstaver (æ, ø, å).",
    "Du MÅ kun bruke informasjon fra KUNNSKAPSGRUNNLAGET.",
    "Hvis svar ikke er tydelig dekket i grunnlaget: si at du er usikker, foreslå kontakt med kundeservice, confidence='low'.",
    "Returner KUN gyldig JSON med feltene: title, answer, links, confidence.",
    "links skal være en liste med {label, href} og bruke kun URL-er som finnes i grunnlaget.",
  ].join(" ");

  const user = [
    `KUNNSKAPSGRUNNLAG:\n${knowledgeContext}`,
    `\n\nKUNDESPØRSMÅL: ${question}`,
    "\n\nJSON-format eksempel:",
    '{"title":"...","answer":"...","links":[{"label":"...","href":"..."}],"confidence":"high"}',
  ].join("\n");

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 9000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        temperature: 0.2,
        messages: [
          { role: "system", content: system },
          { role: "user", content: user },
        ],
        max_tokens: 350,
      }),
    });

    if (!response.ok) return null;

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string | null } }>;
    };

    const content = data.choices?.[0]?.message?.content;
    if (!content) return null;

    return parseJsonObject(content);
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

function fallbackResult(question: string): {
  ok: boolean;
  confidence: "high" | "medium" | "low" | "none";
  answer: string;
  title?: string;
  links: Array<{ label: string; href: string }>;
  suggestions: string[];
  source: string;
} {
  const result = findSupportAnswer(question);

  if (!result.best) {
    return {
      ok: true,
      confidence: "low",
      answer:
        "Jeg fant ikke et helt presist svar enda. Prøv gjerne med noen få ord som beskriver problemet, eller gå videre til kundeservice.",
      links: [{ label: "Kontakt kundeservice", href: "/kontakt-oss" }],
      suggestions: result.suggestions.map((item) => item.title),
      source: "fallback",
    };
  }

  return {
    ok: true,
    confidence: result.confidence,
    answer: result.best.answer,
    title: result.best.title,
    links: result.best.links ?? [],
    suggestions: result.suggestions.map((item) => item.title),
    source: "fallback",
  };
}

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const body = (await request.json()) as RequestBody;
    const question = body.question?.trim() ?? "";

    if (!question) {
      await logSupportAgentEvent({
        source: "bad-request",
        confidence: "none",
        question: "",
        statusCode: 400,
        latencyMs: Date.now() - startedAt,
      });

      return NextResponse.json(
        {
          ok: false,
          message: "Spørsmål mangler.",
        },
        { status: 400 }
      );
    }

    const contextItems = getRelevantSupportKnowledge(question, 4);
    const llm = await askOpenAI(question, contextItems);

    if (llm) {
      await logSupportAgentEvent({
        source: "openai",
        confidence: llm.confidence,
        question,
        title: llm.title,
        suggestions: contextItems.map((item) => item.title),
        statusCode: 200,
        latencyMs: Date.now() - startedAt,
      });

      return NextResponse.json({
        ok: true,
        confidence: llm.confidence,
        title: llm.title,
        answer: llm.answer,
        links: llm.links,
        suggestions: contextItems.map((item) => item.title),
        source: "openai",
      });
    }

    const fallback = fallbackResult(question);

    await logSupportAgentEvent({
      source: "fallback",
      confidence: fallback.confidence,
      question,
      title: fallback.title,
      suggestions: fallback.suggestions,
      statusCode: 200,
      latencyMs: Date.now() - startedAt,
    });

    return NextResponse.json(fallback);
  } catch {
    await logSupportAgentEvent({
      source: "error",
      confidence: "none",
      question: "request-failed",
      statusCode: 500,
      latencyMs: Date.now() - startedAt,
    });

    return NextResponse.json(
      {
        ok: false,
        message: "Noe gikk galt. Prøv igjen om et lite øyeblikk.",
      },
      { status: 500 }
    );
  }
}