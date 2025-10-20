export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout" data-theme="dashboard">
      {children}
    </div>
  );
}