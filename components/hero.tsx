import Link from 'next/link';
import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';

export const Hero = () => {
  return (
    <section className="relative before:absolute before:h-[400px] before:container before:left-1/2 before:-translate-x-1/2 before:pointer-events-none before:z-[1] before:bg-header-gradient before:-top-nav-height">
      <div className="relative container pt-16 flex flex-col items-center">
        <Button variant="secondary" size="sm">
          <Icons.sparkles className="h-5" />
          <span>AI Powered Copywriting Tool</span>
        </Button>
        <h1 className="mt-8 mb-6 font-heading text-5xl sm:text-7xl tracking-wide text-center">
          Tell A Better Story<span className="sm:hidden">,</span>{' '}
          <br className="hidden md:block" />
          Grow Your Brand
        </h1>
        <p className="relative text-accent max-w-2xl text-center text-base md:text-xl mb-12 before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-[70%] before:rounded-full before:shadow-hero">
          Generate ideas, improve your grammar, and optimize your content.{' '}
          <br className="hidden md:block" />
          Say goodbye to writer&apos;s block and tedious editing.
        </p>
        <Link href="#" className={buttonVariants({ size: 'lg' })}>
          <span>Get Started</span>
          <Icons.chevronRight className="h-4 ml-1 -mr-2" />
        </Link>
      </div>
    </section>
  );
};
