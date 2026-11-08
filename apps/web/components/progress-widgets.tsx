'use client';

import { useProgress } from './progress-provider';

export function CompactProgress() {
  const { progress, level, accuracy, isLoaded } = useProgress();
  const values = [
    { label: 'Līmenis', value: level },
    { label: 'XP', value: progress.xp },
    { label: 'Precizitāte', value: `${accuracy}%` },
  ];
  return (
    <div className="grid grid-cols-3 gap-2" aria-busy={!isLoaded}>
      {values.map((item) => <div key={item.label} className="rounded-xl border border-[var(--line)] bg-black/15 p-3"><p className="text-[10px] font-bold uppercase tracking-wider text-[var(--muted)]">{item.label}</p><p className="mt-1 text-lg font-black">{isLoaded ? item.value : '—'}</p></div>)}
    </div>
  );
}

export function ProgressDashboard() {
  const { progress, level, accuracy, isLoaded } = useProgress();
  const total = progress.correctAnswers + progress.incorrectAnswers;
  const levelStart = (level - 1) * 200;
  const towardNext = progress.xp - levelStart;
  return (
    <div aria-busy={!isLoaded} className="mt-8 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
      <section className="surface rounded-3xl p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4"><div><p className="eyebrow">Kopējā pieredze</p><p className="mt-2 text-4xl font-black">{isLoaded ? progress.xp : '—'} XP</p></div><p className="text-sm font-bold text-[var(--muted)]">Līmenis {level}</p></div>
        <div className="mt-6 h-3 overflow-hidden rounded-full bg-white/8"><div className="h-full rounded-full bg-[var(--accent)]" style={{ width: `${Math.min(100, (towardNext / 200) * 100)}%` }} /></div>
        <p className="mt-3 text-xs text-[var(--muted)]">{towardNext} / 200 XP līdz nākamajam līmenim</p>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Metric label="Sesijas" value={progress.completedSessions} />
          <Metric label="Atbildes" value={total} />
          <Metric label="Pareizi" value={progress.correctAnswers} />
          <Metric label="Precizitāte" value={`${accuracy}%`} />
        </div>
      </section>
      <aside className="surface rounded-3xl p-6 sm:p-8">
        <p className="eyebrow">Datu statuss</p>
        <h2 className="mt-3 text-xl font-black">Viesa progress</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Dati glabājas tikai šajā pārlūkprogrammā. Tie nav konts, nav sinhronizēti un pazudīs, ja notīrīsi vietnes datus.</p>
      </aside>
    </div>
  );
}

function Metric({ label, value }: Readonly<{ label: string; value: string | number }>) {
  return <div className="rounded-2xl border border-[var(--line)] bg-black/15 p-4"><p className="text-xs font-bold text-[var(--muted)]">{label}</p><p className="mt-2 text-2xl font-black">{value}</p></div>;
}
