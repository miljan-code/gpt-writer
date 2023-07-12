import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import heroImage from '@/assets/image/hero.webp';

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
        <div className="relative mt-16 md:mt-32 after:absolute after:inset-0 after:w-full after:h-full after:shadow-hero-image after:animate-pulse-slow">
          <div className="relative p-[1px] rounded-lg overflow-hidden before:absolute before:inset-0 before:w-full before:h-full before:bg-primary/10 after:absolute after:top-0 after:left-0 after:w-full max-md:after:h-full md:after:-top-96 md:after:-left-48 md:after:w-[calc(100%*1.41)] md:after:aspect-square after:bg-logo-gradient md:after:bg-image-gradient after:rounded-lg md:after:animate-rotate after:-z-[2] after:animate-none">
            <div className="relative z-10 w-fit rounded-lg overflow-hidden">
              <Image src={heroImage} alt="Hero image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
