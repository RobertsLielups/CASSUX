import type { Metadata } from 'next';
import { BrainCircuit, Building2, CircleDollarSign, Search, ShieldQuestion, Target, Users } from 'lucide-react';
import Link from 'next/link';
import { ComingSoon, PageHeading } from '@/components/ui';

export const metadata: Metadata = { title: 'Spēlēt' };

const futureModes = [
  { icon: Search, title: 'Detektīvs', text: 'Izmeklē fiksētu lietu ar pierādījumiem un pretrunīgām liecībām.' },
  { icon: Users, title: 'Mafija', text: 'Sociālā dedukcija, slepenas lomas, diskusija un balsošana.' },
  { icon: ShieldQuestion, title: 'Slēptā sabotāža', text: 'Sadarbība, uzticēšanās un oriģināla slepeno lomu stratēģija.' },
  { icon: CircleDollarSign, title: 'Ekonomiskā stratēģija', text: 'Aktīvi, resursi, sarunas un ilgtermiņa riski.' },
  { icon: Building2, title: 'Sistēmas', text: 'Savstarpēji saistīti lēmumi ar ticamām aizkavētām sekām.' },
];

export default function PlayPage() {
  return <div><PageHeading eyebrow="Spēļu centrs" title="Izvēlies savu domāšanas arēnu" description="Milestone 001 piedāvā divus pilnībā funkcionālus solo treniņus. Tiešsaistes spēles vēl nav pieejamas." />
    <section className="mt-10 grid gap-5 md:grid-cols-2">
      <PlayableCard href="/play/solo/cases" icon={<Target />} title="Kāzusu treniņš" text="Reālistiski lēmumi, pierādījumi, cēloņi un sistēmas." details="12 jautājumi · 3 grūtības" />
      <PlayableCard href="/play/solo/premises" icon={<BrainCircuit />} title="Premisu treniņš" text="Secinājumi, nosacījumi, pieņēmumi un loģikas kļūdas." details="12 jautājumi · 3 grūtības" />
    </section>
    <section className="mt-12"><div className="flex items-center gap-3"><p className="eyebrow">Platformas nākotne</p><ComingSoon /></div><h2 className="mt-3 text-2xl font-black">Plānotās spēles</h2><div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{futureModes.map(({ icon: Icon, title, text }) => <article key={title} className="rounded-2xl border border-[var(--line)] bg-[var(--panel)]/55 p-5 opacity-80"><div className="flex items-center justify-between"><Icon size={22} className="text-[#a9b6c3]" /><ComingSoon /></div><h3 className="mt-5 font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-[var(--muted)]">{text}</p></article>)}</div></section>
  </div>;
}

function PlayableCard({ href, icon, title, text, details }: Readonly<{ href: string; icon: React.ReactNode; title: string; text: string; details: string }>) {
  return <Link href={href} className="surface group rounded-3xl p-6 hover:-translate-y-0.5 hover:border-[#435362] sm:p-8"><span className="grid size-12 place-items-center rounded-xl bg-[var(--accent)]/10 text-[var(--accent)]">{icon}</span><p className="eyebrow mt-8">Pieejams · Solo</p><h2 className="mt-2 text-2xl font-black">{title}</h2><p className="mt-3 leading-6 text-[var(--muted)]">{text}</p><p className="mt-6 text-xs font-bold uppercase tracking-wider text-[#c7d0d9]">{details}</p></Link>;
}
