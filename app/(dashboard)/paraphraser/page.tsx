import { AIService } from '@/components/dashboard/ai-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paraphraser',
  description: 'Write like a pro, everywhere you write.',
};

export default function ParaphraserPage() {
  return <AIService service="paraphrase" />;
}
