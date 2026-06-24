import { LiveMatchExperience } from "@/components/match/LiveMatchExperience";
import { getMatchById } from "@/lib/countries";
import { notFound } from "next/navigation";

type MatchDetailPageProps = {
  params: Promise<{ matchId: string }>;
};

export default async function MatchDetailPage({ params }: MatchDetailPageProps) {
  const { matchId } = await params;
  const match = getMatchById(matchId);

  if (!match) {
    notFound();
  }

  return <LiveMatchExperience match={match} />;
}
