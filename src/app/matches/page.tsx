import { fetchWorldCupSchedule } from "@/lib/espn";
import { FIFAMatchCard } from "@/components/fifa/FIFAMatchCard";

export default async function MatchesPage() {
  const matches = await fetchWorldCupSchedule().catch(() => []);
  const liveMatches = matches.filter((match) => match.status === "live" || match.status === "halftime");
  const todaysMatches = matches.filter((match) => match.status !== "live" && match.status !== "halftime");
  const hydrationBreakMatch = matches.find((match) => match.isHydrationBreak);

  return (
    <div className="px-4 py-4 pb-10">
      <div className="relative overflow-hidden bg-[#0d6b35] px-6 pb-9 pt-6 text-white">
        <div className="absolute -left-3 top-10 h-14 w-14 rotate-12 rounded-xl border-4 border-[#a6a43a] opacity-70" />
        <div className="absolute right-6 top-7 h-16 w-16 rounded-full border-4 border-[#a6a43a] opacity-70" />
        <div className="absolute right-16 top-20 h-12 w-12 rotate-45 bg-[#a6a43a] opacity-55" />
        <div className="absolute right-8 top-34 h-7 w-7 rounded-full bg-[#a6a43a] opacity-85" />
        <div className="absolute left-12 top-24 h-26 w-4 rounded-full bg-[#a6a43a] opacity-35" />

        <div className="relative z-10">
          <div className="mb-1 flex items-center gap-3">
            <h1 className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.08em] sm:text-5xl">
              HYDRATION BREAK
            </h1>
          </div>
          <p className="text-lg text-white/78">FIFA World Cup 2026™</p>
        </div>
      </div>

      <div className="px-4 py-5">
        <div className="mb-7 rounded-[1.5rem] border-[3px] border-[#12243a] bg-[#ffd211] px-5 py-5 shadow-[0_8px_0_rgba(18,36,58,0.08)]">
          <div>
            <p className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-3xl tracking-[0.04em] text-[#12243a]">
              {hydrationBreakMatch ? "HYDRATION BREAK!" : "LIVE WORLD CUP NOW!"}
            </p>
            <p className="mt-2 text-[1.2rem] leading-8 text-[#463f34]">
              Pick a team, answer the country quiz, place it on the map, then unlock its legends and fun facts.
            </p>
          </div>
        </div>

        {liveMatches.length ? (
          <div className="mb-8">
            <h2 className="mb-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.18em] text-[#6f6a5d]">
              LIVE MATCHES
            </h2>
            <div className="space-y-5">
              {liveMatches.map((match) => (
                <FIFAMatchCard
                  key={match.id}
                  homeCode={match.homeCode}
                  awayCode={match.awayCode}
                  homeName={match.homeName}
                  awayName={match.awayName}
                  homeFlagEmoji={match.homeFlagEmoji}
                  awayFlagEmoji={match.awayFlagEmoji}
                  score={match.score}
                  minute={match.minute}
                  stadium={match.stadium}
                  location={match.location}
                  status={match.status === "final" ? "upcoming" : match.status}
                  final={match.status === "final"}
                  badgeLabel={match.isHydrationBreak ? "HB" : undefined}
                  homeHref={`/matches/${match.homeCode}`}
                  awayHref={`/matches/${match.awayCode}`}
                />
              ))}
            </div>
          </div>
        ) : null}

        <div className="mb-8">
          <h2 className="mb-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-lg tracking-[0.18em] text-[#6f6a5d]">
            TODAY&apos;S MATCHES
          </h2>
          <div className="space-y-5">
            {todaysMatches.map((match) => (
              <FIFAMatchCard
                key={match.id}
                homeCode={match.homeCode}
                awayCode={match.awayCode}
                homeName={match.homeName}
                awayName={match.awayName}
                homeFlagEmoji={match.homeFlagEmoji}
                awayFlagEmoji={match.awayFlagEmoji}
                score={match.score}
                minute={match.minute}
                stadium={match.stadium}
                location={match.location}
                status={match.status === "final" ? "upcoming" : match.status}
                final={match.status === "final"}
                badgeLabel={match.isHydrationBreak ? "HB" : undefined}
                homeHref={`/matches/${match.homeCode}`}
                awayHref={`/matches/${match.awayCode}`}
              />
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.45rem] border-[3px] border-[#12243a] bg-white shadow-[0_8px_0_rgba(18,36,58,0.08)]">
          <div className="h-2 bg-[#0d6b35]" />
          <div className="p-5">
            <p className="mb-4 font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-sm tracking-[0.18em] text-[#6f6a5d]">YOUR STATS</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: "5", label: "Day Streak", color: "#0d6b35" },
                { value: "420", label: "Total Points", color: "#d39d0a" },
                { value: "42", label: "Matches", color: "#2055a8" },
                { value: "3", label: "Badges", color: "#b23950" },
              ].map(({ value, label, color }) => (
                <div key={label} className="rounded-[1rem] border-[2px] border-[#12243a] bg-[#f4efe2] p-3 text-center">
                  <div className="font-['Impact','Haettenschweiler','Arial_Narrow_Bold',sans-serif] text-4xl tracking-[0.04em]" style={{ color }}>{value}</div>
                  <p className="mt-1 text-xs font-semibold text-[#6f6a5d]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
