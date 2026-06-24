'use client';

import Link from 'next/link';

interface DuolingoMatchCardProps {
  id: string;
  homeFlag: string;
  homeName: string;
  awayFlag: string;
  awayName: string;
  score: [number, number];
  minute: string;
  gradient: string;
}

export function DuolingoMatchCard({
  id,
  homeFlag,
  homeName,
  awayFlag,
  awayName,
  score,
  minute,
  gradient,
}: DuolingoMatchCardProps) {
  return (
    <Link href={`/matches/live/${id}`}>
      <div className={`rounded-2xl p-5 sm:p-6 text-white shadow-lg transition-all duration-200 hover:shadow-2xl hover:scale-105 cursor-pointer group ${gradient} overflow-hidden relative`}>
        {/* LIVE badge */}
        <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold animate-pulse">
          ● LIVE
        </div>
        
        <div className="space-y-4">
          {/* Match info */}
          <div className="space-y-2">
            <div className="text-xs font-bold opacity-90 uppercase tracking-wider">Live Match</div>
            <div className="text-xs opacity-80">{minute}&apos;</div>
          </div>

          {/* Teams and Score */}
          <div className="space-y-3">
            {/* Home team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-3xl">{homeFlag}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{homeName}</p>
                </div>
              </div>
              <div className="text-3xl font-bold ml-2">{score[0]}</div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/20" />

            {/* Away team */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-3xl">{awayFlag}</span>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{awayName}</p>
                </div>
              </div>
              <div className="text-3xl font-bold ml-2">{score[1]}</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="pt-2 mt-auto">
            <div className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white font-semibold py-2 px-3 rounded-lg text-center text-sm transition-all">
              Start learning →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
