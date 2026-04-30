import type { Program, ChannelSchedule } from './types';
export type { Program, ChannelSchedule };

type VgListing = {
  title?: string | {
    title?: string;
    slug?: string;
  };
  slug?: string;
  episode?: {
    overview?: string;
  };
  description?: string;
  startsAt: string;
  endsAt: string;
};

type VgSchedulePayload = {
  props?: {
    pageProps?: {
      initialTvSchedule?: {
        listings?: VgListing[];
      };
    };
  };
};

// Mapping from Hime channel names to VG slugs
const CHANNEL_SLUGS: Record<string, string> = {
  "NRK1": "nrk1",
  "NRK2": "nrk2",
  "NRK3 / NRK Super": "nrk-super",
  "TV 2 Direkte": "tv2",
  "TVNorge": "tv-norge",
  "TV3": "tv3",
  "FEM": "fem",
  "MAX": "max",
  "VOX": "vox",
  "Viasat 4": "viasat4",
  "TV6": "tv6",
  "TV 2 Zebra": "tv2-zebra",
  "TV 2 Livsstil": "tv2-livsstil",
  "TV 2 Sport 1": "tv2-sport-1",
  "TV 2 Sport 2": "tv2-sport-2",
  "TV 2 Nyheter": "tv2-nyhetskanalen",
  "VGTV": "vgtv",
  "Animal Planet": "animal-planet",
  "BBC News": "bbc-world-news",
  "Discovery Channel": "discovery-channel",
  "Nickelodeon": "nickelodeon",
  "Investigation Discovery": "investigation-discovery",
  "TLC": "tlc",
  "Eurosport 1": "eurosport-1",
  "Eurosport Norge": "eurosport-norge",
  "SVT1": "svt1",
  "SVT2": "svt2",
  "TV4": "tv4",
  "TV2 Danmark": "tv2-dk",
  "DR1": "dr1",
  "DR2": "dr2",
  "National Geographic": "national-geographic",
  "Nat Geo Wild": "nat-geo-wild",
  "Viasat Explore": "viasat-explore",
  "Viasat History": "viasat-history",
  "Viasat Nature": "viasat-nature",
  "Discovery Science": "discovery-science",
  "Travel Channel": "travel-channel",
  "MTV": "mtv",
  "Mezzo": "mezzo",
  "Nick Jr.": "nick-jr",
  "Cartoon Network": "cartoon-network",
  "DR Ramasjang": "dr-ramasjang",
  "CNN International": "cnn",
  "Sky News": "sky-news-international",
  "CNBC": "cnbc",
  "Bloomberg": "bloomberg",
  "V sport 1": "v-sport-1",
  "V sport 2": "v-sport-2",
  "V sport 3": "v-sport-3",
  "V sport +": "v-sport-plus",
  "V sport golf": "v-sport-golf",
  "V film premiere": "v-film-premiere",
  "V film action": "v-film-action",
  "V film family": "v-film-family",
  "V film hits": "v-film-hits",
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
    // Add cache-busting and a realistic user agent
    const url = `https://tvguide.vg.no/kanal/${slug}?date=${dateStr}&v=${Date.now()}`;
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      next: { revalidate: 600 }
    });
    
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const text = await res.text();
    
    const match = text.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/);
    if (!match) return null;

    const json = JSON.parse(match[1]) as VgSchedulePayload;
    const listings = json.props?.pageProps?.initialTvSchedule?.listings;

    if (!listings || !Array.isArray(listings)) return null;

    // Filter listings to ensure they cover the requested date
    // We use a generous window to handle timezone offsets and late night programs
    const requestedDate = new Date(date);
    requestedDate.setHours(0, 0, 0, 0);
    
    // Day starts at local 00:00 and ends at local 00:00 next day
    // We allow 4 hours overlap on each side for safety
    const startWindow = new Date(requestedDate.getTime() - 4 * 60 * 60 * 1000);
    const endWindow = new Date(requestedDate.getTime() + 28 * 60 * 60 * 1000);

    const programs: Program[] = listings
      .map((item: VgListing) => {
        const titleObject = typeof item.title === "object" ? item.title : undefined;
        let title = typeof item.title === 'string' ? item.title : (titleObject?.title || "Ukjent program");
        
        // Fix for titles that are just dates
        if (title.match(/\d{2}\.\d{2}\.\d{4}/)) {
          const slugTitle = titleObject?.slug || item.slug;
          if (slugTitle && typeof slugTitle === 'string') {
            title = slugTitle
              .replace(/-/g, ' ')
              .replace(/\d+$/, '')
              .trim()
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');
          } else {
            title = `${channelName} Nyheter`;
          }
        }

        const description = item.episode?.overview || item.description || "Ingen beskrivelse tilgjengelig.";

        return {
          title: title,
          start: item.startsAt,
          end: item.endsAt,
          category: getCategoryMapping(channelName),
          description: description,
          source: "real" as const
        };
      })
      .filter(p => {
        const pStart = new Date(p.start);
        const pEnd = new Date(p.end);
        return pEnd > startWindow && pStart < endWindow;
      });

    if (programs.length === 0) return null;

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
  const current = new Date(date);
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
      source: "fallback",
    });
  }
  
  return programs;
}

export async function getFullTvGuide(channels: { name: string; desc?: string; logo?: string; category: string }[], dateStr?: string): Promise<ChannelSchedule[]> {
  // Ensure we handle date properly, especially for today
  const date = dateStr ? new Date(dateStr) : new Date();
  
  const results = await Promise.all(channels.map(async (ch) => {
    const realPrograms = await fetchRealEpg(ch.name, date);
    
    return {
      id: ch.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name: ch.name,
      logo: ch.logo || "",
      desc: ch.desc || "Ingen beskrivelse.",
      category: ch.category,
      programs: realPrograms && realPrograms.length > 0 ? realPrograms : generateDaySchedule(ch.name, date),
    };
  }));

  return results;
}
