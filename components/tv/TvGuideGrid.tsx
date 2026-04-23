"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Clock, ChevronRight, Tv } from "lucide-react";
import { ChannelSchedule } from "@/lib/epg/epgService";

export function TvGuideGrid() {
  const [channels, setChannels] = useState<ChannelSchedule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGuide() {
      try {
        const res = await fetch("/api/epg");
        const data = await res.json();
        setChannels(data);
      } catch (error) {
        console.error("Failed to load EPG:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGuide();
    const interval = setInterval(fetchGuide, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-48 rounded-2xl bg-slate-100 animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {channels.map((channel) => (
        <ChannelCard key={channel.id} channel={channel} />
      ))}
    </div>
  );
}

function ChannelCard({ channel }: { channel: ChannelSchedule }) {
  const now = channel.now;
  const next = channel.next;

  if (!now) return null;

  const startTime = new Date(now.start);
  const endTime = new Date(now.end);
  const currentTime = new Date();
  
  const totalDuration = endTime.getTime() - startTime.getTime();
  const elapsed = currentTime.getTime() - startTime.getTime();
  const progress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md hover:border-primary/30">
      {/* Header: Logo and Channel Name */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {channel.logo ? (
            <div className="relative w-12 h-8 bg-slate-50 rounded p-1 flex items-center justify-center">
              <img src={channel.logo} alt={channel.name} className="max-h-full max-w-full object-contain" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
              <Tv className="w-5 h-5 text-slate-400" />
            </div>
          )}
          <span className="font-bold text-slate-900">{channel.name}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          Live
        </div>
      </div>

      {/* Now Playing */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-500 mb-1 flex items-center gap-1.5">
          <Play className="w-3 h-3 fill-current" /> NÅ
        </h3>
        <p className="text-lg font-bold text-slate-900 leading-snug line-clamp-1">
          {now.title}
        </p>
        <div className="flex items-center justify-between mt-2 mb-1 text-xs text-slate-500">
          <span>{formatTime(now.start)}</span>
          <span>{formatTime(now.end)}</span>
        </div>
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Next Program */}
      {next && (
        <div className="pt-4 border-t border-slate-100">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Clock className="w-3 h-3" /> NESTE
          </h3>
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium text-slate-700 line-clamp-1">
              {next.title}
            </p>
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
              {formatTime(next.start)}
            </span>
          </div>
        </div>
      )}

      {/* Hover Action (Visual only for now) */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-2 rounded-full bg-slate-50 text-slate-400 hover:text-primary">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
