import { channelLogos } from "@/lib/channelData";

export type VgLiveTeamLogo = {
  name: string;
  shortName?: string;
  logoUrl?: string;
};

export type VgLivePremiumMatch = {
  packageName: "V Premium";
  packageTag: string;
  price: string;
  pitch: string;
  channelName: string;
  channelLogo: string;
  title: string;
  description: string;
  start: string;
  end: string;
  teamLogos: VgLiveTeamLogo[];
  score: number;
};

type VgLiveEventStatusType =
  | "notStarted"
  | "inProgress"
  | "finished"
  | "postponed"
  | "startDelayed"
  | "canceled"
  | "abandoned";

type VgLiveImage = {
  url?: string;
};

type VgLiveParticipant = {
  id: number;
  name: string;
  shortName?: string;
  images?: {
    clubLogo?: VgLiveImage;
  };
};

type VgLiveEvent = {
  id: number;
  sport: string;
  startDate: string;
  participantIds: number[];
  status: {
    type: VgLiveEventStatusType | string;
  };
  tournament: {
    id: number;
    stageName?: string;
  };
  coverageInfo?: {
    assets?: {
      tvChannelsCount?: number;
      articlesCount?: number;
      videosCount?: number;
    };
  };
};

type VgLiveScheduleResponse = {
  events?: Record<string, VgLiveEvent>;
  participants?: Record<string, VgLiveParticipant>;
};

type VgLiveTvChannelsResponse = {
  tvChannels?: Record<string, Array<{ name: string }>>;
};

const VGLIVE_BASE_URL = "https://vglive.vg.no/bff/vg";
const PREMIER_LEAGUE_TOURNAMENT_ID = 3;
const ORDERED_NORWAY_INTEREST_TEAMS = [
  "arsenal",
  "liverpool",
  "manchester united",
  "manchester city",
  "newcastle",
  "tottenham",
  "chelsea",
  "aston villa",
  "west ham",
];

const PREMIER_LEAGUE_LOGO_FALLBACKS: Record<string, string> = {
  arsenal: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  "aston villa": "https://upload.wikimedia.org/wikipedia/en/9/9a/Aston_Villa_FC_new_crest.svg",
  chelsea: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  "crystal palace": "https://upload.wikimedia.org/wikipedia/en/a/a2/Crystal_Palace_FC_logo_%282022%29.svg",
  everton: "https://upload.wikimedia.org/wikipedia/en/7/7c/Everton_FC_logo.svg",
  fulham: "https://upload.wikimedia.org/wikipedia/en/e/eb/Fulham_FC_%28shield%29.svg",
  liverpool: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
  "manchester city": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "manchester united": "https://upload.wikimedia.org/wikipedia/en/7/7a/Manchester_United_FC_crest.svg",
  newcastle: "https://upload.wikimedia.org/wikipedia/en/5/56/Newcastle_United_Logo.svg",
  tottenham: "https://upload.wikimedia.org/wikipedia/en/b/b4/Tottenham_Hotspur.svg",
  "west ham": "https://upload.wikimedia.org/wikipedia/en/c/c2/West_Ham_United_FC_logo.svg",
  wolverhampton: "https://upload.wikimedia.org/wikipedia/en/f/fc/Wolverhampton_Wanderers.svg",
};

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function timezoneOffset(date: Date) {
  const offsetMinutes = -date.getTimezoneOffset();
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const absolute = Math.abs(offsetMinutes);
  const hours = String(Math.floor(absolute / 60)).padStart(2, "0");
  const minutes = String(absolute % 60).padStart(2, "0");

  return `${sign}${hours}:${minutes}`;
}

function scheduleDateParam(date: Date) {
  return `${localDateKey(date)}T12:00:00${timezoneOffset(date)}`;
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) return null;

    return (await response.json()) as T;
  } catch (error) {
    console.error("VG Live fetch failed:", error);
    return null;
  }
}

function addHours(iso: string, hours: number) {
  const date = new Date(iso);
  date.setHours(date.getHours() + hours);

  return date.toISOString();
}

function isPromotableEvent(event: VgLiveEvent, now: Date) {
  const start = new Date(event.startDate).getTime();
  const nowTime = now.getTime();
  const horizon = nowTime + 72 * 60 * 60 * 1000;
  const statusType = event.status.type;

  if (
    statusType === "finished" ||
    statusType === "postponed" ||
    statusType === "startDelayed" ||
    statusType === "canceled" ||
    statusType === "abandoned"
  ) {
    return false;
  }

  if (statusType === "inProgress") {
    return start <= nowTime;
  }

  return statusType === "notStarted" && start >= nowTime && start <= horizon;
}

