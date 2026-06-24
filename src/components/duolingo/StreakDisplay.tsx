'use client';

export interface StreakDisplayProps {
  streak: number;
  totalPoints: number;
}

export function StreakDisplay({ streak, totalPoints }: StreakDisplayProps) {
  return (
    <div className="rounded-2xl bg-gradient-to-r from-orange-400 to-orange-500 shadow-lg overflow-hidden">
      <div className="p-5 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl animate-bounce">🔥</div>
          <div>
            <div className="text-sm font-medium text-orange-100">Current Streak</div>
            <div className="text-3xl sm:text-4xl font-bold text-white">{streak} days</div>
            <div className="text-xs text-orange-100 mt-1">Keep it going!</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-orange-100 font-medium">TOTAL</div>
          <div className="text-3xl sm:text-4xl font-bold text-white">{totalPoints}</div>
          <div className="text-xs text-orange-100">points</div>
        </div>
      </div>
    </div>
  );
}
