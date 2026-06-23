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
};

export type Match = {
  id: string;
  homeCode: string;
  awayCode: string;
  score: [number, number];
  minute: string;
  breakWindows: [number, number];
};

export const countries: Record<string, Country> = {
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
};

export const matches: Match[] = [
  {
    id: "arg-jpn",
    homeCode: "ARG",
    awayCode: "JPN",
    score: [1, 0],
    minute: "41:32",
    breakWindows: [22, 67],
  },
];

export const getMatchById = (matchId: string): Match | undefined =>
  matches.find((match) => match.id === matchId);
