'use client';

import { Progress } from '@/components/ui/progress';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  progress?: number;
  progressLabel?: string;
}

export function StatCard({
  label,
  value,
  icon,
  color,
  progress,
  progressLabel,
}: StatCardProps) {
  return (
    <div className={`rounded-2xl p-4 sm:p-5 ${color} shadow-sm`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1">
          <p className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-1">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <span className="text-2xl sm:text-3xl flex-shrink-0">{icon}</span>
      </div>

      {progress !== undefined && (
        <div className="space-y-1.5">
          <Progress value={progress} className="h-2 rounded-full" />
          <p className="text-xs text-gray-600 font-medium">{progressLabel}</p>
        </div>
      )}
    </div>
  );
}
