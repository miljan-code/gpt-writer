'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useCompletion } from 'ai/react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export const GrammarChecker = () => {
  const [content, setContent] = useState('');
  const { complete, completion } = useCompletion({
    api: '/api/generate/grammar',
  });

  const prev = useRef('');
  const contentDiv = useRef<HTMLDivElement>(null);

  const checkForMistakes = useCallback(
    async (input: string) => {
      complete(input);
    },
    [complete]
  );

  useEffect(() => {
    const diff = completion.slice(prev.current.length);
    prev.current = completion;
    if (!contentDiv.current) return;
    contentDiv.current.insertAdjacentText('beforeend', diff);
  }, [completion]);

  return (
    <div className="h-full flex flex-col md:flex-row gap-6">
      <div className="border border-border/50 rounded-lg w-full h-full flex flex-col overflow-hidden">
        <Textarea
          className="h-full resize-none border-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"
          placeholder="Write something cool..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="py-2 px-4 flex items-center justify-between bg-border/50">
          <div className="text-sm">Word counter</div>
          <Button
            onClick={() => checkForMistakes(content)}
            variant="secondary"
            className="bg-primary hover:bg-primary/80"
          >
            Generate
          </Button>
        </div>
      </div>
      <div className="border border-border/50 rounded-lg w-full h-full flex flex-col overflow-hidden">
        <div ref={contentDiv} className="h-full px-3 py-2 text-sm" />
        <div className="py-2 px-4 flex items-center justify-between bg-border/50">
          <div className="text-sm">Fullscreen</div>
          <Button
            onClick={() => {}}
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
