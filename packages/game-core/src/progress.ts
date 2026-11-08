export const GUEST_PROGRESS_STORAGE_KEY = 'cassux.guest-progress.v1';

export interface GuestProgress {
  readonly schemaVersion: 1;
  readonly xp: number;
  readonly completedSessions: number;
  readonly correctAnswers: number;
  readonly incorrectAnswers: number;
  readonly recentQuestionIds: readonly string[];
  readonly updatedAt: string;
}

export interface SessionPerformance {
  readonly correctAnswers: number;
  readonly incorrectAnswers: number;
  readonly questionIds: readonly string[];
}

export const EMPTY_GUEST_PROGRESS: GuestProgress = {
  schemaVersion: 1,
  xp: 0,
  completedSessions: 0,
  correctAnswers: 0,
  incorrectAnswers: 0,
  recentQuestionIds: [],
  updatedAt: '1970-01-01T00:00:00.000Z',
};

export function getLevel(xp: number): number {
  return Math.floor(Math.max(0, xp) / 200) + 1;
}

export function getAccuracy(progress: Pick<GuestProgress, 'correctAnswers' | 'incorrectAnswers'>): number {
  const total = progress.correctAnswers + progress.incorrectAnswers;
  return total === 0 ? 0 : Math.round((progress.correctAnswers / total) * 100);
}

export function calculateSessionXp(performance: SessionPerformance): number {
  return performance.correctAnswers * 25 + performance.incorrectAnswers * 10 + 20;
}

export function applyCompletedSession(
  progress: GuestProgress,
  performance: SessionPerformance,
  now = new Date(),
): GuestProgress {
  return {
    schemaVersion: 1,
    xp: progress.xp + calculateSessionXp(performance),
    completedSessions: progress.completedSessions + 1,
    correctAnswers: progress.correctAnswers + performance.correctAnswers,
    incorrectAnswers: progress.incorrectAnswers + performance.incorrectAnswers,
    recentQuestionIds: [...performance.questionIds, ...progress.recentQuestionIds].slice(0, 12),
    updatedAt: now.toISOString(),
  };
}

export interface ProgressRepository {
  load(): GuestProgress;
  save(progress: GuestProgress): void;
  clear(): void;
}

function isGuestProgress(value: unknown): value is GuestProgress {
  if (typeof value !== 'object' || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    candidate.schemaVersion === 1 &&
    typeof candidate.xp === 'number' &&
    typeof candidate.completedSessions === 'number' &&
    typeof candidate.correctAnswers === 'number' &&
    typeof candidate.incorrectAnswers === 'number' &&
    Array.isArray(candidate.recentQuestionIds) &&
    typeof candidate.updatedAt === 'string'
  );
}

export class LocalStorageProgressRepository implements ProgressRepository {
  constructor(private readonly storage: Storage) {}

  load(): GuestProgress {
    const raw = this.storage.getItem(GUEST_PROGRESS_STORAGE_KEY);
    if (!raw) return EMPTY_GUEST_PROGRESS;
    try {
      const parsed: unknown = JSON.parse(raw);
      return isGuestProgress(parsed) ? parsed : EMPTY_GUEST_PROGRESS;
    } catch {
      return EMPTY_GUEST_PROGRESS;
    }
  }

  save(progress: GuestProgress): void {
    this.storage.setItem(GUEST_PROGRESS_STORAGE_KEY, JSON.stringify(progress));
  }

  clear(): void {
    this.storage.removeItem(GUEST_PROGRESS_STORAGE_KEY);
  }
}
