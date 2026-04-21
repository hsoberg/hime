"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQAccordionProps {
  items: FAQItem[];
  title?: string;
  description?: string;
}

export function FAQAccordion({ items, title, description }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = items.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderAnswer = (answer: string | React.ReactNode) => {
    if (typeof answer !== "string") return answer;

    // Simple markdown link parser: [label](url)
    const parts = answer.split(/(\[.*?\]\(.*?\))/g);
    
    return parts.map((part, i) => {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const [_, label, href] = match;
        const isExternal = href.startsWith("http");

        if (isExternal) {
          return (
            <a 
              key={i} 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#00A6C1] font-semibold hover:underline transition-all"
            >
              {label}
            </a>
          );
        }

        return (
          <Link 
            key={i} 
            href={href} 
            className="text-[#00A6C1] font-semibold hover:underline transition-all"
          >
            {label}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {(title || description) && (
        <div className="text-center mb-10">
          {title && <h2 className="text-3xl font-bold text-[#003C46]">{title}</h2>}
          {description && <p className="mt-4 text-[#4A7080] max-w-2xl mx-auto">{description}</p>}
        </div>
      )}

      {/* Search & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Søk i spørsmål..."
            className="w-full px-4 py-2.5 rounded-xl border border-[#DCDCDC] focus:outline-none focus:ring-2 focus:ring-[#FF8278] transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setOpenIndex(null)}
            className="text-sm font-semibold text-[#FF8278] hover:underline"
          >
            Lukk alle
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredItems.map((item, index) => (
          <div
            key={index}
            className="border border-[#DCDCDC] rounded-2xl overflow-hidden bg-white hover:border-[#FF8278]/50 transition-colors"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-5 flex items-center gap-6 text-left focus:outline-none"
            >
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[radial-gradient(165%_190%_at_50%_-60%,#ffede9_0%,#ffe0da_55%,#ffcfc7_100%)] text-[#FF8278] flex items-center justify-center font-bold text-lg">
                {index + 1}
              </span>
              <span className="flex-1 font-bold text-[#003C46] text-lg">
                {item.question}
              </span>
              <span className="flex-shrink-0 text-[#4A7080] transition-transform duration-300">
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-[#FF8278]" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </span>
            </button>
            <div
              className={`transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="px-6 pb-6 pt-0 ml-16 text-[#4A7080] leading-relaxed whitespace-pre-wrap">
                {renderAnswer(item.answer)}
              </div>
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="text-center py-12 text-[#4A7080]">
            Ingen spørsmål samsvarer med søket ditt.
          </div>
        )}
      </div>
    </div>
  );
}
