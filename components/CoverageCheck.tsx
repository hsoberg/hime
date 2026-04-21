"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { OrderTransition } from "./sections/OrderTransition";
import { useRouter } from "next/navigation";

type AddressSuggestion = {
  id: number;
  tekst: string;
  adressetekst: string;
  representasjonspunkt?: { lat: number; lon: number };
};

type CoverageResult =
  | { status: "covered"; area: string; products: string[] }
  | { status: "not_covered" }
  | { status: "error" };

// Mock coverage check — replace with real API call
function checkCoverage(lat: number, lon: number): CoverageResult {
  // Bounding boxes for covered areas (approximate)
  const coveredAreas: Array<{
    name: string;
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
    products: string[];
  }> = [
    { name: "Modum", minLat: 59.9, maxLat: 60.1, minLon: 9.9, maxLon: 10.2, products: ["Fiber", "Bredbånd", "TV"] },
    { name: "Sigdal", minLat: 59.8, maxLat: 60.2, minLon: 9.5, maxLon: 9.9, products: ["Bredbånd", "TV"] },
    { name: "Krødsherad", minLat: 60.1, maxLat: 60.3, minLon: 9.8, maxLon: 10.1, products: ["Fiber", "TV"] },
    { name: "Nakkerud", minLat: 60.0, maxLat: 60.15, minLon: 10.1, maxLon: 10.25, products: ["Fiber", "Bredbånd"] },
    { name: "Tyristrand", minLat: 60.05, maxLat: 60.2, minLon: 10.0, maxLon: 10.2, products: ["Fiber", "TV"] },
  ];

  for (const area of coveredAreas) {
    if (lat >= area.minLat && lat <= area.maxLat && lon >= area.minLon && lon <= area.maxLon) {
      return { status: "covered", area: area.name, products: area.products };
    }
  }
  return { status: "not_covered" };
}

