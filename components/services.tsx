import { servicesConfig } from '@/config/services';
import { ServicesTrack } from '@/components/services-track';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import type { Service } from '@/types/config';

interface ServiceCardProps extends Service {}

export const ServiceCard = ({ title, description, icon }: ServiceCardProps) => {
  const Icon = Icons[icon];

  return (
    <div className="relative px-8 pt-8 pb-14 w-full grid grid-cols-4 border border-border rounded-lg shadow-secondary-card overflow-hidden after:absolute after:top-0 after:left-0 after:h-[1px] after:w-full after:bg-service-card-gradient">
      <div className="col-span-3">
        <h3 className="text-lg font-medium text-secondary mb-4">{title}</h3>
        <p className="text-sm">{description}</p>
      </div>
      <div className="absolute -bottom-8 -right-8 w-32 h-32">
        <Icons.serviceIllustration />
        <div className="relative z-10 mt-4 ml-4 rounded-full border border-secondary/75 bg-background w-24 h-24 flex items-center justify-center">
          <Icon className="text-secondary" />
        </div>
      </div>
    </div>
  );
};

export const Services = () => {
  return (
    <section className="my-24 md:my-32" id="services">
      <div className="max-w-5xl mx-auto p-[1.25rem] pt-16 flex flex-col items-center">
        <Button variant="no-hover" size="sm">
          <span>Services</span>
        </Button>
        <h2 className="mt-6 mb-6 font-heading text-4xl sm:text-6xl tracking-wide text-center">
          AI as your
          <br /> writing assistant
        </h2>
        <p className="relative text-accent max-w-2xl text-center text-base md:text-xl mb-12 before:absolute before:left-1/2 before:top-0 before:-translate-x-1/2 before:w-[70%] before:rounded-full before:shadow-hero-secondary">
          GPT Writer uses AI models to provide a wide range of services.{' '}
          <br className="hidden md:block" />
          Generate cutting-edge content in seconds.
        </p>
        <div className="relative w-full mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-10 gap-12 md:gap-8">
          <div className="md:col-span-4 space-y-12 md:space-y-8">
            {servicesConfig.slice(0, 2).map(service => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
          <div className="relative col-span-2 hidden md:block">
            <ServicesTrack />
          </div>
          <div className="md:col-span-4 space-y-12 md:space-y-8">
            {servicesConfig.slice(2).map(service => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
