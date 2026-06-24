'use client';

import { Badge } from '@/components/ui/badge';

interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
}

const BADGES: BadgeDefinition[] = [
  {
    id: 'first-match',
    name: 'First Match',
    description: 'Complete your first match',
    emoji: '🎯',
    unlocked: true,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: '7-day streak',
    emoji: '🔥',
    unlocked: true,
  },
  {
    id: 'geography-ace',
    name: 'Geography Ace',
    description: 'Complete 10 matches',
    emoji: '🌍',
    unlocked: true,
  },
  {
    id: 'speed-racer',
    name: 'Speed Racer',
    description: 'Complete a match in under 2 minutes',
    emoji: '⚡',
    unlocked: false,
  },
  {
    id: 'perfect-streak',
    name: 'Perfect Streak',
    description: '30-day streak',
    emoji: '👑',
    unlocked: false,
  },
  {
    id: 'continents-master',
    name: 'Continents Master',
    description: 'Learn from all 6 continents',
    emoji: '🗺️',
    unlocked: false,
  },
];

export interface BadgesDisplayProps {
  userBadges?: string[];
  maxDisplay?: number;
}

export function BadgesDisplay({ userBadges = [], maxDisplay = 3 }: BadgesDisplayProps) {
  const displayBadges = BADGES.slice(0, maxDisplay);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-bold text-gray-900">Achievements</h3>
        <p className="text-xs text-slate-600 mt-0.5">3 unlocked • 3 to go</p>
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        {displayBadges.map((badge) => (
          <div
            key={badge.id}
            className={`rounded-xl p-3 sm:p-4 text-center transition-all shadow-sm ${
              badge.unlocked
                ? 'bg-gradient-to-b from-yellow-300 to-orange-400 border border-yellow-400'
                : 'bg-slate-100 border border-slate-200 opacity-60'
            }`}
          >
            <div className="text-3xl sm:text-4xl mb-2">{badge.emoji}</div>
            <p className="text-xs font-bold text-gray-900 line-clamp-2">{badge.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
