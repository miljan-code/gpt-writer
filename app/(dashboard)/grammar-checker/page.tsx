import { AIService } from '@/components/dashboard/ai-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Grammar Checker',
  description: 'Write like a pro, everywhere you write.',
};

export default function GrammarCheckerPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="font-heading text-3xl">Grammar Checker</h2>
        <p className="text-muted">Write like a pro, everywhere you write.</p>
      </div>
      <AIService service="grammar" />
    </div>
  );
}
