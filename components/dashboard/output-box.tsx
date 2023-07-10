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

interface OutputBoxProps {
  markdown: string;
}

export const OutputBox = ({ markdown }: OutputBoxProps) => {
  const [_, setShowContent] = useAtom(showContentAtom);
  const [markdownContent] = useAtom(markdownAtom);

  const handleCopyText = () => {};

  const handleFullscreen = () => {
    if (!markdownContent) return null;
    setShowContent(true);
  };

  return (
    <div className="border border-border/50 rounded-lg w-full max-md:min-h-[30rem] h-full flex flex-col overflow-hidden">
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
OutputBox.displayName = 'OutputBox';
