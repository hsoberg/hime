"use client";

import { useEffect, useState, useMemo } from "react";
import { Play, Clock, ChevronRight, Tv, Calendar, Search, X, Info } from "lucide-react";
import { ChannelSchedule, Program } from "@/lib/epg/epgService";
import Image from "next/image";

const CATEGORIES = ["Alle", "Grunnpakke", "Nordiske", "Dokumentar", "Nyheter", "Barn", "Musikk"];

const ChannelScheduleModal = ({ channel, date, onClose }: { channel: ChannelSchedule, date: string, onClose: () => void }) => {
  if (!channel) return null;

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isLive = (p: Program) => {
    const now = new Date();
    const start = new Date(p.start);
    const end = new Date(p.end);
    const isToday = new Date().toISOString().split('T')[0] === date;
    return isToday && now >= start && now < end;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-6">
            <div className="w-20 h-12 bg-white rounded-xl border border-slate-200 p-2 flex items-center justify-center shadow-sm">
              {channel.logo ? (
                <img src={channel.logo} alt={channel.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-[10px] font-bold text-slate-400">{channel.name}</span>
              )}
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Programoversikt</h2>
              <p className="text-sm text-slate-500 font-medium">
                {new Date(date).toLocaleDateString("no-NO", { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Scrollable Schedule List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-3 custom-scrollbar">
          {channel.programs.map((p, i) => (
            <div 
              key={i} 
              className={`group flex items-start gap-6 p-5 rounded-2xl border transition-all ${
                isLive(p)
                  ? "bg-indigo-50/50 border-indigo-200 shadow-sm ring-1 ring-indigo-500/10"
                  : "bg-white border-slate-100 hover:border-slate-300"
              }`}
            >
              <div className="w-16 shrink-0 text-center">
                <p className={`text-sm font-bold ${isLive(p) ? "text-indigo-600" : "text-slate-900"}`}>
                  {formatTime(p.start)}
                </p>
                <div className={`text-[10px] font-bold uppercase mt-1 ${isLive(p) ? "text-indigo-400" : "text-slate-400"}`}>
                  {isLive(p) ? "Nå" : formatTime(p.end)}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className={`font-bold text-lg mb-1 ${isLive(p) ? "text-indigo-900" : "text-slate-900"}`}>
                  {p.title}
                </h4>
                <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 group-hover:line-clamp-none transition-all">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-400 font-medium">Klikk på et program for å lese mer (eller hovre for å se hele teksten)</p>
        </div>
      </div>
    </div>
  );
};

export function TvGuideGrid() {
  const [channels, setChannels] = useState<ChannelSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeChannel, setActiveChannel] = useState<ChannelSchedule | null>(null);

  const dates = useMemo(() => {
    const arr = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      arr.push({
        day: i === 0 ? "I dag" : i === 1 ? "I morgen" : d.toLocaleDateString("no-NO", { weekday: 'short' }),
        date: d.toLocaleDateString("no-NO", { day: 'numeric', month: 'short' }),
        value: d.toISOString().split('T')[0],
      });
    }
    return arr;
  }, []);

  useEffect(() => {
    async function fetchGuide() {
      setLoading(true);
      try {
        const url = `/api/epg?date=${selectedDate}${selectedCategory !== "Alle" ? `&category=${selectedCategory}` : ""}`;
        const res = await fetch(url);
        const data = await res.json();
        setChannels(data);
      } catch (error) {
        console.error("Failed to load EPG:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchGuide();
  }, [selectedDate, selectedCategory]);

  const filteredChannels = useMemo(() => {
    if (!searchQuery) return channels;
    const q = searchQuery.toLowerCase();
    return channels.filter(ch => 
      ch.name.toLowerCase().includes(q) || 
      ch.programs.some(p => p.title.toLowerCase().includes(q))
    );
  }, [channels, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Optimized Header */}
      <div className="bg-white rounded-[2rem] border border-slate-200 p-4 mb-10 shadow-xl shadow-slate-100/50 sticky top-24 z-40">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Compact Date Picker */}
          <div className="flex gap-2 w-full lg:w-auto overflow-x-auto no-scrollbar py-1">
            {dates.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`flex flex-col items-center justify-center min-w-[70px] py-2 rounded-xl transition-all ${
                  selectedDate === d.value 
                    ? "bg-slate-900 text-white shadow-lg" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className="text-[9px] font-bold uppercase opacity-60">{d.day}</span>
                <span className="text-xs font-black">{d.date}</span>
              </button>
            ))}
          </div>

          {/* Search & Category */}
          <div className="flex flex-1 gap-3 w-full">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Søk i kanaler..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 cursor-pointer"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Channel List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 rounded-3xl bg-slate-50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <ChannelRow 
                key={channel.id} 
                channel={channel} 
                isToday={selectedDate === new Date().toISOString().split('T')[0]}
                onOpenSchedule={() => setActiveChannel(channel)}
              />
            ))
          ) : (
            <div className="py-20 text-center">
              <Tv className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <p className="text-slate-400">Ingen treff på søket ditt</p>
            </div>
          )}
        </div>
      )}

      {activeChannel && (
        <ChannelScheduleModal 
          channel={activeChannel} 
          date={selectedDate}
          onClose={() => setActiveChannel(null)} 
        />
      )}
    </div>
  );
}

function ChannelRow({ channel, isToday, onOpenSchedule }: { channel: ChannelSchedule; isToday: boolean; onOpenSchedule: () => void }) {
  const now = new Date();
  const currentProgram = useMemo(() => {
    return channel.programs.find(p => {
      const start = new Date(p.start);
      const end = new Date(p.end);
      return now >= start && now < end;
    }) || (isToday ? null : channel.programs[0]);
  }, [channel.programs, isToday]);

  const progress = useMemo(() => {
    if (!currentProgram || !isToday) return 0;
    const start = new Date(currentProgram.start).getTime();
    const end = new Date(currentProgram.end).getTime();
    const elapsed = now.getTime() - start;
    return Math.min(100, Math.max(0, (elapsed / (end - start)) * 100));
  }, [currentProgram, isToday]);

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div 
      onClick={onOpenSchedule}
      className="group bg-white rounded-[1.5rem] border border-slate-200 hover:border-indigo-500/30 hover:shadow-xl transition-all cursor-pointer overflow-hidden flex flex-col md:flex-row items-stretch"
    >
      {/* Logo Section */}
      <div className="w-full md:w-48 bg-slate-50 flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-100">
        <div className="relative w-28 h-16 transition-transform group-hover:scale-110 duration-300">
          {channel.logo ? (
            <img src={channel.logo} alt={channel.name} className="max-h-full max-w-full object-contain filter drop-shadow-sm" />
          ) : (
            <span className="text-[10px] font-black text-slate-300 uppercase">{channel.name}</span>
          )}
        </div>
      </div>

      {/* Program Info Section */}
      <div className="flex-1 p-6 md:p-8 relative">
        {currentProgram ? (
          <>
            <div className="flex items-center gap-3 mb-2">
              {isToday && progress > 0 && (
                <span className="flex items-center gap-1 text-[10px] font-black text-red-600 uppercase tracking-widest animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-red-600" />
                  Nå
                </span>
              )}
              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-lg">
                {formatTime(currentProgram.start)} — {formatTime(currentProgram.end)}
              </span>
            </div>
            
            <h4 className="text-xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors mb-4">
              {currentProgram.title}
            </h4>

            {isToday && progress > 0 && (
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden w-full">
                <div 
                  className="h-full bg-indigo-600 transition-all duration-1000 ease-linear rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-slate-400 italic">Ingen sending</p>
        )}
        
        {/* Hover Hint */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2 text-indigo-600">
          <span className="text-xs font-bold uppercase tracking-widest">Hele dagen</span>
          <ChevronRight className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
