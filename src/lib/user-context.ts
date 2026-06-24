// This would normally come from a database
// For now, we'll simulate it with localStorage-like structure

export interface UserProgress {
  streak: number;
  lastActivityDate: string; // ISO date string
  completedMatches: string[]; // match IDs
  badges: string[];
  totalPoints: number;
}

// Mock data - in production this comes from a backend
export const mockUserProgress: UserProgress = {
  streak: 5,
  lastActivityDate: new Date().toISOString().split('T')[0],
  completedMatches: [],
  badges: ['first-match', 'week-warrior', 'geography-ace'],
  totalPoints: 420,
};
