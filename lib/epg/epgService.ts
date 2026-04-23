export type Program = {
  title: string;
  start: string; // ISO string
  end: string;   // ISO string
  description?: string;
  image?: string;
};

export type ChannelSchedule = {
  id: string;
  name: string;
  logo?: string;
  now: Program | null;
  next: Program | null;
};

// Map of channel names to realistic program types to generate better mock data
const CATEGORIES: Record<string, string[]> = {
  "Nyheter": ["Dagsrevyen", "Nyhetene", "Kveldsnytt", "BBC World News", "Global Report"],
  "Underholdning": ["Senkveld", "Lindmo", "Mesternes Mester", "Kompani Lauritzen", "Farmen"],
  "Sport": ["Champions League", "Vinterstudio", "Premier League: Match Day", "Tippeligaen Live"],
  "Barn": ["NRK Super", "Fantorangen", "Peppa Gris", "Paw Patrol"],
  "Dokumentar": ["Brennpunkt", "Planet Earth", "History Uncovered", "Inside the Factory"],
};

function getCategoryForChannel(name: string): string {
  if (name.includes("NRK1") || name.includes("TV 2") || name.includes("TVNorge")) return "Underholdning";
  if (name.includes("Sport") || name.includes("Eurosport")) return "Sport";
  if (name.includes("News") || name.includes("Nyheter") || name.includes("BBC")) return "Nyheter";
  if (name.includes("Discovery") || name.includes("National") || name.includes("Animal")) return "Dokumentar";
  if (name.includes("Nickelodeon") || name.includes("Super")) return "Barn";
  return "Underholdning";
}

function generateMockProgram(category: string, isNow: boolean): Program {
  const titles = CATEGORIES[category] || CATEGORIES["Underholdning"];
  const title = titles[Math.floor(Math.random() * titles.length)];
  
  const now = new Date();
  const start = new Date(now);
  if (isNow) {
    start.setMinutes(start.getMinutes() - 20); // Started 20 mins ago
  } else {
    start.setMinutes(start.getMinutes() + 40); // Starts in 40 mins
  }
  
  const end = new Date(start);
  end.setHours(end.getHours() + 1); // 1 hour duration
  
  return {
    title,
    start: start.toISOString(),
    end: end.toISOString(),
    description: `Dette er en spennende episode av ${title} som sendes på denne kanalen.`,
  };
}

export async function getTvGuide(channels: { name: string; logo?: string }[]): Promise<ChannelSchedule[]> {
  // In a real scenario, this would fetch from an EPG API or XMLTV feed.
  // For the demo, we generate high-quality mock data that changes every hour.
  
  return channels.map(ch => {
    const category = getCategoryForChannel(ch.name);
    return {
      id: ch.name.toLowerCase().replace(/\s+/g, "-"),
      name: ch.name,
      logo: ch.logo,
      now: generateMockProgram(category, true),
      next: generateMockProgram(category, false),
    };
  });
}
