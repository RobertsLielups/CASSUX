import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpenCheck } from 'lucide-react';
import { PageHeading } from '@/components/ui';

export const metadata: Metadata = { title: 'Mācīties' };

const lessons = [
  { id: 'premisa', title: 'Kas ir premisa?', text: 'Premisa ir apgalvojums, ko arguments izmanto kā pamatu secinājumam.', example: 'Premisa: visi līgumi jāparaksta. Šis ir līgums. Tātad tas jāparaksta.', href: '/play/solo/premises' },
  { id: 'secinajums', title: 'Kas ir secinājums?', text: 'Secinājums ir apgalvojums, kuru cenšas pamatot ar premisām. Labs secinājums nepārsniedz to, ko premisas ļauj teikt.', example: 'No “daži putni nelido” neizriet “neviens putns nelido”.', href: '/play/solo/premises' },
  { id: 'kazuss', title: 'Kas ir kāzuss?', text: 'Kāzuss ir konkrēta situācija ar faktiem, ierobežojumiem un jautājumu. Jāatšķir dotais no pieņēmumiem.', example: 'Piekļuves karte pierāda kartes izmantošanu, ne obligāti tās īpašnieka klātbūtni.', href: '/play/solo/cases' },
  { id: 'kluda', title: 'Kas ir loģiskā kļūda?', text: 'Loģiskā kļūda ir maldinošs argumentācijas paņēmiens. Secinājums var būt patiess, bet izmantotais pamatojums — nederīgs.', example: '“Viņas ideja ir slikta, jo viņa kavē sapulces” uzbrūk personai, nevis idejai.', href: '/play/solo/premises' },
  { id: 'korelacija', title: 'Korelācija un cēloņsakarība', text: 'Korelācija nozīmē, ka divas parādības mainās kopā. Tā viena pati nepierāda, ka viena izraisa otru.', example: 'Karstā laikā aug gan saldējuma pārdošana, gan peldvietu apmeklējums; abus ietekmē temperatūra.', href: '/play/solo/cases' },
  { id: 'pienemumi', title: 'Kāpēc pārbaudīt pieņēmumus?', text: 'Pieņēmums ir neizteikts balsts starp faktiem un secinājumu. Ja tas ir aplams, arguments var sabrukt.', example: 'Ilgāks darba laiks palielina peļņu tikai tad, ja papildu ieņēmumi pārsniedz izmaksas.', href: '/play/solo/premises' },
  { id: 'sistemas', title: 'Kas ir sistēmiskā domāšana?', text: 'Tā pēta elementu attiecības, plūsmas, aizkaves un atgriezeniskās saites, ne tikai vienu notikumu.', example: 'Vienreiz samazināt pieteikumu rindu nepietiek, ja ik nedēļu ienāk vairāk pieteikumu, nekā komanda spēj atrisināt.', href: '/play/solo/cases' },
];

export default function LearnPage() {
  return <div><PageHeading eyebrow="Īsi un praktiski" title="Domāšanas pamati" description="Septiņi jēdzieni, kas palīdz pamatot izvēles. Izlasi piemēru un uzreiz pārbaudi to treniņā." />
    <div className="mt-10 grid gap-5 lg:grid-cols-2">{lessons.map((lesson, index) => <article id={lesson.id} key={lesson.id} className="surface scroll-mt-24 rounded-3xl p-6 sm:p-8"><div className="flex items-center gap-3"><span className="grid size-9 place-items-center rounded-lg bg-[var(--accent)]/10 text-sm font-black text-[var(--accent)]">{String(index + 1).padStart(2, '0')}</span><BookOpenCheck size={20} className="text-[var(--muted)]" /></div><h2 className="mt-6 text-xl font-black">{lesson.title}</h2><p className="mt-3 leading-7 text-[var(--muted)]">{lesson.text}</p><p className="mt-5 rounded-xl border-l-2 border-[var(--accent)] bg-black/15 px-4 py-3 text-sm leading-6 text-[#cbd4de]"><span className="font-bold text-white">Piemērs:</span> {lesson.example}</p><Link href={lesson.href} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[var(--accent)] hover:text-[var(--accent-strong)]">Izmēģināt treniņā <ArrowRight size={16} /></Link></article>)}</div>
  </div>;
}
