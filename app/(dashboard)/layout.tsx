interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <>
      {/* Add diff header */}
      <main>{children}</main>
    </>
  );
}
