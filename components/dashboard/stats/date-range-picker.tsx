'use client';

import { useRouter } from 'next/navigation';
import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

export const DateRangePicker = ({
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);

  const router = useRouter();

  const handleSetDate = (range: DateRange | undefined) => {
    setDate(range);

    if (!range || !range.from || !range.to) return;

    const fromDate = range.from?.getDate();
    const fromMonth = range.from?.getMonth();
    const toDate = range.to?.getDate();
    const toMonth = range.to?.getMonth();

    const from = JSON.stringify({ date: fromDate, month: fromMonth });
    const to = JSON.stringify({ date: toDate, month: toMonth });

    router.push(`?from=${from}&to=${to}`);
  };

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            rounded="md"
            className={cn(
              'justify-start text-left font-normal h-10',
              !date && 'text-muted'
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} -{' '}
                  {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span>Lifetime &nbsp;&mdash;&nbsp; Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSetDate}
            numberOfMonths={2}
            toDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
