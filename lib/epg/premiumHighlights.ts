import { allChannels, channelLogos, type Channel } from "@/lib/channelData";
import { getFullTvGuide, type ChannelSchedule, type Program } from "@/lib/epg/epgService";
import { getVgLivePremiumMatch, type VgLiveTeamLogo } from "@/lib/sports/vgLive";

type HighlightState = "live" | "soon" | "today" | "weekend" | "fallback";

type PremiumPackageDefinition = {
  name: string;
  tag: string;
  price: string;
  pitch: string;
  channels: string[];
  keywords: string[];
  priority: number;
};

export type PremiumGuideHighlight = {
  packageName: string;
  packageTag: string;
  price: string;
  pitch: string;
  imageSrc: string;
  imageAlt: string;
  visualTone: "football" | "film" | "sport";
  teamLogos?: VgLiveTeamLogo[];
  channelName: string;
  channelLogo: string;
  programTitle: string;
  programDescription: string;
  start: string | null;
  end: string | null;
  state: HighlightState;
  stateLabel: string;
  eyebrow: string;
  ctaLabel: string;
  ctaHref: string;
  detailsHref: string;
  updatedAt: string;
  dataSource: "real" | "vg-live" | "fallback";
};

const PREMIUM_PACKAGES: PremiumPackageDefinition[] = [
  {
    name: "V Premium",
    tag: "Premier League, sport og film",
    price: "649 kr/mnd",
    pitch: "For deg som vil samle Premier League, F1, storfilm og Viaplay-innhold i en pakke.",
    channels: ["V sport 1", "V sport 2", "V sport 3", "V sport +", "V film premiere"],
    keywords: [
      "premier league",
      "pl ",
      "arsenal",
      "aston villa",
      "chelsea",
      "everton",
      "liverpool",
      "manchester",
      "newcastle",
      "tottenham",
      "west ham",
      "fotball",
      "formel 1",
      "f1",
      "grand prix",
      "film",
    ],
    priority: 120,
  },
  {
    name: "TV 2 Sport Premium",
    tag: "Champions League og toppfotball",
    price: "449 kr/mnd",
    pitch: "Få de store europeiske fotballkveldene og internasjonal sport direkte.",
    channels: ["TV 2 Sport 1", "TV 2 Sport 2"],
    keywords: [
      "champions league",
      "la liga",
      "nations league",
      "vm-kvalifisering",
      "em-kvalifisering",
      "fotball",
      "håndball",
    ],
    priority: 95,
  },
  {
    name: "V Sport",
    tag: "Internasjonal sport",
    price: "349 kr/mnd",
    pitch: "Sportspakken for deg som vil ha mer fotball, motorsport, golf, NFL og NHL.",
    channels: ["V sport 1", "V sport 2", "V sport 3", "V sport +", "V sport golf"],
    keywords: [
      "bundesliga",
      "europa league",
      "conference league",
      "formel 1",
      "f1",
      "motogp",
      "nascar",
      "nfl",
      "nhl",
      "golf",
      "fotball",
    ],
    priority: 80,
  },
];

const ORDER_URL = "https://minside.mktv.no/";

const POPULAR_PREMIER_LEAGUE_TEAMS = [
  "arsenal",
  "chelsea",
  "liverpool",
  "manchester city",
  "manchester united",
  "newcastle",
  "tottenham",
  "west ham",
];

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isSameLocalDay(a: Date, b: Date) {
  return localDateKey(a) === localDateKey(b);
}

