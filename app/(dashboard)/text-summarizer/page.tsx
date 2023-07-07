import { AIService } from '@/components/dashboard/ai-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Text Summarizer',
  description: 'Write like a pro, everywhere you write.',
};

export default function TextSummarizerPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="font-heading text-3xl">Summarizer</h2>
        <p className="text-muted">
          Convert long articles into summary paragraphs.
        </p>
      </div>
      <AIService service="summarize" />
    </div>
  );
}
