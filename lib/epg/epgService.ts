import { Program, ChannelSchedule } from './types';

// Mapping from Hime channel names to VG slugs
const CHANNEL_SLUGS: Record<string, string> = {
  "NRK1": "nrk1",
  "TV 2 Direkte": "tv2-direkte",
  "TVNorge": "tvnorge",
  "TV3": "tv3",
  "NRK2": "nrk2",
  "TV 2 Nyheter": "tv2-nyhetskanalen",
  "TV 2 Zebra": "tv2-zebra",
  "NRK3": "nrk3",
  "NRK3 / NRK Super": "nrk3",
  "REX": "max",
  "TV3+": "viasat-4",
  "3+": "viasat-4",
  "FEM": "fem",
  "TLC": "tlc",
  "Eurosport 1": "eurosport-1",
  "Eurosport Norge": "eurosport-norge",
  "V Sport 1": "v-sport-1",
  "National Geographic": "national-geographic",
  "Nat Geo Wild": "national-geographic-wild",
  "History": "history-channel",
  "TV 2 Livsstil": "tv2-livsstil",
  "TV6": "tv6",
  "VOX": "vox",
  "TV 2 Sport 1": "tv2-sport-1",
  "TV 2 Sport 2": "tv2-sport-2",
  "Animal Planet": "animal-planet",
  "Al Jazeera English": "al-jazeera",
  "Al Jazeera": "al-jazeera",
  "BBC Earth": "bbc-earth",
  "BBC Nordic": "bbc-nordic",
  "BBC World News": "bbc-world-news",
  "BBC News": "bbc-world-news",
  "SVT1": "svt1",
  "SVT2": "svt2",
  "TV4": "tv4",
  "DR1": "dr1",
  "DR2": "dr2",
  "TV2 Danmark": "tv2-danmark",
  "DR Ramasjang": "dr-ramasjang",
  "Discovery Channel": "discovery-channel",
  "Investigation Discovery": "investigation-discovery",
  "Discovery Science": "discovery-science",
  "MTV": "mtv",
  "Cartoon Network": "cartoon-network",
  "Nickelodeon": "nickelodeon",
  "Nick Jr.": "nick-jr",
  "CNN International": "cnn",
  "Sky News": "sky-news-international",
  "Sky News International": "sky-news-international",
  "Bloomberg": "bloomberg",
  "CNBC": "cnbc",
  "Viasat Explore": "viasat-explore",
  "Viasat History": "viasat-history",
  "Viasat Nature": "viasat-nature",
  "Travel Channel": "travel-channel",
  "VGTV": "vgtv",
};

const CATEGORIES: Record<string, string[]> = {
  "Underholdning": ["Alle mot alle", "Kongen befaler", "71 grader nord", "Bloggerne", "Kompani Lauritzen", "Hver gang vi møtes", "Lindmo", "Nytt på nytt", "Beat for beat", "MasterChef", "The Voice"],
  "Nyheter": ["Dagsrevyen", "Dagsnytt 18", "Nyhetsmorgen", "Kveldsnytt", "TV 2 Nyhetene", "Distriktsnyheter", "Debatten", "Urix", "CNN Newsroom", "BBC World News"],
  "Sport": ["Eliteserien", "Premier League", "Champions League", "Vintersport", "Hoppuka", "Skiskyting", "Formel 1", "Tour de France", "Håndball-EM", "Golf: PGA Tour", "Tennis: Grand Slam"],
  "Dokumentar": ["Brennpunkt", "Folkeopplysningen", "Planet Earth", "Our Planet", "The Last Dance", "Life on Our Planet", "History 101", "How It's Made", "Air Crash Investigation"],
  "Film": ["The Godfather", "Pulp Fiction", "Inception", "The Dark Knight", "Forrest Gump", "Parasite", "Interstellar", "The Matrix", "Cinema Paradiso", "Fight Club"],
  "Barn": ["Fantorangen", "Supernytt", "Peppa Gris", "Paw Patrol", "Brannmann Sam", "Postmann Pat", "Pysjamasheltene", "Mikkes Klubbhus", "Dora utforskeren"]
};

// In-memory cache for EPG data
const epgCache: Record<string, { data: Program[], timestamp: number }> = {};
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function seedRandom(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  return function() {
    h = Math.imul(31, h) + (h >>> 16) | 0;
    return (h >>> 0) / 4294967296;
  };
}

function getCategoryMapping(name: string): string {
  if (name.includes("Sport") || name.includes("Eurosport") || name.includes("3+")) return "Sport";
  if (name.includes("News") || name.includes("Nyheter") || name.includes("Al Jazeera")) return "Nyheter";
  if (name.includes("Discovery") || name.includes("National") || name.includes("History") || name.includes("Earth")) return "Dokumentar";
  if (name.includes("Nickelodeon") || name.includes("Super") || name.includes("Nick Jr")) return "Barn";
  return "Underholdning";
}

async function fetchRealEpg(channelName: string, date: Date): Promise<Program[] | null> {
  const slug = CHANNEL_SLUGS[channelName];
  if (!slug) return null;

  const dateStr = date.toISOString().split('T')[0];
  const cacheKey = `${channelName}-${dateStr}`;

  if (epgCache[cacheKey] && (Date.now() - epgCache[cacheKey].timestamp < CACHE_TTL)) {
    return epgCache[cacheKey].data;
  }

  try {
    const url = `https://tvguide.vg.no/kanal/${slug}?date=${dateStr}`;
    const res = await fetch(url);
    const text = await res.text();
    
    const match = text.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
    if (!match) return null;

    const json = JSON.parse(match[1]);
    const listings = json.props.pageProps.initialTvSchedule?.listings;

    if (!listings || !Array.isArray(listings)) return null;

    const programs: Program[] = listings.map((item: any) => {
      // Extract title: sometimes it's a string, sometimes an object with a title property
      const title = typeof item.title === 'string' ? item.title : (item.title?.title || "Ukjent program");
      
      // Extract description: favor episode overview if available, fallback to item description
      const description = item.episode?.overview || item.description || "Ingen beskrivelse tilgjengelig.";

      return {
        title: title,
        start: item.startsAt,
        end: item.endsAt,
        category: getCategoryMapping(channelName),
        description: description
      };
    });

    epgCache[cacheKey] = { data: programs, timestamp: Date.now() };
    return programs;
  } catch (error) {
    console.error(`Failed to fetch real EPG for ${channelName}:`, error);
    return null;
  }
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
      description: `${title} er et populært program i kategorien ${channelCategory.toLowerCase()}.`,
    });
  }
  
  return programs;
}

export async function getFullTvGuide(channels: { name: string; logo?: string; category: string }[], dateStr?: string): Promise<ChannelSchedule[]> {
  const date = dateStr ? new Date(dateStr) : new Date();
  
  const results = await Promise.all(channels.map(async (ch) => {
    const realPrograms = await fetchRealEpg(ch.name, date);
    
    return {
      id: ch.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: ch.name,
      logo: ch.logo,
      category: ch.category,
      programs: realPrograms && realPrograms.length > 0 ? realPrograms : generateDaySchedule(ch.name, date),
    };
  }));

  return results;
}
