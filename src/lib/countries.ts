import { worldCupCountrySeeds } from "@/lib/world-cup-country-seeds";
import { worldCupLegends } from "@/lib/world-cup-legends";

export type TriviaQuestion = {
  id: string;
  countryCode: string;
  type: "capital" | "map" | "flag" | "culture" | "football";
  question: string;
  choices: string[];
  answer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
};

export type Legend = {
  name: string;
  role: string;
  note: string;
};

export type Country = {
  fifaCode: string;
  name: string;
  flagEmoji: string;
  flagImageUrl?: string;
  flagName?: string;
  capital: string;
  region: string;
  subregion?: string;
  coordinates: [number, number];
  languages: string[];
  currency?: string;
  population?: number;
  funFacts: string[];
  footballFacts: string[];
  landmarks: string[];
  foods: string[];
  trivia: TriviaQuestion[];
  legends?: Legend[];
};

export type Match = {
  id: string;
  homeCode: string;
  awayCode: string;
  score: [number, number];
  minute: string;
  breakWindows: [number, number];
};

type CountrySeed = {
  fifaCode: string;
  name: string;
  flagEmoji: string;
  flagImageUrl?: string;
  capital: string;
  region: string;
  subregion?: string;
  coordinates: readonly [number, number];
  languages: readonly string[];
  currency?: string;
  population?: number;
};

