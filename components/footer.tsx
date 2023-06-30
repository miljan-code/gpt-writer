import Link from 'next/link';
import { Icons } from './icons';

const footerColumns = [
  {
    title: 'Product',
    links: [
      { title: 'Features', href: '#' },
      { title: 'Integrations', href: '#' },
      { title: 'Pricing', href: '#' },
      { title: 'Changelog', href: '#' },
      { title: 'Docs', href: '#' },
      { title: 'Linear Method', href: '#' },
      { title: 'Download', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { title: 'About us', href: '#' },
      { title: 'Blog', href: '#' },
      { title: 'Careers', href: '#' },
      { title: 'Customers', href: '#' },
      { title: 'Brand', href: '#' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Community', href: '#' },
      { title: 'Contact', href: '#' },
      { title: 'DPA', href: '#' },
      { title: 'Terms of service', href: '#' },
    ],
  },
  {
    title: 'Developers',
    links: [
      { title: 'API', href: '#' },
      { title: 'Status', href: '#' },
      { title: 'GitHub', href: '#' },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="border-t border-border/50">
      <div className="container py-14 px-8 flex flex-col gap-12 md:flex-row md:gap-0">
        <div className="min-w-[40%] flex flex-row justify-between md:flex-col">
          <div className="flex flex-col gap-2">
            <Link href="/" className="inline-flex items-center gap-2 w-fit">
              <div className="h-5 w-5 bg-logo-gradient rounded-md flex items-center justify-center">
                <div className="border border-border rounded-md w-fit h-fit bg-background/80">
                  <Icons.logo className="h-4 w-4" />
                </div>
              </div>
              <span className="inline-block text-xs">GPT Writer</span>
            </Link>
            <span className="hidden md:inline-block text-muted text-xs">
              AI Powered Copywriting Tool
            </span>
          </div>
          <div className="flex gap-4 text-accent">
            <Icons.twitter className="h-4 w-4" />
            <Icons.gitHub className="h-4 w-4" />
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-6 md:gap-1 w-full">
          {footerColumns.map(column => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3>{column.title}</h3>
              <ul className="flex flex-col gap-2">
                {column.links.map(link => (
                  <Link
                    href="#"
                    key={link.title}
                    className="text-sm text-muted hover:text-muted/75 transition-colors duration-300 w-fit"
                  >
                    {link.title}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};
