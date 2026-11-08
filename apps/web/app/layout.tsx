import type { Metadata } from 'next';
import './globals.css';
import { AppShell } from '@/components/app-shell';
import { ProgressProvider } from '@/components/progress-provider';

export const metadata: Metadata = {
  title: { default: 'CASSUX — Domā. Spēlē. Pārspēj.', template: '%s | CASSUX' },
  description: 'Konkurētspējīgas domāšanas un stratēģijas spēļu platformas pirmais prototips.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="lv">
      <body>
        <ProgressProvider>
          <AppShell>{children}</AppShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