const customCountries: Record<string, Country> = {
  ARG: {
    fifaCode: "ARG",
    name: "Argentina",
    flagEmoji: "🇦🇷",
    flagName: "Bandera Nacional",
    capital: "Buenos Aires",
    region: "South America",
    subregion: "Southern Cone",
    coordinates: [-34.6037, -58.3816],
    languages: ["Spanish"],
    currency: "Peso",
    population: 46044703,
    funFacts: [
      "Argentina is home to Iguazú Falls.",
      "Mate is one of Argentina's most loved drinks.",
      "The Andes mountain range runs along the west.",
    ],
    footballFacts: [
      "Argentina won the FIFA World Cup in 1978, 1986, and 2022.",
      "The national team is known as La Albiceleste.",
      "Argentina is one of South America's football powerhouses.",
    ],
    landmarks: ["Iguazú Falls", "Obelisco de Buenos Aires", "Perito Moreno Glacier"],
    foods: ["Asado", "Empanadas", "Milanesa"],
    trivia: [
      {
        id: "arg-capital",
        countryCode: "ARG",
        type: "capital",
        question: "What is Argentina's capital city?",
        choices: ["Córdoba", "Rosario", "Buenos Aires", "Mendoza"],
        answer: "Buenos Aires",
        explanation: "Buenos Aires is Argentina's capital and largest city.",
        difficulty: "easy",
      },
    ],
  },
  JPN: {
    fifaCode: "JPN",
    name: "Japan",
    flagEmoji: "🇯🇵",
    flagName: "Hinomaru",
    capital: "Tokyo",
    region: "East Asia",
    subregion: "Pacific Rim",
    coordinates: [35.6762, 139.6503],
    languages: ["Japanese"],
    currency: "Yen",
    population: 123790000,
    funFacts: [
      "Japan is an island country in East Asia.",
      "Tokyo is one of the world's largest metropolitan areas.",
      "Japan's flag is known as Nisshōki (Hinomaru).",
    ],
    footballFacts: [
      "Japan has become one of Asia's most consistent World Cup teams.",
      "The national team is nicknamed Samurai Blue.",
      "Japan co-hosted the 2002 FIFA World Cup.",
    ],
    landmarks: ["Mount Fuji", "Fushimi Inari Taisha", "Shibuya Crossing"],
    foods: ["Sushi", "Ramen", "Tempura"],
    trivia: [
      {
        id: "jpn-capital",
        countryCode: "JPN",
        type: "capital",
        question: "Which city is Japan's capital?",
        choices: ["Kyoto", "Tokyo", "Osaka", "Sapporo"],
        answer: "Tokyo",
        explanation: "Tokyo is the capital of Japan.",
        difficulty: "easy",
      },
      {
        id: "jpn-region",
        countryCode: "JPN",
        type: "culture",
        question: "Japan is located in which region?",
        choices: ["East Asia", "South America", "Western Europe", "North Africa"],
        answer: "East Asia",
        explanation: "Japan is an island country in East Asia.",
        difficulty: "easy",
      },
      {
        id: "jpn-flag",
        countryCode: "JPN",
        type: "flag",
        question: "What is Japan's flag commonly called?",
        choices: ["Tricolore", "Rising Cross", "Hinomaru", "Blue Wave"],
        answer: "Hinomaru",
        explanation: "Nisshōki / Hinomaru refers to Japan's iconic flag.",
        difficulty: "medium",
      },
    ],
  },
  BRA: {
    fifaCode: "BRA",
    name: "Brazil",
    flagEmoji: "🇧🇷",
    flagName: "Bandeira do Brasil",
    capital: "Brasília",
    region: "South America",
    subregion: "Central America",
    coordinates: [-15.8267, -47.9218],
    languages: ["Portuguese"],
    currency: "Real",
    population: 215313498,
    funFacts: [
      "Brazil is the largest country in South America.",
      "The Amazon Rainforest covers about 60% of the forest.",
      "Brazil has won the FIFA World Cup 5 times.",
    ],
    footballFacts: [
      "Brazil has the most FIFA World Cup titles.",
      "The national team is known as the Seleção.",
      "Brazil plays a distinctive style called 'Jogo Bonito'.",
    ],
    landmarks: ["Christ the Redeemer", "Amazon Rainforest", "Iguazú Falls"],
    foods: ["Feijoada", "Açai", "Coxinha"],
    trivia: [
      {
        id: "bra-capital",
        countryCode: "BRA",
        type: "capital",
        question: "What is Brazil's capital city?",
        choices: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
        answer: "Brasília",
        explanation: "Brasília has been Brazil's capital since 1960.",
        difficulty: "easy",
      },
    ],
  },
  MAR: {
    fifaCode: "MAR",
    name: "Morocco",
    flagEmoji: "🇲🇦",
    flagName: "Bendera al-Maghrib",
    capital: "Rabat",
    region: "Africa",
    subregion: "North Africa",
    coordinates: [33.9716, -6.8498],
    languages: ["Arabic", "Berber"],
    currency: "Dirham",
    population: 37344795,
    funFacts: [
      "Morocco is located at the crossroads of Europe and Africa.",
      "The Atlas Mountains stretch across the country.",
      "Morocco is famous for its medinas and markets.",
    ],
    footballFacts: [
      "Morocco reached the 2022 World Cup semi-finals.",
      "The national team plays entertaining attacking football.",
      "Morocco has a strong footballing tradition in Africa.",
    ],
    landmarks: ["Atlas Mountains", "Jemaa el-Fnaa", "Kasbah Ait Benhaddou"],
    foods: ["Tagine", "Couscous", "Harira"],
    trivia: [
      {
        id: "mar-capital",
        countryCode: "MAR",
        type: "capital",
        question: "What is Morocco's capital?",
        choices: ["Marrakech", "Fes", "Rabat", "Casablanca"],
        answer: "Rabat",
        explanation: "Rabat is the capital of Morocco.",
        difficulty: "easy",
      },
    ],
  },
  USA: {
    fifaCode: "USA",
    name: "United States",
    flagEmoji: "🇺🇸",
    flagName: "The Stars and Stripes",
    capital: "Washington, D.C.",
    region: "North America",
    subregion: "North America",
    coordinates: [38.8951, -77.0369],
    languages: ["English"],
    currency: "Dollar",
    population: 331002651,
    funFacts: [
      "The USA is the world's third-largest country by area.",
      "The Grand Canyon is one of the Seven Wonders.",
      "The USA has hosted the World Cup three times.",
    ],
    footballFacts: [
      "The USA has emerged as a competitive force in world football.",
      "MLS has become one of the top leagues globally.",
      "The USA women's team is one of the most successful.",
    ],
    landmarks: ["Statue of Liberty", "Grand Canyon", "Golden Gate Bridge"],
    foods: ["Hamburger", "Hot Dog", "Apple Pie"],
    trivia: [
      {
        id: "usa-capital",
        countryCode: "USA",
        type: "capital",
        question: "What is the capital of the USA?",
        choices: ["New York", "Los Angeles", "Washington, D.C.", "Chicago"],
        answer: "Washington, D.C.",
        explanation: "Washington, D.C. is the capital of the United States.",
        difficulty: "easy",
      },
    ],
  },
  BEL: {
    fifaCode: "BEL",
    name: "Belgium",
    flagEmoji: "🇧🇪",
    flagName: "Drapeau de la Belgique",
    capital: "Brussels",
    region: "Europe",
    subregion: "Western Europe",
    coordinates: [50.8503, 4.3517],
    languages: ["Dutch", "French", "German"],
    currency: "Euro",
    population: 11590324,
    funFacts: [
      "Belgium is known for its chocolate and beer.",
      "Brussels is home to many EU institutions.",
      "Belgium has three official languages.",
    ],
    footballFacts: [
      "Belgium reached the 2018 World Cup semi-finals.",
      "The Red Devils are known for their attacking play.",
      "Belgium has produced many talented footballers.",
    ],
    landmarks: ["Grand Place", "Atomium", "Bruges Belfry"],
    foods: ["Moules-frites", "Belgian Waffles", "Chocolate"],
    trivia: [
      {
        id: "bel-capital",
        countryCode: "BEL",
        type: "capital",
        question: "What is Belgium's capital?",
        choices: ["Antwerp", "Ghent", "Brussels", "Bruges"],
        answer: "Brussels",
        explanation: "Brussels is the capital of Belgium.",
        difficulty: "easy",
      },
    ],
  },
  MEX: {
    fifaCode: "MEX",
    name: "Mexico",
    flagEmoji: "🇲🇽",
    flagName: "Bandera de México",
    capital: "Mexico City",
    region: "North America",
    subregion: "Central America",
    coordinates: [19.4326, -99.1332],
    languages: ["Spanish"],
    currency: "Peso",
    population: 128932753,
    funFacts: [
      "Mexico is home to ancient Aztec ruins.",
      "Mexico City is built on the site of Tenochtitlan.",
      "Mexico has the world's smallest volcano.",
    ],
    footballFacts: [
      "Mexico has hosted the World Cup twice.",
      "El Tri has a passionate football fanbase.",
      "Mexico regularly qualifies for the World Cup.",
    ],
    landmarks: ["Chichen Itza", "Machu Picchu", "Xel-Ha"],
    foods: ["Tacos", "Enchiladas", "Mole"],
    trivia: [
      {
        id: "mex-capital",
        countryCode: "MEX",
        type: "capital",
        question: "What is Mexico's capital?",
        choices: ["Cancun", "Acapulco", "Mexico City", "Monterrey"],
        answer: "Mexico City",
        explanation: "Mexico City is the capital of Mexico.",
        difficulty: "easy",
      },
    ],
  },
};

