import type { Metadata } from 'next';
import { TrainingSession } from '@/components/training-session';

export const metadata: Metadata = { title: 'Premisu treniņš' };
export default function PremisesTrainingPage() { return <TrainingSession mode="premise" />; }
