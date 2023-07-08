'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompletion } from 'ai/react';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import { OutputBox } from '@/components/dashboard/output-box';

interface AIServiceProps {
  service: 'grammar' | 'paraphrase' | 'summarize' | 'seo';
}

export const AIService = ({ service }: AIServiceProps) => {
  const [content, setContent] = useState('');

  const router = useRouter();

  const { complete, completion, isLoading } = useCompletion({
    api: `/api/generate/${service}`,
    onError: error => {
      toast({
        title: 'Something went wrong',
        description: error.message,
      });
    },
    onFinish() {
      router.refresh();
    },
  });

  const prevRef = useRef('');
  const outputDivRef = useRef<HTMLDivElement>(null);
  const inputTextRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const diff = completion.slice(prevRef.current.length);
    prevRef.current = completion;
    if (!outputDivRef.current) return;
    outputDivRef.current.insertAdjacentText('beforeend', diff);
  }, [completion]);

  const wordCount = inputTextRef.current
    ? inputTextRef.current.value.split(' ').length - 1
    : 0;

  return (
    <div className="flex-grow flex flex-col md:flex-row gap-6">
      <div className="border border-border/50 rounded-lg w-full max-md:min-h-[30rem] h-full flex flex-col overflow-hidden">
        <Textarea
          ref={inputTextRef}
          className="h-full resize-none border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 overflow-auto"
          placeholder="Write something cool..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="py-2 px-4 flex items-center justify-between bg-border/50">
          <div className="text-sm flex items-center gap-4">
            <span>Words: {wordCount}</span>
            <span className="flex items-center gap-1">
              Price: {Math.ceil(wordCount / 200)} <Icons.coins size={12} />
            </span>
          </div>
          <Button
            onClick={() => complete(content)}
            variant="tertiary"
            disabled={isLoading}
            rounded="md"
          >
            {isLoading && (
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Generate
            <span className="sr-only">Generate</span>
          </Button>
        </div>
      </div>
      <OutputBox ref={outputDivRef} />
    </div>
  );
};
