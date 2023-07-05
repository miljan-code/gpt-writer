import { useEffect } from 'react';

export function useLockBody(condition: boolean) {
  useEffect(() => {
    const html = document.querySelector('html');
    if (html) html.classList.toggle('overflow-hidden', condition);
  }, [condition]);
}
