import { useEffect } from 'react';

export function useWindowResize(fn: () => void) {
  useEffect(() => {
    window.addEventListener('orientationchange', fn);
    window.addEventListener('resize', fn);

    return () => {
      window.removeEventListener('orientationchange', fn);
      window.removeEventListener('resize', fn);
    };
  }, [fn]);
}
