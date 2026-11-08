'use client';

import {
  applyCompletedSession,
  EMPTY_GUEST_PROGRESS,
  GUEST_PROGRESS_STORAGE_KEY,
  getAccuracy,
  getLevel,
  LocalStorageProgressRepository,
  type GuestProgress,
  type SessionPerformance,
} from '@cassux/game-core';
import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from 'react';

interface ProgressContextValue {
  progress: GuestProgress;
  isLoaded: boolean;
  level: number;
  accuracy: number;
  completeSession: (performance: SessionPerformance) => GuestProgress;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextValue | null>(null);
const PROGRESS_CHANGE_EVENT = 'cassux:progress-change';

function subscribeToProgress(callback: () => void) {
  window.addEventListener(PROGRESS_CHANGE_EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(PROGRESS_CHANGE_EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

function getProgressSnapshot() {
  return window.localStorage.getItem(GUEST_PROGRESS_STORAGE_KEY);
}

function getServerProgressSnapshot() {
  return null;
}

export function ProgressProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const serializedProgress = useSyncExternalStore(
    subscribeToProgress,
    getProgressSnapshot,
    getServerProgressSnapshot,
  );
  const progress = useMemo<GuestProgress>(() => {
    if (serializedProgress === null || typeof window === 'undefined') return EMPTY_GUEST_PROGRESS;
    return new LocalStorageProgressRepository(window.localStorage).load();
  }, [serializedProgress]);

  const completeSession = useCallback((performance: SessionPerformance) => {
    const next = applyCompletedSession(progress, performance);
    new LocalStorageProgressRepository(window.localStorage).save(next);
    window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
    return next;
  }, [progress]);

  const resetProgress = useCallback(() => {
    new LocalStorageProgressRepository(window.localStorage).clear();
    window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
  }, []);

  const value = useMemo(
    () => ({
      progress,
      isLoaded: true,
      level: getLevel(progress.xp),
      accuracy: getAccuracy(progress),
      completeSession,
      resetProgress,
    }),
    [progress, completeSession, resetProgress],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (!context) throw new Error('useProgress must be used inside ProgressProvider.');
  return context;
}
