import { countries } from "@/lib/countries";

type EspnScoreboardResponse = {
  day?: { date?: string };
  events?: EspnEvent[];
};

type EspnEvent = {
  id: string;
  date: string;
  competitions?: EspnCompetition[];
};

type EspnCompetition = {
  status?: {
    clock?: number;
    displayClock?: string;
    period?: number;
    type?: {
      name?: string;
      state?: string;
      completed?: boolean;
      description?: string;
      detail?: string;
      shortDetail?: string;
    };
  };
  venue?: {
    fullName?: string;
    address?: {
      city?: string;
      country?: string;
    };
  };
  competitors?: EspnCompetitor[];
};

type EspnCompetitor = {
  homeAway?: "home" | "away";
  score?: string;
  team?: {
    abbreviation?: string;
    displayName?: string;
    shortDisplayName?: string;
    name?: string;
  };
};

export type WorldCupScheduleMatch = {
  id: string;
  date: string;
  homeCode: string;
  awayCode: string;
  homeName: string;
  awayName: string;
  homeFlagEmoji?: string;
  awayFlagEmoji?: string;
  score: [number, number];
  minute: string;
  stadium: string;
  location: string;
  status: "live" | "upcoming" | "halftime" | "final";
  statusLabel?: string;
  isHydrationBreak: boolean;
  learningCountryCode?: string;
};

const ESPN_SCOREBOARD_URL =
  "https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";

const HALFTIME_STATUS_NAMES = new Set([
  "STATUS_HALFTIME",
  "STATUS_HALF_TIME",
  "STATUS_END_PERIOD",
]);

function getEasternDateParam() {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(new Date()).replaceAll("-", "");
}

function extractMinuteLabel(competition: EspnCompetition) {
  const detail =
    competition.status?.type?.shortDetail ??
    competition.status?.type?.detail ??
    competition.status?.displayClock;

  if (detail && /\d+\s*'/.test(detail)) {
    return detail.replace(/\s+/g, "");
  }

  const clockSeconds = Math.floor(competition.status?.clock ?? 0);
  if (clockSeconds <= 0) {
    return "0'";
  }

  return `${Math.floor(clockSeconds / 60)}'`;
}

function parseStatus(competition: EspnCompetition) {
  const type = competition.status?.type;
  const detail = [type?.name, type?.description, type?.detail, type?.shortDetail]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  const isHalftime =
    Boolean(type?.name && HALFTIME_STATUS_NAMES.has(type.name)) ||
    detail.includes("half time") ||
    detail.includes("halftime") ||
    detail === "ht";

  if (isHalftime) {
    return {
      status: "halftime" as const,
      minute: type?.shortDetail ?? type?.detail ?? "HT",
      isHydrationBreak: true,
      statusLabel: "HB",
    };
  }

  if (type?.completed) {
    return {
      status: "final" as const,
      minute: "90:00",
      isHydrationBreak: false,
      statusLabel: "FT",
    };
  }

  if (type?.state === "in") {
    return {
      status: "live" as const,
      minute: extractMinuteLabel(competition),
      isHydrationBreak: false,
      statusLabel: type?.shortDetail ?? competition.status?.displayClock ?? "Live",
    };
  }

  return {
    status: "upcoming" as const,
    minute: "00:00",
    isHydrationBreak: false,
    statusLabel: undefined,
  };
}

function getLearningCountryCode(homeCode: string, awayCode: string) {
  if (countries[awayCode]) {
    return awayCode;
  }

  if (countries[homeCode]) {
    return homeCode;
  }

  return undefined;
}

function normalizeEvent(event: EspnEvent): WorldCupScheduleMatch | null {
  const competition = event.competitions?.[0];
  const home = competition?.competitors?.find((team) => team.homeAway === "home");
  const away = competition?.competitors?.find((team) => team.homeAway === "away");

  if (!competition || !home?.team?.abbreviation || !away?.team?.abbreviation) {
    return null;
  }

  const homeCode = home.team.abbreviation;
  const awayCode = away.team.abbreviation;
  const homeCountry = countries[homeCode];
  const awayCountry = countries[awayCode];
  const status = parseStatus(competition);
  const city = competition.venue?.address?.city;
  const country = competition.venue?.address?.country;

  return {
    id: event.id,
    date: event.date,
    homeCode,
    awayCode,
    homeName: home.team.shortDisplayName ?? home.team.displayName ?? home.team.name ?? homeCode,
    awayName: away.team.shortDisplayName ?? away.team.displayName ?? away.team.name ?? awayCode,
    homeFlagEmoji: homeCountry?.flagEmoji,
    awayFlagEmoji: awayCountry?.flagEmoji,
    score: [Number(home.score ?? 0), Number(away.score ?? 0)],
    minute: status.minute,
    stadium: competition.venue?.fullName ?? "World Cup Venue",
    location: [city, country].filter(Boolean).join(", ") || "TBD",
    status: status.status,
    statusLabel: status.statusLabel,
    isHydrationBreak: status.isHydrationBreak,
    learningCountryCode: getLearningCountryCode(homeCode, awayCode),
  };
}

export async function fetchWorldCupSchedule(date = getEasternDateParam()) {
  const response = await fetch(`${ESPN_SCOREBOARD_URL}?dates=${date}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ESPN World Cup schedule: ${response.status}`);
  }

  const data = (await response.json()) as EspnScoreboardResponse;
  return (data.events ?? [])
    .map(normalizeEvent)
    .filter((match): match is WorldCupScheduleMatch => Boolean(match));
}
