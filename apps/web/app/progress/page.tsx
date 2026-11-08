import type { Metadata } from 'next';
import { ProgressDashboard } from '@/components/progress-widgets';
import { PageHeading } from '@/components/ui';

export const metadata: Metadata = { title: 'Progress' };
export default function ProgressPage() { return <div><PageHeading eyebrow="Tava attīstība" title="Progress" description="Reāli dati no šajā pārlūkprogrammā pabeigtajām solo sesijām. XP rāda aktivitāti, nevis intelekta mērījumu." /><ProgressDashboard /></div>; }
