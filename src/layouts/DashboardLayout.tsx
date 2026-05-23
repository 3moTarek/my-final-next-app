import { Navbar } from "@/components/Navbar";
import { Sidebar } from "@/components/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}