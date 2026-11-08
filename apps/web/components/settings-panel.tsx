'use client';

import { useEffect, useState } from 'react';
import { useProgress } from './progress-provider';

const SETTINGS_KEY = 'cassux.settings.v1';

export function SettingsPanel() {
  const { resetProgress } = useProgress();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [sound, setSound] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(SETTINGS_KEY) ?? '{}') as { reducedMotion?: boolean; sound?: boolean };
        setReducedMotion(Boolean(saved.reducedMotion));
        setSound(saved.sound ?? true);
      } catch {
        // Invalid local preferences safely fall back to defaults.
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  function save(nextReducedMotion: boolean, nextSound: boolean) {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify({ reducedMotion: nextReducedMotion, sound: nextSound }));
    document.documentElement.style.scrollBehavior = nextReducedMotion ? 'auto' : '';
    setMessage('Iestatījumi saglabāti šajā pārlūkprogrammā.');
  }

  return (
    <div className="mt-8 grid gap-5 lg:grid-cols-2">
      <section className="surface rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-black">Valoda un pieejamība</h2>
        <label className="mt-6 block"><span className="mb-2 block text-sm font-bold">Saskarnes valoda</span><select disabled className="w-full rounded-xl border border-[var(--line)] bg-black/20 px-4 py-3 text-[var(--muted)]"><option>Latviešu (lv)</option></select><span className="mt-2 block text-xs text-[var(--muted)]">Angļu valoda ir plānota vēlāk.</span></label>
        <SettingToggle label="Samazināt animācijas" description="Samazina nebūtiskas kustības šajā ierīcē." checked={reducedMotion} onChange={(checked) => { setReducedMotion(checked); save(checked, sound); }} />
        <SettingToggle label="Skaņas efekti" description="Prototipā skaņas vēl netiek atskaņotas; izvēle saglabāta nākotnei." checked={sound} onChange={(checked) => { setSound(checked); save(reducedMotion, checked); }} />
        <p role="status" className="mt-4 min-h-5 text-xs text-[var(--accent)]">{message}</p>
      </section>
      <section className="surface rounded-3xl p-6 sm:p-8">
        <h2 className="text-xl font-black">Lokālie dati</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">Viesa progresu var dzēst tikai no šīs pārlūkprogrammas. Šo darbību nevar atsaukt.</p>
        <button onClick={() => { if (window.confirm('Vai tiešām dzēst visu lokālo CASSUX progresu?')) { resetProgress(); setMessage('Lokālais progress dzēsts.'); } }} className="mt-6 rounded-xl border border-[var(--danger)]/50 px-4 py-2.5 text-sm font-bold text-[var(--danger)] hover:bg-[var(--danger)]/8">Dzēst viesa progresu</button>
      </section>
    </div>
  );
}

function SettingToggle({ label, description, checked, onChange }: Readonly<{ label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }>) {
  return <label className="mt-6 flex cursor-pointer items-start justify-between gap-5 border-t border-[var(--line)] pt-5"><span><span className="block text-sm font-bold">{label}</span><span className="mt-1 block text-xs leading-5 text-[var(--muted)]">{description}</span></span><input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} className="mt-1 size-5 accent-[#b7f566]" /></label>;
}
