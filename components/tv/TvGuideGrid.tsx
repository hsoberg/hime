"use client";

import { useEffect, useState, useMemo } from "react";
import { Play, Clock, ChevronRight, Tv, Calendar, Search } from "lucide-react";
import { ChannelSchedule, Program } from "@/lib/epg/epgService";

const CATEGORIES = ["Alle", "Grunnpakke", "Nordiske", "Dokumentar", "Nyheter", "Barn", "Musikk"];

export function TvGuideGrid() {
  const [channels, setChannels] = useState<ChannelSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchQuery, setSearchQuery] = useState("");

  // Generate next 7 days for the date picker
  const dates = useMemo(() => {
    const arr = [];
    const now = new Date();
    for (let i = 0; i < 7; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      arr.push({
        label: i === 0 ? "I dag" : i === 1 ? "I morgen" : d.toLocaleDateString("no-NO", { weekday: 'short', day: 'numeric', month: 'short' }),
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

    // Auto-refresh every 60 seconds to update progress bars and live status
    const interval = setInterval(() => {
      fetchGuide();
    }, 60000);

    return () => clearInterval(interval);
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
    <div className="space-y-8">
      {/* Date & Category Controls */}
      <div className="bg-white rounded-3xl border border-slate-200 p-4 md:p-6 shadow-sm sticky top-24 z-30">
        <div className="flex flex-col lg:flex-row gap-6 justify-between">
          {/* Date Picker */}
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar">
            {dates.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`flex flex-col items-center justify-center min-w-[80px] h-16 rounded-2xl transition-all ${
                  selectedDate === d.value 
                    ? "bg-dark text-white shadow-lg shadow-dark/20" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider mb-1">{d.label.split(' ')[0]}</span>
                <span className="text-sm font-bold">{d.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 sm:min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Søk i kanaler eller programmer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
            {/* Category Filter */}
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-slate-50 border-none rounded-2xl px-4 py-3 text-sm font-bold text-dark focus:ring-2 focus:ring-primary/20 appearance-none min-w-[140px]"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Channel Schedule List */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-32 rounded-3xl bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <ChannelRow 
                key={channel.id} 
                channel={channel} 
                isToday={selectedDate === new Date().toISOString().split('T')[0]} 
                searchQuery={searchQuery}
              />
            ))
          ) : (
            <div className="py-20 text-center">
              <Tv className="w-12 h-12 text-slate-200 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900">Ingen treff</h3>
              <p className="text-slate-500">Prøv å søke på noe annet, f.eks. "Dagsrevyen" eller "Sport".</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ChannelRow({ channel, isToday, searchQuery }: { channel: ChannelSchedule; isToday: boolean; searchQuery: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // If searching, prioritize showing the matching program
  const matchingProgram = useMemo(() => {
    if (!searchQuery) return null;
    const q = searchQuery.toLowerCase();
    return channel.programs.find(p => p.title.toLowerCase().includes(q));
  }, [channel.programs, searchQuery]);

  // Find current program if it's today
  const currentProgram = useMemo(() => {
    if (!isToday) return channel.programs[0];
    const now = new Date();
    return channel.programs.find(p => {
      const start = new Date(p.start);
      const end = new Date(p.end);
      return now >= start && now < end;
    });
  }, [channel.programs, isToday]);

  // The program to feature in the row
  const featuredProgram = matchingProgram || currentProgram || channel.programs[0];

  const nextPrograms = useMemo(() => {
    if (!featuredProgram) return channel.programs.slice(0, 3);
    const idx = channel.programs.indexOf(featuredProgram);
    return channel.programs.slice(idx + 1, idx + 4);
  }, [channel.programs, featuredProgram]);

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isLive = (p: Program) => {
    const now = new Date();
    return now >= new Date(p.start) && now < new Date(p.end) && isToday;
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden transition-all hover:border-primary/30">
      <div className="p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-8">
        {/* Channel Info - Even Larger Logo */}
        <div className="flex items-center gap-4 w-full md:w-56 shrink-0">
          <div className="w-32 h-20 bg-slate-50 rounded-[2rem] p-4 flex items-center justify-center border border-slate-100 shadow-sm group-hover:shadow-md transition-all">
            {channel.logo ? (
              <img src={channel.logo} alt={channel.name} className="max-h-full max-w-full object-contain" title={channel.name} />
            ) : (
              <div className="flex flex-col items-center">
                <Tv className="w-6 h-6 text-slate-300" />
                <span className="text-[9px] font-bold text-slate-400 mt-1">{channel.name}</span>
              </div>
            )}
          </div>
          <div className="md:hidden">
            <h3 className="font-bold text-slate-900 leading-tight">{channel.name}</h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{channel.category}</span>
          </div>
        </div>

        {/* Featured Program */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {featuredProgram && isLive(featuredProgram) && (
              <span className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                Live
              </span>
            )}
            {matchingProgram && !isLive(matchingProgram) && (
              <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                Treff
              </span>
            )}
            <span className="text-xs font-bold text-slate-500">
              {featuredProgram ? `${formatTime(featuredProgram.start)} - ${formatTime(featuredProgram.end)}` : ""}
            </span>
          </div>
          <h4 className="text-xl md:text-2xl font-extrabold text-dark line-clamp-1">
            {featuredProgram?.title || "Ingen sending"}
          </h4>
          <p className="text-sm md:text-base text-slate-500 line-clamp-1 mt-0.5">
            {featuredProgram?.description}
          </p>
        </div>

        {/* Action / Next Preview */}
        <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
          <div className="hidden xl:flex items-center gap-8 text-xs text-slate-400 mr-6">
            {nextPrograms.map((p, i) => (
              <div key={i} className="max-w-[140px]">
                <p className="font-bold text-slate-600 line-clamp-1">{p.title}</p>
                <p>{formatTime(p.start)}</p>
              </div>
            ))}
          </div>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full md:w-auto px-8 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
              isExpanded ? "bg-dark text-white" : "bg-slate-100 text-dark hover:bg-slate-200"
            }`}
          >
            {isExpanded ? "Lukk" : "Program"}
            <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
          </button>
        </div>
      </div>

      {/* Expanded View: Full Day Schedule */}
      {isExpanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 md:p-8">
          <div className="max-w-4xl mx-auto space-y-1">
            <h5 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4" /> Programoversikt for hele dagen
            </h5>
            <div className="grid gap-2">
              {channel.programs.map((p, i) => (
                <div 
                  key={i} 
                  className={`flex items-start gap-6 p-4 rounded-2xl border transition-all ${
                    isToday && new Date() >= new Date(p.start) && new Date() < new Date(p.end)
                      ? "bg-white border-primary/20 shadow-sm ring-1 ring-primary/10"
                      : "bg-white/50 border-transparent hover:bg-white hover:border-slate-200"
                  }`}
                >
                  <div className="w-20 shrink-0">
                    <p className="text-sm font-bold text-slate-900">{formatTime(p.start)}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{formatTime(p.end)}</p>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <p className="font-bold text-slate-900">{p.title}</p>
                      {isToday && new Date() >= new Date(p.start) && new Date() < new Date(p.end) && (
                        <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase">Sender nå</span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">{p.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
