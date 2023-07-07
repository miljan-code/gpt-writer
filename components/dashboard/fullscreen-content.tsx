'use client';

import { useAtom } from 'jotai';
import { useLockBody } from '@/hooks/use-lock-body';
import { showContentAtom } from '@/lib/atoms';
import { Icons } from '@/components/icons';

export const FullscreenContent = () => {
  const [showContent, setShowContent] = useAtom(showContentAtom);

  useLockBody(!!showContent);

  const handleCloseFullscren = () => setShowContent('');

  if (showContent)
    return (
      <div
        onClick={handleCloseFullscren}
        className="fixed inset-0 w-full h-full bg-background/50 backdrop-blur-md flex items-center justify-center"
      >
        <div
          onClick={e => e.stopPropagation()}
          className="bg-background w-full md:w-3/4 lg:w-1/2 h-full p-4 text-sm border-l border-r border-border/50 overflow-auto"
        >
          <div className="flex justify-end">
            <Icons.close
              onClick={handleCloseFullscren}
              className="cursor-pointer"
            />
          </div>
          <div className="pt-4">{showContent}</div>
        </div>
      </div>
    );
};
