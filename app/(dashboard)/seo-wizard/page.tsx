import { AIService } from '@/components/dashboard/services/ai-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Wizard',
  description: 'Write like a pro, everywhere you write.',
};

export default function SEOWizardPage() {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="font-heading text-3xl">SEO Wizard</h2>
        <p className="text-muted">
          Optimize your content for search engines in one click.
        </p>
      </div>
      <AIService service="seo" />
    </div>
  );
}
