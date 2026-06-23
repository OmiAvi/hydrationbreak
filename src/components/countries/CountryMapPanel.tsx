import { WorldMap } from "@/components/map/WorldMap";
import { Match, countries } from "@/lib/countries";

type CountryMapPanelProps = {
  match: Match;
};

export function CountryMapPanel({ match }: CountryMapPanelProps) {
  return <WorldMap countriesToHighlight={[countries[match.homeCode], countries[match.awayCode]]} />;
}
