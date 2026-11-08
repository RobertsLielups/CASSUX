import { describe, expect, it } from 'vitest';
import { QUESTIONS } from '../src/questions';

describe('question content', () => {
  it('contains at least 24 verified Latvian questions across both training modes', () => {
    expect(QUESTIONS).toHaveLength(24);
    expect(QUESTIONS.filter((question) => question.type === 'case')).toHaveLength(12);
    expect(QUESTIONS.filter((question) => question.type === 'premise')).toHaveLength(12);
    expect(QUESTIONS.every((question) => question.language === 'lv' && question.reviewStatus === 'verified')).toBe(true);
  });

  it('gives every question exactly three options and a valid answer index', () => {
    for (const question of QUESTIONS) {
      expect(question.options).toHaveLength(3);
      expect([0, 1, 2]).toContain(question.correctAnswerIndex);
      expect(question.options.every((option) => option.text.trim().length > 0)).toBe(true);
    }
  });

  it('uses unique IDs and nonempty explanations', () => {
    const ids = QUESTIONS.map((question) => question.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(QUESTIONS.every((question) => question.explanation.trim().length > 0)).toBe(true);
  });
});
