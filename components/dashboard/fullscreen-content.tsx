'use client';

import { useAtom } from 'jotai';
import { useLockBody } from '@/hooks/use-lock-body';
import { markdownAtom, showContentAtom } from '@/lib/atoms';
import { Icons } from '@/components/icons';
import { Markdown } from '@/components/dashboard/markdown';

export const FullscreenContent = () => {
  const [showContent, setShowContent] = useAtom(showContentAtom);
  const [markdown] = useAtom(markdownAtom);

  useLockBody(showContent);

  const handleCloseFullscren = () => setShowContent(false);

  if (showContent && markdown)
    return (
      <div
        onClick={handleCloseFullscren}
        className="fixed inset-0 w-full h-full bg-background/50 backdrop-blur-md flex items-center justify-center"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="bg-background w-full md:w-3/4 lg:w-1/2 h-full p-4 text-sm border-l border-r border-border/50 overflow-auto"
        >
          <div className="pb-4 flex justify-end">
            <Icons.close
              onClick={handleCloseFullscren}
              className="cursor-pointer"
            />
          </div>
          <Markdown source={markdown} />
        </div>
      </div>
    );
};