function isWeekend(date: Date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function getCandidateDateKeys(now: Date) {
  const keys = new Set<string>();

  for (let offset = 0; offset <= 3; offset++) {
    const date = new Date(now);
    date.setDate(now.getDate() + offset);
    keys.add(localDateKey(date));
  }

  return Array.from(keys);
}

function getPromotedChannels(): Channel[] {
  const promotedNames = new Set(PREMIUM_PACKAGES.flatMap((pkg) => pkg.channels));

  return Array.from(promotedNames).map((name) => {
    const channel = allChannels.find((item) => item.name === name);

    return (
      channel ?? {
        name,
        desc: "Premiumpakke",
        category: "Sport",
        logo: channelLogos[name],
      }
    );
  });
}

function stateForProgram(program: Program, now: Date): HighlightState {
  const start = new Date(program.start);
  const end = new Date(program.end);

  if (now >= start && now < end) return "live";
  if (isSameLocalDay(start, now)) return "today";
  if (isWeekend(start)) return "weekend";

  return "soon";
}

function stateLabel(state: HighlightState) {
  switch (state) {
    case "live":
      return "Sender nå";
    case "today":
      return "I dag";
    case "weekend":
      return "Helgen";
    case "soon":
      return "Kommer snart";
    default:
      return "Premiumpakke";
  }
}

function eyebrowForState(state: HighlightState) {
  switch (state) {
    case "live":
      return "Aktuelt på premium akkurat nå";
    case "today":
      return "Dagens premium-høydepunkt";
    case "weekend":
      return "Helgens premium-høydepunkt";
    case "soon":
      return "Neste premium-høydepunkt";
    default:
      return "Premiuminnhold hos Hime";
  }
}

function keywordScore(text: string, keywords: string[]) {
  return keywords.reduce((score, keyword) => {
    return text.includes(keyword.toLowerCase()) ? score + 1 : score;
  }, 0);
}

function isPremierLeagueFootball(text: string) {
  const hasPremierLeague = text.includes("premier league");
  const isDifferentSport =
    text.includes("darts") ||
    text.includes("snooker") ||
    text.includes("cricket") ||
    text.includes("rugby");

  return hasPremierLeague && !isDifferentSport;
}

function popularNorwayMatchScore(text: string) {
  const teamHits = POPULAR_PREMIER_LEAGUE_TEAMS.reduce((hits, team) => {
    return text.includes(team) ? hits + 1 : hits;
  }, 0);

  if (teamHits >= 2) return 3200;
  if (teamHits === 1 && isPremierLeagueFootball(text)) return 1400;

  return 0;
}

function getHighlightVisual(
  packageDefinition: PremiumPackageDefinition,
  channel: ChannelSchedule,
  program?: Program
) {
  const programText = `${channel.name} ${
    program?.title ?? ""
  } ${program?.description ?? ""}`.toLowerCase();
  const packageText = `${packageDefinition.name} ${packageDefinition.tag}`.toLowerCase();

  if (programText.includes("film") || channel.name.toLowerCase().includes("film")) {
    return {
      imageSrc: "/premium/film-premiere.svg",
      imageAlt: "Kino og filmlys",
      visualTone: "film" as const,
    };
  }

  if (
    isPremierLeagueFootball(programText) ||
    programText.includes("fotball") ||
    POPULAR_PREMIER_LEAGUE_TEAMS.some((team) => programText.includes(team)) ||
    (!program && packageText.includes("premier league"))
  ) {
    return {
      imageSrc: "/premium/football-floodlights.svg",
      imageAlt: "Fotballbane under flomlys",
      visualTone: "football" as const,
    };
  }

  return {
    imageSrc: "/premium/sport-arena.svg",
    imageAlt: "Sportsarena under lys",
    visualTone: "sport" as const,
  };
}

function scoreCandidate(
  packageDefinition: PremiumPackageDefinition,
  channel: ChannelSchedule,
  program: Program,
  now: Date
) {
  if (program.source !== "real") return null;

  const start = new Date(program.start);
  const end = new Date(program.end);
  const startTime = start.getTime();
  const endTime = end.getTime();
  const nowTime = now.getTime();
  const horizon = nowTime + 72 * 60 * 60 * 1000;

  if (Number.isNaN(startTime) || Number.isNaN(endTime)) return null;
  if (endTime <= nowTime || startTime > horizon) return null;

  const state = stateForProgram(program, now);
  const haystack = `${program.title} ${program.description} ${channel.name}`.toLowerCase();
  const hits = keywordScore(haystack, packageDefinition.keywords);
  const hoursUntilStart = Math.max(0, (startTime - nowTime) / (60 * 60 * 1000));

  let score = packageDefinition.priority + hits * 450;

  if (state === "live") score += 5000;
  if (state === "today") score += 2600;
  if (state === "weekend") score += 1800;
  if (state === "soon") score += 900;
  if (packageDefinition.name === "V Premium" && isPremierLeagueFootball(haystack)) score += 3500;
  if (packageDefinition.name === "V Premium") score += popularNorwayMatchScore(haystack);
  if (hits === 0 && state !== "live") score -= 500;

  score -= Math.min(hoursUntilStart * 18, 900);

  return { score, state };
}

export async function getPremiumGuideHighlight(now = new Date()): Promise<PremiumGuideHighlight> {
  const vgLiveMatch = await getVgLivePremiumMatch(now);

  if (vgLiveMatch) {
    const vgLiveProgram: Program = {
      title: vgLiveMatch.title,
      description: vgLiveMatch.description,
      category: "Sport",
      start: vgLiveMatch.start,
      end: vgLiveMatch.end,
      source: "real",
    };
    const state = stateForProgram(vgLiveProgram, now);

    return {
      packageName: vgLiveMatch.packageName,
      packageTag: vgLiveMatch.packageTag,
      price: vgLiveMatch.price,
      pitch: vgLiveMatch.pitch,
      imageSrc: "/premium/football-floodlights.svg",
      imageAlt: "Fotballbane under flomlys",
      visualTone: "football",
      teamLogos: vgLiveMatch.teamLogos,
      channelName: vgLiveMatch.channelName,
      channelLogo: vgLiveMatch.channelLogo,
      programTitle: vgLiveMatch.title,
      programDescription: vgLiveMatch.description,
      start: vgLiveMatch.start,
      end: vgLiveMatch.end,
      state,
      stateLabel: stateLabel(state),
      eyebrow: eyebrowForState(state),
      ctaLabel: "Legg til på Min side",
      ctaHref: ORDER_URL,
      detailsHref: "/produkter-og-priser#tv",
      updatedAt: now.toISOString(),
      dataSource: "vg-live",
    };
  }

  const channels = getPromotedChannels();
  const schedulesByDate = await Promise.all(
    getCandidateDateKeys(now).map((date) => getFullTvGuide(channels, date))
  );

  const best = schedulesByDate
    .flat()
    .flatMap((channel) => {
      return PREMIUM_PACKAGES.filter((pkg) => pkg.channels.includes(channel.name)).flatMap((pkg) => {
        return channel.programs.map((program) => {
          const scored = scoreCandidate(pkg, channel, program, now);

          if (!scored) return null;

          return {
            packageDefinition: pkg,
            channel,
            program,
            score: scored.score,
            state: scored.state,
          };
        });
      });
    })
    .filter((candidate): candidate is NonNullable<typeof candidate> => candidate !== null)
    .sort((a, b) => b.score - a.score)[0];

  if (!best) {
    const fallbackPackage = PREMIUM_PACKAGES[0];
    const visual = getHighlightVisual(fallbackPackage, {
      id: "v-sport-1",
      name: "V sport 1",
      desc: "Premiumpakke",
      category: "Sport",
      logo: channelLogos["V sport 1"] ?? "",
      programs: [],
    });

    return {
      packageName: fallbackPackage.name,
      packageTag: fallbackPackage.tag,
      price: fallbackPackage.price,
      pitch: fallbackPackage.pitch,
      ...visual,
      channelName: "V sport 1",
      channelLogo: channelLogos["V sport 1"] ?? "",
      programTitle: "Premier League, F1 og storfilm samlet",
      programDescription:
        "Vi leter automatisk etter neste aktuelle sending fra premiumkanalene. Legg til pakken og få mer sport og underholdning når høydepunktene går live.",
      start: null,
      end: null,
      state: "fallback",
      stateLabel: stateLabel("fallback"),
      eyebrow: eyebrowForState("fallback"),
      ctaLabel: "Legg til på Min side",
      ctaHref: ORDER_URL,
      detailsHref: "/produkter-og-priser#tv",
      updatedAt: now.toISOString(),
      dataSource: "fallback",
    };
  }

  const visual = getHighlightVisual(best.packageDefinition, best.channel, best.program);

  return {
    packageName: best.packageDefinition.name,
    packageTag: best.packageDefinition.tag,
    price: best.packageDefinition.price,
    pitch: best.packageDefinition.pitch,
    ...visual,
    channelName: best.channel.name,
    channelLogo: best.channel.logo,
    programTitle: best.program.title,
    programDescription: best.program.description,
    start: best.program.start,
    end: best.program.end,
    state: best.state,
    stateLabel: stateLabel(best.state),
    eyebrow: eyebrowForState(best.state),
    ctaLabel: "Legg til på Min side",
    ctaHref: ORDER_URL,
    detailsHref: "/produkter-og-priser#tv",
    updatedAt: now.toISOString(),
    dataSource: "real",
  };
}
