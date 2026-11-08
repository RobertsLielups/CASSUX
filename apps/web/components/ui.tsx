import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function PageHeading({ eyebrow, title, description }: Readonly<{ eyebrow: string; title: string; description: string }>) {
  return (
    <header className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-3 text-balance text-3xl font-black tracking-[-0.04em] sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">{description}</p>
    </header>
  );
}

export function PrimaryLink({ href, children }: Readonly<{ href: string; children: React.ReactNode }>) {
  return (
    <Link href={href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 text-sm font-black text-[#101609] hover:bg-[var(--accent-strong)]">
      {children}
      <ArrowRight size={17} aria-hidden="true" />
    </Link>
  );
}

export function ComingSoon() {
  return <span className="rounded-full border border-[#8fa0b5]/25 bg-[#8fa0b5]/8 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#b9c3ce]">Drīzumā</span>;
}
