import { Icons } from '@/components/icons';

interface AuthFeatureProps {
  icon: string;
  label: string;
  sublabel: string;
}

export const AuthFeature = ({ icon, label, sublabel }: AuthFeatureProps) => {
  const Icon = Icons[icon as keyof typeof Icons];

  return (
    <div className="flex items-start gap-3 pr-10">
      <div className="bg-border/75 rounded-md p-1 mt-1 text-primary">
        <Icon size={18} />
      </div>
      <div className="flex flex-col">
        <h3 className="font-medium">{label}</h3>
        <p className="text-accent text-sm">{sublabel}</p>
      </div>
    </div>
  );
};
