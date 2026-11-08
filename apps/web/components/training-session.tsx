'use client';

import {
  calculateSessionXp,
  evaluateAnswer,
  POINTS_PER_CORRECT_ANSWER,
  QUESTIONS,
  selectSessionQuestions,
  SOLO_SESSION_LENGTH,
  type AnswerEvaluation,
} from '@cassux/game-core';
import type { Question, TrainingMode } from '@cassux/shared';
import { ArrowLeft, ArrowRight, Check, RotateCcw, X } from 'lucide-react';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useProgress } from './progress-provider';

type SessionStage = 'intro' | 'playing' | 'summary';

const modeCopy = {
  case: {
    label: 'Kāzusu treniņš',
    description: 'Izvērtē faktus, riskus, cēloņus un sistēmu sekas piecos reālistiskos scenārijos.',
  },
  premise: {
    label: 'Premisu treniņš',
    description: 'Pārbaudi secinājumus, nosacījumus, pieņēmumus un argumentācijas kļūdas.',
  },
} satisfies Record<TrainingMode, { label: string; description: string }>;

export function TrainingSession({ mode }: Readonly<{ mode: TrainingMode }>) {
  const { progress, completeSession } = useProgress();
  const [stage, setStage] = useState<SessionStage>('intro');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<0 | 1 | 2 | null>(null);
  const [currentEvaluation, setCurrentEvaluation] = useState<AnswerEvaluation | null>(null);
  const [answers, setAnswers] = useState<AnswerEvaluation[]>([]);
  const [showReview, setShowReview] = useState(false);

  const copy = modeCopy[mode];
  const correctCount = answers.filter((answer) => answer.isCorrect).length;
  const incorrectCount = answers.length - correctCount;
  const score = answers.reduce((total, answer) => total + answer.points, 0);
  const earnedXp = calculateSessionXp({
    correctAnswers: correctCount,
    incorrectAnswers: incorrectCount,
    questionIds: questions.map((question) => question.id),
  });
  const incorrectAnswers = useMemo(
    () => answers.map((answer, index) => ({ answer, question: questions[index] })).filter((item) => !item.answer.isCorrect && item.question),
    [answers, questions],
  );

  function startSession() {
    setQuestions(selectSessionQuestions(QUESTIONS, mode, progress.recentQuestionIds));
    setCurrentIndex(0);
    setSelectedIndex(null);
    setCurrentEvaluation(null);
    setAnswers([]);
    setShowReview(false);
    setStage('playing');
  }

  function submitAnswer() {
    const question = questions[currentIndex];
    if (!question || selectedIndex === null || currentEvaluation) return;
    const evaluation = evaluateAnswer(question, selectedIndex);
    setCurrentEvaluation(evaluation);
    setAnswers((current) => [...current, evaluation]);
  }

  function advance() {
    if (!currentEvaluation) return;
    if (currentIndex === questions.length - 1) {
      completeSession({
        correctAnswers: correctCount,
        incorrectAnswers: incorrectCount,
        questionIds: questions.map((question) => question.id),
      });
      setStage('summary');
      return;
    }
    setCurrentIndex((index) => index + 1);
    setSelectedIndex(null);
    setCurrentEvaluation(null);
  }

  if (stage === 'intro') {
    return (
      <section className="surface mx-auto max-w-3xl overflow-hidden rounded-3xl">
        <div className="border-b border-[var(--line)] p-6 sm:p-9">
          <Link href="/play" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-white">
            <ArrowLeft size={17} aria-hidden="true" /> Atpakaļ uz spēlēm
          </Link>
          <p className="eyebrow mt-10">Solo · saglabājas lokāli</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">{copy.label}</h1>
          <p className="mt-4 max-w-xl leading-7 text-[var(--muted)]">{copy.description}</p>
        </div>
        <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-9">
          <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Jautājumi</p><p className="mt-1 text-2xl font-black">{SOLO_SESSION_LENGTH}</p></div>
          <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Punkti</p><p className="mt-1 text-2xl font-black">{POINTS_PER_CORRECT_ANSWER} / pareizu</p></div>
          <div><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">Ātrums</p><p className="mt-1 text-2xl font-black">Nav bonusa</p></div>
        </div>
        <div className="border-t border-[var(--line)] p-6 sm:p-9">
          <button data-testid="start-session" onClick={startSession} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3.5 font-black text-[#11180a] hover:bg-[var(--accent-strong)] sm:w-auto">
            Sākt treniņu <ArrowRight size={18} aria-hidden="true" />
          </button>
          <p className="mt-4 text-xs leading-5 text-[var(--muted)]">Par katru pareizu atbildi: 25 XP; par kļūdainu: 10 XP; par pabeigtu sesiju: +20 XP.</p>
        </div>
      </section>
    );
  }

  if (stage === 'summary') {
    return (
      <section data-testid="session-summary" className="mx-auto max-w-4xl">
        <div className="surface rounded-3xl p-6 sm:p-10">
          <p className="eyebrow">Sesija pabeigta</p>
          <h1 className="mt-3 text-3xl font-black tracking-[-0.04em] sm:text-5xl">{correctCount}/{questions.length} pareizi</h1>
          <p className="mt-3 text-[var(--muted)]">Rezultāts saglabāts šīs pārlūkprogrammas viesa profilā.</p>
          <div className="mt-8 grid grid-cols-3 gap-3">
            <ResultStat label="Punkti" value={score.toString()} />
            <ResultStat label="Precizitāte" value={`${Math.round((correctCount / questions.length) * 100)}%`} />
            <ResultStat label="Iegūts" value={`+${earnedXp} XP`} accent />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button onClick={startSession} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-black text-[#101609] hover:bg-[var(--accent-strong)]">
              <RotateCcw size={17} aria-hidden="true" /> Sākt vēlreiz
            </button>
            {incorrectAnswers.length > 0 && (
              <button data-testid="review-incorrect" onClick={() => setShowReview((value) => !value)} className="rounded-xl border border-[var(--line)] px-5 py-3 font-bold hover:bg-white/5">
                {showReview ? 'Paslēpt kļūdu pārskatu' : `Pārskatīt kļūdas (${incorrectAnswers.length})`}
              </button>
            )}
            <Link href="/progress" className="rounded-xl border border-[var(--line)] px-5 py-3 text-center font-bold hover:bg-white/5">Skatīt progresu</Link>
          </div>
        </div>

        {showReview && (
          <div data-testid="incorrect-review" className="mt-5 space-y-4">
            {incorrectAnswers.map(({ answer, question }) => question && (
              <article key={question.id} className="surface rounded-2xl p-5 sm:p-7">
                <p className="text-xs font-extrabold uppercase tracking-wider text-[var(--danger)]">Jāatkārto · {question.title}</p>
                <h2 className="mt-3 text-lg font-bold">{question.prompt}</h2>
                <p className="mt-4 text-sm text-[var(--muted)]"><span className="font-bold text-white">Tava atbilde:</span> {question.options[answer.selectedIndex].text}</p>
                <p className="mt-2 text-sm text-[var(--muted)]"><span className="font-bold text-[var(--accent)]">Pareizā atbilde:</span> {question.options[question.correctAnswerIndex].text}</p>
                <p className="mt-4 border-l-2 border-[var(--accent)] pl-4 text-sm leading-6 text-[#cbd4de]">{question.explanation}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    );
  }

  const question = questions[currentIndex];
  if (!question) return null;

  return (
    <section className="mx-auto max-w-4xl" aria-live="polite">
      <div className="mb-5 flex items-center justify-between gap-4">
        <Link href="/play" className="inline-flex items-center gap-2 text-sm font-bold text-[var(--muted)] hover:text-white"><ArrowLeft size={17} aria-hidden="true" /> Iziet</Link>
        <p className="text-sm font-bold text-[var(--muted)]">{currentIndex + 1} / {questions.length}</p>
      </div>
      <div className="mb-6 flex gap-2" aria-label={`Jautājums ${currentIndex + 1} no ${questions.length}`}>
        {questions.map((item, index) => <span key={item.id} className={`h-1.5 flex-1 rounded-full ${index <= currentIndex ? 'bg-[var(--accent)]' : 'bg-white/10'}`} />)}
      </div>

      <article className="surface rounded-3xl p-5 sm:p-9">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted)]">
          <span>{question.type === 'case' ? 'Kāzuss' : 'Premisa'}</span><span aria-hidden="true">·</span><span>{difficultyLabel(question.difficulty)}</span><span aria-hidden="true">·</span><span>{question.title}</span>
        </div>
        <p className="mt-7 rounded-2xl border border-[var(--line)] bg-black/15 p-5 leading-7 text-[#cbd4de] sm:p-6">{question.scenario}</p>
        <h1 className="mt-7 text-balance text-xl font-black tracking-[-0.02em] sm:text-2xl">{question.prompt}</h1>

        <fieldset className="mt-6 space-y-3" disabled={Boolean(currentEvaluation)}>
          <legend className="sr-only">Izvēlies vienu atbildi</legend>
          {question.options.map((option, index) => {
            const optionIndex = index as 0 | 1 | 2;
            const selected = selectedIndex === optionIndex;
            const correct = currentEvaluation && question.correctAnswerIndex === optionIndex;
            const incorrectSelected = currentEvaluation && selected && !currentEvaluation.isCorrect;
            return (
              <label key={option.id} className={`flex cursor-pointer items-start gap-4 rounded-2xl border p-4 sm:p-5 ${correct ? 'border-[var(--accent)] bg-[var(--accent)]/8' : incorrectSelected ? 'border-[var(--danger)] bg-[var(--danger)]/8' : selected ? 'border-[#7fc9ff] bg-[#7fc9ff]/8' : 'border-[var(--line)] hover:border-[#455565] hover:bg-white/[0.025]'}`}>
                <input className="mt-1 size-4 accent-[#b7f566]" type="radio" name="answer" checked={selected} onChange={() => setSelectedIndex(optionIndex)} />
                <span className="flex-1 font-semibold leading-6">{option.text}</span>
                {correct && <Check className="mt-0.5 text-[var(--accent)]" size={20} aria-label="Pareizā atbilde" />}
                {incorrectSelected && <X className="mt-0.5 text-[var(--danger)]" size={20} aria-label="Kļūdaina atbilde" />}
              </label>
            );
          })}
        </fieldset>

        {currentEvaluation && (
          <div data-testid="answer-feedback" className={`mt-6 rounded-2xl border p-5 ${currentEvaluation.isCorrect ? 'border-[var(--accent)]/40 bg-[var(--accent)]/7' : 'border-[var(--danger)]/40 bg-[var(--danger)]/7'}`}>
            <p className="flex items-center gap-2 font-black">{currentEvaluation.isCorrect ? <><Check size={20} aria-hidden="true" /> Pareizi · +100 punkti</> : <><X size={20} aria-hidden="true" /> Šoreiz nepareizi</>}</p>
            <p className="mt-3 leading-6 text-[#cbd4de]">{question.explanation}</p>
          </div>
        )}

        <div className="mt-7 flex justify-end">
          {!currentEvaluation ? (
            <button data-testid="submit-answer" disabled={selectedIndex === null} onClick={submitAnswer} className="rounded-xl bg-[var(--accent)] px-6 py-3 font-black text-[#101609] hover:bg-[var(--accent-strong)]">Iesniegt atbildi</button>
          ) : (
            <button data-testid="next-question" onClick={advance} className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-black text-[#101609] hover:bg-[var(--accent-strong)]">
              {currentIndex === questions.length - 1 ? 'Pabeigt sesiju' : 'Nākamais jautājums'} <ArrowRight size={18} aria-hidden="true" />
            </button>
          )}
        </div>
      </article>
    </section>
  );
}

function ResultStat({ label, value, accent = false }: Readonly<{ label: string; value: string; accent?: boolean }>) {
  return <div className="rounded-2xl border border-[var(--line)] bg-black/15 p-4"><p className="text-xs font-bold uppercase tracking-wider text-[var(--muted)]">{label}</p><p className={`mt-2 text-xl font-black sm:text-2xl ${accent ? 'text-[var(--accent)]' : ''}`}>{value}</p></div>;
}

function difficultyLabel(difficulty: Question['difficulty']) {
  return { easy: 'Viegls', medium: 'Vidējs', hard: 'Grūts' }[difficulty];
}
