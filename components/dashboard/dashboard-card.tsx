import { Icons } from '../icons';

interface DashboardCardProps {
  title: string;
  icon: keyof typeof Icons;
  label: string;
  sublabel: string;
}

export const DashboardCard = ({
  title,
  icon,
  label,
  sublabel,
}: DashboardCardProps) => {
  const Icon = Icons[icon];

  return (
    <div className="border border-border/50 rounded-md w-full p-6 flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm tracking-tight font-medium text-accent">
          {title}
        </h3>
        <Icon size={14} className="text-accent" />
      </div>
      <span className="text-2xl font-bold">{label}</span>
      <span className="text-xs text-muted">{sublabel}</span>
    </div>
  );
};
