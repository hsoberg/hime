"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, User, X, Loader2 } from "lucide-react";

type SupportResponse = {
  ok: boolean;
  confidence?: "high" | "medium" | "low";
  title?: string;
  answer?: string;
  links?: Array<{ label: string; href: string }>;
  message?: string;
};

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  links?: Array<{ label: string; href: string }>;
};

const QUICK_QUESTIONS = [
  "Hvilke kanaler er med i himepakken?",
  "Hvilke tilleggskanaler kan jeg velge?",
  "Hvordan melder jeg flytting?",
  "Hvor finner jeg faktura?",
];

export function SupportAgentBubble() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: "assistant",
      text: "Hei! Jeg er Hime-assistenten. Still et spørsmål, så hjelper jeg deg med svar og riktige lenker.",
    },
  ]);

  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const openIRLChat = () => {
    // @ts-ignore - InaChat is defined by the external script
    const InaChat = customElements.get("ina-chat");
    if (InaChat) {
      // @ts-ignore
      InaChat.open(true);
      setIsOpen(false);
    } else {
      // Fallback: the script is not loaded (likely CORS issues on localhost or adblocker)
      window.location.href = "/kontakt-oss";
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isOpen]);

  async function askSupportAgent(rawQuestion: string) {
    const userText = rawQuestion.trim();
    if (!userText) return;

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        role: "user",
        text: userText,
      },
    ]);

    setIsLoading(true);

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

      const text = data.title ? `${data.title}: ${data.answer ?? ""}` : data.answer ?? "";

      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          text,
          links: data.links,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          text: "Jeg fikk ikke hentet svar akkurat nå. Prøv igjen, eller kontakt kundeservice.",
          links: [{ label: "Kontakt oss", href: "/kontakt-oss" }],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    const current = question;
    setQuestion("");
    await askSupportAgent(current);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 md:bottom-6 md:right-6">
      {isOpen ? (
        <section className="w-[min(94vw,390px)] h-[min(75vh,620px)] rounded-3xl border border-light bg-surface shadow-[0_24px_60px_-28px_rgba(0,60,70,0.45)] overflow-hidden hime-overlay-enter">
          <header className="px-4 py-3 bg-[linear-gradient(135deg,#003C46_0%,#005B67_100%)] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-sm truncate">Hime kundeservice</p>
                <p className="text-xs text-white/80 truncate">Svar fra hjelpesider og FAQ</p>
              </div>
            </div>
            <div className="flex items-center shrink-0">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center shrink-0"
                aria-label="Lukk chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </header>

          <div className="h-[calc(100%-56px)] flex flex-col">
            <div ref={scrollAreaRef} className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-surface-2">
              {messages.map((message) => {
                const fromAssistant = message.role === "assistant";

                return (
                  <article key={message.id} className={`flex ${fromAssistant ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[90%] rounded-2xl px-3 py-2 border ${
                        fromAssistant
                          ? "bg-surface border-light text-dark"
                          : "bg-primary-light border-primary/20 text-dark"
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      {message.links?.length ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {message.links.map((link) => {
                            const isExternal = link.href.startsWith("http");
                            return (
                              <Link
                                key={`${message.id}-${link.href}`}
                                href={link.href}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noreferrer" : undefined}
                                className="rounded-full px-2.5 py-1 text-xs font-medium bg-teal-light text-dark border border-teal/30 hover:border-teal transition-colors"
                              >
                                {link.label}
                              </Link>
                            );
                          })}
                        </div>
                      ) : null}
                      <div className="mt-1.5 text-[10px] opacity-70 flex items-center gap-1">
                        {fromAssistant ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        <span>{fromAssistant ? "Hime-assistent" : "Du"}</span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="border-t border-light bg-surface p-3">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                <button
                  type="button"
                  onClick={openIRLChat}
                  className="shrink-0 rounded-full bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] px-3 py-1 text-xs font-bold text-dark shadow-sm hover:brightness-110 transition-all"
                >
                  Snakk med et menneske 👤
                </button>
                {QUICK_QUESTIONS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setQuestion(prompt)}
                    className="shrink-0 rounded-full border border-light bg-surface-2 px-2.5 py-1 text-xs text-dark hover:border-teal/40 hover:bg-teal-light transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <form onSubmit={onSubmit} className="flex items-center gap-2">
                <input
                  value={question}
                  onChange={(event) => setQuestion(event.target.value)}
                  type="text"
                  placeholder="Skriv spørsmålet ditt..."
                  className="flex-1 rounded-xl border border-light px-3 py-2 text-sm text-dark focus:outline-none focus:ring-2 focus:ring-teal/40"
                />
                <button
                  type="submit"
                  disabled={isLoading || question.trim().length < 2}
                  className="w-10 h-10 shrink-0 rounded-xl bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] text-white flex items-center justify-center disabled:opacity-55"
                  aria-label="Send melding"
                >
                  {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </section>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="hime-panel-enter rounded-full pl-4 pr-5 py-3 bg-[linear-gradient(135deg,#003C46_0%,#005B67_100%)] text-white shadow-[0_14px_36px_-18px_rgba(0,60,70,0.55)] border border-white/15 flex items-center gap-2.5 hover:-translate-y-px transition-transform"
        >
          <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
            <MessageCircle className="w-5 h-5" />
          </span>
          <span className="text-sm font-semibold">Hjelp?</span>
        </button>
      )}
    </div>
  );
}