import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateFallback(str: string) {
  if (!str) return 'NN';

  const splittedStr = str.split(' ');
  if (splittedStr.length === 1) {
    return splittedStr[0].slice(0, 2).toUpperCase();
  } else if (splittedStr.length > 1) {
    return `${splittedStr[0][0] + splittedStr[1][0]}`.toUpperCase();
  } else {
    return 'NN';
  }
}
