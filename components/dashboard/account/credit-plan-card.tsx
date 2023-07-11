'use client';

import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';

interface CreditPlanCard {
  isActive: boolean;
  id: number;
  creditAmount: number;
  price: number;
  maxWords: number;
  onActiveChange: React.Dispatch<React.SetStateAction<number>>;
}

export const CreditPlanCard = ({
  isActive,
  id,
  creditAmount,
  price,
  maxWords,
  onActiveChange,
}: CreditPlanCard) => {
  return (
    <div
      onClick={() => onActiveChange(id)}
      className={cn(
        'border rounded-md w-full p-6 flex flex-col cursor-pointer transition-[border] duration-100',
        isActive ? 'border-primary' : 'border-border/50'
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm tracking-tight font-medium text-accent flex items-center gap-2">
          {creditAmount} Credits <Icons.coins size={14} />
        </h3>
        {isActive && <Icons.check size={18} className="text-primary" />}
      </div>
      <span className="text-2xl font-bold">${price}</span>
      <span className="text-xs text-muted">Up to {maxWords}k words</span>
      <div className="mt-3">
        <span className="text-sm text-accent">One time payment</span>
      </div>
    </div>
  );
};
