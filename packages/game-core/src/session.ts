import type { Question, TrainingMode } from '@cassux/shared';

export const SOLO_SESSION_LENGTH = 5;
export const POINTS_PER_CORRECT_ANSWER = 100;

export interface AnswerEvaluation {
  readonly questionId: string;
  readonly selectedIndex: 0 | 1 | 2;
  readonly correctIndex: 0 | 1 | 2;
  readonly isCorrect: boolean;
  readonly points: number;
}

export function evaluateAnswer(question: Question, selectedIndex: 0 | 1 | 2): AnswerEvaluation {
  const isCorrect = selectedIndex === question.correctAnswerIndex;
  return {
    questionId: question.id,
    selectedIndex,
    correctIndex: question.correctAnswerIndex,
    isCorrect,
    points: isCorrect ? POINTS_PER_CORRECT_ANSWER : 0,
  };
}

function shuffled<T>(items: readonly T[], random: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const current = result[index];
    const other = result[swapIndex];
    if (current !== undefined && other !== undefined) {
      result[index] = other;
      result[swapIndex] = current;
    }
  }
  return result;
}

export function selectSessionQuestions(
  allQuestions: readonly Question[],
  mode: TrainingMode,
  recentQuestionIds: readonly string[] = [],
  count = SOLO_SESSION_LENGTH,
  random: () => number = Math.random,
): Question[] {
  const modeQuestions = allQuestions.filter((question) => question.type === mode);
  if (modeQuestions.length < count) {
    throw new Error(`Not enough ${mode} questions for a ${count}-question session.`);
  }

  const recent = new Set(recentQuestionIds);
  const fresh = shuffled(modeQuestions.filter((question) => !recent.has(question.id)), random);
  const repeats = shuffled(modeQuestions.filter((question) => recent.has(question.id)), random);
  return [...fresh, ...repeats].slice(0, count);
}