const CAPITAL_DISTRACTORS = [
  "Cairo",
  "Doha",
  "London",
  "Madrid",
  "Mexico City",
  "Paris",
  "Rabat",
  "Seoul",
  "Tokyo",
  "Washington, D.C.",
];

const REGION_CHOICES = ["Africa", "Asia", "Europe", "North America", "South America", "Oceania"];
const LANGUAGE_CHOICES = ["Arabic", "English", "French", "Japanese", "Portuguese", "Spanish", "Turkish"];
const CURRENCY_CHOICES = ["Dollar", "Euro", "Peso", "Pound sterling", "Real", "Yen", "Dirham"];

function dedupe(values: string[]) {
  return Array.from(new Set(values.filter(Boolean)));
}

function buildChoiceSet(answer: string, pool: string[]) {
  return dedupe([answer, ...pool.filter((item) => item !== answer)]).slice(0, 4);
}

function buildCapitalChoices(country: CountrySeed) {
  return buildChoiceSet(country.capital, CAPITAL_DISTRACTORS);
}

function buildRegionChoices(country: CountrySeed) {
  return buildChoiceSet(country.region, REGION_CHOICES);
}

function formatPopulation(population?: number) {
  if (!population) {
    return null;
  }

  if (population >= 1_000_000) {
    return `${(population / 1_000_000).toFixed(population >= 100_000_000 ? 0 : 1).replace(/\\.0$/, "")} million`;
  }

  return population.toLocaleString("en-US");
}

