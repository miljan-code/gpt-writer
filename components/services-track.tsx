'use client';

import { useEffect, useRef, useState } from 'react';
import { useInViewport } from '@/hooks/use-in-viewport';
import { Icons } from '@/components/icons';

export const ServicesTrack = () => {
  const [pixels, setPixels] = useState(0);

  const trackRef = useRef<HTMLDivElement>(null);

  const isInViewport = useInViewport<HTMLDivElement>(trackRef);

  const componentPagePosition = 1095;
  const divider = 2.6;

  useEffect(() => {
    if (isInViewport) {
      const handleScroll = () => {
        let scrollY = (window.scrollY - componentPagePosition) / divider;

        if (scrollY > 500) {
          scrollY = 500;
        } else if (scrollY < 0) {
          scrollY = 0;
        }

        setPixels(scrollY);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isInViewport]);

  return (
    <div
      ref={trackRef}
      className="relative w-4 h-[140%] -mt-14 mx-auto bg-secondary-track"
    >
      <Icons.trackAiHead
        className="absolute -top-48 w-12"
        style={{
          left: '50%',
          transform: `translateX(-50%) translateY(${pixels}px)`,
        }}
      />
    </div>
  );
};
