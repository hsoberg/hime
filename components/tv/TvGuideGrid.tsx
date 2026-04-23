"use client";

import { useEffect, useState, useMemo } from "react";
import { Play, Clock, ChevronRight, Tv, Calendar, Search, X } from "lucide-react";
import { ChannelSchedule, Program } from "@/lib/epg/epgService";

const CATEGORIES = ["Alle", "Grunnpakke", "Nordiske", "Dokumentar", "Nyheter", "Barn", "Musikk"];

const ProgramModal = ({ program, channelName, onClose }: { program: Program, channelName: string, onClose: () => void }) => {
  if (!program) return null;

  const start = new Date(program.start).toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" });
  const end = new Date(program.end).toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-xl w-full overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
        {/* Header with Gradient */}
        <div className="relative h-40 bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 p-8 flex items-end">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="space-y-2">
            <div className="flex gap-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                {program.category}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest backdrop-blur-md">
                {channelName}
              </span>
            </div>
            <h2 className="text-3xl font-extrabold text-white leading-tight drop-shadow-sm">{program.title}</h2>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-2xl font-bold text-slate-700">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>{start} — {end}</span>
            </div>
            <div className="h-1.5 w-1.5 rounded-full bg-slate-300" />
            <div className="text-slate-400 font-medium italic">
              {new Date(program.start) < new Date() && new Date(program.end) > new Date() ? "Sender nå" : "Kommende"}
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Om programmet</h4>
            <p className="text-slate-600 leading-relaxed text-lg font-medium">
              {program.description}
            </p>
          </div>
          
          <div className="mt-10 pt-8 border-t border-slate-100">
            <button 
              onClick={onClose}
              className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-extrabold text-lg hover:bg-indigo-600 transition-all active:scale-[0.98] shadow-xl shadow-indigo-100"
            >
              Lukk oversikt
            </button>
          </div>
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
  const [selectedProgram, setSelectedProgram] = useState<{program: Program, channelName: string} | null>(null);

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
      <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-slate-200 p-6 md:p-8 shadow-xl shadow-slate-200/40 sticky top-24 z-40">
        <div className="flex flex-col lg:flex-row gap-8 justify-between items-center">
          {/* Date Picker */}
          <div className="flex gap-3 overflow-x-auto pb-2 lg:pb-0 no-scrollbar w-full lg:w-auto">
            {dates.map((d) => (
              <button
                key={d.value}
                onClick={() => setSelectedDate(d.value)}
                className={`flex flex-col items-center justify-center min-w-[90px] h-20 rounded-[1.5rem] transition-all duration-300 ${
                  selectedDate === d.value 
                    ? "bg-slate-900 text-white shadow-2xl shadow-slate-400 scale-105" 
                    : "bg-slate-50 text-slate-500 hover:bg-slate-100 border border-transparent hover:border-slate-200"
                }`}
              >
                <span className="text-[10px] font-bold uppercase tracking-wider mb-1 opacity-70">{d.label.split(' ')[0]}</span>
                <span className="text-base font-extrabold">{d.label.split(' ').slice(1).join(' ')}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            {/* Search */}
            <div className="relative flex-1 sm:min-w-[400px]">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Søk i kanaler eller programmer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-5 bg-slate-50 border-none rounded-[1.5rem] text-lg font-medium focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-300"
              />
            </div>
            {/* Category Filter */}
            <div className="relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-auto bg-slate-900 text-white rounded-[1.5rem] pl-6 pr-12 py-5 text-base font-bold focus:ring-2 focus:ring-indigo-500/20 appearance-none cursor-pointer hover:bg-indigo-600 transition-colors"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronRight className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Channel Schedule List */}
      {loading ? (
        <div className="space-y-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-44 rounded-[2.5rem] bg-slate-100 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredChannels.length > 0 ? (
            filteredChannels.map((channel) => (
              <ChannelRow 
                key={channel.id} 
                channel={channel} 
                onProgramClick={(p) => setSelectedProgram({ program: p, channelName: channel.name })}
                isToday={selectedDate === new Date().toISOString().split('T')[0]} 
              />
            ))
          ) : (
            <div className="py-32 text-center bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
              <Tv className="w-20 h-20 text-slate-100 mx-auto mb-6" />
              <h3 className="text-2xl font-extrabold text-slate-900">Ingen treff på søket ditt</h3>
              <p className="text-slate-400 mt-2">Prøv å søke på noe annet, eller sjekk en annen kategori.</p>
            </div>
          )}
        </div>
      )}

      {selectedProgram && (
        <ProgramModal 
          program={selectedProgram.program} 
          channelName={selectedProgram.channelName}
          onClose={() => setSelectedProgram(null)} 
        />
      )}
    </div>
  );
}

