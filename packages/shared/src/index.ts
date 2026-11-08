export const GAME_MODES = [
  'case-duel',
  'premise-duel',
  'detective',
  'mafia',
  'sabotage-strategy',
  'economic-strategy',
  'systems',
] as const;

export type GameMode = (typeof GAME_MODES)[number];
export type TrainingMode = 'case' | 'premise';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type QuestionCategory =
  | 'evidence'
  | 'causality'
  | 'decisions'
  | 'systems'
  | 'arguments'
  | 'fallacies'
  | 'assumptions'
  | 'conditions';

export interface AnswerOption {
  readonly id: string;
  readonly text: string;
}

export interface Question {
  readonly id: string;
  readonly language: 'lv';
  readonly type: TrainingMode;
  readonly category: QuestionCategory;
  readonly difficulty: Difficulty;
  readonly title: string;
  readonly scenario: string;
  readonly prompt: string;
  readonly options: readonly [AnswerOption, AnswerOption, AnswerOption];
  readonly correctAnswerIndex: 0 | 1 | 2;
  readonly explanation: string;
  readonly sourceType: 'original';
  readonly reviewStatus: 'verified';
  readonly version: number;
}

export type MatchStatus =
  | 'waiting'
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled';
export type ParticipantStatus = 'invited' | 'ready' | 'active' | 'disconnected' | 'finished';
export type RatingCategory =
  | 'bullet'
  | 'blitz'
  | 'rapid'
  | 'correspondence'
  | 'detective'
  | 'social-strategy'
  | 'economic-strategy';
export type GameResult = 'win' | 'loss' | 'draw' | 'forfeit' | 'timeout' | 'cancelled';

export interface TimeControl {
  readonly kind: 'live' | 'correspondence';
  readonly initialSeconds?: number;
  readonly incrementSeconds?: number;
  readonly answerDeadlineSeconds?: number;
  readonly ratingCategory: RatingCategory;
}

export interface MatchParticipant {
  readonly playerId: string;
  readonly displayName: string;
  readonly seat: number;
  readonly status: ParticipantStatus;
  readonly score: number;
  readonly remainingTimeMs?: number;
}

export interface AnswerSubmission {
  readonly id: string;
  readonly matchId: string;
  readonly questionId: string;
  readonly playerId: string;
  readonly optionIndex: 0 | 1 | 2;
  readonly acceptedAt: string;
  readonly isCorrect?: boolean;
  readonly awardedPoints?: number;
}

export interface MatchState {
  readonly round: number;
  readonly currentQuestionId?: string;
  readonly questionUnlockedAt?: string;
  readonly answerDeadlineAt?: string;
  readonly submissions: readonly AnswerSubmission[];
}

export interface Match {
  readonly id: string;
  readonly mode: GameMode;
  readonly status: MatchStatus;
  readonly ranked: boolean;
  readonly participants: readonly MatchParticipant[];
  readonly timeControl: TimeControl;
  readonly state: MatchState;
  readonly createdAt: string;
  readonly completedAt?: string;
}

export type MatchEvent =
  | { readonly type: 'match.created'; readonly at: string; readonly matchId: string }
  | { readonly type: 'participant.joined'; readonly at: string; readonly playerId: string }
  | { readonly type: 'question.unlocked'; readonly at: string; readonly questionId: string }
  | { readonly type: 'answer.accepted'; readonly at: string; readonly submissionId: string }
  | { readonly type: 'clock.expired'; readonly at: string; readonly playerId: string }
  | { readonly type: 'match.completed'; readonly at: string; readonly results: Readonly<Record<string, GameResult>> };
