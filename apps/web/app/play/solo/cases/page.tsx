import type { Metadata } from 'next';
import { TrainingSession } from '@/components/training-session';

export const metadata: Metadata = { title: 'Kāzusu treniņš' };
export default function CasesTrainingPage() { return <TrainingSession mode="case" />; }