function buildGeneratedCountry(seed: CountrySeed): Country {
  const languageSummary =
    seed.languages.length > 1
      ? `${seed.languages[0]} and ${seed.languages[1]}`
      : seed.languages[0] ?? "local languages";
  const placeLabel = seed.subregion ?? seed.region;
  const populationLabel = formatPopulation(seed.population);
  const hemisphere =
    seed.coordinates[0] >= 0
      ? seed.coordinates[1] >= 0
        ? "the Northern and Eastern Hemispheres"
        : "the Northern and Western Hemispheres"
      : seed.coordinates[1] >= 0
        ? "the Southern and Eastern Hemispheres"
        : "the Southern and Western Hemispheres";

  return {
    ...seed,
    coordinates: [seed.coordinates[0], seed.coordinates[1]],
    languages: [...seed.languages],
    funFacts: [
      `${seed.name} sits in ${placeLabel} and appears in this year's World Cup field.`,
      `${seed.capital} is the capital of ${seed.name}.`,
      `${languageSummary} ${seed.languages.length > 1 ? "are" : "is"} spoken in ${seed.name}.`,
      seed.currency
        ? `${seed.currency} is used in ${seed.name}.`
        : `${seed.name} stretches across ${hemisphere}.`,
      populationLabel
        ? `${seed.name} has a population of about ${populationLabel} people.`
        : `${seed.name} is positioned in ${hemisphere}.`,
    ],
    footballFacts: [
      `${seed.name} is part of the 2026 FIFA World Cup field.`,
      `${seed.name} appears in the halftime learn-and-guess flow in this app.`,
      `${seed.fifaCode} is the FIFA code used for ${seed.name} on the live schedule.`,
    ],
    landmarks: [],
    foods: [],
    trivia: [
      {
        id: `${seed.fifaCode.toLowerCase()}-capital`,
        countryCode: seed.fifaCode,
        type: "capital",
        question: `What is the capital of ${seed.name}?`,
        choices: buildCapitalChoices(seed),
        answer: seed.capital,
        explanation: `${seed.capital} is the capital of ${seed.name}.`,
        difficulty: "easy",
      },
      {
        id: `${seed.fifaCode.toLowerCase()}-region`,
        countryCode: seed.fifaCode,
        type: "culture",
        question: `${seed.name} is in which region?`,
        choices: buildRegionChoices(seed),
        answer: seed.region,
        explanation: `${seed.name} is located in ${seed.region}.`,
        difficulty: "easy",
      },
    ],
    legends: worldCupLegends[seed.fifaCode as keyof typeof worldCupLegends]?.map((legend) => ({
      name: legend.name,
      role: legend.role,
      note: legend.note,
    })),
  };
}

function ensureCountryTrivia(country: Country) {
  const trivia = [...country.trivia];
  const primaryLanguage = country.languages[0];

  if (!trivia.some((question) => question.question.toLowerCase().includes("language")) && primaryLanguage) {
    trivia.push({
      id: `${country.fifaCode.toLowerCase()}-language`,
      countryCode: country.fifaCode,
      type: "culture",
      question: `Which language is most associated with ${country.name}?`,
      choices: buildChoiceSet(primaryLanguage, LANGUAGE_CHOICES),
      answer: primaryLanguage,
      explanation: `${primaryLanguage} is one of the main languages spoken in ${country.name}.`,
      difficulty: "easy",
    });
  }

  if (!trivia.some((question) => question.question.toLowerCase().includes("currency")) && country.currency) {
    trivia.push({
      id: `${country.fifaCode.toLowerCase()}-currency`,
      countryCode: country.fifaCode,
      type: "culture",
      question: `What currency is used in ${country.name}?`,
      choices: buildChoiceSet(country.currency, CURRENCY_CHOICES),
      answer: country.currency,
      explanation: `${country.currency} is used in ${country.name}.`,
      difficulty: "medium",
    });
  }

  if (!trivia.some((question) => question.type === "map")) {
    trivia.push({
      id: `${country.fifaCode.toLowerCase()}-map`,
      countryCode: country.fifaCode,
      type: "map",
      question: `${country.name} is in which region of the world?`,
      choices: buildChoiceSet(country.region, REGION_CHOICES),
      answer: country.region,
      explanation: `${country.name} is located in ${country.region}.`,
      difficulty: "easy",
    });
  }

  return trivia.slice(0, 4);
}

function enhanceCountry(country: Country): Country {
  return {
    ...country,
    trivia: ensureCountryTrivia(country),
    legends:
      country.legends ??
      worldCupLegends[country.fifaCode as keyof typeof worldCupLegends]?.map((legend) => ({
        name: legend.name,
        role: legend.role,
        note: legend.note,
      })) ??
      [],
  };
}

const generatedCountries = Object.fromEntries(
  Object.entries(worldCupCountrySeeds).map(([code, seed]) => [code, enhanceCountry(buildGeneratedCountry(seed))]),
) as Record<string, Country>;

const enrichedCustomCountries = Object.fromEntries(
  Object.entries(customCountries).map(([code, country]) => [code, enhanceCountry(country)]),
) as Record<string, Country>;

export const countries: Record<string, Country> = {
  ...generatedCountries,
  ...enrichedCustomCountries,
};

export const matches: Match[] = [
  {
    id: "bra-mar",
    homeCode: "BRA",
    awayCode: "MAR",
    score: [1, 1],
    minute: "41:32",
    breakWindows: [22, 67],
  },
  {
    id: "usa-jpn",
    homeCode: "USA",
    awayCode: "JPN",
    score: [0, 0],
    minute: "23:15",
    breakWindows: [20, 64],
  },
  {
    id: "bel-mex",
    homeCode: "BEL",
    awayCode: "MEX",
    score: [0, 0],
    minute: "0:00",
    breakWindows: [30, 75],
  },
];

export const getMatchById = (matchId: string): Match | undefined =>
  matches.find((match) => match.id === matchId);
