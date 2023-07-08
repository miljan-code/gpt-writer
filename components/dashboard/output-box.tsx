import { forwardRef, useRef } from 'react';
import { useAtom } from 'jotai';
import { showContentAtom } from '@/lib/atoms';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Icons } from '../icons';
import { Button } from '../ui/button';

export const OutputBox = forwardRef<HTMLDivElement>(({}, ref) => {
  const [_, setShowContent] = useAtom(showContentAtom);

  const outputDivRef = useRef<HTMLDivElement | null>(null);

  const handleRef = (node: HTMLDivElement | null) => {
    outputDivRef.current = node;
    if (typeof ref === 'function') {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };

  const handleCopyText = () => {
    if (!outputDivRef.current) return null;
    const text = outputDivRef.current.innerText;
    navigator.clipboard.writeText(text);
  };

  const handleFullscreen = () => {
    if (!outputDivRef.current) return null;
    setShowContent(outputDivRef.current.innerText);
  };

  return (
    <div className="border border-border/50 rounded-lg w-full max-md:min-h-[30rem] h-full flex flex-col overflow-hidden">
      <div ref={handleRef} className="h-full px-3 py-2 text-sm overflow-auto" />
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
});
OutputBox.displayName = 'OutputBox';
