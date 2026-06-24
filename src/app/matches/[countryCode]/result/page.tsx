import { ResultContent } from "@/components/fifa/Result";

interface ResultPageProps {
  params: Promise<{ countryCode: string }>;
}

export default async function ResultPage({ params }: ResultPageProps) {
  const { countryCode } = await params;
  return <ResultContent countryCode={countryCode.toUpperCase()} />;
}
