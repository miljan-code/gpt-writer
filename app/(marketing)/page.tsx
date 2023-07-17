import { Hero } from '@/components/hero';
import { Services } from '@/components/services';
import { Pricing } from '@/components/pricing';
import { Testimonials } from '@/components/testimonials';

export default function IndexPage() {
  return (
    <>
      <Hero />
      <Services />
      <Pricing />
      <Testimonials />
    </>
  );
}
