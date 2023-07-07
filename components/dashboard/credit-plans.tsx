'use client';

import { useState } from 'react';
import { creditPlans } from '@/config/credit-plans';
import { CreditPlanCard } from '@/components/dashboard/credit-plan-card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export const CreditPlans = () => {
  const [activePlan, setActivePlan] = useState(0);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const plan = creditPlans.find(plan => plan.id === activePlan);

    if (!plan) {
      return toast({
        title: 'Select a plan',
        description: 'Please, choose one of the available plans.',
      });
    }

    const response = await fetch('/api/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(plan),
    });

    if (!response?.ok) {
      return toast({
        title: 'Something went wrong',
        description: 'Please refresh the page and try again.',
      });
    }

    const session = await response.json();
    if (session) {
      window.location.href = session.url;
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-6 sm:grid-cols-2 md:grid-cols-4"
    >
      {creditPlans.map(plan => (
        <CreditPlanCard
          key={plan.id}
          id={plan.id}
          isActive={plan.id === activePlan}
          creditAmount={plan.creditAmount}
          price={plan.price}
          maxWords={plan.maxWords}
          onActiveChange={setActivePlan}
        />
      ))}
      <Button variant="tertiary" rounded="md" type="submit">
        Pay now
      </Button>
    </form>
  );
};
