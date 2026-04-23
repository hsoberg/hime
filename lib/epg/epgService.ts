export type Program = {
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  description?: string;
  image?: string;
  category?: string;
};

export type ChannelSchedule = {
  id: string;
  name: string;
  logo?: string;
  category: string;
  programs: Program[];
};

const CATEGORIES: Record<string, string[]> = {
  "Nyheter": ["Dagsrevyen", "Nyhetene", "Kveldsnytt", "BBC World News", "Global Report", "Debatten", "Urix"],
  "Underholdning": ["Senkveld", "Lindmo", "Mesternes Mester", "Kompani Lauritzen", "Farmen", "71 grader nord", "Exit", "Hver gang vi møtes"],
  "Sport": ["Champions League", "Vinterstudio", "Premier League", "Tippeligaen Live", "Formel 1: Kvalifisering", "Sykkel: Tour de France", "Handball: Eliteserien"],
  "Barn": ["Fantorangen", "Peppa Gris", "Paw Patrol", "Brannmann Sam", "Postmann Pat", "NRK Super", "Disney klassikere"],
  "Dokumentar": ["Brennpunkt", "Planet Earth", "History Uncovered", "Inside the Factory", "Vår utrolige verden", "Folk i Modum"],
};

// Deterministic random generator for consistent mock data
function seedRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (Math.imul(31, h) + seed.charCodeAt(i)) | 0;
  }
  return function() {
    h = (Math.imul(h, 48271) % 2147483647) | 0;
    return (h & 0x7fffffff) / 2147483647;
  };
}

const REAL_PROGRAMS: Record<string, { time: string; title: string; desc: string }[]> = {
  "NRK1": [
    { time: "13:00", title: "NRK Nyheter", desc: "Siste nytt fra NRKs nyhetsredaksjon." },
    { time: "14:00", title: "NRK Nyheter", desc: "Siste nytt fra NRKs nyhetsredaksjon." },
    { time: "15:00", title: "NRK Nyheter 15", desc: "Siste nytt fra NRKs nyhetsredaksjon." },
    { time: "16:00", title: "NRK Nyheter", desc: "Siste nytt fra NRKs nyhetsredaksjon." },
    { time: "17:00", title: "NRK Nyheter", desc: "Siste nytt fra NRKs nyhetsredaksjon." },
    { time: "18:00", title: "Dagsnytt 18", desc: "Dagens viktigste debatter, intervjuer og kommentarer direkte fra radiostudio." },
    { time: "19:00", title: "Dagsrevyen", desc: "Siste nytt fra NRKs nyhetsredaksjon med sport og vær." },
    { time: "19:45", title: "Distriktsnyheter", desc: "Nyheter fra der du bor." },
    { time: "20:00", title: "Hodet over vannet", desc: "Dokumentar om store konsekvenser og vanskelige valg." },
    { time: "21:00", title: "Dagsrevyen 21", desc: "Siste nytt fra NRKs nyhetsredaksjon med sport og vær." },
    { time: "21:20", title: "Debatten", desc: "Fredrik Solvang inviterer til direktesendt debatt om ukas viktigste temaer." },
    { time: "22:15", title: "Det sit i veggane", desc: "Historier om gamle hus og menneskene som bodde der." },
    { time: "23:00", title: "Kveldsnytt", desc: "Siste nytt fra NRKs nyhetsredaksjon med sport og vær." },
    { time: "23:15", title: "Blue Lights", desc: "Belfast-basert politidrama. Selskapet (s3, ep1)." },
  ],
  "TV 2 Direkte": [
    { time: "11:05", title: "God morgen Norge", desc: "Aktualitetsmagasin med gjester, mat og musikk." },
    { time: "15:00", title: "Gull eller gråstein", desc: "Dansk livsstilsprogram om gjenbruk og skatter." },
    { time: "16:00", title: "Nyhetskompaniet", desc: "Nyhetspanel som diskuterer dagens viktigste saker." },
    { time: "17:30", title: "Tid for hage", desc: "Kjersti Bergesen og teamet forvandler uterommet." },
    { time: "18:30", title: "Nyhetene", desc: "Siste nytt fra inn- og utland." },
    { time: "18:50", title: "Været", desc: "Værvarsel for de kommende dagene." },
    { time: "19:00", title: "TV 2 hjelper deg", desc: "Forbrukerprogrammet som gir deg svar." },
    { time: "20:00", title: "Kompani Lauritzen", desc: "Kjendiser utfordres av Dag Otto Lauritzen og Kristian Ødegård." },
    { time: "21:00", title: "Nyhetene", desc: "Siste nytt fra inn- og utland." },
    { time: "21:20", title: "Været", desc: "Værvarsel for de kommende dagene." },
    { time: "21:25", title: "Sporten", desc: "Siste sportsnyheter." },
    { time: "21:40", title: "Bloggerne", desc: "Vi følger norske profiler i deres hverdag." },
  ],
  "TVNorge": [
    { time: "12:50", title: "Alle mot alle", desc: "Jon Almaas og Solveig Kloppen inviterer til quiz-kamp." },
    { time: "13:50", title: "Solveig og Johns dolce villa", desc: "Solveig Kloppen og John Carew pusser opp i Italia." },
    { time: "14:45", title: "Brille", desc: "Eivind Hellstrøm og gjester lærer deg ting du ikke visste." },
    { time: "15:45", title: "Kongen befaler", desc: "Atle Antonsen gir kjendiser absurde oppgaver." },
    { time: "16:50", title: "Two and a Half Men", desc: "Klassisk amerikansk komedieserie." },
    { time: "19:30", title: "Gift ved første blikk", desc: "Norske single matches av eksperter." },
    { time: "20:30", title: "71 grader nord - Team", desc: "Kjendis-duoer kjemper seg gjennom norsk natur." },
  ]
};

