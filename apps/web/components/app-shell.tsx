'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, CircleUserRound, Home, Play, Settings } from 'lucide-react';
import { useProgress } from './progress-provider';

const navigation = [
  { href: '/', label: 'Sākums', icon: Home },
  { href: '/play', label: 'Spēlēt', icon: Play },
  { href: '/learn', label: 'Mācīties', icon: BookOpen },
  { href: '/progress', label: 'Progress', icon: BarChart3 },
  { href: '/profile', label: 'Profils', icon: CircleUserRound },
  { href: '/settings', label: 'Iestatījumi', icon: Settings },
];

export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { level } = useProgress();

  return (
    <div className="mx-auto min-h-screen max-w-[1600px] lg:grid lg:grid-cols-[236px_1fr]">
      <aside className="hidden border-r border-[var(--line)] bg-[#0c1015]/90 px-5 py-7 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
        <Link href="/" className="mb-9 flex items-center gap-3 rounded-lg" aria-label="CASSUX sākums">
          <span className="grid size-10 place-items-center rounded-xl bg-[var(--accent)] text-lg font-black text-[#11180a]">C</span>
          <span>
            <span className="block text-lg font-black tracking-[0.16em]">CASSUX</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted)]">Think sharper</span>
          </span>
        </Link>
        <nav aria-label="Galvenā navigācija" className="space-y-1">
          {navigation.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold ${
                  active ? 'bg-[var(--panel-2)] text-white' : 'text-[var(--muted)] hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={19} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-2xl border border-[var(--line)] bg-[var(--panel)] p-4">
          <p className="text-xs font-semibold text-[var(--muted)]">Viesa profils · lokāli</p>
          <p className="mt-1 font-bold">1. prototips</p>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/8">
            <div className="h-full w-1/3 rounded-full bg-[var(--accent)]" />
          </div>
          <p className="mt-2 text-xs text-[var(--muted)]">Līmenis {level}</p>
        </div>
      </aside>

      <div className="min-w-0 pb-24 lg:pb-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-[var(--line)] bg-[#090c10]/88 px-4 backdrop-blur-xl sm:px-7 lg:hidden">
          <Link href="/" className="flex items-center gap-2 font-black tracking-[0.14em]" aria-label="CASSUX sākums">
            <span className="grid size-8 place-items-center rounded-lg bg-[var(--accent)] text-sm text-[#11180a]">C</span>
            CASSUX
          </Link>
          <span className="rounded-full border border-[var(--line)] px-3 py-1 text-xs font-bold text-[var(--muted)]">Līmenis {level}</span>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-7 sm:py-10 lg:px-10 lg:py-12">{children}</main>
      </div>

      <nav aria-label="Mobilā navigācija" className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-6 border-t border-[var(--line)] bg-[#0b0f14]/96 px-1 pb-[max(0.45rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden">
        {navigation.map((item) => {
          const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={`flex min-w-0 flex-col items-center gap-1 rounded-lg py-1 text-[10px] font-semibold ${active ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`}>
              <Icon size={20} aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
