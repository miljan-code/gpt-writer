'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCompletion } from 'ai/react';
import { useAtom } from 'jotai';
import { showContentAtom } from '@/lib/atoms';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { toast } from '@/components/ui/use-toast';

interface AIServiceProps {
  service: 'grammar' | 'paraphrase';
}

export const AIService = ({ service }: AIServiceProps) => {
  const [content, setContent] = useState('');
  const [_, setShowContent] = useAtom(showContentAtom);

  const router = useRouter();

  const { complete, completion } = useCompletion({
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

  const handleCopyText = () => {
    if (!outputDivRef.current) return null;
    const text = outputDivRef.current.innerText;
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      <div className="border border-border/50 rounded-lg w-full h-full flex flex-col overflow-hidden">
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
            variant="secondary"
            className="bg-primary hover:bg-primary/80"
          >
            Generate
          </Button>
        </div>
      </div>
      <div className="border border-border/50 rounded-lg w-full h-full flex flex-col overflow-hidden">
        <div
          ref={outputDivRef}
          className="h-full px-3 py-2 text-sm overflow-auto"
        />
        <div className="py-2 px-4 flex items-center justify-between bg-border/50">
          <div className="text-sm">
            <HoverCard>
              <HoverCardTrigger asChild>
                <Icons.maximize
                  onClick={() => setShowContent(content)}
                  size={18}
                  className="cursor-pointer"
                />
              </HoverCardTrigger>
              <HoverCardContent>Fullscreen</HoverCardContent>
            </HoverCard>
          </div>
          <Button
            onClick={handleCopyText}
            variant="secondary"
            className="bg-primary hover:bg-primary/80"
          >
            Copy text
          </Button>
        </div>
      </div>
    </div>
  );
};
