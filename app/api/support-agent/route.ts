import { NextResponse } from "next/server";
import { getAllKnowledgeAsText } from "@/lib/supportAgentKnowledge";
import { logSupportAgentEvent } from "@/lib/supportAgentLog";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

type RequestBody = {
  question?: string; // Legacy support
  messages?: ChatMessage[];
};

type LlmResponse = {
  title: string;
  answer: string;
  links: Array<{ label: string; href: string }>;
  confidence: "high" | "medium" | "low";
};

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

async function askOpenAI(messages: ChatMessage[]): Promise<LlmResponse | null> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
  const knowledgeContext = getAllKnowledgeAsText();

  const system = [
    "Du er en vennlig og hjelpsom norsk kundeservice-agent for Hime.",
    "Du MÅ kun bruke informasjon fra KUNNSKAPSGRUNNLAGET under. Finn svaret basert på hele konteksten og brukerens samtalehistorikk.",
    "Vær spesielt nøyaktig med sportsrettigheter (f.eks. Premier League, Champions League) – bruk kun det som står i grunnlaget.",
    "Hvis informasjonen ikke finnes i grunnlaget, si at du dessverre ikke vet, og foreslå kontakt med kundeservice. Sett confidence='low'.",
    "Returner KUN gyldig JSON med feltene: title, answer, links, confidence.",
    "links skal være en liste med {label, href} og kun bruke URL-er som finnes i grunnlaget.",
    `\n\nKUNNSKAPSGRUNNLAG:\n${knowledgeContext}`,
  ].join("\n");

  const openAiMessages = [
    { role: "system", content: system },
    ...messages.map((m) => ({ role: m.role, content: m.text })),
  ];

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

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
        messages: openAiMessages,
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

export async function POST(request: Request) {
  const startedAt = Date.now();

  try {
    const body = (await request.json()) as RequestBody;
    
    let messages: ChatMessage[] = body.messages ?? [];
    if (messages.length === 0 && body.question) {
      messages = [{ role: "user", text: body.question.trim() }];
    }

    if (messages.length === 0 || !messages[messages.length - 1].text.trim()) {
      await logSupportAgentEvent({
        source: "bad-request",
        confidence: "none",
        question: "",
        statusCode: 400,
        latencyMs: Date.now() - startedAt,
      });

      return NextResponse.json(
        { ok: false, message: "Spørsmål mangler." },
        { status: 400 }
      );
    }

    const currentQuestion = messages[messages.length - 1].text;
    const llm = await askOpenAI(messages);

    if (llm) {
      await logSupportAgentEvent({
        source: "openai",
        confidence: llm.confidence,
        question: currentQuestion,
        title: llm.title,
        statusCode: 200,
        latencyMs: Date.now() - startedAt,
      });

      return NextResponse.json({
        ok: true,
        confidence: llm.confidence,
        title: llm.title,
        answer: llm.answer,
        links: llm.links,
        source: "openai",
      });
    }

    return NextResponse.json({
      ok: true,
      confidence: "low",
      answer: "Jeg får dessverre ikke kontakt med systemet mitt akkurat nå. Prøv igjen om et lite øyeblikk, eller kontakt kundeservice.",
      links: [{ label: "Kontakt oss", href: "/kontakt-oss" }],
      source: "fallback",
    });

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