import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../src/questions';
import { evaluateAnswer, selectSessionQuestions } from '../src/session';

describe('solo session rules', () => {
  it('awards 100 points only for a correct answer', () => {
    const question = QUESTIONS[0];
    if (!question) throw new Error('Expected a fixture question.');
    expect(evaluateAnswer(question, question.correctAnswerIndex)).toMatchObject({ isCorrect: true, points: 100 });
    const wrongIndex = ((question.correctAnswerIndex + 1) % 3) as 0 | 1 | 2;
    expect(evaluateAnswer(question, wrongIndex)).toMatchObject({ isCorrect: false, points: 0 });
  });

  it('selects the requested mode and avoids recent questions when enough fresh content exists', () => {
    const recent: string[] = QUESTIONS.filter((question) => question.type === 'case').slice(0, 5).map((question) => question.id);
    const selected = selectSessionQuestions(QUESTIONS, 'case', recent, 5, () => 0.5);
    expect(selected).toHaveLength(5);
    expect(selected.every((question) => question.type === 'case')).toBe(true);
    expect(selected.every((question) => !recent.includes(question.id))).toBe(true);
  });
});
