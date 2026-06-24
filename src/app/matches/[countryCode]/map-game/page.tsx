import { MapGameContent } from "@/components/fifa/MapGame";

interface MapGamePageProps {
  params: Promise<{ countryCode: string }>;
}

export default async function MapGamePage({ params }: MapGamePageProps) {
  const { countryCode } = await params;
  return <MapGameContent countryCode={countryCode.toUpperCase()} />;
}
