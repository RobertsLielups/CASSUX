import { beforeEach, describe, expect, it } from 'vitest';
import {
  applyCompletedSession,
  EMPTY_GUEST_PROGRESS,
  getAccuracy,
  getLevel,
  LocalStorageProgressRepository,
} from '../src/progress';

class MemoryStorage implements Storage {
  private data = new Map<string, string>();
  get length() { return this.data.size; }
  clear() { this.data.clear(); }
  getItem(key: string) { return this.data.get(key) ?? null; }
  key(index: number) { return [...this.data.keys()][index] ?? null; }
  removeItem(key: string) { this.data.delete(key); }
  setItem(key: string, value: string) { this.data.set(key, value); }
}

describe('guest progression', () => {
  let storage: MemoryStorage;

  beforeEach(() => { storage = new MemoryStorage(); });

  it('updates XP, totals, level, accuracy, and recent questions after a session', () => {
    const next = applyCompletedSession(
      EMPTY_GUEST_PROGRESS,
      { correctAnswers: 3, incorrectAnswers: 2, questionIds: ['a', 'b', 'c', 'd', 'e'] },
      new Date('2026-01-01T00:00:00.000Z'),
    );
    expect(next).toMatchObject({ xp: 115, completedSessions: 1, correctAnswers: 3, incorrectAnswers: 2 });
    expect(next.recentQuestionIds).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(getLevel(next.xp)).toBe(1);
    expect(getAccuracy(next)).toBe(60);
  });

  it('persists and reloads guest progress through the repository boundary', () => {
    const repository = new LocalStorageProgressRepository(storage);
    const expected = applyCompletedSession(EMPTY_GUEST_PROGRESS, { correctAnswers: 5, incorrectAnswers: 0, questionIds: ['1'] });
    repository.save(expected);
    expect(new LocalStorageProgressRepository(storage).load()).toEqual(expected);
  });

  it('falls back safely when persisted data is invalid', () => {
    storage.setItem('cassux.guest-progress.v1', '{broken');
    expect(new LocalStorageProgressRepository(storage).load()).toEqual(EMPTY_GUEST_PROGRESS);
  });
});
