import { AIService } from '@/components/dashboard/services/ai-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Paraphraser',
  description: 'Write like a pro, everywhere you write.',
};

export default function ParaphraserPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="font-heading text-3xl">Paraphraser</h2>
        <p className="text-muted">Writer block? Steal like an artist.</p>
      </div>
      <AIService service="paraphrase" />
    </div>
  );
}
