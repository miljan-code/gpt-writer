export const siteConfig = {
  name: 'GPT Writer',
  description: 'AI Powered Copywriting Tool',
  url: process.env.APP_URL || 'http://localhost:3000',
  mainNav: [
    {
      label: 'Product',
      href: '#services',
    },
    {
      label: 'Services',
      href: '#services',
    },
    {
      label: 'Pricing',
      href: '#pricing',
    },
    {
      label: 'Customers',
      href: '#testimonials',
    },
    {
      label: 'Contact',
      href: '#',
    },
  ],
};
