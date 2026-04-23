"use client";

import { useEffect, useState, useMemo } from "react";
import { Play, Clock, ChevronRight, Tv, Calendar, Search, X, Info, Star } from "lucide-react";
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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20">
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="w-24 h-14 bg-white rounded-2xl border border-slate-200 p-3 flex items-center justify-center shadow-sm">
              {channel.logo ? (
                <img src={channel.logo} alt={channel.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-[10px] font-bold text-slate-400">{channel.name}</span>
              )}
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900">Programoversikt</h2>
              <p className="text-sm text-indigo-600 font-bold uppercase tracking-wider">
                {new Date(date).toLocaleDateString("no-NO", { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-all active:scale-90 shadow-sm"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Scrollable Schedule List */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-4 custom-scrollbar bg-slate-50/30">
          {channel.programs.map((p, i) => (
            <div 
              key={i} 
              className={`group relative flex items-start gap-8 p-6 rounded-3xl border transition-all duration-300 ${
                isLive(p)
                  ? "bg-white border-indigo-200 shadow-xl shadow-indigo-500/5 ring-1 ring-indigo-500/10 scale-[1.02] z-10"
                  : "bg-white/60 border-slate-100 hover:border-slate-300 hover:bg-white hover:shadow-lg"
              }`}
            >
              {isLive(p) && (
                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-12 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]" />
              )}
              
              <div className="w-20 shrink-0 flex flex-col items-center justify-center">
                <p className={`text-lg font-black ${isLive(p) ? "text-indigo-600" : "text-slate-900"}`}>
                  {formatTime(p.start)}
                </p>
                <div className={`text-[10px] font-bold uppercase mt-1 px-2 py-0.5 rounded-full ${isLive(p) ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  {isLive(p) ? "Nå" : "Start"}
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className={`font-black text-xl leading-tight ${isLive(p) ? "text-slate-900" : "text-slate-700"}`}>
                    {p.title}
                  </h4>
                  <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md uppercase tracking-tighter">
                    {p.category}
                  </span>
                </div>
                <p className="text-slate-500 leading-relaxed text-sm md:text-base font-medium">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-6 bg-white border-t border-slate-100 flex items-center justify-center gap-2 text-slate-400">
          <Info className="w-4 h-4" />
          <p className="text-xs font-bold uppercase tracking-widest">Endringer i programmet kan forekomme</p>
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
  const [now, setNow] = useState(new Date());

  // Update "now" every minute to keep progress bars and live status accurate
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const dates = useMemo(() => {
    const arr = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
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
      {/* Search and Navigation Bar */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 p-6 mb-12 shadow-2xl shadow-indigo-900/5 sticky top-24 z-40">
        <div className="flex flex-col xl:flex-row gap-6 items-stretch xl:items-center">
          
          {/* Main Search Input */}
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Hva vil du se på i dag? Søk etter program eller kanal..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-16 pr-6 py-5 bg-slate-50 border-2 border-transparent rounded-3xl text-lg font-bold focus:ring-0 focus:border-indigo-600/20 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Category Filter */}
            <div className="relative min-w-[180px]">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 text-white rounded-3xl pl-6 pr-12 py-5 text-sm font-black focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer hover:bg-slate-800 transition-colors uppercase tracking-widest"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 rotate-90 pointer-events-none" />
            </div>

            {/* Compact Date Picker */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar bg-slate-50 p-2 rounded-3xl border border-slate-100">
              {dates.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setSelectedDate(d.value)}
                  className={`flex flex-col items-center justify-center min-w-[75px] py-3 rounded-2xl transition-all duration-300 ${
                    selectedDate === d.value 
                      ? "bg-white text-indigo-600 shadow-md ring-1 ring-slate-200" 
                      : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
                  }`}
                >
                  <span className="text-[9px] font-black uppercase tracking-tighter mb-0.5">{d.day}</span>
                  <span className="text-sm font-black">{d.date.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Result Count / Status */}
      <div className="mb-8 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
          <h3 className="text-slate-900 font-black uppercase tracking-widest text-xs">
            {searchQuery ? `Søketreff: ${filteredChannels.length} kanaler` : `${selectedCategory}: ${filteredChannels.length} kanaler`}
          </h3>
        </div>
        <p className="text-xs text-slate-400 font-bold italic">Oppdateres automatisk hvert minutt</p>
      </div>

      {/* Channel Grid */}
      {loading ? (
        <div className="grid gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-44 rounded-[3rem] bg-slate-50 animate-pulse border border-slate-100" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 pb-20">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <ChannelRow 
                key={channel.id} 
                channel={channel} 
                now={now}
                searchQuery={searchQuery}
                isToday={selectedDate === new Date().toISOString().split('T')[0]}
                onOpenSchedule={() => setActiveChannel(channel)}
              />
            ))
          ) : (
            <div className="py-40 text-center bg-white rounded-[4rem] border-2 border-dashed border-slate-100">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
                <Search className="w-10 h-10 text-slate-200" />
              </div>
              <h3 className="text-2xl font-black text-slate-900">Vi fant ingen programmer som matchet "{searchQuery}"</h3>
              <p className="text-slate-400 mt-3 max-w-md mx-auto font-medium">Prøv å søke etter generelle termer som "Nyheter", "Sport" eller navnet på en film.</p>
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

function ChannelRow({ channel, now, searchQuery, isToday, onOpenSchedule }: { channel: ChannelSchedule; now: Date; searchQuery: string; isToday: boolean; onOpenSchedule: () => void }) {
  // Find search match if applicable
  const searchMatch = useMemo(() => {
    if (!searchQuery) return null;
    const q = searchQuery.toLowerCase();
    return channel.programs.find(p => p.title.toLowerCase().includes(q));
  }, [channel.programs, searchQuery]);

  // Find current program with MUCH more robust logic
  const currentProgram = useMemo(() => {
    if (!channel.programs || channel.programs.length === 0) return null;
    
    const currentTime = now.getTime();
    
    // 1. Try to find the exact live match
    const liveMatch = channel.programs.find(p => {
      const start = new Date(p.start).getTime();
      const end = new Date(p.end).getTime();
      return currentTime >= start && currentTime < end;
    });

    if (liveMatch) return liveMatch;

    // 2. If it's "Today", and no exact match, find the nearest program
    if (isToday) {
      // Find the first program that hasn't ended yet
      const upcoming = channel.programs.find(p => new Date(p.end).getTime() > currentTime);
      if (upcoming) return upcoming;

      // If all programs have ended, show the last one
      return channel.programs[channel.programs.length - 1];
    }

    // 3. If not today, just show the first one of that day
    return channel.programs[0];
  }, [channel.programs, isToday, now]);

  // Determine what to feature: search match or current program
  const featuredProgram = searchMatch || currentProgram;

  const progress = useMemo(() => {
    if (!featuredProgram || !isToday) return 0;
    const start = new Date(featuredProgram.start).getTime();
    const end = new Date(featuredProgram.end).getTime();
    if (now.getTime() < start || now.getTime() > end) return 0;
    const elapsed = now.getTime() - start;
    return Math.min(100, Math.max(0, (elapsed / (end - start)) * 100));
  }, [featuredProgram, isToday]);

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div 
      onClick={onOpenSchedule}
      className={`group relative bg-white rounded-[3rem] border transition-all duration-500 cursor-pointer overflow-hidden flex flex-col md:flex-row items-stretch ${
        searchMatch 
          ? "border-indigo-600 shadow-2xl shadow-indigo-500/10 scale-[1.01]" 
          : "border-slate-100 hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-200"
      }`}
    >
      {/* Channel Identity Section */}
      <div className={`w-full md:w-60 flex flex-col items-center justify-center p-8 border-b md:border-b-0 md:border-r transition-colors ${searchMatch ? "bg-indigo-50 border-indigo-100" : "bg-slate-50/50 border-slate-100 group-hover:bg-white"}`}>
        <div className="relative w-36 h-20 transition-transform group-hover:scale-110 duration-500">
          {channel.logo ? (
            <img src={channel.logo} alt={channel.name} className="max-h-full max-w-full object-contain filter drop-shadow-sm" />
          ) : (
            <span className="text-sm font-black text-slate-300 uppercase tracking-widest">{channel.name}</span>
          )}
        </div>
        <div className={`mt-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${searchMatch ? "bg-indigo-600 text-white" : "bg-slate-200 text-slate-500"}`}>
          {channel.category}
        </div>
      </div>

      {/* Program Display Section */}
      <div className="flex-1 p-8 md:p-12 relative flex flex-col justify-center">
        {featuredProgram ? (
          <>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              {searchMatch && (
                <span className="flex items-center gap-1.5 text-[10px] font-black text-white bg-indigo-600 px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-indigo-200">
                  <Star className="w-3 h-3 fill-white" />
                  Søketreff
                </span>
              )}
              {progress > 0 && isToday && (
                <span className="flex items-center gap-1.5 text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse border border-red-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                  Sender nå
                </span>
              )}
              <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(featuredProgram.start)} — {formatTime(featuredProgram.end)}</span>
              </div>
            </div>
            
            <h4 className="text-2xl md:text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-all leading-tight mb-4">
              {featuredProgram.title}
            </h4>

            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed line-clamp-2 max-w-3xl mb-6">
              {featuredProgram.description}
            </p>

            {progress > 0 && isToday && (
              <div className="w-full max-w-xl">
                <div className="flex justify-between items-end mb-2">
                  <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Fremdrift</span>
                  <span className="text-[10px] font-black text-slate-400">{Math.round(progress)}% ferdig</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner ring-1 ring-slate-100">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-1000 ease-linear rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center md:items-start text-slate-300">
            <Tv className="w-8 h-8 mb-2 opacity-50" />
            <p className="font-black uppercase tracking-widest text-xs">Ingen aktive sendinger</p>
          </div>
        )}
        
        {/* Floating Interactive Elements */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 group-hover:text-indigo-600 text-slate-300 transition-all duration-500 shadow-sm">
            <ChevronRight className="w-8 h-8 transition-transform group-hover:translate-x-1" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 group-hover:text-indigo-600 transition-colors">Program</span>
        </div>
      </div>
    </div>
  );
}
