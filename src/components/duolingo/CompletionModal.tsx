'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface CompletionModalProps {
  isOpen: boolean;
  matchName: string;
  pointsEarned: number;
  streakContinued: boolean;
  onContinue: () => void;
}

export function CompletionModal({
  isOpen,
  matchName,
  pointsEarned,
  streakContinued,
  onContinue,
}: CompletionModalProps) {
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-md border-0 bg-gradient-to-b from-amber-50 to-orange-100">
        <DialogHeader>
          <div className="space-y-4 text-center">
            {/* Animated celebration emoji */}
            <div className="flex justify-center gap-2 animate-bounce text-4xl">
              <span className="animate-bounce" style={{ animationDelay: '0s' }}>
                🎉
              </span>
              <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                🥳
              </span>
              <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>
                🎉
              </span>
            </div>

            <DialogTitle className="text-2xl font-bold text-gray-800">Excellent!</DialogTitle>
            <DialogDescription className="text-gray-700">
              You completed <span className="font-semibold">{matchName}</span>
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Points earned */}
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Points Earned</p>
              <p className="text-4xl font-bold text-amber-600">+{pointsEarned}</p>
            </div>
          </div>

          {/* Streak bonus */}
          {streakContinued && (
            <div className="rounded-lg bg-green-50 p-4 shadow-sm border border-green-200 animate-pulse">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">🔥 Streak Bonus!</p>
                <p className="text-lg font-semibold text-green-700">+20 bonus points</p>
              </div>
            </div>
          )}

          {/* Badges unlocked (optional) */}
          <div className="rounded-lg bg-blue-50 p-4 shadow-sm border border-blue-200">
            <p className="text-xs text-gray-600 text-center mb-2">Badge Progress</p>
            <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-blue-500 transition-all duration-500"
                style={{ width: '60%' }}
              />
            </div>
            <p className="text-xs text-gray-600 text-center mt-2">3 more to unlock a badge</p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 rounded-lg border-gray-300"
            onClick={onContinue}
          >
            Back to Home
          </Button>
          <Button className="flex-1 rounded-lg bg-green-500 hover:bg-green-600 text-white" onClick={onContinue}>
            Continue Learning
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