export function CoverageCheck() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CoverageResult | null>(null);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchSuggestions = useCallback(async (search: string) => {
    if (search.length < 3) {
      setSuggestions([]);
      setOpen(false);
      return;
    }
    try {
      const res = await fetch(
        `/api/order/address-search?query=${encodeURIComponent(search)}`,
        { signal: AbortSignal.timeout(4000) }
      );
      if (!res.ok) return;
      const data = await res.json();
      const items: AddressSuggestion[] = (data.results || []).map(
        (a: Record<string, unknown>) => ({
          id: a.id as number,
          tekst: a.text as string,
          adressetekst: a.sub ? `${a.text}, ${a.sub}` : (a.text as string),
          representasjonspunkt: undefined,
        })
      );
      setSuggestions(items);
      setOpen(items.length > 0);
    } catch {
      // Silently fail — user can still type freely
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => fetchSuggestions(query), 280);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  // Close on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [showTransition, setShowTransition] = useState(false);

  function selectAddress(item: AddressSuggestion) {
    setQuery(item.adressetekst);
    setSuggestions([]);
    setOpen(false);
    setSelectedAddressId(item.id);
    
    // Show success state on the card
    setResult({ status: "covered", area: "ditt område", products: ["Fiber", "TV", "WiFi"] });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    
    // Get the first suggestion if available
    if (suggestions.length > 0) {
      const firstSuggestion = suggestions[0];
      setSelectedAddressId(firstSuggestion.id);
      setQuery(firstSuggestion.adressetekst);
      setSuggestions([]);
      setOpen(false);
    }
    
    setResult({ status: "covered", area: "ditt område", products: ["Fiber", "TV", "WiFi"] });
  }

  function startOrder() {
    setShowTransition(true);
  }

  function handleFinalRedirect() {
    const params = new URLSearchParams();
    if (query) params.append("address", query);
    if (selectedAddressId) params.append("addressId", selectedAddressId.toString());
    window.location.href = `/bestill${params.toString() ? "?" + params.toString() : ""}`;
  }

  function reset() {
    setQuery("");
    setResult(null);
    setSuggestions([]);
    setSelectedAddressId(null);
  }

  return (
    <div ref={containerRef}>
      <OrderTransition 
        isVisible={showTransition} 
        onComplete={handleFinalRedirect} 
      />
      
      {!result ? (
        <form onSubmit={handleSubmit} className="relative" role="search">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setResult(null);
              }}
              placeholder="Skriv inn gateadresse..."
              className="w-full px-4 py-3 pr-32 rounded-xl border border-[#E5E7EB] bg-white text-[#003C46] text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#FF8278] focus:border-transparent"
              autoComplete="off"
              aria-label="Skriv inn gateadresse for dekningssjekk"
              aria-expanded={open}
              aria-autocomplete="list"
              aria-controls="coverage-suggestions"
            />
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[radial-gradient(145%_190%_at_50%_-55%,#ffa79d_0%,#f56f62_45%,#d94843_100%)] text-white text-sm font-medium rounded-lg hover:bg-[#E86560] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? "Sjekker..." : "Sjekk"}
            </button>
          </div>

          {/* Suggestions dropdown */}
          {open && suggestions.length > 0 && (
            <ul
              id="coverage-suggestions"
              role="listbox"
              className="absolute z-50 mt-1 w-full bg-white rounded-xl border border-[#E5E7EB] shadow-lg overflow-hidden"
            >
              {suggestions.map((item, i) => (
                <li
                  key={i}
                  role="option"
                  aria-selected={false}
                  onClick={() => selectAddress(item)}
                  className="px-4 py-3 text-sm text-[#003C46] hover:bg-[#F3F4F6] cursor-pointer border-b border-[#F3F4F6] last:border-0"
                >
                  <span className="text-[#9CA3AF] mr-2" aria-hidden="true">📍</span>
                  {item.adressetekst}
                </li>
              ))}
            </ul>
          )}
        </form>
      ) : (
        <CoverageResult 
          result={result} 
          address={query} 
          onReset={reset} 
          onStartOrder={startOrder} 
        />
      )}
    </div>
  );
}

function CoverageResult({
  result,
  address,
  onReset,
  onStartOrder,
}: {
  result: CoverageResult;
  address: string;
  onReset: () => void;
  onStartOrder: () => void;
}) {
  const areaMaps: Record<string, string> = {
    Modum: "/vikersund_midnight_blue_stylized_map.png",
    Sigdal: "/sigdal_midnight_blue_stylized_map.png",
    Krødsherad: "/kr_dsherad_midnight_blue_stylized_map.png",
    Tyristrand: "/tyristrand_midnight_blue_stylized_map.png",
    Nakkerud: "/vikersund_midnight_blue_stylized_map.png", // Fallback to Vikersund/Modum
  };

  const mapSrc = areaMaps[result.area] || "/vikersund_midnight_blue_stylized_map.png";

  if (result.status === "covered") {
    return (
      <div className="relative overflow-hidden rounded-xl bg-[#E6F7FA] border border-[#99DDE8] p-5">
        {/* Decorative Map Background */}
        <div className="absolute -right-8 -bottom-8 h-32 w-32 opacity-25 grayscale pointer-events-none select-none">
          <Image
            src={mapSrc}
            alt=""
            fill
            className="object-contain"
          />
        </div>

        <div className="relative z-10 flex items-start gap-3">
          <span className="text-[#00A6C1] mt-0.5 flex-shrink-0">
            <CheckCircleIcon />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[#003C46] text-sm">
              Vi dekker {address.split(",")[0]}!
            </p>
            <p className="text-[#00A6C1] text-xs mt-0.5">
              Tilgjengelig i {result.area}: {result.products.join(" · ")}
            </p>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={onStartOrder}
                className="flex-1 text-center px-4 py-2 bg-[#00A6C1] text-white text-sm font-medium rounded-lg hover:bg-[#0090A8] transition-colors"
              >
                Bestill nå
              </button>
              <Link
                href="/produkter-og-priser"
                className="flex-1 text-center px-4 py-2 bg-white border border-[#99DDE8] text-[#003C46] text-sm font-medium rounded-lg hover:bg-[#E6F7FA] transition-colors"
              >
                Se alle produkter
              </Link>
            </div>
          </div>
        </div>
        <button
          onClick={onReset}
          className="mt-3 text-xs text-[#6B7280] hover:underline"
        >
          Sjekk annen adresse
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-[#FFF7ED] border border-[#FED7AA] p-5">
      <div className="flex items-start gap-3">
        <span className="text-[#D97706] mt-0.5 flex-shrink-0">
          <InfoIcon />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-[#92400E] text-sm">
            Vi dekker ikke dette området ennå
          </p>
          <p className="text-[#B45309] text-xs mt-0.5 leading-relaxed">
            Men vi vokser stadig. Registrer deg så varsler vi deg når vi kommer til deg.
          </p>
          <form
            className="mt-4 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const email = (form.elements.namedItem("email") as HTMLInputElement).value;
              // TODO: Send to backend
              alert(`Vi varsler deg på ${email} når vi er klare i ditt område!`);
              form.reset();
            }}
          >
            <input
              type="email"
              name="email"
              required
              placeholder="E-post"
              className="flex-1 px-3 py-2 rounded-lg border border-[#FED7AA] bg-white text-sm placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#D97706]"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-[#D97706] text-white text-sm font-medium rounded-lg hover:bg-[#B45309] transition-colors whitespace-nowrap"
            >
              Varsle meg
            </button>
          </form>
        </div>
      </div>
      <button
        onClick={onReset}
        className="mt-3 text-xs text-[#6B7280] hover:underline"
      >
        Prøv annen adresse
      </button>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
    </svg>
  );
}
