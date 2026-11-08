import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import { CompactProgress } from '@/components/progress-widgets';
import { Stickman } from '@/components/stickman';
import { PageHeading } from '@/components/ui';

export const metadata: Metadata = { title: 'Profils' };
export default function ProfilePage() {
  return <div><PageHeading eyebrow="Spēlētāja identitāte" title="Viesa profils" description="Sākuma profils darbojas bez reģistrācijas. Tā dati ir privāti šai pārlūkprogrammai un netiek sinhronizēti." />
    <div className="mt-10 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
      <section className="surface overflow-hidden rounded-3xl p-6 text-center sm:p-8"><Stickman className="mx-auto w-full max-w-[260px]" /><h2 className="mt-2 text-2xl font-black">Viesis</h2><p className="mt-1 text-sm text-[var(--muted)]">Neitrālais baltais Stickman</p><span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/25 bg-[var(--accent)]/8 px-3 py-1.5 text-xs font-bold text-[var(--accent)]"><ShieldCheck size={15} /> Lokāls profils</span></section>
      <section className="space-y-5"><div className="surface rounded-3xl p-6 sm:p-8"><h2 className="text-xl font-black">Spēlētāja kopsavilkums</h2><div className="mt-6"><CompactProgress /></div><p className="mt-5 text-sm leading-6 text-[var(--muted)]">Līmenis aug no XP par pabeigtām aktivitātēm. Reitingi būs atsevišķi no XP un tiks ieviesti tikai ar servera validētu konkurētspējīgu spēli.</p></div><div className="rounded-3xl border border-dashed border-[var(--line)] p-6 sm:p-8"><p className="eyebrow">Drīzumā</p><h2 className="mt-2 text-xl font-black">Kosmētika un sasniegumi</h2><p className="mt-3 text-sm leading-6 text-[var(--muted)]">Krāsas, tērpi, pozas un animācijas būs vizuālas. Tās nekad nedos konkurences priekšrocību.</p></div></section>
    </div>
  </div>;
}
