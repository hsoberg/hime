"use client";

import { useEffect, useMemo, useState } from "react";
import { ChannelInfoCard } from "@/components/kanaler/ChannelInfoCard";

type Channel = {
  name: string;
  desc: string;
};

type AddonGroup = {
  heading: string;
  channels: Channel[];
};

type AddonChannelsExplorerProps = {
  groups: AddonGroup[];
  logos: Record<string, string>;
};

export function AddonChannelsExplorer({ groups, logos }: AddonChannelsExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string>("Alle");
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

  const filteredGroups = useMemo(() => {
    const source =
      activeGroup === "Alle"
        ? groups
        : groups.filter((group) => group.heading === activeGroup);

    const q = query.trim().toLowerCase();
    if (!q) return source;

    return source
      .map((group) => ({
        ...group,
        channels: group.channels.filter(
          (channel) =>
            channel.name.toLowerCase().includes(q) ||
            channel.desc.toLowerCase().includes(q),
        ),
      }))
      .filter((group) => group.channels.length > 0);
  }, [activeGroup, groups, query]);

  const allGroups = ["Alle", ...groups.map((group) => group.heading)];

  const allChannels = useMemo(() => {
    return groups.flatMap((group) => group.channels);
  }, [groups]);

  const recentChannels = useMemo(() => {
    const byName = new Map(allChannels.map((channel) => [channel.name, channel]));
    return recent
      .map((name) => byName.get(name))
      .filter((channel): channel is Channel => Boolean(channel));
  }, [allChannels, recent]);

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
      <div className="sticky top-20 z-20 mb-4 rounded-xl border border-[#E5E7EB] bg-white/95 p-2.5 backdrop-blur">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          type="search"
          placeholder="Sok i tilleggskanaler..."
          className="w-full rounded-lg border border-transparent bg-surface-2 px-3 py-2 text-sm text-dark outline-none ring-primary/40 placeholder:text-dark-muted focus:ring-2"
          aria-label="Sok i tilleggskanaler"
        />
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {allGroups.map((groupName) => {
          const active = groupName === activeGroup;
          return (
            <button
              key={groupName}
              type="button"
              onClick={() => setActiveGroup(groupName)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                active
                  ? "border-dark bg-dark text-white"
                  : "border-[#E5E7EB] bg-white text-dark hover:border-primary"
              }`}
            >
              {groupName}
            </button>
          );
        })}
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
                key={`addon-recent-${ch.name}`}
                name={ch.name}
                description={ch.desc}
                logoSrc={logos[ch.name]}
                onOpen={registerRecent}
              />
            ))}
          </div>
        </div>
      ) : null}

      {filteredGroups.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[#E5E7EB] bg-white p-6 text-center">
          <p className="text-sm font-medium text-dark">Ingen kanaler matcher filtrene.</p>
          <p className="mt-1 text-sm text-dark-muted">Juster soket eller velg en annen kategori.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {filteredGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold text-dark">
                <span className="inline-block h-5 w-1 rounded-full bg-primary" />
                {group.heading}
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.channels.map((ch) => (
                  <ChannelInfoCard
                    key={ch.name}
                    name={ch.name}
                    description={ch.desc}
                    logoSrc={logos[ch.name]}
                    onOpen={registerRecent}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
