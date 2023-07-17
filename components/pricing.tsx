import Link from 'next/link';
import { buttonVariants, Button } from '@/components/ui/button';
import { Icons } from './icons';

export const Pricing = () => {
  return (
    <section className="my-40 md:my-52">
      <div className="max-w-5xl mx-auto p-[1.25rem] pt-16 flex flex-col items-center">
        <Button variant="no-hover" size="sm">
          <span>Pricing</span>
        </Button>
        <h2 className="mt-6 mb-6 font-heading text-4xl sm:text-6xl tracking-wide text-center">
          We like keeping things simple
          <br /> Pay once, get credits
        </h2>
        <p className="relative text-accent max-w-2xl text-center text-base md:text-xl mb-12 before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-[70%] before:rounded-full before:shadow-hero">
          For each credit, you can generate up to 200 words.{' '}
          <br className="hidden md:block" />
          No monthly bills, pay as you go.
        </p>
        <div className="relative mt-8 md:mt-12 flex items-center justify-between gap-8">
          <div className="border border-border/50 rounded-md px-12 py-6 flex flex-col gap-4 items-center justify-center">
            <p className="text-accent font-medium flex items-center justify-center gap-2">
              <span>30 credits</span>
              <Icons.coins size={20} />
            </p>
            <h2 className="text-4xl font-bold text-center">Free</h2>
            <span className="text-xs text-muted">Up to 6k words</span>
            <ul className="flex flex-col gap-2 my-4">
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Grammar Checker</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Paraphraser</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Article Writer</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">SEO Wizard</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Text Summarizer</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-muted" />
                <span className="text-accent">Save prompts</span>
              </li>
            </ul>
            <Link
              href="/dashboard/credits"
              className={buttonVariants({ variant: 'outline' })}
            >
              Get started
            </Link>
          </div>
          <div className="relative border border-border/50 rounded-md px-12 py-8 flex flex-col gap-4 items-center justify-center after:absolute after:left-0 after:top-0 after:h-full after:w-[1px] after:bg-pricing-card-gradient before:absolute before:right-0 before:top-0 before:h-full before:w-[1px] before:bg-pricing-card-gradient">
            <span className="text-center text-primary text-sm">
              Best for starters
            </span>
            <p className="text-accent font-medium flex items-center justify-center gap-2">
              <span>100 credits</span>
              <Icons.coins size={20} />
            </p>
            <h2 className="text-4xl font-bold text-center">6.99$</h2>
            <span className="text-xs text-muted">Up to 20k words</span>
            <ul className="flex flex-col gap-2 my-4">
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Grammar Checker</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Paraphraser</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Article Writer</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">SEO Wizard</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Text Summarizer</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Save prompts</span>
              </li>
            </ul>
            <Link href="/dashboard/credits" className={buttonVariants()}>
              Buy now
            </Link>
          </div>
          <div className="border border-border/50 rounded-md px-12 py-6 flex flex-col gap-4 items-center justify-center">
            <p className="text-accent font-medium flex items-center justify-center gap-2">
              <span>200 credits</span>
              <Icons.coins size={20} />
            </p>
            <h2 className="text-4xl font-bold text-center">11.99$</h2>
            <span className="text-xs text-muted">Up to 40k words</span>
            <ul className="flex flex-col gap-2 my-4">
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Grammar Checker</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Paraphraser</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Article Writer</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">SEO Wizard</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Text Summarizer</span>
              </li>
              <li className="flex items-center gap-2">
                <Icons.check size={16} className="text-primary" />
                <span className="text-accent">Save prompts</span>
              </li>
            </ul>
            <Link
              href="/dashboard/credits"
              className={buttonVariants({ variant: 'outline' })}
            >
              Buy now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