function teamInterestScore(teams: VgLiveParticipant[]) {
  return teams.reduce((score, team) => {
    const name = team.name.toLowerCase();
    const index = ORDERED_NORWAY_INTEREST_TEAMS.findIndex((keyword) => name.includes(keyword));

    if (index === -1) return score;

    return score + 1200 - index * 80;
  }, 0);
}

function buildLogoUrl(team: VgLiveParticipant) {
  const name = team.name.toLowerCase();
  const fallback = Object.entries(PREMIER_LEAGUE_LOGO_FALLBACKS).find(([teamName]) =>
    name.includes(teamName)
  )?.[1];

  return fallback ?? team.images?.clubLogo?.url;
}

function isVPremiumChannel(channelName: string) {
  const normalized = channelName.toLowerCase();

  return normalized.includes("v sport") || normalized.includes("viaplay");
}

async function getTvChannels(eventIds: number[]) {
  if (!eventIds.length) return {};

  const params = new URLSearchParams();
  eventIds.forEach((eventId) => params.append("eventIds", String(eventId)));

  const payload = await fetchJson<VgLiveTvChannelsResponse>(
    `${VGLIVE_BASE_URL}/events/tv-channels?${params.toString()}`
  );

  return payload?.tvChannels ?? {};
}

async function getScheduleForDate(date: Date) {
  const params = new URLSearchParams({
    date: scheduleDateParam(date),
    sport: "football",
  });

  return fetchJson<VgLiveScheduleResponse>(`${VGLIVE_BASE_URL}/schedule?${params.toString()}`);
}

export async function getVgLivePremiumMatch(
  now = new Date()
): Promise<VgLivePremiumMatch | null> {
  const schedulePayloads = await Promise.all(
    [0, 1, 2, 3].map((offset) => {
      const date = new Date(now);
      date.setDate(now.getDate() + offset);
      return getScheduleForDate(date);
    })
  );

  const eventsWithParticipants = schedulePayloads.flatMap((payload) => {
    const events = Object.values(payload?.events ?? {});
    const participants = payload?.participants ?? {};

    return events
      .filter((event) => {
        return (
          event.sport === "football" &&
          event.tournament.id === PREMIER_LEAGUE_TOURNAMENT_ID &&
          event.coverageInfo?.assets?.tvChannelsCount &&
          isPromotableEvent(event, now)
        );
      })
      .map((event) => ({
        event,
        teams: event.participantIds
          .map((participantId) => participants[String(participantId)])
          .filter((team): team is VgLiveParticipant => Boolean(team)),
      }));
  });

  const tvChannels = await getTvChannels(eventsWithParticipants.map(({ event }) => event.id));

  const candidates = eventsWithParticipants
    .map((item): VgLivePremiumMatch | null => {
      const { event, teams } = item;
      const channelName = tvChannels[String(event.id)]?.find((channel) =>
        isVPremiumChannel(channel.name)
      )?.name;

      if (!channelName || teams.length < 2) return null;

      const startTime = new Date(event.startDate).getTime();
      const hoursUntilStart = Math.max(0, (startTime - now.getTime()) / (60 * 60 * 1000));
      const articleScore = Math.min(event.coverageInfo?.assets?.articlesCount ?? 0, 20) * 45;
      const videoScore = Math.min(event.coverageInfo?.assets?.videosCount ?? 0, 8) * 70;
      const score = 6000 + teamInterestScore(teams) + articleScore + videoScore - hoursUntilStart * 18;

      return {
        packageName: "V Premium" as const,
        packageTag: "Premier League, sport og film",
        price: "649 kr/mnd",
        pitch: "For deg som vil samle Premier League, F1, storfilm og Viaplay-innhold i en pakke.",
        channelName,
        channelLogo: channelLogos["V sport 1"] ?? "",
        title: teams.map((team) => team.name).join(" - "),
        description: `Premier League på ${channelName}. Aktuell kamp valgt fra VG Live sitt kampoppsett.`,
        start: event.startDate,
        end: addHours(event.startDate, 2),
        teamLogos: teams.map((team) => ({
          name: team.name,
          shortName: team.shortName,
          logoUrl: buildLogoUrl(team),
        })),
        score,
      };
    })
    .filter((candidate): candidate is VgLivePremiumMatch => candidate !== null)
    .sort((a, b) => b.score - a.score);

  return candidates[0] ?? null;
}
