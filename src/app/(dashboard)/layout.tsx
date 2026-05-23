export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <aside>Sidebar</aside>
      <section>{children}</section>
    </main>
  );
}