function generateDaySchedule(channelName: string, date: Date): Program[] {
  const channelCategory = getCategoryMapping(channelName);
  const titles = CATEGORIES[channelCategory] || CATEGORIES["Underholdning"];
  
  // Use real data if available for today
  const isToday = new Date().toISOString().split('T')[0] === date.toISOString().split('T')[0];
  const realPrograms = isToday ? REAL_PROGRAMS[channelName] : null;

  if (realPrograms) {
    return realPrograms.map((rp, i) => {
      const nextRp = realPrograms[i + 1];
      const start = new Date(date);
      const [h, m] = rp.time.split(':').map(Number);
      start.setHours(h, m, 0, 0);
      
      const end = new Date(start);
      if (nextRp) {
        const [nh, nm] = nextRp.time.split(':').map(Number);
        end.setHours(nh, nm, 0, 0);
      } else {
        end.setHours(end.getHours() + 1);
      }
      
      return {
        title: rp.title,
        start: start.toISOString(),
        end: end.toISOString(),
        category: channelCategory,
        description: rp.desc,
      };
    });
  }

  // Fallback to deterministic generation
  const seed = `${channelName}-${date.toISOString().split('T')[0]}`;
  const random = seedRandom(seed);
  
  const programs: Program[] = [];
  let current = new Date(date);
  current.setHours(0, 0, 0, 0);
  
  const dayEnd = new Date(current);
  dayEnd.setDate(dayEnd.getDate() + 1);
  
  while (current < dayEnd) {
    const title = titles[Math.floor(random() * titles.length)];
    const durationMins = 30 + Math.floor(random() * 3) * 30; // 30, 60, or 90 mins
    
    const start = new Date(current);
    current.setMinutes(current.getMinutes() + durationMins);
    const end = new Date(Math.min(current.getTime(), dayEnd.getTime()));
    
    programs.push({
      title,
      start: start.toISOString(),
      end: end.toISOString(),
      category: channelCategory,
      description: `${title} er et populært program i kategorien ${channelCategory.toLowerCase()}. Denne sendingen starter ${start.toLocaleTimeString("no-NO", { hour: "2-digit", minute: "2-digit" })}.`,
    });
  }
  
  return programs;
}

function getCategoryMapping(name: string): string {
  if (name.includes("NRK1") || name.includes("TV 2 Direkte") || name.includes("TVNorge") || name.includes("TV3")) return "Underholdning";
  if (name.includes("Sport") || name.includes("Eurosport") || name.includes("3+")) return "Sport";
  if (name.includes("News") || name.includes("Nyheter") || name.includes("CNN") || name.includes("Sky")) return "Nyheter";
  if (name.includes("Discovery") || name.includes("National") || name.includes("Nat Geo") || name.includes("Viasat Explore")) return "Dokumentar";
  if (name.includes("Nickelodeon") || name.includes("Super") || name.includes("Nick Jr") || name.includes("Cartoon")) return "Barn";
  return "Underholdning";
}

export async function getFullTvGuide(channels: { name: string; logo?: string; category: string }[], dateStr?: string): Promise<ChannelSchedule[]> {
  const date = dateStr ? new Date(dateStr) : new Date();
  
  return channels.map(ch => ({
    id: ch.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
    name: ch.name,
    logo: ch.logo,
    category: ch.category,
    programs: generateDaySchedule(ch.name, date),
  }));
}
