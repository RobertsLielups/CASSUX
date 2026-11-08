import type { Metadata } from 'next';
import { SettingsPanel } from '@/components/settings-panel';
import { PageHeading } from '@/components/ui';

export const metadata: Metadata = { title: 'Iestatījumi' };
export default function SettingsPage() { return <div><PageHeading eyebrow="Kontrole" title="Iestatījumi" description="Pielāgo lokālo pieredzi un pārvaldi šajā pārlūkprogrammā saglabātos datus." /><SettingsPanel /></div>; }
