'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import removeMarkdown from 'markdown-to-text';
import { useAtom } from 'jotai';
import { markdownAtom, showContentAtom } from '@/lib/atoms';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Markdown } from '@/components/dashboard/markdown';

export const OutputBox = () => {
  const [_showContent, setShowContent] = useAtom(showContentAtom);
  const [markdown, setMarkdown] = useAtom(markdownAtom);

  const pathname = usePathname();

  useEffect(() => {
    setMarkdown('');
  }, [pathname, setMarkdown]);

  const handleCopyText = () => {
    const cleanText = removeMarkdown(markdown);
    navigator.clipboard.writeText(cleanText);
  };

  const handleFullscreen = () => {
    if (!markdown) return null;
    setShowContent(true);
  };

  return (
    <div className="border border-border/50 rounded-lg w-full max-md:min-h-[30rem] max-h-[52rem] flex flex-col overflow-hidden">
      <div className="h-full px-3 py-2 text-sm overflow-auto">
        <Markdown source={markdown} />
      </div>

      <div className="py-2 px-4 flex items-center justify-between bg-border/50">
        <div className="text-sm">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Icons.maximize
                onClick={handleFullscreen}
                size={18}
                className="cursor-pointer"
              />
            </HoverCardTrigger>
            <HoverCardContent>Fullscreen</HoverCardContent>
          </HoverCard>
        </div>
        <Button onClick={handleCopyText} variant="tertiary" rounded="md">
          Copy text
        </Button>
      </div>
    </div>
  );
};
