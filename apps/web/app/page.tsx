import { BrainCircuit, ChevronRight, Swords, Target } from 'lucide-react';
import Link from 'next/link';
import { CompactProgress } from '@/components/progress-widgets';
import { Stickman } from '@/components/stickman';
import { PrimaryLink } from '@/components/ui';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="surface relative overflow-hidden rounded-[2rem] p-6 sm:p-10 lg:min-h-[440px] lg:p-12">
        <div className="relative z-10 max-w-2xl">
          <p className="eyebrow">Milestone 001 · Solo treniņš</p>
          <h1 className="mt-4 text-balance text-4xl font-black tracking-[-0.055em] sm:text-6xl lg:text-7xl">Domā. Spēlē. <span className="text-[var(--accent)]">Pārspēj.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[var(--muted)] sm:text-lg">Trenē argumentāciju ar reālistiskiem kāzusiem un loģikas premisām. Pieci jautājumi, skaidrs rezultāts, nekādu minējumu par slēptiem noteikumiem.</p>
          <div className="mt-8 flex flex-wrap gap-3"><PrimaryLink href="/play">Sākt spēlēt</PrimaryLink><Link href="/learn" className="rounded-xl border border-[var(--line)] px-5 py-3 text-sm font-bold hover:bg-white/5">Apgūt pamatus</Link></div>
        </div>
        <Stickman className="pointer-events-none absolute -bottom-12 -right-8 hidden w-[340px] opacity-90 lg:block" />
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.4fr_0.6fr]">
        <section>
          <div className="mb-4 flex items-end justify-between"><div><p className="eyebrow">Izvēlies treniņu</p><h2 className="mt-2 text-2xl font-black">Šodienas izaicinājums</h2></div><Link href="/play" className="text-sm font-bold text-[var(--muted)] hover:text-white">Visas spēles</Link></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <ModeCard href="/play/solo/cases" icon={<Target />} title="Kāzusu treniņš" text="Fakti, cēloņi un lēmumi." />
            <ModeCard href="/play/solo/premises" icon={<BrainCircuit />} title="Premisu treniņš" text="Argumenti, pieņēmumi un kļūdas." />
          </div>
        </section>
        <aside className="surface rounded-3xl p-6">
          <div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]"><Swords size={20} /></span><div><p className="text-xs font-bold text-[var(--muted)]">Tavs progress</p><h2 className="font-black">Viesa profils</h2></div></div>
          <div className="mt-6"><CompactProgress /></div>
          <p className="mt-5 text-xs leading-5 text-[var(--muted)]">Saglabāts tikai šajā pārlūkprogrammā. Nav sinhronizēts ar citām ierīcēm.</p>
        </aside>
      </div>
    </div>
  );
}

function ModeCard({ href, icon, title, text }: Readonly<{ href: string; icon: React.ReactNode; title: string; text: string }>) {
  return <Link href={href} className="surface group flex items-center gap-4 rounded-2xl p-5 hover:-translate-y-0.5 hover:border-[#425262]"><span className="grid size-12 shrink-0 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">{icon}</span><span className="min-w-0 flex-1"><span className="block font-black">{title}</span><span className="mt-1 block text-sm text-[var(--muted)]">{text}</span></span><ChevronRight className="text-[var(--muted)] group-hover:text-white" size={20} /></Link>;
}