function ChannelRow({ channel, onProgramClick, isToday }: { channel: ChannelSchedule; onProgramClick: (p: Program) => void; isToday: boolean }) {
  // Find current program if it's today
  const currentProgram = useMemo(() => {
    const now = new Date();
    const program = channel.programs.find(p => {
      const start = new Date(p.start);
      const end = new Date(p.end);
      return now >= start && now < end;
    });
    return program || (isToday ? null : channel.programs[0]);
  }, [channel.programs, isToday]);

  const progress = useMemo(() => {
    if (!currentProgram || !isToday) return 0;
    const now = new Date().getTime();
    const start = new Date(currentProgram.start).getTime();
    const end = new Date(currentProgram.end).getTime();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  }, [currentProgram, isToday]);

  const formatTime = (iso: string) => {
    return new Date(iso).toLocaleTimeString("no-NO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div 
      onClick={() => currentProgram && onProgramClick(currentProgram)}
      className="group bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden transition-all hover:border-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer active:scale-[0.99]"
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center gap-10">
        {/* Channel Info - Massive Premium Logo Area */}
        <div className="w-full md:w-56 shrink-0 flex justify-center">
          <div className="w-40 h-24 bg-slate-50 rounded-[2rem] p-6 flex items-center justify-center border border-slate-100 shadow-sm group-hover:bg-white group-hover:shadow-lg transition-all duration-300">
            {channel.logo ? (
              <img src={channel.logo} alt={channel.name} className="max-h-full max-w-full object-contain filter drop-shadow-sm transition-transform group-hover:scale-110" />
            ) : (
              <span className="text-xs font-black text-slate-300 uppercase tracking-tighter">{channel.name}</span>
            )}
          </div>
        </div>

        {/* Current Program Details */}
        <div className="flex-1 min-w-0 w-full text-center md:text-left">
          {currentProgram ? (
            <>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                {isToday && progress > 0 && (
                  <span className="flex items-center gap-1.5 text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600" />
                    Sender nå
                  </span>
                )}
                <span className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  {formatTime(currentProgram.start)} — {formatTime(currentProgram.end)}
                </span>
              </div>
              
              <h4 className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 mb-4">
                {currentProgram.title}
              </h4>

              {isToday && progress > 0 ? (
                <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="absolute top-0 left-0 h-full bg-indigo-600 transition-all duration-1000 ease-linear rounded-full shadow-[0_0_15px_rgba(79,70,229,0.4)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              ) : (
                <p className="text-slate-400 font-medium italic line-clamp-1">
                  {currentProgram.description}
                </p>
              )}
            </>
          ) : (
            <p className="text-slate-400 italic">Ingen sendinger funnet</p>
          )}
        </div>

        {/* View Details Hint */}
        <div className="hidden lg:flex items-center gap-3 text-slate-300 group-hover:text-indigo-600 transition-colors">
          <span className="text-sm font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">Detaljer</span>
          <div className="w-14 h-14 rounded-full border-2 border-slate-100 flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-50 transition-all">
            <ChevronRight className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
}
