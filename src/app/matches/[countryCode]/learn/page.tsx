import { CountryDetailContent } from "@/components/fifa/CountryDetail";

interface CountryLearnPageProps {
  params: Promise<{ countryCode: string }>;
}

export default async function CountryLearnPage({ params }: CountryLearnPageProps) {
  const { countryCode } = await params;
  return <CountryDetailContent countryCode={countryCode.toUpperCase()} />;
}
