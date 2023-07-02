interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <main className="container relative min-h-screen xl:min-h-[calc(100vh-80px)] xl:border xl:border-border/50 xl:bg-border/5 xl:mt-10 xl:rounded-lg xl:before:absolute xl:before:inset-0 xl:before:w-full xl:before:h-full xl:before:shadow-dashboard xl:before:z-[-1] p-0 flex">
      <aside className="max-w-[13.75rem] w-full border-r border-border/50 py-3 px-4">
        Sidebar
      </aside>
      <section>{children}</section>
    </main>
  );
}
