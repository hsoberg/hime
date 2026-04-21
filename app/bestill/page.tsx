"use client";

import { useEffect, useMemo, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowRight, Info, MapPin, Search } from "lucide-react";

type AddressResult = {
  id: number;
  text: string;
  sub?: string;
};

function BestillContent() {
  const searchParams = useSearchParams();

  const initialAddress = searchParams.get("address") || "";
  const initialAddressId = Number(searchParams.get("addressId") || "") || null;
  const [address, setAddress] = useState(initialAddress);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(initialAddressId);
  const [query, setQuery] = useState(initialAddress);
  const [results, setResults] = useState<AddressResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const hasSelection = useMemo(() => address.trim().length > 0, [address]);
  const orderPortalUrl = useMemo(() => {
    // Pass address as parameter to mktv.no/bestille
    const params = new URLSearchParams();
    if (address) params.append("q", address);
    if (selectedAddressId) params.append("id", selectedAddressId.toString());
    const queryString = params.toString();
    return `https://mktv.no/bestille${queryString ? "?" + queryString : ""}`;
  }, [address, selectedAddressId]);

  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await fetch(`/api/order/address-search?query=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        const data = (await response.json()) as { results?: AddressResult[] };
        setResults(data.results ?? []);
      } catch {
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 220);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [query]);

  const handleSelectAddress = (result: AddressResult) => {
    setAddress(result.text);
    setSelectedAddressId(result.id);
    setQuery(result.text);
    setResults([]);
  };

  return (
    <main className="min-h-screen bg-surface-2">
      {/* Header section */}
      <section className="bg-dark py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Fullfør din bestilling
          </h1>
          <p className="text-[#9BBDC5] max-w-xl mx-auto">
            Finn adressen din og ga direkte til sikker bestilling hos MKTV.
          </p>
        </div>
      </section>

      {/* Address Bridge / Guidance Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-8 pb-20">
        <div className="mb-6 bg-white rounded-2xl p-6 border border-[#DCDCDC] shadow-xl">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Finn adressen din</p>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-muted" />
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setSelectedAddressId(null);
                setAddress("");
              }}
              placeholder="Sok etter adresse"
              className="w-full h-12 rounded-xl border border-[#DCDCDC] pl-10 pr-3 text-dark font-semibold bg-white"
            />
          </div>
          {isSearching ? (
            <p className="mt-2 text-sm text-dark-muted">Soker...</p>
          ) : null}
          {results.length > 0 ? (
            <div className="mt-3 max-h-64 overflow-auto rounded-xl border border-[#E5E7EB]">
              {results.map((result) => (
                <button
                  key={`${result.id}-${result.text}`}
                  type="button"
                  onClick={() => handleSelectAddress(result)}
                  className="w-full text-left px-4 py-3 hover:bg-surface-2 border-b border-[#F1F1F1] last:border-b-0"
                >
                  <p className="text-sm font-semibold text-dark">{result.text}</p>
                  <p className="text-xs text-dark-muted">{result.sub ?? ""}</p>
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {hasSelection && (
          <div className="mb-6 bg-white rounded-2xl p-6 border-2 border-teal shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-teal-light text-teal flex items-center justify-center shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-teal uppercase tracking-wider mb-1">Valgt adresse</p>
                <h3 className="text-xl font-bold text-dark break-all">{address}</h3>
                {selectedAddressId ? (
                  <p className="text-xs text-dark-muted mt-1 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    Adresse-ID: {selectedAddressId}
                  </p>
                ) : null}
              </div>
            </div>

            {selectedAddressId ? (
              <div className="flex flex-col items-end gap-2">
                <a
                  href={orderPortalUrl}
                  className="inline-flex items-center gap-2 rounded-xl bg-dark px-5 py-3 text-sm font-bold text-white hover:bg-dark-mid"
                >
                  Start sikker bestilling
                  <ArrowRight className="h-4 w-4" />
                </a>
                <a
                  href={orderPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Aapne i ny fane
                </a>
              </div>
            ) : null}
          </div>
        )}

        <div className="bg-white rounded-4xl shadow-xl border border-[#DCDCDC] p-7">
          <p className="text-sm text-dark-muted leading-relaxed">
            Av hensyn til stabilitet og sikkerhet fullfores selve bestillingen hos MKTV. Etter at du velger adresse,
            sender vi deg direkte til riktig bestillingsflyt for den adressen.
          </p>
          {!hasSelection ? (
            <p className="mt-3 text-sm font-semibold text-dark">
              Velg en adresse over for aa fortsette.
            </p>
          ) : null}
          <div className="mt-5">
            <a
              href={orderPortalUrl}
              className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-colors ${
                hasSelection
                  ? "bg-primary text-dark hover:bg-primary-dark"
                  : "pointer-events-none bg-[#E5E7EB] text-dark-muted"
              }`}
            >
              Gaa til bestilling
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 text-center text-dark-muted text-sm italic">
          Problemer med bestillingen? Ring oss pa <a href="tel:32784640" className="text-primary font-bold hover:underline">32 78 46 40</a> sa hjelper vi deg manuelt.
        </div>
      </section>
    </main>
  );
}

export default function BestillPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-2 flex items-center justify-center">Laster...</div>}>
      <BestillContent />
    </Suspense>
  );
}

