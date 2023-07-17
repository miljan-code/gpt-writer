import Image from 'next/image';
import { Button } from '@/components/ui/button';

export const Testimonials = () => {
  return (
    <section className="my-40 md:my-52" id="testimonials">
      <div className="max-w-5xl mx-auto p-[1.25rem] pt-16 flex flex-col items-center">
        <Button variant="no-hover" size="sm">
          <span>Feedbacks</span>
        </Button>
        <h2 className="mt-6 mb-6 font-heading text-4xl sm:text-6xl tracking-wide text-center">
          Loved by brands and creators
        </h2>
        <p className="relative text-accent max-w-2xl text-center text-base md:text-xl mb-12 before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-[70%] before:rounded-full before:shadow-hero-secondary">
          Join thousands of brands and content creators who use our tools.{' '}
          <br className="hidden md:block" />
          Here’s what people are saying about us.
        </p>
        <div className="mt-6 md:mt-12 grid md:grid-cols-3 md:grid-rows-7 gap-10 w-full">
          <div className="col-span-1 md:row-span-4 border border-border/50 bg-secondary/5 rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/image/person-1.jpg"
                alt="random person"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="text-sm">Daria Natcho</h4>
                <span className="text-xs text-accent">@daria_natcho</span>
              </div>
            </div>
            <p className="text-sm text-accent">
              Really, really liking{' '}
              <span className="text-primary">GPT Writer</span> so far. <br />
              <br />
              It is just the right amount of simple/fast for a content
              generation app and does most of the hard work of copywriting.
            </p>
          </div>
          <div className="col-span-1 md:row-span-3 border border-border/50 bg-secondary/5 rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/image/person-2.jpg"
                alt="random person"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="text-sm">Robert Schmeichel</h4>
                <span className="text-xs text-accent">@robert924</span>
              </div>
            </div>
            <p className="text-sm text-accent">
              Amazing website and amazing copywriting tools 🚀
            </p>
          </div>
          <div className="col-span-1 md:row-span-4 border border-border/50 bg-secondary/5 rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/image/person-3.jpg"
                alt="random person"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="text-sm">Marc Benneth</h4>
                <span className="text-xs text-accent">@marcbenneth</span>
              </div>
            </div>
            <p className="text-sm text-accent">
              <span className="text-secondary">GPT Writer</span> is a critical
              step forward in the evolution of AI powered copywriting services;
              it provides wide range of powerful tools that makes my life as a
              content creator so much easier!
            </p>
          </div>
          <div className="col-span-1 md:row-span-4 border border-border/50 bg-secondary/5 rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/image/person-4.jpg"
                alt="random person"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="text-sm">Marcelina Celestyn</h4>
                <span className="text-xs text-accent">@marcelly2</span>
              </div>
            </div>
            <p className="text-sm text-accent">
              Not only it has everything any content creator or small brand
              needs, it also has very cheap prices.
              <br />
              <br />
              <span className="text-tertiary">GPT Writer</span> is absolute game
              changer!
            </p>
          </div>
          <div className="col-span-1 md:row-span-3 border border-border/50 bg-secondary/5 rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/image/person-5.jpg"
                alt="random person"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="text-sm">Vjekoslav Laban</h4>
                <span className="text-xs text-accent">@laban_pl</span>
              </div>
            </div>
            <p className="text-sm text-accent">
              I&apos;m in love with this copywriting tool. 🤩 It helps alot!
            </p>
          </div>
          <div className="col-span-1 md:row-span-3 border border-border/50 bg-secondary/5 rounded-md p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <Image
                src="/image/person-6.jpg"
                alt="random person"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <h4 className="text-sm">Irena Artemiy</h4>
                <span className="text-xs text-accent">@missiirena</span>
              </div>
            </div>
            <p className="text-sm text-accent">
              I think this tool is going to be a game changer for copywriting 😉
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
