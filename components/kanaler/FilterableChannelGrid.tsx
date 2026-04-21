"use client";

import { useEffect, useMemo, useState } from "react";
import { ChannelInfoCard } from "@/components/kanaler/ChannelInfoCard";

export type ChannelItem = {
  name: string;
  desc: string;
};

type FilterableChannelGridProps = {
  channels: ChannelItem[];
  logos: Record<string, string>;
  placeholder?: string;
};

export function FilterableChannelGrid({
  channels,
  logos,
  placeholder = "Sok etter kanal...",
}: FilterableChannelGridProps) {
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("hime-recent-channels");
      if (!raw) return;
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) setRecent(parsed.slice(0, 6));
    } catch {
      // Ignore malformed storage data.
    }
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return channels;
    return channels.filter((channel) => {
      return (
        channel.name.toLowerCase().includes(q) ||
        channel.desc.toLowerCase().includes(q)
      );
    });
  }, [channels, query]);

  const recentChannels = useMemo(() => {
    const byName = new Map(channels.map((channel) => [channel.name, channel]));
    return recent
      .map((name) => byName.get(name))
      .filter((channel): channel is ChannelItem => Boolean(channel));
  }, [channels, recent]);

  const registerRecent = (name: string) => {
    setRecent((previous) => {
      const next = [name, ...previous.filter((item) => item !== name)].slice(0, 6);
      localStorage.setItem("hime-recent-channels", JSON.stringify(next));
      return next;
    });
  };

  const clearRecent = () => {
    localStorage.removeItem("hime-recent-channels");
    setRecent([]);
  };

  return (
    <div>
      <div className="mb-4 rounded-xl border border-[#E5E7EB] bg-white p-2.5">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder={placeholder}
          className="w-full rounded-lg border border-transparent bg-surface-2 px-3 py-2 text-sm text-dark outline-none ring-primary/40 placeholder:text-dark-muted focus:ring-2"
          aria-label="Sok i kanaler"
        />
      </div>

      {recentChannels.length > 0 && query.trim() === "" ? (
        <div className="mb-5 rounded-xl border border-[#E5E7EB] bg-primary-light p-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-dark-muted">
              Nylig apnet
            </p>
            <button
              type="button"
              onClick={clearRecent}
              className="rounded-full border border-primary/40 bg-white px-2.5 py-1 text-[11px] font-semibold text-dark hover:border-primary"
            >
              Tøm
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {recentChannels.map((ch) => (
              <ChannelInfoCard
                key={`recent-${ch.name}`}
                name={ch.name}
                description={ch.desc}
                logoSrc={logos[ch.name]}
                onOpen={registerRecent}
              />
            ))}
          </div>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E5E7EB] bg-surface-2 p-6 text-center">
          <p className="text-sm font-medium text-dark">Ingen treff</p>
          <p className="mt-1 text-sm text-dark-muted">
            Prove et annet sokeord for a finne kanal.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((ch) => (
            <ChannelInfoCard
              key={ch.name}
              name={ch.name}
              description={ch.desc}
              logoSrc={logos[ch.name]}
              onOpen={registerRecent}
            />
          ))}
        </div>
      )}
    </div>
  );
}
