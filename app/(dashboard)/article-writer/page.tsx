import { ArticleWriter } from '@/components/dashboard/services/article-writer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Article Writer',
  description: 'Write like a pro, everywhere you write.',
};

export default function ArticleWriterPage() {
  return <ArticleWriter />;
}
