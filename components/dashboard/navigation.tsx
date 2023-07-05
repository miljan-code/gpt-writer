import Link from 'next/link';
import { dashboardConfig } from '@/config/dashboard';
import { Icons } from '@/components/icons';
import { SignOutButton } from '@/components/sign-out-button';

export const NavigationFooter = () => {
  return (
    <>
      <Link href="#" className="flex items-center gap-2 w-fit">
        <Icons.book size={14} className="text-muted" />
        <span className="text-xs text-muted">Help & Support</span>
      </Link>
      <span className="text-xs text-muted">GPT Writer &copy; 0.1.0</span>
    </>
  );
};

export const Navigation = () => {
  return dashboardConfig.nav.map(column => (
    <nav key={column.title} className="flex flex-col gap-1">
      <h3 className="text-base sm:text-xs mb-1 text-muted">{column.title}</h3>
      {column.links.map(link => {
        const Icon = Icons[link.icon];

        return (
          <Link
            href={link.href}
            key={link.label}
            className="group flex items-center gap-3 sm:gap-2 px-2 py-1 rounded-md hover:bg-border transition-colors duration-100 text-accent cursor-default"
          >
            <Icon className="group-hover:text-white sm:h-4 sm:w-4" />
            <p className="text-lg sm:text-sm">{link.label}</p>
          </Link>
        );
      })}
      {column.title === 'Account' && <SignOutButton />}
    </nav>
  ));
};
