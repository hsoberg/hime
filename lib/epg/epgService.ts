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

function generateDaySchedule(channelName: string, date: Date): Program[] {
  const channelCategory = getCategoryMapping(channelName);
  const titles = CATEGORIES[channelCategory] || CATEGORIES["Underholdning"];
  
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
