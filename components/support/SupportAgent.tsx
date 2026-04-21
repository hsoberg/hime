"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Bot, Send, User, Loader2 } from "lucide-react";

type SupportResponse = {
  ok: boolean;
  confidence?: "high" | "medium" | "low";
  title?: string;
  answer?: string;
  links?: Array<{ label: string; href: string }>;
  suggestions?: string[];
  message?: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: Array<{ label: string; href: string }>;
  confidence?: "high" | "medium" | "low";
};

const PROMPTS = [
  "Internett virker ikke",
  "Hvordan melder jeg flytting?",
  "Hvor finner jeg faktura?",
  "Hvordan logger jeg inn pa Min side?",
];

function confidenceLabel(level?: "high" | "medium" | "low"): string {
  if (level === "high") return "Høy treff";
  if (level === "medium") return "Middels treff";
  return "Lav treff";
}

function confidenceClass(level?: "high" | "medium" | "low"): string {
  if (level === "high") return "bg-[#E6F7FA] text-[#003C46]";
  if (level === "medium") return "bg-[#FFF2EF] text-[#9A4038]";
  return "bg-[#F2F2F2] text-[#4A7080]";
}

export function SupportAgent() {
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      text: "Hei! Jeg er Hime-assistenten. Still et kundesporsmal, sa finner jeg riktig hjelpeside eller kontaktvei.",
    },
  ]);

  const canSend = question.trim().length > 1 && !isLoading;

  const helperText = useMemo(() => {
    if (isLoading) return "Soker i kunnskapsgrunnlaget...";
    return "Tips: skriv kort og konkret, f.eks. 'svart skjerm' eller 'faktura'.";
  }, [isLoading]);

  async function askSupportAgent(rawQuestion: string) {
    const userText = rawQuestion.trim();
    if (!userText) return;

    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        role: "user",
        text: userText,
      },
    ]);

    try {
      const response = await fetch("/api/support-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userText }),
      });

      const data = (await response.json()) as SupportResponse;

      if (!response.ok || !data.ok) {
        throw new Error(data.message ?? "Klarte ikke hente svar.");
      }

      const answerText = data.title ? `${data.title}: ${data.answer ?? ""}` : data.answer ?? "";

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          text: answerText,
          links: data.links,
          confidence: data.confidence,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          text: "Jeg fikk ikke hentet svar akkurat na. Prøv igjen, eller bruk Kontakt oss.",
          links: [{ label: "Kontakt oss", href: "/kontakt-oss" }],
          confidence: "low",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const current = question;
    setQuestion("");
    await askSupportAgent(current);
  }

  return (
    <section className="py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl border border-[#DCE7EA] bg-white shadow-[0_20px_55px_-32px_rgba(0,60,70,0.25)] overflow-hidden">
          <div className="p-6 md:p-8 bg-[linear-gradient(135deg,#003C46_0%,#005B67_100%)] text-white">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Kundeservice-agent</h2>
                <p className="text-white/85 text-sm">Svarer med informasjon fra Hime sine hjelpesider.</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="space-y-4 max-h-90 overflow-y-auto pr-1">
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";

                return (
                  <article
                    key={message.id}
                    className={`rounded-2xl border px-4 py-3 ${
                      isAssistant
                        ? "border-[#DCE7EA] bg-[#FAFCFC]"
                        : "border-[#FFE0DA] bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)]"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                          isAssistant ? "bg-teal-light text-dark" : "bg-white text-[#D94843]"
                        }`}
                      >
                        {isAssistant ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-dark leading-relaxed">{message.text}</p>
                        {message.confidence ? (
                          <span
                            className={`inline-flex mt-3 text-xs px-2.5 py-1 rounded-full ${confidenceClass(message.confidence)}`}
                          >
                            {confidenceLabel(message.confidence)}
                          </span>
                        ) : null}
                        {message.links?.length ? (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.links.map((link) => {
                              const isExternal = link.href.startsWith("http");
                              return (
                                <Link
                                  key={`${message.id}-${link.href}`}
                                  href={link.href}
                                  target={isExternal ? "_blank" : undefined}
                                  rel={isExternal ? "noreferrer" : undefined}
                                  className="inline-flex items-center rounded-full border border-teal/30 bg-teal-light px-3 py-1.5 text-sm text-dark hover:bg-[#d9f3f8] transition-colors"
                                >
                                  {link.label}
                                </Link>
                              );
                            })}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="mt-6">
              <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3">
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  type="text"
                  placeholder="Skriv sporsmalet ditt her..."
                  className="flex-1 rounded-xl border border-[#CBDADD] px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] text-white px-5 py-3 font-semibold disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Send
                </button>
              </form>
              <p className="text-sm text-dark-muted mt-2">{helperText}</p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => {
                    setQuestion(prompt);
                  }}
                  className="rounded-full border border-[#DCE7EA] bg-[#FAFCFC] px-3 py-1.5 text-sm text-dark hover:border-teal/40 hover:bg-teal-light transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}