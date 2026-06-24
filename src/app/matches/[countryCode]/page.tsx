import { CountryQuizContent } from "@/components/fifa/CountryQuiz";

interface CountryDetailPageProps {
  params: Promise<{ countryCode: string }>;
}

export default async function CountryDetailPage({ params }: CountryDetailPageProps) {
  const { countryCode } = await params;
  return <CountryQuizContent countryCode={countryCode.toUpperCase()} />;
}
